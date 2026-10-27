# Flower video / butterfly clarity correction — 27 October 2026

Supersedes the primary flower implementation at `ee833aa`. That commit remains
available as the pre-correction checkpoint; its validation report is historical.
Branch: `arena/24a1daf8-club-website`; PR #5 stays open, unmerged.

## Failure paths found

The previous implementation collapsed the flower to one viewport in reduced
motion and disabled its frame player for reduced-motion / Data Saver. This
reproduces the static portrait → next section experience, although the user's
exact device settings were not supplied. Normal playback also depended on
many separate image requests, with dense optical-flow frames and texture
blending that could soften moving details. Passing earlier scripted scroll
checks did not establish that these other paths worked as the user expected.

## Correction

- Primary flower playback is now **one 1,705,595-byte H264 MP4**, made from the
  original 40 usable camera/hand frames, 640×478 at 12fps. Fast-start metadata;
  every frame independently seekable. No optical-flow synthesis or frame
  crossfading in this primary path. Foreign cursor/UI repair remains local.
- Real wheel/touch scrolling seeks the native decoder. First comes an explicit
  close-in zoom, followed by the original recorded pan and extending hand.
  The 4.8-viewport sticky track is not collapsed by reduced-motion or Data Saver.
  Reduced motion removes extra zoom/easing; seeking follows deliberate scroll,
  not autoplay. No wheel trapping, forced navigation or new video controls.
- Seeks coalesce to the latest requested position. Already-loaded cached media
  is shown immediately, including events that occurred before script startup.
  Existing errors, unsupported media, or a seek stuck for four seconds enter
  the bounded frame fallback; the poster remains present during loading.
- Native primary playback creates no flower WebGL context/frame-fetch queue.
  The existing 157 samples remain a runtime media-error fallback, not the main
  video. TV's full RGB frames and the original WebGL story are unchanged.
- Butterfly: removed the three per-image blurred shadows; one small neutral
  parent shadow, normal blending, no color filter, non-overlapping wing clips
  and an independent center body. No change to its original photo's colors.
- Horse transition remains immediately after the flower track.

## Executed checks

- `npm test`: **760 passed, 0 failed**. Lint, JS syntax and diff whitespace pass.
- **Nine browser suites executed and passed:** `flower-video`,
  `cinematic-chapters`, `first-page-flow`, `butterfly-navigation`,
  `butterfly-recovery`, `butterfly-dark-exit`, `mobile-story-detail`,
  `site-audit`, `story-inputs`.
- New actual wheel/touch regression at **390×900 and 1440×900**, each in normal,
  reduced-motion and Data Saver modes: native decoded video, retained sticky
  track, explicit normal-mode zoom, forward/reverse seek, no early horse,
  no page errors. Forced MP4 failure successfully displayed moving fallback
  frames on the same pinned track. Warm reload also passed. This suite was
  rerun after the final cached-readiness and stalled-seek safeguards.
- Cinematic checks additionally cover tablet 768px, full TV/pointer/touch/gyro,
  horse handoff, no horizontal overflow, no-WebGL, reduced and no-JS paths.
- MP4 independently decoded: exactly **40 frames, 640×478, 12fps**, `moov`
  before `mdat`. Source identity is the same recording, not another woman.
- Screenshots inspected at actual face/camera/hand positions, including the
  butterfly over the flower background. Logs/screenshots and pre-correction
  archive live in `/home/user/flower-fix/`, outside the deployment repository.
- Runtime export checked with `source-export.py`, including the new MP4,
  all fallback/TV frames, 15 exact original story payloads and the unchanged
  three horse clips. Reference recordings, development tools, private live
  settings, backups and nested ZIPs remain excluded.

## Limits

The recording itself is 640px and includes motion softness; removing added
interpolation does not invent higher-resolution detail. No distinct eye-opening
pass or rigged 3D model is supplied or claimed. Local headless Chromium tests
are not physical iOS/Safari, actual sensor permissions, production-host or
universal smoothness/bug-free guarantees. No public production URL was supplied.
Core event/payment/PDF/dashboard backend code was not changed.

Rollback: `ee833aa` (previous sequence: `b3dd776`, pre-remodel: `8e37e6f`).
Only the authorized branch may be pushed; do not merge/close PR #5 or change main.
