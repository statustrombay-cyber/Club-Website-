/* ════════════════════════════════════════════════════════════════════════
   MINDFUL TATTVA — our own rooms.

   Nothing here is taken from Cartier. Every room, every dune, every figure,
   every texture and the camera itself are built in this file:

     · the walls, the floor and the ceiling of the first chamber
     · the gold dunes of the desert and the pale pillars that stand in them
     · the cliffs, the workshop, the manufacture, the film room, the benches
     · the people — silhouettes built out of capsules, standing where the
       recording has them standing
     · the dust that hangs in the air, the light that pools on the floor
     · the camera, which walks one smooth curve from the first room to the
       last, and never jumps

   The scroll is the clock. The page is seven rooms tall; the camera walks
   the curve as you read, and every room turns a little as you pass through
   it, the way the recording turns the rooms.
   ════════════════════════════════════════════════════════════════════════ */

import * as THREE from './vendor/three.module.js';
import { makePost } from './post.js';

/* ── the knobs, for the stills and for tuning ───────────────────────────── */
const PARAMS = new URLSearchParams(location.search);
const STILL = PARAMS.has('still');
const CHAPTER = PARAMS.has('chapter') ? parseInt(PARAMS.get('chapter'), 10) : null;
let AT = PARAMS.has('t') ? parseFloat(PARAMS.get('t')) : null;
let manual = false;          // the clock has been set by hand
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const num = (k, d) => (PARAMS.has(k) ? parseFloat(PARAMS.get(k)) : d);
const EXPOSURE = num('exp', 1.0);
const GLOW = num('glow', 1.0);
const DUST = num('dust', 1.0);
const FOV = num('fov', 0);
const HFOV = num('hfov', 0);
const ZOOM = num('zoom', 0);

/* ── the interface ──────────────────────────────────────────────────────── */
const el = {
  canvas: document.getElementById('gl'),
  loader: document.getElementById('loader'),
  loaderProgress: document.getElementById('loaderProgress'),
  sound: document.getElementById('soundButton'),
  title: document.getElementById('sceneTitle'),
  titleText: document.getElementById('sceneTitleText'),
  titleLayer: document.getElementById('sceneTitleLayer'),
  baseline: document.getElementById('baseline'),
  baselineWrap: document.getElementById('introWrapper'),
  scroll: document.getElementById('scrollButton'),
  explore: document.getElementById('exploreButton'),
  nav: document.getElementById('sideNav')
};

/* ── the chapters ───────────────────────────────────────────────────────── */
const CHAPTERS = [
  {
    name: 'The room',
    title: 'Mindful Tattva',
    line: 'A room for the mind, a club for the curious.'
  },
  {
    name: 'craft',
    title: 'Tailored crafts',
    line: 'The desert of hands, the patience of sand.'
  },
  {
    name: 'eye',
    title: 'The eye of the jeweller',
    line: 'A light that never quite touches the metal.'
  },
  {
    name: 'shape',
    title: 'Shaping movement',
    line: 'The wood remembers every hand that held it.'
  },
  {
    name: 'manu',
    title: 'The Manufacture',
    line: 'Where time is the only tool there is.'
  },
  {
    name: 'film',
    title: 'The film',
    line: 'One room, one breath, one long take.'
  },
  {
    name: 'sound',
    title: 'The Sound of Craft',
    line: 'The room listens, and answers.'
  }
];

/* ── the camera stations: one per room, on one smooth curve ────────────── */
const STATIONS = [
  { pos: [0.0, 1.70, 7.0], look: [0.0, 1.95, -3.0], fov: 62 },
  { pos: [0.4, 1.70, -17.0], look: [1.4, 0.30, -33.0], fov: 66 },
  { pos: [-1.2, 1.70, -41.0], look: [-3.4, 3.10, -57.0], fov: 64 },
  { pos: [0.6, 1.70, -65.0], look: [1.6, 1.45, -81.0], fov: 62 },
  { pos: [0.0, 1.80, -89.0], look: [0.0, 2.40, -105.0], fov: 60 },
  { pos: [0.0, 1.80, -113.0], look: [0.0, 2.00, -129.0], fov: 58 },
  { pos: [0.0, 1.80, -137.0], look: [0.0, 1.45, -153.0], fov: 58 }
];

const ROOM_Z = [0, -24, -48, -72, -96, -120, -144];

/* ════════════════════════════════════════════════════════════════════════
   small maths helpers
   ════════════════════════════════════════════════════════════════════════ */
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);

/* a curve through the stations, with the ends held in place */
function catmull(points, t) {
  const n = points.length;
  const i = clamp(Math.floor(t), 0, n - 2);
  const f = clamp(t - i, 0, 1);
  const p0 = points[Math.max(0, i - 1)];
  const p1 = points[i];
  const p2 = points[Math.min(n - 1, i + 1)];
  const p3 = points[Math.min(n - 1, i + 2)];
  const out = [];
  for (let k = 0; k < p1.length; k++) {
    const a = p0[k], b = p1[k], c = p2[k], d = p3[k];
    out.push(
      0.5 * ((2 * b) + (-a + c) * f + (2 * a - 5 * b + 4 * c - d) * f * f +
        (-a + 3 * b - 3 * c + d) * f * f * f)
    );
  }
  return out;
}

/* our own noise: a hash of the lattice, smoothed between the corners */
function hash2(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}
function valueNoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = smooth(xf), v = smooth(yf);
  const a = hash2(xi, yi), b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}
function fbm(x, y, oct = 4) {
  let v = 0, amp = 0.5, f = 1;
  for (let i = 0; i < oct; i++) {
    v += amp * valueNoise(x * f, y * f);
    f *= 2.03;
    amp *= 0.5;
  }
  return v;
}

/* a small random generator, so every room is the same every time */
function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

/* ════════════════════════════════════════════════════════════════════════
   our own textures — drawn here, nothing is loaded from anywhere
   ════════════════════════════════════════════════════════════════════════ */
function canvasTexture(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/* the soft ball of light: the glow, the dust, the pools on the floor */
function glowTexture() {
  return canvasTexture(128, 128, (g, w, h) => {
    const grd = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.28, 'rgba(255,240,215,0.55)');
    grd.addColorStop(0.62, 'rgba(255,220,170,0.16)');
    grd.addColorStop(1, 'rgba(255,210,150,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, w, h);
  });
}

/* the wall of a room: warm plaster, darker at the top, with a soft grain */
function wallTexture(top, bottom) {
  return canvasTexture(64, 256, (g, w, h) => {
    const grd = g.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, top);
    grd.addColorStop(1, bottom);
    g.fillStyle = grd;
    g.fillRect(0, 0, w, h);
    const img = g.getImageData(0, 0, w, h);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - 0.5) * 16;
      d[i] = clamp(d[i] + n, 0, 255);
      d[i + 1] = clamp(d[i + 1] + n, 0, 255);
      d[i + 2] = clamp(d[i + 2] + n, 0, 255);
    }
    g.putImageData(img, 0, 0);
  });
}

/* the gold of the dunes: a warm sand with the light caught in it */
function sandTexture() {
  return canvasTexture(256, 256, (g, w, h) => {
    g.fillStyle = '#7d6a2e';
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < 5200; i++) {
      const x = Math.random() * w, y = Math.random() * h;
      const s = Math.random();
      g.fillStyle = s > 0.72
        ? 'rgba(255,226,150,' + (0.10 + Math.random() * 0.5).toFixed(3) + ')'
        : 'rgba(60,48,16,' + (0.05 + Math.random() * 0.25).toFixed(3) + ')';
      g.fillRect(x, y, 1 + (s > 0.94 ? 1 : 0), 1);
    }
  });
}

/* the floor of a room: a warm stone with a pool of light burnt into it */
function floorTexture() {
  return canvasTexture(256, 256, (g, w, h) => {
    g.fillStyle = '#2a211a';
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < 2600; i++) {
      const x = Math.random() * w, y = Math.random() * h;
      g.fillStyle = 'rgba(120,96,70,' + (Math.random() * 0.25).toFixed(3) + ')';
      g.fillRect(x, y, 1 + Math.random() * 2, 1 + Math.random() * 2);
    }
    g.strokeStyle = 'rgba(255,214,164,0.10)';
    g.lineWidth = 1;
    for (let i = 0; i <= 8; i++) {
      const p = (i / 8) * w;
      g.beginPath(); g.moveTo(p, 0); g.lineTo(p, h); g.stroke();
      g.beginPath(); g.moveTo(0, p); g.lineTo(w, p); g.stroke();
    }
  });
}

/* the sky of the desert: a warm dark, with a low band of light */
function skyTexture() {
  return canvasTexture(64, 256, (g, w, h) => {
    const grd = g.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0.0, '#120d09');
    grd.addColorStop(0.45, '#2a1c11');
    grd.addColorStop(0.72, '#6b451f');
    grd.addColorStop(0.9, '#a9722f');
    grd.addColorStop(1.0, '#3a2611');
    g.fillStyle = grd;
    g.fillRect(0, 0, w, h);
  });
}

/* the word of the first room, drawn as a light of its own */
function wordTexture(words) {
  return canvasTexture(1024, 256, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = '300 96px Georgia, "Times New Roman", serif';
    const line = words.join('   ');
    g.shadowColor = 'rgba(255,224,178,0.95)';
    g.shadowBlur = 26;
    g.fillStyle = 'rgba(255,246,230,1)';
    g.fillText(line, w / 2, h / 2);
    g.shadowBlur = 0;
  });
}

/* ════════════════════════════════════════════════════════════════════════
   our own people: silhouettes, built out of capsules and boxes
   ════════════════════════════════════════════════════════════════════════ */
function makeFigure(kind, height, colour) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: colour, roughness: 0.85, metalness: 0
  });
  const s = height / 1.75;
  const add = (geo, x, y, z, rx = 0, rz = 0) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.rotation.x = rx; m.rotation.z = rz;
    m.castShadow = false;
    g.add(m);
    return m;
  };
  const legR = 0.075, armR = 0.055;
  const hip = 0.86 * s, shoulder = 1.42 * s;
  add(new THREE.CapsuleGeometry(legR, 0.62 * s, 3, 6), -0.105 * s, 0.44 * s, 0);
  add(new THREE.CapsuleGeometry(legR, 0.62 * s, 3, 6), 0.105 * s, 0.44 * s, 0);
  add(new THREE.CapsuleGeometry(0.155 * s, 0.44 * s, 4, 8), 0, hip + 0.22 * s, 0);
  add(new THREE.SphereGeometry(0.105 * s, 12, 10), 0, shoulder + 0.12 * s, 0);
  if (kind === 'coat') {
    add(new THREE.CylinderGeometry(0.16 * s, 0.26 * s, 0.9 * s, 10, 1, true), 0, 0.45 * s, 0);
  } else {
    add(new THREE.CapsuleGeometry(armR, 0.52 * s, 3, 6), -0.2 * s, shoulder - 0.28 * s, 0, 0, 0.06);
    add(new THREE.CapsuleGeometry(armR, 0.52 * s, 3, 6), 0.2 * s, shoulder - 0.28 * s, 0, 0, -0.06);
  }
  g.userData.material = mat;
  return g;
}

/* ════════════════════════════════════════════════════════════════════════
   the rooms
   ════════════════════════════════════════════════════════════════════════ */
const warmMat = (colour, rough = 0.9, metal = 0) =>
  new THREE.MeshStandardMaterial({ color: colour, roughness: rough, metalness: metal });

const emissiveMat = (colour, intensity = 1) =>
  new THREE.MeshStandardMaterial({
    color: colour, emissive: colour, emissiveIntensity: intensity,
    roughness: 0.6, metalness: 0
  });

/* a room: floor, ceiling and four walls, seen from the inside */
function makeShell(w, h, d, wallTop, wallBottom, floorColour) {
  const g = new THREE.Group();
  const wall = new THREE.MeshStandardMaterial({
    map: wallTexture(wallTop, wallBottom), roughness: 0.95, metalness: 0,
    side: THREE.BackSide,
    emissive: new THREE.Color(wallBottom).multiplyScalar(0.42),
    emissiveIntensity: 1
  });
  /* the four walls and the ceiling, each turned to face the room */
  const face = (ww, hh, x, y, z, rx, ry) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(ww, hh), wall);
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, 0);
    g.add(m);
  };
  face(w, h, 0, h / 2, -d / 2, 0, 0);            // the far wall
  face(w, h, 0, h / 2, d / 2, 0, Math.PI);       // the wall behind us
  face(d, h, -w / 2, h / 2, 0, 0, Math.PI / 2);   // the left wall
  face(d, h, w / 2, h / 2, 0, 0, -Math.PI / 2);  // the right wall
  face(w, d, 0, h, 0, Math.PI / 2, 0);           // the ceiling

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    new THREE.MeshStandardMaterial({
      map: floorTexture(), color: floorColour, roughness: 0.82, metalness: 0
    })
  );
  floor.rotation.x = -Math.PI / 2;
  g.add(floor);
  return g;
}

/* the panels of light that stand against the walls of the first room */
function makePanels(count, w, h, colour, intensity) {
  const g = new THREE.Group();
  const mat = emissiveMat(colour, intensity);
  for (let i = 0; i < count; i++) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    g.add(p);
  }
  return g;
}

/* the dunes: a height field, gold, catching the light */
function makeDunes(size, seed) {
  const seg = 96;
  const geo = new THREE.PlaneGeometry(size, size, seg, seg);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    const d = Math.hypot(x, z);
    let y = fbm(x * 0.035 + seed, z * 0.035 + seed, 5) * 9.5;
    y += fbm(x * 0.12 + seed * 3, z * 0.12, 3) * 0.7;
    y -= smooth(clamp((d - size * 0.22) / (size * 0.3), 0, 1)) * 3.4;
    pos.setY(i, y);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
  const mat = new THREE.MeshStandardMaterial({
    map: sandTexture(), color: 0xb59a4a, emissive: 0x3a2c0c, emissiveIntensity: 1,
    roughness: 0.95, metalness: 0
  });
  const mesh = new THREE.Mesh(geo, mat);
  return mesh;
}

/* a pale pillar, lit from within */
function makePillar(r, h, colour) {
  const mat = new THREE.MeshStandardMaterial({
    color: colour, emissive: colour, emissiveIntensity: 0.55,
    roughness: 0.35, metalness: 0
  });
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.06, h, 24, 1), mat);
  m.position.y = h / 2;
  return m;
}

/* a bench: a slab on two legs */
function makeBench(w, h, d, colour) {
  const g = new THREE.Group();
  const mat = warmMat(colour, 0.85);
  const top = new THREE.Mesh(new THREE.BoxGeometry(w, 0.09, d), mat);
  top.position.y = h;
  g.add(top);
  for (const sx of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.09, h, d * 0.8), mat);
    leg.position.set(sx * (w / 2 - 0.16), h / 2, 0);
    g.add(leg);
  }
  return g;
}

/* a table: a dark disc on a single stem */
function makeTable(r, h) {
  const g = new THREE.Group();
  const mat = warmMat(0x1a1410, 0.6);
  const top = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.07, 28), mat);
  top.position.y = h;
  g.add(top);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, h, 14), mat);
  stem.position.y = h / 2;
  g.add(stem);
  return g;
}

/* the great screen of the film room: a moving light of its own */
function makeScreen(w, h) {
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform float uTime; varying vec2 vUv;
      void main() {
        float y = vUv.y;
        float band = smoothstep(0.0, 0.35, y) * (1.0 - smoothstep(0.55, 1.0, y));
        float wave = 0.5 + 0.5 * sin(vUv.x * 6.0 + uTime * 0.35 + y * 3.0);
        vec3 warm = mix(vec3(0.42, 0.24, 0.10), vec3(1.0, 0.82, 0.55), wave * band);
        float vig = smoothstep(1.05, 0.25, length(vUv - vec2(0.5, 0.55)) * 1.6);
        gl_FragColor = vec4(warm * vig * 1.35, 1.0);
      }`,
    toneMapped: true
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.userData.shader = mat;
  return m;
}

/* the pool of light that lies on a floor */
function makePool(r, colour, opacity) {
  const mat = new THREE.MeshBasicMaterial({
    map: glowTexture(), color: colour, transparent: true, opacity,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(r * 2, r * 2), mat);
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.02;
  return m;
}

/* ════════════════════════════════════════════════════════════════════════
   the scene
   ════════════════════════════════════════════════════════════════════════ */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 1, 0.05, 400);
const renderer = new THREE.WebGLRenderer({
  canvas: el.canvas, antialias: true, powerPreference: 'high-performance'
});
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
renderer.toneMapping = THREE.NoToneMapping;          // the film pass does it
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0x000000, 1);

let post = null;
const roomGroups = [];
const roomLights = [];
const screens = [];
const dust = { points: null, material: null };
const word = { mesh: null, material: null };

/* the air of the place: a warm, low light and a warm mist */
scene.background = new THREE.Color(0x150f0a);

const hemi = new THREE.HemisphereLight(0xffd9b0, 0x2e2118, 0.85);
scene.add(hemi);
scene.fog = new THREE.FogExp2(0x1a120b, 0.017);

function buildRoom(index) {
  const g = new THREE.Group();
  const z = ROOM_Z[index];
  g.position.z = z;
  roomGroups.push(g);
  scene.add(g);
  const rand = rng(1000 + index * 977);

  if (index === 0) {
    /* ── the first room: a warm chamber with light on its walls ─────── */
    g.add(makeShell(18, 6.4, 18, '#6f5238', '#a07c56', 0x8a6b4c));
    const panels = makePanels(10, 1.5, 2.6, 0xffe0b0, 1.5);
    const panelList = panels.children.slice();
    for (let i = 0; i < panelList.length; i++) {
      const p = panelList[i];
      const side = i % 2 === 0 ? -1 : 1;
      const row = Math.floor(i / 2);
      p.position.set(side * 8.6, 2.5 + (row % 2) * 0.4, -6.4 + row * 3.2);
      p.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
      g.add(p);
    }
    g.add(makePool(7.5, 0xffca82, 0.5));
    /* a few people, standing in the light */
    for (let i = 0; i < 5; i++) {
      const f = makeFigure(i % 3 === 0 ? 'coat' : 'plain', 1.62 + rand() * 0.22, 0x120d0a);
      f.position.set(-5 + rand() * 10, 0, -4 + rand() * 7);
      f.rotation.y = rand() * Math.PI * 2;
      g.add(f);
    }
    const l = new THREE.PointLight(0xffd7b4, 150, 40, 1.25);
    l.position.set(0, 3.2, -3.0);
    g.add(l); roomLights.push(l);
  }

  if (index === 1) {
    /* ── the desert: gold dunes, pale pillars, a table, the dust ────── */
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(150, 32, 20),
      new THREE.MeshBasicMaterial({
        map: skyTexture(), side: THREE.BackSide, toneMapped: true, fog: false, depthWrite: false
      })
    );
    dome.position.set(0, 6, -8);
    dome.renderOrder = -2;
    g.add(dome);
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(78, 48),
      new THREE.MeshStandardMaterial({ color: 0x6a5227, roughness: 1, metalness: 0 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -5.4;
    g.add(ground);
    const dunes = makeDunes(120, 3.7);
    dunes.position.set(0, -5.2, -6);
    g.add(dunes);
    for (let i = 0; i < 7; i++) {
      const p = makePillar(0.42 + rand() * 0.22, 3.2 + rand() * 3.4, i % 2 ? 0xf3ead9 : 0xe8c98a);
      const a = (i / 7) * Math.PI * 2 + rand();
      const r = 9 + rand() * 15;
      p.position.set(Math.cos(a) * r, 0, Math.sin(a) * r - 8);
      g.add(p);
    }
    const t = makeTable(1.5, 1.05);
    t.position.set(-3.6, 0, -12);
    g.add(t);
    for (let i = 0; i < 6; i++) {
      const f = makeFigure(i % 2 ? 'plain' : 'coat', 1.58 + rand() * 0.3, 0x0e0b08);
      f.position.set(-7 + rand() * 14, 0, -8 - rand() * 22);
      f.rotation.y = rand() * Math.PI * 2;
      g.add(f);
    }
    g.add(makePool(12, 0xffb469, 0.22));
    const l = new THREE.PointLight(0xffc088, 220, 100, 1.15);
    l.position.set(0, 6, -18);
    g.add(l); roomLights.push(l);
  }

  if (index === 2) {
    /* ── the cliffs: a narrow pass of light between dark rocks ──────── */
    g.add(makeShell(22, 9, 22, '#3a2c22', '#6a4c33', 0x4e3a28));
    for (let i = 0; i < 9; i++) {
      const rock = new THREE.Mesh(
        new THREE.ConeGeometry(2.2 + rand() * 2.6, 7 + rand() * 6, 5, 1),
        warmMat(0x2b2418, 1)
      );
      rock.position.set(-10 + rand() * 20, 2 + rand() * 2, -4 - rand() * 14);
      rock.rotation.y = rand() * Math.PI;
      rock.scale.set(1, 1, 0.6 + rand() * 0.6);
      g.add(rock);
    }
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 4.2, 16, 20, 1, true),
      new THREE.MeshBasicMaterial({
        map: glowTexture(), color: 0xffd7a0, transparent: true, opacity: 0.16,
        blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false
      })
    );
    shaft.position.set(2.5, 5, -12);
    shaft.rotation.z = 0.16;
    g.add(shaft);
    for (let i = 0; i < 4; i++) {
      const f = makeFigure('plain', 1.6 + rand() * 0.25, 0x0d0a07);
      f.position.set(-5 + rand() * 10, 0, -3 - rand() * 12);
      f.rotation.y = rand() * Math.PI * 2;
      g.add(f);
    }
    const l = new THREE.PointLight(0xffd7b4, 190, 52, 1.2);
    l.position.set(2.5, 5.5, -12);
    g.add(l); roomLights.push(l);
  }

  if (index === 3) {
    /* ── the workshop: warm wood, benches, tools on the wall ─────────── */
    g.add(makeShell(20, 6, 20, '#513c28', '#8a6440', 0x6d4f36));
    for (let i = 0; i < 6; i++) {
      const b = makeBench(3.2, 0.92, 0.9, 0x4a2f1c);
      b.position.set(-7 + (i % 3) * 7, 0, -4 - Math.floor(i / 3) * 6);
      b.rotation.y = (rand() - 0.5) * 0.5;
      g.add(b);
    }
    for (let i = 0; i < 9; i++) {
      const tool = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 1.1 + rand() * 1.4, 0.08),
        warmMat(0x8a6a34, 0.4, 0.6)
      );
      tool.position.set(-8 + rand() * 16, 2.4 + rand() * 1.6, -8.6);
      g.add(tool);
    }
    for (let i = 0; i < 5; i++) {
      const f = makeFigure(i % 2 ? 'plain' : 'coat', 1.6 + rand() * 0.24, 0x100c09);
      f.position.set(-6 + rand() * 12, 0, -2 - rand() * 11);
      f.rotation.y = rand() * Math.PI * 2;
      g.add(f);
    }
    g.add(makePool(6, 0xffd0a0, 0.32));
    const l = new THREE.PointLight(0xffc79a, 120, 42, 1.25);
    l.position.set(0, 3.6, -7);
    g.add(l); roomLights.push(l);
  }

  if (index === 4) {
    /* ── the manufacture: a bright cream hall of tall windows ────────── */
    g.add(makeShell(22, 8, 22, '#e0d6c2', '#f6eede', 0xe2d7c2));
    const windows = makePanels(8, 2.2, 5.4, 0xfff2d8, 1.25);
    const windowList = windows.children.slice();
    for (let i = 0; i < windowList.length; i++) {
      const w = windowList[i];
      const side = i % 2 === 0 ? -1 : 1;
      const row = Math.floor(i / 2);
      w.position.set(side * 10.6, 3.6, -6 + row * 5.4);
      w.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
      g.add(w);
    }
    for (let i = 0; i < 5; i++) {
      const f = makeFigure('plain', 1.62 + rand() * 0.2, 0x2b211a);
      f.position.set(-7 + rand() * 14, 0, -4 - rand() * 9);
      f.rotation.y = rand() * Math.PI * 2;
      g.add(f);
    }
    const l = new THREE.PointLight(0xfff0d6, 170, 46, 1.2);
    l.position.set(0, 5, -8);
    g.add(l); roomLights.push(l);
  }

  if (index === 5) {
    /* ── the film: a dark room and the great screen ──────────────────── */
    g.add(makeShell(18, 6.4, 18, '#2a2018', '#543c28', 0x3a2c20));
    const s = makeScreen(11, 6);
    s.position.set(0, 3.1, -8.4);
    g.add(s); screens.push(s);
    for (let i = 0; i < 6; i++) {
      const f = makeFigure('plain', 1.58 + rand() * 0.26, 0x0b0908);
      f.position.set(-5 + rand() * 10, 0, -1 - rand() * 5);
      f.rotation.y = Math.PI + (rand() - 0.5) * 0.5;
      g.add(f);
    }
    const l = new THREE.PointLight(0xffc088, 34, 28, 1.5);
    l.position.set(0, 2.4, -3);
    g.add(l); roomLights.push(l);
  }

  if (index === 6) {
    /* ── the sound of craft: benches in rows, a pool of light ─────────── */
    g.add(makeShell(20, 6.4, 20, '#3a2a1e', '#7a5636', 0x5c4430));
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        const b = makeBench(2.6, 0.46, 0.8, 0x3d2617);
        b.position.set(-6 + c * 4, 0, -2 - r * 3.2);
        g.add(b);
        if (rand() > 0.45) {
          const f = makeFigure(rand() > 0.5 ? 'plain' : 'coat', 1.58 + rand() * 0.2, 0x0c0a08);
          f.position.set(-6 + c * 4 + (rand() - 0.5) * 0.8, 0.46, -2 - r * 3.2);
          f.rotation.y = Math.PI;
          g.add(f);
        }
      }
    }
    g.add(makePool(8, 0xffd7b4, 0.4));
    const l = new THREE.PointLight(0xffd7b4, 80, 38, 1.35);
    l.position.set(0, 4.0, -6);
    g.add(l); roomLights.push(l);
  }
}

/* the dust that hangs in the air of the whole walk */
function buildDust() {
  const count = 2600;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const size = new Float32Array(count);
  const seed = new Float32Array(count);
  const rand = rng(4242);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (rand() - 0.5) * 34;
    pos[i * 3 + 1] = rand() * 6.5;
    pos[i * 3 + 2] = 6 - rand() * 132;
    size[i] = 0.6 + rand() * 1.6;
    seed[i] = rand() * 100;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uMap: { value: glowTexture() },
      uOpacity: { value: 0.34 * DUST }
    },
    vertexShader: `
      attribute float aSize; attribute float aSeed;
      uniform float uTime; varying float vFade;
      void main() {
        vec3 p = position;
        p.y += sin(uTime * 0.22 + aSeed) * 0.42;
        p.x += cos(uTime * 0.17 + aSeed * 1.7) * 0.38;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        float d = -mv.z;
        vFade = smoothstep(70.0, 6.0, d) * smoothstep(0.6, 3.0, d);
        gl_PointSize = clamp(aSize * 16.0 / max(d, 1.5), 1.0, 9.0);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform sampler2D uMap; uniform float uOpacity; varying float vFade;
      void main() {
        vec4 c = texture2D(uMap, gl_PointCoord);
        gl_FragColor = vec4(c.rgb, c.a * uOpacity * vFade);
        if (gl_FragColor.a < 0.004) discard;
      }`,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  scene.add(points);
  dust.points = points;
  dust.material = mat;
}

/* ════════════════════════════════════════════════════════════════════════
   the walk: the scroll is the clock, the camera is one smooth curve
   ════════════════════════════════════════════════════════════════════════ */
let target = 0;          // where the scroll wants us, in room space 0..6
let walked = 0;          // where the camera actually is
let clock = 0;           // the same journey, in seconds
const TOTAL = 24.0;

const span = () => Math.max(1, document.documentElement.scrollHeight - innerHeight);

function readScroll() {
  if (STILL || AT !== null || CHAPTER !== null) return;
  const u = clamp(scrollY / span(), 0, 1);
  target = u * (CHAPTERS.length - 1);
}

function cameraAt(p) {
  const pos = catmull(STATIONS.map((s) => s.pos), p);
  const look = catmull(STATIONS.map((s) => s.look), p);
  const i = clamp(Math.round(p), 0, STATIONS.length - 1);
  const fov = lerp(STATIONS[i].fov, STATIONS[clamp(i + 1, 0, STATIONS.length - 1)].fov,
    clamp(p - Math.floor(p), 0, 1));
  return { pos, look, fov };
}

/* the rooms turn as we pass through them */
function turnRooms(p) {
  for (let i = 0; i < roomGroups.length; i++) {
    const g = roomGroups[i];
    const near = clamp(p - i, -1, 1);
    g.rotation.y = near * 0.16;
    /* and the room nearest to us is the one that is lit */
    const lit = 1 - clamp(Math.abs(p - i), 0, 1);
    roomLights[i].intensity = roomLights[i].userData.base * (0.12 + 0.88 * lit);
  }
}

function placeCamera(p, time) {
  const { pos, look, fov } = cameraAt(p);
  const sway = REDUCED ? 0 : 1;
  camera.position.set(
    pos[0] + Math.sin(time * 0.21) * 0.09 * sway,
    pos[1] + Math.sin(time * 0.31 + 1.2) * 0.045 * sway,
    pos[2]
  );
  camera.lookAt(look[0], look[1] + Math.sin(time * 0.17) * 0.03 * sway, look[2]);
  const want = FOV || fov;
  if (HFOV) {
    const h = THREE.MathUtils.degToRad(HFOV);
    camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(h / 2) / camera.aspect));
  } else {
    camera.fov = want;
  }
  if (ZOOM) camera.zoom = ZOOM;
  camera.updateProjectionMatrix();
}

/* ════════════════════════════════════════════════════════════════════════
   the sound: our own, made in the browser
   ════════════════════════════════════════════════════════════════════════ */
let audio = null;
function startAudio() {
  if (audio) return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 620;
  filter.Q.value = 0.7;
  filter.connect(master);

  [55, 82.5, 110, 164.8].forEach((f, i) => {
    const o = ctx.createOscillator();
    o.type = i % 2 ? 'sine' : 'triangle';
    o.frequency.value = f;
    const g = ctx.createGain();
    g.gain.value = 0.16 / (i + 1);
    o.connect(g); g.connect(filter);
    o.start();
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05 + i * 0.03;
    const lg = ctx.createGain();
    lg.gain.value = 1.2 + i;
    lfo.connect(lg); lg.connect(o.frequency);
    lfo.start();
  });

  /* the breath of the room */
  const len = ctx.sampleRate * 3;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    last = (last + 0.02 * w) / 1.02;
    d[i] = last * 3.2;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf; src.loop = true;
  const ng = ctx.createGain();
  ng.gain.value = 0.05;
  src.connect(ng); ng.connect(filter);
  src.start();

  audio = { ctx, master };
}
function soundOn(on) {
  if (on) startAudio();
  if (!audio) return;
  audio.ctx.resume();
  audio.master.gain.cancelScheduledValues(audio.ctx.currentTime);
  audio.master.gain.linearRampToValueAtTime(on ? 0.5 : 0, audio.ctx.currentTime + 0.8);
}

/* ════════════════════════════════════════════════════════════════════════
   the interface
   ════════════════════════════════════════════════════════════════════════ */
let chapter = 0;
function buildNav() {
  el.nav.innerHTML = '';
  for (let i = 0; i < CHAPTERS.length; i++) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'sideNavIndicationElt__dot';
    dot.setAttribute('aria-label', CHAPTERS[i].title || 'The room');
    dot.addEventListener('click', () => {
      const u = i / (CHAPTERS.length - 1);
      scrollTo({ top: u * span(), behavior: REDUCED ? 'auto' : 'smooth' });
    });
    el.nav.appendChild(dot);
  }
}

function setChapter(i) {
  if (i === chapter) return;
  chapter = i;
  const c = CHAPTERS[i];
  el.titleText.textContent = c.title;
  const near = 1 - clamp(Math.abs(walked - 0), 0, 1);
  el.titleLayer.style.opacity = i === 0 ? String(0.15 + 0.85 * near * near) : '';
  el.titleLayer.classList.toggle('intro', i === 0);
  el.titleLayer.classList.toggle('sceneTitle__layer--off', i === 0);   // the word is in the room
  el.baseline.textContent = c.line;
  el.baselineWrap.classList.toggle('homePage__bottomWrapper--intro--off', i !== 0);
  const dots = el.nav.children;
  for (let k = 0; k < dots.length; k++) {
    dots[k].classList.toggle('sideNavIndicationElt__dot--active', k === i);
  }
}

/* ════════════════════════════════════════════════════════════════════════
   the loop
   ════════════════════════════════════════════════════════════════════════ */
let last = performance.now();
let elapsed = 0;

function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  elapsed += dt;

  if (!manual && (STILL || AT !== null || CHAPTER !== null)) {
    const t = AT !== null ? AT : (CHAPTER !== null ? (CHAPTER / (CHAPTERS.length - 1)) * TOTAL : 0);
    walked = (t / TOTAL) * (CHAPTERS.length - 1);
    target = walked;
  } else if (!manual) {
    readScroll();
    walked += (target - walked) * Math.min(1, dt * 3.4);
  }
  clock = (walked / (CHAPTERS.length - 1)) * TOTAL;

  const p = walked;
  placeCamera(p, elapsed);
  turnRooms(p);

  for (const s of screens) s.userData.shader.uniforms.uTime.value = elapsed;
  if (dust.material) dust.material.uniforms.uTime.value = elapsed;

  setChapter(clamp(Math.round(p), 0, CHAPTERS.length - 1));

  if (post) post.render(scene, camera, dt);
  else {
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
}

/* ════════════════════════════════════════════════════════════════════════
   the build
   ════════════════════════════════════════════════════════════════════════ */
function resize() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  if (post) post.setSize(w, h);
}

function bindInput() {
  addEventListener('scroll', readScroll, { passive: true });
  addEventListener('resize', resize);
  el.sound.addEventListener('click', () => {
    const on = el.sound.getAttribute('aria-pressed') !== 'true';
    el.sound.setAttribute('aria-pressed', on ? 'true' : 'false');
    el.sound.classList.toggle('soundButton--active', on);
    soundOn(on);
  });
  el.scroll.addEventListener('click', () => {
    scrollTo({ top: span() / (CHAPTERS.length - 1), behavior: REDUCED ? 'auto' : 'smooth' });
  });
  el.explore.addEventListener('click', () => {
    scrollTo({ top: span() / (CHAPTERS.length - 1), behavior: REDUCED ? 'auto' : 'smooth' });
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      scrollBy({ top: innerHeight * 0.8, behavior: 'smooth' });
    }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      scrollBy({ top: -innerHeight * 0.8, behavior: 'smooth' });
    }
  });
}

(async function boot() {
  try {
    if (el.loaderProgress) el.loaderProgress.textContent = '00';
    for (let i = 0; i < CHAPTERS.length; i++) {
      buildRoom(i);
      if (el.loaderProgress) {
        el.loaderProgress.textContent = String(Math.round(((i + 1) / CHAPTERS.length) * 100)).padStart(2, '0');
      }
      await new Promise((r) => setTimeout(r, 0));
    }
    buildDust();
    for (const l of roomLights) l.userData.base = l.intensity;
    buildNav();
    setChapter(0);
    el.titleLayer.classList.add('sceneTitle__layer--off');
    el.baseline.textContent = CHAPTERS[0].line;

    post = makePost(renderer);
    resize();
    bindInput();

    if (STILL || AT !== null || CHAPTER !== null) {
      const t = AT !== null ? AT : (CHAPTER !== null ? (CHAPTER / (CHAPTERS.length - 1)) * TOTAL : 0);
      walked = (t / TOTAL) * (CHAPTERS.length - 1);
    } else {
      scrollTo(0, 0);
    }
    el.loader.classList.add('shown');
    setTimeout(() => el.loader.classList.add('mainLoader--hidden'), 700);

    window.__MT__ = {
      THREE, scene, camera, renderer, roomGroups,
      get clock() { return clock; },
      set clock(v) { manual = true; walked = (v / TOTAL) * (CHAPTERS.length - 1); target = walked; },
      get chapter() { return chapter; },
      chapters: CHAPTERS
    };
    window.__MT_READY__ = true;
    last = performance.now();
    requestAnimationFrame(frame);
  } catch (e) {
    console.error('[mindful tattva] the rooms did not open', e && e.stack ? e.stack : e);
    el.loader.classList.add('mainLoader--hidden');
  }
})();
