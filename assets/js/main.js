/* Mindful Tattva — The Long Room.
   Boot, input, camera, light, and the frame loop. */

import { createContext, program, draw, drawInstanced, mesh } from './gl.js';
import { mat4, multiply, perspective, lookAt, normalMat3, compose, clamp, smoothstep, easeOutCubic } from './m4.js';
import { objVS, instVS, objFS, shadowVS, shadowInstVS, emptyFS, dustVS, dustFS, shaftVS, shaftFS, coneVS, coneFS } from './shaders.js';
import { createWorld, FIRST_WALL, ROOM_LEN, WALL_Z, CEIL_Y } from './world.js';
import { createPost } from './post.js';

const $ = (s) => document.querySelector(s);
const canvas = $('#stage');
const loader = $('#loader');
const pctEl = $('#pct');
const chapterEl = $('#chapter');
const kickerEl = $('#kicker');
const titleEl = $('#title');
const subEl = $('#sub');
const dotsEl = $('#dots');
const counterEl = $('#counter');
const barEl = $('#bar');
const hintEl = $('#hint');
const soundBtn = $('#sound');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── errors, surfaced once ────────────────────────────────────────────────── */
let shownError = false;
function surface(message) {
  if (shownError) return;
  shownError = true;
  const box = $('#error');
  if (box) { box.hidden = false; box.textContent = message; }
  console.error(message);
}
window.addEventListener('error', (e) => surface(e.message || 'Something failed to draw.'));

/* ── the door, or an honest way out ───────────────────────────────────────── */
let gl;
try {
  gl = createContext(canvas);
} catch (err) {
  loader.dataset.done = '1';
  $('#fallback').hidden = false;
  $('#fallback').style.display = 'grid';
  surface('This browser could not start WebGL 2.');
}

if (gl) start(gl);

function start(gl) {
  const world = createWorld(gl);
  const objProg = program(gl, objVS, objFS, 'obj');
  const instProg = program(gl, instVS, objFS, 'inst');
  const shadowProg = program(gl, shadowVS, emptyFS, 'shadow');
  const shadowInstProg = program(gl, shadowInstVS, emptyFS, 'shadowInst');
  const dustProg = program(gl, dustVS, dustFS, 'dust');
  const shaftProg = program(gl, shaftVS, shaftFS, 'shaft');
  const coneProg = program(gl, coneVS, coneFS, 'cone');
  const coneMesh = mesh(gl, world.coneGeo);

  const qs = window.location.search;
  const FX = { shafts: !qs.includes('noshaft'), cones: !qs.includes('nocone'), dust: !qs.includes('nodust') };
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

  /* ── camera ─────────────────────────────────────────────────────────────── */
  const camCfgs = world.chapters.map((_, i) => world.chapterCamera(i));
  const anchors = camCfgs.map((c) => c.anchor);
  const MIN_X = 4.6;
  const MAX_X = anchors[anchors.length - 1] + 8;

  const cam = {
    x: MIN_X,
    target: MIN_X,
    pointerX: 0,
    pointerY: 0,
    sx: 0, sy: 0,   // smoothed pointer
    yaw: 0,
    t: 0,
    chapter: -1,
    moved: false,
  };

  const view = mat4(), proj = mat4(), viewProj = mat4();
  const lightView = mat4(), lightProj = mat4(), lightVP = mat4(), shadowMat = mat4();
  const BIAS = new Float32Array([0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0.5, 0, 0.5, 0.5, 0.5, 1]);
  const nm3 = new Float32Array(9);
  const eye = [0, 1.62, 0];
  const target = [10, 1.62, 0];
  const SPOT_ANGLE = 0.72;

  let width = 1, height = 1, dpr = 1;
  let post = null;

  function resize() {
    const maxDpr = window.innerWidth < 720 ? 1.75 : 2;
    dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const w = Math.max(1, Math.round(window.innerWidth * dpr));
    const h = Math.max(1, Math.round(window.innerHeight * dpr));
    width = w; height = h;
    canvas.width = w;
    canvas.height = h;
    if (!post) post = createPost(gl, w, h);
    else post.resize(w, h);
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('orientationchange', () => setTimeout(resize, 120));

  /* ── the chapter furniture ──────────────────────────────────────────────── */
  const dots = world.chapters.map((c, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', c.title.replace(/\n/g, ' '));
    b.addEventListener('click', () => { goTo(i); });
    dotsEl.appendChild(b);
    return b;
  });

  function goTo(i) {
    cam.target = clamp(anchors[clamp(i, 0, anchors.length - 1)], MIN_X, MAX_X);
    cam.moved = true;
  }

  function setChapterText(i) {
    const c = world.chapters[i];
    kickerEl.textContent = c.kicker;
    titleEl.textContent = c.title;
    subEl.textContent = c.sub;
    counterEl.textContent = `${String(i + 1).padStart(2, '0')} / ${String(world.chapters.length).padStart(2, '0')}`;
    dots.forEach((d, k) => d.setAttribute('aria-current', k === i ? 'true' : 'false'));
    if (cam.chapter >= 0 && !reduceMotion) {
      chapterEl.animate(
        [
          { opacity: 0, transform: 'translateY(16px)', filter: 'blur(8px)' },
          { opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' },
        ],
        { duration: 900, easing: 'cubic-bezier(0.22,1,0.36,1)' }
      );
    }
    cam.chapter = i;
  }

  /* ── input ──────────────────────────────────────────────────────────────── */
  const scrollAmount = (d) => d * 0.016;
  cam.target = MIN_X;

  window.addEventListener('wheel', (e) => {
    if (e.ctrlKey) return;
    e.preventDefault();
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    cam.target = clamp(cam.target + scrollAmount(d), MIN_X, MAX_X);
    markMoved();
  }, { passive: false });

  let dragging = false, lastX = 0, lastY = 0, velocity = 0;
  canvas.addEventListener('pointerdown', (e) => {
    dragging = true; lastX = e.clientX; lastY = e.clientY; velocity = 0;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = 'grabbing';
    markMoved();
  });
  canvas.addEventListener('pointermove', (e) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    cam.pointerX = nx; cam.pointerY = ny;
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX; lastY = e.clientY;
    velocity = dx;
    cam.target = clamp(cam.target - dx * 0.075, MIN_X, MAX_X);
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    canvas.style.cursor = 'grab';
    cam.target = clamp(cam.target - velocity * 0.55, MIN_X, MAX_X);
  };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('pointerleave', () => { cam.pointerX *= 0.4; cam.pointerY *= 0.4; });
  canvas.style.cursor = 'grab';

  let touchStartX = null;
  canvas.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  canvas.addEventListener('touchmove', (e) => {
    if (touchStartX == null) return;
    const x = e.touches[0].clientX;
    cam.target = clamp(cam.target - (x - touchStartX) * 0.075, MIN_X, MAX_X);
    touchStartX = x;
    markMoved();
  }, { passive: true });
  canvas.addEventListener('touchend', () => { touchStartX = null; }, { passive: true });

  window.addEventListener('keydown', (e) => {
    const k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown' || k === ' ' || k === 'PageDown') {
      e.preventDefault();
      cam.target = clamp(cam.target + (k === 'PageDown' ? 12 : 3.2), MIN_X, MAX_X);
      markMoved();
    } else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp') {
      e.preventDefault();
      cam.target = clamp(cam.target - (k === 'PageUp' ? 12 : 3.2), MIN_X, MAX_X);
      markMoved();
    } else if (k === 'Home') { goTo(0); }
    else if (k === 'End') { goTo(anchors.length - 1); }
    else if (k >= '1' && k <= '8') { goTo(Number(k) - 1); }
  });

  function markMoved() {
    if (cam.moved) return;
    cam.moved = true;
    hintEl.dataset.off = '1';
  }

  /* ── sound: a low room tone, off until asked for ────────────────────────── */
  let audio = null;
  function buildAudio() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 420;
    filter.Q.value = 0.7;
    filter.connect(master);

    const freqs = [55, 82.5, 110];
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = i === 2 ? 'triangle' : 'sine';
      o.frequency.value = f * (1 + (i - 1) * 0.0016);
      const g = ctx.createGain();
      g.gain.value = i === 2 ? 0.05 : 0.14;
      o.connect(g).connect(filter);
      o.start();
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.045 + i * 0.013;
      const lg = ctx.createGain();
      lg.gain.value = i === 2 ? 0.02 : 0.06;
      lfo.connect(lg).connect(g.gain);
      lfo.start();
    });

    // air
    const len = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * 0.35;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 900;
    bp.Q.value = 0.6;
    const ng = ctx.createGain();
    ng.gain.value = 0.035;
    noise.connect(bp).connect(ng).connect(master);
    noise.start();

    return { ctx, master };
  }

  function toggleSound() {
    if (!audio) audio = buildAudio();
    if (!audio) return;
    const on = soundBtn.getAttribute('aria-pressed') !== 'true';
    if (audio.ctx.state === 'suspended') audio.ctx.resume();
    const now = audio.ctx.currentTime;
    audio.master.gain.cancelScheduledValues(now);
    audio.master.gain.setTargetAtTime(on ? 0.16 : 0.0001, now, on ? 1.2 : 0.5);
    soundBtn.setAttribute('aria-pressed', String(on));
    soundBtn.querySelector('.sound__label').textContent = on ? 'Sound on' : 'Sound off';
  }
  soundBtn.addEventListener('click', toggleSound);

  function chime() {
    if (!audio || soundBtn.getAttribute('aria-pressed') !== 'true') return;
    const { ctx, master } = audio;
    const t = ctx.currentTime;
    [523.25, 783.99].forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0, t);
      g.gain.linearRampToValueAtTime(0.05 / (i + 1), t + 0.06);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.6);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + 2.8);
    });
  }

  /* ── per-draw uniforms ──────────────────────────────────────────────────── */
  const L = {
    pos: [0, 6, 0], target: [10, 0, 0], dir: [0, -1, 0],
    color: [1.0, 0.90, 0.76], intensity: 5.8,
    inner: Math.cos(SPOT_ANGLE * 0.72), outer: Math.cos(SPOT_ANGLE),
  };
  const SKY = [0.52, 0.505, 0.485];
  const GROUND = [0.045, 0.042, 0.038];
  const FILL_DIR = [0.72, 0.28, 0.2];
  const FILL_COLOR = [1.0, 0.62, 0.30];
  const FOG = [0.020, 0.017, 0.014];

  function setShared(prog) {
    prog.v3('uCam', eye);
    prog.v3('uLightPos', L.pos);
    prog.v3('uLightDir', L.dir);
    prog.v3('uLightColor', L.color);
    prog.f('uLightIntensity', L.intensity);
    prog.f('uSpotInner', L.inner);
    prog.f('uSpotOuter', L.outer);
    prog.m4('uShadowMat', shadowMat);
    prog.tex('uShadowTex', 0, shadowTex);
    prog.v3('uSkyColor', SKY);
    prog.v3('uGroundColor', GROUND);
    prog.f('uAmbient', 0.38);
    prog.v3('uFillDir', FILL_DIR);
    prog.v3('uFillColor', FILL_COLOR);
    prog.f('uFillIntensity', 0.16);
    prog.v3('uFogColor', FOG);
    prog.f('uFogDensity', 0.0215);
    prog.f('uFogStart', 6);
    prog.f('uTime', cam.t);
  }
  // shadow texel is a vec2 in the shader; separate helper below
  const shadowTexel2 = new Float32Array(2);
  shadowTexel2[0] = shadowTexel2[1] = 1 / shadowSize;

  function setMaterial(prog, m) {
    prog.v3('uAlbedo', m.albedo);
    prog.f('uRough', m.rough);
    prog.f('uMetal', m.metal);
    prog.f('uRim', m.rim);
    prog.f('uEmissive', m.emissive);
    prog.f('uDetail', m.detail);
  }

  /* ── frame ──────────────────────────────────────────────────────────────── */
  let last = performance.now() / 1000;
  let frames = 0;
  let ready = false;
  let fpsWindow = 0, fpsFrames = 0;

  function tick(nowMs) {
    const now = nowMs / 1000;
    const dt = Math.min(0.05, Math.max(0.0005, now - last));
    last = now;

    // camera ease
    const k = 1 - Math.exp(-dt * (dragging ? 9 : 3.2));
    cam.x += (cam.target - cam.x) * k;
    cam.t += dt;
    if (!reduceMotion) {
      cam.sx += (cam.pointerX - cam.sx) * Math.min(1, dt * 2.4);
      cam.sy += (cam.pointerY - cam.sy) * Math.min(1, dt * 2.4);
    }

    // chapter detection
    let best = 0, bestD = Infinity;
    for (let i = 0; i < anchors.length; i++) {
      const d = Math.abs(cam.x - anchors[i]);
      if (d < bestD) { bestD = d; best = i; }
    }
    if (best !== cam.chapter && bestD < 9) { setChapterText(best); chime(); }
    const ft = clamp((bestD - 3.4) / (8.6 - 3.4), 0, 1);
    const op = 1 - ft * ft * (3 - 2 * ft);
    chapterEl.style.opacity = op.toFixed(3);
    if (!reduceMotion) {
      chapterEl.style.transform = `translateY(${((1 - op) * -26).toFixed(1)}px)`;
      chapterEl.style.filter = op > 0.995 ? 'none' : `blur(${((1 - op) * 5).toFixed(2)}px)`;
    }

    // progress
    const p = clamp((cam.x - MIN_X) / (MAX_X - MIN_X), 0, 1);
    barEl.style.width = (p * 100).toFixed(2) + '%';

    // world + light
    world.update(dt, cam.x);
    const light = world.lightAt(cam.x + 4.5);
    L.pos = light.pos;
    L.target = light.target;
    const dx = L.target[0] - L.pos[0], dy = L.target[1] - L.pos[1], dz = L.target[2] - L.pos[2];
    const dl = Math.hypot(dx, dy, dz) || 1;
    L.dir = [dx / dl, dy / dl, dz / dl];

    // camera
    const bob = reduceMotion ? 0 : Math.sin(cam.t * 0.83) * 0.012;
    const sway = reduceMotion ? 0 : Math.sin(cam.t * 0.37) * 0.026;
    eye[0] = cam.x;
    eye[1] = 1.62 + bob;
    eye[2] = sway + cam.sx * 0.12;
    const yawTarget = (camCfgs[best] ? camCfgs[best].yaw : 0) + cam.sx * 0.05;
    cam.yaw += (yawTarget - cam.yaw) * Math.min(1, dt * 1.6);
    const yaw = cam.yaw;
    const pitch = 0.018 + cam.sy * 0.026;
    const cp = Math.cos(pitch);
    target[0] = eye[0] + Math.cos(yaw) * cp * 10;
    target[1] = eye[1] + Math.sin(pitch) * 10 + 0.12;
    target[2] = eye[2] + Math.sin(yaw) * cp * 10;

    /* hold the horizontal field of view roughly constant, so a phone sees the
       same amount of room across the frame as a laptop does */
    const aspect = width / height;
    const hTarget = (66 * Math.PI) / 180;
    let vFov = 2 * Math.atan(Math.tan(hTarget / 2) / aspect);
    vFov = Math.min(Math.max(vFov, (46 * Math.PI) / 180), (78 * Math.PI) / 180);
    perspective(proj, vFov, aspect, 0.06, 120);
    lookAt(view, eye, target, [0, 1, 0]);
    multiply(viewProj, proj, view);

    // shadow matrix
    lookAt(lightView, L.pos, L.target, [0, 1, 0]);
    perspective(lightProj, SPOT_ANGLE * 2 * 1.02, 1, 0.7, 34);
    multiply(lightVP, lightProj, lightView);
    multiply(shadowMat, BIAS, lightVP);

    /* ── shadow pass ─────────────────────────────────────────────────────── */
    gl.bindFramebuffer(gl.FRAMEBUFFER, shadowFB);
    gl.viewport(0, 0, shadowSize, shadowSize);
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(true);
    gl.disable(gl.BLEND);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.FRONT);
    gl.colorMask(false, false, false, false);

    shadowProg.use().m4('uViewProj', lightVP);
    for (const c of world.casters) {
      if (c.door) {
        if (Math.abs(c.door.x - cam.x) > 34) continue;
        shadowProg.m4('uModel', c.door.model);
        draw(gl, c.mesh);
      } else if (c.instanced) {
        shadowInstProg.use();
        shadowInstProg.m4('uViewProj', lightVP);
        drawInstanced(gl, c.instanced, c.count);
        shadowProg.use();
      } else {
        if (Math.abs((c.model ? c.model[12] : 0) - cam.x) > 34) continue;
        shadowProg.m4('uModel', c.model);
        draw(gl, c.mesh);
      }
    }

    gl.colorMask(true, true, true, true);
    gl.cullFace(gl.BACK);

    /* ── scene pass ──────────────────────────────────────────────────────── */
    post.begin();
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.depthMask(true);
    gl.disable(gl.BLEND);

    objProg.use();
    objProg.m4('uViewProj', viewProj);
    setShared(objProg);
    const st = objProg.u('uShadowTexel');
    if (st) gl.uniform2f(st, shadowTexel2[0], shadowTexel2[1]);

    for (const s of world.solids) {
      if (Math.abs(s.x - cam.x) > 52) continue;
      normalMat3(nm3, s.model);
      objProg.m4('uModel', s.model);
      objProg.m3('uNormalMat', nm3);
      setMaterial(objProg, s.mat);
      draw(gl, s.mesh);
    }
    for (const d of world.doors) {
      if (Math.abs(d.x - cam.x) > 52) continue;
      normalMat3(nm3, d.model);
      objProg.m4('uModel', d.model);
      objProg.m3('uNormalMat', nm3);
      setMaterial(objProg, { albedo: [0.16, 0.125, 0.09], rough: 0.48, metal: 0.25, rim: 0.35, emissive: 0, detail: 0.7 });
      draw(gl, d.mesh);
    }

    instProg.use();
    instProg.m4('uViewProj', viewProj);
    setShared(instProg);
    const it2 = instProg.u('uShadowTexel');
    if (it2) gl.uniform2f(it2, shadowTexel2[0], shadowTexel2[1]);
    for (const g of world.instanced) {
      if (!g.count) continue;
      if (Math.abs(g.x - cam.x) > g.range + 24) continue;
      setMaterial(instProg, g.mat);
      drawInstanced(gl, g.mesh, g.count);
    }

    /* ── light and dust ──────────────────────────────────────────────────── */
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.depthMask(false);
    gl.disable(gl.CULL_FACE);

    shaftProg.use()
      .m4('uViewProj', viewProj)
      .v3('uCam', eye)
      .v3('uColor', [1.0, 0.74, 0.42])
      .f('uStrength', 0.26)
      .f('uTime', cam.t);
    if (FX.shafts) drawInstanced(gl, world.shafts.mesh, world.shafts.count);

    coneProg.use()
      .m4('uViewProj', viewProj)
      .v3('uCam', eye)
      .v3('uColor', [1.0, 0.78, 0.48])
      .f('uStrength', 0.075)
      .f('uTime', cam.t);
    for (const c of (FX.cones ? world.cones : [])) {
      if (Math.abs(c.pos[0] - cam.x) > 34) continue;
      compose(c.model, c.pos[0], c.pos[1], c.pos[2], 0, 1.15, 1, 1.15);
      coneProg.m4('uModel', c.model);
      draw(gl, coneMesh);
    }

    dustProg.use()
      .m4('uViewProj', viewProj)
      .v3('uCam', eye)
      .v3('uColor', [1.0, 0.78, 0.46])
      .f('uTime', cam.t)
      .f('uPixelRatio', dpr);
    for (const chunk of (FX.dust ? world.dustChunks : [])) {
      if (cam.x < chunk.x0 - 34 || cam.x > chunk.x1 + 34) continue;
      gl.bindVertexArray(chunk.vao);
      gl.drawArrays(gl.POINTS, 0, chunk.count);
    }

    gl.depthMask(true);
    gl.disable(gl.BLEND);

    /* ── film ────────────────────────────────────────────────────────────── */
    let fade = 1;
    if (!ready) fade = 0;
    post.end(width, height, {
      exposure: 1.16,
      bloomStrength: 0.5,
      fade,
      grain: 0.06,
      time: cam.t,
    });

    if (!ready) {
      ready = true;
      cam.x = anchors[0] - 1.6;   // a small arrival, then the room opens
      cam.target = anchors[0];
      world.settle(cam.x);
      loader.dataset.done = '1';
      setTimeout(() => { loader.style.display = 'none'; }, 1000);
      setChapterText(0);
    }

    // adaptive resolution: if the frame budget is blown, draw fewer pixels
    frames++;
    fpsWindow += dt; fpsFrames++;
    if (fpsWindow > 1.5) {
      const fps = fpsFrames / fpsWindow;
      if (fps < 42 && dpr > 1.05) {
        dpr = Math.max(1, dpr - 0.25);
        resize();
      }
      fpsWindow = 0; fpsFrames = 0;
    }

    requestAnimationFrame(tick);
  }

  /* progress: the loader reports real work, then hands over */
  let p = 0;
  const step = () => {
    p = Math.min(96, p + 9 + Math.random() * 8);
    pctEl.textContent = String(Math.round(p));
    loader.querySelector('.loader__line b').style.width = p + '%';
    if (p < 96) setTimeout(step, 70);
  };
  step();

  requestAnimationFrame(tick);

  /* a small console handle — handy for testing, harmless in production */
  window.__MT__ = {
    cam,
    goTo,
    snap(i) { cam.target = anchors[clamp(i, 0, anchors.length - 1)]; cam.x = cam.target; world.settle(cam.x); },
    world,
    gl,
    MATERIALS: world.MATERIALS || null,
    anchors,
    get chapter() { return cam.chapter; },
    get ready() { return ready; },
    state: () => ({ x: cam.x, target: cam.target, chapter: cam.chapter, dpr, width, height }),
  };
}
