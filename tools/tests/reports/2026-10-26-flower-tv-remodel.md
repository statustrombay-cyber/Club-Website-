# Flower opening / TV companion / deferred herd — 26 October 2026

## Backup and branch boundaries

The standalone butterfly corner repair was committed and pushed first as **`8e37e6f`**. That is the pre-remodel rollback checkpoint, retaining the previous design plus the butterfly fix. A full Git archive and source/private-settings backup are outside the repository in `/home/user/remodel-review/`. Existing uploaded references remain unchanged in Git. No backup archive is added to the website download. Work stays on `arena/24a1daf8-club-website`, PR #5; main is not modified and the PR is not merged.

## New sequence

1. Retained automatic welcome paint, then a full-screen clean flower portrait with only the existing header/butterfly and no initial hero copy.
2. Native scroll drives the extended-hand composition, then the close hand camera zoom; club eyebrow, heading, introduction, actions and metadata reveal successively. Reverse scrolling reverses the camera/reveals. Invisible actions are inert and cannot catch focus. Mobile toolbar resizing keeps the media plane stable while bringing controls above the live viewport bottom; compact/landscape layouts remain usable.
3. Existing about/cards, brand interlude and original WebGL choreography remain. The former lens wheel and central logo are removed. Lens navigation still reaches `#psychology`.
4. Immediately after the WebGL chapter, a separate solid-grey scene places the TV-headed companion to the left of the existing happiness chart and layer heading. Mouse delta (0.8 sensitivity), horizontal touch and already-permitted orientation events select local reference frames. No new agency words, controls, framework migration or external CDN dependency. Idle/offscreen work stops; reduced-motion/Data Saver use the static character; no-JS retains readable content.
5. Horse MP4 source selection/playback on home is deferred until the entire TV scene has passed. Scrolling back pauses and conceals it again. Later sections, forms and footer keep the original herd treatment. Other public pages retain their existing herd behavior. Story's final underlay is grey instead of prematurely exposing the horse.
6. Butterfly visibly banks out at the brand band; it stays away through the TV scene and cannot be summoned back by tapping that scene. An offscreen grip leaves keyboard navigation. Form companion, drag, typing, menu semantics and slow entry remain.

## Source quality and limits

Both supplied files are 75-frame, approximately five-second **screen recordings**, not clean raw character videos:

- `animated (96).webp`: 640×478; flower scene with baked foreign navigation/cards/cursor.
- `animated (46).webp`: 640×474; TV scene with baked agency copy/cursor.

The flower runtime uses **three AI-cleaned, reference-derived keyframes** with reversible camera transforms/dissolves. This is a clean cinematic reconstruction, **not** recovered high-resolution footage, newly rigged 3D arm animation, or a claim that new fine detail existed in the recording. The TV is the actual recorded character, isolated with matting and edge geometry; only 42 clean recorded poses are resampled into 75 scrub steps, excluding cursor-overlap poses rather than blurring its face. Three 2025×1870 atlases stay below mobile texture-size limits. Clean runtime media is local and prebuilt; Python/OpenCV are development tools only. There is no new gyro permission prompt; physical Safari permission availability cannot be guaranteed from emulation.

## Verification

- `npm test`: **760 passed, 0 failed**. Superseded wheel/horse-first assertions replaced by current scene-order/gating checks; backend/PDF/upload/security coverage retained. Test-only expired sample normalization never changes live event dates.
- `npm run lint`, JS syntax check and `git diff --check`: **PASS**.
- All seven final actual-Chromium suites passed serially: `cinematic-chapters`, `butterfly-dark-exit`, `butterfly-navigation`, `first-page-flow`, `mobile-story-detail`, `site-audit`, `story-inputs`.
- New cinematic checks at 390/768/1440px verify decoded images, actual changing screenshots, empty initial copy, hand-before-copy, reversible camera, native menu, real pointer/touch and simulated sensor-driven frame changes, solid TV background, no horse MP4 request before TV exit, playback after exit, pause/hide on reverse, away butterfly after a scene tap, no horizontal overflow, no-JS and reduced-motion readability. Additional 320×640 and 844×390 checks plus toolbar shrink verify visible action buttons.
- Existing suites verify mobile/desktop story render/camera/paper traversal/audio/input, menu layouts 320–1440px, butterfly dragging/cancellation/fields, splash timing/peel checks, calendar expiry, gallery/lightbox, public content and native navigation. No reported page errors.
- Screenshots personally reviewed for mobile/desktop flower opening/reveal and isolated TV/graph. Logs/screenshots remain outside Git in `/home/user/remodel-review/validation` and adjacent `.log` files. These are Chromium/emulated touch/sensor tests, not physical phone/FPS guarantees.

The GitHub-equivalent export is checked using `tools/tests/source-export.py`: required local cinematic media, original three horse videos and all 15 byte-exact story payloads must remain; root reference WebPs, development tooling, private live settings and backups must not be exported.
