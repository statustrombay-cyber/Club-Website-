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
- **The herd on the front page** — the club's own horse footage plays behind
  the home hero from the moment the page opens: muted, looping and pinned to
  the window, with the bubbles drifting over it and a warm cream veil keeping
  every word readable. It is one small file (`assets/media/horses-running.mp4`,
  ~2.5 MB for 11 seconds at 1280×960, 30 fps), cut from the three clips the
  club uploaded: the golden-hour herd, the stampede through the water, and the
  black horse galloping across the snow — the slow stretches of the originals
  (a horse easing into a walk, a herd marching through dust) were left out, and
  the tail is crossfaded back into the head so the repeat has no visible jump.
  A still frame (`horses-running-poster.jpg`) sits in the same place and is
  always there: if the clip cannot play, or the visitor asked for less motion
  or is on a metered connection, the still frame simply stays and the page is
  never blank.
  - It runs **continuously** — nothing pauses it while the page is open — and a
    watchdog checks twice a second that its clock is still moving: a stall gets
    a nudge first, and a quiet reload if that was not enough, so the herd can
    never be caught frozen on screen.
  - The herd is the front page's **opening, not wallpaper**: every section
    after the hero paints its own paper, so no paragraph can ever end up
    sitting on top of the video. The top bar is thin enough to see it through.
  - The server hands it out as `video/mp4` with **byte-range support** (a real
    `206` with `Content-Range`), which browsers — Safari above all — require
    before they will play or seek it.
- **Photo gallery** — masonry album, event filters, caption search and a
  full-frame viewer (arrow keys, swipe, click-outside to close). Captions appear
  only when the club typed one; an event name on its own shows as a small badge.
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

## Development

```bash
npm test          # runs the PHP app in isolation and checks 264 behaviours
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
