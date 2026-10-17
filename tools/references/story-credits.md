# HD psychology chapter — provenance and reconstruction

## Reference, not runtime footage

The user supplied eleven 1080×2400 recordings, `video_part_00.mp4` through
`video_part_10.mp4`, in source commit
`83b6645` (full object ID in `zero-hd-manifest.json`). All eleven were decoded,
visually reviewed in sequence, copied outside the site for study, and verified
against their original Git blob IDs before their approved removal from the
working tree. The manifest retains dimensions, timing, byte counts, SHA-256,
Git object IDs and recovery paths. No recording is embedded in the website or
included in either deployment mode. Browser/status bars, XP, source statistics,
source navigation and Join Beta controls were not copied.

Visual source: https://why.zero.university/ (the site shown in the supplied
recordings). Original 3D scene files and original font names were not supplied
or recovered. This is a club-specific reconstruction, not the original scene
renderer and not a claim of pixel-identical reproduction.

## WebGL runtime / rebuilt assets

- Three.js **0.186.1**, MIT, bundled locally with esbuild **0.28.2**. The complete
  Three notice ships at `assets/vendor/THREE-LICENSE.txt`. Rebuild source:
  `tools/story/{scene,geometry,shaders,paper}.js`; command `npm run build:story`.
- `assets/story/hand-rig.glb`: genuine skinned generic right human hand from
  npm `@webxr-input-profiles/assets@1.0.20`,
  `dist/profiles/generic-hand/right.glb`. MIT, Copyright 2019 Amazon.com, Inc.
  or its affiliates; complete notice at `assets/story/HAND-LICENSE.txt`.
  1,360 vertices, 25 joints. Runtime reparents the flat bone list while retaining
  bind space, articulates fingers and joins a procedural tapered forearm.
  This is not the source site's original hand model. The rejected photographic
  `hand.webp` cutout was removed from runtime; it is recoverable at 6d7aa13.
- `hand-skin.webp`: newly AI-generated neutral palm skin atlas applied to actual
  mesh surfaces, not a flat image plane. Procedural fine bump adds surface detail.
- `freud-note.webp`: newly AI-generated American-$100-inspired art prop,
  with Freud replacing the portrait and a visible ART SPECIMEN marking. It is
  fictional artwork, not an authentic banknote or a historical document.
- `velvet-curtain.webp`: newly AI-generated, deliberately defocused red velvet.
- `rogers-engraving.webp` and `james-engraving.webp`: newly AI-generated editorial
  portraits, not archival photographs. All four newspaper layouts/copy are new.
- Geometry and shaders produce true thick refractive irregular glass, sudden
  impact/debris, a forward camera rail, four curled burning notes, ember particles
  and a deep corridor of subdivided papers peeling into sixteen long strips.
  There is no spiderweb crack overlay and no upward-scrolling fact-card rail.
- Newspaper profiles identify Freud (1900), William James (1890), Carl Rogers
  (1951) and a dated 2025 gratitude research reading. No invented quotation is
  attributed to a historical person. Actual readable copy is in the HTML.

## Audio

Three new original, deterministic synthesized clips; no third-party samples or
reference soundtrack are embedded:

- `assets/audio/intro-gallop.mp3` — 4.8-second asymmetrical hoof-clop synthesis.
- `assets/audio/glass-impact.mp3` — 2.5-second broadband impact/glass resonances.
- `assets/audio/chapter-foreboding.mp3` — 24-second D-minor drone/pulse score.

Reproducible authoring script: `tools/make-story-audio.py` (numpy and
imageio-ffmpeg). These are synthesized effects/music, not real field recordings.
The intro cue is never replayed after the splash. No other site sound effects
were added. Gesture unlocking, local mute preference, hidden-tab suspension,
chapter-end hard stop and permission-based local-only tilt are documented in
README. Browser policies may require pressing Sound before any cue can play.

## Typography

Locally hosted, Latin-subset WOFF2 fonts:

- Bodoni Moda, Google Fonts `ofl/bodonimoda`, regular variable optical size /
  weight font. Copyright 2020 The Bodoni Moda Project Authors.
- Pinyon Script, Google Fonts `ofl/pinyonscript`, regular font. Copyright 2024
  The Pinyon Project Authors.

Both use SIL Open Font License 1.1; the complete notices are included in
`assets/fonts/BodoniModa-OFL.txt` and `assets/fonts/PinyonScript-OFL.txt`.
Subsetting/conversion used fonttools. These are licensed stylistic matches, not
identified originals from the reference website.

## Research

All displayed empirical numbers are attributed to the relevant analysis, not
to the club. The full public text was consulted, including its limitations:

1. Diniz et al. (2023), *The effects of gratitude interventions: a systematic
   review and meta-analysis*, Einstein (São Paulo), 21:eRW0371.
   https://pmc.ncbi.nlm.nih.gov/articles/PMC10393216/
   DOI: 10.31744/einstein_journal/2023RW0371.
   The systematic review included 64 randomised trials. The SWLS comparison
   involved two studies, n=283: the authors report 6.86% higher scores,
   MD 0.48, 95% CI 0.21–0.75; low-certainty evidence, high risk of bias.
   This is not a percentage of people who improved and not a clinical promise.
2. Choi et al. (2025), *A meta-analysis of the effectiveness of gratitude
   interventions on well-being across cultures*, PNAS 122(28):e2425193122.
   https://pmc.ncbi.nlm.nih.gov/articles/PMC12280877/
   DOI: 10.1073/pnas.2425193122.
   145 papers, 163 samples, 727 effect sizes, 24,804 participants, 28 countries;
   a small overall wellbeing effect (Hedges’ g=0.19, 95% CI 0.15–0.22), varying
   between countries. Facts are summarised in new wording, not copied figures.

The expandable research notes below the scene expose the qualifications and
primary-source links without requiring any animation or canvas interaction.

## Rollback

Pre-story runtime checkpoint: `bfab92b847132c2757b1999705c0f2015f1d9933`.
The pre-story local ignored archive under `.rollback/` was CRC-tested and has a local
SHA-256 manifest. Restore only code/design paths, keeping current `data/` and
`uploads/`. All three `assets/media/horses-*.mp4` files remain byte-for-byte
unchanged. Existing ring, wire atlas, card deck, team, gallery, dashboard,
registration/payment/pass and PDF implementations are retained.

New pre-WebGL rollback: `.rollback/before-3d-rebuild-6d7aa13.zip`, from
`6d7aa13c20eb4725eb0d2e15a71aaa7bc1864bfb`, CRC-verified before rebuilding.
All three horse files, current data and uploads remain unchanged.
