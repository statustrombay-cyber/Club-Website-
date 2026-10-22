/* Mindful Tattva — six rooms.
   Boot, textures, a camera you can turn all the way around, light, and the loop. */

import { createContext, program, draw } from './gl.js';
import { mat4, multiply, perspective, lookAt, normalMat3, compose, clamp } from './m4.js';
import {
  objVS, objFS, glowVS, glowFS, figureVS, figureFS,
  shadowVS, emptyFS, dustVS, dustFS, spriteVS, hazeFS, shadowDiscFS,
} from './shaders.js';
import { createWorld, ROOM_W, ROOM_D, ROOM_H, EYE, ROOM_GAP } from './world.js';
import { createPost } from './post.js';
import { loadImage, texture, cutout, posterCanvas, numeralCanvas, artCanvases, skyVariants } from './textures.js';

const $ = (s) => document.querySelector(s);
const canvas = $('#stage');
const loader = $('#loader');
const pctEl = $('#pct');
const barFill = $('#bar');
const chapterEl = $('#chapter');
const kickerEl = $('#kicker');
const titleEl = $('#title');
const subEl = $('#sub');
const dotsEl = $('#dots');
const counterEl = $('#counter');
const hintEl = $('#hint');
const soundBtn = $('#sound');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let errored = false;
function surface(msg) {
  if (errored) return;
  errored = true;
  const box = $('#error');
  if (box) { box.hidden = false; box.textContent = msg; }
  console.error(msg);
}
window.addEventListener('error', (e) => surface(e.message || 'Something failed to draw.'));

let gl;
try {
  gl = createContext(canvas);
} catch (e) {
  loader.dataset.done = '1';
  $('#fallback').hidden = false;
  surface('This browser could not start WebGL 2.');
}

if (gl) run(gl);

function run(gl) {
  const surf = program(gl, objVS, objFS, 'surf');
  const glowP = program(gl, glowVS, glowFS, 'glow');
  const figP = program(gl, figureVS, figureFS, 'figure');
  const shadowP = program(gl, shadowVS, emptyFS, 'shadow');
  const dustP = program(gl, dustVS, dustFS, 'dust');
  const hazeP = program(gl, spriteVS, hazeFS, 'haze');
  const discP = program(gl, spriteVS, shadowDiscFS, 'disc');

  const world = createWorld(gl);
  const shadowSize = window.innerWidth < 720 ? 1024 : 2048;

  const shadowTex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, shadowTex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT24, shadowSize, shadowSize, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const shadowFB = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, shadowFB);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, shadowTex, 0);
  gl.drawBuffers([gl.NONE]);
  gl.readBuffer(gl.NONE);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  /* ── loading ────────────────────────────────────────────────────────────── */
  let shown = 0;
  const setProgress = (p, label) => {
    shown = Math.max(shown, p);
    pctEl.textContent = String(Math.min(100, Math.round(shown)));
    barFill.style.width = shown + '%';
    const note = $('.loader__note');
    if (label && note) note.textContent = label;
  };

  async function loadEverything() {
    const base = './assets/tex/';
    setProgress(8, 'Fetching the light');
    const [plaster, floor, sky, f1, f2, f3, f4, f5] = await Promise.all([
      loadImage(base + 'plaster.jpg'),
      loadImage(base + 'floor.jpg'),
      loadImage(base + 'sky-dunes.jpg'),
      loadImage(base + 'figure-1.jpg'),
      loadImage(base + 'figure-2.jpg'),
      loadImage(base + 'figure-3.jpg'),
      loadImage(base + 'figure-4.jpg'),
      loadImage(base + 'figure-5.jpg'),
    ]);
    setProgress(48, 'Cutting out the figures');
    await new Promise((r) => requestAnimationFrame(r));
    const figImgs = [f1, f2, f3, f4, f5];
    const figures = figImgs.map((img) => cutout(gl, img, 680));

    setProgress(72, 'Hanging the works');
    if (document.fonts) {
      try { await document.fonts.load('300 100px "Bodoni Moda"'); } catch (e) { /* family fallback */ }
    }
    const posters = [0, 1, 2, 3, 4, 5].map((i) => texture(gl, posterCanvas(i), { wrap: 'clamp' }));
    const numerals = [0, 1, 2, 3, 4, 5].map((i) => texture(gl, numeralCanvas(i + 1), { wrap: 'clamp' }));
    const arts = artCanvases(sky).map((cnv) => texture(gl, cnv, { wrap: 'clamp' }));
    const skies = skyVariants(sky).map((cnv) => texture(gl, cnv, { wrap: 'clamp' }));

    const mats = {
      plaster: { map: texture(gl, plaster), tri: 1, uv: 0.62, bump: 1, rough: 0.95, metal: 0, rim: 0.03, albedo: [1.0, 0.965, 0.90] },
      floor: { map: texture(gl, floor), tri: 1, uv: 2.6, bump: 1, rough: 0.38, metal: 0.26, rim: 0.08, albedo: [1.45, 1.30, 1.12] },
      ceiling: { map: texture(gl, plaster), tri: 1, uv: 0.62, bump: 0, rough: 0.98, metal: 0, rim: 0.02, albedo: [0.86, 0.79, 0.69] },
      skirt: { tri: 0, uv: 1, bump: 0, rough: 0.42, metal: 0.22, rim: 0.06, albedo: [0.30, 0.255, 0.205] },
      rug: { tri: 0, uv: 1, bump: 0, rough: 0.95, metal: 0.0, rim: 0.02, albedo: [0.20, 0.132, 0.082] },
      slat: { tri: 0, uv: 1, bump: 0, rough: 0.36, metal: 0.08, rim: 0.12, albedo: [0.16, 0.105, 0.068] },
      sill: { tri: 0, uv: 1, bump: 0, rough: 0.55, metal: 0.08, rim: 0.12, albedo: [0.46, 0.41, 0.35] },
      frame: { tri: 0, uv: 1, bump: 0, rough: 0.26, metal: 0.9, rim: 0.22, albedo: [0.70, 0.54, 0.28] },
      wood: { map: texture(gl, plaster), tri: 1, uv: 5.5, bump: 1, rough: 0.46, metal: 0.10, rim: 0.14, albedo: [0.26, 0.175, 0.105] },
      gold: { tri: 0, uv: 1, bump: 0, rough: 0.14, metal: 1, rim: 0.2, albedo: [0.95, 0.70, 0.31] },
      brass: { tri: 0, uv: 1, bump: 0, rough: 0.28, metal: 1, rim: 0.16, albedo: [0.66, 0.48, 0.25] },
      lamp: { tri: 0, uv: 1, bump: 0, rough: 1, metal: 0, rim: 0, albedo: [1, 0.92, 0.76], emissive: 5.5, emissiveColor: [1, 0.87, 0.63] },
    };

    setProgress(90, 'Lighting the rooms');
    world.build({ mats, posters, numerals, arts, figures, skies, sky: texture(gl, sky, { wrap: 'clamp' }) });

    for (const spec of world.dustSpecs) {
      const vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      const b = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, spec.data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
      gl.enableVertexAttribArray(1);
      gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
      gl.bindVertexArray(null);
      dust.push({ vao, count: spec.data.length / 6, off: spec.off });
    }
    setProgress(100, 'Opening the doors');
  }

  const dust = [];

  /* ── canvas size ────────────────────────────────────────────────────────── */
  let width = 1, height = 1, dpr = 1, post = null;
  function resize() {
    const maxDpr = window.innerWidth < 720 ? 1.7 : 2;
    dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    width = Math.round(window.innerWidth * dpr);
    height = Math.round(window.innerHeight * dpr);
    canvas.width = width;
    canvas.height = height;
    if (!post) post = createPost(gl, width, height);
    else post.resize(width, height);
  }
  resize();
  window.addEventListener('resize', resize);

  /* ── camera ─────────────────────────────────────────────────────────────── */
  const HERO_YAW = [0.2, 3.34, -1.37, -0.1, 0.22, 1.77];
  const cam = {
    yaw: HERO_YAW[0], yawTarget: HERO_YAW[0],
    pitch: 0.015, pitchTarget: 0.015,
    room: 0, roomTarget: 0,
    fade: 1, t: 0, idle: 0, moved: false,
  };
  let ready = false;

  const dots = world.CHAPTERS.map((c, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', c.title.replace(/\n/g, ' '));
    b.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(b);
    return b;
  });

  function setCopy(i) {
    const c = world.CHAPTERS[i];
    kickerEl.textContent = c.kicker;
    titleEl.textContent = c.title;
    subEl.textContent = c.sub;
    counterEl.textContent = `${String(i + 1).padStart(2, '0')} / ${String(world.CHAPTERS.length).padStart(2, '0')}`;
    dots.forEach((d, k) => d.setAttribute('aria-current', k === i ? 'true' : 'false'));
    if (!reduceMotion && cam.t > 1) {
      chapterEl.animate(
        [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 800, easing: 'cubic-bezier(0.22,1,0.36,1)' }
      );
    }
  }

  function goTo(i) {
    i = clamp(i, 0, world.rooms.length - 1);
    if (i === cam.roomTarget) return;
    cam.roomTarget = i;
    cam.fade = Math.min(cam.fade, 0.6);
    cam.yawTarget = HERO_YAW[i];
    cam.pitchTarget = 0.015;
    markMoved();
  }

  function markMoved() {
    cam.idle = 0;
    if (cam.moved) return;
    cam.moved = true;
    if (hintEl) hintEl.dataset.off = '1';
  }

  /* drag to look: horizontal turns without limit, vertical tilts a little */
  let dragging = false, lastX = 0, lastY = 0, vx = 0;
  canvas.addEventListener('pointerdown', (e) => {
    dragging = true; lastX = e.clientX; lastY = e.clientY; vx = 0;
    canvas.setPointerCapture?.(e.pointerId);
    canvas.style.cursor = 'grabbing';
    markMoved();
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    vx = dx;
    cam.yawTarget -= dx * 0.0062;
    cam.pitchTarget = clamp(cam.pitchTarget - dy * 0.0024, -0.14, 0.2);
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    canvas.style.cursor = 'grab';
    cam.yawTarget -= vx * 0.0035;
  };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.style.cursor = 'grab';

  let touchX = null;
  canvas.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  canvas.addEventListener('touchmove', (e) => {
    if (touchX == null) return;
    const x = e.touches[0].clientX;
    cam.yawTarget -= (x - touchX) * 0.0068;
    touchX = x;
    markMoved();
  }, { passive: true });
  canvas.addEventListener('touchend', () => { touchX = null; });

  let wheelLock = 0;
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.2) {
      cam.yawTarget -= e.deltaX * 0.004;
    } else if (Math.abs(e.deltaY) > 4) {
      const now = performance.now();
      if (now - wheelLock > 650) {
        wheelLock = now;
        goTo(cam.roomTarget + (e.deltaY > 0 ? 1 : -1));
      }
    }
    markMoved();
  }, { passive: false });

  window.addEventListener('keydown', (e) => {
    const k = e.key;
    if (k === 'ArrowRight') { cam.yawTarget -= 0.2; markMoved(); }
    else if (k === 'ArrowLeft') { cam.yawTarget += 0.2; markMoved(); }
    else if (k === 'ArrowDown' || k === 'PageDown' || k === ' ') { e.preventDefault(); goTo(cam.roomTarget + 1); }
    else if (k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); goTo(cam.roomTarget - 1); }
    else if (k === 'Home') goTo(0);
    else if (k === 'End') goTo(world.rooms.length - 1);
    else if (k >= '1' && k <= '6') goTo(Number(k) - 1);
  });

  /* ── sound ──────────────────────────────────────────────────────────────── */
  let audio = null;
  function buildAudio() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 480;
    lp.connect(master);
    [55, 82.5, 110, 164.8].forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = i > 1 ? 'triangle' : 'sine';
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = i > 1 ? 0.03 : 0.1;
      o.connect(g).connect(lp);
      o.start();
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.04 + i * 0.011;
      const lg = ctx.createGain();
      lg.gain.value = 0.03;
      lfo.connect(lg).connect(g.gain);
      lfo.start();
    });
    const len = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.3;
    const noise = ctx.createBufferSource();
    noise.buffer = buf; noise.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = 1100; bp.Q.value = 0.6;
    const ng = ctx.createGain(); ng.gain.value = 0.03;
    noise.connect(bp).connect(ng).connect(master);
    noise.start();
    return { ctx, master };
  }
  soundBtn.addEventListener('click', () => {
    if (!audio) audio = buildAudio();
    if (!audio) return;
    const on = soundBtn.getAttribute('aria-pressed') !== 'true';
    if (audio.ctx.state === 'suspended') audio.ctx.resume();
    const t = audio.ctx.currentTime;
    audio.master.gain.cancelScheduledValues(t);
    audio.master.gain.setTargetAtTime(on ? 0.14 : 0.0001, t, on ? 1.1 : 0.4);
    soundBtn.setAttribute('aria-pressed', String(on));
    soundBtn.querySelector('.sound__label').textContent = on ? 'Sound on' : 'Sound off';
  });
  function chime() {
    if (!audio || soundBtn.getAttribute('aria-pressed') !== 'true') return;
    const { ctx, master } = audio;
    const t = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.03 / (i + 1), t + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
      o.connect(g).connect(master);
      o.start(t); o.stop(t + 2.4);
    });
  }

  /* ── frame ──────────────────────────────────────────────────────────────── */
  const view = mat4(), proj = mat4(), viewProj = mat4();
  const lightView = mat4(), lightProj = mat4(), lightVP = mat4(), shadowMat = mat4();
  const BIAS = new Float32Array([0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0.5, 0, 0.5, 0.5, 0.5, 1]);
  const nm3 = new Float32Array(9);
  const SPOT_ANGLE = 0.92;

  const L = { pos: [0, 4.5, 0], dir: [0, -1, 0], color: [1, 0.84, 0.62], power: 14 };
  const lampPos = [[0, 4, 0], [0, 2, 0], [0, 2, 0]];
  const lampCol = [[1, 0.8, 0.55], [1, 0.74, 0.44], [0.5, 0.62, 1.0]];
  const lampPow = [0.55, 0.42, 0.12];
  const SKY = [0.70, 0.57, 0.425];
  const GROUND = [0.30, 0.235, 0.17];
  const FOG = [0.032, 0.026, 0.021];
  const shadowTexel = 1 / shadowSize;

  const fillDir = [0, 0.25, 1];
  const fillCol = [1.0, 0.86, 0.68];
  let fillPow = 0.55;
  const eye = [0, EYE, 0];
  const target = [0, EYE, -6];

  function setShared(p) {
    p.v3('uCam', eye);
    p.v3('uLightPos', L.pos);
    p.v3('uLightDir', L.dir);
    p.v3('uLightColor', L.color);
    p.f('uLightIntensity', L.power);
    p.f('uSpotInner', Math.cos(SPOT_ANGLE * 0.60));
    p.f('uSpotOuter', Math.cos(SPOT_ANGLE));
    p.m4('uShadowMat', shadowMat);
    p.tex('uShadowTex', 6, shadowTex);
    p.f('uShadowTexel', shadowTexel);
    p.v3('uSkyColor', SKY);
    p.v3('uGroundColor', GROUND);
    p.f('uAmbient', 1.28);
    p.v3('uFillDir', fillDir);
    p.v3('uFillColor', fillCol);
    p.f('uFillPower', fillPow);
    p.v3('uFogColor', FOG);
    p.f('uFogDensity', 0.05);
    p.f('uFogStart', 4);
    p.f('uTime', cam.t);
    for (let i = 0; i < 3; i++) {
      let loc = p.u(`uLampPos[${i}]`);
      if (loc) gl.uniform3fv(loc, lampPos[i]);
      loc = p.u(`uLampColor[${i}]`);
      if (loc) gl.uniform3fv(loc, lampCol[i]);
      loc = p.u(`uLampPower[${i}]`);
      if (loc) gl.uniform1f(loc, lampPow[i]);
    }
  }

  function setMat(m) {
    surf.f('uUseMap', m.map ? 1 : 0);
    surf.f('uUseBump', m.bump ? 1 : 0);
    surf.f('uTriplanar', m.tri ? 1 : 0);
    surf.f('uUvScale', m.uv == null ? 1 : m.uv);
    surf.f('uRough', m.rough == null ? 0.8 : m.rough);
    surf.f('uMetal', m.metal == null ? 0 : m.metal);
    surf.f('uRim', m.rim == null ? 0 : m.rim);
    surf.f('uEmissive', m.emissive || 0);
    surf.v3('uAlbedo', m.albedo || [1, 1, 1]);
    surf.v3('uEmissiveColor', m.emissiveColor || [1, 0.9, 0.7]);
    if (m.map) { surf.tex('uMap', 0, m.map); if (m.bump) surf.tex('uBump', 0, m.map); }
  }

  let last = performance.now() / 1000;
  let fpsT = 0, fpsN = 0;

  function frame(nowMs) {
    const now = nowMs / 1000;
    const dt = Math.min(0.05, Math.max(0.0005, now - last));
    last = now;
    cam.t += dt;

    if (ready) {
      if (cam.roomTarget !== cam.room) {
        cam.fade = Math.max(0, cam.fade - dt * 4.0);
        if (cam.fade <= 0.004) {
          cam.room = cam.roomTarget;
          setCopy(cam.room);
          chime();
        }
      } else if (cam.fade < 1) {
        cam.fade = Math.min(1, cam.fade + dt * 2.0);
      }
      if (!dragging && cam.idle > 4.5 && !reduceMotion) cam.yawTarget += dt * 0.03;
      cam.idle = dragging ? 0 : cam.idle + dt;
      cam.yaw += (cam.yawTarget - cam.yaw) * (1 - Math.exp(-dt * 9));
      cam.pitch += (cam.pitchTarget - cam.pitch) * (1 - Math.exp(-dt * 8));
    }

    const off = cam.room * ROOM_GAP;
    const room = world.rooms[cam.room];

    /* light */
    L.pos = [room.light.at[0], room.light.at[1], room.light.at[2] + off];
    const toCentre = [0 - L.pos[0], 0 - L.pos[1], 0 + off - L.pos[2]];
    const tl = Math.hypot(toCentre[0], toCentre[1], toCentre[2]) || 1;
    L.dir = [toCentre[0] / tl, toCentre[1] / tl, toCentre[2] / tl];
    L.color = room.light.color;
    L.power = 19;

    /* daylight fill, from the window into the room (or straight down from the skylight) */
    const INWARD = [[0, 0, 1], [-1, 0, 0], [0, 0, -1], [1, 0, 0]];
    if (room.window) {
      const n = INWARD[room.window.wall];
      fillDir[0] = n[0] * 0.92; fillDir[1] = 0.3; fillDir[2] = n[2] * 0.92;
      fillPow = 0.52;
      fillCol[0] = 1.0; fillCol[1] = 0.80; fillCol[2] = 0.58;
    } else {
      fillDir[0] = 0.1; fillDir[1] = 1.0; fillDir[2] = 0.1;
      fillPow = 0.40;
      fillCol[0] = 0.98; fillCol[1] = 0.78; fillCol[2] = 0.54;
    }

    lampPos[0] = [L.pos[0], L.pos[1] - 0.9, L.pos[2]];
    lampCol[0] = room.light.color;
    lampPow[0] = 0.6;
    lampPos[1] = [3.4, 1.9, -3.0 + off];
    lampCol[1] = [1, 0.72, 0.42];
    lampPow[1] = 0.5;
    lampPos[2] = [0, 2.6, off + (room.window ? (room.window.wall === 2 ? ROOM_D / 2 - 0.5 : 0) : 0)];
    lampCol[2] = [0.45, 0.58, 0.95];
    lampPow[2] = 0.1;

    /* camera */
    const bob = reduceMotion ? 0 : Math.sin(cam.t * 0.55) * 0.007;
    eye[0] = Math.sin(cam.t * 0.21) * 0.02;
    eye[1] = EYE + bob;
    eye[2] = 0.15 + off;
    const cp = Math.cos(cam.pitch);
    target[0] = eye[0] - Math.sin(cam.yaw) * cp * 6;
    target[1] = eye[1] + Math.sin(cam.pitch) * 6;
    target[2] = eye[2] - Math.cos(cam.yaw) * cp * 6;

    const aspect = width / height;
    const hFov = (70 * Math.PI) / 180;
    let vFov = 2 * Math.atan(Math.tan(hFov / 2) / aspect);
    vFov = Math.min(Math.max(vFov, (50 * Math.PI) / 180), ((aspect < 0.95 ? 66 : 88) * Math.PI) / 180);
    perspective(proj, vFov, aspect, 0.05, 80);
    lookAt(view, eye, target, [0, 1, 0]);
    multiply(viewProj, proj, view);

    /* the room's own spot, for shadows */
    lookAt(lightView, L.pos, [L.pos[0], 0, L.pos[2] - 0.3], [0, 1, 0]);
    perspective(lightProj, Math.min(SPOT_ANGLE * 2.05, 1.72), 1, 1.0, 16);
    multiply(lightVP, lightProj, lightView);
    multiply(shadowMat, BIAS, lightVP);

    if (!post) { requestAnimationFrame(frame); return; }

    /* ── shadow pass ─────────────────────────────────────────────────────── */
    gl.bindFramebuffer(gl.FRAMEBUFFER, shadowFB);
    gl.viewport(0, 0, shadowSize, shadowSize);
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(true);
    gl.disable(gl.BLEND);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.disable(gl.CULL_FACE);
    gl.colorMask(false, false, false, false);
    shadowP.use().m4('uViewProj', lightVP);
    for (const c of world.casters) {
      if (Math.abs(c.model[14] - off) > 20) continue;
      shadowP.m4('uModel', c.model);
      draw(gl, c.mesh);
    }
    gl.colorMask(true, true, true, true);

    /* ── the room ────────────────────────────────────────────────────────── */
    post.begin();
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.depthMask(true);
    gl.disable(gl.BLEND);

    surf.use().m4('uViewProj', viewProj);
    setShared(surf);
    for (const s of world.solids) {
      if (Math.abs(s.model[14] - off) > 20) continue;
      normalMat3(nm3, s.model);
      surf.m4('uModel', s.model).m3('uNormalMat', nm3);
      setMat(s.mat);
      draw(gl, s.mesh);
    }

    /* unlit: the sky, the works */
    glowP.use().m4('uViewProj', viewProj).f('uUseMap', 1).f('uUvScale', 1).f('uRadial', 0);
    glowP.v2('uUvOffset', 0, 0);
    for (const g of world.glows) {
      if (Math.abs(g.model[14] - off) > 20) continue;
      glowP.m4('uModel', g.model);
      glowP.tex('uMap', 0, g.mat.tex);
      glowP.f('uFlipU', g.flipU || 0);
      glowP.f('uUvScale', g.uvs || 1);
      glowP.v2('uUvOffset', (g.uvo && g.uvo[0]) || 0, (g.uvo && g.uvo[1]) || 0);
      glowP.v3('uColor', g.mat.tint).f('uPower', g.mat.power);
      draw(gl, g.mesh);
    }

    /* the people */
    figP.use().m4('uViewProj', viewProj);
    figP.v3('uCam', eye).f('uFlip', 1).f('uTime', cam.t);
    figP.m4('uModel', mat4());
    for (const f of world.figures) {
      if (Math.abs(f.origin[2] - off) > 20) continue;
      figP.v3('uOrigin', f.origin);
      figP.v2('uSize', f.size[0], f.size[1]);
      figP.tex('uMap', 0, f.tex);
      figP.v3('uTint', [1.02, 0.97, 0.92]).f('uBright', 1.9);
      draw(gl, world.gFigure);
    }

    /* contact shadows (multiply), haze, dust (additive) */
    gl.enable(gl.BLEND);
    gl.depthMask(false);

    gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_ALPHA);
    discP.use().m4('uViewProj', viewProj);
    for (const d of world.discs) {
      if (Math.abs(d.pos[2] - off) > 20) continue;
      const m = compose(mat4(), d.pos[0], d.pos[1], d.pos[2], 0, d.size, d.size, 1);
      discP.m4('uModel', m).f('uPower', d.power);
      draw(gl, world.gDisc);
    }

    gl.blendFunc(gl.ONE, gl.ONE);
    hazeP.use().m4('uViewProj', viewProj);
    for (const h of world.hazes) {
      if (Math.abs(h.pos[2] - off) > 20) continue;
      const m = compose(mat4(), h.pos[0], h.pos[1], h.pos[2], 0, h.size, h.size, 1);
      hazeP.m4('uModel', m).v3('uColor', h.color).f('uPower', h.power);
      draw(gl, world.gDisc);
    }

    dustP.use().m4('uViewProj', viewProj)
      .v3('uCam', eye).v3('uColor', [1.0, 0.78, 0.46])
      .f('uTime', cam.t).f('uPixelRatio', dpr);
    for (const chunk of dust) {
      if (Math.abs(chunk.off - off) > 1) continue;
      gl.bindVertexArray(chunk.vao);
      gl.drawArrays(gl.POINTS, 0, chunk.count);
    }

    gl.depthMask(true);
    gl.disable(gl.BLEND);

    post.end(width, height, {
      exposure: 1.0,
      bloomStrength: 0.32,
      fade: cam.fade,
      grain: 0.05,
      time: cam.t,
      vignette: 0.34,
      threshold: 0.86,
      knee: 0.4,
    });

    if (!ready) {
      ready = true;
      loader.dataset.done = '1';
      setTimeout(() => { loader.style.display = 'none'; }, 900);
      setCopy(0);
    }

    fpsT += dt; fpsN++;
    if (fpsT > 1.5) {
      const fps = fpsN / fpsT;
      if (fps < 40 && dpr > 1.02) { dpr = Math.max(1, dpr - 0.25); resize(); }
      fpsT = 0; fpsN = 0;
    }

    requestAnimationFrame(frame);
  }

  loadEverything()
    .then(() => requestAnimationFrame(frame))
    .catch((err) => {
      surface('Could not load the room — ' + err.message);
      requestAnimationFrame(frame);
    });

  window.__MT__ = {
    cam, goTo, world, gl,
    get ready() { return ready; },
    jump(i) { cam.room = i; cam.roomTarget = i; cam.yaw = HERO_YAW[i]; cam.yawTarget = HERO_YAW[i]; cam.fade = 1; setCopy(i); },
    look(y, p) { cam.yaw = y; cam.yawTarget = y; cam.pitch = p; cam.pitchTarget = p; },
    state: () => ({ room: cam.room, yaw: cam.yaw, pitch: cam.pitch, dpr, width, height }),
  };
}
