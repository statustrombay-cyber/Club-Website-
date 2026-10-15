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

- 0–1.9s: small, fine, rotating seven-circle mark on a dark, scattered starfield.
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

## Locally derived assets (second motion review)

The video cannot supply original vectors, fonts or 3D models. Nothing was
uploaded to a vector-conversion service. All analysis was local:

- `assets/motion/wire-{orbit,prism,sphere}.webp`: transparent, antialiased
  silhouette loops cropped from the three capsules at 59–63 seconds. Capsules
  are normalised to 164 × 110; their original border/background is excluded.
  The observed poses replace the rejected invented 3D geometry. These are **2D
  animation cutouts, not recovered 3D models**. Matching start/end poses choose
  3.50s / 2.95s / 2.00s loops, sampled at 20fps. Corresponding `-still.webp`
  files serve no-script, reduced-motion, hidden and offscreen states.
- `reference-ribbons.webp`: a temporal 12th percentile across 37–39.5s removes
  the moving white wordmark; local inpainting retouches the stationary caption.
  Phone chrome is excluded; a premultiplied alpha matte removes the source
  canvas so its edges blend without a rectangular patch. This preserves observed blue/violet colour and
  ribbon curvature, not invented sinusoidal lines. It is a small background
  image, **not a recording**; the caption occlusion cannot be recovered exactly.
- `intro-word.svg`: Inter's actual filled glyph contours, clipped to each
  letter and brush-painted with a violet lead and white pigment. Contours are
  derived from the bundled OFL Inter font, not extracted from the recording.
  The name is not assembled by sliding strips or revealed with noise.
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

The derived assets together are under 0.7MB. Full reference footage remains
outside the repository, deployment and source exports. Original horse media is
unchanged. Visual comparisons remain necessary: passing workflow tests does not
certify pixel-perfect reproduction of the original site's unavailable sources.

### Verification — 15 October 2026

- `npm test`: **495 passed, 0 failed**, including the executed butterfly,
  silhouette lifecycle, marquee-speed and layout-change controllers.
- `npm run lint` and `git diff --check`: passed.
- Headless browser: **53 checks passed** across 320/390/768/1440px, plus
  reduced-motion and no-JavaScript. Checks cover entry/perch, repeated rapid
  dark-section crossings, gradual departures, offscreen-only hiding, actual
  decoded animations, measured marquee speed, no horizontal overflow and no
  frame-to-frame teleport or browser/asset error. Geometry measurements activate
  content-visibility sections first so intrinsic placeholders are not mistaken
  for the final page layout.
- Visual review includes intermediate paint frames, header landing, all three
  capsules and the closing band. These are fidelity checks, not a claim that
  the original unavailable font/vector/3D source has been recovered.
