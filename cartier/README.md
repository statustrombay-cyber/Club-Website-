# Mindfultattva — Watchmaking Experience (reconstructed)

The **Cartier Watches & Wonders 2026** scrolling WebGL site (as captured in
`cartierfile1–5.rar` + `cartier-part-000…012`) rebuilt as a self-contained,
brand-free build for **Mindfultattva**.

Everything the original experience needs is served locally: the Three.js engine
bundle, the four signature watch models, the scene models, DRACO + Basis
decoders, HDR cubemaps, lightmaps, transition masks, LUTs, audio beds, videos
and every responsive stage image.

```
cartier/
  index.html          ← page shell + runtime config (LANG / CDN_URL) + boot screen
  .htaccess           ← SPA rewrites, MIME types, compression (Apache hosts)
  assets/
    app.js            ← the experience bundle (7 MB, rebranded)
    app.css           ← styles + self-hosted, open-licensed fonts
    fonts/            ← Bodoni Moda (display), Inter (UI), Quicksand (condensed)
    favicon.svg
  webgl/
    models/           ← mainScene(.glb), mainScene_characters, watches/{desktop,mobile}
    textures/
      cubemaps/       ← HDR environments (*_oct.exr + *_sh.json spherical harmonics)
      lightmaps/      ← baked lighting, 2K desktop / 1K mobile
      masks/          ← MSDF transition masks per watch
      floor_MR.webp
    libs/draco/       ← draco_decoder.wasm + draco_wasm_wrapper.js
    libs/basis/       ← basis_transcoder.{js,wasm}
    luts/watches/     ← .3DL colour grades per watch
    global/           ← noise, spectrum, gradient and mask helpers
  images/             ← podcast carousel (LD/HD + masks), stage blocks, shapes
  audio/              ← theme beds, UI click sprites, podcast bed
  videos/             ← film preview / film
```

## Run it

```bash
npm run preview:cartier          # http://localhost:4180
# or, directly:
node tools/serve-cartier.mjs 4180
```

`tools/serve-cartier.mjs` is a dependency-free static server: correct MIME types
for `wasm / glb / exr / ktx2 / webp`, byte-range support for the film, and
`index.html` fallback so deep links such as `/roadster` work on refresh.

Deployment: copy the **contents of `cartier/`** to any static host (or the
domain root on Apache — the bundled `.htaccess` handles the rewrites). No PHP,
Node or database is needed on the server.

## What was rebuilt, and how

* **Source**: `cartierfile2` (engine bundle, CSS, fonts, audio, images, videos,
  draco, LUTs), `cartierfile3` / `cartierfile4` (desktop watch + character
  models), `cartierfile5` (cubemaps, lightmaps, masks, floor), and the
  mobile `.glb` files that were already in this repository.
* **AEM host page → `index.html`**: the original markup is AEM + analytics
  (Contentsquare, DoubleClick, Medallia, UserWay, LinkedIn, TikTok …). Only the
  part that boots the experience was kept: the `#__nuxt` mount point plus the
  `window.__NUXT__` runtime config (`LANG`, `CDN_URL`, `baseURL`). A boot screen
  and a no-WebGL fallback page were added.
* **Files that were mangled by the downloader were repaired.** Several archives
  came back UTF-8-encoded (mojibake), which breaks binary formats:
  `crash_desktop.glb`, `roadster_desktop.glb`, `santos_desktop.glb`,
  `mainScene_characters.glb`, `baignoire_desktop.glb` and all 13 `.exr`
  cubemaps were byte-recovered and validated (glTF header/`JSON`+`BIN` chunks,
  OpenEXR header/offset table).
* **Re-generated assets** (the originals were missing from the capture, or came
  back as Adobe's "No Content" placeholders):
  * the responsive `images/productPages/**` sets (7 stages × 4 chapters) built
    from the site's own artwork, at the exact aspect ratios the loader expects;
  * podcast HD thumbnails + soft `images/podcasts/masks/*_mask.png`;
  * 1K mobile lightmaps derived from the 2K masters;
  * `audio/global/{mainTheme,podcastTheme,sprites}.wav` and
    `audio/podcasts/podcast.wav` — procedurally generated, loopable beds
    (the captured MP3s were partial fragments);
  * the film and chapter videos (the captured MP4s were partial fragments; the
    club's own film assets are used, so nothing 404s).
* **Licensed fonts replaced.** The original Brilliant Cut / Fancy Cut faces are
  proprietary and two of them were truncated downloads. The UI now uses
  **Bodoni Moda** (display), **Inter** (interface) and **Quicksand** (condensed),
  all SIL Open Font Licensed, self-hosted in `assets/fonts/` with their licence
  texts.
* **Rebranding**: the header wordmark and menu emblem are now typographic
  “MINDFUL TATTVA” marks, brand names in the copy read *Mindful Tattva* /
  *MINDFUL TATTVA*, external `cartier.com` / `.cn` links and the social handle
  point nowhere (`#` / `@mindfultattva`), and analytics/streaming hosts are not
  contacted. Engine internals (`santos-de-cartier-1.webp`, `cartier-prive.webp`,
  collection slugs) keep their original names because the bundle and the
  filesystem must agree.

## Notes

* The site needs **WebGL 2**; without it a static fallback with the chapter links
  is shown instead of a blank screen.
* First load is heavy (≈110 MB of models, HDRIs and stage images), exactly like
  the original. Compression (`mod_deflate`) and long cache headers for
  images/fonts/models are enabled in `.htaccess`.
