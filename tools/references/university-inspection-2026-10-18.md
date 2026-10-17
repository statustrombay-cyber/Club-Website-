# university.html inspection and direct recovery attempts

## Correct page, incomplete scene capture

The new upload is from **https://why.zero.university/**, unlike the previous
marketing-homepage save. Its Monolith header records
`2026-10-17T18:40:20Z` (18 October, 00:10 IST).

- Input: 3,057,581 bytes.
- SHA256: `4b583ba6caae111afea5f684eca679799dfcc4a6d239e6ce8441c6121d5b2f4f`.
- Title: **Zero — Human Infrastructure to Get Hired**.
- It explicitly installs CSP `script-src 'none'`.
- Its three script tags have no `src` and empty bodies, including the module tag.
- The body contains the loading gradient, “99”, an empty WebGL canvas, and an
  empty UI container—not a recorded or rendered hand/glass scene.

Removing the CSP would not restore the absent JavaScript, textures, or audio.
Canvas pixels and WebGL buffers do not become embedded assets merely because
an HTML file contains a `<canvas>` element.

## Actual useful files recovered

Recursively decoded data URIs, including those inside embedded CSS and SVG.
Recovered **46 unique resources**:

| Type | Unique files |
| --- | ---: |
| CSS | 2 |
| WOFF2 fonts | 35 |
| OTF fonts | 4 |
| PNG | 4 |
| SVG | 1 |

Font metadata identifies the four custom OTFs as **PP Supply Sans**,
**Bethany Elingston**, **PP Supply Mono**, and **STK Bureau Serif Book**.
The other embedded families include Caveat, Google Sans Code/Flex, Inter, and
Newsreader. Embedded font files do not themselves supply a reuse license.

The “hand” matches in the CSS refer to the loader's circle **handle**; the
`glass-effect` selectors style translucent UI. They are not the painted hand,
shatter geometry, or the renderer. No original JavaScript bundle, GLB/GLTF,
KTX2 atlas, WASM decoder, MP3/OGG/WAV, or scene video was recovered.

The exact HTML and recovered resources/manifest are preserved **outside the
website** at `/home/user/reference-recovery/university.html` and
`/home/user/reference-recovery/university-assets/`. They have not been installed
as a fake replacement for the requested scene.

## Code was actually run, not merely suggested

Executed `tools/recover-zero-assets.py` against the real narrative URL from this
sandbox. It failed before receiving the HTML:

```
urlopen error TLS/SSL connection has been closed (EOF)
```

Independent curl and Node fetch attempts also failed:

```
curl: (35) OpenSSL SSL_connect: SSL_ERROR_SYSCALL
Node: fetch failed / ECONNRESET
```

The text-fetch service can read a small text representation of the landing
page, but that result does not provide the original executable bundle or binary
asset response bodies. This is not evidence of a successful source capture.

Researched the public GitHub projects:

- https://github.com/website-scraper/node-website-scraper
- https://github.com/website-scraper/website-scraper-puppeteer
- https://github.com/Y2Z/monolith

The ordinary scraper/Monolith do not execute the scene; the Puppeteer plugin
provides browser execution/scrolling. Merely switching libraries cannot establish
a network connection that is being reset. No claim of watching a YouTube video
or completing a full-browser source capture is made.

## Hosted attempt and exact permission blocker

Prepared a narrowly scoped GitHub Actions public-resource capture, restricted to
`arena/24a1daf8-club-website`, which downloads source as data without executing
remote JavaScript. The attempted push was rejected:

```
refusing to allow a GitHub App to create or update workflow
.github/workflows/recover-reference.yml without workflows permission
```

**No workflow was installed and no hosted scrape ran.** The rejected local-only
commit was removed without altering the user's uploaded commit. The reviewed
workflow is retained as `tools/references/recover-reference.yml.example`, not as
an active workflow. GitHub read/content operations still work; the missing
permission is specifically workflow modification.

To try that route, reconnect GitHub in Arena and approve Workflows permission if
it is offered. If the Arena integration does not offer that permission, this
session cannot install the hosted job through that connection. A successful
hosted network connection/capture is not guaranteed in advance.

## Cleanup performed safely

- Backed up `part_aa`, `part_ab`, `part_ac`, and `university.html` together at
  `/home/user/reference-recovery/before-reference-cleanup-8481909.zip`.
  ZIP CRC verified before cleanup; 42,102,409 bytes.
- Deleted the three irrelevant marketing-homepage split files from the branch.
- Moved the useful new HTML out of the publicly served project root into the
  external reference workspace, preserving the exact SHA256 above.
- Removed the old decoded marketing-homepage resources and their scratch sheets;
  retained the new narrative CSS/fonts and both rollback backups.
- Existing club HTML/PHP, runtime assets, all three horse MP4s, data, uploads,
  registrations, payment/pass logic, and current glass-only audio are unchanged.
- Five offline downloader regression tests pass. These are not original-site
  capture or physical-mobile tests. PR #5 remains open and unmerged.

There is no new deployment ZIP because the club runtime has not changed. The
requested original hand/glass/audio integration is **not complete**.
