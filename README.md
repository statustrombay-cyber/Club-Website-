# Mindful Tattva — psychology club website

The official website of **Mindful Tattva**, the psychology club under the
**Department of Applied Social Science** at Chhatrapati Shivaji Maharaj University,
Panvel.

The site is a small, self-contained **PHP application**: a public website, a
mental-health awareness section that moves with the page scroll, a photo album
with a full-frame viewer and a password-protected club dashboard where the team
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
| Mental-health awareness | `/awareness` |
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
`dashboard.css`, `dashboard.js` and the `img/`, `photos/` and `awareness/`
folders — then reload `/health` until it is green. Two safety nets mean the site
never looks broken while that is pending:

- if `assets/app.css` cannot be read, the app serves a small built-in baseline
  stylesheet instead of leaving the page unstyled;
- if `assets/app.js` cannot be read, the page drops its `js` class, so the
  reveal animations can never leave content invisible.

---

## What the site does

- **Public website** — hero, about, the psychology lens, club details, history
  timeline, events, calendar, gallery, awareness corner, core team, two
  registration forms and contact details.
- **Awareness corner that moves with the scroll** — four illustrated tiles on
  two rails, sliding left to right as the page scrolls down, with the helplines
  (Tele-MANAS 14416, KIRAN 1800-599-0019) always in view. Click any tile for the
  full note.
- **Photo gallery** — masonry album, event filters, caption search and a
  full-frame viewer (arrow keys, swipe, click-outside to close). Captions appear
  only when the club typed one; an event name on its own shows as a small badge.
- **Two registration forms** — membership and club/event registration, stored in
  the dashboard inbox. Uploaded photos appear in the gallery immediately.
- **Club dashboard** — overview, site copy, statistics, team, events, gallery
  photos, awareness tiles and the registration inbox, plus JSON export/import
  and one-click backups. Everything the public site shows is edited from here.
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
assets/                app.css, app.js, dashboard.css, dashboard.js, images
data/                  site.json (content), config.php (password), backups/
uploads/               photos uploaded from the dashboard
tools/preview-server.mjs      local runner for machines without PHP
tools/make-deploy-bundle.mjs  builds deploy-bundle.zip for the live server
tools/test.mjs                automated checks over pages, API, security, forms
```

## Development

```bash
npm test          # runs the PHP app in isolation and checks 104 behaviours
```

The test suite boots the real application, then exercises pages, the JSON API,
sign-in, CSRF protection, sanitising, uploads, the registration flow, password
changes and backups — the same paths a browser would take.

## Notes for the launch

- Change the dashboard password before going live.
- Keep `data/` and `uploads/` writable by PHP (both ship with `.htaccess` files
  that block direct web access to the data folder and disable script execution
  in the uploads folder).
- To take a snapshot at any time: *Dashboard → Data → Download backup*, or copy
  `data/site.json` and the `uploads/` folder.
