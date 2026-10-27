# Flower smoothness / AI clarity / duplicate-text correction

27 October 2026. Pre-correction checkpoint: `5ab6e07`.
Branch `arena/24a1daf8-club-website`, PR #5 open/unmerged; main unchanged.

## Confirmed defects

1. The 12fps/40-frame primary encode provided too few intermediate poses for
   smooth scrubbing. A visible native decoder surface could also expose black
   or play chrome during interrupted seeks.
2. Labels were painted into the video **and** into HTML. The opaque parent
   background and mismatched fade/layout made a dark group slab/duplicate type.
3. The original recording itself contains a lower-left foreign billboard and
   purple arrow. Blurring/darkening a mask did not erase its edges/interior:
   screenshots still showed the box and button. This is distinct from native
   browser controls; both paths are addressed.

## Implemented

- Actual **ESPCN x2 neural-network super-resolution** was run on the recording,
  producing **1280×956** output. No substituted face/poses or image-generation
  service. Motion-compensated FFmpeg interpolation gives **200 encoded frames
  at 60fps**, from the same usable original source frames 0–39.
- H264 fast-start with six-frame keyframe interval, no B frames, CRF18; final
  MP4 is **5,715,474 bytes**, under the existing conservative host file limit.
  The poster matches the enhanced output.
- Model provenance: [TF-ESPCN ESPCN_x2.pb](https://github.com/fannymonori/TF-ESPCN/blob/master/export/ESPCN_x2.pb),
  SHA256 `59f77351e1d7c0057bf6fe088b4a8a07e42c468c8c8aebb674a6b4ea1823221d`.
  Downloaded via GitHub API and executed with OpenCV dnn_superres. Weights are
  outside the repository/deployment; tooling/model identity is recorded.
- Native video is a clipped, invisible decoder with controls disabled. Only
  finished decoded frames are committed to a persistent double-buffered canvas;
  the old good frame remains through seeks. No black decoder surface/play
  overlay is shown. No autoplay, scroll interception or new controls.
- HTML is the single typography owner. Source video and all fallback frames
  have blank card footers, not club labels or tiny foreign labels. Panel group
  background is transparent; cards are lighter individually. Mobile footer
  heights align headings instead of lowering Connect beneath its neighbors.
- Baked billboard/arrow are fully covered inside their boundaries; smooth
  feathering is outside the UI and fades after it disappears from the source.
  This is local background repair, not recovery of hidden original pixels.
- Media fallback starts at the latest requested source position, not frame zero.
  Existing sticky zoom/hand track, reduced-motion/Data Saver handling, immediate
  horse handoff, full TV scene, butterfly navigation and backend are preserved.
- Revisioned URLs for changed media/CSS/scripts and fallback frames ensure the
  deployment selects the matching new renderer/media without user workarounds.

## Executed validation

- **760 tests / 0 failures**, lint, JS syntax and whitespace checks passed.
- **Nine Chromium browser suites passed:** `flower-video`, `cinematic-chapters`,
  `first-page-flow`, `butterfly-dark-exit`, `butterfly-navigation`,
  `butterfly-recovery`, `mobile-story-detail`, `site-audit`, `story-inputs`.
- Flower wheel/touch checks at 390/1440 in normal, reduced-motion and Data Saver:
  visible zoom, sticky track, forward/reverse seeks, moving pixels, held-canvas
  sample brightness during forced flings/reversals (no all-black sample),
  exactly three DOM headings, invisible control-free decoder, blocked-media
  fallback, warm reload, no early horse and no page errors.
- Cinematic checks also cover 768px, no-WebGL/no-JS, full TV pointer/touch/gyro,
  readable cards, horse handoff, dark butterfly behavior and no page overflow.
- Flower/cinematic suites rerun after the final recorded-UI cleanup. Final
  screenshots inspected on mobile and desktop: billboard/arrow absent, one set
  of readable card text, original woman and hand retained.
- `flower-quality.py`: all **200 frames actually decoded**, dimensions/fps,
  no encoded black frame, fast-start, original SHA256, full removal of the
  billboard/arrow footprint through source frame 12; each of the 23 card-bearing
  source frames has row-uniform repaired footers (no baked glyphs).
- `frame-media.py`: all 157 fallback + 75 TV frames decoded, RGB, correct counts,
  dimensions and original-source provenance. TV/three horse files unchanged.
- Runtime export validation retains exact story payloads and original horses,
  excludes models/references/tools/private data/backups/nested ZIPs. Current
  deployment ZIP must be CRC/byte-compared against the committed runtime export.

Logs/screenshots/model/private rollback archive: `/home/user/flower-polish/`,
outside the project. No new framework, production build step or dependencies.

## Limits

Encoded 60fps is not a universal rendering/FPS guarantee. Tests are local
Chromium/SwiftShader, not physical iOS/Safari or production-host testing. Neural
upscaling estimates detail and can introduce texture artifacts; motion
compensation may distort local occlusions. It is not recovered original detail,
a true 3D reconstruction or a new eye-opening pass. Source remains the supplied
640px screen recording; no distinct eye-opening pass was supplied. Main and
core event/payment/PDF/dashboard backend code are untouched.
