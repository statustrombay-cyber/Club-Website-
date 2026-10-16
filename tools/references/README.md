# Motion study — current recording only

The club uploaded `screen-20261015-174326.mp4` in commit `f11a32d`.
It is 66.50 seconds, 720 × 1600, 16,469,423 bytes. Its checksum and storage
location are in `recording.json`.

**The recording lives outside this repository**, at
`/home/user/club-motion-reference/reference-20261015-174326.mp4` in the Arena
workspace. The superseded 50.81-second recording has been deleted. Neither
recording is a website asset or included in the deployment ZIP. Root screen
recordings and reference video files are also export-ignored in source archives.
The club's horse film and its two optimised renditions are unrelated public
assets and remain intact. Old Git commits still contain their historic uploads;
we do not rewrite the branch's history to change past downloads.

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

## Locally derived assets (third motion review)

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
  asset hashes are in `wire-motion.json`. Corresponding `-still.webp`
  files serve no-script, reduced-motion, hidden and offscreen states.
- `reference-ribbons.webp`: a temporal 12th percentile across 37–39.5s removes
  the moving white wordmark; local repair removes the stationary caption. The
  current cleanup smooths observed strand contours, fills small internal black
  holes and brightens the blue/violet strokes. Continuity healing is restricted
  to the left side; speculative right-side joins were rejected. Deliberate dark
  spaces between ribbons and the black canvas are retained. Phone chrome is
  excluded and a premultiplied alpha matte blends the field without rectangular
  edges. This is a small derived background image, **not a recording**, and not
  invented sinusoidal artwork; occluded original pixels are not exactly known.
- `intro-word.svg`: filled Inter glyph contours with individually clipped,
  connected centre-line brush masks. The **n** paints stem → arch → stem, rather
  than exposing a detached crescent from the closed outline. A violet lead,
  white pigment and settled fill preserve solid lettering; the i dot follows
  its stem. Contours derive from bundled OFL Inter, not recovered original font
  files. The name is not assembled by sliding strips. A single central seed
  blossoms into seven rings before the word settles. The normal intro is only
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

The derived motion WebPs total 1,931,382 bytes, below the 2.2MB regression budget.
The gathering/manifest chapter is 300svh (was 270svh); the separate closing
band is 150svh (was 240svh). Reduced-motion and no-script layouts stay unpinned. Full reference footage remains
outside the repository, deployment and source exports. Original horse media is
unchanged. Visual comparisons remain necessary: passing workflow tests does not
certify pixel-perfect reproduction of the original site's unavailable sources.

### Verification — 16 October 2026, current revision

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
