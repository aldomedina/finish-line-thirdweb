//@ts-nocheck
import { IParams } from "@/types";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer";
import { RenderPass } from "three/addons/postprocessing/RenderPass";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass";
import { FullScreenQuad } from "three/addons/postprocessing/Pass";
import { PixelCutPass } from "./pixelcut_a/PixelCut";
import { MixShader } from "./pixelcut_a/MixShader";
import { dir } from "console";

export default function createPiece(
  container: HTMLDivElement,
  parameters: IParams
) {
  const textureLoader = new THREE.TextureLoader().load(
    parameters.url,
    (evt) => {
      evt.wrapS = THREE.ClampToEdgeWrapping;
      evt.wrapT = THREE.ClampToEdgeWrapping;
      evt.minFilter = THREE.NearestFilter;
      evt.magFilter = THREE.NearestFilter;
      createRender(evt);
    }
  );

  function createRender(_texture) {
    const { offset, threshold, url } = parameters;
    const { offsetHeight: height, offsetWidth: width } = container;
    const texture = _texture;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      premultipliedAlpha: false,
    });
    renderer.setSize(width, height);

    container.appendChild(renderer.domElement);

    const composer = new EffectComposer(renderer);
    const composerFinal = new EffectComposer(renderer);

    const scenePass = new RenderPass(scene, camera);

    const pixelCutPass = new PixelCutPass(width, height);

    var dirX = parameters.direction;
    if (dirX <= 0.0) {
      dirX = -1.0;
    } else {
      dirX = 1.0;
    }

    pixelCutPass.setImage(texture, true);
    pixelCutPass.setDirection({ x: dirX, y: 0.0 });
    composer.addPass(pixelCutPass);

    composer.renderToScreen = false;

    const shaderMaterial = new THREE.ShaderMaterial({
      fragmentShader: MixShader.fragmentShader,
      vertexShader: MixShader.vertexShader,
      uniforms: THREE.UniformsUtils.clone(MixShader.uniforms),
    });

    const mixPass = new ShaderPass(shaderMaterial);
    mixPass.uniforms.tex0.value = texture;
    mixPass.uniforms.tex1.value = composer.renderTarget2.texture;

    composerFinal.addPass(mixPass);
    composerFinal.renderToScreen = true;

    var firstFrame = true;

    function animate() {
      requestAnimationFrame(animate);

      composer.render();
      composerFinal.render();
      if (firstFrame) {
        pixelCutPass.setActive(true);
        firstFrame = false;
      }
    }

    animate();

    container.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {
      const { offsetHeight: newHeight, offsetWidth: newWidth } = container;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    }
  }
}
