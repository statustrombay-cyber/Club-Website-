# Mindful Tattva — club site

The standalone club site. It grew out of the Cartier Watches & Wonders scrolling
engine that was recovered from a split capture, and keeps that site's editorial
rhythm — a loader that counts, a sideways wall of frames, a scroll-driven 3D room
— with none of its products. It is **separate from the PHP club site** in this
repository and can be deployed on its own.

```
cartier/
  index.html            ← the club site: loader, hero, about, gallery, room link, pillars, visit
  experience.html       ← the room: eight chapters of the club's 3D set
  engine.html           ← forwards to experience.html (old links keep working)
  club-data.json        ← snapshot of data/site.json, used when /api/site is absent
  assets/
    club.css, club.js   ← the club site styles and behaviour
    room.js             ← the 3D room (captured set, one room per chapter)
    vendor/             ← three.js r186, self-hosted (MIT)
    app.js, app.css     ← the captured engine bundle, kept only as reference
    fonts/              ← Bodoni Moda, Inter (both SIL OFL), self-hosted
  images/psychologists/ ← ten temporary portraits used to fill the gallery
  webgl/, audio/, videos/  ← the capture's assets, no longer used at runtime
```

## Run it

```bash
npm run preview:cartier      # http://localhost:4180
```

`tools/serve-cartier.mjs` is a dependency-free static server. It also serves
`/uploads/**` and `/assets/photos/**` from the repository root, so the photos
the club uploads through the PHP dashboard appear in the gallery while the two
sites are still separate.

Deployment: copy this folder (plus `uploads/` if you want the real gallery) to
any static host. `.htaccess` handles MIME types, compression and caching.

## The gallery

The wall holds ten frames, the same number the reference site gave the watches.

1. Every **uploaded gallery photo** (added in the PHP dashboard, visible and with
   an image) fills a frame, in order.
2. Whatever is **still empty** is filled by a temporary psychologist portrait —
   Freud, Jung, Adler, Klein, Bowlby, Pavlov, Skinner, Frankl, Maslow, Rogers —
   each marked `PLACEHOLDER`, so the section never looks bare while the club has
   no photos of its own.
3. When the gallery fills up, the placeholders disappear completely; delete a
   photo and a placeholder comes back in its space. The caption under the wall
   always states the split ("3 photos · 7 placeholders").
4. The header's `mt-club-logo.jpg` starter image is ignored: it is a CMS
   stand-in, not an event photo.

Testing the three states without touching the database:

| URL              | Result                         |
| ---------------- | ------------------------------ |
| `/`              | photos from the CMS snapshot   |
| `/?gallery=0`    | ten placeholders               |
| `/?gallery=3`    | three photos, seven placeholders |
| `/?gallery=10`   | ten photos, no placeholders    |

## The room (3D)

`experience.html` is the club's own room, built from the captured Cartier set
rather than from a procedural scene: `webgl/models/mainScene.glb` supplies the
architecture, the baked light and the figures, and `assets/room.js` stages it.

The export parks seven whole rooms fifty metres below the floor and lifts them
one at a time across a 24.33 s clip, so each chapter isolates one room, brings
the parked assemblies home and frames it with a camera of its own. The clip's
own camera is authored for a 16:9 desktop trailer and looks at bare walls on a
phone, which is why the framing is per chapter.

| # | Chapter | Room |
| - | ------- | ---- |
| – | *Mindful Tattva* — "A room for the mind, a club for the curious" | the panelled entrance |
| i | The room we keep | the hall, a figure turning |
| ii | Small circles of talking | the hall, groups standing |
| iii | Ground we stand on | the standing stones in their cone of light |
| iv | Ten faces on the wall | the stepped wall of forms |
| v | Texts we return to | the reading wall of painted strokes |
| vi | The light we leave on | the quiet room and its lit bench |
| vii | Come and sit with us | the hall from the far side |

The frame is the recorded reference's, matched from the phone capture: SOUND
upper left, the wordmark upper centre, one huge hairline uppercase title with a
short tagline beneath it, EXPLORE under a rule, the chapter dots and a progress
line at the foot, and — on the opening card only — a hairline circle with a down
arrow. Type is measured and scaled to the viewport, so the longest line never
wraps; the same frame is used from 320 px to a desktop, in both orientations.

**Light.** The capture shows a bright hall opening, a long dark middle and a
gold ending, and the build follows it chapter by chapter: a per-chapter exposure
plus a screen-blended air layer over the render. The film pass tone maps
(exposure → ACES → sRGB) *before* the bloom, which matters: Cartier's bloom
threshold is a display-space number, and feeding it linear values both flattened
the highlights and made exposure do nothing.

Grading: the baked lightmaps store irradiance in the red channel only, so they
are collapsed to luminance on a canvas and tinted to the club's warm light
(`#ffc280`, `lightMapIntensity` ≈ 5, `environmentIntensity` 0.22, ACES at 1.35).
The figures in `mainScene_characters.glb` keep their own animations, each played
on a random phase so a room never looks frozen.

Navigation is a single position plus a queue: swipes, trackpad, arrow keys and
the chapter dots all move `want`, and however many gestures land during the
black frame between chapters they are summed rather than dropped, so a run of
swipes in either direction lands exactly where it was asked to and never sticks.

Files: `experience.html` (page, loader, chapter copy), `assets/room.js` (scene,
camera, navigation), `assets/post.js` (bloom, grain, vignette),
`assets/vendor/` (three r186, MIT).

## About the captured Cartier engine

The original bundle (`assets/app.js`) is still on disk as reference but is not
loaded by any page. What the capture settled:

* the GLB carries a 24.33 s `SCENE_01` clip that lifts one room at a time from
  y = −50 to y = 0 and drives an orbiting camera — the staging, the baked light
  and the figures all work once the shell is handled properly;
* the shell (`outside_box_SC0k`) is what used to wash the frame out; hiding it
  and letting each room's own pieces carry their baked light is what fixed it;
* the lightmaps store irradiance in the **red** channel only, tinted `(1, 0, 0)`
  by the original site and summed per material — hence the luminance-collapse
  step in `assets/room.js`;
* the theatre.js project data behind the screen-space light pass, the depth of
  field and the motion blur is referenced by the bundle but not embedded, and a
  HAR capture of the live site does not carry it either (its bodies are
  stripped), so those passes are not reproduced.

## The authored timeline (and where it came from)

Cartier's bundle (`cartier.app.js`) turned out to contain more than code: it
ships the Theatre.js **project state** as a plain object literal. Two small
tools lift the useful halves back out, so they can be read and reused instead of
reverse-engineered:

```bash
node tools/extract-theatre.mjs     # → cartier/theatre/mainScene.theatre-state.json
node tools/extract-shaders.mjs     # → cartier/shaders/*.glsl
node tools/theatre-report.mjs      # → a chapter-by-chapter printout
```

The state is one sheet, `timeline`, 24.51 s long, 18 objects, 70 tracks and 375
keyframes. It drives the things this build could never recover by eye:

| object | what it says |
| ------ | ------------ |
| `currentScene.current` | eight scene windows, stepping at 0, 3.3, 7.3, 11.03, 14.5, 17.47, 20.77, 24.2 s |
| `ui.sceneTitle`, `ui.exploreBttn` | when each chapter's card and button are on screen |
| `camera.fov` | 50°, opening to 60° for scenes 3 and 5 |
| `characters.opacity` | 21 keys — the crowd is not constant, it fades in and out per scene |
| `objectsVisibility[...]` | `dark` and `opacity` per room part (`sc00_room`, `sc04_stairs`, `floor`, …) |
| `glowSphere0…9.alpha` | the ten light blobs: static position/size/colour, animated strength |
| `lightDecal0` | the projected light decal's size, tint `(1, 0.62, 0.27)`, falloff 2.5 |
| `motionBlur.blur` | a one-frame blur kicked at each scene change |
| `loop.forcedDark` | 1 → 0 at the first cut, back to 1 at the end |

`theatre/sampler.js` reads all of that back into numbers (`sampleAt(t)`,
`sampleWindow(a, b)`, `sceneWindows()`), with Theatre's semantics: `hold` keys
step, `bezier` keys ease. The sampler is dependency-free, so it runs in node and
in the browser unchanged.

**What this build actually uses.** `assets/room.js` loads the state, builds the
ten glows from the static overrides, and sets each chapter's strengths from the
state's own curves. Two things it deliberately does not use: the timeline's
camera (the `mainScene.glb` clip is the one that has real camera keys, and it is
authored for 16:9), and `lightDecal0`, whose projected decal is built by
Cartier's own code rather than by the model — `shaders/magic-light.glsl` is its
shader, kept here for reference rather than wired in.

## Rebranding

Nothing in the club pages refers to watches, jewellery, products, a shop, a
soundtrack or the original exhibition. Copy comes from the club's own content
in `data/site.json`. Engine-internal asset names (for example
`santos-de-cartier-1.webp`) keep their original filenames because the bundle and
the filesystem must agree; none of them are visible to a visitor.


## The room — how the look is made

The reference's own pipeline was recovered from the single-file capture
(`cartier-part-000 … 012`, a Chrome SingleFile save of the live page). It is
not one render: it is a composite.

1. **Scene** — the captured set (`webgl/models/mainScene.glb`), materials lit
   by per-scene baked lightmaps (`webgl/textures/lightmaps/LIGHTMAP_SC0*.webp`).
   The light lives in the **red** channel; the site tints each map with
   `lightmapRgb = (1, 0, 0)` and sums up to seven of them per material.
2. **Ambient** — the site's own spherical-harmonic irradiance probes,
   `webgl/textures/cubemaps/SC0k_sh.json`, loaded as `THREE.LightProbe`.
3. **Bloom** — luma prepass at `threshold 0.348758`, `knee 0.47636217`,
   separable blur, composited with a **screen blend** at `0.6`.
4. **Film pass** — spectrum-sampled chroma shift (`0.025`, radius `3`), lens
   distortion `0.04`, vignette (radius `2`, bias `0.5`), grain `0.025`, dither.

`assets/post.js` is a faithful port of steps 3–4; `assets/room.js` handles 1–2.
The screen-space *light pass* (spotlight phase, magic light) and the depth of
field / motion blur passes are not reproduced: they need the theatre.js project
data, which the capture does not contain.

Note: lightmaps arrive with `flipY = false` and must not be colour-managed —
`channel = 1`, `colorSpace = NoColorSpace`, sampled as `uv1` by the shader.
