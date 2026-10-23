# Layer, title and loading follow-up — 21 October 2026

This addresses the new report after `3b26e98`; its earlier green checks were not treated as proof that these later symptoms were resolved. Starting snapshot: `9a79bd27110d7bef2c67f3cb3dfc30b426d1de6c`. All five subsequent reference RAR upload commits are preserved. Work is restricted to `arena/24a1daf8-club-website` / PR 5; no main edits or merge.

## Reproduced defect and repairs

- **False title visibility:** before this repair, rendered phone and desktop captures contained **zero white title pixels** in the central title region, despite `welcomeVisible:true`. The bridge called a postprocessing pass's physical-pixel `setSize` API with CSS dimensions; that pass divided them by renderer DPR again. A top anchor plus an extra bridge Y offset then pushed the title outside the camera (recorded Y positions 552.89 at 390×844 and 724.00 at 1440×844). Pass physical dimensions, restore the authored center anchor/base scale .4, retain a .9 viewport-width safety cap, and remove the Y compensation. Text render-target density cannot exceed the chosen renderer density.
- Keep the existing **source-raster relettered** `we are / here` artwork and original reveal shader, rather than introducing an approximate browser font. The supplied atlas, shader and raster-glyph relettering script were inspected; font binaries are not present in the upload. Artwork bytes were not changed. Open the text pass when fracture begins, rather than at the old >.3 gate threshold, and shorten this title's reveal to .45 seconds so it is readable during the break. Other source text timings are unchanged.
- **No scroll-time sticky/fixed switch:** the enhanced canvas is now one permanently fixed viewport surface. A native `clip-path:inset(0)` on the document-flow chapter bounds it, including before entry and on reverse exit. No scroll-generated `data-story-pinned` positional toggle remains. Tested that the ancestor clip does not establish a fixed-position containing block; the stage stays at viewport Y=0 while the chapter clip scrolls.
- **Rings/Manifest:** paint the parent once, remove the child's rectangular radial background, use a top-zero full-large-viewport stage, and retain automatic height for no-JS/reduced-motion. The dark header glass and floating controls no longer overlay the dark interludes. Original ring, heading and three wire-object choreography/clocks remain.
- Restore shard group **Z=0** on portrait screens as requested, rather than retreating them away from the camera. Original irregular meshes, upward flight, refraction and hand/camera animation are unchanged. Moving/tilted shards naturally enter and leave the viewport; this is not a promise that every shard is simultaneously inside the screen.

## Work-budget and loading changes

- Cache track geometry until scroll, resize, font readiness or ResizeObserver invalidation; no idle-frame forced layout reads. Do not rewrite the viewport-height variable or remeasure the stage on every document scroll.
- Limit idle diagnostic serialization to 10 Hz (still publish changed progress immediately). Limit high-DPR desktop oversampling with an approximately two-million-pixel budget, retaining a 1× density floor and the existing mobile quality cap/adaptation. Retain the full 4096px editorial atlas.
- Yield between the original degree, editorial and strip-system construction, then await asynchronous material compilation. Keep this inside the awaited phase transition, with disposal checks—not source deferred callbacks that can attach objects to a later phase after a reversal.
- Observer/scroll callbacks cannot start a competing render or phase transition during initial pass prewarm. Reject context loss during prewarm instead of publishing a disposed scene as ready.
- Preserve lazy approach loading, bounded fallback/retry, working PHP binary delivery, offscreen pause, early trusted audio/motion activation, reverse-without-impact and silence after the chapter. No new Sound/Tilt/Gyro UI.

## Validation

Real Chromium 153 at phone and desktop widths. Runtime screenshots and logs remain outside the deployment repository in `/home/user/reference-study/smoothness-review/`.

- `npm test`: **760 passed / 0 failed**; lint passed.
- New `story-layer-pixels.mjs`: production-DPR sizing branch, 390×844 and 1440×844, screenshots and actual pixel checks. Final break-title white pixels: **27,801 / 126,149**; settled centered-title pixels: **27,920 / 126,150**; idle track-layout reads: **0 / 0**. Also checks physical/CSS camera dimensions, native clipping above the chapter, visible paint within it, no offscreen pointer interception, permanent layer geometry across five reversals, closer shard depth, header-free rings/Manifest and chapter release. **No page errors.** This checks painted ink, not a font-identity/OCR claim.
- `mobile-story-detail.mjs`: splash deferral, actual gyro camera movement, corrected title bounds, upward/closer shards, no reverse impact, ambience and desktop/mobile Lens navigation, full 4096px paper texture passed.
- `story-inputs.mjs`: **19 checks**, audible nonzero DSP, single impact, burn, permitted simulated sensor offsets, reverse, silence, session restoration and denial handling passed; repeated after warmup sequencing guard.
- `story-performance.mjs`: **11 checks**, hero/offscreen work suppression, 928/754/844px interlude coverage, all three wire clocks, quality adaptation with all original paper/shred objects and full print texture passed; repeated after warmup guard.
- `reference-story.mjs`: **157 assertions** passed at both widths; original phase/geometry traversal and return preserved.
- `fast-story.mjs`: cold phase skipping with direct binary URLs deliberately denied passed, including rapid unordered jumps. Final local ready times: **3,922ms phone / 4,149ms desktop**. These are this sandbox's timings, not production loading guarantees. Repeated after warmup guard.
- `story-smoothness.mjs`: forward/reverse, retained glass/facts, no replayed impact, new-visit reset and header release passed at both widths; repeated after warmup guard.
- `story-viewport.mjs`: mobile toolbar-height changes, CPU-throttled native touch flings, desktop wheel reversals, pixel band checks, actual herd exit and editable essential content passed.
- `site-audit.mjs`: home/calendar/members/gallery at both widths, navigation, forms, gallery, herd playback, no horizontal overflow/page errors passed.
- `scene-delivery.mjs`: normal delivery and intentional 403/HTML-error cases correctly checked; no regression to the PHP loader.
- `printed-atlases.py`: six actual portrait/editorial tiles, original degree/banknote bytes and original strip/flight formulas passed.
- GitHub-equivalent staged export checked separately before publication: original runtime payload/hash checks, host file-size limits, three horse clips, and exclusion of development/private data/reference archives. New `cartierfile*.rar` export-ignore rules preserve uploads in Git while excluding them from website ZIPs; export regression rejects RAR as well as ZIP archives.

No live production URL or physical iPhone/Android was supplied. Software GL, injected sensors and mocked audio-session APIs cannot certify physical-device frame rates, Safari compositor behaviour or OS speaker/sensor output. The verified changes remove reproduced causes and reduce work; they are not an exact/bug-free or universal-FPS guarantee. Cartier integration remains unauthorized and has not been added.
