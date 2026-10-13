# Mindful Tattva — psychology club website

The official website of **Mindful Tattva**, the psychology club under the
**Department of Applied Social Science** at Chhatrapati Shivaji Maharaj University,
Panvel.

The site is a small, self-contained **PHP application**: a public website, a
photo album with a full-frame viewer, event registration with UPI payment and a
downloadable event pass, and a password-protected club dashboard where the team
edits everything — no build step, no database server, no framework.

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

The site is plain files. Upload them into the site folder (`htdocs` on
InfinityFree and similar hosts) and it runs — no build step, no database, no
Composer.

1. Build the bundle (optional, but it keeps a deploy tidy):

   ```bash
   node tools/make-deploy-bundle.mjs      # → deploy-bundle.zip
   ```

   It packs `index.php`, `.htaccess`, `app/`, `views/`, `assets/` and
   `uploads/.htaccess`, with folders `755` and files `644`. It deliberately
   leaves out `data/` (site content and club password) and `uploads/` (uploaded
   photos) — those only live on the server, so re-deploying can never wipe the
   club's own work.
2. Upload that ZIP into the site folder and extract it there.
3. Open **`/health`** on the live site. It checks every design file directly on
   the server and says, file by file, whether it arrived.

### If the site ever looks blank or colourless

It is always the same cause: **`assets/app.css` is not on the server**, so the
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
  contact details, in **the dark, airy design the club chose**: a near-black
  page, warm cream type, wide letter-spaced display lines and one gold accent
  used sparingly.
  - **The rings** — the psychology lens is four concentric rings with the psi
    and the club's name steady in the middle. They start far apart and **close
    in as the section crosses the window**: each ring is one element whose width
    and height come from the same expression, so a ring can never become an
    oval or slide off its own centre. The scroll position is carried in one CSS
    variable (`--ring`) written by the script; with reduced motion the rings
    simply rest.
  - **The club's name runs down the page** in three columns — the middle one
    larger, slower and in the club's gold, the outer two plain and going the
    other way — masked top and bottom so the words appear and disappear rather
    than being cut. A second band of the club's own words (**mind · body ·
    connection · …**) drifts across under the hero: four copies side by side,
    sliding exactly one copy across, so the loop has no seam on any screen width.
  - **The words arrive one after another** — the hero lifts in, and the
    statements are revealed word by word as they are reached. Both are pure CSS
    driven by a class, so with the script missing, or with reduced motion asked
    for, every word is simply there.
  - **Two slow glows** drift behind everything, with a faint grain sheet over
    them, and they move a little with the scroll. Nothing dark ever covers a
    word: the glows sit behind the page shell, never in front of it.
  - A **gold bar across the top of the window** shows how much of the page is
    read, the floating top bar settles once you have scrolled, a **way back up**
    appears once the page has been read a bit, a golden streak crosses the hero
    now and then, a soft light crosses the filled buttons on hover, and the
    photos breathe in slightly under the pointer.
  - Everything is CSS: with **reduced motion** asked for, the glows, the bands
    and the reveals hold still and the page is complete without a single frame
    of animation.
- **The same design on every page** — the stylesheet is one system, so the
  gallery, the calendar (twelve month cards, the months with something in them
  edged in gold), the member directory, the register form, the pass and the
  check page all wear the same colours, type and cards. The club's own area
  (the dashboard and the sign-in page) wears the same dark clothes, with its own
  shell — no reading bar and no floating pill over the club's work.
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
  - one **golden line runs the height of the club timeline** — through the
    beginning, our why and the next chapter — with a light travelling back and
    forth along it, and the dots keep a slow golden heartbeat;
  - the unreadable leftovers of the older design are gone: no drifting bubbles,
    no gold thread down the window, no planets orbiting the lens, and **no horse
    clip** anywhere. The clip and its still frame are not in the repository any
    more; they are kept in the saved copy of the old design (the tag
    `design-classic-2026-10-13`), so they can be brought back in one command if
    the club ever wants them;
  - the club's own area is untouched by all of it: the dashboard and the sign-in
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
    (`assets/img/university-logo-print.png` — the university's lockup laid flat
    on white, card, crest and blue type all kept). Every fact prints **all** of
    its lines: “Payment pending — the seat is not held yet” is not cut down to
    its first line, which is what an earlier version of this file did.
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
node tools/deploy-check.mjs https://mindfultattva.site.je
```

`tools/clean-test-data.mjs` removes anything an interrupted run left behind,
including uploaded files no record points at. **Stop the preview first**: the
preview keeps its own copy of the project and writes it back to disk when it
stops, so a file swept while it is running comes straight back.

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
npm test          # runs the PHP app in isolation and checks 295 behaviours
npm run lint      # load one PHP file in that runtime and print why it will not
```

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
