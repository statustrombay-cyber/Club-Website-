/** Bundle the local, offline-capable Three.js scene. No browser CDN/import map.
 * npm install && npm run build:story; generated runtime is committed for PHP hosts. */
import { build } from 'esbuild';
await build({entryPoints:['tools/story/scene.js'],bundle:true,format:'iife',target:['es2020'],minify:true,outfile:'assets/vendor/story-3d.js',legalComments:'eof'});
