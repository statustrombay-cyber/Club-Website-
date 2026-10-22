# Mindful Tattva — The Long Room

An immersive website for **Mindful Tattva**, a psychology club. You walk a
corridor of seven rooms: warm plaster, black floor, gold dust, and the people
who stand in the light. Scroll, drag, or use the arrow keys to move; the doors
ahead open as you approach them.

**No frameworks. No model files. No texture files. No build step.**
Every wall, arch, beam, frame, coat, plinth, golden object and mote of dust is
generated in code at load time and drawn with a small WebGL 2 renderer written
for this site.

## Run it

Any static server works:

```bash
python3 -m http.server 4190
# then open http://localhost:4190/
```

## What is in here

```
index.html            the page, the type, the chrome
assets/style.css      typography, chapter copy, loader, responsive layout
assets/js/main.js     boot, input, camera, light, frame loop
assets/js/world.js    the building: rooms, arches, doors, props, people
assets/js/figures.js  the human silhouettes (skeleton → capsules → one mesh)
assets/js/geo.js      procedural geometry: arch walls, capsules, cones, merges
assets/js/gl.js       WebGL 2 helpers: programs, meshes, instancing, targets
assets/js/post.js     bloom + film composite
assets/js/shaders.js  GLSL: lighting, shadow map, dust, shafts, film
assets/js/m4.js       4×4 maths
```

## The renderer

* Forward shading, one shadow-casting spot per room (1024² on phones, 2048²
  elsewhere), 3×3 PCF, GGX specular, hemisphere ambient, a rim term that makes
  the people read as silhouettes, procedural plaster, distance fog.
* Instanced piers, sconces, people, frames and dust; solid geometry merged at
  build time so a person costs one draw call.
* Light shafts, volumetric cones under every ceiling slot, and a point-sprite
  dust field, all additive and depth-tested.
* HDR target → bright pass → two blur levels → ACES tone map, filmic contrast,
  vignette, grain and a touch of lateral colour, all in one composite pass.
* Adaptive resolution: if the frame rate drops below ~42 fps the device pixel
  ratio steps down.

## Controls

| input | action |
| --- | --- |
| wheel / trackpad | walk forward or back |
| drag (mouse or touch) | walk |
| ← → ↑ ↓, Page Up/Down, Space | walk |
| number keys 1–8, Home / End | jump to a room |
| the dots on the right | jump to a room |
| Sound | a low room tone, off until asked for |

Respects `prefers-reduced-motion` (no camera float, no bob), keeps keyboard focus
visible, and falls back to a readable page if the browser has no WebGL 2.
