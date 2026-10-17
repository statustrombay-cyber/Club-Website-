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
- `assets/story/hand-painted-poses.webp`: eight caption-free painted poses from
  the user's HD part 01 at 0–0.56 seconds. The earlier hand-only alpha matte
  from 6d7aa13 was registered by SIFT and transferred using optical flow. Baked
  lighting is retained, with no generic XR model or generated skin atlas.
  The matte/pose authoring helper is `tools/references/bake-hand-poses.py`.
  These are edited reference frames, not the original proprietary rig/atlas.
  The XR rig, its skin texture and now-unused model license were removed.
- `freud-note.webp`: newly AI-generated American-$100-inspired art prop,
  with Freud replacing the portrait and a visible ART SPECIMEN marking. It is
  fictional artwork, not an authentic banknote or a historical document.
- `velvet-curtain.webp`: newly AI-generated, deliberately defocused red velvet.
- `rogers-engraving.webp` and `james-engraving.webp`: newly AI-generated editorial
  portraits, not archival photographs. All four newspaper layouts/copy are new.
- Geometry and shaders produce true thick refractive irregular glass, sudden
  impact/debris, vertical glass travel, forward camera travel for four curled burning notes,
  ember particles and independently thrown papers peeling/tumbling into 24 strips.
  There is no spiderweb crack overlay and no upward-scrolling fact-card rail.
- Newspaper profiles identify Freud (1900), William James (1890), Carl Rogers
  (1951) and a dated 2025 gratitude research reading. No invented quotation is
  attributed to a historical person. Actual readable copy is in the HTML.

## Audio — latest request

Only `assets/audio/glass-impact.mp3` remains: the original 2.5-second synthesized
broadband/glass resonance effect. The gallop and score are removed, together with
sound/tilt controls and all orientation requests. Gesture-unlocked playback is
attempted only at visible impact; blocked playback is skipped rather than delayed.
The glass-only authoring script is `tools/make-story-audio.py` (numpy and
imageio-ffmpeg). No music or extra effects are generated or deployed.

## Further extraction / fidelity

The source developer documents baked hand textures and per-strip tumbling:
https://tympanus.net/codrops/2026/07/17/zero-the-engineering-behind-a-defiant-interactive-narrative/

See `reference-capture.md` for Save All Resources, HAR and the body-only capture
helper. The current sandbox cannot browse/capture the reference host's complete
WebGL asset network. No full-scroll extension capture or original editable scene
is claimed. Screen recordings include UI and occluded statistics; they are not
silently shipped as an edited club-specific video.

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

Pre-latest-correction backup: `.rollback/before-reference-correction-49ce5d8.zip`.
