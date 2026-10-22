/* The people in the rooms. No rigs, no animation files: each pose is a small
   skeleton of points, limbs are capsules laid between them, and the whole
   figure is baked into one mesh at load so a person costs a single draw. */

import { capsule, sphere, box, merge } from './geo.js';

function basis(from, to) {
  // local +Y runs from `from` to `to`; columns are the rotation, translation last
  const dx = to[0] - from[0], dy = to[1] - from[1], dz = to[2] - from[2];
  const len = Math.hypot(dx, dy, dz) || 1e-4;
  const uy = [dx / len, dy / len, dz / len];
  const ref = Math.abs(uy[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0];
  let ux = [
    uy[1] * ref[2] - uy[2] * ref[1],
    uy[2] * ref[0] - uy[0] * ref[2],
    uy[0] * ref[1] - uy[1] * ref[0],
  ];
  let l = Math.hypot(ux[0], ux[1], ux[2]) || 1;
  ux = [ux[0] / l, ux[1] / l, ux[2] / l];
  const uz = [
    ux[1] * uy[2] - ux[2] * uy[1],
    ux[2] * uy[0] - ux[0] * uy[2],
    ux[0] * uy[1] - ux[1] * uy[0],
  ];
  const m = new Float32Array(16);
  m[0] = ux[0]; m[1] = ux[1]; m[2] = ux[2]; m[3] = 0;
  m[4] = uy[0]; m[5] = uy[1]; m[6] = uy[2]; m[7] = 0;
  m[8] = uz[0]; m[9] = uz[1]; m[10] = uz[2]; m[11] = 0;
  m[12] = (from[0] + to[0]) / 2;
  m[13] = (from[1] + to[1]) / 2;
  m[14] = (from[2] + to[2]) / 2;
  m[15] = 1;
  return { m, len };
}

function limb(from, to, r, taper = 0.86) {
  const { m, len } = basis(from, to);
  if (len < 1e-3) return null;
  const g = capsule(r, Math.max(0.001, len - r * 2), 12, 5);
  if (taper !== 1) {
    // pinch the far cap a little so limbs read as limbs, not pipes
    for (let i = 0; i < g.position.length / 3; i++) {
      const y = g.position[i * 3 + 1];
      const t = (y + len / 2) / len;
      const s = 1 - (1 - taper) * Math.max(0, Math.min(1, t));
      g.position[i * 3] *= s;
      g.position[i * 3 + 2] *= s;
    }
  }
  return { geo: g, matrix: m };
}

const translate = (x, y, z) => {
  const m = new Float32Array(16);
  m[0] = m[5] = m[10] = m[15] = 1;
  m[12] = x; m[13] = y; m[14] = z;
  return m;
};

/* Poses are expressed as offsets on a standing skeleton, so they stay legible. */
const POSES = {
  standing: {
    elbowL: [-0.24, 1.13, 0.02], handL: [-0.25, 0.86, 0.05],
    elbowR: [0.24, 1.13, 0.02], handR: [0.25, 0.86, 0.05],
    kneeL: [-0.10, 0.48, 0.02], footL: [-0.10, 0.06, 0.03],
    kneeR: [0.10, 0.48, 0.02], footR: [0.10, 0.06, 0.03],
    lean: 0,
  },
  listening: {
    elbowL: [-0.26, 1.10, 0.04], handL: [-0.20, 0.92, 0.20],
    elbowR: [0.23, 1.15, -0.02], handR: [0.18, 1.34, 0.14],
    kneeL: [-0.12, 0.48, 0.04], footL: [-0.14, 0.06, 0.06],
    kneeR: [0.09, 0.47, -0.03], footR: [0.12, 0.06, -0.05],
    lean: 0.04,
  },
  leaning: {
    elbowL: [-0.28, 1.06, -0.10], handL: [-0.30, 0.84, -0.22],
    elbowR: [0.22, 1.20, 0.06], handR: [0.10, 1.30, 0.16],
    kneeL: [-0.13, 0.47, 0.10], footL: [-0.16, 0.05, 0.20],
    kneeR: [0.11, 0.46, -0.06], footR: [0.13, 0.05, -0.10],
    lean: 0.10,
  },
  walking: {
    elbowL: [-0.23, 1.12, -0.14], handL: [-0.24, 0.88, -0.18],
    elbowR: [0.26, 1.12, 0.12], handR: [0.27, 0.88, 0.16],
    kneeL: [-0.12, 0.50, 0.16], footL: [-0.13, 0.08, 0.30],
    kneeR: [0.11, 0.47, -0.14], footR: [0.12, 0.05, -0.18],
    lean: 0.05,
  },
  folded: {
    elbowL: [-0.20, 1.16, 0.10], handL: [0.09, 1.24, 0.14],
    elbowR: [0.20, 1.16, 0.08], handR: [-0.08, 1.29, 0.12],
    kneeL: [-0.11, 0.48, 0.02], footL: [-0.11, 0.06, 0.03],
    kneeR: [0.11, 0.48, -0.02], footR: [0.11, 0.06, -0.04],
    lean: 0.02,
  },
};

export const POSE_NAMES = Object.keys(POSES);

export function buildFigure(name) {
  const p = POSES[name] || POSES.standing;
  const lean = p.lean || 0;
  const parts = [];
  const push = (item) => { if (item) parts.push(item); };

  const hip = [0, 0.94, 0];
  const chest = [lean, 1.35, lean * 0.6];
  const neck = [lean * 1.1, 1.49, lean * 0.7];
  const head = [lean * 1.15, 1.63, lean * 0.8];

  // torso: two tapered capsules (chest and waist)
  push(limb(hip, [chest[0] * 0.8, 1.16, chest[2] * 0.8], 0.155, 1.05));
  push(limb([chest[0] * 0.8, 1.16, chest[2] * 0.8], chest, 0.175, 0.94));
  push(limb(chest, neck, 0.065, 1));
  const headGeo = sphere(0.102, 16, 12);
  push({ geo: headGeo, matrix: translate(head[0], head[1], head[2]) });
  // shoulders
  push(limb([-0.05, 1.42, 0], [-0.20, 1.40, 0], 0.085, 0.9));
  push(limb([0.05, 1.42, 0], [0.20, 1.40, 0], 0.085, 0.9));

  const shoulderL = [-0.20, 1.40, 0], shoulderR = [0.20, 1.40, 0];
  push(limb(shoulderL, p.elbowL, 0.062, 0.9));
  push(limb(p.elbowL, p.handL, 0.05, 0.72));
  push(limb(shoulderR, p.elbowR, 0.062, 0.9));
  push(limb(p.elbowR, p.handR, 0.05, 0.72));

  const hipL = [-0.085, 0.92, 0], hipR = [0.085, 0.92, 0];
  push(limb(hipL, p.kneeL, 0.088, 0.84));
  push(limb(p.kneeL, [p.footL[0], 0.10, p.footL[2]], 0.066, 0.8));
  push(limb(hipR, p.kneeR, 0.088, 0.84));
  push(limb(p.kneeR, [p.footR[0], 0.10, p.footR[2]], 0.066, 0.8));

  // the coat, positioned at the shoulders
  push({ geo: coatGeo(1.44, 0.54, 0.20, 0.31), matrix: translate(lean * 0.6, 0, 0) });

  // feet
  const foot = box(0.10, 0.075, 0.24);
  push({ geo: foot, matrix: translate(p.footL[0], 0.037, p.footL[2] + 0.05) });
  push({ geo: foot, matrix: translate(p.footR[0], 0.037, p.footR[2] + 0.05) });

  return merge(parts);
}

/* A coat: the silhouette that turns a mannequin into a person. Built as a
   lathe that falls from the shoulders and gathers at the hem. */
export function coatGeo(top = 1.44, bottom = 0.52, r0 = 0.205, r1 = 0.30, segs = 18, rings = 8) {
  const pos = [], nor = [], uv = [], idx = [];
  for (let r = 0; r <= rings; r++) {
    const t = r / rings;
    const y = top + (bottom - top) * t;
    const rad = r0 + (r1 - r0) * Math.pow(t, 0.72);
    for (let i = 0; i <= segs; i++) {
      const th = (i / segs) * Math.PI * 2;
      const cx = Math.cos(th), cz = Math.sin(th);
      pos.push(cx * rad, y, cz * rad);
      // a touch of shoulder flare at the very top
      nor.push(cx, 0.22 - t * 0.2, cz);
      uv.push(i / segs, t);
    }
  }
  for (let r = 0; r < rings; r++) {
    for (let i = 0; i < segs; i++) {
      const a = r * (segs + 1) + i, b = a + 1, c = a + segs + 2, d = a + segs + 1;
      idx.push(a, b, c, a, c, d);
    }
  }
  const normal = new Float32Array(nor.length);
  for (let i = 0; i < nor.length; i += 3) {
    const l = Math.hypot(nor[i], nor[i + 1], nor[i + 2]) || 1;
    normal[i] = nor[i] / l; normal[i + 1] = nor[i + 1] / l; normal[i + 2] = nor[i + 2] / l;
  }
  return {
    position: new Float32Array(pos),
    normal,
    uv: new Float32Array(uv),
    index: new Uint32Array(idx),
  };
}
