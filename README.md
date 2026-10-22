# Mindful Tattva — Six Rooms

An immersive site for **Mindful Tattva**, a psychology club. Six box rooms, each
one complete on all four sides, so you can stand in the middle and turn the
whole way around: white trowelled plaster, a tall window onto a desert at
night, black microcement underfoot, gold dust in the air, the club's works hung
on the walls, and the people who listen — cut from photographs.

Scroll, drag, swipe or use the arrow keys to move between rooms; drag to look
around. The room you are in never goes dark between chapters.

## Run it

Any static server works:

```bash
python3 -m http.server 4190
# then open http://localhost:4190/
```

## What is in here

```
index.html              the page, the type, the chrome
assets/style.css        typography, chapter copy, loader, responsive layout
assets/js/main.js       boot, input, camera, light, frame loop
assets/js/world.js      the six rooms: shell, window, works, props, people, dust
assets/js/textures.js   photographic cut-outs, wall works and per-room skies
assets/js/geo.js        geometry: boxes, panels, cylinders, spheres, merges
assets/js/gl.js         WebGL 2 helpers: programs, meshes, render targets
assets/js/post.js       bloom + film composite
assets/js/shaders.js    GLSL: plaster, shadow map, glows, figures, haze, film
assets/js/m4.js         4x4 maths
assets/tex/             the photographs the rooms are built from
```

## How the rooms are made

* **Shell.** Every room is 11 × 11 × 5.4 m with four plaster walls, a ceiling
  and a floor. A slim skirting runs the whole way round. Nothing is a backdrop:
  turn around and the room is still there.
* **Windows.** One whole wall (or, in Room V, the ceiling) opens onto a desert
  photograph. Six different crops and grades of the same night photograph mean
  no two rooms look out on the same view. Brass mullions divide the glass.
* **Walls.** Each room hangs seven to nine framed works — typographic posters
  for the club and graded photographic prints, all cut from the desert
  photograph at load time. A small brass numeral plate sits low on one wall.
* **Light.** A warm key spot from the ceiling with a 2048² shadow map, a soft
  daylight fill coming in through the window, a hemisphere term standing in for
  bounce, three small lamps, and a gold haze at each lamp. The fill is what
  models the plaster; the key is what pools the floor.
* **People.** Backlit figures photographed against black are cut out in the
  browser (flood fill from the border, largest blob, a torso closing pass so a
  coat's shadowed middle stays part of the figure) and billboarded at 1.78 m.
* **Air.** 900 gold motes per room drift on the GPU; a contact shadow, a haze
  sprite and a film pass (ACES, bloom, lateral colour, grain, vignette) finish
  the frame.

## Notes

* No frameworks and no build step. The only external requests are the fonts and
  the eight photographs in `assets/tex/`.
* Desktop and phone. Phones get a 1024² shadow map, a narrower lens and a lower
  ceiling in frame.
* If WebGL 2 or the textures fail, the page falls back to a static still and the
  copy stays readable.
* Everything is original: the type, the works, the rooms. No third-party marks.
