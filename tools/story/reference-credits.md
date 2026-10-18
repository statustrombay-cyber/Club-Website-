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
  three-second automatic gate clock (once the chapter is substantially on screen) and scrub functions rather than hijacking wheel/touch input. Scroll can fast-forward it; reverse entry stays scrubbable.
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
  atlas islands and psychology archive pages into the original newspaper/certificate UV islands. Following the user's correction, bills use the original `leather-money-shreds.ktx2` unchanged;
  the Freud-note substitution has been deleted. The derived paper-only atlas
  is a separate texture and can no longer replace the original banknote sampler.
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
  dynamic viewport. Reduced motion stops idle movement/video/noise; Data Saver caps resolution. Neither silently disables the user-controlled WebGL scene. Release scene/audio on render failure or context loss. Rebuild original objects on reverse
  phase transitions; don't let deferred paper callbacks attach to a later phase.

These adaptations are intentional. Reusing the actual source animation is not
an assertion of pixel-identical framing across all devices or reproduction of
unrelated parts of the source site.

## Verification

- `npm test`: **604 passed, 0 failed** (PHP/backend/data and public-site checks,
  plus source-integration assertions).
- `npm run lint`: pass (`app/passes.php`). JS syntax/build and Git whitespace
  checks pass.
- `tools/tests/reference-story.mjs`: **154 checks passed, zero browser errors** in real Chromium WebGL using SwiftShader at
  **390 × 844** (mobile/touch) and **1440 × 900**; forward/reverse hand, glass,
  bill, paper and shred phases, no visible fallback portal/source-text overlays,
  downward glass, viewport-height coverage, stable reserved scroll height,
  no horizontal overflow, no gyro permission call, no source HUD/buttons,
  no outside-origin requests, no 404/JS/shader errors, chapter exit stops live
  WebAudio sources, context loss restores HTML, source fracture/hand animation
  advances, synthetic orientation input changes the actual rendered camera
  without a permission call, and Data Saver/reduced motion/a delayed engine
  download still render WebGL. Screenshots/reports stay outside the checkout.
- Compared stills decoded from the earlier HD `video_part_01.mp4` and
  `video_part_02.mp4` (Git source commit recorded in the HD manifest) against
  native hand/glass renders. These confirm the recovered hand/geometry rather
  than acceptance of an approximate hand rig. Do not deploy footage/UI.
- Browser emulation is **not** physical-device GPU, gyro or autoplay acceptance.
  Audio remains subject to the browser's permission policy; sensors remain off
  when previously allowed events are not delivered.

The classic hero, rings/wires, butterfly/navigation implementation, other
sections, payment/pass logic, stored club data and uploads are unchanged.
The render repair adds `.glb`, `.ktx2`, `.wasm` and `.mp3` pass-through inside
`assets/` in the PHP built-in-server router, plus explicit Apache/preview MIME
types; financial/authentication code is not modified. Tests are run against the existing backend;
all three horse files remain byte-for-byte unchanged.


## Render-failure investigation after user report

Backup: `/home/user/reference-study/before-render-repair-72c3cb7.tar.gz`.
Opening the ordinary home page in Chromium, not only a hash-linked test, showed
working WebGL with normal preferences. Three reproduced **silent sheet-only**
cases before the repair were Data Saver, reduced motion, and a 14-second engine
response (the loader previously abandoned it after 12 seconds). After repair,
all three reached `data-story-state="ready"`, with canvas visible, actual hand
and glass objects, and no browser console errors. This does not identify which
one occurred on the user's physical browser, but all were real defects.

A separate hosting defect was found: `npm start` routes static binaries through
`mt_is_static_file`, which did not permit GLB, KTX2, WASM or MP3. The Node preview
served those files independently and therefore masked that defect. PHP-runtime
tests now exercise the **actual helper**, including refusal of a model outside
assets, rather than merely asserting that those files exist. Apache/preview
responses explicitly identify WebAssembly, KTX2, GLB and MP3 MIME types.

Script loading now allows 60 seconds, reports failure reasons, retries a
transient failure once without collapsing the chapter height, and can recover
on network/context restoration. Hand/glass can start rendering before the
later paper textures finish. The opening gate uses wall-clock time while
visible, not the physics delta cap (otherwise software/slow renderers stretch
the original three-second break into a long apparent freeze). The first-hand
camera now applies and restores the original passive-input rig correctly;
previously it was deliberately disabled to avoid a camera-reset bug.

Original banknote atlas SHA-256 (identical to the user's capture):
`f39a1df7fcdcca5b512a327ff78cf118bcd96be27c1dbad845e71b4efeb54f5e`.
`original-banknote.webp` is an offline crop for the HTML/no-WebGL fallback only;
the animated bills sample the supplied compressed atlas, with the original
burn shader, UV rotation, geometry and camera animation.

A source-canvas WebM recording and inspected stills are kept outside the public
checkout. A recording of this implementation is evidence of actual rendering,
not a replacement footage layer or a pixel-identical/physical-device claim.
