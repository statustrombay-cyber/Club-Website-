/* ==========================================================================
   Mindful Tattva — the atrium
   --------------------------------------------------------------------------
   A scroll-driven 3D room built by us: an open-air gallery of plaster arches,
   ten portraits, a stone basin, and a field of dunes at the far end. Nothing
   in here is borrowed from a watchmaking site — the geometry is generated at
   runtime, so the whole scene costs one module and ten photographs.

   Camera and lighting are authored, not imported: a Catmull-Rom path carries
   the viewer down the room and then out into the field.
   ========================================================================== */

import * as THREE from './vendor/three.module.js';

const PARAMS = new URLSearchParams(location.search);
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const SMALL = window.matchMedia('(max-width: 760px)').matches;
const LOWQ = SMALL || PARAMS.get('q') === 'low';

const PALETTE = {
  paper: 0xf7f4ee,
  paper2: 0xefe9df,
  plaster: 0xf6f0e5,
  stone: 0xe4dacb,
  sand: 0xe7d9bf,
  gold: 0xb08d54,
  ink: 0x14120f
};

const PORTRAITS = [
  ['freud', 1856, 1939], ['jung', 1875, 1961], ['adler', 1870, 1937],
  ['klein', 1882, 1960], ['bowlby', 1907, 1990], ['pavlov', 1849, 1936],
  ['skinner', 1904, 1990], ['frankl', 1905, 1997], ['maslow', 1908, 1970],
  ['rogers', 1902, 1987]
];

/* ── camera choreography ─────────────────────────────────────────────────
   Keyframes are tied to scroll progress, not to a spline parameter, so the
   framing of each chapter is authored rather than emergent.                     */
const KEYS = [
  { p: 0.00, pos: [0.0, 1.75, 16.4], look: [0.0, 2.20, 2.0] },
  { p: 0.13, pos: [0.0, 1.75, 9.0], look: [0.0, 2.10, -4.0] },
  { p: 0.22, pos: [-1.6, 1.90, 0.6], look: [4.8, 2.25, -6.0] },
  { p: 0.30, pos: [0.0, 1.95, -8.0], look: [0.0, 2.05, -20.0] },
  { p: 0.40, pos: [-2.4, 2.00, -14.2], look: [4.6, 2.35, -17.6] },
  { p: 0.60, pos: [-3.1, 2.05, -30.5], look: [-7.2, 2.55, -43.5] },
  { p: 0.74, pos: [0.0, 2.40, -50.0], look: [0.0, 2.20, -70.0] },
  { p: 0.84, pos: [0.0, 3.00, -64.0], look: [0.0, 2.60, -92.0] },
  { p: 0.92, pos: [0.0, 5.20, -76.0], look: [0.0, 3.00, -110.0] },
  { p: 1.00, pos: [0.0, 8.40, -92.0], look: [0.0, 3.40, -140.0] }
];

/* ── helpers ─────────────────────────────────────────────────────────────── */
function canvasTexture(size, paint) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  paint(ctx, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function softDisc(size = 128, inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
  return canvasTexture(size, (ctx, s) => {
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, inner);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
  });
}

function verticalGradientTexture(stops) {
  return canvasTexture(256, (ctx, s) => {
    const g = ctx.createLinearGradient(0, 0, 0, s);
    stops.forEach(([at, color]) => g.addColorStop(at, color));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
  });
}

/* A cheap organic ridge: three sines with irrational-ish periods. */
function duneHeight(x, z) {
  const a = Math.sin(x * 0.043 + 1.7) * 2.6;
  const b = Math.sin(z * 0.031 - 0.6) * 3.4;
  const c = Math.sin((x + z) * 0.017 + 2.2) * 4.2;
  const d = Math.sin(x * 0.11 - z * 0.07) * 0.7;
  return a + b + c + d;
}

/* ========================================================================== */
export function createAtrium(options = {}) {
  const canvas = options.canvas;
  const onProgress = options.onProgress || (() => {});
  const onReady = options.onReady || (() => {});

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !LOWQ, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, LOWQ ? 1.6 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(PALETTE.paper);
  scene.fog = new THREE.FogExp2(0xf1e9da, 0.0050);

  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 600);

  /* ── sky dome ──────────────────────────────────────────────────────────── */
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      top: { value: new THREE.Color(0xded0b6) },
      bottom: { value: new THREE.Color(0xf8f1e4) }
    },
    vertexShader: /* glsl */`
      varying float vH;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vH = normalize(world.xyz).y;
        gl_Position = projectionMatrix * viewMatrix * world;
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 top; uniform vec3 bottom; varying float vH;
      void main() {
        float h = smoothstep(-0.05, 0.55, vH);
        gl_FragColor = vec4(mix(bottom, top, h), 1.0);
      }`
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(320, 32, 16), skyMat);
  sky.position.set(0, 0, -40);
  scene.add(sky);

  /* ── sun ───────────────────────────────────────────────────────────────── */
  const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: softDisc(256, 'rgba(255,247,230,0.95)', 'rgba(255,235,200,0)'),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.28
  }));
  sunSprite.scale.set(26, 26, 1);
  sunSprite.position.set(30, 40, -196);
  scene.add(sunSprite);

  /* ── ground ────────────────────────────────────────────────────────────── */
  const floorTex = verticalGradientTexture([[0, '#efe8dc'], [0.55, '#ece4d6'], [1, '#e7dfd0']]);
  floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: floorTex, roughness: 0.62, metalness: 0.04
  });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(64, 150, 1, 1), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, -30);
  scene.add(floor);

  /* ── architecture ──────────────────────────────────────────────────────── */
  const plaster = new THREE.MeshStandardMaterial({ color: PALETTE.plaster, roughness: 0.94, metalness: 0.0 });
  const plasterDeep = new THREE.MeshStandardMaterial({ color: 0xefe7d8, roughness: 0.96, metalness: 0.0 });
  const stoneMat = new THREE.MeshStandardMaterial({ color: PALETTE.stone, roughness: 0.8, metalness: 0.02 });

  const ARCH_H = 6.4;
  const HALF_W = 7.2;
  const Z_START = 12;
  const Z_END = -62;
  const BAY = 8;

  const hall = new THREE.Group();
  scene.add(hall);

  // side walls (facing inward)
  [-1, 1].forEach((side) => {
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(Z_START - Z_END, ARCH_H), plaster);
    wall.position.set(side * HALF_W, ARCH_H / 2, (Z_START + Z_END) / 2);
    wall.rotation.y = side * -Math.PI / 2;
    hall.add(wall);
  });

  // pilasters + arches
  const pilasterGeo = new THREE.BoxGeometry(1.05, ARCH_H, 0.62);
  const archGeo = new THREE.TorusGeometry(HALF_W, 0.22, 8, 44, Math.PI);
  const bays = [];
  for (let z = Z_START; z >= Z_END; z -= BAY) bays.push(z);
  bays.forEach((z, i) => {
    [-1, 1].forEach((side) => {
      const p = new THREE.Mesh(pilasterGeo, plaster);
      p.position.set(side * (HALF_W - 0.1), ARCH_H / 2, z);
      hall.add(p);
    });
    const arch = new THREE.Mesh(archGeo, plasterDeep);
    arch.position.set(0, ARCH_H, z);
    hall.add(arch);
  });

  // entrance lintel: a wide slab so the first frame reads as a doorway
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(HALF_W * 2 + 1.2, 0.7, 0.9), plasterDeep);
  lintel.position.set(0, ARCH_H + 0.35, Z_START + 0.6);
  hall.add(lintel);

  // a soft shadow where wall meets floor — without it the room floats
  const skirtTex = verticalGradientTexture([[0, 'rgba(96,84,66,0.30)'], [0.55, 'rgba(96,84,66,0.06)'], [1, 'rgba(96,84,66,0)']]);
  [-1, 1].forEach((side) => {
    const strip = new THREE.Mesh(
      new THREE.PlaneGeometry(Z_START - Z_END, 1.5),
      new THREE.MeshBasicMaterial({ map: skirtTex, transparent: true, depthWrite: false })
    );
    strip.position.set(side * (HALF_W - 0.02), 0.75, (Z_START + Z_END) / 2);
    strip.rotation.y = side * -Math.PI / 2;
    hall.add(strip);
  });

  /* ── portraits on the walls ────────────────────────────────────────────── */
  const frameGroup = new THREE.Group();
  scene.add(frameGroup);

  const pictureMat = [];
  const frameMat = new THREE.MeshStandardMaterial({ color: 0xb59a70, roughness: 0.5, metalness: 0.32 });
  const photoGeo = new THREE.PlaneGeometry(1.62, 2.16);
  const frameGeo = new THREE.BoxGeometry(1.86, 2.4, 0.06);

  PORTRAITS.forEach(([file], i) => {
    const side = i % 2 === 0 ? -1 : 1;
    const z = 6.4 - i * 7.1;
    const y = 2.62;

    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.set(side * (HALF_W - 0.10), y, z);
    frame.rotation.y = side * -Math.PI / 2;
    frameGroup.add(frame);

    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.72, metalness: 0.0 });
    pictureMat.push(mat);
    const photo = new THREE.Mesh(photoGeo, mat);
    photo.position.set(side * (HALF_W - 0.18), y, z);
    photo.rotation.y = side * -Math.PI / 2;
    frameGroup.add(photo);

    // a soft pool of light under every frame
    const pool = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 1.4),
      new THREE.MeshBasicMaterial({ map: softDisc(128, 'rgba(120,104,80,0.16)', 'rgba(120,104,80,0)'), transparent: true, depthWrite: false })
    );
    pool.rotation.x = -Math.PI / 2;
    pool.position.set(side * (HALF_W - 0.9), 0.012, z);
    frameGroup.add(pool);
  });

  /* ── wall lamps ────────────────────────────────────────────────────────── */
  const lampMat = new THREE.MeshStandardMaterial({ color: 0xfff2d8, emissive: 0xffd9a4, emissiveIntensity: 1.4, roughness: 0.5 });
  const lampGeo = new THREE.CylinderGeometry(0.1, 0.14, 0.5, 10);
  const lamps = [4, -12, -28, -44];
  lamps.forEach((z, i) => {
    const side = i % 2 === 0 ? 1 : -1;
    const lamp = new THREE.Mesh(lampGeo, lampMat);
    lamp.position.set(side * (HALF_W - 0.4), 4.7, z);
    scene.add(lamp);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: softDisc(128, 'rgba(255,224,170,0.5)', 'rgba(255,214,150,0)'),
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    }));
    glow.scale.set(2.6, 2.6, 1);
    glow.position.copy(lamp.position);
    scene.add(glow);
  });

  /* ── bench + basin ─────────────────────────────────────────────────────── */
  const bench = new THREE.Group();
  const seat = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.36, 0.92), stoneMat);
  seat.position.y = 0.46;
  bench.add(seat);
  [-1.3, 1.3].forEach((x) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.42, 0.72), stoneMat);
    leg.position.set(x, 0.21, 0);
    bench.add(leg);
  });
  bench.position.set(0, 0, -27.5);
  scene.add(bench);

  const plinth = new THREE.Group();
  const plinthTop = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.72, 0.92, 24), stoneMat);
  plinthTop.position.y = 0.46;
  plinth.add(plinthTop);
  const bowlProfile = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    bowlProfile.push(new THREE.Vector2(0.06 + t * 0.52, Math.sin(t * Math.PI * 0.5) * 0.05 + t * t * 0.2));
  }
  const bowl = new THREE.Mesh(new THREE.LatheGeometry(bowlProfile, 32), new THREE.MeshStandardMaterial({ color: 0xd9cbb4, roughness: 0.55, metalness: 0.1, side: THREE.DoubleSide }));
  bowl.position.y = 0.92;
  plinth.add(bowl);
  plinth.position.set(0, 0, -53);
  scene.add(plinth);

  const contact = (x, z, w, d) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, d),
      new THREE.MeshBasicMaterial({ map: softDisc(128, 'rgba(92,80,62,0.30)', 'rgba(92,80,62,0)'), transparent: true, depthWrite: false })
    );
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, 0.014, z);
    scene.add(m);
  };
  contact(0, -27.5, 4.6, 2.2);
  contact(0, -53, 2.4, 2.4);

  /* ── the field ─────────────────────────────────────────────────────────── */
  const duneGeo = new THREE.PlaneGeometry(320, 260, LOWQ ? 48 : 82, LOWQ ? 36 : 62);
  const pos = duneGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = -y; // plane's +Y becomes -Z after rotation
    const ramp = Math.min(1, Math.max(0, (-z - 56) / 20));
    const h = (duneHeight(x, z) * 1.9 + 1.4) * ramp;
    pos.setZ(i, h);
  }
  duneGeo.computeVertexNormals();
  const duneHeights = [];
  for (let i = 0; i < pos.count; i++) duneHeights.push(pos.getZ(i));
  const hMin = Math.min(...duneHeights);
  const hMax = Math.max(...duneHeights);
  const duneColors = new Float32Array(pos.count * 3);
  const cLow = new THREE.Color(0xa8916f);
  const cHigh = new THREE.Color(0xe2d0ab);
  const cTmp = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const f = THREE.MathUtils.clamp((duneHeights[i] - hMin) / (hMax - hMin + 0.001), 0, 1);
    cTmp.copy(cLow).lerp(cHigh, Math.pow(f, 0.8));
    duneColors[i * 3] = cTmp.r; duneColors[i * 3 + 1] = cTmp.g; duneColors[i * 3 + 2] = cTmp.b;
  }
  duneGeo.setAttribute('color', new THREE.BufferAttribute(duneColors, 3));
  const sandTex = canvasTexture(256, (ctx, size) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 9000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const a = 0.05 + Math.random() * 0.10;
      ctx.fillStyle = Math.random() > 0.5 ? `rgba(120,104,80,${a})` : `rgba(255,250,238,${a})`;
      ctx.fillRect(x, y, 1.4, 1.4);
    }
  });
  sandTex.wrapS = sandTex.wrapT = THREE.RepeatWrapping;
  sandTex.repeat.set(60, 60);
  const duneMat = new THREE.MeshStandardMaterial({ color: 0xffffff, map: sandTex, vertexColors: true, roughness: 1.0, metalness: 0.0 });
  const dunes = new THREE.Mesh(duneGeo, duneMat);
  dunes.rotation.x = -Math.PI / 2;
  dunes.position.set(0, -0.15, -160);
  scene.add(dunes);

  // distant ridge: a low ribbon of hills so the horizon is not a ruled line
  const ridgeGeo = new THREE.PlaneGeometry(700, 60, 60, 1);
  const rp = ridgeGeo.attributes.position;
  for (let i = 0; i < rp.count; i++) {
    if (rp.getY(i) > 0) {
      const x = rp.getX(i);
      rp.setY(i, rp.getY(i) + Math.sin(x * 0.013 + 1.1) * 9 + Math.sin(x * 0.037) * 3.4 + 4);
    }
  }
  ridgeGeo.computeVertexNormals();
  const ridge = new THREE.Mesh(ridgeGeo, new THREE.MeshBasicMaterial({ color: 0xe3d2b4, fog: true }));
  ridge.position.set(0, 0, -300);
  scene.add(ridge);

  /* ── light ─────────────────────────────────────────────────────────────── */
  scene.add(new THREE.HemisphereLight(0xfff6e6, 0x94897a, LOWQ ? 1.05 : 0.85));

  const sun = new THREE.DirectionalLight(0xffe8c2, 1.5);
  sun.position.set(18, 26, -108);
  sun.target.position.set(0, 1.4, -30);
  scene.add(sun, sun.target);

  const fill = new THREE.DirectionalLight(0xfff7ee, 0.32);
  fill.position.set(-10, 9, 26);
  scene.add(fill);

  /* ── light shafts ──────────────────────────────────────────────────────── */
  const shaftTex = (() => {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 512;
    const ctx = c.getContext('2d');
    const v = ctx.createLinearGradient(0, 0, 0, 512);
    v.addColorStop(0, 'rgba(255,244,222,0.85)');
    v.addColorStop(0.45, 'rgba(255,240,214,0.34)');
    v.addColorStop(1, 'rgba(255,238,208,0)');
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, 256, 512);
    // feather the long edges so the beam has no cut line
    const h = ctx.createLinearGradient(0, 0, 256, 0);
    h.addColorStop(0, 'rgba(0,0,0,0)');
    h.addColorStop(0.5, 'rgba(0,0,0,1)');
    h.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalCompositeOperation = 'destination-in';
    ctx.fillStyle = h;
    ctx.fillRect(0, 0, 256, 512);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  })();
  for (let i = 0; i < 4; i++) {
    const shaft = new THREE.Mesh(
      new THREE.PlaneGeometry(4.4, 17),
      new THREE.MeshBasicMaterial({ map: shaftTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.30 })
    );
    shaft.position.set(-3.4 + i * 2.4, 6.2, -14 - i * 13);
    shaft.rotation.set(0.26, 0.5, -0.24);
    scene.add(shaft);
  }

  /* ── dust ──────────────────────────────────────────────────────────────── */
  const DUST = LOWQ ? 260 : 620;
  const dustPos = new Float32Array(DUST * 3);
  for (let i = 0; i < DUST; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 15;
    dustPos[i * 3 + 1] = Math.random() * 7;
    dustPos[i * 3 + 2] = 14 - Math.random() * 92;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0xf3dcc0, size: 0.035, sizeAttenuation: true, transparent: true, opacity: 0.55, depthWrite: false
  }));
  scene.add(dust);

  /* ── textures ──────────────────────────────────────────────────────────── */
  const manager = new THREE.LoadingManager();
  manager.onProgress = (_url, loaded, total) => onProgress(total ? loaded / total : 0);
  const texLoader = new THREE.TextureLoader(manager);
  const MAX_ANISO = renderer.capabilities.getMaxAnisotropy();
  let texLoaded = 0;
  PORTRAITS.forEach(([file], i) => {
    texLoader.load(`/images/psychologists/${file}-portrait.jpg`, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = Math.min(4, MAX_ANISO);
      pictureMat[i].map = tex;
      pictureMat[i].color.setHex(0xffffff);
      pictureMat[i].needsUpdate = true;
      texLoaded += 1;
      if (texLoaded === PORTRAITS.length) onReady();
    });
  });

  /* ── camera path ───────────────────────────────────────────────────────── */
  const KEY_V = KEYS.map((k) => ({
    p: k.p,
    pos: new THREE.Vector3(...k.pos),
    look: new THREE.Vector3(...k.look)
  }));

  function samplePath(p, outPos, outLook) {
    if (p <= KEY_V[0].p) { outPos.copy(KEY_V[0].pos); outLook.copy(KEY_V[0].look); return; }
    const last = KEY_V[KEY_V.length - 1];
    if (p >= last.p) { outPos.copy(last.pos); outLook.copy(last.look); return; }
    for (let i = 0; i < KEY_V.length - 1; i++) {
      const a = KEY_V[i];
      const b = KEY_V[i + 1];
      if (p >= a.p && p <= b.p) {
        const t = (p - a.p) / (b.p - a.p);
        const e = t * t * (3 - 2 * t);
        outPos.copy(a.pos).lerp(b.pos, e);
        outLook.copy(a.look).lerp(b.look, e);
        return;
      }
    }
  }

  const state = {
    progress: 0,
    target: 0,
    pointer: new THREE.Vector2(),
    pointerSmooth: new THREE.Vector2(),
    time: 0
  };

  const tmpPos = new THREE.Vector3();
  const tmpLook = new THREE.Vector3();

  let debugCam = null;
  function applyCamera(p) {
    if (debugCam) {
      camera.position.copy(debugCam.pos);
      camera.lookAt(debugCam.look);
      return;
    }
    samplePath(THREE.MathUtils.clamp(p, 0, 1), tmpPos, tmpLook);

    if (!REDUCED) {
      const sway = Math.sin(state.time * 0.5) * 0.05;
      const lift = Math.cos(state.time * 0.37) * 0.035;
      tmpPos.x += sway + state.pointerSmooth.x * 0.5;
      tmpPos.y += lift + state.pointerSmooth.y * 0.22;
    }

    camera.position.copy(tmpPos);
    camera.lookAt(tmpLook);
  }

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // widen slightly on tall screens so the hall still reads
    camera.fov = h > w ? 72 : 46;
    camera.updateProjectionMatrix();
  }

  let last = performance.now();
  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    state.time += dt;

    state.pointerSmooth.lerp(state.pointer, 0.05);
    state.progress += (state.target - state.progress) * Math.min(1, dt * 3.2);

    applyCamera(state.progress);

    if (!REDUCED) {
      dust.rotation.y = Math.sin(state.time * 0.05) * 0.04;
      dust.position.y = Math.sin(state.time * 0.22) * 0.12;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  window.addEventListener('pointermove', (e) => {
    state.pointer.set((e.clientX / window.innerWidth - 0.5) * 2, -(e.clientY / window.innerHeight - 0.5) * 2);
  }, { passive: true });

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(frame);

  return {
    scene,
    camera,
    renderer,
    setProgress(v) { state.target = THREE.MathUtils.clamp(v, 0, 1); state.progress = state.target; },
    nudge(v) { state.target = THREE.MathUtils.clamp(v, 0, 1); },
    debugCamera(pos, look) { debugCam = pos ? { pos: new THREE.Vector3(...pos), look: new THREE.Vector3(...look) } : null; },
    get progress() { return state.progress; }
  };
}
