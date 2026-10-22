# The Theatre.js state from Cartier's bundle

Extracted from `cartier.app.js` by `tools/extract-theatre.mjs`. Do not hand-edit:
re-run the tool to regenerate.

* source: `cartier.app.js` (6975.4 KB)
* literal: bytes 5678310–5725810 (46.4 KB)
* written: `theatre/mainScene.theatre-state.json` (170.3 KB)

## Shape

```
{ sheetsById: { <sheet>: {
    sequence: {
      length, subUnitsPerUnit,
      tracksByObject: { <objectKey>: {
        trackData:   { <trackId>: { __debugName, type, keyframes: [ { position, value, type, handles } ] } },
        trackIdByPropPath: { "["prop"]": <trackId> }
      } },
      trackIdByPropPath: { <objectKey>: { "["prop"]": <trackId> } }
    },
    staticOverrides: { byObject: { <objectKey>: <values> } }
  } } }
```

Keyframe `position` is in seconds on the sheet's timeline; `subUnitsPerUnit` is the
editor's snapping grid (30 = one frame at 30 fps at a third of a second per unit).
`type: "hold"` means step (no interpolation), `bezier` follows `handles`.

## What is in it

### sheet `timeline`

length **24.51s**, 18 objects, 70 tracks, 375 keyframes

| object | animated properties (keyframe counts) |
| ------ | ------------------------------------ |
| `lightDecal0` | `lightDecal0:["density"]` ×3 |
| `currentScene` | `currentScene:["nudgeBackward"]` ×3, `currentScene:["particles"]` ×4, `currentScene:["in"]` ×8, `currentScene:["current"]` ×15, `currentScene:["nudgeForward"]` ×3, `currentScene:["out"]` ×8, `currentScene:["watch"]` ×4, `currentScene:["currentSmooth"]` ×13 |
| `glowSphere3` | `glowSphere3:["alpha"]` ×4 |
| `glowSphere0` | `glowSphere0:["alpha"]` ×4 |
| `ui` | `ui:["podcastCta"]` ×9, `ui:["sceneTitle"]` ×14, `ui:["exploreBttn"]` ×9 |
| `glowSphere9` | `glowSphere9:["alpha"]` ×6 |
| `glowSphere6` | `glowSphere6:["alpha"]` ×6 |
| `glowSphere5` | `glowSphere5:["alpha"]` ×6 |
| `glowSphere4` | `glowSphere4:["alpha"]` ×4 |
| `glowSphere7` | `glowSphere7:["alpha"]` ×6 |
| `loop` | `loop:["forcedDark"]` ×6 |
| `objectsVisibility` | `objectsVisibility:["sc06_bench","dark"]` ×3, `objectsVisibility:["sc04_stairs","opacity"]` ×2, `objectsVisibility:["sc06_room","dark"]` ×4, `objectsVisibility:["sc05_room","dark"]` ×3, `objectsVisibility:["sc00_room","dark"]` ×3, `objectsVisibility:["sc01_dunes","dark"]` ×5, `objectsVisibility:["sc05_room","opacity"]` ×2, `objectsVisibility:["room","dark"]` ×1, `objectsVisibility:["sc06_images","opacity"]` ×4, `objectsVisibility:["sc01_cylinders","dark"]` ×5, `objectsVisibility:["sc04_characters","opacity"]` ×4, `objectsVisibility:["sc02_characters","dark"]` ×5, `objectsVisibility:["sc01_characters","dark"]` ×5, `objectsVisibility:["sc02_characters","opacity"]` ×4, `objectsVisibility:["sc00_room","opacity"]` ×3, `objectsVisibility:["sc06_room","opacity"]` ×2, `objectsVisibility:["sc02_cliffs","dark"]` ×5, `objectsVisibility:["sc01_characters","opacity"]` ×4, `objectsVisibility:["sc02_room","opacity"]` ×4, `objectsVisibility:["sc01_room","opacity"]` ×3, `objectsVisibility:["sc04_stairs","dark"]` ×5, `objectsVisibility:["floor","dark"]` ×24, `objectsVisibility:["sc05_characters","dark"]` ×3, `objectsVisibility:["sc00_doors","dark"]` ×3, `objectsVisibility:["sc04_room","opacity"]` ×4, `objectsVisibility:["sc03_room","dark"]` ×5, `objectsVisibility:["sc01_dunes","opacity"]` ×2, `objectsVisibility:["sc04_characters","dark"]` ×5, `objectsVisibility:["sc01_sky","dark"]` ×3, `objectsVisibility:["sc04_room","dark"]` ×5, `objectsVisibility:["sc03_characters","opacity"]` ×4, `objectsVisibility:["sc02_room","dark"]` ×3, `objectsVisibility:["sc04_panels","dark"]` ×5, `objectsVisibility:["sc03_room","opacity"]` ×3, `objectsVisibility:["sc03_characters","dark"]` ×5, `objectsVisibility:["sc01_room","dark"]` ×5, `objectsVisibility:["sc05_screen","dark"]` ×3, `objectsVisibility:["sc02_sky","dark"]` ×3, `objectsVisibility:["sc02_cliffs","opacity"]` ×2, `objectsVisibility:["sc02_ground","dark"]` ×5, `objectsVisibility:["sc03_wood","dark"]` ×3, `objectsVisibility:["sc06_images","dark"]` ×3 |
| `characters` | `characters:["opacity"]` ×21 |
| `glowSphere8` | `glowSphere8:["alpha"]` ×6 |
| `motionBlur` | `motionBlur:["blur"]` ×12 |
| `glowSphere1` | `glowSphere1:["alpha"]` ×4 |
| `glowSphere2` | `glowSphere2:["alpha"]` ×4 |
| `camera` | `camera:["visible"]` ×3, `camera:["fovOffset"]` ×8, `camera:["fov"]` ×8 |

## What is *not* in it

This is the project state, not the rendering code. Cartier's bundle also contains
the Theatre.js runtime and the site's own three.js effects — the light-decal
("magic light") shader, bloom, and the film pass. Those are code, and they are
not part of this file: this file only says *when* and *how much*, not *what it looks like*.
