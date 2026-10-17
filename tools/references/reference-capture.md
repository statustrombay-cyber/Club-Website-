# Recovering the reference accurately (not guessing another hand/scene)

## Findings

The original developer's detailed technical case study:
https://tympanus.net/codrops/2026/07/17/zero-the-engineering-behind-a-defiant-interactive-narrative/

Relevant specifics: baked hand-lighting atlases/premultiplied crossfades;
left-to-right strip release, individual rotation and gravity; one driving
progress value; early texture decoding/upload; shader prewarm; adaptive quality.
The generic lit XR hand and orderly corridor in the previous revision did not
replicate that pipeline. The new hand artwork is baked from the user-supplied
HD part 01, using the earlier traced alpha matte (6d7aa13) registered by SIFT and
transferred between eight caption-free poses with optical flow. This is edited
reference imagery, not an original proprietary rig recovered from the website.

## What can and cannot be captured

Save All Resources is real and open source:
https://github.com/hybz618/Save-All-Resources
A newer fork:
https://github.com/cristopher-dev/save-all-resources-plus
Native Chrome DevTools can also save Network → “Save all as HAR with content”.
A HAR may contain cookies/headers; prefer the body-only capture below for sharing.

These tools save the **public resources the browser actually receives**, not
private backend code, Blender projects, original authoring files, or guaranteed
editable/unminified source. Public availability is not an automatic reuse license.

This sandbox's browser has an outbound-host allowlist that does not include
why.zero.university. The text-fetch tool can read the landing page and public
case study, but it does not expose the original WebGL network response bodies.
No extension/full-scroll capture was performed here, and none is claimed.

## Capture in your own Chrome (complete the FULL site)

Option A — the extension you suggested:
1. Open the reference in Chrome with Save All Resources installed.
2. Open DevTools and the extension's ResourceSaver tab **before reloading**.
3. Reload; complete the draw-zero and press/hold gates. Scroll slowly through
   every chapter to the very end, including the city/map. Wait for lazy assets.
4. Save all loaded resources, including XHR/fetch bodies and other asset domains.
5. ZIP the public resource export and share it here. Do not share a Chrome profile.

Option B — body-only Playwright/CDP capture, no extension required:
1. Install optional developer dependency: `npm install --no-save --package-lock=false playwright-core`.
2. Launch a **fresh temporary Chrome profile** with remote debugging enabled,
   e.g. `google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/zero-reference-profile`.
3. Open only https://why.zero.university/ in that fresh Chrome; close unrelated tabs.
4. Run `node tools/capture-reference.mjs /a/folder/outside/the/project/zero-capture`.
5. Once “Capture armed” appears, reload the tab, complete the gates and scroll
   the full site manually. Press Enter in the terminal only when finished.
6. ZIP the output folder. It contains response bodies plus URL/hash/MIME mapping,
   never request cookies, auth headers, browser storage or a browser profile.

The capture helper has been runtime-checked against controlled local Chrome
fixtures (including worker fetches); this is not a capture of the original site.
Review response bodies and URLs before sharing; URLs can carry identifiers or
public API keys even in a fresh profile.

Then exact accessible GLB/DRACO/KTX2/atlases and compiled JS can be inspected,
licensed/reusable components identified, and the choreography adapted rather
than inventing another approximate generic rig.

## Why a stitched screen recording is not silently substituted

The supplied 1080×2400 footage contains Chrome/status bars, XP, Join Beta,
original statistics printed across glass, and captions over moving hands/papers.
Cropping removes outer UI but cannot cleanly replace that occluded text or
change a banknote portrait as it curls using a simple edit. Full video deployment
would also be a responsive/seek-performance trade-off and should not be called
an editable original scene. Only caption-free hand artwork is baked into this
revision; no source MP4, XP, source statistics or source navigation is deployed.

## Android/Termux without a desktop Chrome

The October 17 split upload was successfully recovered, but it contains the
`www.zero.university` marketing homepage, not the `why.zero.university`
narrative. See `upload-recovery-2026-10-17.md` for byte counts and inspected assets.

Use the standalone Python 3 script `tools/recover-zero-assets.py` from a directory
outside this project. No pip/browser is required. It targets the correct URL,
keeps downloaded JS intact, follows literal resource references, and packages a
manifest/files ZIP (automatically split into 20 MiB parts if necessary).

This is a **static-resource downloader**, not an executed/full-scroll browser
capture. Computed URLs and worker/interaction-only loads may still be missing.
It records failures and rejects a marketing redirect or script-stripped page.
It is fixture-tested, not claimed as an actual successful source-site capture.


## Latest inspection and environment blockers (18 October 2026)

The new `university.html` is the correct narrative's HTML/CSS/font shell, but its
scripts are stripped and it does not contain the hand/glass/audio assets. The
embedded CSS/fonts have been recovered outside the project; the raw upload was
moved out of the public root. Earlier irrelevant `part_aa`/`part_ab`/`part_ac`
were removed after an external, CRC-verified backup.

The Python downloader was actually run here: its source-host TLS connection was
closed before HTML arrived; curl and Node independently failed too. A hosted
GitHub Actions attempt was rejected because the GitHub connection lacks
`workflows` permission. No active workflow was installed. The template is
`recover-reference.yml.example`; reconnect GitHub in Arena with the required
permission, if offered, before another hosted attempt. Success is not guaranteed.
See `university-inspection-2026-10-18.md` for exact findings, hashes, and errors.
