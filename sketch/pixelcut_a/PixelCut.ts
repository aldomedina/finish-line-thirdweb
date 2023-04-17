//@ts-nocheck
import {
  MeshBasicMaterial,
  NearestFilter,
  ShaderMaterial,
  UniformsUtils,
  WebGLRenderTarget,
  Clock,
  RepeatWrapping,
  ClampToEdgeWrapping,
} from "three";
import { Pass, FullScreenQuad } from "three/addons/postprocessing/Pass";
import { PixelCutShader } from "./PixelCutShader.ts";
class PixelCutPass extends Pass {
  constructor(_width, _height) {
    super();

    this.shader = PixelCutShader;
    this.frameCounter = 0.0;
    this.uniforms = UniformsUtils.clone(this.shader.uniforms);
    this.uniforms.uResolution.value.x = _width;
    this.uniforms.uResolution.value.y = _height;
    this.clock = new Clock(false);
    this.textureComp = new WebGLRenderTarget(_width, _height, {
      minFilter: NearestFilter,
      magFilter: NearestFilter,
      wrapS: ClampToEdgeWrapping,
      wrapT: ClampToEdgeWrapping,
    });

    this.textureOld = new WebGLRenderTarget(_width, _height, {
      minFilter: NearestFilter,
      magFilter: NearestFilter,
      wrapS: ClampToEdgeWrapping,
      wrapT: ClampToEdgeWrapping,
    });

    this.compFsMaterial = new ShaderMaterial({
      transparent: true,
      uniforms: this.uniforms,
      vertexShader: this.shader.vertexShader,
      fragmentShader: this.shader.fragmentShader,
    });

    this.compFsQuad = new FullScreenQuad(this.compFsMaterial);

    this.copyFsMaterial = new MeshBasicMaterial({
      transparent: true,
    });
    this.copyFsQuad = new FullScreenQuad(this.copyFsMaterial);
  }

  setCriteria(criteria) {
    this.uniforms["uCriteria"].value = criteria;
  }

  setDirection(direction) {
    this.uniforms["uDirection"].value = direction;
  }

  setActive(active) {
    this.uniforms["uActive"].value = active ? 1 : 0;
    this.clock.start();
  }

  setMix(mix) {
    this.uniforms["uMix"].value = mix;
  }

  setImage(_texture, _enabled) {
    this.imageTexture = _texture;
    this.widthImage = _enabled;
    this.uniforms["tSource"].value = this.imageTexture;
  }

  render(renderer, writeBuffer, readBuffer, deltaTime /*, maskActive*/) {
    var time = this.clock.getElapsedTime();

    this.uniforms["tOld"].value = this.textureOld.texture;
    this.uniforms["tNew"].value = this.widthImage
      ? this.imageTexture
      : readBuffer.texture;
    this.uniforms["uTime"].value = time;
    renderer.setRenderTarget(this.textureComp);
    this.compFsQuad.render(renderer);
    this.copyFsQuad.material.map = this.textureComp.texture;

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.copyFsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer);

      if (this.clear) renderer.clear();

      this.copyFsQuad.render(renderer);
    }

    const temp = this.textureOld;
    this.textureOld = this.textureComp;
    this.textureComp = temp;
    this.frameCounter++;
  }

  setSize(width, height) {
    this.textureComp.setSize(width, height);
    this.textureOld.setSize(width, height);
  }

  dispose() {
    this.textureComp.dispose();
    this.textureOld.dispose();

    this.compFsMaterial.dispose();
    this.copyFsMaterial.dispose();

    this.compFsQuad.dispose();
    this.copyFsQuad.dispose();
  }
}

export { PixelCutPass };
