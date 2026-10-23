# Mindful Tattva

A scroll-driven walk through seven rooms — a heavy WebGL piece rebuilt from the
Cartier *Watches & Wonders* experience, with the watches taken out and the name
changed.

**Mindful Tattva** — a room for the mind, a club for the curious.

---

## What it is

A single static page. There is no backend, no database, no build step: the
visitor downloads a page, a room and nothing else.

* `index.html` — the frame: the loader, the header, the chapter title, the
  opening line, the chapter dots.
* `assets/app.js` — the engine. It loads the room, plays Cartier's own
  `SCENE_01` animation as the master clock, reads the authored timeline
  (`theatre/mainScene.theatre-state.json`) for the light, the camera and the
  interface, and writes the chapter copy into the page.
* `assets/post.js` — the picture: a bloom pass and a film pass (grain,
  vignette, the cut's blur).
* `assets/app.css` — the interface, at the reference's own sizes.
* `webgl/models/` — the room and the people in it.
* `webgl/textures/` — the baked light of every room, the environment probes.
* `webgl/libs/` — the Draco and Basis decoders the room is compressed with.
* `theatre/` — the twenty-four second timeline the whole piece is cut to.
* `shaders/` — the room's own surface shaders.

## Running it

Any static server will do:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

The room needs WebGL 2. On a phone, hold it upright: the field of view is set
on the long edge of the screen, as in the reference.

### The knobs

The page reads a few query parameters, which is how the piece was tuned against
the reference footage:

| parameter | meaning | default |
|---|---|---|
| `?t=12.5` | freeze the master clock at a moment, in seconds | plays |
| `?chapter=4` | jump straight to a chapter | plays |
| `?still=1` | hold the frame (no auto-advance) | off |
| `?exp=` | exposure | `0.78` |
| `?lmi=` | the strength of the baked light | `6` |
| `?decal=` | the pool of light on the floor | `0.3` |
| `?glow=` | the volumes of warm air in the room | `2.6` |
| `?tint=r,g,b` | the colour of the light | `1,0.97,0.92` |
| `?fov=` | the field of view, in degrees on the long edge | from the timeline |

`window.__MT__` exposes the clock, the camera and the renderer for the
console.

## The chapters

| # | chapter | the room |
|---|---|---|
| 0 | *Mindful Tattva* | the opening room, the name in the air |
| 1 | *Tailored crafts, serving one form* | the cylinders |
| 2 | *The eye of the jeweller* | the cliffs |
| 3 | *Shaping movement* | the sand and the light |
| 4 | *The Manufacture* | the wood, the stairs, the panels |
| 5 | *The film* | the screen |
| 6 | *The Sound of Craft* | the bench |

The room's own name is drawn into the opening room's letter planes at run
time: the atlas that the fifteen planes share is redrawn with the new name,
and each plane keeps its place in the line.

## Sound

The sound is off until the visitor asks for it — the **SOUND** button, top
left. `assets/audio/mainTheme.wav` is the theme; `assets/audio/sprites.wav`
carries the room's own noises.

## Credits

The room, the timeline, the interface and the type are Cartier's *Watches &
Wonders* experience, rebuilt as **Mindful Tattva**. The woff2 files in
`assets/fonts/` are Cartier's display faces; Bodoni Moda and Inter (SIL Open
Font License) stand in as fallbacks.

---

The GitHub **Download ZIP** of this repository contains the working website
and nothing else — see `.gitattributes`.
