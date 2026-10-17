/* Mindful Tattva · hand / glass / burning Freud / torn psychology archive.
 * Native scroll is the reversible timeline. No screen-recording playback,
 * wheel interception, scroll locking, WebGL dependency or global frame loop.
 * DOM text is the accessible source; canvas is purely illustrative.
 */
(function () {
  'use strict';
  function startStory() {
    const root = document.querySelector('.mind-story');
    if (!root) return;
    const track = root.querySelector('.story-track'), stage = root.querySelector('.story-stage');
    const canvas = root.querySelector('.story-canvas');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    let ctx;
    try { ctx = canvas.getContext('2d', { alpha: true }); } catch (_) { return; }
    if (!ctx) return;
    const shards = Array.from(root.querySelectorAll('.story-shard'));
    const words = Array.from(root.querySelector('.story-type').children);
    const articles = Array.from(root.querySelectorAll('[data-story-paper]'));
    const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
    const mix = (a, b, t) => a + (b - a) * t;
    const smooth = (a, b, n) => { const t = clamp((n - a) / (b - a)); return t * t * (3 - 2 * t); };
    const noise = n => { const a = Math.sin(n * 127.1 + 31.7) * 43758.5453123; return a - Math.floor(a); };
    const offscreen = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
    let W = 1, H = 1, dpr = 1, frame = 0, last = 0, loaded = false, failed = false, loading = false;
    let hand, note, curtain, portraits = [], papers = [], banknotes = [], active = false, visible = false;
    let progress = 0, time = 0, lastScroll = scrollY, lastInput = performance.now(), needsMeasure = true;
    const shardY = [.23, .60, 1.02, 1.40, 1.77, 2.12];

    function staticStory() {
      active = false;
      root.classList.remove('story-enhanced');
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      shards.concat(words).forEach(el => { el.style.removeProperty('transform'); el.style.removeProperty('opacity'); el.style.removeProperty('visibility'); });
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    function configure() {
      if (motion.matches || connection && connection.saveData || failed) { staticStory(); return; }
      root.classList.add('story-enhanced'); active = true; needsMeasure = true; resize(); schedule();
    }
    function resize() {
      if (!active) return;
      W = Math.max(1, stage.clientWidth); H = Math.max(1, stage.clientHeight);
      dpr = Math.min(devicePixelRatio || 1, W > 900 ? 1.5 : 2);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      needsMeasure = true; schedule();
    }
    function image(src) {
      return new Promise((resolve, reject) => {
        const im = new Image(), timer = setTimeout(() => reject(new Error('Illustration timed out')), 8000);
        im.onload = () => { clearTimeout(timer); resolve(im); };
        im.onerror = () => { clearTimeout(timer); reject(new Error('Illustration unavailable')); }; im.src = src;
      });
    }
    function prepare() {
      if (loading || failed) return;
      loading = true;
      // Load only near the chapter, not in competition with the opening herd.
      Promise.all([image('/assets/story/hand.webp'), image('/assets/story/freud-note.webp'), image('/assets/story/rogers-engraving.webp'), image('/assets/story/james-engraving.webp'),
        document.fonts ? Promise.race([Promise.all([document.fonts.load('400 32px "Story Bodoni"'), document.fonts.load('400 32px "Story Script"')]).catch(() => {}), new Promise(resolve => setTimeout(resolve, 1500))]) : Promise.resolve()
      ]).then(images => {
        hand = images[0]; note = images[1]; portraits = [images[2], images[3]]; curtain = velvet();
        papers = articles.map((article, i) => newspaper(article, i));
        banknotes = Array.from({ length: 3 }, (_, i) => ({ canvas: offscreen(500, 202), level: -1, seed: i }));
        loaded = true; schedule();
      }).catch(() => { failed = true; staticStory(); });
    }
    function velvet() {
      const c = offscreen(640, 1000), g = c.getContext('2d'), data = g.createImageData(c.width, c.height);
      for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) {
        const u = x / c.width, v = y / c.height;
        const folds = Math.pow(.5 + .5 * Math.sin(u * 37 + Math.sin(u * 14) * 1.1 + Math.sin(v * 3) * .15), 2.4);
        const velvetShade = .4 + .6 * Math.pow(Math.sin(Math.PI * u), .55);
        const grain = (noise(x + y * c.width) - .5) * 16;
        const light = (32 + 148 * folds) * velvetShade * (1 - .22 * v);
        const at = (y * c.width + x) * 4;
        data.data[at] = clamp(light + grain, 0, 255); data.data[at + 1] = clamp(light * .058 + grain * .18, 0, 255);
        data.data[at + 2] = clamp(light * .044 + grain * .14, 0, 255); data.data[at + 3] = 255;
      }
      g.putImageData(data, 0, 0); return c;
    }
    function wrap(g, text, x, y, width, line, maxLines = 99) {
      const words = text.trim().split(/\s+/); let row = '', count = 0;
      for (const word of words) {
        const test = row ? row + ' ' + word : word;
        if (g.measureText(test).width > width && row) { g.fillText(row, x, y); y += line; row = word; if (++count >= maxLines) return y; }
        else row = test;
      }
      if (row) g.fillText(row, x, y);
      return y + line;
    }
    function newspaper(article, index) {
      const c = offscreen(560, 760), g = c.getContext('2d');
      const pixels = g.createImageData(c.width, c.height);
      for (let i = 0; i < pixels.data.length; i += 4) {
        const shade = noise(i + index * 70) * 15;
        pixels.data[i] = 225 + shade; pixels.data[i + 1] = 218 + shade; pixels.data[i + 2] = 197 + shade; pixels.data[i + 3] = 255;
      }
      g.putImageData(pixels, 0, 0); g.fillStyle = '#282920'; g.strokeStyle = '#474839';
      g.textAlign = 'center'; g.font = '400 33px "Story Bodoni", Georgia'; g.fillText('The Mindful Chronicle', 280, 50);
      g.font = '10px Georgia'; g.fillText('PSYCHOLOGY  /  IDEAS  /  THE HUMAN EXPERIENCE', 280, 72);
      g.lineWidth = 2; g.strokeRect(22, 86, 516, 1); g.lineWidth = .6;
      g.font = '10px Georgia'; g.fillText('ILLUSTRATED ARCHIVE                                      ' + article.dataset.year, 280, 107);
      g.font = '400 44px "Story Bodoni", Georgia';
      const title = article.querySelector('h3').textContent;
      let titleEnd = wrap(g, title, 280, 164, 492, 47, 2);
      g.font = 'italic 18px Georgia'; titleEnd = wrap(g, article.querySelector('h4').textContent, 280, titleEnd + 7, 480, 23, 2);
      const py = titleEnd + 15, ph = 205;
      if (index === 0) {
        g.save(); g.filter = 'grayscale(1) contrast(1.15)';
        g.drawImage(note, note.width * .391, note.height * .148, note.width * .237, note.height * .68, 175, py, 210, ph); g.restore();
      } else if (index < 3) {
        const portrait = portraits[index - 1], pw = ph * portrait.width / portrait.height;
        g.save(); g.filter = 'grayscale(1) contrast(1.05)'; g.drawImage(portrait, (560 - pw) / 2, py, pw, ph); g.restore();
      } else {
        g.save(); g.translate(280, py + ph / 2);
        g.beginPath(); g.ellipse(0, 0, 83, 96, 0, 0, Math.PI * 2); g.stroke();
        for (let j = 0; j < 13; j++) {
          g.beginPath(); g.moveTo(-60, (j - 6) * 10);
          g.bezierCurveTo(-28, Math.sin(j) * 48, 28, Math.cos(j) * 48, 60, (j - 6) * 9); g.stroke();
        }
        g.font = 'bold 16px Georgia'; g.fillText('28 COUNTRIES', 0, 75);
        g.restore();
      }
      let by = py + ph + 28;
      g.textAlign = 'left'; g.font = '12px Georgia';
      const paragraphs = Array.from(article.querySelectorAll('p')).map(p => p.textContent.trim());
      wrap(g, paragraphs[0], 28, by, 241, 17, 10); wrap(g, paragraphs[1], 292, by, 240, 17, 10);
      g.beginPath(); g.moveTo(280, by - 10); g.lineTo(280, 707); g.stroke();
      g.textAlign = 'center'; g.font = 'bold 13px Georgia';
      g.fillText('READ. DISCUSS. RECONSIDER.', 280, 680);
      g.font = '11px Georgia'; g.fillText('A good question makes room for another perspective.', 280, 702);
      g.beginPath(); g.moveTo(24, 720); g.lineTo(536, 720); g.stroke();
      g.font = '9px Georgia'; g.textAlign = 'center'; g.fillText('MINDFUL TATTVA  ·  KEEP ASKING QUESTIONS  ·  NOT A HISTORICAL FACSIMILE', 280, 738);
      // Light paper creases, foxing and imperfect print are baked into the texture.
      const crease = g.createLinearGradient(260, 0, 290, 0); crease.addColorStop(0, '#0000'); crease.addColorStop(.5, '#584b2922'); crease.addColorStop(1, '#fff0'); g.fillStyle = crease; g.fillRect(0, 0, 560, 760);
      return { image: c, fragments: fragments(c, index) };
    }
    function fragments(sheet, seed) {
      const pieces = [], cols = 3, rows = 2, sw = sheet.width, sh = sheet.height;
      function vertical(col, y) { return col === 0 || col === cols ? col * sw / cols : col * sw / cols + (noise(y * 2 + col * 17 + seed) - .5) * 17; }
      function horizontal(row, x) { return row === 0 || row === rows ? row * sh / rows : row * sh / rows + (noise(x * 3 + row * 29 + seed) - .5) * 18; }
      for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
        const x0 = Math.floor(col * sw / cols) - 11, y0 = Math.floor(row * sh / rows) - 11;
        const pw = Math.ceil(sw / cols) + 22, ph = Math.ceil(sh / rows) + 22;
        const c = offscreen(pw, ph), g = c.getContext('2d'); g.beginPath();
        for (let j = 0; j <= 25; j++) { const x = mix(col * sw / cols, (col + 1) * sw / cols, j / 25); const y = horizontal(row, x); if (!j) g.moveTo(x - x0, y - y0); else g.lineTo(x - x0, y - y0); }
        for (let j = 1; j <= 40; j++) { const y = mix(row * sh / rows, (row + 1) * sh / rows, j / 40); g.lineTo(vertical(col + 1, y) - x0, y - y0); }
        for (let j = 25; j >= 0; j--) { const x = mix(col * sw / cols, (col + 1) * sw / cols, j / 25); g.lineTo(x - x0, horizontal(row + 1, x) - y0); }
        for (let j = 39; j >= 0; j--) { const y = mix(row * sh / rows, (row + 1) * sh / rows, j / 40); g.lineTo(vertical(col, y) - x0, y - y0); }
        g.closePath(); g.save(); g.clip(); g.drawImage(sheet, -x0, -y0); g.restore();
        g.strokeStyle = '#fff4d9a0'; g.lineWidth = 1.3; g.stroke();
        pieces.push({ image: c, x: (x0 + pw / 2) / sw - .5, y: (y0 + ph / 2) / sh - .5, width: pw / sw, height: ph / sh, col, row });
      }
      return pieces;
    }
    function burntNote(item, burn) {
      const level = Math.round(clamp(burn) * 220);
      if (item.level === level) return item.canvas;
      item.level = level;
      const g = item.canvas.getContext('2d'), w = item.canvas.width, h = item.canvas.height;
      g.clearRect(0, 0, w, h); g.drawImage(note, 0, 0, w, h);
      if (!level) return item.canvas;
      const amount = level / 220, boundary = [];
      for (let y = -3; y <= h + 3; y += 3) {
        const wave = Math.sin(y * .071 + item.seed * 2) * 13 + Math.sin(y * .213 + item.seed) * 5 + (noise(y + item.seed * 500) - .5) * 13;
        boundary.push([mix(-45, w + 50, amount) + wave, y]);
      }
      g.save(); g.globalCompositeOperation = 'destination-out'; g.beginPath(); g.moveTo(-5, -5); boundary.forEach(p => g.lineTo(p[0], p[1])); g.lineTo(-5, h + 5); g.closePath(); g.fill(); g.restore();
      if (amount < .97) {
        g.save(); g.beginPath(); boundary.forEach((p, i) => i ? g.lineTo(p[0] + 2, p[1]) : g.moveTo(p[0] + 2, p[1]));
        g.shadowBlur = 15; g.shadowColor = '#ff6e08'; g.lineWidth = 6; g.strokeStyle = '#cc4b0b'; g.stroke();
        g.shadowBlur = 7; g.lineWidth = 2.6; g.strokeStyle = '#ffbd25'; g.stroke(); g.shadowBlur = 0; g.lineWidth = 1; g.strokeStyle = '#fff2a2'; g.stroke(); g.restore();
      }
      return item.canvas;
    }
    // Perspective-correct piecewise affine texture drawing. Curl is in z, not a
    // flat CSS card wobble. All coordinates depend on scroll, so tearing reverses.
    function mesh(image, cx, cy, width, height, rx, ry, rz, curl, seed, alpha = 1, cols = 8, rows = 2) {
      if (alpha <= .005 || width < 1 || height < 1) return;
      const points = [], crx = Math.cos(rx), srx = Math.sin(rx), cry = Math.cos(ry), sry = Math.sin(ry), crz = Math.cos(rz), srz = Math.sin(rz);
      const focal = Math.max(900, W * .85);
      for (let y = 0; y <= rows; y++) for (let x = 0; x <= cols; x++) {
        let px = (x / cols - .5) * width, py = (y / rows - .5) * height;
        let pz = Math.sin(x / cols * Math.PI * 2 + seed) * curl + Math.sin(y / rows * Math.PI + seed) * curl * .4;
        const yy = py * crx - pz * srx, zz = py * srx + pz * crx;
        const xx = px * cry + zz * sry; pz = -px * sry + zz * cry;
        px = xx * crz - yy * srz; py = xx * srz + yy * crz;
        const perspective = focal / Math.max(focal * .25, focal + pz);
        points.push({ x: cx + px * perspective, y: cy + py * perspective, u: x / cols * image.width, v: y / rows * image.height });
      }
      ctx.save(); ctx.globalAlpha *= clamp(alpha);
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const a = points[y * (cols + 1) + x], b = points[y * (cols + 1) + x + 1], c = points[(y + 1) * (cols + 1) + x], d = points[(y + 1) * (cols + 1) + x + 1];
        triangle(image, a, b, c); triangle(image, b, d, c);
      }
      ctx.restore();
    }
    function triangle(image, a, b, c) {
      const det = a.u * (b.v - c.v) + b.u * (c.v - a.v) + c.u * (a.v - b.v);
      if (Math.abs(det) < .01) return;
      const aa = (a.x * (b.v - c.v) + b.x * (c.v - a.v) + c.x * (a.v - b.v)) / det;
      const bb = (a.y * (b.v - c.v) + b.y * (c.v - a.v) + c.y * (a.v - b.v)) / det;
      const cc = (a.x * (c.u - b.u) + b.x * (a.u - c.u) + c.x * (b.u - a.u)) / det;
      const dd = (a.y * (c.u - b.u) + b.y * (a.u - c.u) + c.y * (b.u - a.u)) / det;
      const ee = a.x - aa * a.u - cc * a.v, ff = a.y - bb * a.u - dd * a.v;
      ctx.save(); ctx.beginPath();
      // Subpixel overlap hides antialiasing seams without blurring the print.
      const mx = (a.x + b.x + c.x) / 3, my = (a.y + b.y + c.y) / 3;
      [a, b, c].forEach((p, i) => { const dx = p.x - mx, dy = p.y - my, len = Math.hypot(dx, dy) || 1; const x = p.x + dx / len * 1.2, y = p.y + dy / len * 1.2; if (!i) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
      ctx.closePath(); ctx.clip(); ctx.transform(aa, bb, cc, dd, ee, ff); ctx.drawImage(image, 0, 0); ctx.restore();
    }
    function crack(p) {
      const reach = smooth(.064, .083, p), alpha = smooth(.064, .074, p) * (1 - smooth(.09, .15, p));
      if (alpha < .005) return;
      ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = '#fff5dfb0'; ctx.lineWidth = .8; ctx.shadowBlur = 5; ctx.shadowColor = '#ffe0cc';
      const cx = W * .51, cy = H * .42, count = 19, rings = [];
      for (let j = 0; j < 3; j++) {
        const ring = [];
        for (let i = 0; i < count; i++) {
          const a = i / count * Math.PI * 2 + noise(i) * .2, r = H * [.12, .32, .95][j] * (.75 + noise(i + j * 20) * .4) * reach;
          ring.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
        }
        rings.push(ring);
      }
      for (let i = 0; i < count; i++) {
        ctx.beginPath(); ctx.moveTo(cx, cy); rings.forEach(r => ctx.lineTo(r[i][0], r[i][1])); ctx.stroke();
        for (let j = 0; j < 2; j++) { ctx.beginPath(); ctx.moveTo(rings[j][i][0], rings[j][i][1]); ctx.lineTo(rings[j][(i + 1) % count][0], rings[j][(i + 1) % count][1]); ctx.stroke(); }
      }
      ctx.restore();
    }
    function glassChips(p) {
      const travel = smooth(.082, .34, p), alpha = smooth(.075, .10, p) * (1 - smooth(.29, .35, p));
      if (alpha < .005) return;
      ctx.save(); ctx.globalAlpha *= alpha;
      for (let i = 0; i < 13; i++) {
        const x = W * (.08 + noise(i * 3) * .84) + Math.sin(i * 2) * travel * W * .13;
        const y = H * (.2 + noise(i * 8) * 1.5 - travel * 2.1), size = 9 + noise(i * 11) * 21;
        ctx.save(); ctx.translate(x, y); ctx.rotate(i + travel * (i % 2 ? 2 : -2));
        ctx.beginPath(); ctx.moveTo(-size * .6, -size * .5); ctx.lineTo(size, -size * .15); ctx.lineTo(size * .4, size); ctx.closePath();
        ctx.fillStyle = '#ffffff0c'; ctx.fill(); ctx.strokeStyle = i % 3 ? '#ffefdb80' : '#c3e7ff90'; ctx.lineWidth = .7; ctx.stroke(); ctx.restore();
      }
      ctx.restore();
    }
    function drawGlass(p) {
      const rise = smooth(.115, .345, p) * H * 2.25;
      shards.forEach((shard, i) => {
        const w = shard.offsetWidth, h = shard.offsetHeight;
        const baseX = [.50, .32, .69, .33, .68, .40][i];
        const cx = clamp(W * baseX, w / 2 + 9, W - w / 2 - 9);
        const birth = smooth(.073 + i * .003, .10 + i * .003, p);
        const y = H * shardY[i] - rise + (1 - birth) * 95;
        const rotate = Math.sin(time * .32 + i * 1.6) * 2.5;
        const yaw = Math.sin(i * 2.7 + (p - .14) * 9) * (W < 600 ? 7 : 17);
        const alpha = birth * (1 - smooth(.315, .355, p));
        shard.style.opacity = alpha.toFixed(3);
        shard.style.transform = 'translate3d(' + (cx - w / 2).toFixed(2) + 'px,' + (y - h / 2).toFixed(2) + 'px,0) rotateX(' + (Math.sin(i + time * .12) * 6).toFixed(2) + 'deg) rotateY(' + yaw.toFixed(2) + 'deg) rotateZ(' + (rotate + (i % 2 ? -5 : 5)).toFixed(2) + 'deg)';
      });
    }
    function drawHand(p) {
      if (p > .365) return;
      const entry = smooth(0, .072, p), punch = Math.sin(smooth(.065, .105, p) * Math.PI) * .12;
      const retire = smooth(.22, .365, p), scale = (1 + punch) * mix(1, .38, retire);
      const h = Math.min(H * 1.04, W * 2.3) * scale, w = h * hand.width / hand.height;
      const cx = W * .56, top = H * .155 + H * (1 - entry) * .83 + retire * H * .20;
      ctx.save(); ctx.globalAlpha *= 1 - smooth(.31, .365, p);
      ctx.translate(cx, top + h * .52); ctx.rotate((-.035 + punch * .5) * (1 - retire));
      if (retire > 0) ctx.filter = 'grayscale(' + retire.toFixed(3) + ') brightness(' + (1 + retire * .5).toFixed(3) + ')';
      ctx.drawImage(hand, -w / 2, -h * .52, w, h); ctx.restore();
    }
    function drawMoney(p) {
      const entry = smooth(.335, .392, p), leave = smooth(.49, .565, p);
      if (entry <= 0 || leave >= 1) return;
      const burn = smooth(.405, .548, p);
      // Small notes behind, the Freud portrait crosses the foreground last.
      [2, 1, 0].forEach(i => {
        const image = burntNote(banknotes[i], clamp(burn + (i - 1) * .11));
        const size = i === 0 ? Math.min(W * 1.02, 960) : Math.min(W * .67, 610);
        const cx = W * [.50, .18, .85][i] + Math.sin(time * .3 + i * 2) * 8 + (1 - entry) * W * (i % 2 ? -1 : 1);
        const cy = H * [.43, .22, .71][i] - leave * H * .38;
        mesh(image, cx, cy, size, size * .404, .26 + Math.sin(time * .18 + i) * .12, Math.sin(time * .16 + i) * .3, [-.15, -.48, .52][i] + leave * .3, size * .075, time * .5 + i * 1.7, entry * (1 - leave), W < 600 ? 8 : 12, 2);
      });
      ctx.save(); ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 55; i++) {
        const drift = (time * .22 + noise(i * 7)) % 1;
        const x = W * (.15 + .7 * noise(i * 3)) + Math.sin(time + i) * 12, y = H * (.8 - drift * .85);
        const a = burn * (1 - leave) * Math.sin(drift * Math.PI) * .8;
        ctx.fillStyle = 'rgba(255, ' + (100 + Math.round(noise(i) * 110)) + ', 25,' + a.toFixed(3) + ')';
        ctx.fillRect(x, y, 1 + noise(i * 9) * 2, 2 + noise(i * 4) * 4);
      }
      ctx.restore();
    }
    function drawPapers(p) {
      const enter = smooth(.635, .715, p), exit = smooth(.92, .985, p);
      if (enter <= 0 || exit >= 1) return;
      const tear = smooth(.745, .915, p), forward = smooth(.675, .97, p);
      const ids = W < 600 ? [0, 1, 3] : [0, 1, 2, 3];
      for (let slot = ids.length - 1; slot >= 0; slot--) {
        const i = ids[slot], page = papers[i], base = Math.min(W * (W < 600 ? .65 : .32), 470);
        const size = base * mix(.76, 1.17, forward);
        const cx = W * [.32, .75, .66, .15][slot] + (1 - enter) * W * (i % 2 ? 1 : -1) * .6;
        const cy = H * [.43, .68, .15, .86][slot] - forward * H * .13;
        const rz = [-.24, .21, .38, -.37][slot] + Math.sin(time * .23 + i) * .025;
        const alpha = enter * (1 - exit) * (p < .7 ? .42 : 1);
        if (tear < .001) mesh(page.image, cx, cy, size, size * 760 / 560, -.10, Math.sin(i * 2) * .22, rz, size * .065, time * .35 + i, alpha, 5, 3);
        else page.fragments.forEach((piece, j) => {
          const spread = tear * tear;
          const dx = piece.x * size, dy = piece.y * size * 760 / 560;
          const x = cx + dx * Math.cos(rz) - dy * Math.sin(rz) + (piece.col - 1 + (i % 2 ? .5 : -.5)) * W * spread * 1.12;
          const y = cy + dx * Math.sin(rz) + dy * Math.cos(rz) + (piece.row ? 1 : -1) * H * spread * .88;
          mesh(piece.image, x, y, size * piece.width, size * 760 / 560 * piece.height, -.10 + tear * Math.sin(j * 3) * 1.1, tear * Math.sin(j * 2 + i) * 1.4, rz + tear * (noise(j + i * 10) - .5) * 2.1, size * (.02 + tear * .21), time * .45 + i + j * .8, alpha, 3, 3);
        });
      }
    }
    function draw(now) {
      frame = 0;
      if (!active || document.hidden) { last = 0; return; }
      if (needsMeasure) {
        const bounds = track.getBoundingClientRect();
        visible = bounds.top < innerHeight && bounds.bottom > 0;
        progress = clamp(-bounds.top / Math.max(1, track.offsetHeight - H));
        needsMeasure = false;
        if (visible && !loading) prepare();
      }
      if (!visible) { last = 0; return; }
      if (now - last < (now - lastInput < 300 ? 32 : 90)) { schedule(); return; }
      const dt = last ? Math.min(now - last, 100) : 33; last = now; time += dt / 1000;
      const p = progress, fade = 1 - smooth(.925, .995, p);
      ctx.clearRect(0, 0, W, H);
      ctx.save(); ctx.globalAlpha = fade;
      const green = smooth(.31, .395, p), bg = ctx.createRadialGradient(W * .51, H * .44, 20, W * .5, H * .4, Math.max(W, H) * .8);
      bg.addColorStop(0, '#163b2a'); bg.addColorStop(.5, '#071910'); bg.addColorStop(1, '#010403');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      if (curtain && green < 1) { ctx.save(); ctx.globalAlpha *= 1 - green; ctx.drawImage(curtain, 0, 0, W, H); ctx.restore(); }
      else if (!loaded && green < 1) { ctx.fillStyle = '#5a0907'; ctx.fillRect(0, 0, W, H); }
      if (loaded) { drawHand(p); crack(p); glassChips(p); drawMoney(p); drawPapers(p); }
      ctx.restore(); drawGlass(p);
      words.forEach((word, i) => {
        const alpha = smooth([.49, .555, .605][i], [.535, .595, .655][i], p) * (1 - smooth(.70, .754, p));
        word.style.opacity = alpha.toFixed(3);
        word.style.transform = 'translateY(' + ((1 - smooth([.49, .555, .605][i], [.54, .60, .66][i], p)) * 70 - smooth(.70, .76, p) * 70).toFixed(2) + 'px)';
      });
      root.dataset.storyPhase = p < .335 ? 'glass' : p < .55 ? 'freud' : p < .71 ? 'human' : p < .93 ? 'newspaper' : 'herd';
      root.style.setProperty('--story-progress', p.toFixed(5));
      // Fine breathing/curling only while the stage is actually in view.
      if (loaded && p > 0 && p < .995) schedule();
    }
    function schedule() { if (!frame && active && !document.hidden) frame = requestAnimationFrame(draw); }
    addEventListener('scroll', () => { if (scrollY !== lastScroll) { lastScroll = scrollY; lastInput = performance.now(); needsMeasure = true; schedule(); } }, { passive: true });
    addEventListener('resize', resize, { passive: true });
    addEventListener('pageshow', () => { needsMeasure = true; schedule(); });
    document.addEventListener('visibilitychange', () => { last = 0; needsMeasure = true; schedule(); });
    if (motion.addEventListener) motion.addEventListener('change', configure);
    else if (motion.addListener) motion.addListener(configure);
    if (connection && connection.addEventListener) connection.addEventListener('change', configure);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting) && active) prepare();
      }, { rootMargin: '1000px' }); observer.observe(track);
    }
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(stage);
    configure();
  }
  // Production inlines local scripts; defer on an inline script is ignored.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startStory, { once: true });
  else startStory();
})();
