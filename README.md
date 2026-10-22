# Mindful Tattva

The club's site is the immersive room in [`cartier/`](cartier).

Open `cartier/index.html` (or serve the folder) and it goes straight into the
room — there is no entry screen.

```
python3 -m http.server 4180 --directory cartier    # http://localhost:4180/
```

Everything the experience needs is inside `cartier/`:

| path | what it is |
| --- | --- |
| `index.html` | lands in the room (redirects to `experience.html`) |
| `experience.html` | the shell: type, chapter navigation, sound |
| `assets/room.js` | the scene: camera, light, chapters |
| `assets/post.js` | the film pass: tone, bloom, grain, vignette |
| `assets/experience.css` | the typography and the chapter UI |
| `webgl/` | the room models and their baked lightmaps |
| `theatre/` | the authored timeline data |
| `shaders/`, `images/` | shaders and stills |

The abandoned club page, the PHP app, the uploaded reference material and the
split source parts are not part of the download; they remain in the commit
history only.
