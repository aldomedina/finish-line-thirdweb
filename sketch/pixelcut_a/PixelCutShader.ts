//@ts-nocheck
import { Color, Vector2,Vector4 } from "three";

const PixelCutShader = {
  uniforms: {
    'tSource':{value:null},
		'tOld': { value: null },
		'tNew': { value: null },
    'uTime':{value:0.0},
    'uActive':{value:0.0},
    'uResolution':{value:new Vector2(0.0,0.0)},
    'uImageResolution':{value:new Vector4(0.0,0.0,0.0,0.0)},
    'uDirection':{value:new Vector2(0.0,0.0)}
  },
  vertexShader: /* glsl */ `
  varying vec2 vUv;
  void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
  }`,

  fragmentShader: /* glsl */ `
  precision highp float;
  uniform sampler2D tSource;
  uniform sampler2D tOld;
  uniform sampler2D tNew;
  uniform float uLinePos;
  uniform float uTime;
  uniform float uActive;
  uniform vec2 uResolution;
  uniform vec4 uImageResolution;
  uniform vec2 uDirection;
  varying vec2 vUv;
  #define PI 3.14159265358979

  float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }
  float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
  }
  vec3 srgbToLinear(vec3 _srgb)
  {
    vec3 _rgb = vec3(0.0);
    _rgb.r = _srgb.r <= 0.04045 ? _srgb.r / 12.92 : pow((_srgb.r + 0.055) / 1.055, 2.4);
    _rgb.g = _srgb.g <= 0.04045 ? _srgb.g / 12.92 : pow((_srgb.g + 0.055) / 1.055, 2.4);
    _rgb.b = _srgb.b <= 0.04045 ? _srgb.b / 12.92 : pow((_srgb.b + 0.055) / 1.055, 2.4);
    return _rgb;
  }
  
  vec3 linearToSrgb(vec3 _rgb)
  {
    vec3 _srgb = vec3(0.0);
    _srgb.r = _rgb.r <= 0.0031308 ? 12.92 * _rgb.r : 1.055 * pow(_rgb.r, 1.0 / 2.4) - 0.055;
    _srgb.g = _rgb.g <= 0.0031308 ? 12.92 * _rgb.g : 1.055 * pow(_rgb.g, 1.0 / 2.4) - 0.055;
    _srgb.b = _rgb.b <= 0.0031308 ? 12.92 * _rgb.b : 1.055 * pow(_rgb.b, 1.0 / 2.4) - 0.055;
    return _srgb;

  }

  void main() {
    vec2 uv = vUv;
    float vp = mod(floor(uv.x * uResolution.x), 2.0) * 2. - 1.;
   
  
    vec4 sframe = texture2D(tSource,uv);

  

    vec4 newFrame = texture2D(tNew, uv);
    float lum = luma(newFrame.rgb);
   //luma float dis = (1.0-newFrame.a)*smoothstep(0.3,.7,lum);

   float dis = (1.0-newFrame.a);

    float dir_x = uDirection.x;
    dir_x*=(1.0/60.0);
    dir_x*=.1;

    uv=mix(uv,uv+vec2(dir_x,0.0),dis);

    vec4 currentFrame = texture2D(tOld,uv);

    if(sframe.a > 0.0)
    {
    //  currentFrame.rgb=sframe.rgb+r*n*.3;
    //  currentFrame.rgb=min(currentFrame.rgb,sframe.rgb);
    }


    gl_FragColor = mix(newFrame,currentFrame,uActive);
  }			
  `,
};

export { PixelCutShader };
