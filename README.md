# Mindful Tattva

A scroll-driven walk through seven rooms, in the browser, in WebGL.

Everything you see is ours: the rooms, the gold dunes, the pale pillars, the
benches, the people who stand in them, the dust that hangs in the air, the
textures (all drawn on a canvas at run time), the camera and the film that
the picture goes through. There is not one image, model or texture file in
this repository apart from the three.js library itself.

## The walk

The page is seven rooms tall. The scroll is the clock: as you read down the
page the camera walks one smooth curve from the first chamber to the last,
and every room turns a little as you pass through it. It never jumps and it
never plays on its own.

The chapters:

1. **The room** — a warm chamber with light on its walls
2. **Tailored crafts** — the desert: gold dunes, pale pillars, a table
3. **The eye of the jeweller** — a pass of light between the cliffs
4. **Shaping movement** — the workshop
5. **The Manufacture** — a bright hall of tall windows
6. **The film** — the great screen
7. **The Sound of Craft** — the benches

## Running it

Any static server will do:

```
python3 -m http.server 8080
```

then open <http://localhost:8080/>.

## What is in here

```
index.html          the page
assets/app.css      the frame: type, spacing, the dots, the circle
assets/app.js       the rooms, the people, the dust, the camera
assets/post.js      the film: bloom, the curve of the light, grain, vignette
assets/vendor/      three.js r186
```

No build step, no bundler, no network calls: the site works offline.
