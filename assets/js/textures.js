/* Texture plumbing: loading, mipmaps, and two things that are easier done on a
   canvas than in a shader — turning a backlit photograph into a cut-out with a
   real alpha channel, and drawing the club's wall works. */

export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(url));
    img.src = url;
  });
}

export function texture(gl, source, { wrap = 'repeat', flipY = true, aniso = 8 } = {}) {
  const t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap === 'repeat' ? gl.REPEAT : gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap === 'repeat' ? gl.REPEAT : gl.CLAMP_TO_EDGE);
  gl.generateMipmap(gl.TEXTURE_2D);
  const ext = gl.getExtension('EXT_texture_filter_anisotropic');
  if (ext) {
    const max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(aniso, max));
  }
  return t;
}

/* A backlit silhouette photograph is a black figure on a black background.
   Thresholding would erase the body, so instead the background is flood-filled
   inwards from the border: whatever the fill cannot reach is the person. */
/* Cut a backlit photograph out of its black ground. Returns the cropped canvas;
   the alpha is built from a flood fill of the black, sealed with a small
   closing so the shadowed middle of a coat stays part of the figure. */
export function figureMask(img, maxWidth = 680) {
  const scale = Math.min(1, maxWidth / img.width);
  const w = Math.max(2, Math.round(img.width * scale));
  const h = Math.max(2, Math.round(img.height * scale));
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, w, h);
  const px = ctx.getImageData(0, 0, w, h);
  const d = px.data;

  const DARK = 4;
  const lum = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) lum[i] = Math.max(d[i * 4], d[i * 4 + 1], d[i * 4 + 2]);

  // background: everything the black flood can reach from the border
  const outside = new Uint8Array(w * h);
  const stack = [];
  const push = (i) => { if (!outside[i] && lum[i] < DARK) { outside[i] = 1; stack.push(i); } };
  for (let x = 0; x < w; x++) { push(x); push((h - 1) * w + x); }
  for (let y = 0; y < h; y++) { push(y * w); push(y * w + w - 1); }
  while (stack.length) {
    const i = stack.pop();
    const x = i % w, y = (i / w) | 0;
    if (x > 0) push(i - 1);
    if (x < w - 1) push(i + 1);
    if (y > 0) push(i - w);
    if (y < h - 1) push(i + w);
  }

  // keep the largest blob that does not touch the edge of the frame
  const label = new Int32Array(w * h).fill(-1);
  let best = -1, bestArea = 0, id = 0;
  for (let i = 0; i < w * h; i++) {
    if (outside[i] || label[i] >= 0) continue;
    const q = [i];
    label[i] = id;
    let area = 0, touch = false;
    while (q.length) {
      const j = q.pop();
      area++;
      const x = j % w, y = (j / w) | 0;
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) touch = true;
      if (x > 0 && !outside[j - 1] && label[j - 1] < 0) { label[j - 1] = id; q.push(j - 1); }
      if (x < w - 1 && !outside[j + 1] && label[j + 1] < 0) { label[j + 1] = id; q.push(j + 1); }
      if (y > 0 && !outside[j - w] && label[j - w] < 0) { label[j - w] = id; q.push(j - w); }
      if (y < h - 1 && !outside[j + w] && label[j + w] < 0) { label[j + w] = id; q.push(j + w); }
    }
    if (!touch && area > bestArea) { bestArea = area; best = id; }
    id++;
  }

  let solid = new Uint8Array(w * h);
  if (best >= 0 && bestArea > w * h * 0.008) {
    for (let i = 0; i < w * h; i++) solid[i] = label[i] === best ? 1 : 0;
  } else {
    for (let i = 0; i < w * h; i++) solid[i] = outside[i] ? 0 : 1;
  }

  /* The shadowed middle of a coat is the same black as the background, so the
     flood eats it. Close the silhouette row by row over the head and torso,
     where a gap can only be the body; leave the lower rows alone so boots and
     stool legs keep their air. */
  let ty0 = h, ty1 = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (solid[y * w + x]) { if (y < ty0) ty0 = y; if (y > ty1) ty1 = y; break; }
    }
  }
  const torsoEnd = ty0 + Math.round((ty1 - ty0) * 0.66);
  for (let y = ty0; y <= torsoEnd && y < h; y++) {
    let lo = -1, hi = -1, cnt = 0;
    for (let x = 0; x < w; x++) {
      if (solid[y * w + x]) { if (lo < 0) lo = x; hi = x; cnt++; }
    }
    if (lo < 0 || cnt < 3) continue;
    for (let x = lo; x <= hi; x++) solid[y * w + x] = 1;
  }

  let x0 = w, x1 = 0, y0 = h, y1 = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      d[(y * w + x) * 4 + 3] = solid[y * w + x] ? 255 : 0;
      if (!solid[y * w + x]) continue;
      if (x < x0) x0 = x; if (x > x1) x1 = x;
      if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
  }
  if (x1 <= x0 || y1 <= y0) { x0 = 0; y0 = 0; x1 = w - 1; y1 = h - 1; }

  const out = document.createElement('canvas');
  out.width = x1 - x0 + 1;
  out.height = y1 - y0 + 1;
  out.getContext('2d').putImageData(px, -x0, -y0);
  out.aspect = out.width / out.height;
  return out;
}

export function cutout(gl, img, maxWidth = 680) {
  const canvas = figureMask(img, maxWidth);
  return { tex: texture(gl, canvas, { wrap: 'clamp', flipY: true }), aspect: canvas.aspect, width: canvas.width, height: canvas.height };
}

/* ── the club's wall works, drawn rather than photographed ────────────────── */

const SERIF = '"Bodoni Moda", Didot, Georgia, serif';
const SANS = '"Inter", system-ui, sans-serif';

function grain(g, W, H, amount = 12) {
  const img = g.getImageData(0, 0, W, H);
  for (let p = 0; p < img.data.length; p += 4) {
    const n = (Math.random() - 0.5) * amount;
    img.data[p] += n; img.data[p + 1] += n; img.data[p + 2] += n;
  }
  g.putImageData(img, 0, 0);
}

/* Every work on every wall is drawn here, at print resolution, in the club's
   own voice: type, a constellation, a dune field, a gold field, a seating plan.
   Nothing is a stock photograph, and nothing is unreadable at a glance. */

function frame(g, W, H, inset = 54) {
  g.strokeStyle = 'rgba(217,171,99,0.55)';
  g.lineWidth = 2;
  g.strokeRect(inset, inset, W - inset * 2, H - inset * 2);
}

function typePoster(i) {
  const specs = [
    { band: 'MINDFUL TATTVA', head: 'The Room\nWe Keep', foot: 'ROOM I · A PSYCHOLOGY CLUB', ink: '#efe6d6', bg: '#141110' },
    { band: 'NO AGENDA', head: 'Small\nCircles', foot: 'ROOM II · SIX CHAIRS', ink: '#e8dcc6', bg: '#181310' },
    { band: 'A PRACTICE', head: 'Return\nTo Now', foot: 'ROOM III · ATTENTION', ink: '#efe6d6', bg: '#12100e' },
    { band: 'TEN FACES', head: 'People\nWho Listen', foot: 'ROOM IV · THE WALL', ink: '#e6d9c1', bg: '#171211' },
    { band: 'GOLD HOUR', head: 'Nine in\nthe Evening', foot: 'ROOM V · STILL HERE', ink: '#f2e6cc', bg: '#1c1309' },
    { band: 'MARGINS', head: 'Texts We\nReturn To', foot: 'ROOM VI · BRING A PENCIL', ink: '#efe6d6', bg: '#141111' },
  ];
  const s = specs[i % specs.length];
  const W = 900, H = 1240;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  g.fillStyle = s.bg;
  g.fillRect(0, 0, W, H);
  grain(g, W, H, 16);
  frame(g, W, H);

  g.fillStyle = '#d9ab63';
  g.font = `400 22px ${SANS}`;
  g.letterSpacing = '7px';
  g.textBaseline = 'alphabetic';
  g.fillText(s.band, 90, 160);

  g.strokeStyle = 'rgba(217,171,99,0.32)';
  g.lineWidth = 1;
  g.beginPath(); g.moveTo(90, 196); g.lineTo(W - 90, 196); g.stroke();

  g.fillStyle = s.ink;
  g.font = `300 120px ${SERIF}`;
  g.letterSpacing = '-2px';
  s.head.split('\n').forEach((line, k) => g.fillText(line, 84, 400 + k * 132));

  g.fillStyle = 'rgba(239,230,214,0.6)';
  g.font = `400 20px ${SANS}`;
  g.letterSpacing = '5px';
  g.fillText(s.foot, 90, H - 120);

  const rg = g.createRadialGradient(W - 210, 760, 6, W - 210, 760, 130);
  rg.addColorStop(0, 'rgba(244,206,140,0.95)');
  rg.addColorStop(0.5, 'rgba(198,148,78,0.30)');
  rg.addColorStop(1, 'rgba(160,110,50,0)');
  g.fillStyle = rg;
  g.beginPath(); g.arc(W - 210, 760, 130, 0, Math.PI * 2); g.fill();
  return c;
}

function starChart(seed) {
  const W = 1000, H = 1300;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  const bg = g.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0a0d14');
  bg.addColorStop(0.55, '#101620');
  bg.addColorStop(1, '#1b1a16');
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);
  grain(g, W, H, 10);

  let s = seed * 9301 + 49297;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };

  for (let i = 0; i < 900; i++) {
    const x = rnd() * W, y = rnd() * H * 0.82;
    const r = rnd() * 2.1 + 0.3;
    g.fillStyle = `rgba(255,246,230,${0.25 + rnd() * 0.7})`;
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
  // constellation
  g.strokeStyle = 'rgba(217,171,99,0.6)';
  g.lineWidth = 1.6;
  const pts = [];
  for (let i = 0; i < 9; i++) pts.push([120 + rnd() * 760, 150 + rnd() * 700]);
  g.beginPath();
  pts.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])));
  g.stroke();
  pts.forEach((p) => {
    g.fillStyle = '#f6e6c4';
    g.beginPath(); g.arc(p[0], p[1], 4.5, 0, Math.PI * 2); g.fill();
    g.strokeStyle = 'rgba(246,230,196,0.25)';
    g.beginPath(); g.arc(p[0], p[1], 16, 0, Math.PI * 2); g.stroke();
  });
  // horizon
  g.fillStyle = 'rgba(20,17,14,0.96)';
  g.beginPath();
  g.moveTo(0, H);
  g.lineTo(0, H * 0.84);
  for (let x = 0; x <= W; x += 40) {
    g.lineTo(x, H * 0.84 + Math.sin(x * 0.007 + seed) * 34 + Math.sin(x * 0.021) * 12);
  }
  g.lineTo(W, H);
  g.closePath();
  g.fill();
  g.strokeStyle = 'rgba(217,171,99,0.35)';
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(0, H * 0.84);
  for (let x = 0; x <= W; x += 40) g.lineTo(x, H * 0.84 + Math.sin(x * 0.007 + seed) * 34 + Math.sin(x * 0.021) * 12);
  g.stroke();

  g.fillStyle = 'rgba(239,230,214,0.72)';
  g.font = `400 26px ${SANS}`;
  g.letterSpacing = '8px';
  g.fillText('CONSTELLATION OF THE ROOM', 96, 130);
  g.fillStyle = 'rgba(217,171,99,0.8)';
  g.font = `300 44px ${SERIF}`;
  g.letterSpacing = '0px';
  g.fillText('fig. ' + String(seed + 1).padStart(2, '0'), 96, H - 90);
  return c;
}

function duneField(seed) {
  const W = 1000, H = 1300;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  const bg = g.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#120f0d');
  bg.addColorStop(0.42, '#2a2118');
  bg.addColorStop(1, '#0d0b09');
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);

  for (let layer = 0; layer < 26; layer++) {
    const t = layer / 25;
    const y = H * (0.28 + t * 0.72);
    const amp = 60 * (1 - t) + 10;
    g.beginPath();
    g.moveTo(0, H);
    g.lineTo(0, y);
    for (let x = 0; x <= W; x += 20) {
      const yy = y + Math.sin(x * 0.0035 + layer * 0.55 + seed) * amp * 0.5 + Math.sin(x * 0.011 + layer) * amp * 0.18;
      g.lineTo(x, yy);
    }
    g.lineTo(W, H);
    g.closePath();
    const a = 0.05 + t * 0.16;
    g.fillStyle = `rgba(${Math.round(210 + 30 * t)}, ${Math.round(160 + 40 * t)}, ${Math.round(96 + 40 * t)}, ${a})`;
    g.fill();
    g.strokeStyle = `rgba(240,206,150,${a * 1.5})`;
    g.lineWidth = 1.2;
    g.stroke();
  }
  grain(g, W, H, 10);
  g.fillStyle = 'rgba(239,230,214,0.75)';
  g.font = `400 26px ${SANS}`;
  g.letterSpacing = '8px';
  g.fillText('SAND, AFTER DARK', 96, 128);
  return c;
}

function goldField(seed) {
  const W = 1000, H = 1300;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  g.fillStyle = '#0e0b08';
  g.fillRect(0, 0, W, H);
  for (let i = 0; i < 40; i++) {
    const r = 40 + i * 22;
    const rg = g.createRadialGradient(W * 0.52, H * 0.46, 0, W * 0.52, H * 0.46, r);
    rg.addColorStop(0, `rgba(255,214,150,${0.055})`);
    rg.addColorStop(1, 'rgba(255,190,110,0)');
    g.fillStyle = rg;
    g.beginPath(); g.arc(W * 0.52, H * 0.46, r, 0, Math.PI * 2); g.fill();
  }
  grain(g, W, H, 14);
  // a single gold leaf: a rotated square with soft edges
  g.save();
  g.translate(W * 0.52, H * 0.46);
  g.rotate(0.42 + seed * 0.3);
  const lg = g.createLinearGradient(-190, -260, 190, 260);
  lg.addColorStop(0, '#f7dda4');
  lg.addColorStop(0.45, '#d9a95e');
  lg.addColorStop(0.75, '#a87a3a');
  lg.addColorStop(1, '#f2d29a');
  g.fillStyle = lg;
  g.fillRect(-150, -230, 300, 460);
  g.globalAlpha = 0.35;
  g.fillStyle = '#fff3d2';
  g.fillRect(-150, -230, 300, 120);
  g.restore();
  g.fillStyle = 'rgba(239,230,214,0.7)';
  g.font = `400 26px ${SANS}`;
  g.letterSpacing = '8px';
  g.fillText('LEAF OF THE GOLD HOUR', 96, H - 110);
  return c;
}

function planChart(seed) {
  const W = 1000, H = 1300;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  g.fillStyle = '#131110';
  g.fillRect(0, 0, W, H);
  grain(g, W, H, 12);

  g.strokeStyle = 'rgba(217,171,99,0.7)';
  g.lineWidth = 2.4;
  g.beginPath(); g.arc(W / 2, H * 0.48, 250, 0, Math.PI * 2); g.stroke();
  g.setLineDash([8, 10]);
  g.strokeStyle = 'rgba(239,230,214,0.22)';
  g.beginPath(); g.arc(W / 2, H * 0.48, 320, 0, Math.PI * 2); g.stroke();
  g.setLineDash([]);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.4;
    const x = W / 2 + Math.cos(a) * 250;
    const y = H * 0.48 + Math.sin(a) * 250;
    g.fillStyle = 'rgba(239,230,214,0.9)';
    g.beginPath(); g.arc(x, y, 16, 0, Math.PI * 2); g.fill();
    g.strokeStyle = 'rgba(217,171,99,0.5)';
    g.beginPath(); g.arc(x, y, 30, 0, Math.PI * 2); g.stroke();
  }
  g.fillStyle = 'rgba(217,171,99,0.9)';
  g.beginPath(); g.arc(W / 2, H * 0.48, 12, 0, Math.PI * 2); g.fill();

  g.fillStyle = 'rgba(239,230,214,0.75)';
  g.font = `400 26px ${SANS}`;
  g.letterSpacing = '8px';
  g.fillText('A CIRCLE, SIX CHAIRS', 96, 128);
  g.fillStyle = 'rgba(239,230,214,0.45)';
  g.font = `300 30px ${SERIF}`;
  g.letterSpacing = '0px';
  g.fillText('no head of table', 96, H - 110);
  return c;
}

/* Wall works are crops of the desert photograph, graded like prints: warm sepia,
   cool silver, a burnished gold. Nothing invented, nothing drawn from scratch. */
function photoArt(img, o) {
  const W = o.w || 1100;
  const H = o.h || 1400;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  // cover the canvas with the requested crop, honouring the print's aspect
  const [fx, fy, fw, fh] = o.crop || [0, 0, 1, 1];
  const sx = fx * iw, sy = fy * ih, sw = fw * iw, sh = fh * ih;
  const scale = Math.max(W / sw, H / sh);
  const dw = sw * scale, dh = sh * scale;
  g.drawImage(img, sx, sy, sw, sh, (W - dw) / 2 + (o.dx || 0), (H - dh) / 2 + (o.dy || 0), dw, dh);

  // grade
  g.globalCompositeOperation = 'overlay';
  g.fillStyle = o.warm || 'rgba(190,140,80,0.34)';
  g.fillRect(0, 0, W, H);
  g.globalCompositeOperation = 'multiply';
  const mul = g.createLinearGradient(0, 0, 0, H);
  mul.addColorStop(0, o.top || 'rgba(38,42,60,0.55)');
  mul.addColorStop(0.55, 'rgba(70,52,34,0.18)');
  mul.addColorStop(1, o.bottom || 'rgba(28,20,12,0.62)');
  g.fillStyle = mul;
  g.fillRect(0, 0, W, H);
  g.globalCompositeOperation = 'source-over';

  // vignette and grain, like a print under glass
  const vg = g.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.22, W / 2, H / 2, Math.max(W, H) * 0.78);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(0,0,0,0.55)');
  g.fillStyle = vg;
  g.fillRect(0, 0, W, H);
  grain(g, W, H, 12);

  if (o.caption) {
    g.fillStyle = 'rgba(239,230,214,0.62)';
    g.font = `400 25px ${SANS}`;
    if (g.letterSpacing !== undefined) g.letterSpacing = '7px';
    g.fillText(o.caption, 68, H - 66);
  }
  if (o.rule) {
    g.strokeStyle = 'rgba(217,171,99,0.45)';
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(68, H - 100); g.lineTo(68 + 92, H - 100); g.stroke();
  }
  return c;
}

/* Each room gets its own crop and grade of the desert photograph, so no two
   windows are the same view. */
export function skyVariants(img) {
  const W = 1600, H = 1000;
  const specs = [
    { crop: [0.02, 0.06, 0.96, 0.88], grade: 'rgba(255,206,150,0.14)' },
    { crop: [0.30, 0.02, 0.68, 0.80], grade: 'rgba(150,178,235,0.16)' },
    { crop: [0.10, 0.24, 0.66, 0.66], grade: 'rgba(255,190,120,0.22)' },
    { crop: [0.44, 0.00, 0.56, 0.74], grade: 'rgba(120,150,220,0.20)' },
    { crop: [0.18, 0.10, 0.62, 0.72], grade: 'rgba(255,186,112,0.26)' },
    { crop: [0.00, 0.16, 0.72, 0.80], grade: 'rgba(205,168,255,0.14)' },
  ];
  return specs.map((sp) => {
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const g = c.getContext('2d');
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    const [fx, fy, fw, fh] = sp.crop;
    g.drawImage(img, fx * iw, fy * ih, fw * iw, fh * ih, 0, 0, W, H);
    g.globalCompositeOperation = 'soft-light';
    g.fillStyle = sp.grade;
    g.fillRect(0, 0, W, H);
    g.globalCompositeOperation = 'source-over';
    grain(g, W, H, 6);
    return c;
  });
}

const A = 1000 / 1300;
export const artCanvases = (img) => [
  typePoster(0),
  img ? photoArt(img, { crop: [0.16, 0.0, 0.42, 0.42], top: 'rgba(46,56,96,0.62)', bottom: 'rgba(18,20,34,0.72)', warm: 'rgba(120,140,190,0.22)', caption: 'FIELD NOTES, I', rule: 1 })
      : starChart(1),
  img ? photoArt(img, { crop: [0.02, 0.46, 0.72, 0.52], top: 'rgba(52,36,20,0.42)', bottom: 'rgba(20,14,9,0.7)', warm: 'rgba(206,150,84,0.34)', caption: 'SAND, AFTER DARK', rule: 1 })
      : duneField(2),
  img ? photoArt(img, { crop: [0.34, 0.24, 0.36, 0.34], top: 'rgba(60,38,14,0.34)', bottom: 'rgba(26,16,7,0.66)', warm: 'rgba(232,168,86,0.46)', caption: 'LEAF OF THE GOLD HOUR', rule: 1 })
      : goldField(3),
  img ? photoArt(img, { crop: [0.52, 0.02, 0.46, 0.46], top: 'rgba(40,50,88,0.6)', bottom: 'rgba(16,18,32,0.74)', warm: 'rgba(130,146,196,0.2)', caption: 'A CIRCLE, SIX CHAIRS', rule: 1 })
      : planChart(4),
  img ? photoArt(img, { crop: [0.06, 0.12, 0.5, 0.5], top: 'rgba(48,42,70,0.5)', bottom: 'rgba(24,18,14,0.7)', warm: 'rgba(200,150,96,0.3)', caption: 'THE HOUR BEFORE', rule: 1 })
      : starChart(5),
];

export function posterCanvas(i) {
  return typePoster(i);
}

/* the numeral plate that sits beside every door */
export function numeralCanvas(n) {
  const W = 520, H = 520;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  g.fillStyle = '#100d0b';
  g.fillRect(0, 0, W, H);
  g.strokeStyle = 'rgba(217,171,99,0.5)';
  g.lineWidth = 2;
  g.strokeRect(26, 26, W - 52, H - 52);
  g.fillStyle = '#efe6d6';
  g.font = '300 250px "Bodoni Moda", Georgia, serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(String(n).padStart(2, '0'), W / 2, H / 2 + 8);
  return c;
}
