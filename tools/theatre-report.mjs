#!/usr/bin/env node
/* Prints what Cartier's Theatre timeline says, chapter by chapter.
   Usage: node tools/theatre-report.mjs [state.json]                        */
import fs from 'node:fs';
import { createTimeline, sampleAt, sampleWindow, sceneWindows } from '../cartier/theatre/sampler.js';

const file = process.argv[2] || 'cartier/theatre/mainScene.theatre-state.json';
const tl = createTimeline(JSON.parse(fs.readFileSync(file, 'utf8')));
const wins = sceneWindows(tl);

console.log(`timeline ${tl.length}s, ${tl.tracks.size} objects`);
for (const w of wins) {
  const sw = sampleWindow(tl, w.start, w.end);
  const gl = sw.glows.filter((g) => g.alpha > 0.005).map((g) => `${g.name.replace('glowSphere', 'g')} ${g.alpha.toFixed(2)}`);
  console.log('');
  console.log(`scene ${w.index}  ${w.start.toFixed(2)}–${w.end.toFixed(2)}s` +
    (w.title ? `  card ${w.title[0].toFixed(2)}–${w.title[1].toFixed(2)}` : ''));
  console.log(`  fov ${sw.fov.toFixed(1)}${sw.fovOffset ? ` (${sw.fovOffset})` : ''}` +
    `  crowd ${sw.characters.toFixed(2)}  forcedDark ${sw.forcedDark.toFixed(2)}`);
  console.log(`  glows ${gl.length ? gl.join(', ') : '—'}`);
  console.log(`  lit: ${sw.lit.join(', ') || '—'}`);
}
const mid = sampleAt(tl, 9);
console.log('\nlight decal:', JSON.stringify(mid.decal));
