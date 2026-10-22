/* ==========================================================================
   Mindful Tattva — the room
   --------------------------------------------------------------------------
   One full-bleed 3D room per chapter, the counting loader, the centred serif
   line, EXPLORE, the segmented bar, SOUND. Chapters sit sideways of each
   other and are reached by swiping left or right, in either direction, for
   as long as you like. Nothing gets stuck.

   The scene is the captured Cartier set, restaged for the club:
     • the watch layer and the fan typography are switched off
     • every room is lit by its baked light, warmed and dimmed to film level
     • each chapter frames its own room with a slow, breathing camera
   ========================================================================== */

import * as THREE from './vendor/three.module.js';
import { makePost } from './post.js';

const PARAMS = new URLSearchParams(location.search);
const STILL = PARAMS.has('still');

/* ── the chapters, in the order they are told ────────────────────────────── */
const SCENES = [
  { id: 'intro',   kicker: 'A psychology club',      title: 'Mindful\nTattva',          cta: null,             room: 0,
    cam: { p: [-1.9, 2.7, 21.0], l: [-1.9, 3.6, 12.0], fov: 54 } },
  { id: 'room',    kicker: 'i \u2014 The room',       title: 'The room\nwe keep',        cta: 'Explore',        room: 1,
    cam: { p: [-3.6, 2.50, -2.0], l: [1.5, 2.10, -8.5], fov: 62 } },
  { id: 'circles', kicker: 'ii \u2014 Conversations', title: 'Small circles\nof talking', cta: 'Explore',       room: 1,
    cam: { p: [0.3, 2.35, 4.4], l: [0.3, 2.7, -4.4], fov: 60 } },
  { id: 'view',    kicker: 'iii \u2014 The long view', title: 'Ground we\nstand on',     cta: 'Explore',        room: 2,
    cam: { p: [0.11, 2.13, -4.75], l: [0.11, 1.73, 3.25], fov: 66 } },
  { id: 'wall',    kicker: 'iv \u2014 The wall',     title: 'Ten faces\non the wall',   cta: 'Explore',        room: 4,
    cam: { p: [-4.2, 4.0, -1.4], l: [0.2, 3.2, 6.0], fov: 56 } },
  { id: 'texts',   kicker: 'v \u2014 The reading room', title: 'Texts we\nreturn to',   cta: 'Explore',        room: 3,
    cam: { p: [0.0, 2.4, -3.5], l: [0.0, 4.2, -14.0], fov: 62 } },
  { id: 'lamp',    kicker: 'vi \u2014 The quiet room', title: 'The light\nwe leave on',  cta: 'Explore',        room: 6,
    cam: { p: [-2.0, 3.20, 24.0], l: [-2.0, 1.60, 10.0], fov: 62 } },
  { id: 'visit',   kicker: 'vii \u2014 Visit',        title: 'Come and\nsit with us',    cta: 'Visit the club', room: 1,
    cam: { p: [2.8, 2.40, 7.0], l: [-1.2, 2.20, -5.0], fov: 60 } }
];

/* the watch layer, the product typography, the mirror duplicates ──────── */
const HIDE = /^(baignoire|roadster|santos|crash|WATCH|watch_bg|Panthere|Empty\.podcast_CTA|SC00_FontPlane|MIRROR_|.*_hit|curved_hit)/i;

const $ = (sel) => document.querySelector(sel);
const boot = $('#mt-loader'), bootNum = $('#mt-loader-num');
const titleEl = $('#mt-title'), kickerEl = $('#mt-kicker'), ctaEl = $('#mt-cta');
const dotsEl = $('#mt-dots'), fadeEl = $('#mt-fade'), countNow = $('#mt-count-now');

let renderer, post, scene, camera, main, chars, lightmaps = [], duration = 24.33;
let mixer, charMixer, track = null;
const probes = [];
let activeProbe = null;

let index = 0;            // chapter we are on
let pending = null;       // chapter we are going to
let camFrom = null;       // camera at the start of a move
let moveT = 0;            // 0 → 1 progress of the camera move
let arriving = 0;         // seconds since the chapter settled
let clockDrift = 0;

/* ── lightmaps: red channel is the bake; tint it warm ───────────────────── */
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
  /* The bake stores irradiance in the red channel only. Sampled raw it paints
     the whole set crimson, so it is collapsed to luminance and tinted to the
     warm light the club actually has. */
  const TINT = [1.0, 0.76, 0.50];
  for (let i = 0; i < d.length; i += 4) {
    const l = d[i] / 255;
    d[i] = 255 * Math.min(1, l * TINT[0]);
    d[i + 1] = 255 * Math.min(1, l * TINT[1]);
    d[i + 2] = 255 * Math.min(1, l * TINT[2]);
    d[i + 3] = 255;
  }
  ctx.putImageData(px, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.flipY = false;
  tex.channel = 1;
  tex.colorSpace = THREE.NoColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function roomOf(o) {
  let p = o, n = 0;
  while (p && n++ < 20) {
    const m = /Empty[._]?SC0(\d)/.exec(p.name || '');
    if (m) return +m[1];
    p = p.parent;
  }
  return -1;
}

/* ── build ───────────────────────────────────────────────────────────────── */
async function build() {
  const { GLTFLoader } = await import('./vendor/GLTFLoader.js');
  const { DRACOLoader } = await import('./vendor/DRACOLoader.js');
  const { EXRLoader } = await import('./vendor/EXRLoader.js');

  renderer = new THREE.WebGLRenderer({ canvas: $('#mt-canvas'), antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

  post = makePost(renderer, {});
  post.setSize(innerWidth, innerHeight);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.FogExp2(0x050403, 0.008);
  camera = new THREE.PerspectiveCamera(58, innerWidth / innerHeight, 0.08, 900);

  const draco = new DRACOLoader();
  draco.setDecoderPath('/webgl/libs/draco/');
  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);

  const progress = (v) => { if (bootNum) bootNum.textContent = String(Math.round(Math.min(1, v) * 100)); };

  progress(0.04);
  const gltf = await loader.loadAsync('/webgl/models/mainScene.glb', (e) => {
    if (e.total) progress(0.04 + 0.58 * (e.loaded / e.total));
  });
  main = gltf.scene;
  scene.add(main);
  duration = gltf.animations[0].duration;
  progress(0.66);

  let charGltf = null;
  try {
    charGltf = await loader.loadAsync('/webgl/models/mainScene_characters.glb');
    chars = charGltf.scene;
    scene.add(chars);
  } catch (e) { chars = null; }
  progress(0.78);

  /* the figures are animated in their own file: 28 looping performances */
  if (chars && charGltf && charGltf.animations && charGltf.animations.length) {
    charMixer = new THREE.AnimationMixer(chars);
    let n = 0;
    charGltf.animations.forEach((clip) => {
      if (!/^(TC_|TE_|SM_|M_|F_|S_|char)/i.test(clip.name || '')) return;
      const a = charMixer.clipAction(clip);
      a.setLoop(THREE.LoopRepeat, Infinity);
      a.time = Math.random() * clip.duration;
      a.play();
      n++;
    });
    window.__MT_CLIPS__ = n;
  }

  [main, chars].filter(Boolean).forEach((r) => r.traverse((o) => {
    if (HIDE.test(o.name || '')) o.visible = false;
  }));


  for (let i = 0; i < 7; i++) {
    const url = i === 0 ? '/webgl/textures/lightmaps/LIGHTMAP_SC00.webp' : `/webgl/textures/lightmaps/LIGHTMAP_SC0${i}_2K.webp`;
    try { lightmaps[i] = await warmLightmap(url); } catch (e) { lightmaps[i] = null; }
    progress(0.78 + 0.12 * ((i + 1) / 7));
  }

  const seen = new Set();
  [main, chars].filter(Boolean).forEach((r) => r.traverse((o) => {
    if (!o.isMesh || !o.material) return;
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    mats.forEach((m) => {
      if (seen.has(m.uuid)) return;
      seen.add(m.uuid);
      const i = roomOf(o);
      const shell = /^outside_box/i.test(o.name || '');
      if (shell) {
        // the room walls stay in shadow; the set pieces carry the light
        if (m.color) m.color.multiplyScalar(0.42);
        if (m.emissiveMap) m.emissiveIntensity = 0.3;
      }
      if (i >= 0 && o.geometry.attributes.uv1 && lightmaps[i]) {
        m.lightMap = lightmaps[i];
        m.lightMapIntensity = shell ? 4.2 : 5.2;
      }
      m.envMapIntensity = 0.22;
      if (m.color) m.color.multiplyScalar(0.78);
      if (m.map) m.map.anisotropy = 4;
      // the export drives these panels at 3–8× as flat light. At film level
      // they become the glow the reference keeps in its windows and lamps.
      if (m.emissiveMap) m.emissiveIntensity = Math.min(1.7, Math.min(m.emissiveIntensity || 1, 8) * 0.3);
      m.needsUpdate = true;
    });
  }));

  // ambient from the reference's own irradiance probes (SC0k_sh.json)
  for (let i = 0; i < 7; i++) {
    try {
      const res = await fetch(`/webgl/textures/cubemaps/SC0${i}_sh.json`);
      if (!res.ok) continue;
      const data = await res.json();
      const sh = new THREE.SphericalHarmonics3();
      const order = ['L00', 'L1-1', 'L10', 'L11', 'L2-2', 'L2-1', 'L20', 'L21', 'L22'];
      sh.coefficients = order.map((name) => {
        const c = (data.coefficients || []).find((k) => k.name === name);
        return new THREE.Vector3(...(c ? c.rgb : [0, 0, 0]));
      });
      probes[i] = new THREE.LightProbe(sh);
      probes[i].intensity = 0.9;
    } catch (e) { /* no probe, no harm */ }
  }

  new EXRLoader().load('/webgl/textures/cubemaps/SC00_oct.exr', (t) => {
    t.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = t;
  });

  scene.add(new THREE.AmbientLight(0xffffff, 0.12));
  scene.environmentIntensity = 0.22;

  /* the export parks whole sub-assemblies hundreds of metres down, and the
     site's own timeline lifts them one at a time. We bring them all home and
     then show a single room per chapter — same rooms, far less machinery. */
  const contentBox = (room) => {
    const min = [1e9, 1e9, 1e9], max = [-1e9, -1e9, -1e9];
    let n = 0;
    [main, chars].filter(Boolean).forEach((root) => root.traverse((o) => {
      if (!o.isMesh || !o.visible) return;
      if (roomOf(o) !== room) return;
      if (/outside_box|MIRROR_|_hit|curved|FontPlane/i.test(o.name || '')) return;
      o.geometry.computeBoundingBox();
      const b = o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld);
      if (b.max.y < -2 || b.min.y > 24) return;
      if (b.max.x - b.min.x > 44 || b.max.z - b.min.z > 44) return;
      n++;
      ['x', 'y', 'z'].forEach((ax, k) => { min[k] = Math.min(min[k], b.min[ax]); max[k] = Math.max(max[k], b.max[ax]); });
    }));
    return n ? { n, min, max } : null;
  };
  window.__MT_CONTENT__ = contentBox;

  const unpark = () => {
    let n = 0;
    [main, chars].filter(Boolean).forEach((r) => r.traverse((o) => {
      if (o.name && o.position.y < -20) { o.position.y = 0; n++; }
    }));
    [main, chars].filter(Boolean).forEach((r) => r.updateMatrixWorld(true));
    return n;
  };
  window.__MT_UNPARK__ = unpark;
  unpark();

  progress(0.97);

  stage(0, true);
  window.__MT_READY__ = true;
}

/* one room at a time; the shells are shared, the interiors are not */
function showRoom(room) {
  if (probes[room]) {
    if (activeProbe) scene.remove(activeProbe);
    activeProbe = probes[room];
    scene.add(activeProbe);
  }
  const keep = (o) => {
    const r = roomOf(o);
    if (r < 0) return true;                       // untagged set dressing
    if (/^outside_box/i.test(o.name || '')) return true;  // the shell
    return r === room;
  };
  [main, chars].filter(Boolean).forEach((root) => root.traverse((o) => {
    if (!o.isMesh) return;
    if (HIDE.test(o.name || '')) { o.visible = false; return; }
    o.visible = keep(o);
  }));
}

function stage(i, immediate) {
  const s = SCENES[i];
  if (!s) return;
  showRoom(s.room);

  if (immediate || STILL) {      // stills mode: cut, never glide
    applyCam(s);
    camFrom = null;
    moveT = 1;
  } else {
    camFrom = { p: camera.position.clone(), l: lookPoint.clone(), fov: camera.fov };
    moveT = 0;
  }
  arriving = 0;
}

/* ── camera ─────────────────────────────────────────────────────────────── */
const lookPoint = new THREE.Vector3();
const shot = { p: new THREE.Vector3(), l: new THREE.Vector3(), fov: 58 };

function shellBox(room) {
  let out = null;
  [main, chars].filter(Boolean).forEach((root) => root.traverse((o) => {
    if (out || !o.isMesh) return;
    if (!new RegExp('^outside_box_SC0' + room + '$', 'i').test(o.name || '')) return;
    o.geometry.computeBoundingBox();
    const b = o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld);
    out = { min: [b.min.x, b.min.y, b.min.z], max: [b.max.x, b.max.y, b.max.z] };
  }));
  return out;
}

function autoCam(s) {
  const box = window.__MT_CONTENT__ && window.__MT_CONTENT__(s.room);
  if (!box) return s.cam;
  const shell = shellBox(s.room);
  const cc = [0, 1, 2].map((k) => (box.min[k] + box.max[k]) / 2);
  if (shell) {
    const sc = [0, 1, 2].map((k) => (shell.min[k] + shell.max[k]) / 2);
    const dir = [0, 2].map(() => 0);
    // stand between the shell centre and the content, a third of the way out
    const v = [cc[0] - sc[0], 0, cc[2] - sc[2]];
    const len = Math.hypot(v[0], v[2]) || 1;
    const back = Math.max(2.5, Math.min(9, len * 0.55));
    const p = [cc[0] - (v[0] / len) * back, Math.max(1.9, Math.min(3.2, cc[1] + 0.5)), cc[2] - (v[2] / len) * back];
    return { p, l: [cc[0], cc[1] + 0.3, cc[2]], fov: 58 };
  }
  const c = [0, 1, 2].map((k) => (box.min[k] + box.max[k]) / 2);
  const depth = Math.max(2, box.max[2] - box.min[2]);
  const wide = Math.max(2, box.max[0] - box.min[0]);
  // stand back from the content, towards the middle of the room
  const sign = c[2] > 8 ? -1 : 1;
  const z = c[2] + sign * (depth * 0.5 + 3.4);
  return { p: [c[0] * 0.4, Math.max(1.9, Math.min(3.1, c[1] + 0.9)), z],
           l: [c[0] * 0.7, Math.max(2.2, c[1] + 0.4), c[2]], fov: 58 };
}

function clampInside(s, c) {
  const shell = shellBox(s.room);
  if (!shell) return c;
  const m = 1.1;
  const p = [0, 1, 2].map((k) => Math.min(shell.max[k] - m, Math.max(shell.min[k] + m, c.p[k])));
  p[1] = Math.max(shell.min[1] + 1.4, p[1]);
  return Object.assign({}, c, { p });
}

function applyCam(s) {
  /* the framings below were chosen against the real set, so they are used as
     authored; only the fallback auto framing needs clamping */
  const base = (window.__MT_AUTOCAM__ ? autoCam(s) : s.cam) || s.cam;
  const c = window.__MT_AUTOCAM__ ? clampInside(s, base) : base;
  camera.position.set(c.p[0], c.p[1], c.p[2]);
  lookPoint.set(c.l[0], c.l[1], c.l[2]);
  camera.fov = c.fov || 58;
  camera.updateProjectionMatrix();
  camera.lookAt(lookPoint);
  shot.p.copy(camera.position);
  shot.l.copy(lookPoint);
  shot.fov = camera.fov;
}

/* every chapter breathes: a slow push in, a slow sideways drift */
function breathe(dt) {
  const s = SCENES[index];
  arriving += dt;
  const e = 1 - Math.pow(1 - Math.min(1, arriving / 7), 2);
  const drift = Math.sin(clockDrift * 0.21) * 0.16;
  const push = e * 0.62;

  const forward = new THREE.Vector3().subVectors(lookPoint, camera.position).normalize();
  const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
  camera.position.addScaledVector(forward, push * 0.05);
  camera.position.addScaledVector(right, drift * 0.02);
  if (!STILL) camera.position.y += Math.sin(clockDrift * 0.6) * 0.004;
  camera.lookAt(lookPoint);
}

/* ── frame ──────────────────────────────────────────────────────────────── */
function frame(dt) {
  if (!scene) return;
  clockDrift += dt;

  if (camFrom) {
    moveT = Math.min(1, moveT + dt / 0.9);
    const k = moveT < 0.5 ? 2 * moveT * moveT : 1 - Math.pow(-2 * moveT + 2, 2) / 2;
    const sc = SCENES[index];
    const base = window.__MT_AUTOCAM__ ? clampInside(sc, autoCam(sc)) : sc.cam;
    const target = { p: base.p, l: base.l, fov: base.fov };
    camera.position.set(
      camFrom.p.x + (target.p[0] - camFrom.p.x) * k,
      camFrom.p.y + (target.p[1] - camFrom.p.y) * k,
      camFrom.p.z + (target.p[2] - camFrom.p.z) * k
    );
    lookPoint.set(
      camFrom.l.x + (target.l[0] - camFrom.l.x) * k,
      camFrom.l.y + (target.l[1] - camFrom.l.y) * k,
      camFrom.l.z + (target.l[2] - camFrom.l.z) * k
    );
    camera.fov = camFrom.fov + ((target.fov || 58) - camFrom.fov) * k;
    camera.updateProjectionMatrix();
    camera.lookAt(lookPoint);
    if (moveT >= 1) camFrom = null;
  } else if (window.__MT_FREE__) {
    const f = window.__MT_FREE__;
    camera.position.set(f.p[0], f.p[1], f.p[2]);
    lookPoint.set(f.l[0], f.l[1], f.l[2]);
    camera.lookAt(lookPoint);
  } else {
    breathe(dt);
  }

  if (charMixer) charMixer.update(dt);
  post.render(scene, camera, dt);
}

/* ── chapters ───────────────────────────────────────────────────────────── */
let busy = false;

function paint(i) {
  const s = SCENES[i];
  if (kickerEl) kickerEl.textContent = s.kicker || '';
  if (titleEl) {
    titleEl.classList.remove('is-huge');
    titleEl.innerHTML = s.title.split('\n').map((l) => `<span>${l}</span>`).join('');
    if (i === 0) titleEl.classList.add('is-huge');
  }
  if (ctaEl) {
    ctaEl.textContent = s.cta || '';
    ctaEl.classList.toggle('is-off', !s.cta);
  }
  [...dotsEl.children].forEach((d, k) => {
    d.classList.toggle('is-on', k === i);
    d.classList.toggle('is-done', k < i);
  });
  if (countNow) countNow.textContent = String(i + 1).padStart(2, '0');
  document.body.dataset.scene = s.id;
}

/* One absolute position (`want`) plus a kick: however many swipes arrive while
   the frame is black, they are summed instead of dropped, so a run of quick
   swipes lands exactly where the reader expects and nothing ever sticks. */
let want = 0;

function go(next) {
  want = Math.max(0, Math.min(SCENES.length - 1, Math.round(next)));
  kick();
}

function nudge(dir) {
  const from = busy ? want : index;
  want = Math.max(0, Math.min(SCENES.length - 1, from + dir));
  kick();
}

function kick() {
  if (busy || want === index) return;
  busy = true;
  pending = want;

  fadeEl?.classList.add('is-on');
  setTimeout(() => {
    index = want;
    paint(index);
    stage(index, false);          // the room changes while the frame is black
    fadeEl?.classList.remove('is-on');
    busy = false;
    pending = null;
    const hint = $('#mt-swipe');
    hint?.classList.remove('on');
    if (want !== index) kick();   // another swipe arrived during the fade
  }, 430);
}

/* ── sideways: drag, swipe, trackpad, keys ──────────────────────────────── */
function wireNavigation() {
  let sx = 0, sy = 0, st = 0, down = false, moved = 0;

  const cancel = () => { down = false; };

  window.addEventListener('pointerdown', (e) => {
    if (e.target.closest && e.target.closest('a, button')) return;
    sx = e.clientX; sy = e.clientY; st = performance.now(); down = true; moved = 0;
  }, { passive: true });

  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    moved = Math.max(moved, Math.abs(e.clientX - sx), Math.abs(e.clientY - sy));
    if (moved > 26) document.body.classList.add('is-dragging');
  }, { passive: true });

  const release = (x, y) => {
    if (!down) return;
    down = false;
    document.body.classList.remove('is-dragging');
    const dx = (x ?? sx) - sx, dy = (y ?? sy) - sy;
    const dt = performance.now() - st;
    if (Math.abs(dx) > 34 && Math.abs(dx) > Math.abs(dy) * 1.1 && dt < 1100) {
      nudge(dx < 0 ? 1 : -1);
    }
  };

  window.addEventListener('pointerup', (e) => release(e.clientX, e.clientY), { passive: true });
  window.addEventListener('pointercancel', cancel, { passive: true });

  let wheelT = 0;
  window.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (Math.abs(e.deltaX) > 26 && performance.now() - wheelT > 420) {
        wheelT = performance.now();
        nudge(e.deltaX > 0 ? 1 : -1);
      }
      return;
    }
    if (Math.abs(e.deltaY) > 26 && performance.now() - wheelT > 700) {
      wheelT = performance.now();
      nudge(e.deltaY > 0 ? 1 : -1);
    }
  }, { passive: true });

  window.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); nudge(1); }
    if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); nudge(-1); }
  });
}

/* ── sound: a room tone grown in the browser, no files ─────────────────── */
function wireCta() {
  if (!ctaEl) return;
  ctaEl.addEventListener('click', () => { location.href = '/'; });
}

function wireSound() {
  const wrap = $('#mt-sound'), btn = $('#mt-sound-toggle'), state = $('#mt-sound-state');
  let ctx = null, gain = null, on = false;

  const make = () => {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    const len = ctx.sampleRate * 4;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;       // brown-ish, room-like
      d[i] = last * 3.2;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf; src.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 420;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 40;
    gain = ctx.createGain();
    gain.gain.value = 0;
    src.connect(hp).connect(lp).connect(gain).connect(ctx.destination);
    src.start();
    return ctx;
  };

  btn?.addEventListener('click', () => {
    if (!ctx) make();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    on = !on;
    gain.gain.linearRampToValueAtTime(on ? 0.055 : 0, ctx.currentTime + (on ? 1.2 : 0.6));
    wrap.dataset.on = on ? '1' : '0';
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (state) state.textContent = on ? 'On' : 'Off';
  });
}

/* ── resize / reveal ────────────────────────────────────────────────────── */
function resize() {
  if (!renderer) return;
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.fov = SCENES[index].cam.fov || 58;
  camera.updateProjectionMatrix();
  post.setSize(w, h);
}

let revealed = false;
function reveal() {
  if (revealed) return;
  revealed = true;
  if (bootNum) bootNum.textContent = '100';
  setTimeout(() => {
    boot?.classList.add('is-done');
    document.body.classList.add('is-ready');
    $('#mt-vignette')?.classList.add('on');
    const hint = $('#mt-swipe');
    hint?.classList.add('on');
    setTimeout(() => hint?.classList.remove('on'), 6500);
  }, 260);
}

/* ── boot ───────────────────────────────────────────────────────────────── */
function start() {
  if (dotsEl) {
    SCENES.forEach((s, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'mt-dot';
      b.setAttribute('aria-label', s.id);
      b.addEventListener('click', () => go(i));
      dotsEl.appendChild(b);
    });
  }
  paint(0);
  wireNavigation();
  wireCta();
  wireSound();
  window.addEventListener('resize', resize);

  let last = performance.now();
  (function loop(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    try { frame(dt); } catch (e) { /* keep the loop alive */ }
    requestAnimationFrame(loop);
  })(last);

  resize();
  build().then(reveal).catch((err) => {
    console.error('[room]', String((err && err.stack) || err));
    $('#mt-fallback')?.classList.add('is-on');
    reveal();
  });
  setTimeout(reveal, 22000);

  window.__MT_GO__ = go;
  window.__MT_ROOM__ = { go, get index() { return index; }, get scene() { return scene; } };
  window.__MT_DBG__ = {
    THREE, get scene() { return scene; }, get camera() { return camera; }, get renderer() { return renderer; },
    get main() { return main; }, get chars() { return chars; }, get mixer() { return mixer; },
    roomOf, hide: HIDE, SCENES,
    free(p, l, fov) {
      window.__MT_FREE__ = { p, l };
      camera.position.set(p[0], p[1], p[2]);
      lookPoint.set(l[0], l[1], l[2]);
      if (fov) { camera.fov = fov; camera.updateProjectionMatrix(); }
      camera.lookAt(lookPoint);
    },
    stageNow(t) {}
    , content: (r) => window.__MT_CONTENT__ && window.__MT_CONTENT__(r)
    , auto: (on) => { window.__MT_AUTOCAM__ = on; }
    , setRoom(r) { showRoom(r); }
    , state() { return { index, moveT, camFrom: !!camFrom, cam: camera.position.toArray(), look: lookPoint.toArray(), fov: camera.fov }; }
  };
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
else start();
