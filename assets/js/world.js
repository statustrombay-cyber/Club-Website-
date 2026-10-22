/* The building. Six box rooms, each complete on all four sides so you can turn
   right the way around inside it: walls, framed works, a ceiling, a window onto
   the desert, furniture, a gold artifact, and the people. */

import { mat4, compose } from './m4.js';
import { box, plane, panel, cylinder, sphere, torus, merge } from './geo.js';
import { mesh } from './gl.js';

export const ROOM_W = 11;
export const ROOM_D = 11;
export const ROOM_H = 5.4;
export const EYE = 1.62;
export const ROOM_GAP = 60;      // rooms are parked far apart; one is shown at a time

export const CHAPTERS = [
  { kicker: 'Room I', title: 'The Room\nWe Keep', sub: 'Where the week is put down. The door stays open, the light stays low.' },
  { kicker: 'Room II', title: 'Small Circles\nof Talking', sub: 'Six chairs, no agenda. The conversation finds its own shape.' },
  { kicker: 'Room III', title: 'Ground We\nStand On', sub: 'Attention, patience, return — the practices that hold a week together.' },
  { kicker: 'Room IV', title: 'Ten Faces\non the Wall', sub: 'The people who listen. They are not in a hurry either.' },
  { kicker: 'Room V', title: 'The Gold Hour', sub: 'Late light on plaster, and the long table set for whoever comes.' },
  { kicker: 'Room VI', title: 'The Door\nThat Opens', sub: 'Open to every student. Bring a pencil, bring a friend.' },
];

/* wall 0 front (−z) · 1 right (+x) · 2 back (+z) · 3 left (−x)
   each with the yaw that turns a +Z-facing card into that wall's inward face */
const WALLS = [
  { yaw: 0, axis: 'z', sign: -1 },
  { yaw: -Math.PI / 2, axis: 'x', sign: 1 },
  { yaw: Math.PI, axis: 'z', sign: 1 },
  { yaw: Math.PI / 2, axis: 'x', sign: -1 },
];

const T = (x, y, z) => { const m = mat4(); m[12] = x; m[13] = y; m[14] = z; return m; };

function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

/* place a +Z-facing card (w × h) on wall `wall`, `u` metres along it, `y` up,
   `inset` metres in from the wall plane */
export function wallPoint(wall, u, y, inset = 0) {
  const w = WALLS[wall];
  if (w.axis === 'z') {
    return { pos: [u, y, w.sign * (ROOM_D / 2 - inset)], yaw: w.yaw };
  }
  return { pos: [w.sign * (ROOM_W / 2 - inset), y, u], yaw: w.yaw };
}

export function createWorld(gl) {
  const solids = [];
  const glows = [];
  const figures = [];
  const casters = [];
  const discs = [];
  const hazes = [];
  const dustSpecs = [];
  const stats = { triangles: 0 };

  const add = (geo, model, mat, opts = {}) => {
    const m = mesh(gl, geo);
    const item = { mesh: m, model, mat, x: model[12], y: model[13], z: model[14] };
    solids.push(item);
    stats.triangles += geo.index.length / 3;
    if (opts.cast) casters.push(item);
    return item;
  };
  const addGlow = (geo, model, mat, flipU = 0, crop = null) => {
    const m = mesh(gl, geo);
    glows.push({ mesh: m, model, mat, flipU, uvs: crop ? crop[0] : 1, uvo: crop ? [crop[1], crop[2]] : [0, 0] });
    stats.triangles += geo.index.length / 3;
    return m;
  };

  /* place a card of w × h with its centre at p, facing yaw */
  const card = (geo, x, y, z, yaw, sx = 1, sy = 1, sz = 1) => {
    const m = compose(mat4(), x, y, z, yaw, sx, sy, sz);
    return m;
  };

  /* ── shared geometry ──────────────────────────────────────────────────── */
  const gUnit = panel(1, 1);                  // 1 × 1 card, +Z
  const gFloor = plane(ROOM_W, ROOM_D, true);
  const gCeil = plane(ROOM_W, ROOM_D, false);
  const gFigure = mesh(gl, panel(1, 1));

  const gSkirt = box(1, 0.16, 0.05);
  const gMullion = box(0.05, 1, 0.05);
  const gSill = box(1, 0.12, 0.4);

  const frameGeo = (w, h, t) => merge([
    { geo: box(w, t, 0.07), matrix: T(0, h / 2, 0) },
    { geo: box(w, t, 0.07), matrix: T(0, -h / 2, 0) },
    { geo: box(t, h, 0.07), matrix: T(-w / 2, 0, 0) },
    { geo: box(t, h, 0.07), matrix: T(w / 2, 0, 0) },
  ]);

  const gPlinth = merge([
    { geo: box(0.92, 0.16, 0.92), matrix: T(0, 0.08, 0) },
    { geo: box(0.76, 0.88, 0.76), matrix: T(0, 0.56, 0) },
    { geo: box(0.88, 0.07, 0.88), matrix: T(0, 1.02, 0) },
  ]);
  const gTable = merge([
    { geo: box(2.6, 0.065, 1.16), matrix: T(0, 0.745, 0) },
    { geo: box(2.3, 0.10, 0.86), matrix: T(0, 0.665, 0) },
    { geo: box(0.075, 0.72, 0.075), matrix: T(-1.16, 0.36, -0.48) },
    { geo: box(0.075, 0.72, 0.075), matrix: T(1.16, 0.36, -0.48) },
    { geo: box(0.075, 0.72, 0.075), matrix: T(-1.16, 0.36, 0.48) },
    { geo: box(0.075, 0.72, 0.075), matrix: T(1.16, 0.36, 0.48) },
    { geo: box(2.24, 0.05, 0.05), matrix: T(0, 0.16, -0.48) },
    { geo: box(2.24, 0.05, 0.05), matrix: T(0, 0.16, 0.48) },
  ]);
  const gLowTable = merge([
    { geo: cylinder(0.56, 0.055, 40), matrix: T(0, 0.40, 0) },
    { geo: cylinder(0.50, 0.035, 36), matrix: T(0, 0.355, 0) },
    { geo: cylinder(0.045, 0.34, 12), matrix: T(-0.3, 0.17, -0.22) },
    { geo: cylinder(0.045, 0.34, 12), matrix: T(0.3, 0.17, -0.22) },
    { geo: cylinder(0.045, 0.34, 12), matrix: T(0, 0.17, 0.32) },
  ]);
  const gChair = merge([
    { geo: box(0.46, 0.055, 0.45), matrix: T(0, 0.44, 0) },
    { geo: box(0.42, 0.045, 0.40), matrix: T(0, 0.40, 0) },
    { geo: box(0.038, 0.44, 0.038), matrix: T(-0.19, 0.22, -0.18) },
    { geo: box(0.038, 0.44, 0.038), matrix: T(0.19, 0.22, -0.18) },
    { geo: box(0.038, 0.44, 0.038), matrix: T(-0.19, 0.22, 0.18) },
    { geo: box(0.038, 0.44, 0.038), matrix: T(0.19, 0.22, 0.18) },
    { geo: box(0.038, 0.42, 0.038), matrix: T(-0.19, 0.66, 0.185) },
    { geo: box(0.038, 0.42, 0.038), matrix: T(0.19, 0.66, 0.185) },
    { geo: box(0.42, 0.13, 0.035), matrix: T(0, 0.80, 0.185) },
    { geo: box(0.42, 0.05, 0.03), matrix: T(0, 0.63, 0.185) },
  ]);
  const gBench = merge([
    { geo: box(2.0, 0.07, 0.5), matrix: T(0, 0.43, 0) },
    { geo: box(1.84, 0.05, 0.44), matrix: T(0, 0.385, 0) },
    { geo: box(0.06, 0.42, 0.44), matrix: T(-0.86, 0.21, 0) },
    { geo: box(0.06, 0.42, 0.44), matrix: T(0.86, 0.21, 0) },
    { geo: box(1.68, 0.04, 0.04), matrix: T(0, 0.14, 0) },
  ]);
  const gShelf = merge([
    { geo: box(0.5, 0.08, 2.2), matrix: T(0, 1.5, 0) },
    { geo: box(0.5, 0.08, 2.2), matrix: T(0, 1.02, 0) },
    { geo: box(0.5, 0.08, 2.2), matrix: T(0, 0.54, 0) },
    { geo: box(0.5, 1.62, 0.08), matrix: T(0, 0.81, -1.06) },
    { geo: box(0.5, 1.62, 0.08), matrix: T(0, 0.81, 1.06) },
  ]);
  const gOrb = sphere(0.3, 32, 22);
  const gRing = torus(0.44, 0.08, 48, 24);
  const gVessel = merge([
    { geo: sphere(0.26, 28, 18), matrix: T(0, 0.27, 0) },
    { geo: cylinder(0.1, 0.32, 20, true), matrix: T(0, 0.47, 0) },
    { geo: cylinder(0.24, 0.05, 22, true), matrix: T(0, 0.02, 0) },
  ]);
  const gCube = box(0.52, 0.52, 0.52);
  const gDisc = mesh(gl, panel(1, 1));
  const slatParts = [];
  for (let i = 0; i < 16; i++) slatParts.push({ geo: box(0.055, 2.9, 0.10), matrix: T(-1.05 + i * 0.14, 1.62, 0) });
  slatParts.push({ geo: box(2.35, 0.06, 0.16), matrix: T(0, 0.14, 0) });
  slatParts.push({ geo: box(2.35, 0.05, 0.14), matrix: T(0, 3.1, 0) });
  const gSlats = merge(slatParts);
  const gRug = box(6.2, 0.012, 4.4);

  const layouts = [
    {
      window: { wall: 0, w: 4.6, h: 3.0, y: 2.55 },
      works: [
        { wall: 0, u: 3.55, y: 2.55, w: 1.3, h: 1.8, poster: 2 },
        { wall: 1, u: 0.2, y: 2.7, w: 2.1, h: 2.8, art: 1 },
        { wall: 1, u: -3.4, y: 2.6, w: 1.15, h: 1.55, poster: 4 },
        { wall: 2, u: -0.4, y: 2.65, w: 2.5, h: 1.65, art: 3 },
        { wall: 2, u: 3.0, y: 2.55, w: 1.2, h: 1.6, poster: 1 },
        { wall: 3, u: 0.5, y: 2.75, w: 1.9, h: 2.6, art: 0 },
        { wall: 3, u: -3.3, y: 2.55, w: 1.15, h: 1.55, poster: 5 },
      ],
      numeral: { wall: 2, u: -4.1, y: 1.45 },
      figures: [
        { wall: 0, u: -3.7, art: 0 },
        { wall: 1, u: 2.7, art: 1 },
      ],
      props: ['salon'],
      artifact: 'orb',
      light: { at: [-2.2, 4.55, -1.0], color: [1.0, 0.83, 0.60] },
    },
    {
      window: { wall: 2, w: 4.2, h: 2.8, y: 2.45 },
      works: [
        { wall: 2, u: -3.4, y: 2.5, w: 1.25, h: 1.7, poster: 3 },
        { wall: 2, u: 3.4, y: 2.5, w: 1.25, h: 1.7, poster: 1 },
        { wall: 0, u: -0.2, y: 2.8, w: 2.7, h: 1.75, art: 3 },
        { wall: 0, u: 3.3, y: 2.6, w: 1.2, h: 1.6, poster: 0 },
        { wall: 1, u: -0.4, y: 2.7, w: 1.9, h: 2.6, art: 5 },
        { wall: 1, u: 3.3, y: 2.55, w: 1.15, h: 1.5, poster: 5 },
        { wall: 3, u: 1.2, y: 2.65, w: 2.0, h: 2.7, art: 2 },
        { wall: 3, u: -3.0, y: 2.55, w: 1.2, h: 1.6, poster: 2 },
      ],
      numeral: { wall: 0, u: -4.1, y: 1.45 },
      figures: [
        { wall: 2, u: -3.4, art: 2 },
        { wall: 0, u: 2.4, art: 0 },
      ],
      props: ['circle', 'shelf'],
      artifact: 'ring',
      light: { at: [2.1, 4.55, 0.4], color: [1.0, 0.85, 0.65] },
    },
    {
      window: { wall: 1, w: 3.4, h: 3.2, y: 2.6 },
      works: [
        { wall: 1, u: -3.6, y: 2.6, w: 1.35, h: 1.85, art: 4 },
        { wall: 0, u: 0.2, y: 2.75, w: 2.4, h: 2.9, art: 0 },
        { wall: 0, u: -3.4, y: 2.55, w: 1.2, h: 1.6, poster: 5 },
        { wall: 2, u: -0.6, y: 2.7, w: 2.2, h: 1.6, poster: 2 },
        { wall: 2, u: 3.1, y: 2.6, w: 1.3, h: 1.8, art: 2 },
        { wall: 3, u: 0.4, y: 2.7, w: 1.8, h: 2.5, art: 3 },
        { wall: 3, u: -3.4, y: 2.55, w: 1.2, h: 1.6, poster: 0 },
      ],
      numeral: { wall: 2, u: -4.1, y: 1.45 },
      figures: [
        { wall: 1, u: -3.6, art: 1 },
        { wall: 0, u: 3.1, art: 4 },
        { wall: 3, u: -2.2, art: 0 },
      ],
      props: ['benches'],
      artifact: 'vessel',
      light: { at: [0.6, 4.6, -2.2], color: [1.0, 0.82, 0.58] },
    },
    {
      window: null,
      works: [
        { wall: 0, u: -3.0, y: 2.62, w: 1.18, h: 1.64, poster: 3 },
        { wall: 0, u: -1.0, y: 2.62, w: 1.18, h: 1.64, poster: 0 },
        { wall: 0, u: 1.0, y: 2.62, w: 1.18, h: 1.64, poster: 2 },
        { wall: 0, u: 3.0, y: 2.62, w: 1.18, h: 1.64, poster: 5 },
        { wall: 1, u: 0, y: 2.8, w: 2.6, h: 1.7, art: 1 },
        { wall: 3, u: -0.2, y: 2.8, w: 2.2, h: 2.9, art: 3 },
        { wall: 3, u: 3.4, y: 2.55, w: 1.2, h: 1.55, poster: 4 },
        { wall: 2, u: -0.4, y: 2.7, w: 2.3, h: 1.55, art: 5 },
        { wall: 2, u: 3.1, y: 2.55, w: 1.2, h: 1.6, poster: 1 },
      ],
      numeral: { wall: 2, u: -4.1, y: 1.45 },
      figures: [
        { wall: 0, u: 4.45, art: 2 },
        { wall: 0, u: -4.45, art: 0 },
      ],
      props: ['bench'],
      artifact: 'cube',
      light: { at: [0, 4.6, 1.2], color: [1.0, 0.80, 0.56] },
    },
    {
      window: null,
      skylight: true,
      works: [
        { wall: 0, u: 0, y: 2.95, w: 3.4, h: 2.1, art: 2 },
        { wall: 0, u: 3.9, y: 2.55, w: 1.0, h: 1.35, poster: 0 },
        { wall: 1, u: 0.4, y: 2.7, w: 1.5, h: 2.0, poster: 4 },
        { wall: 1, u: -3.5, y: 2.55, w: 1.2, h: 1.6, poster: 3 },
        { wall: 3, u: -0.4, y: 2.7, w: 1.5, h: 2.0, poster: 1 },
        { wall: 3, u: 3.5, y: 2.55, w: 1.2, h: 1.6, art: 4 },
        { wall: 2, u: 0.6, y: 2.7, w: 2.4, h: 1.7, art: 5 },
      ],
      numeral: { wall: 2, u: -4.1, y: 1.45 },
      figures: [
        { wall: 1, u: 3.0, art: 4 },
        { wall: 0, u: -4.1, art: 3 },
      ],
      props: ['longtable'],
      artifact: 'orb',
      light: { at: [0, 4.7, 0], color: [1.0, 0.74, 0.44] },
    },
    {
      window: { wall: 3, w: 4.0, h: 3.0, y: 2.55 },
      works: [
        { wall: 3, u: -3.5, y: 2.55, w: 1.25, h: 1.7, poster: 2 },
        { wall: 3, u: 3.5, y: 2.55, w: 1.25, h: 1.7, poster: 5 },
        { wall: 0, u: 0, y: 2.85, w: 2.3, h: 3.0, art: 0 },
        { wall: 0, u: -3.5, y: 2.55, w: 1.15, h: 1.55, poster: 0 },
        { wall: 1, u: 0, y: 2.75, w: 1.7, h: 2.2, poster: 1 },
        { wall: 1, u: -3.4, y: 2.55, w: 1.2, h: 1.6, art: 2 },
        { wall: 2, u: -1.4, y: 2.7, w: 2.2, h: 1.6, art: 4 },
        { wall: 2, u: 2.8, y: 2.6, w: 1.3, h: 1.75, poster: 4 },
      ],
      numeral: { wall: 2, u: 4.2, y: 1.45 },
      figures: [
        { wall: 3, u: -3.4, art: 3 },
        { wall: 0, u: 2.4, art: 1 },
      ],
      props: ['shelf', 'bench'],
      artifact: 'vessel',
      light: { at: [1.8, 4.55, -1.8], color: [1.0, 0.84, 0.62] },
    },
  ];

  const rooms = layouts.map((L, i) => ({ ...L, index: i, off: i * ROOM_GAP, chapter: CHAPTERS[i] }));

  return {
    rooms, CHAPTERS, stats,
    solids, glows, figures, casters, discs, hazes, dustSpecs,
    gDisc, gUnit, gFigure,

    build(T2) {
      rooms.forEach((room) => {
        const off = room.off;
        const P = (m) => { const c = new Float32Array(m); c[14] += off; return c; };
        const glowMat = (tex, tint = [1, 1, 1], power = 1.2) => ({ tex, tint, power });

        /* shell */
        add(gFloor, T(0, 0, off), T2.mats.floor);
        add(gCeil, T(0, ROOM_H, off), T2.mats.ceiling);
        for (let w = 0; w < 4; w++) {
          const p = wallPoint(w, 0, ROOM_H / 2, 0);
          const m = card(gUnit, p.pos[0], p.pos[1], p.pos[2], p.yaw, ROOM_W, ROOM_H, 1);
          add(gUnit, P(m), T2.mats.plaster);
          // skirting
          const sp = wallPoint(w, 0, 0.055, 0.028);
          const sm = card(gSkirt, sp.pos[0], sp.pos[1], sp.pos[2], sp.yaw, ROOM_W, 0.11, 1);
          add(gSkirt, P(sm), T2.mats.skirt);
        }

        /* window or skylight */
        if (room.window) {
          const W = room.window;
          const p = wallPoint(W.wall, 0, W.y, 0.05);
          addGlow(gUnit, P(card(gUnit, p.pos[0], p.pos[1], p.pos[2], p.yaw, W.w, W.h, 1)),
            glowMat(T2.skies[room.index % T2.skies.length], [1, 0.97, 0.92], 1.45));
          // reveal
          const fr = frameGeo(W.w + 0.3, W.h + 0.3, 0.09);
          add(fr, P(card(fr, p.pos[0], p.pos[1], p.pos[2] + 0.03, p.yaw, 1, 1, 1)), T2.mats.sill);
          for (let m = -1; m <= 1; m += 2) {
            const p2 = wallPoint(W.wall, m * (W.w / 3), W.y, 0.08);
            add(gMullion, P(card(gMullion, p2.pos[0], p2.pos[1], p2.pos[2], p2.yaw, 1, W.h, 1)), T2.mats.frame);
          }
        }
        if (room.skylight) {
          addGlow(gUnit, T(0, ROOM_H - 0.05, off), glowMat(T2.skies[4], [1, 0.96, 0.9], 1.5));
          // a ceiling grid over the opening
          for (let m = -1; m <= 1; m += 2) {
            add(gMullion, P(card(gMullion, m * 1.4, ROOM_H - 0.03, off, Math.PI / 2, 1, 3.2, 1)), T2.mats.frame);
          }
        }

        /* the works */
        room.works.forEach((wk) => {
          const p = wallPoint(wk.wall, wk.u, wk.y, 0.06);
          const fr = frameGeo(wk.w + 0.14, wk.h + 0.14, 0.06);
          add(fr, P(card(fr, p.pos[0], p.pos[1], p.pos[2], p.yaw)), T2.mats.frame);
          const art = wk.poster != null ? T2.posters[wk.poster] : T2.arts[wk.art];
          const flip = wk.wall === 1 || wk.wall === 3 ? 1 : 0;
          addGlow(gUnit, P(card(gUnit, p.pos[0], p.pos[1], p.pos[2], p.yaw, wk.w, wk.h, 1)),
            glowMat(art, [1.0, 0.97, 0.92], 0.95), flip);
        });

        /* the room's numeral, hung small and low like a plaque */
        {
          const nm = room.numeral || { wall: 2, u: 3.9, y: 2.15 };
          const p = wallPoint(nm.wall, nm.u, nm.y, 0.06);
          const fr = frameGeo(0.6, 0.6, 0.05);
          add(fr, P(card(fr, p.pos[0], p.pos[1], p.pos[2], p.yaw)), T2.mats.frame);
          const nf = nm.wall === 1 || nm.wall === 3 ? 1 : 0;
          addGlow(gUnit, P(card(gUnit, p.pos[0], p.pos[1], p.pos[2], p.yaw, 0.47, 0.47, 1)),
            glowMat(T2.numerals[room.index], [1, 1, 1], 0.85), nf);
        }

        /* furniture: a rug, a low table, chairs — placed in the round so there
           is something in every direction you might turn */
        const props = room.props || [];
        const rug = props.some((p) => ['salon', 'circle', 'longtable'].includes(p));
        if (rug) {
          add(gRug, P(T(props.includes('longtable') ? 0 : 0.6, 0.006, -1.95)), T2.mats.rug);
        }
        if (props.includes('salon')) {
          add(gLowTable, P(T(1.35, 0, -2.15)), T2.mats.wood, { cast: true });
          add(gChair, P(compose(mat4(), 2.55, 0, -1.55, -0.75, 1, 1, 1)), T2.mats.wood, { cast: true });
          add(gChair, P(compose(mat4(), 2.05, 0, -3.05, 2.5, 1, 1, 1)), T2.mats.wood, { cast: true });
          add(gBench, P(compose(mat4(), -3.15, 0, -1.35, 1.5, 1, 1, 1)), T2.mats.wood, { cast: true });
        }
        if (props.includes('longtable')) {
          const t = add(gTable, P(T(0, 0, -2.2)), T2.mats.wood, { cast: true });
          t.model[0] *= 1.25;
          add(gChair, P(compose(mat4(), -0.9, 0, -0.75, 0.15, 1, 1, 1)), T2.mats.wood, { cast: true });
          add(gChair, P(compose(mat4(), 0.9, 0, -0.75, 0.15, 1, 1, 1)), T2.mats.wood, { cast: true });
          add(gChair, P(compose(mat4(), -0.9, 0, -3.6, 3.29, 1, 1, 1)), T2.mats.wood, { cast: true });
          add(gChair, P(compose(mat4(), 0.9, 0, -3.6, 3.29, 1, 1, 1)), T2.mats.wood, { cast: true });
        }
        if (props.includes('bench')) add(gBench, P(compose(mat4(), -3.0, 0, -2.0, 1.5, 1, 1, 1)), T2.mats.wood, { cast: true });
        if (props.includes('benches')) {
          add(gBench, P(compose(mat4(), -3.1, 0, -1.9, 1.52, 1, 1, 1)), T2.mats.wood, { cast: true });
          add(gBench, P(compose(mat4(), 3.1, 0, -1.9, -1.52, 1, 1, 1)), T2.mats.wood, { cast: true });
        }
        if (props.includes('shelf')) add(gShelf, P(T(-4.6, 0, -2.2)), T2.mats.wood, { cast: true });
        if (props.includes('circle')) {
          const n = 6, rad = 1.5, cx = 0, cz = -1.9;
          for (let c = 0; c < n; c++) {
            const a = (c / n) * Math.PI * 2 + 0.3;
            add(gChair, P(compose(mat4(), cx + Math.cos(a) * rad, 0, cz + Math.sin(a) * rad, -a + Math.PI / 2, 1, 1, 1)),
              T2.mats.wood, { cast: true });
          }
          add(gLowTable, P(T(cx, 0, cz)), T2.mats.gold, { cast: true });
        }

        /* artifact */
        {
          const px = 3.4, pz = -3.0;
          add(gPlinth, P(T(px, 0, pz)), T2.mats.sill, { cast: true });
          const top = 1.05;
          if (room.artifact === 'orb') add(gOrb, P(T(px, top + 0.3, pz)), T2.mats.gold, { cast: true });
          else if (room.artifact === 'ring') add(gRing, P(compose(mat4(), px, top + 0.5, pz, 0.25, 1, 1, 1, Math.PI / 2)), T2.mats.gold, { cast: true });
          else if (room.artifact === 'vessel') add(gVessel, P(T(px, top, pz)), T2.mats.brass, { cast: true });
          else add(gCube, P(compose(mat4(), px, top + 0.27, pz, 0.5, 1, 1, 1, 0.4)), T2.mats.gold, { cast: true });
          hazes.push({ pos: [px, top + 0.5, pz + off], size: 2.0, power: 0.05, color: [1, 0.72, 0.36] });
        }

        /* the ceiling lamp */
        {
          const [lx, ly, lz] = room.light.at;
          add(box(1.7, 0.05, 0.3), P(T(lx, ROOM_H - 0.09, lz)), T2.mats.lamp);
          hazes.push({ pos: [lx, ROOM_H - 0.3, lz + off], size: 3.6, power: 0.10, color: room.light.color });
        }

        /* the people */
        room.figures.forEach((f) => {
          const p = wallPoint(f.wall, f.u, 0, 0.85);
          const art = T2.figures[f.art % T2.figures.length];
          const height = 1.78;
          figures.push({
            tex: art.tex, aspect: art.aspect,
            origin: [p.pos[0], height * 0.5, p.pos[2] + off],
            size: [height * art.aspect, height],
          });
          discs.push({ pos: [p.pos[0], 0.014, p.pos[2] + off], size: height * 0.8, power: 0.6 });
        });

        /* dust */
        const dr = rng(101 + room.index * 7);
        const N = 900;
        const data = new Float32Array(N * 6);
        for (let k = 0; k < N; k++) {
          data[k * 6] = (dr() * 2 - 1) * (ROOM_W / 2 - 0.4);
          data[k * 6 + 1] = dr() * 5.1;
          data[k * 6 + 2] = (dr() * 2 - 1) * (ROOM_D / 2 - 0.4) + off;
          data[k * 6 + 3] = dr();
          data[k * 6 + 4] = dr();
          data[k * 6 + 5] = dr();
        }
        dustSpecs.push({ data, off });
      });
      return this;
    },
  };
}
