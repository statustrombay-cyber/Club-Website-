# Mindful Tattva — club site

The standalone club experience, built on the scrolling engine recovered from the
Cartier Watches & Wonders capture. It is **separate from the PHP club site** in
this repository and can be deployed on its own.

```
cartier/
  index.html            ← the club site: loader, hero, about, gallery, pillars, visit
  engine.html           ← the original 3D journey, kept intact but not linked into
                          the club page (see "About the 3D journey" below)
  club-data.json        ← snapshot of data/site.json, used when /api/site is absent
  assets/
    club.css, club.js   ← the club site styles and behaviour
    app.js, app.css     ← the engine bundle and its styles (used by engine.html only)
    fonts/              ← Bodoni Moda, Inter (both SIL OFL), self-hosted
  images/psychologists/ ← ten temporary portraits used to fill the gallery
  webgl/, images/, audio/, videos/, club-data.json …  ← engine assets
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

## About the 3D journey

The original experience is a WebGL walkthrough (`engine.html`). Its rooms, desert
dunes, cliffs and figures are in the model, but in the captured build the camera
sits inside an invisible box and only the floating watch products are ever lit —
the environment stays switched off, and with the watches hidden the canvas is
empty white. The club site therefore does not depend on it: the rooms and the
desert can be brought back as a later layer once that scene is repaired, and
`engine.html` is kept as the reference for that work.

## Rebranding

Nothing in the club pages refers to watches, jewellery, products, a shop, a
soundtrack or the original exhibition. Copy comes from the club's own content
in `data/site.json`. Engine-internal asset names (for example
`santos-de-cartier-1.webp`) keep their original filenames because the bundle and
the filesystem must agree; none of them are visible to a visitor.
