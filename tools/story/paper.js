const offscreen = (w,h) => { const c=document.createElement("canvas");c.width=w;c.height=h;return c; };
const noise=n=>{const a=Math.sin(n*127.1+31.7)*43758.5453123;return a-Math.floor(a);};
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
    export function newspaper(article, index, note, portraits) {
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
      return c;
    }
