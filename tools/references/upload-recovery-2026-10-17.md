# Recovery of the Android/Termux upload — 17 October 2026

## The split/upload worked

All three uploaded parts were recovered from the user's existing commits on the
session branch, in byte order `part_aa`, `part_ab`, `part_ac`:

| Part | Bytes |
| --- | ---: |
| aa | 20,971,520 |
| ab | 20,971,520 |
| ac | 12,818,513 |
| **Joined** | **54,761,553** |

Joined SHA256: `c3c69f4d8341f56565e84a07f082879aefcb2c1771a26a071a4176001f628c00`.
This is a UTF-8 Monolith HTML document, not a ZIP or a compressed archive.
The original user uploads are preserved unchanged. Working recovery/extracted
files and the pre-recovery workspace backup are outside the project at
`/home/user/reference-recovery/`; they are not deployed.

## What the file actually contains

The first line explicitly says:

```
Saved from https://www.zero.university/ at 2026-10-17T17:19:12Z using monolith v2.10.1
```

The title is **Zero — Learn. Build. Get Hired.** It is the Framer marketing
homepage, not the `https://why.zero.university/` interactive hand/glass narrative.

Extracted and inspected 200 unique embedded binary/media resources:

- 112 resources labelled WOFF2, plus one octet-stream whose magic is also WOFF2;
- 58 PNGs, one WebP, one AVIF, and 24 SVGs;
- three distinct MP4s, repeated across the source HTML.

The three MP4s were decoded and visually inspected at multiple timestamps.
They show profile/workspace cards, a hiring/company-logo carousel, and scheduled
interview cards. None contains the painted hand, glass shattering, burning notes,
or shredding-paper scene. All three audio streams measure mean and maximum
volume of **−91 dB** with FFmpeg volumedetect (effectively digital silence).

All 23 script tags have empty bodies and no script `src`. No executable original
scene bundle, GLB/GLTF model, WASM decoder, or audio file was recovered. Many
embedded `data:text/html;charset=utf-8;base64,...` entries decode to **Not found**
in responsive image alternatives; they are not hidden scene documents.
No `why.zero` reference was found in the joined document. All 60 raster images
were reviewed in an inventory sheet; they are marketing UI/logos/illustrations,
not the requested scene textures.

Consequently these files cannot supply the original hand/glass scene or its
sound. This is not evidence of missing/corrupt split parts, and the wrong assets
have not been substituted into the club website. The existing glass-only audio
behaviour is unchanged; no post-section/site-wide music has been added.

## Android-friendly next capture, without Monolith or a desktop browser

`tools/recover-zero-assets.py` is a standalone Python-standard-library downloader
for the **correct** narrative URL. It does not need pip, Chromium, credentials,
or a browser profile. Download it into the Termux home directory, then run:

```
python recover-zero-assets.py
```

It downloads original HTML and follows literal JS imports, Vite dependency lists,
CSS/font references, models, textures, and sound URLs. Unlike a stripped HTML save,
it retains the original JS bytes without executing them. It refuses a redirect
to the marketing domain, a recognisable Framer homepage, or a script-stripped
page. Output is a URL/hash/MIME manifest plus files in a ZIP. If the ZIP exceeds
20 MiB it also makes ordered `.part-aa`, `.part-ab`, etc.; upload **every** part.
Downloads are capped at 25 MiB per response and 100 MiB total.

**Limit:** this is static discovery, not a full-scroll browser capture. URLs
computed only at runtime, interactions, workers, or network challenges can leave
assets missing. Unresolved requests are recorded, not silently called complete.
It has passed five offline fixture tests (module/Vite/CSS/audio discovery,
wrong-page rejection, stripped-page rejection, URL handling, ZIP/split integrity).
It has NOT been run successfully against the original reference from this sandbox,
whose outbound browser/network allowlist still excludes that host.

The full browser/DevTools workflow remains in `reference-capture.md`. Existing
HD recordings do not need to be uploaded again.
