//@ts-nocheck
import { Color, Vector2,Vector4 } from "three";

const MixShader = {
  uniforms: {
    'tex0':{value:null},
    'tex1':{value:null}
  },
  vertexShader: /* glsl */ `
  varying vec2 vUv;
  void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
  }`,

  fragmentShader: /* glsl */ `
  precision highp float;
  uniform sampler2D tex0;
  uniform sampler2D tex1;
 
  varying vec2 vUv;

  float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }


  void main() {
    vec2 uv = vUv;
    vec4 t = texture2D(tex0,uv);
    t.a=1.0;
    vec4 t2 = texture2D(tex1,uv);


    gl_FragColor = mix(t,t2,t2.a);
  }			
  `,
};

export { MixShader };
