# First-page flow, bounded splash and website-only export

Starting snapshot: `fab85d1`; authorized branch `arena/24a1daf8-club-website`, existing PR 5 only. Earlier checks were not treated as proof that the newly reported first-page peeling was fixed. A backup of the supplied worktree was saved outside the repository before alignment; every supplied file matched the current remote snapshot. All reference upload commits remain intact.

## Reproduced first-screen geometry churn

At 390px width, resizing the visual viewport through 844 → 754 → 928 → 754px caused the fixed horse-video container to resize through exactly the same heights. It also lacked a compositor transform. This continually re-cropped/reallocated the full-screen video surface during toolbar changes, a separate issue from the previously repaired story canvas.

- The herd now lives on one paint-contained, isolated composited plane at viewport top zero. A CSS variable retains the largest viewport height until width/orientation changes; it is never rewritten on document scroll. A poster underpaint remains in the same plane.
- Repeated viewport reversal checks now observe 844 → 844 → 928 → 928px. Pixel checks with CPU-throttled native mobile touch gestures and desktop wheels found no full-width white bottom strip.
- No scroll hijacking, section layout containment or content-visibility shortcuts were added. Herd visibility and the public-page design remain.

## Less competing rendering

- The soft radial drift gradients no longer receive a redundant animated 30–48px blur pass. Rotating wheel labels no longer repeatedly backdrop-blur the moving movie. Large mobile reading/form cards retain their tint/background but omit backdrop blur. The navigation glass and bubble/word choreography remain.
- An IntersectionObserver pauses decorative CSS timelines outside a 300px reading margin without hiding content or changing document geometry. Excludes the original 3D story and rings chapter. Decoration resumes on return.
- Pause bubbles/drift under the splash and opaque dark chapters. Buffer a first horse frame but do not play the hidden movie throughout the splash; start it when the intro releases. Existing reduced-motion/Data Saver and story-video pausing remain intact.

## Short, non-blocking space-like intro

- The existing star SVG now zooms forward using one compositor transform, not a JavaScript particle renderer. Keep the authored seven rings and contour-painted `mindfultattva` word. Adjust final-ring duration and fade only after the letters settle: normal CSS sequence is 4.8s + .45s exit, rather than 5.5s + .65s. Reduced motion/direct section links still bypass it.
- Preload the actual first-screen font and horse poster. After the ring bloom, and only if fonts/first frame are ready, permit **one** low-priority engine-byte fetch with a 1.8s timeout. Skip constrained connections. This warms HTTP cache only: no engine execution, decoder/model/texture bulk download, second video or WebGL allocation behind the splash. Its result never gates intro dismissal.
- Record the intro's visit deadline in the early head script. If startup is late, do not wait another 6.5 seconds: recognize already-finished CSS, or use only the remaining deadline. The ordinary fallback stays bounded and idempotent. A fault-injection test externalized the normally inlined app script and delayed it six seconds; the page released at about 6.18s with neither cover nor inert shell, not another six-second hold.
- Loading the entire 3D site during the splash was deliberately rejected: compilation/decoding would compete with the paint animation and recreate the reported freeze. Later heavy work remains lazy on chapter approach.

## Verification

Fresh Chromium 153 / real PHP-WASM preview. Screenshots/logs are outside the repository in `/home/user/scroll-review/`.

- **766 application/backend/pass/security tests passed, 0 failed**, plus lint. Includes late-intro fallback execution and structural guards for the new work budget.
- New `first-page-flow.mjs`: 390px and 1440px; actual changing star transforms, no hidden movie/GL/wire playback, paused background decoration, bounded intro despite hung engine warmup, at most one passive request, largest-height media geometry, 4× CPU-throttled native mobile touch gestures, desktop wheel reversals, bottom-pixel strip checks, offscreen animation pause/resume and visible essential content. Also Data Saver/reduced-motion/direct-link and six-second late-script fault injection. **No page errors.** Intro release remained around 5.6s including initial local navigation/render overhead with a deliberately hung warmup.
- `story-performance.mjs`: **11 passed**. Allows passive engine bytes but explicitly rejects model/decoder/engine execution over the first screen; retained hidden-work suppression, all wire clocks, viewport coverage and quality adaptation.
- `site-audit.mjs`: home/calendar/members/gallery at both widths, continuous herd after intro, leadership/contact content, complete original paper travel, direct navigation, gallery expansion/escape and no overflow/page errors passed.
- `story-viewport.mjs`: toolbar-height changes, native touch flings, desktop wheel reversals, pixel band checks, actual resumed-herd exit, and editable core content passed.
- `story-inputs.mjs`: **19 passed**, including audible DSP, one-shot fracture, permitted simulated gyro, burn, reverse-without-impact, actual silence and denial handling.
- `reference-story.mjs`: **157 passed**, source phase geometry and return preserved. No original geometry, atlas, hand, glass, degree, strip shader, paper-flight formula or audio asset was edited in this repair.
- `fast-story.mjs`, `mobile-story-detail.mjs`, and `scene-delivery.mjs` normal/intentional-error cases passed. Full-resolution editorials and working PHP binary delivery retained.
- Staged GitHub-equivalent export validates every runtime payload/hash, all three horse clips, private-data exclusion and host file limits. References, tools, package manifests and now `.gitignore`/`.gitattributes` housekeeping are excluded from Download ZIP. Runtime PHP, views, assets, protections and README remain. GitHub's standard outer repository directory is unavoidable; upload its contents as documented. Actual post-push GitHub ZIP validation is recorded in the PR comment.

No deployed URL or physical device was provided. These checks validate observed causes, rendered behaviour and work reduction; software GL, injected sensors and emulated toolbar/touch behaviour do not certify physical iPhone/Safari compositor behaviour or universal smooth frame rates. No main-branch update or merge; no Cartier integration.
