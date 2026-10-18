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

## PHP shared-host delivery (2026-10-18)

The reported public site still failed despite the local repair. The public
HTML/bootstrap and decoder JavaScript were reachable through the page-fetch
tool; WASM/KTX2 fetches returned tool errors and the large engine fetch had no
extracted text. Those results alone do **not** establish that the origin host
blocked these types: binary extraction/tool behavior was not independently
ruled out. Direct sandbox TLS to that host was unavailable. No production
upload/deployment has been performed by this agent.

The hosting-compatible build now delivers the prebuilt engine, both WASM
decoders, three KTX2 atlases and five GLBs through `scene-assets.php` using a
fixed allowlist. `tools/build-scene-assets.mjs` creates private PHP/base64
payload chunks below 400 KiB, with original byte counts and SHA-256 checks.
The endpoint does not run/transcode the animation, fetch external URLs, accept
paths or access club records. Both DRACO and KTX2 share the scoped URL manager.
Normal browser execution/Blob workers/WebGL2 are still required; no server
Node.js, Java or Three.js installation is required. Unchanged WebP textures,
small decoder JavaScript and MP3 audio remain ordinary static assets.

`scene-check.php` is an unlinked, read-only, noindex browser diagnostic: checks
WebGL2, WebAssembly, a Blob worker, all eleven downloaded byte counts/hashes,
and actual scene-engine registration. It never exposes PHP configuration,
credentials, filesystem paths or student data. An all-green result verifies
asset delivery/capabilities, not every animation frame or physical-phone GPU.

Verification of this revision:
- PHP/site suite: **656 passed, 0 failed**, including every byte-identical
  endpoint response, correct MIME, HEAD, ETags, arbitrary-path/array rejection,
  unsupported methods and incomplete/damaged-upload errors.
- Actual scene browser suite: **154 checks, errors []**, 390×844 and 1440×900,
  with all direct WASM/KTX2/GLB URLs deliberately returning HTTP 500. Also
  retains reduced-motion, Data Saver, delayed-engine and movement/audio tests.
- Public diagnostic: **15 checks passed** locally; a simulated HTTP-200 HTML
  protection page replacing the Basis decoder correctly produces one named
  failure instead of a false pass.
- Newly rendered hand/banknote/shred screenshots inspected outside the repo.

The update ZIP excludes live `data/`, uploaded club/student files and the three
unchanged horse MP4s. Extract locally, back up the live site, and overwrite the
included files in the existing site folder; do not delete existing folders or
leave the ZIP publicly accessible. Validate `/scene-check.php` on the actual
domain after upload before claiming the public issue is resolved.

## InfinityFree 403 and normal GitHub ZIP workflow (2026-10-18)

The user supplied the shared InfinityFree 403 error-page URL and requested
normal repository updates only: **no additional or nested deployment ZIP**.
Consulted the host's 403 guide (`/docs?topic=58664`), browser-security guide
(topic 49353), and published file-size limits (topic 49310). The shared error
URL does not identify the denied original request. New automated probes of
the public root/index/diagnostic returned tool errors or the host's 404 page;
these are not a verified diagnosis of the user's browser 403 or a successful
production deployment. The host documents mandatory JavaScript/cookie checks
for browsers, including limitations for automated tools.

Changes for this upload workflow:
- The original scene now requests `/index.php?scene-asset=<fixed-key>` and the
  diagnostic opens at `/index.php?scene-check=1`. These use the existing front
  controller, with no dependency on an additional public script or pretty-URL
  rewrite. Older scene endpoint URLs remain compatible; method/allowlist,
  byte integrity, MIME and conditional responses retain their protections.
- Removed inline comments from Apache RewriteRule directives for portable
  configuration syntax. Private directory rules and disabled directory
  listing remain intact. No host firewall or private-folder protection was
  disabled, and this is not claimed to fix an account-level denial.
- GitHub export attributes omit development tools/package manifests and live
  `data/site.json`/`data/config.php` on normal Download ZIP. Production payloads,
  folder-protection files and all three original horse videos stay included.
  Source/build tools and data files remain in Git; no data was deleted/reset.
- README now explains the exact domain directory, GitHub outer-folder trap,
  correct root .htaccess versus intentionally private app/data rules, 755/644
  permissions, full-download branch selection, and first-install versus
  existing-site data handling. Node/npm are local development tools only.

Verification:
- **708 PHP/site checks passed**, including both URL forms for all eleven
  assets, malformed array/path requests, HEAD/ETags/read-only behavior and
  diagnostic access through index.php.
- **154 actual-scene browser checks passed, errors []** at 390×844/1440×900,
  retaining deliberate failures of direct WASM/KTX2/GLB URLs and the existing
  movement/audio/preference checks.
- Diagnostic: 15 positive checks pass. Simulated HTML-instead-of-WASM and
  HTTP-403 responses each produce the expected named decoder failure and
  preserve the original requested URL in the report.
- `tools/tests/source-export.py` inspects a GitHub-equivalent tar stream in
  memory: **142 files**, eleven byte-identical scene payloads, three original
  horse clips, no nested ZIP, no data/password overwrite, no development tools,
  every exported file within conservative published hosting-size limits.
  This check creates no deployment archive on disk.

No new upload ZIP was created, no production server was accessed, and no
main-branch merge was performed. Actual production verification still requires
the user's full upload and a real-browser check on the domain.

## Targeted repair on the restored PHP loader (after aa93875)

The previous full rollback restored playback but also undid the requested paper,
header and reverse-scroll work. This revision reapplies **only** that requested
scene work. It keeps the existing `/index.php?scene-asset=engine` entry point,
allowlisted model/atlas endpoints, shared Draco loading manager, PHP payloads,
Apache configuration and GitHub export safeguards. The normal build regenerates
both the browser engine and its PHP chunks/manifest together. No separate or
nested deployment ZIP is produced. Backup before editing:
`/home/user/reference-study/before-targeted-story-aa93875.tar.gz`.

- Removed the complete “Behind the fragments” details panel. Published-study
  qualifiers/citations remain in the accessible shard text.
- Hide the navbar, butterfly and back-to-top control from arrival at the header until the whole story
  track exits. Header links are inert; normal navigation returns outside.
- Six newspaper and eight archive UV islands have real greyscale photographic
  portraits of Freud, Rogers and James, headings and dense printed columns.
  Their reverse faces are also printed. The original burning banknote is
  untouched. Photo sources/reuse caveat and the editorial-summary distinction
  are in `assets/story/portraits/CREDITS.md`.
- Upward motion latches glass dismissal instead of rewinding the fracture/SFX.
  Composite opacity retains intermediate rendered frames, even with a slow
  GPU. A fresh forward visit after leaving above rearms once. Existing hand/
  shard objects are reused and the source mouse listener is removed on disposal.
- Preload the **PHP-served** engine in the home-page head; start preparation
  early instead of waiting for the chapter. Opening assets have priority over
  paper downloads; unused advertising-text KTX2 and stage-one procedural assets
  are not loaded. No loading/reconnecting banner. Genuine failure messages and
  the accessible fallback remain, rather than hiding an actual loading failure.
- Disable unused lens/text passes and fact-glass rendering outside its phase.
  Raster caps are 1 DPR on mobile / 1.25 desktop (rather than up to 1.5), with
  existing reduced-motion/Data Saver behavior. Lighter grain keeps ink clearer.
  Initial offscreen rendering warms the opening without a mandatory asynchronous
  shader-compile wait that could delay readiness on a particular driver.

**An additional actual rapid-scroll bug was caught visually before release.**
The first draft passed phase/mesh-count assertions but its cold .79 screenshots
were completely black. The supplied opening sets foreground exposure to zero;
normal entry into the facts stage resets it, but a direct opening → paper jump
skipped that reset. The bridge now starts in the phase matching the actual
scroll position, explicitly resets exposure/contrast/red tint/background zoom
when entering papers, and cleans up the opening hand if the facts stage is
skipped. `tools/tests/fast-story.mjs` checks the **painted PNG pixels**, not just
"16 papers exist", after cold entry and repeated nonsequential phase jumps.
The repaired mobile/desktop fast-entry screenshots visibly show the photographs
and independently shredding printed papers, with no header.

Verification: unit tests retain the hosting/security/backend checks; normal
browser regression runs with direct scene-engine/WASM/KTX2/GLB URLs blocked.
Additional scripts exercise actual upward opacity frames, no repeated fracture,
one fresh-visit rearm, whole-track navigation conceal/restore, cold rapid entry,
all fourteen photo/text UV islands and unchanged banknote bytes. Public delivery
checks exercise correct bytes and simulated HTML/403 responses. Screenshots and
logs are outside the website. Local software-GPU timings are not a production
network/physical-phone FPS guarantee; no pixel-exact/bug-free claim is made.

Final local results: **713 unit checks, zero failures; 157 desktop/mobile
browser checks, zero page errors; 15/15 normal scene-delivery checks** (simulated
HTML and 403 replies were correctly identified). The separate smoothness run
sampled **1 → .75 → .5 → .25 → 0** opacity with one unchanged fracture count,
then exactly one rearm on a new visit. All fourteen atlas islands, three B/W
portraits and the original banknote checksum pass. Two cold fast-scroll contexts
plus repeated opening/paper/fact jumps pass painted-pixel assertions with direct
scene URLs forbidden. The cold offscreen opening prepared at ~1.3 s in one local
run; first paper frames on a direct jump took ~2.6 s mobile / ~3.5 s desktop on
the software GPU. These are measured local observations, not promised hosted
load times or physical-device frame rates.

## Viewport, visible content and paper readability repair (2026-10-18)

Backup before this revision:
`/home/user/reference-study/before-gap-content-repair.tar.gz`.
The user's physical-browser report remains authoritative; stable scroll jumps
alone had not reproduced the expanding white band. A baseline local render did
show the membership form at opacity zero. Essential headings, affiliation and
the membership form no longer depend on intersection-reveal callbacks. Empty
legacy identity fields receive display-only defaults, without modifying stored
club settings, records or uploaded files.

The sticky stage now locks to the largest viewport height at the current width,
with a dynamic-viewport CSS safety minimum and matching opaque scene underpaint.
Browser-toolbar height changes do not continuously reallocate the WebGL backing
or change the reserved story scroll distance. The splash covers the largest
viewport too. The fixed herd media has an explicit stacking context, so the
transparent ending reveals that same herd and the adjacent section. Background
horse decoding and unseen CSS decoration pause behind the opaque chapter; the
horse resumes before the closing crossfade using actual scroll coverage rather
than stale renderer progress. Fully transparent tail frames stop WebGL and audio
instead of drawing invisibly over the next section.

The original glass audio file/playback remains; ambient starts in the same
fracture event with a 0.12-second fade, not at the next phase. Newspapers reuse
actual Freud/Rogers/James photographs: portrait prints increase from 150×155 to
282×320 and landscape prints from 157×179 to 242×278 source pixels. These are
historical photographs, not AI-invented faces. A stage-local clock, bounded
paper rotation, gentler convergence and later shredding give the photographs
more readable time. Original geometry, hand, camera, fact atlas, banknote,
shaders, PHP asset loader and all three horse MP4s are preserved.

`story-viewport.mjs` checks actual screenshot pixels during 928/844/754px
viewport changes and a CDP touch fling with 2× CPU throttling. It also checks
splash coverage, stable canvas backing/scroll reservation, ambient during the
opening break, a zero inter-section gap, silent transparent tail, and visible
institution text/editable membership form. Screenshots/logs remain outside the
repository. This is headless Chromium/software-GPU evidence, not a physical
Safari, production-network or constant-frame-rate guarantee.

Final verification of this repair: **719 unit/PHP checks, 157 desktop/mobile
scene checks, zero failures/page errors**; resized-viewport/touch-fling,
cold fast-entry/repeated jumps and upward-fade/new-visit regressions pass.
All 14 printed-photo islands and the original banknote checksum pass.
Normal scene delivery passes all 15 checks; simulated HTML/403 decoder replies
are correctly rejected. Lint and the staged GitHub-equivalent source export
pass (146 runtime files, all 11 exact payloads and three original horse clips,
no nested ZIP or live-settings overwrite). No production upload was performed.
