/** Rebuild the adapted original scene without its source-site startup or HUD. */
import {build} from 'esbuild';
import fs from 'node:fs';
const contents=fs.readFileSync('tools/story/reference-core.js','utf8')+'\n'+fs.readFileSync('tools/story/reference-bridge.js','utf8');
await build({stdin:{contents,resolveDir:process.cwd(),sourcefile:'recovered-chapter.js'},bundle:true,format:'iife',target:['es2020'],minify:true,outfile:'assets/vendor/story-3d.js',legalComments:'eof'});

// Preserve GLSL newlines, but do not retain whitespace-only source lines.
const bundle='assets/vendor/story-3d.js';
fs.writeFileSync(bundle,fs.readFileSync(bundle,'utf8').split('\n').map(line=>line.replace(/[\t ]+$/,'')).join('\n'));
// Keep hosting payloads byte-identical to the freshly built browser engine.
await import('./build-scene-assets.mjs');
