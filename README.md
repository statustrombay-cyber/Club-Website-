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
  contact details, with the original drifting bubbles and orbit artwork.
- **The herd** — the club's own horse footage plays behind every public page,
  pinned to the window and muted, with the bubbles drifting over it and a warm
  film of paper over the reading. It is cut from the three clips the club
  uploaded and **stitched with a stream copy — not one frame is re-encoded**,
  so the picture is exactly the camera's: 1080×720 at 5.0 Mbps, 19 seconds,
  ~12 MB (`assets/media/horses-running.mp4`). Four locations: the white horse
  leading the golden herd, the black horse galloping through snow, the stampede
  through water, and the brown herd on the grass ridge. The slow stretches were
  cut out, every cut lands on a keyframe, and the joins decode clean. A still
  frame (`horses-running-poster.jpg`) sits in the same place and is always
  there: if the clip cannot play, or the visitor asked for less motion or is on
  a metered connection, the still frame simply stays and the page is never
  blank.
  - It runs **continuously** — nothing pauses it while the page is open — and a
    watchdog checks twice a second that its clock is still moving: a stall gets
    a nudge first, and a quiet reload if that was not enough, so the herd can
    never be caught frozen on screen.
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
    drifts past under the hero — two copies side by side, sliding exactly one
    copy across, so the loop has no seam;
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
npm test          # runs the PHP app in isolation and checks 299 behaviours
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
