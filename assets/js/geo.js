/* Procedural geometry. Every shape on the site is generated here at load —
   there are no model files, no textures, no downloads. */

const TAU = Math.PI * 2;

class Builder {
  constructor() {
    this.p = []; this.n = []; this.uv = []; this.i = [];
  }
  vert(x, y, z, nx, ny, nz, u = 0, v = 0) {
    this.p.push(x, y, z);
    this.n.push(nx, ny, nz);
    this.uv.push(u, v);
    return this.p.length / 3 - 1;
  }
  tri(a, b, c) { this.i.push(a, b, c); }
  quad(a, b, c, d) { this.i.push(a, b, c, a, c, d); }
  geo() {
    return {
      position: new Float32Array(this.p),
      normal: new Float32Array(this.n),
      uv: new Float32Array(this.uv),
      index: new Uint32Array(this.i),
    };
  }
}

export function box(w, h, d) {
  const b = new Builder();
  const x = w / 2, y = h / 2, z = d / 2;
  const face = (verts, n) => {
    const idx = verts.map((v) => b.vert(v[0], v[1], v[2], n[0], n[1], n[2]));
    b.quad(idx[0], idx[1], idx[2], idx[3]);
  };
  face([[-x, -y, z], [x, -y, z], [x, y, z], [-x, y, z]], [0, 0, 1]);
  face([[x, -y, -z], [-x, -y, -z], [-x, y, -z], [x, y, -z]], [0, 0, -1]);
  face([[x, -y, z], [x, -y, -z], [x, y, -z], [x, y, z]], [1, 0, 0]);
  face([[-x, -y, -z], [-x, -y, z], [-x, y, z], [-x, y, -z]], [-1, 0, 0]);
  face([[-x, y, z], [x, y, z], [x, y, -z], [-x, y, -z]], [0, 1, 0]);
  face([[-x, -y, -z], [x, -y, -z], [x, -y, z], [-x, -y, z]], [0, -1, 0]);
  return b.geo();
}

/* floor / ceiling plane in XZ, facing +Y (or -Y) */
export function plane(w, d, up = true) {
  const b = new Builder();
  const x = w / 2, z = d / 2;
  const ny = up ? 1 : -1;
  const a = b.vert(-x, 0, z, 0, ny, 0, 0, 0);
  const c = b.vert(x, 0, z, 0, ny, 0, 1, 0);
  const e = b.vert(x, 0, -z, 0, ny, 0, 1, 1);
  const f = b.vert(-x, 0, -z, 0, ny, 0, 0, 1);
  if (up) b.quad(a, c, e, f); else b.quad(f, e, c, a);
  return b.geo();
}

export function cylinder(r, h, segs = 24, caps = true) {
  const b = new Builder();
  const y0 = 0, y1 = h;
  for (let i = 0; i < segs; i++) {
    const t0 = (i / segs) * TAU, t1 = ((i + 1) / segs) * TAU;
    const x0 = Math.cos(t0) * r, z0 = Math.sin(t0) * r;
    const x1 = Math.cos(t1) * r, z1 = Math.sin(t1) * r;
    const n0x = Math.cos(t0), n0z = Math.sin(t0), n1x = Math.cos(t1), n1z = Math.sin(t1);
    const a = b.vert(x0, y0, z0, n0x, 0, n0z, i / segs, 0);
    const c = b.vert(x1, y0, z1, n1x, 0, n1z, (i + 1) / segs, 0);
    const e = b.vert(x1, y1, z1, n1x, 0, n1z, (i + 1) / segs, 1);
    const f = b.vert(x0, y1, z0, n0x, 0, n0z, i / segs, 1);
    b.quad(a, c, e, f);
    if (caps) {
      const ca = b.vert(0, y1, 0, 0, 1, 0);
      b.tri(ca, f, e);
      const cb = b.vert(0, y0, 0, 0, -1, 0);
      b.tri(cb, a, c);
    }
  }
  return b.geo();
}

export function sphere(r, segs = 20, rings = 14) {
  const b = new Builder();
  const grid = [];
  for (let y = 0; y <= rings; y++) {
    const v = y / rings, phi = v * Math.PI;
    const row = [];
    for (let x = 0; x <= segs; x++) {
      const u = x / segs, th = u * TAU;
      const nx = Math.sin(phi) * Math.cos(th);
      const ny = Math.cos(phi);
      const nz = Math.sin(phi) * Math.sin(th);
      row.push(b.vert(nx * r, ny * r, nz * r, nx, ny, nz, u, v));
    }
    grid.push(row);
  }
  for (let y = 0; y < rings; y++) {
    for (let x = 0; x < segs; x++) {
      const a = grid[y][x], c = grid[y][x + 1], e = grid[y + 1][x + 1], f = grid[y + 1][x];
      b.quad(a, c, e, f);
    }
  }
  return b.geo();
}

export function capsule(r, h, segs = 16, caps = 8) {
  const b = new Builder();
  const half = h / 2;
  const rings = [];
  for (let i = 0; i <= caps; i++) {
    const t = i / caps, ang = (t - 0.5) * Math.PI * 0.5;
    // top cap: from equator to pole
    const phi = (i / caps) * (Math.PI / 2);
    const y = half + Math.sin(phi) * r;
    const rad = Math.cos(phi) * r;
    rings.push({ y, rad, ny: Math.sin(phi), nr: Math.cos(phi) });
  }
  const lower = [];
  for (let i = 0; i <= caps; i++) {
    const phi = (i / caps) * (Math.PI / 2);
    const y = -half - Math.sin(phi) * r;
    const rad = Math.cos(phi) * r;
    lower.push({ y, rad, ny: -Math.sin(phi), nr: Math.cos(phi) });
  }
  const section = (list, flip) => {
    for (let s = 0; s < list.length - 1; s++) {
      const A = list[s], B = list[s + 1];
      for (let i = 0; i < segs; i++) {
        const t0 = (i / segs) * TAU, t1 = ((i + 1) / segs) * TAU;
        const c0 = Math.cos(t0), s0 = Math.sin(t0), c1 = Math.cos(t1), s1 = Math.sin(t1);
        const v0 = b.vert(c0 * A.rad, A.y, s0 * A.rad, c0 * A.nr, A.ny, s0 * A.nr, i / segs, 0);
        const v1 = b.vert(c1 * A.rad, A.y, s1 * A.rad, c1 * A.nr, A.ny, s1 * A.nr, (i + 1) / segs, 0);
        const v2 = b.vert(c1 * B.rad, B.y, s1 * B.rad, c1 * B.nr, B.ny, s1 * B.nr, (i + 1) / segs, 1);
        const v3 = b.vert(c0 * B.rad, B.y, s0 * B.rad, c0 * B.nr, B.ny, s0 * B.nr, i / segs, 1);
        if (flip) b.quad(v3, v2, v1, v0); else b.quad(v0, v1, v2, v3);
      }
    }
  };
  // shaft
  const shaft = [{ y: half, rad: r, ny: 0, nr: 1 }, { y: -half, rad: r, ny: 0, nr: 1 }];
  section(shaft, false);
  section(rings, false);
  section(lower, true);
  return b.geo();
}

export function torus(R, r, segs = 32, rings = 16) {
  const b = new Builder();
  const grid = [];
  for (let i = 0; i <= segs; i++) {
    const u = (i / segs) * TAU;
    const cu = Math.cos(u), su = Math.sin(u);
    const row = [];
    for (let j = 0; j <= rings; j++) {
      const v = (j / rings) * TAU;
      const cv = Math.cos(v), sv = Math.sin(v);
      const nx = cu * cv, ny = sv, nz = su * cv;
      row.push(b.vert((R + r * cv) * cu, r * sv, (R + r * cv) * su, nx, ny, nz, i / segs, j / rings));
    }
    grid.push(row);
  }
  for (let i = 0; i < segs; i++) {
    for (let j = 0; j < rings; j++) {
      const a = grid[i][j], c = grid[i + 1][j], e = grid[i + 1][j + 1], f = grid[i][j + 1];
      b.quad(a, c, e, f);
    }
  }
  return b.geo();
}

/* ── the arch wall ────────────────────────────────────────────────────────────
   A panel, `width` × `height` × `thick`, pierced by a round-headed opening of
   half-width `a`, springing at `spring`. Built analytically so the curve is
   smooth: two side panels, a fan of trapezoids above the arch, and the reveal
   (soffit) surfaces between the two faces. */
export function archWall({ width, height, thick, a, spring, segs = 26 }) {
  const b = new Builder();
  const W = width / 2, T = thick / 2;
  const face = (sign) => {
    const z = sign * T;
    const nz = sign;
    // left / right side panels
    const l0 = b.vert(-W, 0, z, 0, 0, nz), l1 = b.vert(-a, 0, z, 0, 0, nz);
    const l2 = b.vert(-a, height, z, 0, 0, nz), l3 = b.vert(-W, height, z, 0, 0, nz);
    if (sign > 0) b.quad(l0, l1, l2, l3); else b.quad(l3, l2, l1, l0);
    const r0 = b.vert(a, 0, z, 0, 0, nz), r1 = b.vert(W, 0, z, 0, 0, nz);
    const r2 = b.vert(W, height, z, 0, 0, nz), r3 = b.vert(a, height, z, 0, 0, nz);
    if (sign > 0) b.quad(r0, r1, r2, r3); else b.quad(r3, r2, r1, r0);
    // the fan above the arch
    for (let i = 0; i < segs; i++) {
      const t0 = (i / segs) * Math.PI, t1 = ((i + 1) / segs) * Math.PI;
      const x0 = Math.cos(t0) * a, y0 = spring + Math.sin(t0) * a;
      const x1 = Math.cos(t1) * a, y1 = spring + Math.sin(t1) * a;
      const p0 = b.vert(x0, y0, z, 0, 0, nz);
      const p1 = b.vert(x1, y1, z, 0, 0, nz);
      const p2 = b.vert(x1, height, z, 0, 0, nz);
      const p3 = b.vert(x0, height, z, 0, 0, nz);
      if (sign > 0) b.quad(p0, p1, p2, p3); else b.quad(p3, p2, p1, p0);
    }
  };
  face(1);
  face(-1);
  // soffit of the arch, normals pointing to the opening's centre
  for (let i = 0; i < segs; i++) {
    const t0 = (i / segs) * Math.PI, t1 = ((i + 1) / segs) * Math.PI;
    const x0 = Math.cos(t0) * a, y0 = spring + Math.sin(t0) * a;
    const x1 = Math.cos(t1) * a, y1 = spring + Math.sin(t1) * a;
    const n0x = -Math.cos(t0), n0y = -Math.sin(t0);
    const n1x = -Math.cos(t1), n1y = -Math.sin(t1);
    const v0 = b.vert(x0, y0, T, n0x, n0y, 0);
    const v1 = b.vert(x1, y1, T, n1x, n1y, 0);
    const v2 = b.vert(x1, y1, -T, n1x, n1y, 0);
    const v3 = b.vert(x0, y0, -T, n0x, n0y, 0);
    b.quad(v0, v1, v2, v3);
  }
  // the two vertical reveals beside the opening
  for (const sign of [-1, 1]) {
    const x = sign * a;
    const v0 = b.vert(x, 0, T, -sign, 0, 0);
    const v1 = b.vert(x, spring, T, -sign, 0, 0);
    const v2 = b.vert(x, spring, -T, -sign, 0, 0);
    const v3 = b.vert(x, 0, -T, -sign, 0, 0);
    b.quad(v0, v1, v2, v3);
  }
  return b.geo();
}

/* open cone: apex at the origin, rim at y = -h, uv.y runs apex → rim */
export function cone(r, h, segs = 32) {
  const b = new Builder();
  for (let i = 0; i < segs; i++) {
    const t0 = (i / segs) * TAU, t1 = ((i + 1) / segs) * TAU;
    const x0 = Math.cos(t0) * r, z0 = Math.sin(t0) * r;
    const x1 = Math.cos(t1) * r, z1 = Math.sin(t1) * r;
    const nx0 = Math.cos(t0), nz0 = Math.sin(t0);
    const nx1 = Math.cos(t1), nz1 = Math.sin(t1);
    const a = b.vert(0, 0, 0, nx0, 0, nz0, 0, 0);
    const c = b.vert(x1, -h, z1, nx1, 0.2, nz1, 1, 1);
    const d = b.vert(x0, -h, z0, nx0, 0.2, nz0, 0, 1);
    b.tri(a, c, d);
    const e = b.vert(0, 0, 0, nx0, 0, nz0, 0, 0);
    const f = b.vert(x0, -h, z0, nx0, 0.2, nz0, 0, 1);
    const g = b.vert(x1, -h, z1, nx1, 0.2, nz1, 1, 1);
    b.tri(e, f, g);
  }
  return b.geo();
}

/* ── merging ──────────────────────────────────────────────────────────────── */
export function merge(parts) {
  let vCount = 0, iCount = 0;
  for (const { geo } of parts) { vCount += geo.position.length / 3; iCount += geo.index.length; }
  const position = new Float32Array(vCount * 3);
  const normal = new Float32Array(vCount * 3);
  const uv = new Float32Array(vCount * 2);
  const index = new Uint32Array(iCount);
  let vo = 0, io = 0;
  for (const { geo, matrix } of parts) {
    const n = geo.position.length / 3;
    for (let i = 0; i < n; i++) {
      let x = geo.position[i * 3], y = geo.position[i * 3 + 1], z = geo.position[i * 3 + 2];
      if (matrix) {
        const tx = matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12];
        const ty = matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13];
        const tz = matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14];
        x = tx; y = ty; z = tz;
      }
      position[(vo + i) * 3] = x;
      position[(vo + i) * 3 + 1] = y;
      position[(vo + i) * 3 + 2] = z;
      let nx = geo.normal[i * 3], ny = geo.normal[i * 3 + 1], nz = geo.normal[i * 3 + 2];
      if (matrix) {
        const ax = matrix[0] * nx + matrix[4] * ny + matrix[8] * nz;
        const ay = matrix[1] * nx + matrix[5] * ny + matrix[9] * nz;
        const az = matrix[2] * nx + matrix[6] * ny + matrix[10] * nz;
        const l = Math.hypot(ax, ay, az) || 1;
        nx = ax / l; ny = ay / l; nz = az / l;
      }
      normal[(vo + i) * 3] = nx;
      normal[(vo + i) * 3 + 1] = ny;
      normal[(vo + i) * 3 + 2] = nz;
      uv[(vo + i) * 2] = geo.uv[i * 2];
      uv[(vo + i) * 2 + 1] = geo.uv[i * 2 + 1];
    }
    for (let i = 0; i < geo.index.length; i++) index[io + i] = geo.index[i] + vo;
    vo += n; io += geo.index.length;
  }
  return { position, normal, uv, index };
}
