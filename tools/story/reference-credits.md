# Recovered original chapter · 18 October 2026

## Provenance, backup, and scope

The user supplied `Club website Hand glass broken.zip.zip` in commit
`838239efaad0d63b1730cc213d57fac4c0f7c0f5`. Its SHA-256 is
`c72259cb8836666fafbfebc6823d2dfb761322c5fdceb052ca563ca70c0b065a`.
The 72-entry ZIP passed its CRC check. A byte-identical copy and the full
extraction are preserved **outside the public checkout**, at
`/home/user/reference-study/upload.zip` and `capture/` in the same directory.
The original upload is also recoverable with `git show 838239e:'Club website Hand glass broken.zip.zip'`.
The pre-edit working-tree backup is
`/home/user/reference-study/before-zip-inspection.tar.gz`.
Only runtime assets for the requested sequence are copied into `assets/reference/`.
The reference ZIP is removed from the public tree, not its recoverable history.

`reference-core.js` is the formatted/adapted prefix of the captured
`assets/main-B9-HtP-f.js`, ending before the original stage-three-to-four gate.
It retains the original Three implementation, DRACO/KTX2 loaders, hand bones
and baked texture blending, camera clips, glass geometry/refraction, burn,
certificates/papers, analytical shred shaders and animation math.
`reference-bridge.js` provides the club's native-scroll, viewport, visibility,
reversal, audio and disposal integration. `npm run build:story` rebuilds the
lazy-loaded `assets/vendor/story-3d.js`. The prior `scene.js`/`shaders.js` remain
only as historical reconstruction sources; the build no longer uses them.

This is user-provided third-party material, **not a claim that the source site's
artwork or code has an open licence**. Existing library notices remain in the
captured code/decoders; the Three MIT notice remains in `assets/vendor/`.
The already-used Bodoni Moda and Pinyon fonts retain their OFL notices.
No new licence is asserted for the captured artwork.

## Deliberate adaptations

- Do not execute the captured page/bootstrap, Zero loader/HUD, XP, original
  navigation, signup, tracking, analytics or full-page virtual-scroll manager.
  The source `Cv` XP path is disabled by `_xpReplaySkip`.
- Skip unrelated first-stage garden/coins/world-map/later stages. Use the actual
  second hand (`Lb`), glass gate (`sx`), glass stage (`Wb`) and money/paper stage
  (`Xx`) in the existing club chapter. Native progress drives the original
  gate clock and scrub functions rather than hijacking wheel/touch input.
- The absent `stage3_money-hand.webp` otherwise leaves a solid white portal.
  Do not request that missing file, and keep its portal mesh invisible.
- The captured shatter fragment shader was an opaque black constant. Keep the
  original shatter geometry/animation, but give its fragments subtle transparent
  Fresnel shading instead of painting opaque black cutouts over the hand.
- Reverse only the camera-attached fragments' vertical flight, as requested;
  preserve their geometry, rotation endpoints, refraction, overlay UVs and the
  original camera/bill/paper animation. No generic floating glass reconstruction.
- Keep club/research text rather than source job-market advertising; retain the
  accessible HTML and cited research. Bake club glyphs into the six original
  atlas islands, Freud currency into the original rotated bill island, and
  psychology archive pages into the original newspaper/certificate UV islands.
  The original unmodified KTX2 files are retained alongside the derived WebPs.
- `adapt-atlases.py` creates the derived WebPs offline from GPU-exported
  `spcAtlas.png`, `moneyShredsAtlas.png`, `certAtlas.png`; dependencies: Pillow,
  fonttools, brotli. Supply `--source-dir` and `--work-dir` outside the checkout.
  The source exports were sampled to an original-size RGBA render target and
  read back once, with bottom-up rows flipped. **No runtime atlas readback,
  repainting, canvas portrait synthesis or per-load text baking is needed.**
- Use the captured mobile theatre video on desktop too: a desktop encode is not
  in the supplied ZIP. No source-host fallback or external requests.
- Stop before the source's later white tunnel/world-map gate. Fade this canvas
  back to the existing herd; never replace or re-encode the three horse MP4s.
- Retain only original glass impact, stage-two/three ambience, and money burn.
  Ordinary trusted interaction may unlock WebAudio; no new button, toggle,
  preference store, special trigger or autoplay guarantee. Silence/stop **all**
  mixer sounds whenever the chapter is outside the viewport or the page hides.
  Do not restart a fade on every render frame or replay a missed impact later.
- Remove the original gyro auto-trigger and permission request. Listen passively
  for orientation events already allowed by the browser. Without access, no
  sensor events means no gyro. Do not add a prompt, permission UI or workaround.
- Reserve native chapter height once; resize only the drawing surface with the
  dynamic viewport. Release the scene/audio on reduced motion, data-saving
  fallback, render failure or context loss. Rebuild original objects on reverse
  phase transitions; don't let deferred paper callbacks attach to a later phase.

These adaptations are intentional. Reusing the actual source animation is not
an assertion of pixel-identical framing across all devices or reproduction of
unrelated parts of the source site.

## Verification

- `npm test`: **600 passed, 0 failed** (PHP/backend/data and public-site checks,
  plus source-integration assertions).
- `npm run lint`: pass (`app/passes.php`). JS syntax/build and Git whitespace
  checks pass.
- `tools/tests/reference-story.mjs`: **138 checks passed, zero errors** in real Chromium WebGL using SwiftShader at
  **390 × 844** (mobile/touch) and **1440 × 900**; forward/reverse hand, glass,
  bill, paper and shred phases, no visible fallback portal/source-text overlays,
  downward glass, viewport-height coverage, stable reserved scroll height,
  no horizontal overflow, no gyro permission call, no source HUD/buttons,
  no outside-origin requests, no 404/JS/shader errors, chapter exit stops live
  WebAudio sources, context loss restores HTML, reduced motion avoids the
  renderer download. Screenshots/reports stay outside the checkout.
- Compared stills decoded from the earlier HD `video_part_01.mp4` and
  `video_part_02.mp4` (Git source commit recorded in the HD manifest) against
  native hand/glass renders. These confirm the recovered hand/geometry rather
  than acceptance of an approximate hand rig. Do not deploy footage/UI.
- Browser emulation is **not** physical-device GPU, gyro or autoplay acceptance.
  Audio remains subject to the browser's permission policy; sensors remain off
  when previously allowed events are not delivered.

The classic hero, rings/wires, butterfly/navigation implementation, other
sections, PHP backend, payment/pass logic, stored club data and uploads are
not edited by this integration. Tests are run against the existing backend;
all three horse files remain byte-for-byte unchanged.
