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

**Dashboard password: `Csmu@MT`** — change it any time from
*Dashboard → Settings → Change password*. The password is stored as a bcrypt
hash in `data/config.php`, never in plain text.

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
views/                 templates: layout.php, dashboard.php, public/*.php
assets/                app.css, app.js, dashboard.css, dashboard.js, images
data/                  site.json (content), config.php (password), backups/
uploads/               photos uploaded from the dashboard
tools/preview-server.mjs  local runner for machines without PHP
tools/test.mjs           72 automated checks over pages, API, security, forms
```

## Development

```bash
npm test          # runs the PHP app in isolation and checks 72 behaviours
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
