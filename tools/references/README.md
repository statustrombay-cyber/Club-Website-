# Motion reference studies — never runtime recordings

The club uploaded `screen-20261015-174326.mp4` in commit `f11a32d`.
It is 66.50 seconds, 720 × 1600, 16,469,423 bytes. Its checksum and storage
location are in `recording.json`.

The recording is not in the current runtime tree. Temporary external study
copies are not durable backups; its original committed Git blob is the recovery
source. Neither this recording nor the superseded recording is a website asset
or included in deployment ZIPs. The club's horse film and its two optimised
renditions are unrelated public assets and remain intact. Old Git commits still
contain their historic uploads; no history rewrite is needed.

## New HD hand/glass/burning-paper study

The eleven 1080×2400 parts from source commit `83b6645` were reviewed in order.
See `zero-hd-manifest.json` for exact hashes, timings, paths and Git recovery IDs,
and `story-credits.md` for the reconstruction, font licences and psychology
sources. The root clips are removed from the working tree and export-ignored.
Runtime assets are compact cutouts/illustrations plus procedural canvas/CSS,
not full-frame recording playback. The original wires below remain unchanged.

## Frame measurements and sequencing

The mobile content viewport is 720px wide, beneath the phone's
status/browser bars. Do not copy the browser chrome into the website.

- 0–0.8s: dark scattered starfield, then one small central circle.
- 0.8–1.6s: satellites emerge from that seed into the seven-circle flower.
- 2.04–3s: solid white letter fragments expand from the mark. Not a stroked
  outline of the entire word. Adapt the ring to the final **a** of mindfultattva.
- 3–3.5s: complete name, then dissolve into the public website.
- 8–10s and the slower repeat at 53–56s: separated circles gather; the flower
  turns, grows slightly and rises. White outlines stay legible as size changes.
- 10.5–14s and 56–58s: the five-line composition enters from below as well as
  from the right. It continues upward with the scroll, not pinned in one spot.
  The three wire objects have real changing depth, not flat-plane flips.
- At 11.5s: ControlYour ~535px wide; white display type ~95px; Mind begins
  around x51. Capsules ~163 × 110px. Manifest is a muted italic serif; Your is
  inset around x184; the last capsule begins around x163. On phones these are
  viewport-relative measurements, not fixed desktop pixels.
- 36–40s: near-black canvas covered by broad blue/violet flowing ribbons.
  Ribbons become thicker to the right; they are not uniform hairline strands.
  The caption is ~51px and moving wordmark ~184px in the 720px viewport.

Inter Regular is bundled locally as a visually calibrated reference face; the
recording does not identify the original site's font files. Libre Baskerville
Italic supplies the serif accent. Both retain their OFL licences. Scroll
positions are reconstructed from visual frames: the recording has no raw
wheel/touch-event log, so elapsed playback seconds are not a universal scroll
speed. Club wording, public horse-backed hero and functional safeguards remain
unchanged. No reference footage is embedded into the public site.

## Locally derived assets (third review, plus reliability follow-up)

The video cannot supply original vectors, fonts or 3D models. Nothing was
uploaded to a vector-conversion service. All analysis was local:

- `assets/motion/wire-{orbit,prism,sphere}.webp`: transparent, antialiased
  silhouette loops cropped from the three capsules at 59–63 seconds. Capsules
  are normalised to 164 × 110; their original border/background is excluded.
  The observed poses replace the rejected invented 3D geometry. These are **2D
  animation cutouts, not recovered 3D models**. Fixed crops and shared page-
  translation correction avoid independently resizing each frame. The current
  derivatives are 328 × 220, displayed at 164 × 110: shared 2× edge reconstruction,
  alpha sharpening/lift and lighter strokes improve legibility without changing
  silhouettes or poses. Upsampling does not recover unavailable source detail. Matching poses choose 3.500s / 2.042s /
  2.042s loops at 24fps (84 / 49 / 49 frames). The third is the recorded full
  graticule, not an invented wire model. Decoded timings, seam measurements and
  asset hashes are in `wire-motion.json`. Corresponding `-still.webp` files
  remain as source stills. Their PNG derivatives are now embedded once per
  object in the HTML, so static/no-script/reduced-motion silhouettes do not
  depend on a WebP HTTP request. Animations are preloaded and decoded before
  replacing a visible still. Failed requests/decodes permanently retain the
  per-object fallback; visibility changes cannot retry broken animations.
- `reference-ribbons.webp`: a temporal 12th percentile across 37–39.5s removes
  the moving white wordmark; local repair removes the stationary caption. The
  reliability follow-up redraws the complete observed strand centre-lines,
  with smoothed widths/opacity and a normalized blue/violet colour field. This
  removes embedded dark scars rather than painting patches over them. One
  caption-interrupted strand is joined by matching tangent/order; two damaged
  strands and one surviving fragment are reconstructed between intact
  neighbours. Occluded geometry is an interpolation, not recovered pixels. Deliberate dark
  spaces between ribbons and the black canvas are retained. Phone chrome is
  excluded and a premultiplied alpha matte blends the field without rectangular
  edges. This is a small derived background image, **not a recording**, and not
  invented sinusoidal artwork; occluded original pixels are not exactly known.
- `intro-word.svg`: filled Inter glyph contours with individually clipped,
  brush masks. The **n** now uses three joined filled reveal regions (stem →
  arch → stem), not a round-capped stroke that can touch the arch early. A violet lead,
  white pigment and settled fill preserve solid lettering; the i dot follows
  its stem. Contours derive from bundled OFL Inter, not recovered original font
  files. The name is not assembled by sliding strips. A single central seed
  blossoms into seven rings before the word settles. The separate floating
  last-letter flower is removed; the initial mark dissolves in place instead
  of shrinking and travelling across the letters. The normal intro is only
  0.3s shorter (6.15s CSS / 6.5s safety fallback); taps, keys, wheel and touch do
  not skip it. The background is inert/locked until exit. Fragment links and
  reduced-motion preferences bypass it; no-script has an automatic CSS exit.
- Portrait/album images have a restrained double heartbeat (2.8s), while the
  surrounding text cards stay still. Two observed fan designs alternate: a dark
  hexagonal six-sector badge and white badge with six rounded dark petals.
  Only their inner fan rotates. These SVGs are reconstructed from observation,
  not recovered source vectors. Member cards avoid paint containment so the
  corner badge is not clipped. Reduced motion disables these animations.
- Information reveals use 1.2s opacity / 1.5s upward movement with a short
  stagger, not abrupt card zooming. The calendar container is transparent while
  each month retains its own card. `#join` resolves to `#membershipForm`, with
  content-visibility placeholders resolved before alignment; late font/load
  callbacks are cancelled when the visitor starts interacting.
- White-glyph phase correlation at y720–870 gives −118.075 px/s (37→38s),
  −118.035 px/s (38→39s). The marquee uses **118.05 / 720 viewport widths/s**;
  its duration is computed from its measured half-track width after fonts load
  and on resize. At 390px, this is approximately 63.94px/s. Global ribbon-field
  displacement over the same interval is below 0.05px; extra CSS sway is removed.

The butterfly is independent of this source: a single continuous RAF trajectory
uses a 6.4s gentle ascent, a stable perch above the bar (4px minimum at the viewport edge), exponential reading-progress
follow, a 320ms dark-section dwell and ≥2.8s leftward departure. Direction
reversals start at the current position and tangent, without CSS opacity changes
until the butterfly is fully offscreen. The mobile menu has reserved clearance.

All files in `assets/motion` total 2,062,055 bytes, below the 2.2MB regression budget.
The gathering/manifest chapter is 300svh (was 270svh); the separate closing
band is 150svh (was 240svh). Reduced-motion and no-script layouts stay unpinned. Full reference footage remains
outside the repository, deployment and source exports. Original horse media is
unchanged. Visual comparisons remain necessary: passing workflow tests does not
certify pixel-perfect reproduction of the original site's unavailable sources.

### Previous verification — 16 October 2026, `f15a593`

- `npm test`: **536 passed, 0 failed**. Includes real PHP validation for
  membership names/email/Indian phone numbers and normalized phone storage;
  five executed anchor-controller regressions; non-skippable intro behavior;
  all previous event/registration/payment/import/restore safeguards; actual
  WebP frame counts, dimensions, timing, infinite-loop flags and reviewed hashes.
  Motion URLs remain content-versioned.
- `npm run lint`, browser JavaScript `no-undef`, and `git diff --check`: passed.
- Real HTTP deployment workflow: **66 checks passed**. Authenticated/public
  gates, anonymous forged-cookie rejection, free/paid registration, screenshot
  upload, passes, CSV, gallery, membership and logout.
- Actual browser workflows: **43 checks passed**. Clicked Add/Save/Delete,
  changed publication state, saved/reloaded December; uploaded and decoded
  event, member, gallery and logo images; submitted membership and free/paid
  registrations; verified screenshot-gated paid PDF issuance and exact
  “Payment received” confirmation; downloaded PDF/CSV/JSON; opened/closed a
  full-size gallery photo; verified isolated logo saving; imported the exported
  backup and checked every private pass hash and event ID survived. Public
  internal links and fragment targets resolve correctly. No JavaScript errors.
- Browser visual/navigation/fallback audit: **41 checks passed** at
  320/390/768/1440px. Includes input that cannot skip the splash, central seed
  then seven-ring bloom, automatic exit, stable direct membership-form landings
  from calendar/gallery on desktop/mobile, transparent calendar wrapper, all
  three 2× wire images decoding, no horizontal overflow, slow reveal timings,
  uncut alternating fan badges, actual photo heartbeat and reduced-motion /
  no-JavaScript fallbacks. Intermediate **n** paint frames and closing-band /
  wire screenshots were visually reviewed, not only the final word.
- Decoded loop seam alpha changes remain within each loop's normal frame-change
  envelope. These are diagnostics, not proof of original 3D or exact pixels.

The original business data was restored **byte-for-byte** after verifying that
only audit metadata/default normalization changed. Seven fixture uploads were
removed only after checking their exact paths and content hashes; audit-time
backups were removed separately. Existing club content and all horse media are
preserved. Neither source nor deployment exports include the reference video.
Passing tests does not establish pixel-perfect reproduction of unavailable
original vectors, font files or 3D models.

## Reliability follow-up — 16 October 2026, current revision

- **554 automated tests passed.** Added real PHP role-driven chart rendering,
  new core-card fan rendering, whole-font Helvetica metrics, bounded long-token
  wrapping/fitting, slow/failed wire preloads, unsupported-SVG API protection,
  and single-copy embedded PNG delivery. Existing backend safeguards retained.
- **66 HTTP workflow checks passed again** after restarting with the current
  PHP source. **52 actual browser workflow checks passed**: event creation,
  save/reload/publication, poster upload, membership, free and paid registration,
  screenshot gating and confirmation, private PDFs, payment verification, CSV,
  event/member/gallery/logo uploads, photo expansion, isolated logo save,
  JSON backup import retaining every private pass hash and event ID, and all
  public internal links/fragment targets.
- **25 visual/navigation/failure-path checks passed.** Desktop/mobile animation
  seeks, non-skippable intro, direct Join landings, actual animated (not merely
  static) wire decoding, intentional HTTP 404 and corrupt-image responses,
  deliberately held animation requests, real timed intro exit, reduced-motion /
  no-script behavior and overflow checks. Ten sampled **n** frames (390/1440px,
  2.4–4.1s) each contain one connected white painted component, not a detached
  crescent. The same ten-frame check also passes for the initial **m**; its
  filled stem/arch regions avoid the same detached curl, and the central mark
  is fully gone before white letter painting begins. Screenshots of the graph, waves, wires, fallback and fans reviewed.
- Happiness chart now has two flowing unnumbered lines, with the live President
  and Vice President travelling upright back and forth on separate paths.
  Images come from the same team data as the cards; absent/failed photos leave
  an MT frame. No fabricated measured scores. Reduced motion and no-script
  leave static markers. Three added core members were checked for automatic
  dark/white/dark fan alternation; the President's fan is raised to 42px.
- PDF review uses an independent MuPDF renderer, not just source-string tests.
  Actual free/paid PDFs and current-source long/extreme fixtures are single A4
  pages. Checked text against margins and the QR frame, all terms inside their
  coloured box, and successfully decoded the QR with OpenCV. Normal and long
  pass images were visually reviewed. Helvetica AFM advances replace the
  partial width estimate; holder/meta/title/fact/footer fields are fitted to
  bounded regions; oversized tokens wrap. Extreme content beyond allotted rows
  uses explicit ellipses; full submitted data remains in the registration store.
- JS syntax/no-undef, PHP lint and diff whitespace checks passed. Original club
  data restored byte-for-byte after checking for unexpected edits. Removed only
  ten known, hash-verified fixture images and 23 new audit-time backups; no bulk
  sweep of user uploads. Source/reference video remains outside the website and
  exports; the three public horse MP4s remain unchanged.

## Latest delivery and separation audit

- Full-resolution wire loops retain their recorded poses, frame order and
  41/42 ms frame delays. Each now has an embedded 112×76 APNG counterpart:
  84 orbit frames, 49 prism frames and 49 sphere frames. These play while the
  external WebP is loading and continue after request/decode failure. Only
  offscreen, hidden-tab, no-script and reduced-motion states use the stills.
- `python tools/verify-motion-assets.py` (Pillow required) decodes every APNG
  frame and compares its quantised alpha to the corresponding downsampled
  WebP frame, including timing. `--build-inline` regenerates these assets.
  The inline animations total 144,481 bytes before HTML base64 encoding;
  all motion assets together remain below the existing 2.2 MB budget.
- The violet field has 45 continuous strands. Their centre lines retain
  the source-guided flow, with laminar ordering and a Euclidean clearance
  envelope to prevent crossings and touching strokes. Negligible alpha
  values (≤5/255) are trimmed so even invisible antialias bridges cannot join
  neighbours. The same audit counts **45 eight-connected components at every
  positive alpha**, rather than relying on one screenshot.
- Whole sections and all homepage card geometry no longer use
  `content-visibility:auto`. Before this change,
  the mobile closing chapter moved from y=11,714 to y=16,815 as skipped
  sections were laid out during scrolling. Dark chapters also use
  `overflow:clip`, which confines their paint without breaking native sticky
  positioning. A distinct full-page black overlay was not reproduced in the
  local Chromium investigation; do not describe that symptom as conclusively
  diagnosed. Check normal-motion desktop and phone scroll boundaries too.

Final normal-entry Chromium audit (no fragment, standard motion preference):
the closing chapter stayed at y=16,815 on a 390px viewport and y=13,665 on a
1440px viewport across 11 forward/reverse scroll positions each: **zero layout
drift**. No visible full-viewport fixed dark overlay was present at those
positions. The 91 visual/lifecycle checks additionally sampled changing rendered
pixels for every wire at both widths under normal, 404, corrupt and held-up
external requests; photos/menu/overflow were checked at 320/390/768/1440px.

## Current implementation: explicit frame playback (supersedes APNG delivery)

Compared `8efe53e`, `a9175ab`, `c9886a4` and `890c220`. The early versions
switched animated WebP/still sources through a per-capsule IntersectionObserver;
the later versions added decode gates and APNG fallbacks. Local normal-browser
movement was observed, but the user's repeated freeze report was not reproduced
as a proven native-decoder bug. The playback architecture has therefore been
replaced, rather than presenting another source-swap fallback as a diagnosis.

Current playback uses static full-resolution WebP atlases plus embedded compact
PNG atlases. One requestAnimationFrame clock draws the exact recorded poses on
three canvases, with the original rounded 24fps boundaries. No native animated
image, per-wire intersection observer or source swapping controls playback.
Whole-chapter visibility and document visibility govern the shared clock.
Reduced-motion/no-script/unsupported-canvas cases retain embedded silhouettes.
Full-atlas failures keep the embedded static atlases playing. Promotion does not
reset elapsed time. `verify-motion-assets.py` compares every atlas tile with the
original full-resolution/quantised-alpha source pose; those developer-only
sources now live under `tools/references/wires/` and are excluded from deployment.

Notice/Connect/Grow now form a progressive-enhancement sticky deck: three pop-in
entrances, then Notice, Connect and Grow fly away individually as scrolling
advances. Reverse scrolling reconstructs the stack. Reduced-motion, no-script,
short viewports and text too large to fit retain readable ordinary cards.
Intrinsic card measurement excludes decorative pseudo-element overflow, avoiding
resize-driven card-height growth.
