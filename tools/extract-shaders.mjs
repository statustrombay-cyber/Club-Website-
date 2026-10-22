#!/usr/bin/env node
/* ==========================================================================
   extract-shaders.mjs
   --------------------------------------------------------------------------
   Cartier's bundle keeps its GLSL in template literals. This pulls every one
   out into `cartier/shaders/` as a plain .glsl file with a descriptive name,
   plus an index that says what each one is and which uniforms it takes.

   Usage: node tools/extract-shaders.mjs [bundle] [outDir]
   ========================================================================== */

import fs from 'node:fs';
import path from 'node:path';

const bundlePath = path.resolve(process.argv[2] || 'cartier.app.js');
const outDir = path.resolve(process.argv[3] || 'cartier/shaders');
const src = fs.readFileSync(bundlePath, 'utf8');

/* ── 1. collect template literals ──────────────────────────────────────── */
const blocks = [];
for (let i = 0; i < src.length; i++) {
  if (src[i] !== '`') continue;
  let j = i + 1;
  let out = '';
  let closed = false;
  while (j < src.length) {
    const c = src[j];
    if (c === '\\') { out += src[j + 1]; j += 2; continue; }
    if (c === '`') { closed = true; break; }
    if (c === '$' && src[j + 1] === '{') {
      // skip an interpolation, keep a marker so the code stays valid GLSL
      let depth = 1;
      j += 2;
      while (j < src.length && depth > 0) {
        if (src[j] === '{') depth++;
        else if (src[j] === '}') depth--;
        j++;
      }
      out += '/* … */';
      continue;
    }
    out += c;
    j++;
  }
  if (closed) {
    const isGlsl = /(precision (highp|mediump) float|#define GLSLIFY|gl_FragColor|FragColor|gl_Position)/.test(out);
    if (isGlsl && out.length > 200) {
      blocks.push({ start: i, end: j, source: out });
      i = j;
    }
  }
}

/* ── 2. name each shader by what it does ───────────────────────────────── */
function describe(s) {
  const has = (...keys) => keys.every((k) => s.includes(k));
  const vert = has('gl_Position') && !has('FragColor', 'gl_FragColor');
  if (has('uPrevFrameMix', 'uSpotLight')) return ['magic-light', 'the volumetric spot light that reveals the set'];
  if (has('tDepth', 'tNormal') && has('uLightParams')) return ['light-decal-depth', 'flat light decals projected through depth + normals'];
  if (has('tDepth') && has('uCameraNearFar')) return ['depth', 'depth-only pass'];
  if (has('uBloomThreshold') || has('luminosity', 'knee')) return ['bloom-prepass', 'luma isolation for bloom'];
  if (has('uGrain') || has('chromatic') || has('uVignette')) return ['film', 'grain, chroma shift, vignette, dither'];
  if (has('tFlowMap')) return ['flow', 'motion / flow buffer'];
  if (has('tDiffuse', 'blur') || has('uDirection')) return ['blur', 'separable blur'];
  if (has('lightMap') && has('envMap')) return ['material', 'the set materials (baked light + environment)'];
  if (vert) return ['vertex', 'vertex shader'];
  return ['misc', 'unclassified shader'];
}

/* ── 3. write ------------------------------------------------------------ */
fs.mkdirSync(outDir, { recursive: true });
const seen = new Map();
const index = [];

blocks.forEach((b) => {
  const [kind, note] = describe(b.source);
  const n = (seen.get(kind) || 0) + 1;
  seen.set(kind, n);
  const name = `${kind}${n > 1 ? `-${n}` : ''}.glsl`;
  fs.writeFileSync(path.join(outDir, name), b.source.trimEnd() + '\n');

  const uniforms = [...new Set([...b.source.matchAll(/uniform\s+\w+\s+(\w+)/g)].map((m) => m[1]))];
  index.push({ name, kind, note, bytes: b.source.length, uniforms });
});

const lines = [
  '# Cartier\'s shaders, lifted from the bundle',
  '',
  'Extracted by `tools/extract-shaders.mjs` from `cartier.app.js`. These are the',
  'original GLSL sources, unchanged apart from interpolations, which are replaced',
  'with `/* … */` because their values only exist at runtime.',
  '',
  `| file | bytes | what it is |`,
  `| ---- | ----- | ---------- |`,
];
for (const e of index) lines.push(`| \`${e.name}\` | ${e.bytes} | ${e.note} |`);
lines.push('');
lines.push('## Uniforms per shader');
lines.push('');
for (const e of index) {
  lines.push(`### \`${e.name}\``);
  lines.push('');
  lines.push(e.uniforms.length ? e.uniforms.map((u) => `\`${u}\``).join(', ') : '_none_');
  lines.push('');
}
fs.writeFileSync(path.join(outDir, 'README.md'), lines.join('\n'));

console.log(`${blocks.length} shaders → ${path.relative(process.cwd(), outDir)}`);
for (const e of index) console.log(`  ${e.name.padEnd(24)} ${String(e.bytes).padStart(6)} bytes  ${e.note}`);
