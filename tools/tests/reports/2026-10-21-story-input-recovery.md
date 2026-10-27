# Story input recovery — 21 October 2026

## Baseline and scope
- Retained the newer branch's `d6ae174` / `8258b02` updates by bringing them into the authorised session branch. No switch to, push to, or modification of the other branch; no main/PR merge.
- Backup retained outside the project under `/home/user/reference-study/recovery-20261021/`.
- No Cartier integration, backend/data replacement, added audio/gyro controls, or new site-wide soundtrack.

## Reproduced failure and repair
- **Reproduced before repair:** an early mobile tap created a 48 kHz context; after the deferred mixer warmed, both `Howler.ctx` and the shared context were **closed**. The legacy sample-rate reset closed the unlocked context, and the shared-context adoption then reused it.
- Keep legitimate 48 kHz contexts alive, reject closed shared contexts, and allow another eligible gesture to resume audio even when an earlier non-activating resume promise is still pending. Resume interrupted/suspended contexts through ordinary real gestures.
- Keep the original ambience, glass impact and burn recordings; remove the extra first-touch bed aliases. Decode these recordings alongside the scene assets, with a bounded/nonfatal first-use wait. Never queue a missed fracture impact for a later scroll/reversal.
- Deliver the three MP3s through the existing PHP public-asset allowlist, using explicit MP3 decoding format. No transcoding, arbitrary-path proxy or upload-limit increase. Build now contains **15 public assets / 25 bounded PHP payloads**.
- Capture native motion consent on a real chapter touch release/click, before models/shaders can consume the activation. Avoid duplicate compatibility-click requests, retry a gesture rejection, and respect explicit refusal without repeated prompts. Previously granted/passive motion remains usable without a new request. No custom permission UI.
- Retain an early calibration sample, recenter after foreground/orientation changes, and feed the original camera rig in both the glass and paper stages. Retain newer title/navigation/exit updates; restore the earlier portrait-only glass depth fit without changing desktop depth.
- Stop audio when hidden or outside the chapter. Runtime diagnostics distinguish a locked audio context from enabled playback and record actual motion status rather than pretending consent is sensor activity.

## Original audio integrity
All three on-disk recordings are byte-identical to the original recovered-assets commit `72c3cb7`:

| Recording | Bytes | SHA-256 |
|---|---:|---|
| `amb_stage2-3.mp3` | 114228 | `059989fad48efb0f19c3a6688e16e2bbea9eeb10e7eb5907e41bed72ab0739f5` |
| `fx_glass-shatter.mp3` | 20592 | `9272c7d97d4df93430af5c0deed37e42f883b74782c10a71af0b2123f772ae1c` |
| `fx_money-burn.mp3` | 12980 | `eaa9074d1089dd171e8e6828ee6a7c2e6293e7e0eaef640e35662466589709c9` |

## Validation
- Application suite: **756 passed, 0 failed**; PHP/pass lint passed.
- `story-inputs.mjs`: **15 checks passed**, no page errors; early gestures before engine execution; pending-resume edge case; 48 kHz context survives initialization; actual nonzero Web Audio DSP output; one real glass-source start; original burn source starts; rendered camera differs from its same-frame base pose after permitted input in both scenes; suspended mixer resumes with signal; reverse scrolling does not replay impact; actual silent DSP output at exit; permission retry/denial rules. Direct MP3 paths were deliberately denied during this test to verify PHP-backed recovery. Orientation events/permission outcomes are simulated, not physical-phone testing.
- Mobile/desktop detail, **157 source-scene assertions**, warm/reverse/smoothness, viewport/touch/wheel and loader delivery regressions **passed**. Rendered captures were inspected and are kept outside the deployment tree. Native 48 kHz DSP peak exceeded 0.39 during the focused run; exit DSP was silent.
- Printed-atlas checks passed for all six portraits/editorials and canonical original degree/banknote bytes, strip shaders, geometry and flight/motion formulas.
- GitHub-equivalent source export checked in memory: **152 production files, 15 exact scene assets**, all three horse videos, no nested ZIP/references/dev tooling, no live data/password overwrite, bounded host upload sizes.

## Browser limits
Sound still requires a genuine browser activation. On iPhone/iPad, native motion consent requires a real tap and an Allow decision. Motion also requires HTTPS and an embedding policy that permits sensors; a page cannot override an OS refusal or its parent iframe's policy. Physical iOS/Safari and the deployed public host were not available for validation. No universal-device or FPS guarantee is made.
