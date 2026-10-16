/* ==========================================================================
   Mindful Tattva · public site script
   --------------------------------------------------------------------------
   Every word and picture on a page is already in the HTML, written by PHP from
   the club's own content. This file only adds movement and the small moments
   of interaction:

     · the drifting bubbles and the sections that lift into place
     · the reveal that lifts each section into place
     · the mobile menu
     · the photo gallery's stage on the gallery page
     · the club forms and the payment screenshot upload
     · a quiet check for new content while the club is editing
   ========================================================================== */
(function () {
  'use strict';

  const $ = function (selector, root) { return (root || document).querySelector(selector); };
  const $$ = function (selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); };
  const readJson = function (id) {
    const node = document.getElementById(id);
    if (!node) return {};
    try { return JSON.parse(node.textContent || '{}'); } catch (error) { return {}; }
  };
  const reduced = function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  function setupReveal() {
    // Reveal words and tiles, not their entire containing section twice.
    const targets = $$('.section-head > *, .section > .container > h2, .section > .container > p, .detail-card, .event-card, .gallery-item, .team-card, .calendar-item, .member-card, .gallery-stage, .calendar-month, .calendar-card, .timeline-item, .gallery-side-note, .club-form');
    if (!('IntersectionObserver' in window) || reduced()) {
      targets.forEach(function (node) { node.classList.add('is-visible'); });
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      const entering = entries.filter(function (entry) { return entry.isIntersecting; });
      // Stagger only siblings arriving together. A late section never inherits
      // a delay from its index in the whole document.
      entering.forEach(function (entry, index) {
        entry.target.style.transitionDelay = Math.min(index % 4 * 140, 420) + 'ms';
        entry.target.classList.add('is-visible'); observer.unobserve(entry.target);
      });
    }, { threshold: .10, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (node) { node.classList.add('scroll-reveal'); observer.observe(node); });
  }

  /* ---------------------------------------------------------- photo frame */
  /* Clicking any photo (the home grid, the gallery stage tiles or the archive)
     opens it big in a frame. Escape, the ✕ or a tap outside closes it. */
  function setupPhotoFrame() {
    const frame = $('#photoFrame');
    const image = $('#photoFrameImage');
    const caption = $('#photoFrameCaption');
    if (!frame || !image) return;

    function close() {
      frame.hidden = true;
      document.documentElement.classList.remove('photo-frame-open');
      image.removeAttribute('src');
      if (window.__mtPhotoReturn && document.body.contains(window.__mtPhotoReturn)) {
        window.__mtPhotoReturn.focus({ preventScroll: true });
      }
    }

    function open(button, source, text) {
      image.src = source;
      image.alt = text || '';
      if (caption) caption.textContent = text || '';
      frame.hidden = false;
      document.documentElement.classList.add('photo-frame-open');
      window.__mtPhotoReturn = button;
      const closeButton = $('#photoFrameClose');
      if (closeButton) closeButton.focus({ preventScroll: true });
    }

    document.addEventListener('click', function (event) {
      const button = event.target.closest ? event.target.closest('.gallery-visual.has-image, .archive-image, .gallery-stage-image.has-image') : null;
      if (button) {
        const style = button.getAttribute('style') || '';
        const match = /url\((['"]?)([^'")]+)\1\)/.exec(style);
        if (match) {
          event.preventDefault();
          const stageCaption = button.id === 'galleryStageImage' ? ($('#galleryStageCaption') || {}).textContent : '';
          open(button, match[2], stageCaption || button.getAttribute('aria-label') || '');
        }
        return;
      }
      if (!frame.hidden && (event.target === frame || event.target.closest('.photo-frame-close'))) close();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !frame.hidden) close();
    });
  }

  /* ------------------------------------------------------------ mobile nav */
  function setupMenu() {
    const button = $('#menuButton');
    const nav = $('#navLinks');
    if (!button || !nav) return;
    function setOpen(open) {
      nav.classList.toggle('open', open);
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
      button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      button.textContent = open ? '×' : '☰';
    }
    const close = function () { setOpen(false); };
    button.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    $$('a', nav).forEach(function (link) { link.addEventListener('click', close); });
    document.addEventListener('click', function (event) {
      if (!nav.classList.contains('open')) return;
      if (nav.contains(event.target) || button.contains(event.target)) return;
      close();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('open')) { close(); button.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 1100) close(); });
    setOpen(false);
  }

  /* --------------------------------------------------- the gallery stage */
  function setupGalleryStage() {
    const stage = $('#galleryStageImage');
    if (!stage) return;
    const slides = (readJson('gallery-data').slides || []).filter(function (slide) { return slide.image; });
    if (!slides.length) return;

    const caption = $('#galleryStageCaption');
    const kicker = $('#galleryStageKicker');
    const counter = $('#galleryCounter');
    let timer = null;
    let index = 0;

    const thumbs = $$('#galleryThumbs .gallery-thumb');
    const paint = function (slide) {
      stage.style.backgroundImage = slide.image ? "url('" + String(slide.image).replace(/[()'"]/g, '') + "')" : '';
      stage.classList.toggle('has-image', Boolean(slide.image));
      stage.setAttribute('aria-label', slide.alt || slide.caption || 'Mindful Tattva gallery photo');
      if (caption) caption.textContent = slide.caption || 'Mindful Tattva memory';
      /* the small line above the caption belongs to the stage, not the photo:
         only a slide that carries its own words may replace it */
      if (kicker && slide.kicker) kicker.textContent = slide.kicker;
      thumbs.forEach(function (thumb) {
        thumb.classList.toggle('is-current', Number(thumb.dataset.slide) === index);
      });
      if (counter) counter.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    };
    const go = function (next) { index = (next + slides.length) % slides.length; paint(slides[index]); };
    const stop = function () { if (timer) window.clearInterval(timer); timer = null; };
    const play = function () {
      if (reduced() || slides.length < 2) return;
      stop();
      timer = window.setInterval(function () { go(index + 1); }, 4800);
    };

    const previous = $('#galleryPrev');
    const next = $('#galleryNext');
    if (previous) previous.addEventListener('click', function () { go(index - 1); play(); });
    if (next) next.addEventListener('click', function () { go(index + 1); play(); });
    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () { go(Number(thumb.dataset.slide) || 0); play(); });
    });
    const wrap = $('#galleryStage');
    if (wrap) {
      wrap.addEventListener('mouseenter', stop);
      wrap.addEventListener('mouseleave', play);
    }
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else play(); });
    play();
  }

  /* ------------------------------------------------------------- the forms */
  function setStatus(form, message, bad) {
    const node = form.querySelector('.form-status');
    if (node) {
      node.textContent = message;
      node.classList.toggle('is-error', Boolean(bad));
    }
  }

  async function postJson(url, payload) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    let body = {};
    try { body = await response.json(); } catch (error) { body = {}; }
    if (!response.ok) throw new Error(body.error || 'Something went wrong. Please try again.');
    return body;
  }

  /* ---------------------------------------------------- what a field must be
     The same rules the club's own server keeps, said plainly in the browser so
     a student is told before the form is sent: a name of letters, an address
     that can really receive mail, and a ten-digit Indian mobile number. The
     server checks all three again — this is only the friendly half. */
  const fieldRules = {
    name: function (value) {
      const clean = String(value || '').trim().replace(/\s+/g, ' ');
      if (!/^[\p{L}][\p{L} .'\-]*$/u.test(clean) || (clean.match(/\p{L}/gu) || []).length < 2) {
        return 'Please write your name in letters only — no numbers or symbols.';
      }
      return '';
    },
    email: function (value) {
      const clean = String(value || '').trim();
      if (!/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9\-]+(\.[A-Za-z0-9\-]+)*\.[A-Za-z]{2,}$/.test(clean)
        || clean.indexOf('..') !== -1 || clean.charAt(0) === '.') {
        return 'Please check the email address — it should look like you@example.com.';
      }
      return '';
    },
    phone: function (value) {
      let digits = String(value || '').replace(/\D+/g, '');
      if (digits.length > 10) {
        if (digits.indexOf('0091') === 0) digits = digits.slice(4);
        else if (digits.indexOf('91') === 0) digits = digits.slice(2);
        else if (digits.charAt(0) === '0') digits = digits.replace(/^0+/, '');
      }
      if (digits.length > 10) digits = digits.slice(-10);
      if (!/^[6-9][0-9]{9}$/.test(digits)) {
        return 'Please add a 10-digit Indian mobile number, starting with 6, 7, 8 or 9.';
      }
      return '';
    }
  };

  function checkField(input) {
    const rule = input.dataset ? input.dataset.rule : '';
    if (!rule || !fieldRules[rule]) return '';
    return fieldRules[rule](input.value);
  }

  function checkForm(form) {
    const fields = $$('[data-rule]', form);
    for (let index = 0; index < fields.length; index += 1) {
      const message = checkField(fields[index]);
      if (message) {
        fields[index].classList.add('is-invalid');
        if (typeof fields[index].focus === 'function') fields[index].focus();
        return message;
      }
      fields[index].classList.remove('is-invalid');
    }
    return '';
  }

  function setupForms() {
    /* a field tells the student as soon as they leave it */
    $$('[data-rule]').forEach(function (input) {
      input.addEventListener('blur', function () {
        const message = checkField(input);
        input.classList.toggle('is-invalid', Boolean(message));
        const form = input.closest('form');
        if (form) setStatus(form, message, Boolean(message));
      });
      input.addEventListener('input', function () {
        if (!input.classList.contains('is-invalid')) return;
        if (!checkField(input)) {
          input.classList.remove('is-invalid');
          const form = input.closest('form');
          if (form) setStatus(form, '', false);
        }
      });
    });

    $$('form[data-ajax-form]').forEach(function (form) {
      form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const complaint = checkForm(form);
        if (complaint) {
          setStatus(form, complaint, true);
          return;
        }
        const button = form.querySelector('button[type="submit"]');
        const original = button ? button.textContent : '';
        const payload = Object.fromEntries(new FormData(form).entries());
        payload.type = form.dataset.formType || 'membership';
        if (button) { button.disabled = true; button.textContent = 'Sending…'; }
        setStatus(form, 'Sending…');
        try {
          const result = await postJson(form.dataset.ajaxForm, payload);
          /* An event registration hands the student their own pass page. */
          if (result && result.passUrl) {
            setStatus(form, result.message || 'Registered — taking you to your pass…');
            window.location.href = result.passUrl;
            return;
          }
          form.reset();
          setStatus(form, (result && result.message) || form.dataset.successMessage || 'Received — the club team will be in touch ✓');
        } catch (error) {
          setStatus(form, error.message, true);
        } finally {
          if (button) { button.disabled = false; button.textContent = original; }
        }
      });
    });

    /* A file input shows the chosen file's name: no surprises on submit. */
    $$('.upload-row input[type="file"], .proof-form input[type="file"]').forEach(function (input) {
      input.addEventListener('change', function () {
        const row = input.closest('.upload-row, .proof-form') || input.parentElement;
        const note = row ? row.querySelector('.upload-file-name') : null;
        if (note) note.textContent = input.files && input.files.length ? input.files[0].name : '';
      });
    });

    $$('[data-print]').forEach(function (button) {
      button.addEventListener('click', function () { window.print(); });
    });
  }

  /* --------------------------------------------------------- the gold thread
     A hairline of gold that fills as the page is read, with a bead that rides
     the end of it. It is decoration: it never carries meaning, and with
     reduced motion (or on a narrow screen) it steps aside. */
  /* ------------------------------------------------------ scroll dressing */
  /* A borderless glass menu and the way back up. The butterfly, not a gold
     line, now carries the reading position across the header. */
  function setupAnchorNavigation() {
    function targetFor(hash) {
      if (!hash || hash === '#') return null;
      let id;
      try { id = decodeURIComponent(hash.slice(1)); } catch (error) { return null; }
      return id === 'join' ? $('#membershipForm') || document.getElementById(id) : document.getElementById(id);
    }
    let revision = 0;
    function align(hash) {
      const target = targetFor(hash);
      if (!target) return;
      const ticket = ++revision;
      document.documentElement.classList.add('section-entry');
      // Resolve every intrinsic placeholder before measuring a deep link.
      document.documentElement.getBoundingClientRect();
      const place = function () {
        if (ticket !== revision || window.location.hash !== hash) return;
        target.classList.add('is-visible');
        target.scrollIntoView({ block: 'start', behavior: 'instant' });
      };
      window.requestAnimationFrame(function () { window.requestAnimationFrame(place); });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
      if (document.readyState !== 'complete') window.addEventListener('load', place, { once: true });
    }
    document.addEventListener('click', function (event) {
      const link = event.target.closest && event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank' || link.hasAttribute('download')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || !targetFor(url.hash)) return;
      event.preventDefault();
      if (url.hash !== window.location.hash) window.history.pushState(null, '', url.hash);
      align(url.hash);
    });
    ['pointerdown', 'wheel', 'touchstart', 'keydown'].forEach(function (name) {
      window.addEventListener(name, function () { revision++; }, { passive: true });
    });
    window.addEventListener('hashchange', function () { align(window.location.hash); });
    window.addEventListener('popstate', function () { align(window.location.hash); });
    if (window.location.hash) align(window.location.hash);
  }

  function setupScrollUi() {
    const toTop = $('#toTop');
    if (!toTop) return;

    let frame = 0;
    function paint() {
      frame = 0;
      const y = window.scrollY || window.pageYOffset || 0;
      document.body.classList.toggle('is-scrolled', y > 40);
      if (toTop) toTop.classList.toggle('is-on', y > 700);
    }
    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(paint);
    }

    paint();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    if (toTop) {
      toTop.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' });
      });
    }
  }

  /* ----------------------------------------------------- the drifting lights */
  /* The warm lights behind every block ease upward as the page is read, so the
     page keeps moving gently under the visitor's hand. One transform, set in
     the same kind of frame as the rest of the dressing — and none at all when
     less motion has been asked for. */
  function setupDriftField() {
    const field = $('#driftField');
    if (!field || reduced()) return;

    let frame = 0;
    function paint() {
      frame = 0;
      const y = window.scrollY || window.pageYOffset || 0;
      /* the layer is oversize by 80px, so the shift can never open a gap */
      const shift = Math.max(-72, Math.min(72, -y * 0.022));
      field.style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0)';
    }
    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(paint);
    }

    paint();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
  }

  /* ------------------------------------------------------- content updates */
  function setupLiveUpdates() {
    const boot = readJson('mt-bootstrap');
    const revision = Number(boot.revision || 0);
    if (!revision) return;
    window.setInterval(async function () {
      try {
        const response = await fetch('/api/site?since=' + revision, { headers: { 'Accept': 'application/json' } });
        if (!response.ok) return;
        const payload = await response.json();
        if (payload && payload.unchanged === false) window.location.reload();
      } catch (error) { /* offline, or the club is mid-edit: try again later */ }
    }, 45000);
  }

  /* Scroll chapter: gather six satellites around one centre, then turn.
     Native sticky layout releases the next section; no scroll hijacking. */
  function setupBrandBand() {
    const chapter = $('.brand-chapter');
    if (!chapter) return;
    const lowMotion = reduced();
    const rings = $$('[data-ring]', chapter);
    const turn = $('.brand-ring-turn', chapter);
    let scheduled = false;
    const clamp = function (n) { return Math.max(0, Math.min(1, n)); };
    const paint = function () {
      scheduled = false;
      const box = chapter.getBoundingClientRect();
      const top = window.innerWidth <= 1100 ? 68 : 84;
      const dark = $$('.black-chapter').some(function (section) {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= top + 1 && bounds.bottom > top;
      });
      document.body.classList.toggle('is-black-chapter', dark);
      if (lowMotion) return;
      const travel = Math.max(1, chapter.offsetHeight - (window.innerHeight - top));
      const progress = clamp((top - box.top) / travel);
      const gather = clamp(progress / 0.38);
      const ease = gather * gather * (3 - 2 * gather);
      const diagram = $('.brand-rings', chapter);
      if (diagram) diagram.setAttribute('viewBox', '-90 -90 780 780');
      $$('circle', chapter).forEach(function (circle) { circle.setAttribute('r', (35 + 65 * ease).toFixed(2)); });
      rings.forEach(function (ring, i) {
        const angle = (i * 60 - 90) * Math.PI / 180;
        const spread = 170 * (1 - ease);
        ring.setAttribute('transform', 'translate(' + (Math.cos(angle) * spread).toFixed(2) + ' ' + (Math.sin(angle) * spread).toFixed(2) + ')');
        ring.style.opacity = String(0.45 + ease * 0.45);
      });
      const rotation = clamp((progress - 0.38) / 0.16) * 120;
      turn.setAttribute('transform', 'rotate(' + rotation.toFixed(2) + ' 300 300)');
      const exit = clamp((progress - 0.45) / 0.35);
      const scale = (1 - ease * 0.40) * (1 - exit * 0.10);
      if (diagram) diagram.style.transform = 'translateY(' + (-exit * 46).toFixed(2) + 'vh) scale(' + scale.toFixed(3) + ')';
      // The second pass at 54–58s shows a vertical entrance as well as the
      // right-to-left ink reveal. Keep both tied to native scroll, in reverse too.
      const heading = $('#manifestHeading', chapter);
      const rise = clamp((progress - 0.50) / 0.50);
      const riseEase = rise * rise * (3 - 2 * rise);
      if (heading) heading.style.transform = 'translateY(' + (74 - 80 * riseEase).toFixed(2) + 'svh)';
      $$('.manifest-row', chapter).forEach(function (row, index) {
        const local = clamp((progress - 0.62 - index * 0.035) / 0.14);
        const reveal = 1 - Math.pow(1 - local, 3);
        row.style.transform = 'translate3d(' + ((1 - reveal) * 105).toFixed(2) + 'vw,0,0)';
        row.style.opacity = String(reveal);
      });
      $$('.mind-object', chapter).forEach(function (object, index) {
        const local = clamp((progress - 0.66 - index * 0.055) / 0.13);
        const reveal = local * local * (3 - 2 * local);
        object.style.transform = 'translateY(' + ((1 - reveal) * 22).toFixed(2) + 'px) scale(' + (0.62 + reveal * 0.38).toFixed(3) + ')';
        object.style.opacity = String(reveal);
      });
    };
    const schedule = function () {
      if (!scheduled) { scheduled = true; window.requestAnimationFrame(paint); }
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
    paint();
  }

  /* Explicit 24fps playback of the recorded poses. Static sprite sheets avoid
     native animated-image suspension and source-swap restarts. One shared clock
     is gated by the CHAPTER, not each transformed/clipped capsule's observer. */
  function setupWireObjects() {
    const objects = $$('[data-wire-object]');
    if (!objects.length) return;
    const chapter = $('.brand-chapter');
    const players = [];
    let frame = 0, running = false, elapsed = 0, previous = 0;
    const draw = function (player) {
      if (!player.sheet) return;
      const total = player.count === 84 ? 3500 : 2042;
      const time = elapsed % total;
      // Original extraction rounded successive 24fps boundaries to milliseconds.
      let index = 0;
      while (index + 1 < player.count && Math.round((index + 1) * 1000 / 24) <= time) index++;
      if (player.last === index) return;
      const w = player.small ? 112 : 328, h = player.small ? 76 : 220;
      player.context.clearRect(0, 0, 328, 220);
      player.context.drawImage(player.sheet, index % 8 * w, Math.floor(index / 8) * h, w, h, 0, 0, 328, 220);
      player.last = index;
      player.node.dataset.wireFrame = String(index);
      player.node.classList.add('wire-painted');
    };
    const tick = function (now) {
      frame = 0;
      if (!running) return;
      if (previous) elapsed += Math.max(0, now - previous);
      previous = now;
      players.forEach(draw);
      frame = window.requestAnimationFrame(tick);
    };
    function sync() {
      const box = chapter ? chapter.getBoundingClientRect() : {top: 0, bottom: window.innerHeight};
      running = !document.hidden && !reduced() && box.bottom > 0 && box.top < window.innerHeight;
      players.forEach(function (player) {
        player.node.dataset.wireState = running && player.sheet ? player.small ? 'fallback-motion' : 'motion' : 'still';
        player.node.classList.toggle('wire-paused', !running);
      });
      if (running && !frame) { previous = 0; frame = window.requestAnimationFrame(tick); }
      else if (!running && frame) { window.cancelAnimationFrame(frame); frame = 0; previous = 0; }
    }
    objects.forEach(function (node) {
      const canvas = $('canvas', node);
      let context;
      try { context = canvas && canvas.getContext && canvas.getContext('2d'); } catch (error) { return; }
      if (!context) return; // the server-rendered silhouette remains readable
      const player = {node: node, context: context, count: Number(node.dataset.frames), sheet: null, small: true, last: -1};
      players.push(player);
      const inline = new Image(), full = new Image();
      inline.onload = function () {
        if (!player.sheet && inline.naturalWidth === 8 * 112 && inline.naturalHeight === Math.ceil(player.count / 8) * 76) { player.sheet = inline; player.small = true; player.last = -1; draw(player); sync(); }
      };
      // A failed primary sheet never changes or erases a valid embedded sheet.
      full.onload = function () {
        if (full.naturalWidth !== 8 * 328 || full.naturalHeight !== Math.ceil(player.count / 8) * 220) {
          node.dataset.atlasFailed = 'true'; sync(); return;
        }
        delete node.dataset.atlasFailed;
        player.sheet = full; player.small = false; player.last = -1; draw(player); sync();
      };
      full.onerror = function () { node.dataset.atlasFailed = 'true'; sync(); };
      inline.src = node.dataset.atlasInline;
      full.src = node.dataset.atlasSrc;
    });
    if (!players.length) return;
    window.addEventListener('scroll', sync, {passive: true});
    window.addEventListener('resize', sync, {passive: true});
    document.addEventListener('visibilitychange', sync);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.addEventListener) preference.addEventListener('change', sync);
    else if (preference.addListener) preference.addListener(sync);
    sync();
  }

  /* Notice → Connect → Grow: pop into a stack, then throw one card at a time.
     Scroll controls the entire pose, so reversing scroll restores the deck. */
  function setupCardDeck() {
    const deck = $('.psyche-deck');
    if (!deck) return;
    const cards = $$('.psyche-card', deck), stack = $('.psyche-cards', deck);
    let frame = 0, enabled = false;
    const clamp = function (n) { return Math.max(0, Math.min(1, n)); };
    const paint = function () {
      frame = 0;
      if (!enabled) return;
      const box = deck.getBoundingClientRect();
      const top = window.innerWidth <= 1100 ? 68 : 84;
      const travel = Math.max(1, deck.offsetHeight - (window.innerHeight - top));
      const progress = clamp((top - box.top) / travel);
      cards.forEach(function (card, i) {
        const pop = clamp((window.innerHeight - box.top - window.innerHeight * .35 - i * 90) / 260);
        const enter = 1 - Math.pow(1 - pop, 3);
        const flight = clamp((progress - .12 - i * .27) / .23);
        const throwEase = flight * flight;
        const side = i % 2 ? -1 : 1;
        const distance = Math.min(920, window.innerWidth * .9 + 240);
        const x = side * distance * throwEase;
        const y = (1 - enter) * 100 + i * 12 - throwEase * 200;
        const scale = (.86 + .14 * enter - i * .025) * (1 - .12 * flight);
        card.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0) rotate(' + ([-2, 3, -3][i] + side * 32 * throwEase).toFixed(2) + 'deg) scale(' + scale.toFixed(3) + ')';
        card.style.opacity = String(enter * (1 - clamp((flight - .75) / .25)));
        card.dataset.deckState = flight >= 1 ? 'thrown' : flight > 0 ? 'throwing' : pop < 1 ? 'entering' : 'stacked';
        card.inert = flight >= 1 || pop === 0;
      });
    };
    const schedule = function () { if (enabled && !frame) frame = window.requestAnimationFrame(paint); };
    const measure = function () {
      enabled = !reduced() && window.innerHeight >= 560;
      deck.classList.toggle('deck-ready', enabled);
      if (enabled) {
        // Measure intrinsic content, not scrollHeight: the decorative sheen
        // extends past the card and would otherwise grow the deck on resize.
        cards.forEach(function (card) { card.style.height = 'auto'; card.style.bottom = 'auto'; });
        const height = Math.max(330, ...cards.map(function (card) { return card.offsetHeight; }));
        cards.forEach(function (card) { card.style.height = ''; card.style.bottom = ''; });
        if (height > window.innerHeight - (window.innerWidth <= 1100 ? 68 : 84) - 40) {
          enabled = false; deck.classList.remove('deck-ready');
        } else { stack.style.height = height + 'px'; schedule(); }
      }
      if (!enabled) {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0; stack.style.height = '';
        cards.forEach(function (card) { card.style.transform = ''; card.style.opacity = ''; card.inert = false; delete card.dataset.deckState; });
      }
    };
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', measure, {passive: true});
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.addEventListener) preference.addEventListener('change', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    measure();
  }

  function setupHappinessGraph() {
    const graph = $('.happiness-plot');
    if (!graph || typeof graph.pauseAnimations !== 'function' || typeof graph.unpauseAnimations !== 'function') return;
    let started = false;
    function syncMotion() {
      if (reduced() || document.hidden) graph.pauseAnimations();
      else {
        if (!started) { $$('.chart-traveller animateMotion', graph).forEach(function (motion) { if (typeof motion.beginElement === 'function') motion.beginElement(); }); started = true; }
        graph.unpauseAnimations();
      }
    }
    // Intersection pauses the SVG clock, preserving positions while offscreen.
    let inView = false;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries.some(function (entry) { return entry.isIntersecting; });
        if (inView) syncMotion(); else graph.pauseAnimations();
      }).observe(graph);
    } else inView = true;
    const sync = function () { if (inView) syncMotion(); else graph.pauseAnimations(); };
    document.addEventListener('visibilitychange', sync);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.addEventListener) preference.addEventListener('change', sync);
    $$('.chart-portrait-image', graph).forEach(function (image) {
      image.addEventListener('error', function () { image.style.display = 'none'; });
    });
    sync();
  }

  /* Measured glyph displacement: 118.05 source pixels/sec at 720px wide.
     Derive the loop duration from actual text metrics, never a guessed period. */
  function setupMarqueeTiming() {
    const track = $('.brand-band-track');
    if (!track) return;
    function measure() {
      track.style.animationDuration = ((track.scrollWidth / 2) / (window.innerWidth * 118.05 / 720)).toFixed(3) + 's';
    }
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener('resize', measure, { passive: true });
  }

  /* -------------------------------------------------------- the front door */
  /* The rings settle, the dark veil dissolves, then the butterfly lands.
     CSS has its own exit for no-script visitors; all exits converge here. */
  function setupSplash() {
    const splash = $('#splash');
    let done = false;
    const finish = function () {
      if (done) return;
      done = true;
      if (splash) splash.hidden = true;
      const shell = $('.site-shell');
      if (shell) shell.inert = false;
      document.body.classList.remove('intro-pending');
      document.body.classList.add('intro-revealed');
      window.dispatchEvent(new CustomEvent('mt:intro-ready'));
    };
    if (!splash || reduced() || window.location.hash.length > 1) { finish(); return; }
    const shell = $('.site-shell');
    if (shell) shell.inert = true;
    document.body.classList.add('intro-pending');
    splash.addEventListener('animationend', function (event) {
      if (event.target === splash && event.animationName === 'splashAway') finish();
    });
    window.setTimeout(finish, 6500);
  }

  /* A single fixed photographic butterfly is independent of the menu layout.
     Slow entry from below; reading progress sets its horizontal destination.
     A dark chapter sends it left, and returning to paper brings it back. */
  function setupButterfly() {
    const butterfly = $('.nav-butterfly');
    const header = $('.nav-wrap');
    if (!butterfly || !header) return;
    const clamp = function (n, a, b) { return Math.max(a, Math.min(b, n)); };
    let state = 'waiting', frame = 0, lastFrame = 0, flight = null;
    let x = 0, y = 0, angle = 0, vx = 0, vy = 0, tilt = 0;
    let target = null, needsMeasure = true, desiredDark = false, committedDark = false, darkSince = 0;
    let lastScroll = window.scrollY || 0, scrollTimer = 0;
    function measure(now) {
      const bounds = header.getBoundingClientRect();
      const width = butterfly.offsetWidth;
      const progress = clamp((window.scrollY || 0) / Math.max(1, document.documentElement.scrollHeight - window.innerHeight), 0, 1);
      target = { x: 10 + progress * Math.max(0, window.innerWidth - width - (window.innerWidth <= 1100 ? 84 : 32)), y: Math.max(4, (bounds.top || 0) + 12 - butterfly.offsetHeight), width: width };
      const dark = $$('.black-chapter').some(function (section) {
        const box = section.getBoundingClientRect();
        return box.top <= bounds.bottom + 1 && box.bottom > bounds.bottom;
      });
      if (dark !== desiredDark) { desiredDark = dark; darkSince = now; }
      needsMeasure = false;
    }
    function render() {
      butterfly.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0) rotate(' + angle.toFixed(2) + 'deg)';
    }
    function schedule() {
      if (!frame && state !== 'waiting' && !document.hidden) frame = window.requestAnimationFrame(tick);
    }
    function launch(kind) {
      const end = kind === 'leave' ? { x: -target.width - 100, y: target.y + 5 } : { x: target.x, y: target.y };
      const duration = kind === 'entry' ? 6400 : Math.max(kind === 'leave' ? 2800 : 3400, Math.abs(end.x - x) * 3.4);
      // A continuous tangent survives reversals; no cancelled animation can
      // restore an old CSS pose or switch the butterfly's opacity mid-flight.
      const reach = Math.min(380, duration * .22);
      flight = { kind: kind, elapsed: 0, duration: duration,
        start: { x: x, y: y, angle: angle },
        c1: kind === 'entry' ? { x: x - window.innerWidth * .06, y: window.innerHeight * .55 } : { x: x + vx * reach, y: y + vy * reach },
        c2: { x: kind === 'leave' ? end.x + 70 : end.x + 20, y: kind === 'entry' ? end.y + window.innerHeight * .18 : end.y - 18 }, end: end };
      state = kind === 'leave' ? 'leaving' : 'entering';
      butterfly.classList.remove('butterfly-away');
      butterfly.classList.add('butterfly-arrived', 'butterfly-flying');
      schedule();
    }
    function tick(now) {
      frame = 0;
      if (document.hidden || state === 'waiting') { lastFrame = 0; return; }
      const dt = lastFrame ? clamp(now - lastFrame, 0, 160) : 16;
      lastFrame = now;
      if (needsMeasure || !target) measure(now);
      if (reduced()) {
        flight = null; committedDark = desiredDark; state = desiredDark ? 'away' : 'perched';
        x = target.x; y = target.y; angle = 0;
        butterfly.classList.toggle('butterfly-away', desiredDark);
        butterfly.classList.remove('butterfly-flying'); render(); lastFrame = 0; return;
      }
      // Brief crossings during a fast scroll never trigger a disappearance.
      if (desiredDark !== committedDark && now - darkSince >= 320) {
        committedDark = desiredDark;
        launch(desiredDark ? 'leave' : 'return');
      }
      const oldX = x, oldY = y;
      if (flight) {
        flight.elapsed += dt;
        const t = clamp(flight.elapsed / flight.duration, 0, 1);
        const u = t * t * (3 - 2 * t), v = 1 - u;
        if (flight.kind !== 'leave') {
          const steer = 1 - Math.exp(-dt / 260);
          flight.end.x += (target.x - flight.end.x) * steer;
          flight.end.y += (target.y - flight.end.y) * steer;
        }
        x = v * v * v * flight.start.x + 3 * v * v * u * flight.c1.x + 3 * v * u * u * flight.c2.x + u * u * u * flight.end.x;
        y = v * v * v * flight.start.y + 3 * v * v * u * flight.c1.y + 3 * v * u * u * flight.c2.y + u * u * u * flight.end.y;
        const pitch = clamp((x - oldX) / Math.max(1, dt) * 20, -9, 9);
        angle += (pitch - angle) * (1 - Math.exp(-dt / 180));
        if (t === 1) {
          state = flight.kind === 'leave' ? 'away' : 'perched'; flight = null;
          butterfly.classList.toggle('butterfly-away', state === 'away');
        }
      } else if (state === 'perched') {
        const follow = 1 - Math.exp(-dt / 260);
        x += (target.x - x) * follow; y += (target.y - y) * follow;
        angle += (tilt - angle) * (1 - Math.exp(-dt / 220));
      }
      vx = (x - oldX) / Math.max(1, dt); vy = (y - oldY) / Math.max(1, dt);
      const moving = state === 'perched' && (Math.abs(x - target.x) > .1 || Math.abs(y - target.y) > .1 || Math.abs(angle - tilt) > .1);
      butterfly.classList.toggle('butterfly-flying', Boolean(flight) || moving);
      if (!flight && !moving && state === 'perched') { x = target.x; y = target.y; angle = tilt; }
      render();
      if (flight || moving || desiredDark !== committedDark) schedule(); else lastFrame = 0;
    }
    function enter() {
      if (state !== 'waiting') return;
      measure(window.performance.now());
      butterfly.classList.add('butterfly-arrived');
      if (desiredDark || reduced()) {
        committedDark = desiredDark; state = desiredDark ? 'away' : 'perched';
        x = desiredDark ? -target.width - 100 : target.x; y = target.y;
        butterfly.classList.toggle('butterfly-away', desiredDark); render();
      } else {
        x = window.innerWidth * .27; y = window.innerHeight + 120;
        render(); launch('entry');
      }
    }
    window.addEventListener('mt:intro-ready', enter, { once: true });
    window.setTimeout(enter, 8000);
    window.addEventListener('scroll', function () {
      const next = window.scrollY || 0;
      tilt = next === lastScroll ? tilt : next > lastScroll ? 7 : -7;
      lastScroll = next; needsMeasure = true;
      document.body.classList.add('butterfly-scrolling');
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(function () {
        tilt = 0; document.body.classList.remove('butterfly-scrolling'); schedule();
      }, 260);
      schedule();
    }, { passive: true });
    window.addEventListener('resize', function () { needsMeasure = true; schedule(); });
    // Banners, font loading and content-visibility can move a chapter without
    // another scroll event. Refresh its boundary, but never reset a flight.
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(function () { needsMeasure = true; schedule(); });
      observer.observe(document.body); observer.observe(header);
    }
    document.addEventListener('visibilitychange', function () { lastFrame = 0; schedule(); });
  }

  /* Two fast-start encodes; the untouched master is retained for the club.
     Buffering is not repaired by repeatedly seeking or reloading the file. */
  function setupHeroVideo() {
    const video = $('#heroVideo');
    if (!video) return;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const allowed = !reduced() && !(connection && connection.saveData);
    let resumeAt = 0;
    let recoveryUsed = false;
    let lastClock = -1;
    let lastAdvance = Date.now();
    let waitingTimer = 0;
    function drop() { video.hidden = true; }
    function pause() { try { video.pause(); } catch (error) { /* already stopped */ } }
    function play() {
      if (!allowed || document.hidden || video.hidden) return;
      const attempt = video.play();
      if (attempt && attempt.catch) attempt.catch(function () { /* retry on a gesture */ });
    }
    if (!allowed) { drop(); return; }
    const mobile = window.matchMedia('(max-width: 900px)').matches || (connection && /(^|-)2g|3g/.test(connection.effectiveType || ''));
    video.src = mobile ? video.dataset.mobileSrc : video.dataset.desktopSrc;
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.addEventListener('error', drop);
    video.addEventListener('loadedmetadata', function () {
      if (resumeAt > 0 && Number.isFinite(video.duration)) {
        video.currentTime = Math.min(resumeAt, Math.max(0, video.duration - 0.2));
      }
      play();
    });
    video.addEventListener('waiting', function () {
      window.clearTimeout(waitingTimer);
      waitingTimer = window.setTimeout(function () { video.classList.add('is-buffering'); }, 800);
    });
    video.addEventListener('playing', function () {
      window.clearTimeout(waitingTimer);
      video.classList.remove('is-buffering');
      lastAdvance = Date.now();
    });
    /* A stalled network event alone is not a reason to throw away the buffer. */
    video.addEventListener('stalled', function () { /* let the browser buffer */ });
    window.setInterval(function () {
      if (document.hidden || video.hidden || video.error) return;
      const clock = video.currentTime;
      if (Math.abs(clock - lastClock) > 0.02) {
        lastClock = clock; lastAdvance = Date.now();
        video.classList.remove('is-buffering');
        return;
      }
      const quietFor = Date.now() - lastAdvance;
      if (quietFor > 4500) video.classList.add('is-buffering');
      /* At most one recovery per page, after 15 seconds without a frame.
         Prefer the small encode on a struggling desktop connection. */
      if (quietFor > 15000 && !recoveryUsed && video.readyState < 2) {
        recoveryUsed = true;
        resumeAt = Math.max(0, clock);
        if (!mobile) video.src = video.dataset.mobileSrc;
        video.load();
        play();
        lastAdvance = Date.now();
      } else if (video.paused) play();
    }, 1500);
    ['pointerdown', 'touchstart', 'keydown'].forEach(function (name) {
      window.addEventListener(name, play, { once: true, passive: true });
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) pause(); else { lastAdvance = Date.now(); play(); }
    });
    play();
  }

  function setupPortraits() {
    const targets = $$('.portrait-card, .gallery-stage');
    if (reduced() || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('photo-in-view', entry.isIntersecting);
      });
    }, { threshold: 0.18 });
    targets.forEach(function (node) { observer.observe(node); });
  }

  /* ------------------------------------------------------------------
     Scroll story: one progress value (0 → 1 across the chapter) drives
     every scene through CSS variables. Burning embers are drawn on a
     canvas only while the note is alight.
     ------------------------------------------------------------------ */
  function setupStory() {
    const story = $('#story');
    if (!story) return;
    const clamp = function (n, a, b) { return Math.max(a, Math.min(b, n)); };
    const ramp = function (p, a, b) { return clamp((p - a) / (b - a), 0, 1); };
    const herd = $('[data-herd]', story);
    const herdVideo = $('.herd-video', story);
    const wrap = $('.burn-wrap', story);
    const canvas = $('[data-burn-canvas]', story);
    const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
    if (reduced()) {
      story.classList.add('is-static');
      return;
    }
    let frame = 0, burning = false, embers = [], burnFrame = 0, herdStarted = false;
    function apply(p) {
      const st = story.style;
      const set = function (name, value) { st.setProperty(name, typeof value === 'number' ? value.toFixed(4) : value); };
      set('--hand', ramp(p, 0, .14));
      set('--line1', ramp(p, .02, .10) * (1 - ramp(p, .13, .19)));
      set('--glass', ramp(p, .12, .18) * (1 - ramp(p, .36, .42)));
      set('--s', ramp(p, .22, .30));
      set('--you', ramp(p, .29, .35) * (1 - ramp(p, .36, .41)));
      set('--note', ramp(p, .34, .39));
      set('--burnp', ramp(p, .38, .47));
      set('--burnp-on', ramp(p, .37, .39) * (1 - ramp(p, .46, .48)));
      set('--this', ramp(p, .47, .51));
      set('--focus', ramp(p, .51, .58));
      set('--green', ramp(p, .36, .46) * (1 - ramp(p, .80, .86)));
      set('--dark', ramp(p, .74, .84));
      set('--paper', ramp(p, .56, .61));
      set('--tear', ramp(p, .64, .76));
      set('--herd', ramp(p, .76, .90));
      burning = p >= .37 && p <= .48;
      if (burning) scheduleBurn();
      if (herd && !herdStarted && p >= .74) startHerd();
    }
    function startHerd() {
      herdStarted = true;
      if (!herdVideo) return;
      const src = window.innerWidth < 720 ? herdVideo.dataset.mobileSrc : herdVideo.dataset.desktopSrc;
      if (src) { herdVideo.src = src; herdVideo.load(); }
      const play = herdVideo.play && herdVideo.play();
      if (play && play.catch) play.catch(function () {});
      herd.classList.add('is-playing');
    }
    function measure() {
      frame = 0;
      const total = Math.max(1, story.offsetHeight - window.innerHeight);
      apply(clamp(-story.getBoundingClientRect().top / total, 0, 1));
    }
    function schedule() { if (!frame) frame = window.requestAnimationFrame(measure); }
    /* embers along the burning edge */
    function scheduleBurn() { if (!burnFrame && ctx) burnFrame = window.requestAnimationFrame(drawBurn); }
    function drawBurn() {
      burnFrame = 0;
      if (!ctx || !wrap) return;
      const box = canvas.getBoundingClientRect();
      if (canvas.width !== Math.round(box.width) || canvas.height !== Math.round(box.height)) {
        canvas.width = Math.max(1, Math.round(box.width)); canvas.height = Math.max(1, Math.round(box.height));
      }
      const r = wrap.getBoundingClientRect();
      const burn = parseFloat(story.style.getPropertyValue('--burnp')) || 0;
      const frontY = r.bottom - burn * r.height - box.top;
      const left = r.left - box.left, width = r.width;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (burning) {
        for (let i = 0; i < 6; i++) {
          embers.push({ x: left + Math.random() * width, y: frontY + (Math.random() - .5) * 10, vx: (Math.random() - .5) * 1.6, vy: -(0.8 + Math.random() * 2.2), life: 1, size: 0.8 + Math.random() * 2.2 });
        }
      }
      embers = embers.filter(function (e) { return e.life > 0; });
      embers.forEach(function (e) {
        e.x += e.vx; e.y += e.vy; e.vy *= .992; e.life -= .022;
        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 3);
        g.addColorStop(0, 'rgba(255,240,170,' + (e.life).toFixed(3) + ')');
        g.addColorStop(.4, 'rgba(255,130,40,' + (e.life * .8).toFixed(3) + ')');
        g.addColorStop(1, 'rgba(120,20,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(e.x, e.y, e.size * 3, 0, Math.PI * 2); ctx.fill();
      });
      if (burning || embers.length) burnFrame = window.requestAnimationFrame(drawBurn);
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    measure();
  }

  /* One butterfly element, built from the same photographic wings the nav uses. */
  function makeButterfly(kind) {
    const el = document.createElement('div');
    el.className = 'bf ' + kind;
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<div class="bf-flip">' +
      '<img class="wing-left" src="/assets/img/butterfly-flight.png" alt="" width="626" height="428" decoding="async">' +
      '<img class="wing-right" src="/assets/img/butterfly-flight.png" alt="" width="626" height="428" decoding="async">' +
      '<img class="butterfly-body" src="/assets/img/butterfly-flight.png" alt="" width="626" height="428" decoding="async">' +
      '</div>';
    document.body.appendChild(el);
    return el;
  }

  /* Calendar and every other menu link: the butterfly turns its head, flies
     to the link, dives onto it, and only then does the page change. */
  function setupCourier() {
    const links = $$('.nav-wrap a[href]');
    if (!links.length || reduced()) return;
    let courier = null, busy = false;
    function flyTo(el, target, done) {
      const w = el.offsetWidth || 90, h = el.offsetHeight || 61;
      const tr = target.getBoundingClientRect();
      const goal = { x: tr.left + tr.width / 2, y: tr.top + tr.height / 2 };
      const nav = $('.nav-butterfly');
      const nr = nav ? nav.getBoundingClientRect() : null;
      const start = nr && nr.width ? { x: nr.left + nr.width / 2, y: nr.top + nr.height / 2 } : { x: window.innerWidth - 80, y: 60 };
      const hover = { x: goal.x, y: Math.max(4, tr.top - h * .75) };
      const control = { x: (start.x + hover.x) / 2, y: Math.min(start.y, hover.y) - 70 };
      el.classList.add('is-on', 'flap', 'is-moving');
      el.classList.toggle('face-left', hover.x < start.x);
      document.body.classList.add('bf-flying');
      const t0 = window.performance.now(), A = 520, B = 300;
      function frameAt(now) {
        const e = now - t0;
        let x, y, s = 1;
        if (e <= A) {
          const t = e / A, u = 1 - Math.pow(1 - t, 2.2), v = 1 - u;
          x = v * v * start.x + 2 * v * u * control.x + u * u * hover.x;
          y = v * v * start.y + 2 * v * u * control.y + u * u * hover.y;
        } else {
          const t = Math.min(1, (e - A) / B), u = t * t * t;
          x = hover.x + (goal.x - hover.x) * u;
          y = hover.y + (goal.y - hover.y) * u;
          s = 1 - .45 * u;
          if (t === 0 || e - A < 16) target.classList.add('bf-hit');
        }
        el.style.transform = 'translate3d(' + (x - w / 2).toFixed(1) + 'px,' + (y - h / 2).toFixed(1) + 'px,0) scale(' + s.toFixed(3) + ')';
        if (e < A + B) window.requestAnimationFrame(frameAt);
        else done();
      }
      window.requestAnimationFrame(frameAt);
    }
    links.forEach(function (a) {
      a.addEventListener('click', function (event) {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (a.target && a.target !== '_self') return;
        let url;
        try { url = new URL(a.href, window.location.href); } catch (error) { return; }
        if (url.origin !== window.location.origin || url.href === window.location.href) return;
        const box = a.getBoundingClientRect();
        if (busy || !box.width) return;
        event.preventDefault();
        busy = true;
        if (!courier) courier = makeButterfly('bf-courier');
        flyTo(courier, a, function () { window.location.href = url.href; });
      });
    });
  }

  /* The form companion: sits to the left of the field being typed in, flaps on
     every keystroke and backspace, flies to the next field on focus, and dives
     onto the submit button before the form is sent. */
  function setupFormButterfly() {
    const forms = $$('form.club-form, form.register-form');
    if (!forms.length || reduced()) return;
    const FIELD = 'input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=button]):not([type=file]):not([type=reset]), textarea, select';
    const clamp = function (n, a, b) { return Math.max(a, Math.min(b, n)); };
    let bf = null, active = null, hideTimer = 0, flapTimer = 0, frame = 0, last = 0;
    let cur = null, lastX = null, diving = null, skipSubmit = false;
    function ensure() { if (!bf) bf = makeButterfly('bf-form'); return bf; }
    function goalFor(el) {
      const r = el.getBoundingClientRect();
      const w = bf.offsetWidth || 74, h = bf.offsetHeight || 51;
      let x = r.left - w - 6, y = r.top + Math.min(r.height / 2, 20) - h * .4;
      if (x < 4) { x = clamp(r.left, 4, window.innerWidth - w - 4); y = r.top - h * .8; }
      return { x: x, y: y };
    }
    function paint(x, y, s) {
      bf.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) scale(' + (s || 1).toFixed(3) + ')';
    }
    function tick(now) {
      frame = 0;
      const dt = last ? clamp(now - last, 0, 240) : 16;
      last = now;
      if (diving) {
        const d = diving, t = clamp((now - d.t0) / d.duration, 0, 1), u = t * t * (1.5 - .5 * t);
        const v = 1 - u;
        const x = v * v * d.from.x + 2 * v * u * d.control.x + u * u * d.to.x;
        const y = v * v * d.from.y + 2 * v * u * d.control.y + u * u * d.to.y;
        const s = t < .65 ? 1 + .2 * (t / .65) : 1.2 - .55 * ((t - .65) / .35);
        paint(x, y, s);
        if (t < 1) { frame = window.requestAnimationFrame(tick); return; }
        const done = d.done;
        diving = null;
        done();
        return;
      }
      if (!active || !bf) return;
      const g = goalFor(active);
      if (!cur) cur = { x: g.x - 120, y: g.y };
      const k = 1 - Math.exp(-dt / 110);
      const ox = cur.x;
      cur.x += (g.x - cur.x) * k;
      cur.y += (g.y - cur.y) * k;
      const dx = cur.x - ox;
      if (dx < -.4) bf.classList.add('face-left'); else if (dx > .4) bf.classList.remove('face-left');
      bf.classList.toggle('is-moving', Math.abs(g.x - cur.x) > 3 || Math.abs(g.y - cur.y) > 3);
      paint(cur.x, cur.y, 1);
      frame = window.requestAnimationFrame(tick);
    }
    function schedule() { if (!frame) frame = window.requestAnimationFrame(tick); }
    function flap() {
      if (!bf) return;
      bf.classList.add('flap');
      window.clearTimeout(flapTimer);
      flapTimer = window.setTimeout(function () { if (bf) bf.classList.remove('flap'); }, 280);
    }
    forms.forEach(function (form) {
      form.addEventListener('focusin', function (event) {
        const el = event.target;
        if (!el.matches || !el.matches(FIELD) || el.closest('.honeypot')) return;
        window.clearTimeout(hideTimer);
        active = el;
        ensure();
        bf.classList.add('is-on');
        schedule();
      });
      form.addEventListener('focusout', function () {
        window.clearTimeout(hideTimer);
        hideTimer = window.setTimeout(function () {
          if (document.activeElement && document.activeElement.closest && document.activeElement.closest('form.club-form, form.register-form')) return;
          active = null;
          if (bf) bf.classList.remove('is-on', 'flap');
        }, 900);
      });
      form.addEventListener('input', flap);
      form.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace' || event.key === 'Delete') flap();
      });
    });
    window.addEventListener('scroll', function () { if (active) schedule(); }, { passive: true });
    /* dive onto the submit button, then send the form as usual */
    document.addEventListener('click', function (event) {
      if (skipSubmit || !event.target || !event.target.closest) return;
      const btn = event.target.closest('button[type=submit], input[type=submit]');
      if (!btn || !btn.form || !btn.form.matches('form.club-form, form.register-form') || btn.disabled) return;
      event.preventDefault();
      ensure();
      const from = cur ? { x: cur.x, y: cur.y } : { x: window.innerWidth * .4, y: window.innerHeight * .4 };
      const r = btn.getBoundingClientRect();
      const w = bf.offsetWidth || 74, h = bf.offsetHeight || 51;
      const to = { x: r.left + r.width / 2 - w / 2, y: r.top + r.height / 2 - h / 2 };
      const control = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 90 };
      bf.classList.add('is-on', 'flap', 'is-moving');
      cur = null;
      diving = { t0: window.performance.now(), duration: 380, from: from, to: to, control: control, done: function () {
        btn.classList.add('bf-hit');
        window.setTimeout(function () {
          btn.classList.remove('bf-hit');
          bf.classList.remove('flap', 'is-moving');
          window.setTimeout(function () { if (!active && bf) bf.classList.remove('is-on'); }, 500);
          skipSubmit = true;
          try { btn.click(); } finally { skipSubmit = false; }
        }, 130);
      } };
      schedule();
    }, false);
  }

  function start() {
    setupButterfly();
    setupCourier();
    setupFormButterfly();
    setupStory();
    setupSplash();
    setupBrandBand();
    setupWireObjects();
    setupHappinessGraph();
    setupMarqueeTiming();
    setupCardDeck();
    setupReveal();
    setupPortraits();
    setupMenu();
    setupHeroVideo();
    setupPhotoFrame();
    setupGalleryStage();
    setupForms();
    setupAnchorNavigation();
    setupScrollUi();
    setupDriftField();
    setupLiveUpdates();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
