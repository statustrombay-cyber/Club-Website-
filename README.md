# Mindful Tattva — psychology club website

The official website of **Mindful Tattva**, the psychology club under the
**Department of Applied Social Science** at Chhatrapati Shivaji Maharaj University,
Panvel.

The site is a small, self-contained **PHP application**: a public website, a
photo album with a full-frame viewer, event registration with UPI payment and a
downloadable event pass, and a password-protected club dashboard where the team
edits everything — no build step, no database server, no framework.

For **InfinityFree uploads**, follow [Full GitHub ZIP upload](#full-github-zip-upload--existing-infinityfree-website)
below. The `npm` commands in the local-development section are **not** hosting
installation steps.

## Current home-page sequence (26 October 2026)

After the retained welcome paint, the opening is a clean flower portrait, an
extended hand and a scroll-driven zoom reveal of the club's own copy. The
original WebGL story follows the brand interlude. A separate grey TV-head
companion scene sits beside the happiness chart; the old lens wheel/logo is
removed. Only after that companion scene does the unchanged horse background
start, continuing behind the later sections, forms and footer. Scrolling back
into the companion or opening hides and pauses the horse again.

The three flower images are **AI-cleaned, reference-derived keyframes**, not a
recovered higher-resolution version of the original recording or a new rigged
3D film. The TV character is isolated from the supplied `animated (46).webp`,
using only clean recorded poses and three bounded local sprite atlases. Its
frames respond to mouse movement, horizontal touch and orientation events that
the browser already permits. No additional gyro permission prompt is added;
iOS sensor behavior depends on its existing permission. Reduced motion and
no-JavaScript visitors retain readable content and a static character.

The standalone butterfly corner fix / **pre-remodel rollback checkpoint is
`8e37e6f`**. Previous designs remain in Git history, not duplicated inside the
website download. The uploaded reference WebPs, tools, rollback archives and
private live settings are excluded from GitHub's deployment ZIP. Runtime media
is already built; hosting does not need React, Vite, Python or a new build step.

---

## Running it

### On this machine (no PHP installed)

The project ships a small preview server that runs the very same PHP
application through WebAssembly, so you can see and edit the real site from a
plain Node.js install:

```bash
npm install     # once — installs php-wasm (PHP 8.4)
npm run preview # http://localhost:4173
```

### On any normal PHP host (recommended for the real launch)

```bash
php -S 0.0.0.0:4173 index.php
```

or drop the folder into `public_html` on shared hosting / Apache. Requirements:
**PHP 8.0+** with the standard `json`, `session`, `fileinfo`/standard image
functions. Nothing else.

| Page | Address |
| --- | --- |
| Public website | `/` |
| Photo gallery | `/gallery` |
| Club calendar | `/calendar` |
| Club dashboard (backend) | `/dashboard` |
| Deployment check | `/health` |

**The club password** is stored as a bcrypt hash in `data/config.php` — never in
plain text and never in this file. Change it any time from *Dashboard → Backups
& settings → Change the club password*. Forgotten it? Delete the
`admin_password_hash` line from `data/config.php` on the server and set a new
password from the settings panel (or set the environment variable
`MT_ADMIN_PASSWORD`).

---

## Deployment (uploading to the live server)

### Full GitHub ZIP upload — existing InfinityFree website

**No server JavaScript, Node.js, Java, Composer or Three.js installation is
needed.** PHP serves the prebuilt files; the visitor's browser runs the animation.
Use the normal GitHub **Code → Download ZIP** workflow; no second/nested ZIP is
needed. The current fixes are on branch **`arena/24a1daf8-club-website`** (PR #5,
not merged into `main`). Select that branch before downloading. The ZIP contains
only the deployable website and its instructions—not the uploaded Cartier/RAR/ZIP
references, development tools, package manifests, or repository housekeeping files.
GitHub adds one outer repository folder automatically; upload the **contents** of
that folder, not the folder itself.

1. Back up the existing website through your hosting file manager first.
2. In InfinityFree, check **Accounts → your account → Domains → your domain →
   Manage → Directory Status**. Use the exact directory shown there; it may be
   `htdocs` or a domain-specific `your-domain/htdocs`.
3. Extract/upload the **contents inside GitHub's outer repository folder** into
   that directory. `index.php` and the **root** `.htaccess` must be directly in
   the domain's website directory, alongside `app/`, `views/` and `assets/`:

   ```text
   htdocs/
     index.php
     .htaccess          ← root website rules, NOT app/.htaccess
     scene-check.php
     scene-assets.php
     app/
     assets/
     views/
     data/              ← keep the existing live folder and its files
     uploads/           ← keep the existing live folder and its files
   ```

   Do **not** leave everything one level deeper in
   `htdocs/Club-Website--arena-…/`. Do not delete the existing site folders before
   uploading. Show hidden files so the correct `.htaccess` is included. Remove
   the uploaded ZIP after extraction; don't leave a source archive public.
4. Overwrite the supplied code/assets, but keep live `data/` and `uploads/`.
   GitHub archives now omit `data/site.json` and `data/config.php`, so a normal
   full re-upload cannot replace the saved records or club password. They also
   omit development tooling (including the >1 MB development-only scene source)
   and package manifests; these remain in the Git repository. All required
   production scene payloads and **all three horse MP4s remain included**.
5. Open **`/index.php?scene-check=1`** on your domain. This uses the existing PHP
   entry point without depending on rewritten URLs. It checks browser WebGL2,
   WebAssembly/workers and the actual scene downloads against byte counts and
   SHA-256 hashes. Then open **`/#human-story`** to check the animation itself.
   The older `/scene-check.php` address remains supported too.

For a **fresh installation**, the archive intentionally has no saved club data
or password settings: additionally copy `data/site.json` and `data/config.php`
from the repository into the new private `data/` folder **once**. Never do this
when updating an existing live site. No installation script resets live data.

### InfinityFree 403 Forbidden

`https://errors.infinityfree.net/errors/403/` is a shared hosting error page,
not the address of the file that failed. It does **not** mean JavaScript needs
installing. Save the original URL you entered/requested before the redirect.

- If **`/index.php` itself** is denied, check the exact domain directory and
  file placement above, lowercase `index.php`, folder permissions **755** and
  file permissions **644**, and any root/account-level access restrictions.
  Do not use 777. An access denial before PHP runs cannot be fixed by changing
  the animation code or installing browser libraries on the server.
- Use the repository's **root** `.htaccess` in the website root. The
  `app/.htaccess` and `data/.htaccess` files deliberately deny direct access;
  do not copy them into the website root or remove their private protections.
  Do not enable directory listing as a workaround.
- If the page opens but the **scene** fails, run
  `/index.php?scene-check=1`. All eleven packaged scene assets now use
  `/index.php?scene-asset=…`, on the same domain. Nothing calls an external
  asset server or requires direct WASM/KTX2/GLB delivery.
- Allow this website's JavaScript and cookies in the browser. InfinityFree's
  mandatory browser security can reject automated/cross-domain tools, so a
  failing external fetch alone is not proof that a normal browser is blocked.
- If `/index.php` still redirects to 403 with the correct files, directory and
  permissions, ask InfinityFree support to identify the rule denying that
  **original URL**. No repository change can turn off their account-level
  firewall; do not disable security protections or expose private folders.

Host documentation:
- [403 causes and website directory checks](https://forum.infinityfree.com/docs?topic=58664)
- [Browser security and same-domain requests](https://forum.infinityfree.com/t/browser-security-system-features-and-limitations/49353)
- [File-size limits](https://forum.infinityfree.com/t/why-are-my-files-deleted-after-uploading-them/49310)

The prebuilt engine and PHP payload chunks stay below the published 1 MB
PHP/JS file limit; the `.htaccess` files stay below 10 kB. No new deployment ZIP
is generated or committed for this upload workflow.

### If the site ever looks blank or colourless

One possible cause is that **`assets/app.css` is not on the server**, so the
browser receives raw HTML with no styling — and the pictures in `assets/` are
missing for the same reason. The `assets` folder itself often exists but is
empty, because the upload of its *contents* never finished (slow image
transfers over FTP are the usual culprit).

To fix it: upload the complete `assets/` folder — `app.css`, `app.js`,
`manage.css`, `manage.js` and the `img/` and `photos/` folders — then reload `/health` until it is green. Two safety nets mean the site
never looks broken while that is pending:

- if `assets/app.css` cannot be read, the app serves a small built-in baseline
  stylesheet instead of leaving the page unstyled;
- if `assets/app.js` cannot be read, the page drops its `js` class, so the
  reveal animations can never leave content invisible.

---

## What the site does

- **Public website** — hero, about, the psychology lens, club details, history
  timeline, events, calendar, gallery, core team, two registration forms and
  contact details, with the original drifting bubbles and orbit artwork.
- **The herd** — the club's own horse footage plays behind every public page,
  pinned to the window and muted, with the bubbles drifting over it and a warm
  film of paper over the reading. It is cut from the three clips the club
  uploaded: 19 seconds, four locations — the white horse leading the golden
  herd, the black horse galloping through snow, the stampede through water, and
  the brown herd on the grass ridge. The slow stretches are cut out and the
  joins decode clean.
  - It is **enhanced for the screen**: each shot trimmed exactly (not by
    keyframe), scaled to **1440×960** with Lanczos, given one light unsharp
    pass, and encoded once at CRF 20 / `veryslow` — about **twice as sharp
    where it actually lands on a 1600-px window** as the 1080×720 master it
    replaces, and lighter on the wire: 9.9 MB instead of 12.1 MB
    (`assets/media/horses-running.mp4`). A still
  frame (`horses-running-poster.jpg`) sits in the same place and is always
  there: if the clip cannot play, or the visitor asked for less motion or is on
  a metered connection, the still frame simply stays and the page is never
  blank.
  - It runs **continuously** — nothing pauses it while the page is open — and a
    watchdog checks about once a second that its clock is still moving: a stall
    gets a nudge first, and a quiet reload if that was not enough. A reload
    **carries on from the second the clip stopped** instead of snapping back to
    the start, and a stall the browser reports itself gets the same treatment
    straight away, so the herd can never be caught frozen on screen.
  - The herd runs behind **every public page** (home, gallery, calendar,
    members, register, pass and verify). Nothing is a solid wall: each block
    paints a thin film of its own paper and the horses move behind it. The film
    is dense in the middle column, where the words are, and opens at the outer
    edges, where there is nothing to read. Every value was measured against all
    sixteen frames of the loop at its hardest pixels: body text holds 8.4:1 and
    the softer grey 4.6:1 in the reading column, the cards and panels 5.5:1 or
    better, cream text on the dark blocks 6.8:1. The film is lighter than it
    was at first (0.87 → 0.80) because the club asked to see more of the herd;
    the softer grey (`--ink-soft: #57504c`) and the small-caps labels
    (`--terracotta-ink: #74452f`) were deepened at the same time, so nothing
    reads worse than it did on solid paper — the labels improved.
  - The club's own area stays plain: the dashboard and the sign-in page have
    their own shell and no video behind them.
  - The server hands it out as `video/mp4` with **byte-range support** (a real
    `206` with `Content-Range`), which browsers — Safari above all — require
    before they will play or seek it.
- **Photo gallery** — one flat album, no categories: a photo is a caption and a
  **display order** (order 1 leads, order 2 follows), and the same list is what
  the slideshow turns through. A caption appears only when the club typed one,
  and clicking any photo opens it full size in the photo frame (Escape, the ✕
  or a tap outside closes it).
  - The album turns on **both** pages: the home page carries the same stage as
    `/gallery`, written by PHP first so the photo is on screen before any script
    runs, and the little frames under the caption move the stage by hand.
  - **No photo is ever cropped**, and none can read as a block of flat colour:
    the picture is drawn whole, over a softened, slowly drifting copy of itself
    filling the frame. A square crest and a wide photograph both look like
    pictures. The strip below the home stage appears once there is more than one
    photo to fill it.
- **The moving pieces** — the club asked for a site that keeps moving without
  ever hiding a word:
  - the circle of words in the psychology lens sits at the **left** of its
    column, far enough in that neither golden ring nor the **small planets**
    riding them can leave the screen (it used to be pushed right, which cut it
    at the left edge on a narrow screen);
  - **each planet is locked to its own ring.** A ring and the planet that rides
    it are the same box — same width and height, centred the same way, at the
    same angle, turning at the same speed in the same direction — so the planet
    travels exactly along the ellipse. (An `auto` margin cannot centre a box
    wider than its circle: it collapses to nothing, and the planet ends up
    orbiting *beside* its ring. That was the bug; the numbers are asserted in
    the tests.)
  - one **golden line runs the height of the club timeline** — through the
    beginning, our why and the next chapter — with a light travelling back and
    forth along it, and the dots keep a slow golden heartbeat;
  - a thin band of the club's own words (**mind · body · connection · …**)
    drifts past under the hero — four copies side by side, sliding exactly one
    copy across (a quarter of the track), so the loop has no seam on any screen
    width;
  - a **gold bar across the top of the window** shows how much of the page is
    read, the top bar frosts a little once you have scrolled, and a **way back
    up** appears once the page has been read a bit;
  - a golden streak crosses the hero now and then, the hero's words arrive one
    line after another, a soft light crosses the filled buttons on hover, the
    photos breathe in slightly under the pointer, a sheen crosses the lens cards
    on hover, the softened copy behind every photo drifts slowly, and the
    drifting bubbles and the scroll-linked gold thread are unchanged.
  - It is all CSS, so a visitor who asked for **less motion** sees the site
    still, and nothing here can cover a word.
  - The club's own area is untouched by all of it: the dashboard and the sign-in
    page render their own body, so no gold bar and no floating pill ever appear
    over the club's work.
- **Event registration** — one form per event. The club sets the venue, the
  date, the fee and the registration window in the dashboard; the form reads all
  of it back.
  - A **registration window** is set per event: either a number of hours
    (1–24) or an “until this date” cut-off. When it runs out the form closes on
    its own and late attempts are refused.
  - When the event has a **fee**, the form shows a **UPI QR code** (built from
    the UPI id the club typed) and the student must **upload a screenshot of the
    payment** before the pass is issued.
  - Every registration gets a **pass serial** (`MTP-YYYY-NNNN`) and a private
    pass link. The pass is a **PDF** with the holder, the event, the venue, the
    fee, the payment state, the serial, a QR code and the entry rules — payment
    proof *and* pass are required at the door.
  - **No refunds**, except when the club cancels an event: then the fee is
    returned within 24 working days. That rule is printed in the form and on the
    pass.
  - The **pass PDF** is one A4 page, written by hand — no library, no extension.
    The university's logo and its campus address stand at the **top left**, the
    club's name is **centred** on the header band, the club crest sits at the
    **top right**, and the university's mark appears again at the **foot with
    the campus address** beneath it. The QR code has a framed corner of its own
    with the facts to its left; tests walk every string in the PDF and fail if
    one lands inside that frame, and check that the name and the pass label
    share one centre line.
  - The pictures go in without GD, Imagick or zlib: the club crest as JPEG
    (`/DCTDecode`), the university mark as a PNG whose own IDAT stream is handed
    to the PDF with PNG predictors (`/DecodeParms << /Predictor 15 … >>`). A
    mark that cannot be read leaves its space empty rather than breaking the
    pass; a picture with transparency is shipped as a print copy without alpha
    (`assets/img/university-logo-print.png`).
- **Club dashboard** — overview, site copy, statistics, team, events, gallery
  photos, the **event register** and the form inbox, plus JSON export/import and
  one-click backups. Everything the public site shows is edited from here.
  - The register lists every registration per event, with its pass serial, and
    marks which passes are ready. Payments can be verified or cancelled, a
    cancellation triggers the refund note, and rows can be deleted.
  - **Download the register as CSV** (`/api/registrations.csv`) — one row per
    registration, every pass serial included, for matching at the gate.
- **Backups** — every save writes a timestamped snapshot to `data/backups/`, so
  any change can be reversed. Import/export keeps a copy outside the server too.

The member roster lives inside the dashboard only: the public site never lists
club members' phone numbers or e-mail addresses.

---

## Project layout

```
index.php              front controller (every request enters here)
app/                   PHP application
  bootstrap.php        config, session, CSRF, logging, sanitising helpers
  store.php            JSON store: data/site.json + revisions + backups
  api.php              the JSON API used by the dashboard and the public site
  pages.php            page routing, asset inlining, ETag/gzip responses
  cards.php            reusable markup (tiles, cards, forms)
  health.php           deployment check: every design file, present or missing
views/                 templates: layout.php, dashboard.php, public/*.php
                       (public/health.php is the /health page — self-contained,
                       it needs no stylesheet or script of its own)
assets/                app.css, app.js, manage.css, manage.js, images
assets/media/          the home page's herd: horses-running.mp4 + its still
data/                  site.json (content), config.php (password), backups/
uploads/               photos uploaded from the dashboard
tools/preview-server.mjs      local runner for machines without PHP
tools/make-deploy-bundle.mjs  builds deploy-bundle.zip for the live server
tools/test.mjs                automated checks over pages, API, security, forms
```

### Before a deploy: walk the real thing

```bash
npm run preview                        # or any running copy of the site
node tools/deploy-check.mjs            # in a second terminal
```

`tools/deploy-check.mjs` signs in with the club password and walks every real
workflow against the running site the way a person would: create an event, edit
it, register a student, open the pass, verify it with the club's QR link,
download the register as CSV and the backup as JSON, run a **paid** event
(register, upload the payment screenshot, watch the serial appear only then,
mark the payment verified), upload and caption a gallery photo, file it under
an event, recaption it, submit the membership form — then delete everything it
made and confirm it is gone. It prints a line per check and exits non-zero if
anything fails. Point it at the live site once the bundle is uploaded:

```bash
node tools/deploy-check.mjs https://your-new-domain.example
```

Before an audit, snapshot `data/site.json`, the existing upload paths and any
backups. Afterwards remove only the run's identified records and fixture files;
restore the pre-audit content after checking for unrelated edits. **Stop the
preview before restoring disk files**, because its PHP filesystem is mirrored.
Do not bulk-delete unreferenced uploads: they can still belong to the club.
The old `tools/clean-test-data.mjs` sweep is not recommended for real content.

Two notes for the launch:

- The club area **reads** (the register list, the CSV download and the backup
  download) are protected by the session alone, because the dashboard fetches
  them with ordinary links and a link cannot send a header. Anything that
  **writes** still needs the token, so a stray page cannot change the club's
  content.
- A paid pass is issued when the student uploads their payment screenshot —
  that is the club's rule, and the club then verifies the payment. A student
  who pays in cash has no screenshot to upload, so the club cannot issue that
  pass from the dashboard today. A club-side "issue the pass" button can be
  added on request.

## Development

```bash
npm test          # runs the PHP app and regression checks in isolation
npm run lint      # load one PHP file in that runtime and print why it will not
```

For the optional decoded motion-asset audit (Python 3 + Pillow), run
`python tools/verify-motion-assets.py`. It checks every fallback frame/time and
verifies that all 45 violet strands remain disconnected, including faint edges.

The test suite boots the real application, then exercises pages, the JSON API,
sign-in, CSRF protection, sanitising, uploads, the whole registration →
payment → pass → PDF flow, registration windows, CSV export, password changes
and backups — the same paths a browser would take.

## Notes for the launch

- Change the dashboard password before going live.
- Keep `data/` and `uploads/` writable by PHP (both ship with `.htaccess` files
  that block direct web access to the data folder and disable script execution
  in the uploads folder).
- To take a snapshot at any time: *Dashboard → Data → Download backup*, or copy
  `data/site.json` and the `uploads/` folder.

### Complete install versus small update

- `node tools/make-deploy-bundle.mjs Club-Website-deploy.zip` makes the complete
  runtime package, including all three public horse MP4s. These videos alone
  are 15,664,029 bytes (about 15.7 MB); ZIP compression cannot substantially
  shrink already-compressed MP4s. They are intentional media, not test files.
- `node tools/make-deploy-bundle.mjs Club-Website-update.zip --update` makes a
  smaller **update for an existing installation**. It reuses precisely those
  three unchanged MP4s, includes every other current runtime asset and all code,
  and leaves existing `data/`, `uploads/` and media intact. Do not delete the
  installed folders before extracting. This is **not a fresh-install package**.
- Original recorded wire loops are development inputs under
  `tools/references/wires/`, not deployed assets. The live site plays static
  frame atlases with an explicit canvas clock, rather than native animated-image
  playback. Run `python tools/build-wire-atlases.py` to rebuild them (Pillow).
- The unused older butterfly image and obsolete wire APNG/still-WebP derivatives
  were removed. Both packages exclude tools, references, dependencies, backups,
  test files and the external design recording.

The optional real-browser motion regression is `node tools/test-motion-browser.mjs`
(with `playwright-core` and `@sparticuz/chromium` installed for development).
Start the preview first. It checks changing canvas pixels for all three wires,
primary-sheet failure/hold/wrong-size paths, no-IntersectionObserver playback,
card order/reverse scrolling, resize stability, overflow and reduced-motion.
`MT_BASE_URL`, `CHROME_EXECUTABLE_PATH` and `MT_SCREENSHOT_DIR` are optional.
These browser dependencies and tools are not included in deployment packages.

### HD-reference psychology story and butterfly interactions

The homepage continues **after the existing rings/wire chapter** with a
scroll-reversible WebGL hand/glass scene, irregular refractive research shards, four burning Freud
American-dollar-style art notes, the “this club, focuses on Humans” typography, and torn illustrated
psychology newspapers. At the end the drawing clears to the original running
herd; the classic opening and the remainder of the club site are unchanged.

- `views/public/mind-story.php` contains the actual accessible copy, original
  editorial archive and expandable primary-source research notes. The 6.86%
  figure describes questionnaire scores from two gratitude studies (n=283,
  low-certainty evidence), **not measured club outcomes or a personal guarantee**.
- `assets/story.js` is the small DOM-ready/lazy loader. The committed local
  `assets/vendor/story-3d.js` bundle contains Three.js and the scene; no CDN or
  Node build is needed on the PHP host. Source is in `tools/story/`. Rebuild with
  `npm ci && npm run build:story` (pinned Three.js 0.186.1 / esbuild 0.28.2).
- **Latest correction:** the generic XR hand is removed. Eight caption-free
  painted poses from the user's HD reference now sit on a shallow relief mesh,
  preserving the original baked artwork/light. A single eased rise/strike replaces
  finger/time/pointer wobble; no tilt sensor or tilt/sound buttons are present.
- Glass uses a **vertical scroll**; the camera advances inward during the four
  curling/burning Freud dollar props and the subsequent paper flight instead.
- 52 phone / 76 desktop pages are independently thrown/tumbled at random
  positions and depths, not placed around an evenly spaced corridor. Each page
  can release 24 long strips progressively from left to right, with independent
  rotation/gravity/curl. Nearby pages pass over/beside the lens.
- The high-specificity global paper-film CSS is explicitly excluded from the
  chapter, including desktop gradients. Scroll-space is locked in pixels at
  startup; mobile visual viewport events resize the drawing, not the document.
  Canvas backing dimensions are only reset on genuine size changes, within the
  same animation frame that redraws them, avoiding transparent/white flashes.
- Engine/font fetches are parallel; prewarm starts in the preceding wire chapter
  and decoded atlases upload individually before first use. The generic rig,
  PMREM environment and its startup rendering cost are gone. The local bundle is
  about 602 KiB, not a remote CDN dependency. Save-Data/reduced motion/missing
  assets/WebGL failures still fall back to actual readable HTML.
- **Only the glass-break sound remains.** No gallop, score, loops, sound button,
  stored mute preference, orientation listener or permission prompt. A trusted
  pointer/key/touch gesture unlocks Web Audio where permitted. The crash follows
  the first rendered broken-glass frame; if playback is blocked/not decoded at
  that instant it is skipped, not replayed later. Browser autoplay rules still apply.
- Hand-pose editing/provenance is in `tools/references/bake-hand-poses.py` and
  `story-credits.md`. The Freud prop and Rogers/James portraits are illustrative
  artwork, not authentic banknotes/historical newspaper facsimiles.
- Source-site extraction research, the original developer's technical case study,
  extension/HAR instructions and a body-only CDP capture tool are documented in
  **`tools/references/reference-capture.md`**. The sandbox cannot perform a full
  browser capture of the reference host. No original editable scene or private
  source is claimed recovered. Source clips stay outside the runtime/deployment.
- Bodoni Moda and Pinyon Script are locally hosted **OFL-licensed stylistic
  matches**, not an assertion that the original site's unidentified fonts were
  recovered. Both notices are shipped in `assets/fonts/`.
- The photographic butterfly retains its slow initial ascent/header flight.
  An ordinary primary link/button click takes a short turn-and-dive before the
  original action. Modifier clicks, named targets, external links, downloads
  and print controls retain native behaviour. A 620ms timer releases the action
  if rendering is paused. Reduced motion skips the dive.
- Membership/event inputs get a left-side companion with independent wing
  flaps on input, deletion and backspace. It flies between fields, releases an
  offscreen field before dark chapters, and returns if that still-focused field
  comes back into view. Validation precedes submit dives. A per-form lock blocks
  repeated AJAX submits; errors restore the original button and feedback.
  Payment proof remains a revalidated **native multipart upload**, preserving
  the CSRF token, filename and file contents.

Run `node tools/test-story-browser.mjs` with the preview running and the optional
browser dependencies installed. It checks PNG screenshots of actual WebGL output, burn-away,
reverse scroll, herd reveal, mobile/desktop forms, duplicate suppression,
action ordering, native uploads, modifier links, failure fallbacks, glass-only decoded audio, absence of removed controls, vertical glass versus
forward money travel, and chapter-end geometry stability. These
are Chromium emulation checks, not a substitute for physical iPhone/Android QA.
`MT_STORY_GROUP` can select `audio`, `story`, `fallback`, `forms`, `navigation` or `upload`;
the default runs everything. The same `MT_BASE_URL`, `CHROME_EXECUTABLE_PATH` and
`MT_SCREENSHOT_DIR` options apply. All write endpoints in this browser audit are
intercepted, so no audit members, passes or proof files enter the real store.

**Rollback / recordings:** the pre-story working source checkpoint is
`bfab92b847132c2757b1999705c0f2015f1d9933`. The local ignored
`.rollback/before-zero-story-bfab92b.zip` was CRC-verified; restore code/design
paths only, never overwrite the current `data/` or `uploads/`. The eleven root
HD clips were visually studied at 1080×2400 and removed from the runtime tree.
Their original Git commit, paths, blob IDs, sizes, timings and SHA-256 hashes are
preserved in `tools/references/zero-hd-manifest.json`; recover a part with
`git show <sourceCommit>:<gitPath> > /a/reference/folder/part.mp4`, outside the site.
No history rewrite is needed, and the three working horse MP4s are not references.

### WebGL revision checkpoint

Before this rebuild, `.rollback/before-3d-rebuild-6d7aa13.zip` was created from
`6d7aa13c20eb4725eb0d2e15a71aaa7bc1864bfb` and CRC-verified. It is ignored and is
not deployed. Restore code/assets only, never the current data/uploads.

The retained glass effect is deterministic synthesis, not a recording taken from
the reference. To regenerate only this cue, install Python `numpy` and
`imageio-ffmpeg`, then run `python tools/make-story-audio.py`.

The 49ce5d8 revision's generic hand, gallop, score and controls were rejected.
A fresh pre-correction backup is `.rollback/before-reference-correction-49ce5d8.zip`.
The current work corrects those choices but is **not accepted as an exact clone**.
For the actual original assets, use the capture instructions above and share the
public export. A stitched phone recording would retain burnt-in source UI/copy;
only the clean hand imagery has been adapted, not a falsely relabelled full video.
