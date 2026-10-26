# Recording-based sequence correction — 26 October 2026

Supersedes the rejected three-still/segmented-TV implementation at `b3dd776`.
Work remains on `arena/24a1daf8-club-website`; PR #5 stays open, unmerged.

## What changed

- Flower: original `animated (96).webp`, source frames 0–39 of 75. Those contain
  the usable face → camera pan → extending hand before the agency outro.
  Bidirectional DIS optical flow generates 157 samples (four intervals per
  source transition plus the final frame), saved at 960×717. No substituted
  woman, generated pose or three-image crossfade. A two-texture WebGL shader
  interpolates the dense samples in response to normal, reversible scrolling.
- The original video has no distinct eye-opening pass or rigged model. Neither
  is claimed or fabricated. Upsampling does not recover detail beyond the
  original 640px screen recording. Flow interpolation can retain/introduce
  motion softness, especially around fingers; this is not reconstructed 3D.
- Baked foreign UI/cursors are locally repaired/relabelled. The palm cards use
  the club's Notice / Connect / Grow copy with responsive DOM typography.
  The recorded hand is not replaced. No unrelated agency outro is shown.
- Horse activation is now the end of the flower sticky track, immediately
  before the horse-backed club introduction, **not after TV**. Reverse scroll
  pauses/hides it; the full TV viewport also pauses the covered background.
  The three existing horse MP4s and later behavior are unchanged.
- TV: all 75 original recorded frames, each a complete 405×384 RGB crop that
  contains the entire CRT casing. No alpha, hull, polygon, chroma-key cutout or
  sprite atlas. Only outer recording edges feather into the matching gray;
  the casing itself is inside the opaque area. Foreign side copy and the
  baked cursor are repaired without cutting out the person. Mouse, horizontal
  touch and previously permitted orientation events scrub all poses. No new
  sound/tilt controls or permission prompts.
- Player: on-screen activation, maximum 20 decoded images/four pending requests,
  nearest-frame hold/poster on unavailable media, request cancellation,
  image-bitmap eviction, hidden-tab suspension and context restoration.
  Canvas2D is used when WebGL cannot be acquired. Reduced-motion, no-JavaScript
  and Data Saver retain the static/readable presentation.
- Butterfly: dark departure now outranks a retained field/action trip; canceled
  action timers cannot pull it back into black. Disconnected targets recover;
  elapsed flight time is separate from the spring timestep. Hidden-tab RAF is
  canceled and pageshow remeasures. Perches clear the header control area.

## Executed validation

- `npm test`: **760 passed, 0 failed**.
- `npm run lint`, JavaScript syntax checks, `git diff --check`: passed.
- `tools/tests/frame-media.py`: all 157 + 75 files decoded; correct dimensions,
  exact original-source SHA-256 provenance, RGB/no alpha, complete counts.
- **Eight real Chromium browser suites passed:**
  `cinematic-chapters`, `first-page-flow`, `butterfly-dark-exit`,
  `butterfly-navigation`, `butterfly-recovery`, `mobile-story-detail`,
  `site-audit`, `story-inputs`.
- Cinematic checks at **390×900, 768×900, 1440×900**: actual WebGL rendering,
  advancing intermediate frames, rapid scroll reversal, 20/4 bounds, real GPU
  context loss/restoration, all three palm cards inside the mobile viewport,
  no pre-end horse requests, immediate moving horse handoff, full TV geometry,
  pointer scrub in both directions, synthetic orientation, horizontal touch
  without vertical-scroll theft, dark butterfly exit, no horizontal overflow
  or page errors. Canvas2D/no-WebGL, no-JS and reduced-motion checks also passed.
- Dedicated butterfly recovery at 390 and 1440: a still-focused field remains
  mounted as a dark viewport appears; butterfly leaves and returns. A pending
  button flight interrupted by dark activates the button exactly once and
  cannot return into the scene from its obsolete timer. Both passed.
- Final screenshots were inspected, including full CRT edges on mobile and the
  mid-camera palm after removing an overbroad source-text blur. The movie/media
  browser suite and RGB audit were rerun after that final asset rebuild.
- Current staged runtime export is validated with `source-export.py`: every
  sequence frame, 15 byte-exact story payloads, all three unchanged horse clips;
  no retired flower/TV atlas media, references, dev tools, private settings,
  backup archives or nested deployment ZIP. Each file is within the existing
  conservative hosting limit.

Local evidence/screenshots/logs and the pre-correction backup are outside the
repository in `/home/user/sequence-review/`, not in the deployment download.
The previous `b3dd776` deployment ZIP is historical, not this correction.

## Limits and rollback

These are local headless Chromium/SwiftShader checks, not physical iOS/Safari,
real-device gyro authorization, production hosting, a measured low-end 60fps
promise, or a claim of flawless motion. No public production URL was supplied.
Core event/payment/PDF/dashboard backend code was not changed.

Pre-correction rollback: `b3dd776`; earlier pre-remodel checkpoint: `8e37e6f`.
Git retains both implementations without bundling their files in the current
runtime archive. Do not reset main, merge/close PR #5 or deploy references.
