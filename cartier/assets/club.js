/* ==========================================================================
   Mindful Tattva — club site behaviour
   --------------------------------------------------------------------------
   • Loads the club content from the PHP API (/api/site) and falls back to the
     bundled club-data.json snapshot, so the page also works as a static site.
   • Builds the sideways gallery. Uploaded gallery photos come first; whatever
     is missing from the reference wall of 10 is filled with temporary
     psychologist portraits. As soon as the gallery fills up, the placeholders
     disappear — and they come back if photos are removed again.
   ========================================================================== */
(function () {
  'use strict';

  var SLOTS = 10;                 // the reference wall holds ten frames
  var root = document.documentElement;
  var boot = document.getElementById('mt-boot');
  var bootNum = document.getElementById('mt-boot-num');

  /* ── temporary portraits ───────────────────────────────────────────────── */
  var PLACEHOLDERS = [
    { file: 'freud',   name: 'Sigmund Freud',   years: '1856 – 1939', note: 'Psychoanalysis, the unconscious, the talking cure.' },
    { file: 'jung',    name: 'Carl Gustav Jung', years: '1875 – 1961', note: 'Archetypes, the collective unconscious, individuation.' },
    { file: 'adler',   name: 'Alfred Adler',    years: '1870 – 1937', note: 'Individual psychology, belonging and social interest.' },
    { file: 'klein',   name: 'Melanie Klein',   years: '1882 – 1960', note: 'Object relations and play as a language of the mind.' },
    { file: 'bowlby',  name: 'John Bowlby',     years: '1907 – 1990', note: 'Attachment theory: the bond that shapes us.' },
    { file: 'pavlov',  name: 'Ivan Pavlov',     years: '1849 – 1936', note: 'Conditioned reflexes and the physiology of behaviour.' },
    { file: 'skinner', name: 'B. F. Skinner',   years: '1904 – 1990', note: 'Operant behaviour and the shaping of habits.' },
    { file: 'frankl',  name: 'Viktor Frankl',   years: '1905 – 1997', note: 'Logotherapy: meaning as a path through suffering.' },
    { file: 'maslow',  name: 'Abraham Maslow',  years: '1908 – 1970', note: 'Humanistic psychology and the hierarchy of needs.' },
    { file: 'rogers',  name: 'Carl Rogers',     years: '1902 – 1987', note: 'Person-centred therapy, empathy and unconditional regard.' }
  ];

  /* ── tiny helpers ──────────────────────────────────────────────────────── */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function text(v) { return v == null ? '' : String(v); }

  function fillFields(data) {
    all('[data-field]').forEach(function (el) {
      var key = el.getAttribute('data-field');
      var value = text(data[key]);
      if (!value) return;
      if (el.tagName === 'A') {
        el.textContent = value;
        if (key === 'email') el.href = 'mailto:' + value;
        else if (key === 'instagramHandle') el.href = text(data.instagramUrl) || '#';
      } else {
        el.textContent = value;
      }
    });
  }

  /* ── content ───────────────────────────────────────────────────────────── */
  function loadContent() {
    return fetch('/api/site', { headers: { accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error('api ' + r.status); return r.json(); })
      .catch(function () {
        return fetch('/club-data.json', { headers: { accept: 'application/json' } })
          .then(function (r) { if (!r.ok) throw new Error('snapshot ' + r.status); return r.json(); });
      })
      .then(function (payload) {
        return {
          site: (payload && payload.site) || {},
          gallery: (payload && payload.gallery) || []
        };
      })
      .catch(function () { return { site: {}, gallery: [] }; });
  }

  /* ── gallery ───────────────────────────────────────────────────────────── */
  var track = document.getElementById('mt-gallery-track');
  var countEl = document.getElementById('mt-gallery-count');
  var barEl = document.getElementById('mt-gallery-bar');
  var cards = [];

  function uploadedPhotos(list) {
    return (list || []).filter(function (item) {
      if (!item || item.visible === false) return false;
      var img = text(item.image);
      if (!img) return false;
      // the club logo is a stand-in the CMS starts with — it is not a photo
      return !/mt-club-logo/i.test(img);
    });
  }

  /** Test hook: ?gallery=3 renders three uploaded photos, ?gallery=0 none. */
  function debugPhotoCount() {
    var q = new URLSearchParams(window.location.search).get('gallery');
    if (q === null) return null;
    var n = parseInt(q, 10);
    return isNaN(n) ? null : n;
  }

  function buildGallery(photos) {
    var forced = debugPhotoCount();
    var uploaded = uploadedPhotos(photos);
    if (forced !== null) {
      uploaded = [];
      for (var t = 0; t < Math.min(forced, SLOTS); t += 1) {
        uploaded.push({ image: '/assets/photos/campus.jpg', caption: 'Test photo ' + (t + 1), alt: 'Test photo ' + (t + 1) });
      }
    }

    var placed = uploaded.slice().map(function (item) {
      return {
        kind: 'photo',
        src: item.image,
        alt: text(item.alt) || text(item.caption) || 'Mindful Tattva gallery photo',
        name: text(item.caption) || text(item.event) || 'Mindful Tattva',
        meta: text(item.date) || 'Gallery',
        note: ''
      };
    });

    var needed = Math.max(0, SLOTS - placed.length);
    PLACEHOLDERS.slice(0, needed).forEach(function (p) {
      placed.push({
        kind: 'placeholder',
        src: '/images/psychologists/' + p.file + '-portrait.jpg',
        alt: p.name,
        name: p.name,
        meta: p.years,
        note: p.note
      });
    });

    track.innerHTML = '';
    cards = placed.map(function (item, index) {
      var fig = document.createElement('figure');
      fig.className = 'mt-card' + (item.kind === 'placeholder' ? ' mt-card--placeholder' : '');
      fig.setAttribute('data-kind', item.kind);

      var frame = document.createElement('div');
      frame.className = 'mt-card__frame';
      var img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt;
      img.loading = index < 3 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.addEventListener('error', function () {
        if (fig.getAttribute('data-fallback') === '1') return;
        fig.setAttribute('data-fallback', '1');
        var fb = PLACEHOLDERS[(index + 2) % PLACEHOLDERS.length];
        img.src = '/images/psychologists/' + fb.file + '-portrait.jpg';
      });
      frame.appendChild(img);

      if (item.kind === 'placeholder') {
        var tag = document.createElement('span');
        tag.className = 'mt-card__tag';
        tag.textContent = 'Placeholder';
        frame.appendChild(tag);
      }

      var body = document.createElement('figcaption');
      body.className = 'mt-card__body';
      body.innerHTML =
        '<span class="mt-card__name"></span>' +
        '<span class="mt-card__meta"></span>' +
        (item.note ? '<span class="mt-card__note"></span>' : '');
      $('.mt-card__name', body).textContent = item.name;
      $('.mt-card__meta', body).textContent = item.meta;
      if (item.note) $('.mt-card__note', body).textContent = item.note;

      fig.appendChild(frame);
      fig.appendChild(body);
      track.appendChild(fig);
      return fig;
    });

    var placeholdersUsed = placed.length - uploaded.length;
    countEl.textContent = uploaded.length + ' photo' + (uploaded.length === 1 ? '' : 's') +
      (placeholdersUsed ? ' · ' + placeholdersUsed + ' placeholder' + (placeholdersUsed === 1 ? '' : 's') : '');

    track.setAttribute('aria-label', 'Gallery — ' + uploaded.length + ' photos and ' + placeholdersUsed + ' placeholders');
    root.setAttribute('data-mt-gallery-photos', String(uploaded.length));
    root.setAttribute('data-mt-gallery-placeholders', String(placeholdersUsed));
    requestAnimationFrame(measureGallery);
  }

  /* ── sideways scroll ───────────────────────────────────────────────────── */
  var gallery = document.getElementById('gallery');
  var galleryState = { progress: 0, max: 0, reduced: false };

  function measureGallery() {
    galleryState.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var viewportW = track.parentElement.clientWidth;
    galleryState.max = Math.max(0, track.scrollWidth - viewportW);
    gallery.style.height = (galleryState.reduced ? 0 : 0) || '';
    if (galleryState.reduced) gallery.style.height = 'auto';
    updateGallery();
  }

  function updateGallery() {
    if (galleryState.reduced) { track.style.transform = ''; barEl.style.width = '0%'; return; }
    var rect = gallery.getBoundingClientRect();
    var span = Math.max(1, rect.height - window.innerHeight);
    var p = Math.min(1, Math.max(0, -rect.top / span));
    galleryState.progress = p;
    track.style.transform = 'translate3d(' + (-galleryState.max * p).toFixed(2) + 'px,0,0)';
    barEl.style.width = (p * 100).toFixed(2) + '%';
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateGallery();
      ticking = false;
    });
  }

  /* keyboard + trackpad on the strip itself */
  function wireGalleryKeys() {
    track.addEventListener('wheel', function (e) {
      if (galleryState.max <= 0) return;
      var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!delta) return;
      var before = galleryState.progress;
      var next = Math.min(1, Math.max(0, before + delta / (galleryState.max * 2.4)));
      if (next === before) return;
      e.preventDefault();
      window.scrollTo({ top: gallery.offsetTop + (gallery.offsetHeight - window.innerHeight) * next, behavior: 'auto' });
    }, { passive: false });

    track.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var dir = e.key === 'ArrowRight' ? 1 : -1;
      var next = Math.min(1, Math.max(0, galleryState.progress + dir * 0.12));
      window.scrollTo({ top: gallery.offsetTop + (gallery.offsetHeight - window.innerHeight) * next, behavior: 'smooth' });
      e.preventDefault();
    });
  }

  /* ── reveal ────────────────────────────────────────────────────────────── */
  function wireReveal() {
    var targets = all('.mt-h2, .mt-body, .mt-pillars article, .mt-visit__list > div, .mt-stats li, .mt-card');
    targets.forEach(function (el) { el.setAttribute('data-reveal', ''); });
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ── loader ────────────────────────────────────────────────────────────── */
  function runLoader(work) {
    var shown = 0;
    var target = 38;   // start climbing immediately, then follow the real work
    var started = performance.now();

    var painting = false;
    function paint() {
      var value = Math.min(100, Math.round(shown));
      bootNum.textContent = (value < 10 ? '0' : '') + value;
      if (shown < target - 0.05) {
        shown += Math.max(0.8, (target - shown) * 0.16);
        painting = true;
        requestAnimationFrame(paint);
      } else {
        shown = target;
        painting = false;
      }
    }

    function kick() {
      if (painting) return;
      painting = true;
      requestAnimationFrame(paint);
    }

    var images = [];
    var mark = function (n) { target = Math.min(92, target + n); };

    // Warm the portrait and gallery frames so the wall never flickers in.
    work.then(function (data) {
      var list = [];
      PLACEHOLDERS.forEach(function (p) { list.push('/images/psychologists/' + p.file + '-portrait.jpg'); });
      list = list.concat(uploadedPhotos(data && data.gallery).map(function (item) { return item.image; }));
      list.forEach(function (src) {
        var img = new Image();
        img.onload = img.onerror = function () { mark(92 / Math.max(1, list.length)); kick(); };
        img.src = src;
        images.push(img);
      });
      if (!list.length) { target = 92; kick(); }
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { target = Math.max(target, 96); kick(); });
    });

    kick();

    // Never hold a visitor at the door.
    var safety = 2300;
    work.then(function () {
      var wait = Math.max(700, safety - (performance.now() - started));
      window.setTimeout(function () { target = 100; finish(); kick(); }, wait);
    });

    function finish() {
      target = 100;
      var poll = window.setInterval(function () {
        if (shown < 99.4) return;
        window.clearInterval(poll);
        bootNum.textContent = '100';
        window.setTimeout(function () {
          boot.setAttribute('data-done', '1');
          document.body.classList.remove('is-locked');
          window.setTimeout(function () { boot.parentNode && boot.parentNode.removeChild(boot); }, 800);
        }, 220);
      }, 60);
    }
  }

  /* ── boot ──────────────────────────────────────────────────────────────── */
  function start() {
    document.body.classList.add('is-locked');

    var content = loadContent();
    runLoader(content);

    content.then(function (data) {
      var site = data.site || {};
      fillFields(site);

      var stats = document.getElementById('mt-stats');
      (site.stats || []).forEach(function (stat) {
        if (!stat) return;
        var li = document.createElement('li');
        var b = document.createElement('b');
        var s = document.createElement('span');
        b.textContent = text(stat.value);
        s.textContent = text(stat.label);
        li.appendChild(b); li.appendChild(s);
        stats.appendChild(li);
      });

      buildGallery(data.gallery);
      wireReveal();
      wireGalleryKeys();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', measureGallery);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureGallery);
      window.setTimeout(measureGallery, 600);
      updateGallery();
      document.title = 'Mindful Tattva — ' + (site.tagline || 'A Psychology Club');
    });

    // expose a little state for the deploy checks
    window.MT_CLUB = {
      slots: SLOTS,
      rebuild: function () { content.then(function (d) { buildGallery(d.gallery); }); },
      state: galleryState
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
