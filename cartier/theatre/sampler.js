/* ==========================================================================
   theatre/sampler.js — read Cartier's Theatre.js timeline
   --------------------------------------------------------------------------
   `mainScene.theatre-state.json` is the project state lifted out of
   `cartier.app.js` by `tools/extract-theatre.mjs`. This module turns it back
   into numbers: give it a time in seconds and it returns the same values the
   original site would have had at that moment — which room is on, the camera's
   field of view, the fade of the crowd, the darkening of every room behind the
   current one, the glow alphas and the light-decal density.

   No dependencies, no DOM, no three.js: it is pure data in, data out, so it can
   be unit-tested in node and inlined anywhere.

   Track semantics (Theatre.js):
     • `type: "hold"`     — step; the value stays until the next key.
     • `type: "bezier"`   — eased between the two neighbouring keys with
                            `handles = [x1, y1, x2, y2]` (a cubic-bezier).
   ========================================================================== */

const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

/* ── cubic bezier easing, solved for x ───────────────────────────────────── */
function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  const sx = (t) => ((ax * t + bx) * t + cx) * t;
  const sy = (t) => ((ay * t + by) * t + cy) * t;
  const dx = (t) => (3 * ax * t + 2 * bx) * t + cx;

  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = sx(t) - x;
      if (Math.abs(err) < 1e-6) return sy(t);
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
      if (t < 0) t = 0;
      else if (t > 1) t = 1;
    }
    let lo = 0;
    let hi = 1;
    t = x;
    for (let i = 0; i < 24; i++) {
      const v = sx(t);
      if (Math.abs(v - x) < 1e-6) break;
      if (v < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return sy(t);
  };
}

const EASE = bezier(0.5, 1, 0.5, 0);   // Theatre's default handles

/* ── value of one track at time t ───────────────────────────────────────── */
function trackValue(track, t) {
  const keys = track.keyframes;
  if (!keys || !keys.length) return undefined;
  const n = keys.length;
  if (t <= keys[0].position) return keys[0].value;
  if (t >= keys[n - 1].position) return keys[n - 1].value;

  let i = 0;
  while (i < n - 2 && keys[i + 1].position <= t) i++;
  const a = keys[i];
  const b = keys[i + 1];

  if (a.type === 'hold' || b.type === 'hold') {
    // a hold key keeps its value up to the next key
    return a.type === 'hold' ? a.value : b.value;
  }
  if (typeof a.value === 'boolean' || typeof b.value === 'boolean') return a.value;
  if (!isNum(a.value) || !isNum(b.value)) return a.value;

  const span = b.position - a.position;
  if (span <= 0) return b.value;
  const raw = (t - a.position) / span;
  const h = a.handles || [0.5, 1, 0.5, 0];
  const eased = (h[0] === 0.5 && h[1] === 1 && h[2] === 0.5 && h[3] === 0)
    ? EASE(raw)
    : bezier(h[0], h[1], h[2], h[3])(raw);
  return a.value + (b.value - a.value) * eased;
}

/* ── build an index once, sample many times ─────────────────────────────── */
export function createTimeline(state) {
  const sheetName = Object.keys(state.sheetsById)[0];
  const sheet = state.sheetsById[sheetName];
  const seq = sheet.sequence;
  const statics = (sheet.staticOverrides && sheet.staticOverrides.byObject) || {};

  const tracks = new Map();      // objectKey → Map(propKey → track)
  for (const [objectKey, obj] of Object.entries(seq.tracksByObject || {})) {
    const byProp = new Map();
    for (const track of Object.values(obj.trackData || {})) {
      const name = track.__debugName || '';
      const at = name.indexOf(':');
      let prop = at >= 0 ? name.slice(at + 1) : name;
      try { prop = JSON.parse(prop.replace(/'/g, '"')); } catch { /* keep raw */ }
      const key = Array.isArray(prop) ? prop.map(String) : [String(prop)];
      byProp.set(key.join('\u0000'), track);
    }
    tracks.set(objectKey, byProp);
  }

  return { length: seq.length, subUnitsPerUnit: seq.subUnitsPerUnit, tracks, statics, state };
}

function get(tl, objectKey, props) {
  const byProp = tl.tracks.get(objectKey);
  const track = byProp && byProp.get(props.join('\u0000'));
  return track;
}

/* ── the sampler ────────────────────────────────────────────────────────── */
export function sampleAt(tl, t) {
  const time = Math.max(0, Math.min(tl.length, t));
  const v = (objectKey, ...props) => {
    const track = get(tl, objectKey, props);
    return track ? trackValue(track, time) : undefined;
  };
  const stat = (objectKey, prop) => {
    const o = tl.statics[objectKey];
    return o ? o[prop] : undefined;
  };
  const statNested = (objectKey, prop, sub) => {
    const o = tl.statics[objectKey];
    return o && o[prop] ? o[prop][sub] : undefined;
  };

  /* every room-part the sheet knows about, with its two curves */
  const names = new Set();
  const ov = tl.tracks.get('objectsVisibility');
  if (ov) for (const key of ov.keys()) names.add(key.split('\u0000')[0]);

  const parts = {};
  for (const name of names) {
    const darkTrack = get(tl, 'objectsVisibility', [name, 'dark']);
    const opTrack = get(tl, 'objectsVisibility', [name, 'opacity']);
    const s = tl.statics.objectsVisibility && tl.statics.objectsVisibility[name];
    const dark = darkTrack ? trackValue(darkTrack, time) : (isNum(s) ? 0 : 0);
    const opacity = opTrack ? trackValue(opTrack, time) : (isNum(s) ? s : 1);
    parts[name] = { dark: dark ?? 0, opacity: opacity ?? 1 };
  }

  /* the ten glow blobs: static transform + authored alpha */
  const glows = [];
  for (let i = 0; i < 40; i++) {
    const name = `glowSphere${i}`;
    if (!tl.statics[name]) continue;
    const st = tl.statics[name];
    glows.push({
      name,
      alpha: v(name, 'alpha') ?? st.alpha ?? 0,
      position: st.position || {},
      scale: st.scale || {},
      color: st.color || { r: 1, g: 1, b: 1 },
      renderOrder: st.renderOrder ?? 0,
    });
  }

  const decalStatic = tl.statics.lightDecal0 || {};
  const decal = {
    density: v('lightDecal0', 'density') ?? decalStatic.density ?? 0,
    position: decalStatic.position || {},
    scale: decalStatic.scale || {},
    rotation: decalStatic.rotation || {},
    tintColor: decalStatic.tintColor || { r: 1, g: 1, b: 1 },
    falloff: decalStatic.falloff ?? 1,
  };

  return {
    t: time,
    length: tl.length,
    scene: v('currentScene', 'current') ?? 0,
    sceneSmooth: v('currentScene', 'currentSmooth') ?? 0,
    camera: {
      fov: v('camera', 'fov') ?? 50,
      fovOffset: v('camera', 'fovOffset') ?? 0,
      visible: v('camera', 'visible') ?? true,
    },
    blur: v('motionBlur', 'blur') ?? 0,
    forcedDark: v('loop', 'forcedDark') ?? 0,
    characters: v('characters', 'opacity') ?? 0,
    ui: {
      sceneTitle: v('ui', 'sceneTitle') ?? false,
      exploreBttn: v('ui', 'exploreBttn') ?? false,
      podcastCta: v('ui', 'podcastCta') ?? false,
    },
    parts,
    glows,
    decal,
  };
}

/* ── the chapter map the sheet itself implies ───────────────────────────────
   `currentScene.current` steps at the scene changes, and `ui.sceneTitle` opens
   and closes the title card around each one. Reading those two curves gives the
   authored chapter windows without hard-coding anything.                      */
export function sceneWindows(tl) {
  const track = get(tl, 'currentScene', ['current']);
  if (!track) return [];
  const keys = [...track.keyframes].sort((a, b) => a.position - b.position);

  const starts = [];
  for (const k of keys) {
    const value = Math.round(Number(k.value));
    const last = starts[starts.length - 1];
    if (!last || last.index !== value) starts.push({ index: value, start: k.position });
  }
  starts.forEach((s, i) => {
    s.end = i + 1 < starts.length ? starts[i + 1].start : tl.length;
  });

  /* title windows, to know when each card is up */
  const titleTrack = get(tl, 'ui', ['sceneTitle']);
  const titles = [];
  if (titleTrack) {
    const tk = [...titleTrack.keyframes].sort((a, b) => a.position - b.position);
    let opened = null;
    for (const k of tk) {
      if (k.value && opened === null) opened = k.position;
      else if (!k.value && opened !== null) { titles.push([opened, k.position]); opened = null; }
      else if (k.value && opened !== null) { titles.push([opened, k.position]); opened = k.position; }
    }
    if (opened !== null) titles.push([opened, tl.length]);
  }
  /* a card opens a little before its room changes, so attribute the window to
     the scene whose start falls inside it (the opening card to scene 0) */
  starts.forEach((s) => {
    s.title = titles.find(([a, b]) => s.start >= a && s.start <= b) || null;
  });
  return starts;
}

/* ── what a chapter (a window of the film) actually looks like ──────────────
   A still is not one instant: the crowd fades in and out inside the window and
   the glows pulse. So a chapter is summarised by the extremes it passes
   through — the widest crowd, the strongest glow — and by the camera's field of
   view once it has settled.                                                */
export function sampleWindow(tl, from, to, steps = 32) {
  const a = Math.max(0, from);
  const b = Math.min(tl.length, to);
  const settle = sampleAt(tl, a + Math.min(1.2, (b - a) * 0.4));

  let characters = 0;
  let forcedDark = 0;
  const glows = new Map();
  const darkMax = new Map();
  const opMax = new Map();

  for (let i = 0; i <= steps; i++) {
    const s = sampleAt(tl, a + ((b - a) * i) / steps);
    characters = Math.max(characters, s.characters);
    forcedDark = Math.max(forcedDark, s.forcedDark);
    for (const g of s.glows) glows.set(g.name, Math.max(glows.get(g.name) ?? 0, g.alpha));
    for (const [name, p] of Object.entries(s.parts)) {
      darkMax.set(name, Math.max(darkMax.get(name) ?? 0, p.dark));
      opMax.set(name, Math.max(opMax.get(name) ?? 0, p.opacity));
    }
  }

  const lit = [];
  for (const [name, op] of opMax) {
    if (op > 0.5 && (darkMax.get(name) ?? 0) < 0.5) lit.push(name);
  }

  return {
    from: a,
    to: b,
    fov: settle.camera.fov,
    fovOffset: settle.camera.fovOffset,
    characters,
    forcedDark,
    glows: [...glows].map(([name, alpha]) => ({ name, alpha })),
    lit,
  };
}
