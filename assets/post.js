/* ════════════════════════════════════════════════════════════════════════
   The film.  Our own pass: a bloom that only touches what is really
   bright, the warm curve of the room, the grain, the vignette and the
   small colour fringe the lens leaves at the edge of the picture.

   Everything is drawn here — there is not one image file in this file.
   ════════════════════════════════════════════════════════════════════════ */

import * as THREE from './vendor/three.module.js';

const VERT = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

/* the room's own curve: the light is filmic, then it is put back to gamma */
const ACES = /* glsl */`
vec3 mtAces(vec3 x) {
  const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}`;

const PREPASS = /* glsl */`
uniform sampler2D tMap;
uniform vec2 uLumafilterParams;
varying vec2 vUv;
void main() {
  vec4 col = texture2D(tMap, vUv);
  float luma = dot(col.rgb, vec3(0.2126, 0.7152, 0.0722));
  float k = smoothstep(uLumafilterParams.x, uLumafilterParams.x + uLumafilterParams.y, luma);
  gl_FragColor = vec4(col.rgb * k, 1.0);
}`;

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
}`;

const FILM = /* glsl */`
uniform sampler2D tMap;
uniform sampler2D tBloom;
uniform sampler2D tNoise;
uniform float uTime;
uniform float uBloom;
uniform float uExposure;
uniform float uGrain;
uniform float uVignette;
uniform float uChroma;
varying vec2 vUv;
${ACES}

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  vec2 dir = vUv - 0.5;
  float r2 = dot(dir, dir);

  // the small colour the lens leaves at the edge of the picture
  float amount = uChroma * smoothstep(0.02, 0.25, r2);
  vec3 base;
  base.r = texture2D(tMap, vUv + dir * amount).r;
  base.g = texture2D(tMap, vUv).g;
  base.b = texture2D(tMap, vUv - dir * amount).b;

  vec3 bloom = texture2D(tBloom, vUv).rgb;
  vec3 col = base + bloom * uBloom;

  col = mtAces(col * uExposure);
  col = pow(max(col, vec3(0.0)), vec3(1.0 / 2.2));

  // the grain of the film
  vec2 noise = texture2D(tNoise, (gl_FragCoord.xy + vec2(fract(uTime) * 71.0)) / 256.0).rg;
  col += (noise.r - 0.5) * uGrain;

  // the vignette
  float vig = smoothstep(0.95, 0.18, r2 * 2.0);
  col *= mix(1.0, vig, 0.75);

  gl_FragColor = vec4(col, 1.0);
}`;

/* our own noise, drawn once */
function noiseTexture() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const g = c.getContext('2d');
  const img = g.createImageData(256, 256);
  for (let i = 0; i < img.data.length; i += 4) {
    img.data[i] = Math.random() * 255;
    img.data[i + 1] = Math.random() * 255;
    img.data[i + 2] = Math.random() * 255;
    img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.minFilter = t.magFilter = THREE.NearestFilter;
  t.colorSpace = THREE.NoColorSpace;
  return t;
}

export function makePost(renderer, opts = {}) {
  const cfg = Object.assign({
    threshold: 0.85,
    knee: 0.35,
    bloomIntensity: 0.55,
    exposure: 1.0,
    grain: 0.035,
    vignette: 1.0,
    chroma: 0.0035
  }, opts);

  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
  const quadScene = new THREE.Scene();
  quadScene.add(quad);
  const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const rtOpts = {
    minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
    depthBuffer: false, stencilBuffer: false
  };
  const sceneRT = new THREE.WebGLRenderTarget(2, 2, Object.assign({ depthBuffer: true }, rtOpts));
  const prepassRT = new THREE.WebGLRenderTarget(2, 2, rtOpts);
  const blurA = new THREE.WebGLRenderTarget(2, 2, rtOpts);
  const blurB = new THREE.WebGLRenderTarget(2, 2, rtOpts);
  const bloomRT = new THREE.WebGLRenderTarget(2, 2, rtOpts);
  sceneRT.texture.colorSpace = THREE.LinearSRGBColorSpace;

  const prepassMat = new THREE.ShaderMaterial({
    uniforms: {
      tMap: { value: sceneRT.texture },
      uLumafilterParams: { value: new THREE.Vector2(cfg.threshold, cfg.knee) }
    },
    vertexShader: VERT, fragmentShader: PREPASS, depthTest: false, depthWrite: false
  });
  const blurMat = new THREE.ShaderMaterial({
    uniforms: { tMap: { value: null }, uDir: { value: new THREE.Vector2() } },
    vertexShader: VERT, fragmentShader: BLUR, depthTest: false, depthWrite: false
  });
  const filmMat = new THREE.ShaderMaterial({
    uniforms: {
      tMap: { value: sceneRT.texture },
      tBloom: { value: bloomRT.texture },
      tNoise: { value: noiseTexture() },
      uTime: { value: 0 },
      uBloom: { value: cfg.bloomIntensity },
      uExposure: { value: cfg.exposure },
      uGrain: { value: cfg.grain },
      uVignette: { value: cfg.vignette },
      uChroma: { value: cfg.chroma }
    },
    vertexShader: VERT, fragmentShader: FILM, depthTest: false, depthWrite: false
  });

  function setSize(w, h) {
    const pr = renderer.getPixelRatio();
    const W = Math.max(2, Math.floor(w * pr)), H = Math.max(2, Math.floor(h * pr));
    sceneRT.setSize(W, H);
    const hw = Math.max(2, Math.floor(W / 2)), hh = Math.max(2, Math.floor(H / 2));
    prepassRT.setSize(hw, hh);
    blurA.setSize(hw, hh);
    blurB.setSize(hw, hh);
    bloomRT.setSize(W, H);
  }

  const pass = (mat, target) => {
    quad.material = mat;
    renderer.setRenderTarget(target || null);
    renderer.render(quadScene, quadCam);
  };

  function render(scene, camera, dt) {
    filmMat.uniforms.uTime.value = (filmMat.uniforms.uTime.value + (dt || 0)) % 1000;

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

    pass(filmMat, null);
    renderer.setRenderTarget(null);
  }

  return { render, setSize, uniforms: filmMat.uniforms, config: cfg, sceneRT, bloomRT };
}
