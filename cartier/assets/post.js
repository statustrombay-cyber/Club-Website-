/* ==========================================================================
   Mindful Tattva — the film look, taken from the reference's own pipeline
   --------------------------------------------------------------------------
   Rebuilt from the site's bundled shaders:

     bloomPrepass   luma filter, threshold 0.348758, knee 0.47636217
     bloom          separable blur, composited with a screen blend at 0.6
     composite      spectrum-sampled chroma shift (0.025, radius 3),
                    lens distortion 0.04, vignette (radius 2, bias 0.5),
                    grain 0.025, ordered dither

   Everything runs in display space, like the original: no HDR exposure heroics.
   ========================================================================== */

import * as THREE from './vendor/three.module.js';

const VERT = /* glsl */`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const PREPASS = /* glsl */`
uniform sampler2D tMap;
uniform vec2 uLumafilterParams;
varying vec2 vUv;
float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }
void main() {
  vec4 col = texture2D(tMap, vUv);
  float a = smoothstep(uLumafilterParams.x, uLumafilterParams.x + uLumafilterParams.y, luma(col.xyz));
  gl_FragColor = mix(vec4(0.0, 0.0, 0.0, 1.0), col, a);
}
`;

const BLUR = /* glsl */`
uniform sampler2D tMap;
uniform vec2 uDir;
varying vec2 vUv;
void main() {
  vec2 o = uDir;
  vec4 s = texture2D(tMap, vUv) * 0.227027;
  s += texture2D(tMap, vUv + o * 1.3846) * 0.316216;
  s += texture2D(tMap, vUv - o * 1.3846) * 0.316216;
  s += texture2D(tMap, vUv + o * 3.2308) * 0.070270;
  s += texture2D(tMap, vUv - o * 3.2308) * 0.070270;
  gl_FragColor = s;
}
`;

const BLOOM = /* glsl */`
uniform sampler2D tMap;
uniform sampler2D tBloom;
uniform float uTime;
uniform float uBloomIntensity;
varying vec2 vUv;
vec3 screenBlend(vec3 a, vec3 b) { return 1.0 - ((1.0 - a) * (1.0 - b)); }
vec4 hash42(vec2 p) {
  vec4 p4 = fract(vec4(p.xyxy) * vec4(.1031, .1030, .0973, .1099));
  p4 += dot(p4, p4.wzxy + 33.33);
  return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}
void main() {
  vec4 col = texture2D(tMap, vUv);
  vec4 bloom = texture2D(tBloom, vUv);
  col.rgb = screenBlend(col.rgb, bloom.rgb * uBloomIntensity);
  vec4 h1 = hash42(gl_FragCoord.xy + fract(uTime) * 1300.0);
  vec4 h2 = hash42(gl_FragCoord.yx + fract(uTime + 0.3123) * 1300.0);
  col.rgb += (h1.rgb + (h2.rgb - 1.0)) / 255.0;
  gl_FragColor = col;
}
`;

/* their first composite pass, verbatim in behaviour */
const FILM = /* glsl */`
uniform sampler2D tMap;
uniform sampler2D tLight;
uniform sampler2D tSpectrum;
uniform sampler2D tBlueNoise;
uniform float uTime;
uniform float uChromaShiftStrength;
uniform float uChromaShiftRadius;
uniform float uVignetteRadius;
uniform float uVignetteBias;
uniform float uLensDistortion;
uniform float uLensDistortionMax;
varying vec2 vUv;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * .1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
vec3 dither(vec3 color, float t) {
  vec2 p = floor(gl_FragCoord.xy);
  float n = hash12(p + fract(t));
  return color + (n - 0.5) / 255.0;
}

void main() {
  vec3 color = vec3(0.0);
  vec2 dir = 2.0 * vUv - 1.0;
  float dist = dot(dir, dir);
  vec2 uv = vUv;
  uv += -dir * smoothstep(0.0, 1.0, dist * 0.5) * uLensDistortionMax * uLensDistortion;

  vec3 blueNoise = texture2D(tBlueNoise, (gl_FragCoord.xy + fract(uTime * 10.0) * 10000.0) / 256.0).xyz;
  float lightMask = texture2D(tLight, vUv).y;
  float rgbShiftAmount = mix(uChromaShiftStrength * 0.5, uChromaShiftStrength, lightMask * 5.0);
  rgbShiftAmount *= 1.0 - smoothstep(uChromaShiftRadius, 0.0, dist);

  vec3 totalSpectrum = vec3(0.0);
  float stp = 0.0;
  for (float i = 0.0; i < 5.0; i++) {
    vec3 spectrum = texture2D(tSpectrum, vec2(stp, 0.5)).xyz;
    float offsetScale = mix(-rgbShiftAmount, rgbShiftAmount, stp + blueNoise.z * 0.1);
    vec2 offset = blueNoise.xy * offsetScale;
    color += texture2D(tMap, uv + offset).rgb * spectrum;
    totalSpectrum += spectrum;
    stp += 1.0 / 5.0;
  }
  color /= totalSpectrum;

  float grain = hash12(gl_FragCoord.xy + fract(uTime) * 100.0);
  color += (grain - 0.5) * 0.025;

  float vignette = smoothstep(uVignetteRadius, 0.0, dist);
  vignette = mix(vignette, 1.0, uVignetteBias);
  color = mix(vec3(0.0), color, vignette);
  color = dither(color, uTime);

  gl_FragColor = vec4(color, 1.0);
}
`;

export function makePost(renderer, opts = {}) {
  const cfg = Object.assign({
    threshold: 0.348758,
    knee: 0.47636217,
    bloomIntensity: 0.6,
    chromaShiftRadius: 3.0,
    chromaShiftStrength: 0.025,
    vignetteRadius: 2.0,
    vignetteBias: 0.5,
    lensDistortionMax: 0.04
  }, opts);

  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
  const quadScene = new THREE.Scene();
  quadScene.add(quad);
  const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const rtOpts = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false, stencilBuffer: false };
  const sceneRT = new THREE.WebGLRenderTarget(2, 2, Object.assign({ depthBuffer: true }, rtOpts));
  const prepassRT = new THREE.WebGLRenderTarget(2, 2, rtOpts);
  const blurA = new THREE.WebGLRenderTarget(2, 2, rtOpts);
  const blurB = new THREE.WebGLRenderTarget(2, 2, rtOpts);
  const bloomRT = new THREE.WebGLRenderTarget(2, 2, rtOpts);

  const tex = (path) => {
    const t = new THREE.TextureLoader().load(path);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.minFilter = t.magFilter = THREE.LinearFilter;
    t.colorSpace = THREE.NoColorSpace;
    return t;
  };
  const spectrumTex = tex('/webgl/global/misc/spectrum.png');
  const blueNoiseTex = tex('/webgl/global/noises/bluenoise256.png');
  blueNoiseTex.wrapS = blueNoiseTex.wrapT = THREE.RepeatWrapping;

  const prepassMat = new THREE.ShaderMaterial({
    uniforms: { tMap: { value: sceneRT.texture }, uLumafilterParams: { value: new THREE.Vector2(cfg.threshold, cfg.knee) } },
    vertexShader: VERT, fragmentShader: PREPASS, depthTest: false, depthWrite: false
  });
  const blurMat = new THREE.ShaderMaterial({
    uniforms: { tMap: { value: null }, uDir: { value: new THREE.Vector2() } },
    vertexShader: VERT, fragmentShader: BLUR, depthTest: false, depthWrite: false
  });
  const bloomMat = new THREE.ShaderMaterial({
    uniforms: {
      tMap: { value: sceneRT.texture }, tBloom: { value: bloomRT.texture },
      uTime: { value: 0 }, uBloomIntensity: { value: cfg.bloomIntensity }
    },
    vertexShader: VERT, fragmentShader: BLOOM, depthTest: false, depthWrite: false
  });
  const filmMat = new THREE.ShaderMaterial({
    uniforms: {
      tMap: { value: bloomRT.texture },
      tLight: { value: null },
      tSpectrum: { value: spectrumTex },
      tBlueNoise: { value: blueNoiseTex },
      uTime: { value: 0 },
      uChromaShiftStrength: { value: cfg.chromaShiftStrength },
      uChromaShiftRadius: { value: cfg.chromaShiftRadius },
      uVignetteRadius: { value: cfg.vignetteRadius },
      uVignetteBias: { value: cfg.vignetteBias },
      uLensDistortion: { value: 1 },
      uLensDistortionMax: { value: cfg.lensDistortionMax }
    },
    vertexShader: VERT, fragmentShader: FILM, depthTest: false, depthWrite: false
  });

  // a black "light" buffer: the reference feeds its light pass in here
  const darkRT = new THREE.WebGLRenderTarget(2, 2, rtOpts);
  filmMat.uniforms.tLight.value = darkRT.texture;

  function setSize(w, h) {
    const pr = renderer.getPixelRatio();
    const W = Math.max(2, Math.floor(w * pr)), H = Math.max(2, Math.floor(h * pr));
    sceneRT.setSize(W, H);
    const hw = Math.max(2, Math.floor(W / 2)), hh = Math.max(2, Math.floor(H / 2));
    prepassRT.setSize(hw, hh);
    blurA.setSize(hw, hh);
    blurB.setSize(hw, hh);
    bloomRT.setSize(W, H);
    darkRT.setSize(4, 4);
  }

  const pass = (mat, target) => {
    quad.material = mat;
    renderer.setRenderTarget(target || null);
    renderer.render(quadScene, quadCam);
  };

  function renderFinal(scene, camera, dt) {
    const time = (filmMat.uniforms.uTime.value + (dt || 0)) % 1000;
    filmMat.uniforms.uTime.value = time;
    bloomMat.uniforms.uTime.value = time;

    renderer.setRenderTarget(sceneRT);
    renderer.clear();
    renderer.render(scene, camera);

    pass(prepassMat, prepassRT);
    const tx = 1 / prepassRT.width, ty = 1 / prepassRT.height;
    blurMat.uniforms.tMap.value = prepassRT.texture;
    blurMat.uniforms.uDir.value.set(tx * 1.5, 0);
    pass(blurMat, blurA);
    blurMat.uniforms.tMap.value = blurA.texture;
    blurMat.uniforms.uDir.value.set(0, ty * 1.5);
    pass(blurMat, blurB);
    blurMat.uniforms.tMap.value = blurB.texture;
    blurMat.uniforms.uDir.value.set(tx * 3.5, 0);
    pass(blurMat, blurA);
    blurMat.uniforms.tMap.value = blurA.texture;
    blurMat.uniforms.uDir.value.set(0, ty * 3.5);
    pass(blurMat, bloomRT);

    pass(bloomMat, blurB);                       // screen blend
    filmMat.uniforms.tMap.value = blurB.texture; // grain, chroma, vignette
    pass(filmMat, null);
    renderer.setRenderTarget(null);
  }

  return {
    render: renderFinal,
    setSize,
    uniforms: filmMat.uniforms,
    config: cfg
  };
}
