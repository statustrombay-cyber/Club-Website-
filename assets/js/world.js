/* The building. Seven rooms threaded on one axis, arch after arch: plaster,
   sconces, gold dust, and the people who stand in the light. Everything here
   is generated at load — there are no model or texture files. */

import { mat4, compose, clamp, smoothstep } from './m4.js';
import { box, plane, cylinder, sphere, torus, cone, archWall, merge } from './geo.js';
import { buildFigure, POSE_NAMES } from './figures.js';
import { mesh, drawInstanced } from './gl.js';

export const ROOM_LEN = 27;
export const FIRST_WALL = 3;
export const ROOMS = 7;
export const WALL_Z = 5.4;       // half-width of the corridor, inside face
export const CEIL_Y = 7.0;

const ARCH_A = 2.75;
const ARCH_SPRING = 3.7;

export const CHAPTERS = [
  { title: 'The First Door', kicker: 'Mindful Tattva', sub: 'A club for the mind. Scroll — or drag — to walk in.' },
  { title: 'The Room\nWe Keep', kicker: 'Room I', sub: 'Where the week is put down. A long table, low light, no hurry.' },
  { title: 'Small Circles\nof Talking', kicker: 'Room II', sub: 'Six chairs. No agenda. The conversation finds its own shape.' },
  { title: 'Ground We\nStand On', kicker: 'Room III', sub: 'The practices that hold us: attention, patience, return.' },
  { title: 'Ten Faces\non the Wall', kicker: 'Room IV', sub: 'The people who listen. They are not in a hurry either.' },
  { title: 'The Gold Hour', kicker: 'Room V', sub: 'Late light on plaster, and the long table set for whoever comes.' },
  { title: 'Texts We\nReturn To', kicker: 'Room VI', sub: 'A shelf, and the margins we write in. Bring a pencil.' },
  { title: 'The Door\nThat Opens', kicker: 'Room VII', sub: 'Open to every student. The door stays unlocked.' },
];

export const MATERIALS = {
  plaster:  { albedo: [0.90, 0.875, 0.83], rough: 0.95, metal: 0.0, rim: 0.05, emissive: 0.0, detail: 1.0 },
  plasterWarm: { albedo: [0.98, 0.93, 0.84], rough: 0.92, metal: 0.0, rim: 0.09, emissive: 0.0, detail: 1.0 },
  ceiling:  { albedo: [0.18, 0.16, 0.14], rough: 0.97, metal: 0.0, rim: 0.02, emissive: 0.0, detail: 0.6 },
  stone:    { albedo: [0.055, 0.051, 0.048], rough: 0.24, metal: 0.30, rim: 0.34, emissive: 0.0, detail: 0.5 },
  dais:     { albedo: [0.085, 0.075, 0.066], rough: 0.40, metal: 0.12, rim: 0.20, emissive: 0.0, detail: 0.9 },
  wood:     { albedo: [0.075, 0.055, 0.040], rough: 0.46, metal: 0.08, rim: 0.28, emissive: 0.0, detail: 0.8 },
  door:     { albedo: [0.16, 0.125, 0.09], rough: 0.48, metal: 0.25, rim: 0.35, emissive: 0.0, detail: 0.7 },
  figure:   { albedo: [0.010, 0.0095, 0.009], rough: 0.92, metal: 0.0, rim: 0.14, emissive: 0.0, detail: 0.1 },
  gold:     { albedo: [0.84, 0.62, 0.27], rough: 0.38, metal: 1.0, rim: 0.2, emissive: 0.0, detail: 0.3 },
  brass:    { albedo: [0.68, 0.50, 0.26], rough: 0.34, metal: 1.0, rim: 0.2, emissive: 0.0, detail: 0.35 },
  lamp:     { albedo: [1.0, 0.88, 0.66], rough: 1.0, metal: 0.0, rim: 0.0, emissive: 3.4, detail: 0.0 },
  cove:     { albedo: [1.0, 0.82, 0.56], rough: 1.0, metal: 0.0, rim: 0.0, emissive: 1.7, detail: 0.0 },
  void:     { albedo: [0.013, 0.012, 0.011], rough: 0.22, metal: 0.45, rim: 0.0, emissive: 0.0, detail: 0.0 },
};

const T = (x, y, z) => { const m = mat4(); m[12] = x; m[13] = y; m[14] = z; return m; };

function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

export function createWorld(gl) {
  const solids = [];
  const instanced = [];
  const casters = [];
  const doors = [];
  const dustSpecs = [];
  const cones = [];
  const stats = { triangles: 0, draws: 0 };

  const add = (geo, model, mat, opts = {}) => {
    const m = mesh(gl, geo);
    solids.push({ mesh: m, model, mat, x: model ? model[12] : 0 });
    stats.triangles += geo.index.length / 3;
    if (opts.cast) casters.push({ mesh: m, model });
    return m;
  };

  const addInstanced = (geo, data, mat, opts = {}) => {
    const m = mesh(gl, geo);
    const count = m.instance(new Float32Array(data));
    const item = { mesh: m, count, mat, x: opts.x || 0, range: opts.range || 40 };
    instanced.push(item);
    stats.triangles += (geo.index.length / 3) * count;
    if (opts.cast) casters.push({ instanced: m, count });
    return item;
  };

  /* ── geometry ─────────────────────────────────────────────────────────── */
  const gFloor = plane(ROOM_LEN, WALL_Z * 2);
  const gCeil = plane(ROOM_LEN, WALL_Z * 2, false);
  const gWall = box(ROOM_LEN, CEIL_Y, 0.4);
  const gSkirt = box(ROOM_LEN, 0.3, 0.09);
  const gCove = box(ROOM_LEN, 0.18, 0.18);
  const gDado = box(ROOM_LEN, 0.07, 0.09);
  const gCarpet = box(ROOM_LEN, 0.012, 2.6);
  const gCarpetEdge = box(ROOM_LEN, 0.014, 0.06);
  const gImpost = box(0.62, 0.17, 0.5);
  const gPilaster = merge([
    { geo: box(0.52, 0.16, 0.42), matrix: T(0, 0.08, 0) },
    { geo: box(0.4, CEIL_Y - 1.1, 0.3), matrix: T(0, (CEIL_Y - 1.1) / 2 + 0.12, 0) },
    { geo: box(0.5, 0.14, 0.38), matrix: T(0, CEIL_Y - 0.95, 0) },
  ]);
  const gLintel = box(0.2, 0.2, WALL_Z * 2 + 0.9);
  const gBeam = box(0.42, 0.34, WALL_Z * 2 + 0.4);
  const gFrame = merge([
    { geo: box(0.07, 1.92, 0.07), matrix: T(0, 0.96, -0.66) },
    { geo: box(0.07, 1.92, 0.07), matrix: T(0, 0.96, 0.66) },
    { geo: box(0.07, 0.07, 1.38), matrix: T(0, 1.92, 0) },
    { geo: box(0.07, 0.07, 1.38), matrix: T(0, 0, 0) },
  ]);
  const gCanvas = box(0.04, 1.8, 1.26);
  const gArch = archWall({ width: WALL_Z * 2 + 0.9, height: CEIL_Y, thick: 0.5, a: ARCH_A, spring: ARCH_SPRING, segs: 30 });

  const pierH = CEIL_Y - 1.5;
  const gPier = merge([
    { geo: box(0.78, 0.18, 0.62), matrix: T(0, 0.09, 0) },
    { geo: box(0.6, pierH, 0.46), matrix: T(0, pierH / 2 + 0.16, 0) },
    { geo: box(0.74, 0.16, 0.56), matrix: T(0, pierH + 0.24, 0) },
    { geo: box(0.82, 0.1, 0.62), matrix: T(0, pierH + 0.36, 0) },
  ]);
  const gPlate = box(0.05, 0.62, 0.2);
  const gBulb = box(0.06, 0.44, 0.12);

  const gPlinth = merge([
    { geo: box(1.05, 0.18, 1.05), matrix: T(0, 0.09, 0) },
    { geo: box(0.86, 0.95, 0.86), matrix: T(0, 0.6, 0) },
    { geo: box(0.98, 0.08, 0.98), matrix: T(0, 1.12, 0) },
  ]);
  const gStand = merge([
    { geo: box(0.62, 0.5, 0.62), matrix: T(0, 0.25, 0) },
  ]);
  const gTable = merge([
    { geo: box(3.4, 0.12, 1.5), matrix: T(0, 0.74, 0) },
    { geo: box(0.16, 0.72, 0.16), matrix: T(-1.5, 0.36, -0.6) },
    { geo: box(0.16, 0.72, 0.16), matrix: T(1.5, 0.36, -0.6) },
    { geo: box(0.16, 0.72, 0.16), matrix: T(-1.5, 0.36, 0.6) },
    { geo: box(0.16, 0.72, 0.16), matrix: T(1.5, 0.36, 0.6) },
  ]);
  const gBench = merge([
    { geo: box(2.6, 0.14, 0.6), matrix: T(0, 0.44, 0) },
    { geo: box(0.14, 0.44, 0.5), matrix: T(-1.1, 0.22, 0) },
    { geo: box(0.14, 0.44, 0.5), matrix: T(1.1, 0.22, 0) },
  ]);
  const gChair = merge([
    { geo: box(0.46, 0.06, 0.46), matrix: T(0, 0.45, 0) },
    { geo: box(0.46, 0.52, 0.06), matrix: T(0, 0.73, -0.2) },
    { geo: box(0.05, 0.45, 0.05), matrix: T(-0.19, 0.22, -0.19) },
    { geo: box(0.05, 0.45, 0.05), matrix: T(0.19, 0.22, -0.19) },
    { geo: box(0.05, 0.45, 0.05), matrix: T(-0.19, 0.22, 0.19) },
    { geo: box(0.05, 0.45, 0.05), matrix: T(0.19, 0.22, 0.19) },
  ]);
  const gShelf = merge([
    { geo: box(2.8, 0.1, 0.5), matrix: T(0, 1.35, 0) },
    { geo: box(2.8, 0.1, 0.5), matrix: T(0, 0.85, 0) },
    { geo: box(0.1, 1.5, 0.5), matrix: T(-1.35, 0.75, 0) },
    { geo: box(0.1, 1.5, 0.5), matrix: T(1.35, 0.75, 0) },
  ]);

  const gLeafA = box(0.09, ARCH_SPRING, 1.86);
  const gLeafB = box(0.09, ARCH_SPRING, 1.86);
  const leafA = mesh(gl, merge([{ geo: gLeafA, matrix: T(0, ARCH_SPRING / 2, 1.87) }]));
  const leafB = mesh(gl, merge([{ geo: gLeafB, matrix: T(0, ARCH_SPRING / 2, -1.87) }]));

  const gOrb = sphere(0.33, 26, 18);
  const gRing = torus(0.7, 0.12, 44, 22);
  const gUrn = merge([
    { geo: sphere(0.32, 22, 16), matrix: T(0, 0.3, 0) },
    { geo: cylinder(0.13, 0.36, 18, true), matrix: T(0, 0.52, 0) },
    { geo: cylinder(0.32, 0.06, 20, true), matrix: T(0, 0.02, 0) },
  ]);
  const gSlot = box(0.8, 0.06, 2.8);
  const gCone = cone(3.1, CEIL_Y - 0.3, 40);

  const figureGeos = {};
  for (const name of POSE_NAMES) figureGeos[name] = buildFigure(name);

  /* ── the rooms ────────────────────────────────────────────────────────── */
  const rnd = rng(20260214);

  for (let k = 0; k < ROOMS; k++) {
    const x0 = FIRST_WALL + k * ROOM_LEN;
    const xc = x0 + ROOM_LEN / 2;

    add(gFloor, T(xc, 0, 0), MATERIALS.stone);
    add(gCeil, T(xc, CEIL_Y, 0), MATERIALS.ceiling);

    for (const s of [-1, 1]) {
      add(gWall, T(xc, CEIL_Y / 2, s * (WALL_Z + 0.2)), MATERIALS.plaster);
      add(gSkirt, T(xc, 0.15, s * (WALL_Z - 0.05)), MATERIALS.dais);
      add(gCove, T(xc, CEIL_Y - 0.42, s * (WALL_Z - 0.12)), MATERIALS.cove);
      add(gDado, T(xc, 1.28, s * (WALL_Z - 0.05)), MATERIALS.plasterWarm);
    }

    // piers, sconces, and the people standing under them
    const pierXs = [x0 + 3.6, x0 + 9.9, x0 + 17.1, x0 + 23.4];
    const pierData = [], plateData = [], bulbData = [];
    let pIndex = 0;
    for (const s of [-1, 1]) {
      for (const px of pierXs) {
        const pz = s * (WALL_Z - 0.26);
        pierData.push(px, 0, pz, 0, 1);
        const sy = 3.15;
        plateData.push(px, sy, s * (WALL_Z - 0.62), 0, 1);
        bulbData.push(px, sy, s * (WALL_Z - 0.72), 0, 1);
        pIndex++;
      }
    }
    addInstanced(gPier, pierData, MATERIALS.plasterWarm, { x: xc, range: 24, cast: true });
    addInstanced(gPlate, plateData, MATERIALS.brass, { x: xc, range: 24 });
    addInstanced(gBulb, bulbData, MATERIALS.lamp, { x: xc, range: 24 });

    // two figures standing against the walls, in the sconce light
    const statueXs = [x0 + 6.6, x0 + 20.4];
    for (let i = 0; i < 2; i++) {
      const s = (k + i) % 2 === 0 ? -1 : 1;
      const px = statueXs[i];
      add(gStand, T(px, 0, s * (WALL_Z - 0.95)), MATERIALS.dais, { cast: true });
      const pose = ['listening', 'leaning', 'folded', 'standing'][(k * 2 + i) % 4];
      addInstanced(figureGeos[pose], [px, 0.5, s * (WALL_Z - 0.95), s < 0 ? Math.PI * 0.5 : -Math.PI * 0.5, 0.98],
        MATERIALS.figure, { x: px, range: 22, cast: true });
    }

    // the people out in the room
    const crowd = [];
    const count = 3 + (k % 3);
    for (let i = 0; i < count; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const px = x0 + 5 + rnd() * (ROOM_LEN - 9);
      const pz = side * (1.9 + rnd() * 1.7);
      const pose = POSE_NAMES[(i + k * 2) % POSE_NAMES.length];
      const rot = (side < 0 ? 1 : -1) * (0.4 + rnd() * 0.9);
      crowd.push([px, 0, pz, rot, 0.95 + rnd() * 0.1]);
    }
    addInstanced(figureGeos[POSE_NAMES[(k + 1) % POSE_NAMES.length]], crowd.flat(), MATERIALS.figure,
      { x: xc, range: 26, cast: true });

    // furniture, kept off the walking line
    const chairRing = (tx, tz, ry, n, radius) => {
      const data = [];
      for (let c = 0; c < n; c++) {
        const a = ry + (c / n) * Math.PI * 2;
        data.push(tx + Math.cos(a) * radius, 0, tz + Math.sin(a) * radius, -a + Math.PI / 2, 1);
      }
      addInstanced(gChair, data, MATERIALS.wood, { x: tx, range: 26, cast: true });
    };
    if (k % 3 === 0) {
      add(gTable, T(xc + 1.5, 0, -2.6), MATERIALS.wood, { cast: true });
      add(gBench, T(xc + 1.5, 0, -4.1), MATERIALS.wood, { cast: true });
      chairRing(xc + 1.5, -2.6, 0.2, 6, 1.45);
    } else if (k % 3 === 1) {
      add(gBench, T(xc - 2.0, 0, 3.1), MATERIALS.wood, { cast: true });
      add(gTable, T(xc + 4.5, 0, 2.4), MATERIALS.wood, { cast: true });
      chairRing(xc + 4.5, 2.4, 0.7, 5, 1.35);
    } else {
      add(gShelf, T(xc - 3.5, 0, 4.55), MATERIALS.wood, { cast: true });
      add(gBench, T(xc + 2.0, 0, 3.4), MATERIALS.wood, { cast: true });
    }

    // framed works along the walls: the club's exhibitions
    for (let f = 0; f < 3; f++) {
      const side = (k + f) % 2 === 0 ? -1 : 1;
      const fx = x0 + 5.4 + f * 8.1;
      const fz = side * (WALL_Z - 0.08);
      const rot = side < 0 ? Math.PI / 2 : -Math.PI / 2;
      add(gFrame, compose(mat4(), fx, 1.35, fz, rot, 1, 1, 1), MATERIALS.brass);
      add(gCanvas, compose(mat4(), fx, 2.3, fz, rot, 1, 1, 1), MATERIALS.void);
    }

    // ceiling beams: rhythm overhead, and something for the light to model
    for (let bm = 0; bm < 5; bm++) {
      add(gBeam, T(x0 + 3.2 + bm * 5.2, CEIL_Y - 0.32, 0), MATERIALS.wood);
    }

    // a runner down the middle: scale, direction, and something to catch the light
    add(gCarpet, T(xc, 0.007, 0), MATERIALS.void);
    for (const s2 of [-1, 1]) add(gCarpetEdge, T(xc, 0.009, s2 * 1.32), MATERIALS.brass);

    // the ceiling slot that does the actual lighting of the room
    add(gSlot, T(xc - 1.0, CEIL_Y - 0.08, 0), MATERIALS.lamp);
    cones.push({ pos: [xc - 1.0, CEIL_Y - 0.12, 0], model: mat4() });

    // an artifact on a plinth
    const ax = xc + 4.6;
    const az = k % 2 === 0 ? 1.5 : -1.5;
    add(gPlinth, T(ax, 0, az), MATERIALS.dais, { cast: true });
    if (k % 3 === 0) add(gOrb, T(ax, 1.45, az), MATERIALS.gold, { cast: true });
    else if (k % 3 === 1) add(gUrn, T(ax, 1.16, az), MATERIALS.gold, { cast: true });
    else add(gRing, compose(mat4(), ax, 1.62, az, 0.2, 0.5, 0.5, 0.5, Math.PI / 2), MATERIALS.brass, { cast: true });

    // gold dust
    const dr = rng(991 + k * 37);
    const dustData = new Float32Array(1050 * 6);
    for (let i = 0; i < 1050; i++) {
      dustData[i * 6] = x0 + dr() * ROOM_LEN;
      dustData[i * 6 + 1] = dr() * 6.4;
      dustData[i * 6 + 2] = (dr() * 2 - 1) * (WALL_Z - 0.5);
      dustData[i * 6 + 3] = dr();
      dustData[i * 6 + 4] = dr();
      dustData[i * 6 + 5] = dr();
    }
    dustSpecs.push({ x0, x1: x0 + ROOM_LEN, data: dustData });
  }

  // boundary walls and their doors
  for (let b = 0; b <= ROOMS; b++) {
    const bx = FIRST_WALL + b * ROOM_LEN;
    add(gArch, compose(mat4(), bx, 0, 0, -Math.PI / 2, 1, 1, 1), MATERIALS.plasterWarm);
    for (const s2 of [-1, 1]) {
      add(gImpost, T(bx, ARCH_SPRING, s2 * (ARCH_A + 0.34)), MATERIALS.plasterWarm);
      add(gPilaster, compose(mat4(), bx, 0, s2 * (WALL_Z - 0.55), -Math.PI / 2, 1, 1, 1), MATERIALS.plasterWarm);
    }
    add(gLintel, compose(mat4(), bx, CEIL_Y - 0.75, 0, 0, 1, 1, 1), MATERIALS.plasterWarm);
    for (const s2 of [-1, 1]) {
      add(gPlate, compose(mat4(), bx - 0.3, 3.05, s2 * (ARCH_A + 0.62), 0, 1, 1, 1), MATERIALS.brass);
      add(gBulb, compose(mat4(), bx - 0.38, 3.05, s2 * (ARCH_A + 0.62), 0, 1, 1, 1), MATERIALS.lamp);
    }
    for (const s of [-1, 1]) {
      const leaf = s < 0 ? leafA : leafB;
      const hingeZ = s * (ARCH_A - 0.03);
      const door = { mesh: leaf, x: bx, sign: s, hingeZ, angle: 0, model: compose(mat4(), bx, 0, hingeZ, 0, 1, 1, 1) };
      doors.push(door);
      casters.push({ mesh: leaf, door });
    }
  }

  /* ── light shafts hanging from the slots ──────────────────────────────── */
  const rotX = (a) => {
    const c = Math.cos(a), sn = Math.sin(a);
    const m = mat4();
    m[5] = c; m[6] = sn; m[9] = -sn; m[10] = c;
    return m;
  };
  const shaftGeo = merge([{ geo: plane(1, 1, true), matrix: rotX(-Math.PI / 2) }]);
  const shaftData = [];
  for (let k = 0; k < ROOMS; k++) {
    const xc = FIRST_WALL + k * ROOM_LEN + ROOM_LEN / 2;
    for (let i = 0; i < 3; i++) {
      shaftData.push(xc - 1.0, 3.1, (i - 1) * 2.1, Math.PI / 2 + (i - 1) * 0.09, 3.0 + i * 0.25);
    }
  }
  const spillData = [];
  for (let b = 0; b <= ROOMS; b++) {
    const bx = FIRST_WALL + b * ROOM_LEN;
    spillData.push(bx + 0.9, 3.3, 0, Math.PI / 2, 6.2);
  }
  const shaftMesh = mesh(gl, shaftGeo);
  const shaftCount = shaftMesh.instance(new Float32Array(shaftData));
  const spillMesh = mesh(gl, shaftGeo);
  const spillCount = spillMesh.instance(new Float32Array(spillData));

  /* ── dust ─────────────────────────────────────────────────────────────── */
  const dustChunks = dustSpecs.map((c) => {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, c.data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
    gl.bindVertexArray(null);
    return { vao, count: c.data.length / 6, x0: c.x0, x1: c.x1 };
  });

  let time = 0;

  /* put every door in the state it should already be in for this camera,
     so nothing swings open on the first frame the room is shown */
  function settle(camX) {
    for (const d of doors) {
      const dist = Math.abs(camX - d.x);
      d.angle = dist < 40 ? smoothstep((40 - dist) / 16) * 1.53 : 0;
      compose(d.model, d.x, 0, d.hingeZ, d.sign > 0 ? -d.angle : d.angle, 1, 1, 1);
    }
  }

  function update(dt, camX) {
    time += dt;
    for (const d of doors) {
      const dist = Math.abs(camX - d.x);
      const target = dist < 40 ? smoothstep((40 - dist) / 16) * 1.53 : 0;
      d.angle += (target - d.angle) * Math.min(1, dt * 3.2);
      compose(d.model, d.x, 0, d.hingeZ, d.sign > 0 ? -d.angle : d.angle, 1, 1, 1);
    }
  }

  return {
    MATERIALS,
    solids, instanced, doors, casters, stats,
    dustChunks,
    shafts: { mesh: shaftMesh, count: shaftCount },
    spills: { mesh: spillMesh, count: spillCount },
    coneGeo: gCone, cones,
    chapters: CHAPTERS,
    get time() { return time; },
    update,
    settle,
    roomAt: (x) => clamp(Math.floor((x - FIRST_WALL) / ROOM_LEN), 0, ROOMS - 1),
    /* one long graze along a wall per room: the wall is washed, the far side
       of the corridor goes to shadow, and the people read as silhouettes */
    lightAt(x) {
      const room = clamp(Math.floor((x - FIRST_WALL) / ROOM_LEN), 0, ROOMS - 1);
      const xc = FIRST_WALL + room * ROOM_LEN + ROOM_LEN / 2;
      const side = room % 2 === 0 ? -1 : 1;
      return {
        pos: [xc - 4.5, CEIL_Y - 1.15, side * (WALL_Z - 1.35)],
        target: [xc + 7.0, 0.55, side * (WALL_Z - 0.3)],
        room, side,
      };
    },
    /* each chapter looks down its room but a little off-axis, so the walls,
       the sconces and the people read instead of a flat end wall */
    chapterCamera(i) {
      const anchor = i === 0 ? 6.4 : FIRST_WALL + (i - 1) * ROOM_LEN + 11;
      const yaw = i === 0 ? 0.02 : (i % 2 === 0 ? 0.2 : -0.2);
      return { anchor, yaw };
    },
  };
}
