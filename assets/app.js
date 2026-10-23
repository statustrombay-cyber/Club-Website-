/* ==========================================================================
   Mindful Tattva — the room
   --------------------------------------------------------------------------
   A reconstruction of the Watches & Wonders room, with the watches taken
   out and the club's name put in.

   What drives it is Cartier's own material, recovered from the page itself:

     • the room            webgl/models/mainScene.glb
       one clip, SCENE_01, 24.333 s. Seven whole rooms are parked fifty
       metres below the floor and lifted one at a time; the camera is a
       node in the same clip and orbits the set while it climbs.

     • the people          webgl/models/mainScene_characters.glb
       the same seven rooms with the figures in them, each room with its
       own lift clip and each figure with its own looping performance.

     • the timeline        theatre/mainScene.theatre-state.json
       Cartier's own Theatre.js project state: when each chapter's title
       is on, when EXPLORE appears, how the field of view opens, how the
       set darkens, how much of the crowd is lit, and when the whole thing
       fades to black and starts again.

   Nothing here is invented: the rooms, the camera, the light and the copy
   timings all come out of those files. The watches, the product menu and
   the wordmark are the only things that are ours.
   ========================================================================== */

import * as THREE from './vendor/three.module.js';
import { makePost } from './post.js';

const PARAMS = new URLSearchParams(location.search);
const STILL = PARAMS.has('still');      // freeze on a chapter, for stills
const CHAPTER = PARAMS.has('chapter') ? parseInt(PARAMS.get('chapter'), 10) : null;
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const AT = PARAMS.has('t') ? parseFloat(PARAMS.get('t')) : null;
const num = (k, d) => (PARAMS.has(k) ? parseFloat(PARAMS.get(k)) : d);
const EXPOSURE = num('exp', 0.78);
const LMI = num('lmi', 6);
const DECAL = num('decal', 0.3);
const GLOW = num('glow', 2.6);
const FOV = num('fov', 0);          // vertical fov override
const HFOV = num('hfov', 0);        // horizontal fov override
const TINT = (PARAMS.get('tint') || '1,0.97,0.92').split(',').map(Number);
const LMFLIP = num('lmflip', 1);

/* ── the chapters ──────────────────────────────────────────────────────────
   Cartier's own scene list, in its own order. The opening room is ours:
   "Watches & Wonders" becomes "Mindful Tattva". The watch that each chapter
   used to carry — Roadster, Baignoire, Cartier Privé, Santos-Dumont — has
   gone with it, so nothing links out to a product any more. */
const CHAPTERS = [
  {
    id: 'intro',
    title: 'Mindful<br>Tattva',
    baseline: 'A room for the mind,<br>a club for the curious'
  },
  { id: 'tailored',   title: 'Tailored crafts<br>serving one form' },
  { id: 'eye',        title: 'The eye<br>of the jeweller' },
  { id: 'movement',   title: 'Shaping<br>movement' },
  { id: 'manufacture',title: 'The<br>Manufacture' },
  { id: 'film',       title: 'The<br>film' },
  { id: 'craft',      title: 'The Sound<br>of Craft' }
];

/* where each chapter sits on the master clock — the timeline's own scene
   changes, not a guess */
const SCENE_TIMES = [0, 3.3, 7.3, 11.033, 14.5, 17.467, 20.767, 24.2];

const $ = (sel) => document.querySelector(sel);
const el = {
  canvas: $('#gl'),
  loader: $('#loader'),
  loaderProgress: $('#loaderProgress'),
  sound: $('#soundButton'),
  titleWrap: $('#sceneTitle'),
  titleLayer: $('#sceneTitleLayer'),
  titleText: $('#sceneTitleText'),
  baseline: $('#baseline'),
  baselineWrap: $('#introWrapper'),
  explore: $('#exploreButton'),
  nav: $('#sideNav'),
  scroll: $('#scrollButton')
};

let renderer, post, scene, camera, room, chars, roomMixer, charMixer;
let roomAnim, roomDuration = 24.333, timelineLength = 24.51;
let channels = new Map();
let statics = {};
let clock = 0;
let chapter = 0;
let lastChapter = -1;
let soundOn = false;
let audio = null;
let titlePlanesDone = false;
const glowSprites = [];
const visibilityGroups = new Map();
const floorMeshes = [];
let lightmaps = [];
const charMaterials = new Set();
let lightDecal = null;
let decalMaterials = [];
let lightDecalMaterial = null;
let probes = [];
let activeProbe = -1;
let floorRoom = -1;

/* three.js renames the nodes it loads: dots are dropped, spaces become
   underscores. We look the nodes up the same way. */
const sanitize = (n) => n.replace(/\s/g, '_').replace(/[\[\]\.:\/]/g, '');
function findNode(root, name) {
  if (!root) return null;
  const want = sanitize(name);
  let hit = null;
  root.traverse((o) => { if (!hit && o.name === want) hit = o; });
  return hit;
}

/* ══ the timeline ═══════════════════════════════════════════════════════
   Cartier's Theatre.js state. Every animated property is a list of
   keyframes; a "hold" keyframe steps, a "bezier" keyframe eases along the
   cubic curve its handles describe. */
function cubicBezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  const dx = (t) => (3 * ax * t + 2 * bx) * t + cx;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = sampleX(t) - x;
      if (Math.abs(err) < 1e-6) break;
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    return sampleY(t);
  };
}

function sampleTrack(track, t) {
  const kfs = track && track.keyframes;
  if (!kfs || !kfs.length) return undefined;
  if (t <= kfs[0].position) return kfs[0].value;
  const last = kfs[kfs.length - 1];
  if (t >= last.position) return last.value;
  for (let i = 0; i < kfs.length - 1; i++) {
    const a = kfs[i], b = kfs[i + 1];
    if (t < a.position || t > b.position) continue;
    if (a.type === 'hold') return a.value;
    const span = b.position - a.position;
    if (span <= 0) return b.value;
    const u = (t - a.position) / span;
    const h = a.handles || [0.5, 1, 0.5, 0];
    const eased = cubicBezier(h[0], h[1], h[2], h[3])(u);
    if (typeof a.value === 'number' && typeof b.value === 'number') {
      return a.value + (b.value - a.value) * eased;
    }
    return eased > 0.5 ? b.value : a.value;
  }
  return last.value;
}

function readTimeline(state) {
  const sheet = state.sheetsById && state.sheetsById.timeline;
  if (!sheet) throw new Error('no timeline');
  const seq = sheet.sequence;
  statics = (sheet.staticOverrides && sheet.staticOverrides.byObject) || {};
  for (const [objectName, bag] of Object.entries(seq.tracksByObject)) {
    for (const [propPath, trackId] of Object.entries(bag.trackIdByPropPath || {})) {
      const track = bag.trackData[trackId];
      if (!track) continue;
      channels.set(`${objectName}|${propPath}`, { track, objectName, propPath });
    }
  }
  timelineLength = seq.length || timelineLength;
}

function value(objectName, propPath, fallback) {
  const c = channels.get(`${objectName}|${propPath}`);
  if (!c) return fallback;
  const v = sampleTrack(c.track, clock);
  return v === undefined ? fallback : v;
}

/* ══ the set ════════════════════════════════════════════════════════════
   The rooms are lit by their own baked light: an irradiance map in the red
   channel, collapsed to luminance and warmed to the light the club has. */
async function warmLightmap(url) {
  const img = await new Promise((res, rej) => {
    const im = new Image();
    im.onload = () => res(im);
    im.onerror = () => rej(new Error('lightmap ' + url));
    im.src = url;
  });
  const c = document.createElement('canvas');
  c.width = img.width; c.height = img.height;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const px = ctx.getImageData(0, 0, c.width, c.height);
  const d = px.data;
  const TINT = [1.0, 0.80, 0.58].map((v, i) => (TINT[i] === undefined ? v : TINT[i]));
  for (let i = 0; i < d.length; i += 4) {
    const l = d[i] / 255;
    d[i] = 255 * Math.min(1, l * TINT[0]);
    d[i + 1] = 255 * Math.min(1, l * TINT[1]);
    d[i + 2] = 255 * Math.min(1, l * TINT[2]);
    d[i + 3] = 255;
  }
  ctx.putImageData(px, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.flipY = !!LMFLIP;
  tex.colorSpace = THREE.NoColorSpace;
  tex.channel = 1;
  tex.needsUpdate = true;
  return tex;
}

/* which room does this object belong to? */
function sceneOf(node) {
  let p = node, n = 0;
  while (p && n++ < 24) {
    const m = /Empty[._]?SC0(\d)/.exec(p.name || '');
    if (m) return +m[1];
    p = p.parent;
  }
  return -1;
}

/* the reference's own groups, mapped onto the nodes that carry them */
const GROUP_PATTERNS = {
  doors:     /door/i,
  room:      /outside_box/i,
  dunes:     /dunes/i,
  cylinders: /cylinder/i,
  sky:       /sky|GEO_bg|cloud/i,
  cliffs:    /cliff|roche/i,
  ground:    /ground/i,
  wood:      /wood/i,
  panels:    /panel/i,
  stairs:    /stair/i,
  screen:    /screen/i,
  images:    /image/i,
  bench:     /bench/i
};

function buildVisibilityGroups() {
  visibilityGroups.clear();
  const add = (id, mesh) => {
    if (!visibilityGroups.has(id)) visibilityGroups.set(id, []);
    visibilityGroups.get(id).push(mesh);
  };
  for (const root of [room, chars]) {
    if (!root) continue;
    root.traverse((o) => {
      if (!o.isMesh) return;
      const sc = sceneOf(o);
      if (sc < 0) return;
      const name = o.name || '';
      for (const [key, re] of Object.entries(GROUP_PATTERNS)) {
        if (!re.test(name)) continue;
        add(`sc${String(sc).padStart(2, '0')}_${key}`, o);
        break;
      }
    });
  }
  /* the people, as their own group */
  if (chars) {
    for (let i = 0; i < 7; i++) {
      const root = findNode(chars, `Empty.SC0${i}`);
      if (!root) continue;
      root.traverse((o) => { if (o.isMesh) add(`sc${String(i).padStart(2, '0')}_characters`, o); });
    }
  }
  /* the floor */
  const ground = findNode(room, 'ground');
  if (ground) ground.traverse((o) => { if (o.isMesh) { add('floor', o); floorMeshes.push(o); } });
}

/* ══ the title that hangs in the opening room ═══════════════════════════
   The reference's opening room spells its name in fifteen lit planes, cut
   from one texture. We redraw that texture — same canvas, same letter
   slots — with our name in it. */
async function renameTitlePlanes() {
  if (titlePlanesDone) return;
  const planes = [];
  room.traverse((o) => {
    if (/^SC00_FontPlane/i.test(o.name || '') && o.isMesh) planes.push(o);
  });
  if (!planes.length) return;

  const mat = planes[0].material;
  const tex = (mat && (mat.map || mat.emissiveMap)) || null;
  if (!tex || !tex.image) return;

  /* Each plane is one letter of the reference's name, cut from the shared
     atlas: its texture coordinates are that letter's box. We keep the
     boxes, and redraw the letters inside them. */
  const rects = [];
  for (const p of planes) {
    const uv = p.geometry.attributes.uv;
    if (!uv) return;
    let u0 = Infinity, u1 = -Infinity, v0 = Infinity, v1 = -Infinity;
    for (let i = 0; i < uv.count; i++) {
      u0 = Math.min(u0, uv.getX(i)); u1 = Math.max(u1, uv.getX(i));
      v0 = Math.min(v0, uv.getY(i)); v1 = Math.max(v1, uv.getY(i));
    }
    rects.push({ p, u0, u1, v0, v1 });
  }
  /* the texture is not flipped, so v = 0 is the top of the image */
  const top = rects.filter((r) => (r.v0 + r.v1) / 2 < 0.5).sort((a, b) => a.u0 - b.u0);
  const bottom = rects.filter((r) => (r.v0 + r.v1) / 2 >= 0.5).sort((a, b) => a.u0 - b.u0);
  if (!top.length || !bottom.length) return;

  /* our name, in the reference's two lines */
  const lineTop = ['M', 'I', 'N', 'D', 'F', 'U', 'L'];
  const lineBottom = ['T', 'A', 'T', 'T', 'V', 'A'];

  /* a clean grid: eight columns, two rows */
  const CW = 1024, CH = 232, COLS = 8;
  const cellW = CW / COLS, cellH = CH / 2;

  try { await document.fonts.ready; } catch (e) { /* fonts are optional */ }
  const display = 'FancyCutProWW2026, "Bodoni Moda", "Times New Roman", serif';
  const measure = document.createElement('canvas').getContext('2d');
  measure.font = `300 100px ${display}`;
  const capRatio = (measure.measureText('H').actualBoundingBoxAscent || 70) / 100;

  const out = document.createElement('canvas');
  out.width = CW; out.height = CH;
  const ctx = out.getContext('2d');
  ctx.clearRect(0, 0, CW, CH);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  const draw = (ch, col, row) => {
    if (!ch) return;
    const capH = cellH * 0.92;
    let size = capH / capRatio;
    measure.font = `300 ${size}px ${display}`;
    const w = measure.measureText(ch).width;
    if (w > cellW * 0.94) { size *= (cellW * 0.94) / w; }
    ctx.font = `300 ${size}px ${display}`;
    const cx = col * cellW + cellW / 2;
    const baseline = row * cellH + (cellH + capH) / 2;
    ctx.fillText(ch, cx, baseline);
  };

  top.forEach((r, i) => draw(lineTop[i], i, 0));
  bottom.forEach((r, i) => draw(lineBottom[i], i, 1));

  /* point every plane at its letter */
  const setUV = (r, col, row) => {
    const u0 = (col * cellW) / CW, u1 = ((col + 1) * cellW) / CW;
    const v0 = (row * cellH) / CH, v1 = ((row + 1) * cellH) / CH;
    const uv = r.p.geometry.attributes.uv;
    const arr = uv.array;
    /* the geometry is a trapezoid: match each corner to the corner it was
       nearest to in the old rectangle */
    for (let i = 0; i < uv.count; i++) {
      const oldU = (arr[i * 2] - r.u0) / Math.max(1e-6, r.u1 - r.u0);
      const oldV = (arr[i * 2 + 1] - r.v0) / Math.max(1e-6, r.v1 - r.v0);
      arr[i * 2] = u0 + oldU * (u1 - u0);
      arr[i * 2 + 1] = v0 + oldV * (v1 - v0);
    }
    uv.needsUpdate = true;
  };

  top.forEach((r, i) => setUV(r, i, 0));
  bottom.forEach((r, i) => setUV(r, i < lineBottom.length ? i : COLS - 1, 1));

  const newTex = new THREE.CanvasTexture(out);
  newTex.colorSpace = THREE.SRGBColorSpace;
  newTex.flipY = false;
  newTex.anisotropy = 4;
  newTex.needsUpdate = true;
  for (const p of planes) {
    const m = p.material;
    if (!m) continue;
    if (m.map) m.map = newTex;
    if (m.emissiveMap) m.emissiveMap = newTex;
    m.needsUpdate = true;
  }
  titlePlanesDone = true;
}

/* ══ the ten glow blobs ═════════════════════════════════════════════════
   Their positions, sizes and colours are Cartier's static overrides; the
   strength of each is its authored alpha curve. */
function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0.0, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.28, 'rgba(255,255,255,0.30)');
  g.addColorStop(0.62, 'rgba(255,255,255,0.09)');
  g.addColorStop(1.0, 'rgba(255,255,255,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function buildLightDecal() {
  const cfg = statics.lightDecal0;
  if (!cfg) return;
  const decal = findNode(room, 'light_decal_box');
  if (!decal) return;
  const t = cfg.tintColor || { r: 1, g: 0.62, b: 0.27 };
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uAlpha: { value: 1 },
      uColor: { value: new THREE.Color(t.r, t.g, t.b) },
      uFalloff: { value: cfg.falloff || 2.5 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform float uAlpha;
      uniform vec3 uColor;
      uniform float uFalloff;
      varying vec2 vUv;
      void main() {
        float r = clamp(length(vUv - 0.5) * 2.0, 0.0, 1.0);
        float a = pow(1.0 - r, uFalloff) * uAlpha;
        if (a < 0.002) discard;
        gl_FragColor = vec4(uColor * a, a);
      }`,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
    toneMapped: false
  });
  decal.material = mat;
  decal.scale.set(cfg.scale.x, cfg.scale.y, cfg.scale.z);
  decal.position.set(cfg.position.x || 0, cfg.position.y || 0, cfg.position.z || 0);
  decal.rotation.set(cfg.rotation.x || 0, cfg.rotation.y || 0, cfg.rotation.z || 0);
  decal.renderOrder = 6;
  lightDecalMaterial = mat;
  lightDecal = decal;
}

function buildHaze() {
  const mat = new THREE.ShaderMaterial({
    uniforms: { uAlpha: { value: 0 }, uColor: { value: new THREE.Color(1, 1, 1) } },
    vertexShader: `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      uniform float uAlpha; uniform vec3 uColor; varying vec2 vUv;
      void main() {
        if (uAlpha < 0.002) discard;
        gl_FragColor = vec4(uColor * uAlpha, uAlpha);
      }`,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
    toneMapped: false
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
  mesh.position.z = -0.2;
  mesh.renderOrder = 1000;
  mesh.frustumCulled = false;
  camera.add(mesh);
  haze = mesh;
}

let haze = null;

function buildGlows() {
  /* the reference's haloes are volumes of light, not flat discs: each one
     is a sphere of warm air that the camera can stand inside */
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uAlpha: { value: 0 },
      uColor: { value: new THREE.Color(1, 1, 1) },
      uFalloff: { value: 1.1 }
    },
    vertexShader: `
      varying vec3 vLocal;
      void main() {
        vLocal = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform float uAlpha;
      uniform vec3 uColor;
      uniform float uFalloff;
      varying vec3 vLocal;
      void main() {
        float r = clamp(length(vLocal), 0.0, 1.0);
        float a = pow(1.0 - r, uFalloff) * uAlpha;
        if (a < 0.002) discard;
        gl_FragColor = vec4(uColor * a, a);
      }`,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
    side: THREE.BackSide,
    toneMapped: false
  });
  for (const [name, bag] of Object.entries(statics)) {
    if (!/^glowSphere\d+$/.test(name)) continue;
    const colour = bag.color || { r: 1, g: 1, b: 1 };
    const p = bag.position || {};
    const sc = bag.scale || { x: 15, y: 15, z: 15 };
    const mesh = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture(),
      color: new THREE.Color(colour.r, colour.g, colour.b),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      toneMapped: false
    }));
    mesh.position.set(p.x || 0, p.y || 0, p.z || 0);
    mesh.scale.set(sc.x || 15, sc.y || 15, 1);
    mesh.center.set(0.5, 0.5);
    mesh.visible = false;
    mesh.renderOrder = bag.renderOrder === undefined ? 0 : bag.renderOrder;
    mesh.name = name;
    scene.add(mesh);
    glowSprites.push({ name, sprite: mesh });
  }
}

/* ══ build ═══════════════════════════════════════════════════════════════ */
async function build() {
  const { GLTFLoader } = await import('./vendor/GLTFLoader.js');
  const { DRACOLoader } = await import('./vendor/DRACOLoader.js');
  const { EXRLoader } = await import('./vendor/EXRLoader.js');

  renderer = new THREE.WebGLRenderer({
    canvas: el.canvas,
    antialias: true,
    powerPreference: 'high-performance',
    alpha: false
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = EXPOSURE;

  post = makePost(renderer, {});
  post.setSize(innerWidth, innerHeight);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  camera = new THREE.PerspectiveCamera(46.4, innerWidth / innerHeight, 0.05, 1000);
  scene.add(camera);

  const draco = new DRACOLoader();
  draco.setDecoderPath('/webgl/libs/draco/');
  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);

  const progress = (v) => {
    if (el.loaderProgress) el.loaderProgress.textContent = String(Math.round(Math.min(1, v) * 100)).padStart(2, '0');
  };

  progress(0.04);
  const gltf = await loader.loadAsync('/webgl/models/mainScene.glb', (e) => {
    if (e.total) progress(0.04 + 0.56 * (e.loaded / e.total));
  });
  room = gltf.scene;
  scene.add(room);
  roomDuration = (gltf.animations[0] && gltf.animations[0].duration) || roomDuration;
  roomMixer = new THREE.AnimationMixer(room);
  roomAnim = gltf.animations.find((c) => c.name === 'SCENE_01') || gltf.animations[0];
  if (roomAnim) roomMixer.clipAction(roomAnim).play();
  progress(0.62);

  let charGltf = null;
  try {
    charGltf = await loader.loadAsync('/webgl/models/mainScene_characters.glb');
    chars = charGltf.scene;
    scene.add(chars);
  } catch (e) {
    console.warn('[room] the figures did not load', e);
  }
  progress(0.72);

  /* the figures keep their own looping performances */
  if (chars && charGltf && charGltf.animations && charGltf.animations.length) {
    charMixer = new THREE.AnimationMixer(chars);
    for (const clip of charGltf.animations) {
      if (!/^(TC_|TE_|SM_|M_)/.test(clip.name || '')) continue;
      const a = charMixer.clipAction(clip);
      a.setLoop(THREE.LoopRepeat, Infinity);
      a.time = Math.random() * clip.duration;
      a.play();
    }
  }

  /* the watches, and everything that only exists to show a watch, goes */
  const NO_WATCH = /^(WATCH|watch_bg|Panthere|Camera fixed watches|Emptypodcast_CTA|TAILORED_CRAFTS|THE_EYE|SHAPING_MOVEMENT|MANUFACTURE)/i;
  for (const root of [room, chars]) {
    if (!root) continue;
    root.traverse((o) => {
      if (o.name && NO_WATCH.test(o.name)) {
        o.visible = false;
        if (o.isMesh && o.material) {
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          for (const m of mats) m.visible = false;
        }
      }
    });
  }

  buildVisibilityGroups();

  /* the baked light */
  lightmaps = [];
  for (let i = 0; i < 7; i++) {
    const url = i === 0
      ? '/webgl/textures/lightmaps/LIGHTMAP_SC00.webp'
      : `/webgl/textures/lightmaps/LIGHTMAP_SC0${i}_2K.webp`;
    try { lightmaps[i] = await warmLightmap(url); } catch (e) { lightmaps[i] = null; }
    progress(0.72 + 0.14 * ((i + 1) / 7));
  }

  const seen = new Set();
  for (const root of [room, chars]) {
    if (!root) continue;
    root.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of mats) {
        if (seen.has(m.uuid)) continue;
        seen.add(m.uuid);
        const i = sceneOf(o);
        if (i >= 0 && o.geometry.attributes.uv1 && lightmaps[i]) {
          m.lightMap = lightmaps[i];
          m.lightMapIntensity = LMI;
        }
        m.envMapIntensity = 0.5;
        if (m.map) { m.map.anisotropy = 4; m.map.channel = 0; }
        m.needsUpdate = true;
      }
    });
  }

  /* the figures are lit by the same bake */
  if (chars) {
    chars.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of mats) {
        charMaterials.add(m);
        m.transparent = true;
        m.opacity = 0;
        m.depthWrite = true;
      }
    });
  }

  /* the floor takes the light of whichever room is up */
  for (const m of floorMeshes) {
    const mats = Array.isArray(m.material) ? m.material : [m.material];
    for (const mat of mats) { mat.lightMap = lightmaps[0] || null; mat.lightMapIntensity = LMI * 0.42; }
  }

  /* the light decal that opens the room */
  room.traverse((o) => {
    if (/light_decal/i.test(o.name || '')) {
      lightDecal = o;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of mats) if (m) { m.transparent = true; m.opacity = 1; decalMaterials.push(m); }
    }
  });

  /* ambient from the reference's own irradiance probes */
  for (let i = 0; i < 7; i++) {
    try {
      const res = await fetch(`/webgl/textures/cubemaps/SC0${i}_sh.json`);
      if (!res.ok) continue;
      const data = await res.json();
      const sh = new THREE.SphericalHarmonics3();
      const order = ['L00', 'L1-1', 'L10', 'L11', 'L2-2', 'L2-1', 'L20', 'L21', 'L22'];
      sh.coefficients = order.map((n) => {
        const c = (data.coefficients || []).find((k) => k.name === n);
        return new THREE.Vector3(...(c ? c.rgb : [0, 0, 0]));
      });
      const probe = new THREE.LightProbe(sh);
      probe.intensity = 0.55;
      probe.visible = false;
      scene.add(probe);
      probes.push(probe);
    } catch (e) { /* no probe, no harm */ }
  }
  progress(0.9);

  new EXRLoader().load('/webgl/textures/cubemaps/SC00_oct.exr', (t) => {
    t.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = t;
    scene.environmentIntensity = 0.22;
  });

  buildLightDecal();
  buildGlows();
  buildHaze();

  /* our name in the opening room */
  try { await renameTitlePlanes(); } catch (e) { console.warn('[room] title planes', e); }

  progress(1);
  buildNav();
  applyChapter(CHAPTER === null ? 0 : CHAPTER, true);
  window.__MT__ = { THREE, scene, camera, room, chars, post, roomMixer, roomAnim,
    get clock() { return clock; }, set clock(v) { clock = v; } };
  window.__MT_READY__ = true;
}

/* ══ the chapter dots ═══════════════════════════════════════════════════ */
function buildNav() {
  el.nav.innerHTML = '';
  el.nav.setAttribute('scene-count', String(CHAPTERS.length - 1));
  for (let i = 1; i < CHAPTERS.length; i++) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'sideNavIndicationElt__dot';
    dot.setAttribute('aria-label', CHAPTERS[i].title.replace('<br>', ' '));
    dot.addEventListener('click', () => goTo(i));
    el.nav.appendChild(dot);
  }
}

function paintNav() {
  const dots = el.nav.querySelectorAll('.sideNavIndicationElt__dot');
  dots.forEach((d, i) => {
    d.classList.toggle('sideNavIndicationElt__dot--active', i + 1 === chapter);
  });
  el.nav.setAttribute('active-index', String(chapter - 1));
}

/* ══ the copy ════════════════════════════════════════════════════════════ */
function applyChapter(index) {
  chapter = Math.max(0, Math.min(CHAPTERS.length - 1, index));
  const c = CHAPTERS[chapter];
  el.titleText.innerHTML = c.title;
  el.baseline.innerHTML = c.baseline || '';
  el.baselineWrap.classList.toggle('homePage__bottomWrapper--intro--off', !c.baseline);
  paintNav();
}

/* ══ the clock ═══════════════════════════════════════════════════════════ */
function goTo(index) {
  const i = Math.max(0, Math.min(CHAPTERS.length - 1, index));
  clock = SCENE_TIMES[i];
  applyChapter(i);
  lastChapter = i;
}

function step(delta) {
  goTo(chapter + delta);
}

/* ══ the frame ══════════════════════════════════════════════════════════ */
let camNode = null;

function findCameraNode() {
  room.traverse((o) => { if (!camNode && /^Camera_anim/.test(o.name || '')) camNode = o; });
}

function applyVisibility() {
  /* the set pieces the timeline dims and fades */
  for (const [id, meshes] of visibilityGroups) {
    const parts = id.split('_');
    const opacity = value('objectsVisibility', `["${parts[0]}","${parts[1]}","opacity"]`, undefined);
    const dark = value('objectsVisibility', `["${parts[0]}","${parts[1]}","dark"]`, undefined);
    let vis = true;
    if (opacity !== undefined) vis = opacity > 0.02;
    for (const m of meshes) {
      m.visible = vis;
      if (!vis) continue;
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      for (const mat of mats) {
        if (!mat) continue;
        if (dark !== undefined) {
          if (mat.userData.baseColor === undefined && mat.color) mat.userData.baseColor = mat.color.clone();
          if (mat.userData.baseEmissive === undefined) {
            mat.userData.baseEmissive = mat.emissiveIntensity === undefined ? 1 : mat.emissiveIntensity;
          }
          const k = 1 - Math.min(1, Math.max(0, dark));
          if (mat.color && mat.userData.baseColor) mat.color.copy(mat.userData.baseColor).multiplyScalar(0.15 + 0.85 * k);
          mat.emissiveIntensity = mat.userData.baseEmissive * k;
        }
      }
    }
  }

  /* the crowd */
  let crowd = value('characters', '["opacity"]', 1);
  const sc = Math.max(0, Math.min(6, chapter));
  const perScene = value('objectsVisibility', `["sc${String(sc).padStart(2, '0')}_characters","opacity"]`, 1);
  crowd = Math.min(crowd, perScene);
  for (const m of charMaterials) m.opacity = Math.min(1, Math.max(0, crowd));

  /* the light that opens the room */
  const density = value('lightDecal0', '["density"]', 2.2);
  if (lightDecalMaterial) lightDecalMaterial.uniforms.uAlpha.value = Math.min(1.4, (density / 2.2) * DECAL);

  /* the glow blobs */
  for (const g of glowSprites) {
    const a = value(g.name, '["alpha"]', 0);
    g.sprite.material.opacity = a * GLOW;
    g.sprite.visible = a > 0.004;
  }
}

function updateCamera() {
  if (!camNode) findCameraNode();
  if (camNode) {
    room.updateMatrixWorld(true);
    camera.position.setFromMatrixPosition(camNode.matrixWorld);
    camera.quaternion.setFromRotationMatrix(camNode.matrixWorld);
  }
  const fov = value('camera', '["fov"]', 50);
  const off = value('camera', '["fovOffset"]', 0);
  /* the reference keeps its field of view on the long edge of the screen:
     on a phone held upright that is the horizontal one */
  const f = (FOV || fov) + off;
  if (HFOV) {
    camera.fov = 2 * Math.atan(Math.tan(HFOV * Math.PI / 360) / camera.aspect) * 180 / Math.PI;
  } else if (camera.aspect < 1) {
    camera.fov = 2 * Math.atan(Math.tan(f * Math.PI / 360) / camera.aspect) * 180 / Math.PI;
  } else {
    camera.fov = f;
  }
  camera.updateProjectionMatrix();
}

/* the figures stand in the same rooms, so they follow the room */
const SCENE_NODES = [];
function collectSceneNodes() {
  SCENE_NODES.length = 0;
  for (let i = 0; i < 7; i++) {
    const r = findNode(room, `Empty.SC0${i}`);
    const c = chars ? findNode(chars, `Empty.SC0${i}`) : null;
    SCENE_NODES.push([r, c]);
  }
}

let lastTime = performance.now();
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (now - lastTime) / 1000);
  lastTime = now;

  if (!scene) return;

  if (!STILL && !REDUCED) {
    clock += dt;
    if (clock > timelineLength) clock -= timelineLength;
  }

  /* the room's own clip: the rooms lift, the camera climbs */
  if (roomMixer && roomAnim) {
    roomMixer.setTime(Math.min(clock, roomDuration));
  }
  for (const [r, c] of SCENE_NODES) {
    if (r && c) c.position.y = r.position.y;
  }
  if (charMixer) charMixer.update(dt);

  applyVisibility();
  updateCamera();

  /* which chapter are we on? the timeline says */
  const current = Math.round(value('currentScene', '["in"]', 0));
  const c = Math.max(0, Math.min(CHAPTERS.length - 1, current));
  if (c !== lastChapter) {
    lastChapter = c;
    applyChapter(c);
  }

  /* the reference's own cues for what is on screen */
  const titleOn = value('ui', '["sceneTitle"]', 0) === true && current > 0;
  el.titleLayer.classList.toggle('sceneTitle__layer--off', !titleOn);
  el.titleLayer.classList.toggle('intro', current === 0);
  const exploreOn = value('ui', '["exploreBttn"]', 0) === true;
  el.explore.classList.toggle('homePage__exploreButton--off', !exploreOn);
  el.scroll.classList.toggle('scrollButton--off', clock > 1.6);
  el.baselineWrap.classList.toggle('homePage__bottomWrapper--intro--off', current !== 0 || clock > 1.6);

  /* the loop's forced dark is the reference's own cut: it never hides the
     room or the interface, so it is read but not applied */
  /* the blur the reference leaves on the cuts */
  post.uniforms.uBlur.value = Math.min(1, Math.max(0, value('motionBlur', '["blur"]', 0)));

  /* the volumes of light we are standing in wash over the whole frame */
  if (haze) {
    let a = 0;
    const c = new THREE.Color(0, 0, 0);
    for (const g of glowSprites) {
      const alpha = value(g.name, '["alpha"]', 0);
      if (alpha <= 0) continue;
      const sc = (statics[g.name] && statics[g.name].scale) || { x: 15, y: 15, z: 15 };
      const r = (sc.x || 15);
      const d = camera.position.distanceTo(g.sprite.position);
      if (d >= r) continue;
      const k = (1 - d / r) * alpha * GLOW * 0.55;
      if (k <= 0) continue;
      a += k;
      const col = (statics[g.name] && statics[g.name].color) || { r: 1, g: 1, b: 1 };
      c.r += col.r * k; c.g += col.g * k; c.b += col.b * k;
    }
    haze.material.uniforms.uAlpha.value = Math.min(1, a);
    haze.material.uniforms.uColor.value.set(c.r, c.g, c.b).multiplyScalar(1 / Math.max(1e-6, a));
  }

  /* the floor is lit by the room we are standing in */
  const lp = Math.max(0, Math.min(6, current));
  if (lp !== floorRoom) {
    floorRoom = lp;
    for (const m of floorMeshes) {
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      for (const mat of mats) { mat.lightMap = lightmaps[lp] || null; mat.needsUpdate = true; }
    }
  }

  /* one probe per room, the one we are standing in */
  const p = Math.max(0, Math.min(probes.length - 1, current));
  if (p !== activeProbe) {
    probes.forEach((pr, i) => { pr.visible = i === p; });
    activeProbe = p;
  }

  post.render(scene, camera, dt);
}

/* ══ input ══════════════════════════════════════════════════════════════ */
function bindInput() {
  let startX = 0, startY = 0, startT = 0, dragging = false;

  el.canvas.addEventListener('pointerdown', (e) => {
    dragging = true;
    startX = e.clientX; startY = e.clientY; startT = performance.now();
  });
  const release = (e) => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const dt = performance.now() - startT;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) && dt < 900) {
      step(dx < 0 ? 1 : -1);
    }
  };
  el.canvas.addEventListener('pointerup', release);
  el.canvas.addEventListener('pointercancel', () => { dragging = false; });

  addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') { step(1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') { step(-1); e.preventDefault(); }
    else if (e.key === ' ') { step(1); e.preventDefault(); }
  });

  let wheelLock = 0;
  addEventListener('wheel', (e) => {
    const now = performance.now();
    if (now - wheelLock < 700) return;
    if (Math.abs(e.deltaX) < 18 && Math.abs(e.deltaY) < 18) return;
    wheelLock = now;
    step((e.deltaX || e.deltaY) > 0 ? 1 : -1);
  }, { passive: true });

  el.explore.addEventListener('click', () => step(1));
  el.scroll.addEventListener('click', () => goTo(1));

  el.sound.addEventListener('click', () => {
    soundOn = !soundOn;
    el.sound.classList.toggle('soundButton--active', soundOn);
    el.sound.setAttribute('aria-pressed', String(soundOn));
    if (soundOn) startAudio(); else stopAudio();
  });
}

let audioCtx = null, audioNode = null, audioGain = null;
function startAudio() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (!audioNode) {
      const req = new XMLHttpRequest();
      req.open('GET', '/assets/audio/mainTheme.wav', true);
      req.responseType = 'arraybuffer';
      req.onload = () => {
        audioCtx.decodeAudioData(req.response, (buf) => {
          audioNode = audioCtx.createBufferSource();
          audioNode.buffer = buf;
          audioNode.loop = true;
          audioGain = audioCtx.createGain();
          audioGain.gain.value = 0.5;
          audioNode.connect(audioGain).connect(audioCtx.destination);
          audioNode.start();
        });
      };
      req.send();
    } else {
      try { audioNode.start(); } catch (e) { /* already running */ }
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch (e) { console.warn('[room] sound', e); }
}
function stopAudio() {
  if (audioNode) { try { audioNode.stop(); } catch (e) { /* already stopped */ } }
  if (audioCtx && audioCtx.state === 'running') audioCtx.suspend();
}

function resize() {
  if (!renderer) return;
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight, false);
  post.setSize(innerWidth, innerHeight);
}

/* ══ go ══════════════════════════════════════════════════════════════════ */
(async function main() {
  try {
    const state = await fetch('/theatre/mainScene.theatre-state.json').then((r) => r.json());
    readTimeline(state);
  } catch (e) {
    console.warn('[room] no timeline; the room still runs', e);
  }

  try {
    await build();
  } catch (e) {
    console.error('[room] the room did not build', e);
    el.loader.classList.add('mainLoader--hidden');
    return;
  }

  collectSceneNodes();
  if (AT !== null) clock = AT;
  else if (CHAPTER !== null) clock = SCENE_TIMES[CHAPTER];
  el.loader.classList.add('shown');
  setTimeout(() => el.loader.classList.add('mainLoader--hidden'), 900);

  bindInput();
  addEventListener('resize', resize);
  resize();
  requestAnimationFrame((t) => { lastTime = t; frame(t); });
})();
