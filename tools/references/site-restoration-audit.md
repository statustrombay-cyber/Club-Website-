# Public-site restoration audit — 2026-10-18

Backup before edits: `/home/user/reference-study/before-site-audit.tar.gz`.
Changes belong only to `arena/24a1daf8-club-website`, PR #5. No production
upload, main-branch change, merge or separate deployment ZIP.

## History comparison and repairs

| Area | Finding | Repair / retained behaviour |
|---|---|---|
| Public content | Latest source export correctly excluded live `data/site.json`, but missing-file defaults had empty site/team/events/gallery collections. Local baseline with the existing database did show Contact and leadership; the unavailable live host's exact state is not established. | Versioned, additive public-content recovery from historical club copy. It fills blank identity/contact fields, missing known public records and blank historical leadership fields, while preserving nonblank edits, replacement leaders, existing draft flags and every private registration/submission. |
| Recovery safety | Repeated defaults must not resurrect later dashboard deletions or overwrite student data. | One-time settings marker; shared `.store.lock`; fresh read under that lock; existing timestamped backup before writing. No write without the lock, or over malformed JSON. Unwritable/malformed stores can still display recovered public content in memory. Explicit authenticated backup imports remain authoritative and mark recovery complete. |
| Contact | Home template retained its card, but blank live fields conditionally hid links. Footer genuinely no longer printed the college address. | Restore known email/Instagram/institution defaults, and print the college address, email and Instagram in the public footer. Private pass/verification pages retain the earlier no-address restriction. |
| Core team | All saved content revisions identify Tanisha, President, +91 70460 75606; Mohd Shafiq, Vice President, +91 8104553395. Existing VP image is `/assets/photos/team-mohd-shafiq.jpg`. | Preserve those records and existing uploaded images. Home and member-directory leadership cards use two desktop columns / one mobile column, retaining their distinct photo-top fans. **No Tanisha portrait is present in any saved content revision; no invented face has been substituted.** |
| Historical uploads | Public uploads removed by earlier test-cleanup commits include tiny probe PNGs (one inspected blob is 47 bytes). Payment-proof uploads are private. | Do not blindly republish old test/proof files. Retain the actual club logo as the explicit public testing asset `uploads/club-logo-test.jpg`, with a gallery seed on source-only installations. |
| Calendar | Chip/content lacked top separation; chip sat too close to its paragraph. | Responsive content padding, explicit chip/paragraph gap, a local translucent reading surface (not a page-wide white sheet), and mobile teaser stacking. Remove offscreen intrinsic-width estimates that could widen mobile month cards. All 12 months remain, with a direct Register action inside open-event month cards using the same publication/registration gate. Missing historical Welcome Circle is restored as the editable free sample, with no automatic closing deadline in the seed. Existing event edits/windows are preserved. |
| Essential cards | Scroll-reveal opacity could make a present card look removed while callbacks/GPU work lagged. | Reading content is never opacity-zero while waiting for an observer. Photo fans and other requested decoration remain independent. |
| Navigation | Butterfly capture handler awaited its 320–620ms trip before replaying every internal link. | Start butterfly feedback but let anchors perform native navigation on the original click. Form/button behaviour and download/external/modifier-click semantics remain. |
| Horse video | Old markup had no initial source and `preload=none`; application JS assigned the URL late. Desktop was deliberately paused while the story covered it. | Responsive parser-discoverable MP4 sources, automatic preload, and no resetting the already-selected correct URL. JS still corrects source selection for older browsers/slow connections. Desktop continues playing behind the chapter; mobile retains opaque-cover decoder pausing. Reduced-motion sources do not autoplay, and hidden/error players are paused. Three original MP4 byte streams are unchanged. |
| Desktop scene cost | Unused tunnel construction added objects/material work; previous full-resolution desktop cap was 1.25 DPR. | Retain the hosted PHP allowlist and original hand/camera/shader architecture. Do not instantiate the unused tunnel; cap normal hardware raster at 1 DPR (.85 constrained). Existing software-GPU test caps remain unchanged. No physical-device FPS promise. |
| Printed newspapers | Portraits were still hard to recognise against strong green matcap lighting and small prints. | Re-bake editorial articles headed `The Mindful Tattva Journal`, including larger real Freud/Rogers/James photographs. Portrait prints now occupy 444×385px of 492px-wide sheets. Lighter stock, gentler matcap/wave strength and mipmapped paper textures reduce darkness/shimmer. Original banknote/fact atlases remain byte-identical. These are editorial summaries, not fabricated historical quotations. |
| Depth / ending | Adapter stopped the original paper clock at **.84**, while later sheets remained in front of the camera. | Traverse the full **1.0** source progress. Local screenshots and geometry checks near the end show all paper centres behind the camera with >2.5 source units of clearance. Existing transparent herd crossfade follows, with no extra tunnel or research panel. |
| Post-burn title | Source-site text overlays had intentionally been disabled. | Add the requested **mindful tattva** title only in the post-burn/pre-newspaper beat, using the existing reference-style font. Source advertising/HUD stays disabled; this is not a claim to possess an unavailable original typeface. |
| Splash strip | A stage-size assertion cannot prove physical-browser safe-area/chrome paint. | Slight fixed-edge bleed, largest/dynamic-viewport coverage, safe-area padding, black root/body underpaint, dark colour scheme and matching temporary theme colour during the splash. Restore the normal theme on exit. Native browser chrome outside the page remains browser-controlled. |

## Validation

- **727 unit/PHP checks, zero failures**, including auth/CSRF, dashboard CRUD,
  free/paid registration, payment proof, PDF/pass/CSV, publication gates,
  upload validation and hosted asset delivery.
- New tests exercise the actual recovery write path in an isolated PHP
  filesystem with no live database: full public content returns, the sample
  registration form opens, and no private student records are seeded.
- **157 actual desktop/mobile scene checks**, zero page errors, with direct
  engine/WASM/KTX2/GLB URLs blocked to retain the working PHP delivery path.
- Whole-site browser audit covers 1440px and 390px home/calendar/members/gallery:
  actual visible contact/leadership/form content, native navigation, 12 calendar
  cards, chip spacing, continuous horse frames before/through/after the scene,
  actual post-burn title opacity, paper-depth completion, direct month-card registration, gallery enlargement/close, uploaded-logo access, and no horizontal
  overflow. Screenshots are inspected, not only metadata.
- Viewport/splash regression uses 928/844/754px heights, painted bottom-row pixel
  checks, a touch fling at 2× CPU throttling, stable canvas backing, music near
  the unchanged glass break, silent transparent tail and zero section gap.
- Separate cold-entry/jump, upward-fade/rearm and scene diagnostic suites pass.
  All 14 printed UV islands, three B/W source portraits and original banknote
  checksum pass. Normal diagnostics pass 15 checks and simulated HTML/403
  decoder responses are correctly rejected.
- Lint and staged GitHub-equivalent export are checked before commit: no nested
  ZIP, live data/password overwrite, development tooling or horse replacement.

Logs/screenshots stay outside the repository. These are local headless
Chromium/software-GPU checks, not a production-network, physical Safari/phone,
exact-reference or universally smooth/bug-free guarantee.
