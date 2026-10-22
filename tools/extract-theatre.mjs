#!/usr/bin/env node
/* ==========================================================================
   extract-theatre.mjs
   --------------------------------------------------------------------------
   Pulls the Theatre.js project state that Cartier compiled into its bundle
   (`cartier.app.js`) back out into plain JSON.

   In the bundle the state is a single object literal assigned to a minified
   identifier:

       const UTt={sheetsById:{timeline:{sequence:{length:24.51,...

   It is data only — no functions, calls or template strings — so it can be
   sliced out by brace matching and evaluated as an object expression.

   Usage:
     node tools/extract-theatre.mjs [bundle] [outDir]

     bundle  defaults to ./cartier.app.js
     outDir  defaults to ./cartier/theatre

   Writes:
     <outDir>/mainScene.theatre-state.json   the project state, formatted
     <outDir>/mainScene.theatre-state.min.json
     <outDir>/README.md                       what is in it, and what is not
   ========================================================================== */

import fs from 'node:fs';
import path from 'node:path';

const bundlePath = path.resolve(process.argv[2] || 'cartier.app.js');
const outDir = path.resolve(process.argv[3] || 'cartier/theatre');

const src = fs.readFileSync(bundlePath, 'utf8');

/* ── 1. locate the state -------------------------------------------------
   `{sheetsById:` appears more than once in the bundle: twice inside the
   Theatre runtime itself, and once as the real project. So every candidate is
   brace-matched and validated (data only, and actually carrying a sequence),
   and the largest valid one wins.                                          */
const UNSAFE = ['function', '=>', 'new ', '(', '`', 'void 0', 'undefined'];

function matchBrace(from) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let i = from; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

const candidates = [];
for (let at = src.indexOf('{sheetsById:'); at >= 0; at = src.indexOf('{sheetsById:', at + 1)) {
  const close = matchBrace(at);
  if (close < 0) continue;
  const literal = src.slice(at, close + 1);
  if (UNSAFE.some((token) => literal.includes(token))) continue;
  if (!/sequence:\s*\{\s*length\s*:/.test(literal)) continue;
  candidates.push({ start: at, end: close, literal });
}

if (!candidates.length) throw new Error('no project state found — is this the right bundle?');
candidates.sort((a, b) => b.literal.length - a.literal.length);
const { start, end, literal } = candidates[0];

/* ── 4. evaluate as a data expression and serialise ---------------------- */
const state = new Function(`"use strict"; return (${literal});`)();

/* ── 5. summarise -------------------------------------------------------- */
const summary = { sheets: {}, tracks: 0, keyframes: 0 };

for (const [sheetName, sheet] of Object.entries(state.sheetsById || {})) {
  const seq = sheet.sequence || {};
  const tracksByObject = seq.tracksByObject || {};
  const objects = {};
  let tracks = 0;
  let keyframes = 0;

  for (const [objectKey, obj] of Object.entries(tracksByObject)) {
    const trackData = obj.trackData || {};
    const props = {};
    for (const [trackId, track] of Object.entries(trackData)) {
      const kfs = track.keyframes || [];
      props[track.__debugName || trackId] = kfs.length;
      tracks++;
      keyframes += kfs.length;
    }
    objects[objectKey] = props;
  }

  summary.sheets[sheetName] = {
    length: seq.length,
    subUnitsPerUnit: seq.subUnitsPerUnit,
    objects: Object.keys(objects).length,
    tracks,
    keyframes,
    props: objects,
  };
  summary.tracks += tracks;
  summary.keyframes += keyframes;
}

/* ── 6. write ------------------------------------------------------------ */
fs.mkdirSync(outDir, { recursive: true });
const json = JSON.stringify(state, null, 2);
fs.writeFileSync(path.join(outDir, 'mainScene.theatre-state.json'), json + '\n');
fs.writeFileSync(path.join(outDir, 'mainScene.theatre-state.min.json'), JSON.stringify(state) + '\n');

const kb = (n) => (n / 1024).toFixed(1) + ' KB';

const lines = [];
lines.push('# The Theatre.js state from Cartier\'s bundle');
lines.push('');
lines.push('Extracted from `cartier.app.js` by `tools/extract-theatre.mjs`. Do not hand-edit:');
lines.push('re-run the tool to regenerate.');
lines.push('');
lines.push(`* source: \`${path.relative(process.cwd(), bundlePath)}\` (${kb(src.length)})`);
lines.push(`* literal: bytes ${start}–${end} (${kb(literal.length)})`);
lines.push(`* written: \`${path.basename(outDir)}/mainScene.theatre-state.json\` (${kb(json.length)})`);
lines.push('');
lines.push('## Shape');
lines.push('');
lines.push('```');
lines.push([
  '{ sheetsById: { <sheet>: {',
  '    sequence: {',
  '      length, subUnitsPerUnit,',
  '      tracksByObject: { <objectKey>: {',
  '        trackData:   { <trackId>: { __debugName, type, keyframes: [ { position, value, type, handles } ] } },',
  '        trackIdByPropPath: { "[\"prop\"]": <trackId> }',
  '      } },',
  '      trackIdByPropPath: { <objectKey>: { "[\"prop\"]": <trackId> } }',
  '    },',
  '    staticOverrides: { byObject: { <objectKey>: <values> } }',
  '  } } }',
].join('\n'));
lines.push('```');
lines.push('');
lines.push('Keyframe `position` is in seconds on the sheet\'s timeline; `subUnitsPerUnit` is the');
lines.push('editor\'s snapping grid (30 = one frame at 30 fps at a third of a second per unit).');
lines.push('`type: "hold"` means step (no interpolation), `bezier` follows `handles`.');
lines.push('');
lines.push('## What is in it');
lines.push('');
for (const [name, s] of Object.entries(summary.sheets)) {
  lines.push(`### sheet \`${name}\``);
  lines.push('');
  lines.push(`length **${s.length}s**, ${s.objects} objects, ${s.tracks} tracks, ${s.keyframes} keyframes`);
  lines.push('');
  lines.push('| object | animated properties (keyframe counts) |');
  lines.push('| ------ | ------------------------------------ |');
  for (const [obj, props] of Object.entries(s.props)) {
    const list = Object.entries(props).map(([p, n]) => `\`${p}\` ×${n}`).join(', ');
    lines.push(`| \`${obj}\` | ${list} |`);
  }
  lines.push('');
}
lines.push('## What is *not* in it');
lines.push('');
lines.push('This is the project state, not the rendering code. Cartier\'s bundle also contains');
lines.push('the Theatre.js runtime and the site\'s own three.js effects — the light-decal');
lines.push('("magic light") shader, bloom, and the film pass. Those are code, and they are');
lines.push('not part of this file: this file only says *when* and *how much*, not *what it looks like*.');
lines.push('');
fs.writeFileSync(path.join(outDir, 'README.md'), lines.join('\n'));

console.log(`state: bytes ${start}–${end}, ${kb(literal.length)}`);
console.log(`sheets: ${Object.keys(summary.sheets).join(', ')}`);
for (const [name, s] of Object.entries(summary.sheets)) {
  console.log(`  ${name}: ${s.length}s, ${s.objects} objects, ${s.tracks} tracks, ${s.keyframes} keyframes`);
}
console.log(`wrote ${path.join(outDir, 'mainScene.theatre-state.json')} (${kb(json.length)})`);
