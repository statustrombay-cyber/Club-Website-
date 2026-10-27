# Restore pre-flower opening; retain TV; repair butterfly / input

27 October 2026. Authorized branch `arena/24a1daf8-club-website`, PR #5.
Pre-restoration rollback: `1772002` and private archive outside repository.
Requested pre-flower reference: `8e37e6f`.

## Restoration scope

- Hero markup/art/copy, announcement/banner/header behavior, CSS base, original
  welcome opening, horse startup/playback/recovery and original story underlay
  restored from `8e37e6f`. Horse player function and entire hero markup are
  compared byte-for-byte against that checkpoint in the cinematic regression.
- `assets/story.js`, `assets/story.css`, `assets/audio.js`, original story
  markup, card choreography, story payload manifest and all three horse MP4s
  independently byte-compared to the same backup: exact matches.
- Exception retained as requested: complete TV man after the story beside the
  happiness graph, instead of restoring the old central lens wheel. All 75
  opaque recorded frames and the full CRT remain unchanged.
- Flower removed from HTML/CSS/runtime, including all generated flower media,
  metadata, fallback frames and obsolete executable builders/tests. Historical
  reports/designs remain in Git; references/rollback are not deployment assets.
- No event/payment/PDF/dashboard backend or live-data changes.

## Butterfly repairs

- TV is no longer a dark/departure zone. Original brand/closing dark exits and
  immersive story concealment remain unchanged.
- Story → visible TV triggers a short 650ms re-entry rather than waiting for
  the long ordinary return/departure. Browser checks require a visible butterfly
  within 1.5 seconds and settled by 2.5 seconds; it remains through TV interaction.
- Retained-field and pending-action dark interruption safeguards preserved.
  Removed targets are detected by a child-list observer; no idle field companion
  can remain pinned to a disconnected input waiting for another scroll.
- A drag-follow check exposed lag under busy rendering. Direct held manipulation
  now follows the latest mouse/finger position rather than a delayed spring;
  release retains its smooth return. Navigation/drag suite rerun and passed.
- Existing hidden-tab/pageshow/canceled-action guards and header clearance kept.

## TV pointer / gyro repair

- First cursor movement maps absolute x to 0–74, rather than requiring an old
  mouse position and accumulating tiny deltas. Horizontal touch uses displacement
  from the recorded starting frame and does not cancel vertical scroll.
- Tilt is absolute and orientation-aware, including portrait/landscape; invalid
  or null readings are ignored. Device orientation and absolute-orientation
  events supported. Brief pointer priority prevents simultaneous sensor/cursor
  updates fighting over a pose.
- Explicit interaction is no longer disabled by reduced-motion / Data Saver.
  Frames start at the requested pose, not an unrelated initial frame.
- No new permission prompt or control. **Physical sensor input still requires
  browser/OS permission and available hardware**. JavaScript cannot manufacture
  denied events. Sensor validation here is simulated, not physical-phone testing.

## Executed validation

- `npm test`: **760 passed / 0 failed**; lint, JS syntax and diff whitespace pass.
- **Eight Chromium suites passed:** `cinematic-chapters`, `first-page-flow`,
  `butterfly-dark-exit`, `butterfly-navigation`, `butterfly-recovery`,
  `mobile-story-detail`, `site-audit`, `story-inputs`.
- Cinematic at 390, 768, 1440: original hero and moving horses at opening, no
  flower nodes, real story-boundary immersive state, prompt visible butterfly
  re-entry, no TV disappearance, all 75 frames, cursor both directions, synthetic
  gyro ±20°, null safety, mobile horizontal touch without page-scroll theft,
  no page errors or horizontal overflow. Direct input additionally passed in
  reduced-motion, Data Saver and simulated landscape orientation.
- Butterfly suite covers 320–1440 menu widths, actual captured mouse/touch,
  offset grabs, canceled/lost capture, keyboard drag, links/actions, form typing,
  reduced-motion and no-JS menu. The initial lag assertion failed under load;
  implementation changed to direct held follow, then the full suite passed.
- Recovery checks at 390/1440 include retained focused field → dark, pending
  button action → dark (exactly once), and removing a focused companion target
  without scrolling. All recover and return.
- Media audit: all 75 TV frames decode as 405×384 RGB without alpha, exact count
  and source SHA256. No TV/horse image/video bytes changed in this restoration.
- Original welcome/splash first-screen checks, story detail/inputs, public routes,
  membership/calendar/gallery behavior and backend tests also passed.
- Screenshots reviewed: restored classic horse hero and visible butterfly over
  the full TV on mobile/desktop. Evidence: `/home/user/tv-restore/` outside repo.
- Runtime export requires all TV frames and original story payloads/horses and
  rejects any flower media; references/tools/private settings/archives remain
  excluded. Current downloaded GitHub ZIP is CRC/byte-compared to this runtime.

## Limits

Local Chromium/SwiftShader and simulated gyro events are not production hosting,
physical Safari permission validation, a measured universal FPS guarantee, or
an assertion that every possible bug is eliminated. No live production URL was
supplied. Only the authorized branch is pushed; main remains untouched and
PR #5 remains open/unmerged. Runtime hosting needs no new dependencies/build.
