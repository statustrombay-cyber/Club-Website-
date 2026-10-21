# Mindful Tattva — club site

The standalone club site. It grew out of the Cartier Watches & Wonders scrolling
engine that was recovered from a split capture, and keeps that site's editorial
rhythm — a loader that counts, a sideways wall of frames, a scroll-driven 3D room
— with none of its products. It is **separate from the PHP club site** in this
repository and can be deployed on its own.

```
cartier/
  index.html            ← the club site: loader, hero, about, gallery, atrium, pillars, visit
  experience.html       ← the atrium: the scroll-driven 3D room
  engine.html           ← forwards to experience.html (old links keep working)
  club-data.json        ← snapshot of data/site.json, used when /api/site is absent
  assets/
    club.css, club.js   ← the club site styles and behaviour
    atrium.js           ← the 3D room (procedural scene, authored camera, scroll)
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

## The atrium (3D)

`experience.html` is a scroll-driven room that belongs to the club. It is not a
patched product page, and it does not download a model: the hall, the arch
springs, the bench, the basin and the field of dunes are generated in
`assets/atrium.js` at load time, so the whole scene is one module, one three.js
build and ten photographs.

What happens as you scroll:

| Scroll | Camera | Chapter |
| ------ | ------ | ------- |
| 0.00 – 0.14 | through the entrance arch | *The Atrium* (title) |
| 0.15 – 0.28 | into the room, right wall | i, The Room |
| 0.29 – 0.39 | down the centre aisle | ii, Conversations |
| 0.40 – 0.50 | turned to a portrait | iii, The Reading Room |
| 0.54 – 0.69 | along the wall of faces | iv, The Wall |
| 0.72 – 0.87 | out through the last arch | v, The Field |
| 0.89 – 1.00 | rising over the dunes | vi, Visit |

The camera is a keyframe path keyed to *progress*, not to a spline parameter, so
each chapter's framing is authored. Ten portraits (the same temporary set the
gallery uses) hang on the walls; the frames, walls, lamps and dune colours are
drawn from the site palette. A WebGL2 check falls back to the plain text page if
the browser has 3D switched off, and `prefers-reduced-motion` removes the drift.

Files: `experience.html` (page, loader, chapter copy), `assets/atrium.js`
(scene), `assets/vendor/three.module.js` + `three.core.js` (MIT).

## About the captured Cartier engine

The original bundle (`assets/app.js`, `webgl/`) is still on disk but is no longer
loaded by any page. It was examined at length before building the atrium:

* the GLB carries a 24.33 s `SCENE_01` clip that lifts one room at a time from
  y = −50 to y = 0 and drives an orbiting camera — that part works;
* its materials load correctly (albedo 1K, baked lightmaps 2K, environment EXR),
  but every environment surface renders flat white: the room shell, the sky and
  the floor all resolve to the clear colour, so only the watches were ever lit;
* the camera sits inside the room shell, so hiding the shell leaves white and
  hiding the sky leaves white — the "half a field" the club complained about.

Repairing that shader stack inside a minified bundle was the alternative; the
atrium takes the other route the brief allowed — keep the scroll journey, remove
the watches, and fill the space with work we can author and test. `engine.html`
now forwards to it. The capture's `webgl/`, `audio/` and `videos/` folders can be
deleted whenever the reference is no longer wanted (they are ~85 MB).

## Rebranding

Nothing in the club pages refers to watches, jewellery, products, a shop, a
soundtrack or the original exhibition. Copy comes from the club's own content
in `data/site.json`. Engine-internal asset names (for example
`santos-de-cartier-1.webp`) keep their original filenames because the bundle and
the filesystem must agree; none of them are visible to a visitor.
