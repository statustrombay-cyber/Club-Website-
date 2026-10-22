/* ==========================================================================
   Mindful Tattva — the film look
   HDR render → bright extract → two blurs → ACES + vignette + grain.
   Small, dependency-free, and cheap enough for phones.
   ========================================================================== */

import * as THREE from './vendor/three.module.js';

const VERT = /* glsl */`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const BRIGHT = /* glsl */`
uniform sampler2D tScene;
uniform float threshold;
uniform float knee;
varying vec2 vUv;
void main() {
  vec3 c = texture2D(tScene, vUv).rgb;
  float l = max(max(c.r, c.g), c.b);
  float k = smoothstep(threshold, threshold + knee, l);
  gl_FragColor = vec4(c * k, 1.0);
}
`;

const BLUR = /* glsl */`
uniform sampler2D tInput;
uniform vec2 dir;
uniform vec2 texel;
varying vec2 vUv;
void main() {
  vec2 o = dir * texel;
  vec3 s = texture2D(tInput, vUv).rgb * 0.227027;
  s += texture2D(tInput, vUv + o * 1.3846).rgb * 0.316216;
  s += texture2D(tInput, vUv - o * 1.3846).rgb * 0.316216;
  s += texture2D(tInput, vUv + o * 3.2308).rgb * 0.070270;
  s += texture2D(tInput, vUv - o * 3.2308).rgb * 0.070270;
  gl_FragColor = vec4(s, 1.0);
}
`;

const COMPOSITE = /* glsl */`
uniform sampler2D tScene;
uniform sampler2D tBloom;
uniform float bloom;
uniform float exposure;
uniform float vignette;
uniform float grain;
uniform float time;
varying vec2 vUv;

vec3 aces(vec3 x) {
  // Narkowicz ACES fit, then a lift so the shadows keep their warmth
  const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
  x *= exposure;
  vec3 y = clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
  return y;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec3 base = texture2D(tScene, vUv).rgb;
  vec3 glow = texture2D(tBloom, vUv).rgb;
  vec3 col = aces(base + glow * bloom);
  // a warm shoulder: highlights drift to amber, never to pure white
  col = mix(col, col * vec3(1.0, 0.955, 0.88), smoothstep(0.35, 1.0, max(col.r, max(col.g, col.b))));
  // vignette
  vec2 p = vUv - 0.5;
  float v = 1.0 - dot(p, p) * vignette * 2.2;
  col *= clamp(v, 0.0, 1.0);
  // grain
  float g = hash(vUv * 1024.0 + time) - 0.5;
  col += g * grain * (1.0 - col);
  gl_FragColor = vec4(col, 1.0);
}
`;

export function makePost(renderer, opts = {}) {
  const cfg = Object.assign({ exposure: 1.0, bloom: 1.2, threshold: 0.6, knee: 0.4, vignette: 0.5, grain: 0.03 }, opts);

  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
  const quadScene = new THREE.Scene();
  quadScene.add(quad);
  const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const sceneRT = new THREE.WebGLRenderTarget(2, 2, {
    type: THREE.HalfFloatType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
    depthBuffer: true, stencilBuffer: false
  });
  const brightRT = new THREE.WebGLRenderTarget(2, 2, {
    type: THREE.HalfFloatType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false
  });
  const blurA = brightRT.clone();
  const blurB = brightRT.clone();

  const brightMat = new THREE.ShaderMaterial({
    uniforms: { tScene: { value: sceneRT.texture }, threshold: { value: cfg.threshold }, knee: { value: cfg.knee } },
    vertexShader: VERT, fragmentShader: BRIGHT, depthTest: false, depthWrite: false
  });
  const blurMat = new THREE.ShaderMaterial({
    uniforms: { tInput: { value: null }, dir: { value: new THREE.Vector2(1, 0) }, texel: { value: new THREE.Vector2(1, 1) } },
    vertexShader: VERT, fragmentShader: BLUR, depthTest: false, depthWrite: false
  });
  const compMat = new THREE.ShaderMaterial({
    uniforms: {
      tScene: { value: sceneRT.texture }, tBloom: { value: blurB.texture },
      bloom: { value: cfg.bloom }, exposure: { value: cfg.exposure },
      vignette: { value: cfg.vignette }, grain: { value: cfg.grain }, time: { value: 0 }
    },
    vertexShader: VERT, fragmentShader: COMPOSITE, depthTest: false, depthWrite: false
  });

  let w = 2, h = 2;

  function setSize(width, height) {
    w = Math.max(2, Math.floor(width * renderer.getPixelRatio()));
    h = Math.max(2, Math.floor(height * renderer.getPixelRatio()));
    sceneRT.setSize(w, h);
    const bw = Math.max(2, Math.floor(w / 4)), bh = Math.max(2, Math.floor(h / 4));
    brightRT.setSize(bw, bh);
    blurA.setSize(bw, bh);
    blurB.setSize(bw, bh);
    blurMat.uniforms.texel.value.set(1 / bw, 1 / bh);
  }

  const pass = (mat, target) => {
    quad.material = mat;
    renderer.setRenderTarget(target || null);
    renderer.render(quadScene, quadCam);
  };

  function render(scene, camera, dt) {
    const prevTone = renderer.toneMapping;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setRenderTarget(sceneRT);
    renderer.clear();
    renderer.render(scene, camera);

    pass(brightMat, brightRT);

    blurMat.uniforms.tInput.value = brightRT.texture;
    blurMat.uniforms.dir.value.set(1, 0);
    pass(blurMat, blurA);

    blurMat.uniforms.tInput.value = blurA.texture;
    blurMat.uniforms.dir.value.set(0, 1);
    pass(blurMat, blurB);

    // a second, wider bloom pass for the room's haze
    blurMat.uniforms.tInput.value = blurB.texture;
    blurMat.uniforms.dir.value.set(1.7, 0);
    pass(blurMat, blurA);
    blurMat.uniforms.tInput.value = blurA.texture;
    blurMat.uniforms.dir.value.set(0, 1.7);
    pass(blurMat, blurB);

    compMat.uniforms.time.value = (compMat.uniforms.time.value + (dt || 0)) % 1000;
    pass(compMat, null);
    renderer.setRenderTarget(null);
    renderer.toneMapping = prevTone;
  }

  return {
    render, setSize,
    set threshold(v) { brightMat.uniforms.threshold.value = v; },
    get threshold() { return brightMat.uniforms.threshold.value; },
    get config() { return cfg; },
    uniforms: compMat.uniforms
  };
}
