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
    const targets = $$('.detail-card, .event-card, .gallery-item, .team-card, .calendar-item, .member-card, .gallery-stage, .calendar-month, .calendar-card, .timeline-item, .gallery-side-note');
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

  // Animation is optional. A missing butterfly can never block a form.
  let butterflyDive = function () { return Promise.resolve(); };

  function setupForms() {
    const sending = new WeakSet();
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
        if (sending.has(form)) return;
        const complaint = checkForm(form);
        if (complaint) {
          setStatus(form, complaint, true);
          return;
        }
        const button = event.submitter || form.querySelector('button[type="submit"]');
        const original = button ? button.textContent : '';
        const payload = Object.fromEntries(new FormData(form).entries());
        payload.type = form.dataset.formType || 'membership';
        sending.add(form);
        if (button) button.disabled = true;
        try {
          await butterflyDive(button);
          if (button) button.textContent = 'Sending…';
          setStatus(form, 'Sending…');
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
          sending.delete(form);
          if (button) { button.disabled = false; button.textContent = original; }
        }
      });
    });

    const proofPending = new WeakSet(), proofReplay = new WeakSet();
    $$('form.proof-form').forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (proofReplay.has(form) || typeof form.requestSubmit !== 'function' || reduced()) return;
        event.preventDefault();
        if (proofPending.has(form)) return;
        proofPending.add(form);
        const button = event.submitter || form.querySelector('button[type="submit"]');
        butterflyDive(button).then(function () {
          if (!form.isConnected) return;
          proofReplay.add(form);
          try { form.requestSubmit(button || undefined); }
          finally { proofReplay.delete(form); proofPending.delete(form); }
        });
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

  function setupNavigation() {
    const menu=$('.mobile-nav-toggle'), button=$('#menuButton');
    if(!menu||!button)return;
    function sync(){button.setAttribute('aria-expanded',String(menu.open));button.setAttribute('aria-label',menu.open?'Close main navigation':'Main navigation');}
    menu.addEventListener('toggle',sync);sync();
    document.addEventListener('keydown',function(event){if(event.key==='Escape'&&menu.open){menu.open=false;sync();button.focus();}});
    document.addEventListener('click',function(event){if(menu.open&&!event.target.closest('.nav')){menu.open=false;sync();}});
    window.matchMedia('(max-width:1100px)').addEventListener?.('change',function(event){if(!event.matches){menu.open=false;sync();}});
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
        if (section.parentElement && section.parentElement.dataset.storyPhase === 'herd') return false;
        const bounds = section.getBoundingClientRect();
        return bounds.top <= top + 1 && bounds.bottom > top;
      });
      document.body.classList.toggle('is-black-chapter', dark);
      if (lowMotion || box.bottom < 0 || box.top > window.innerHeight) return;
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
      document.documentElement.classList.remove('intro-cover');
      const theme = $('meta[name="theme-color"]'); if (theme) theme.content = '#403634';
      document.body.classList.add('intro-revealed');
      window.dispatchEvent(new CustomEvent('mt:intro-ready'));
    };
    if (!splash || reduced() || window.location.hash.length > 1 ||
        window.getComputedStyle && window.getComputedStyle(splash).visibility === 'hidden') { finish(); return; }
    const shell = $('.site-shell');
    if (shell) shell.inert = true;
    document.body.classList.add('intro-pending');
    splash.addEventListener('animationend', function (event) {
      if (event.target === splash && event.animationName === 'splashAway') finish();
    });
    // A late script must not start another 6.5-second hold after CSS finished.
    // The deadline belongs to this page visit, not to JS download completion.
    const remaining = Math.max(0, 6500 - (window.__mtIntroStarted ? Date.now() - window.__mtIntroStarted : 0));
    window.setTimeout(finish, remaining);
  }

  /* Network-only warmup: never evaluate the 3D bundle, start a decoder or
     block the intro. One low-priority request after the first-screen media is
     buffered. Slow/Data Saver connections spend bandwidth on the page instead. */
  function setupIntroWarmup() {
    const cover = document.documentElement;
    const connection = navigator.connection;
    if (!cover.classList.contains('intro-cover') || reduced() ||
        connection && (connection.saveData || /(^|-)2g|3g/.test(connection.effectiveType || ''))) return;
    const video = $('#heroVideo');
    let attempted = false, controller = null, timeout = 0;
    function stop() { clearTimeout(timeout); if (controller) controller.abort(); }
    function warm() {
      if (attempted || !cover.classList.contains('intro-cover') || document.hidden || !video || video.readyState < 2) return;
      // Fonts and poster/first frame win; no competing bulk texture downloads.
      if (document.fonts && document.fonts.status !== 'loaded') return;
      attempted = true; controller = new AbortController();
      timeout = window.setTimeout(stop, 1800);
      fetch('/index.php?scene-asset=engine', {priority:'low', credentials:'same-origin', signal:controller.signal})
        .then(response => { if (response.ok) return response.arrayBuffer(); })
        .catch(function () { /* optional cache warmup is never a scene error */ })
        .finally(function () { clearTimeout(timeout); controller = null; });
    }
    // Wait for the paint-heavy ring bloom before even this passive download.
    window.setTimeout(warm, 1600);
    video?.addEventListener('loadeddata', () => window.setTimeout(warm, 1600), {once:true});
    window.addEventListener('mt:intro-ready', stop, {once:true});
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  }

  /* Pause only decorative timelines outside the reading window. Keep normal
     document geometry: content-visibility/contain-layout breaks sticky scenes. */
  function setupMotionBudget() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => { entry.target.dataset.motionState = entry.isIntersecting ? 'active' : 'idle'; });
    }, {rootMargin:'300px 0px'});
    $$('main > section, main > div, .footer').forEach(function (node) {
      if (!node.classList.contains('mind-story') && !node.classList.contains('brand-chapter')) observer.observe(node);
    });
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
    let interaction = null, activeField = null, photoScale = 1, flapTimer = 0, drag = null, suppressDragClick = false;
    function measure(now) {
      const bounds = header.getBoundingClientRect();
      const width = butterfly.offsetWidth;
      const progress = clamp((window.scrollY || 0) / Math.max(1, document.documentElement.scrollHeight - window.innerHeight), 0, 1);
      target = { x: 10 + progress * Math.max(0, window.innerWidth - width - (window.innerWidth <= 1100 ? 84 : 32)), y: Math.max(4, (bounds.top || 0) + 12 - butterfly.offsetHeight), width: width };
      const navBox=header.querySelector?.('.nav')?.getBoundingClientRect();
      if(navBox&&target.x+width>navBox.left&&target.x<navBox.right)target.y=Math.max(4,bounds.bottom+8);
      const dark = $$('.black-chapter, .tv-chapter').some(function (section) {
        if (section.parentElement && section.parentElement.dataset.storyPhase === 'herd') return false;
        const box = section.getBoundingClientRect();
        const threshold = section.matches?.('.tv-chapter') ? window.innerHeight : bounds.bottom + 1;
        return box.top <= threshold && box.bottom > bounds.bottom;
      });
      if (dark !== desiredDark) { desiredDark = dark; darkSince = now; }
      needsMeasure = false;
    }
    function render() {
      if (butterfly.dataset && butterfly.dataset.butterflyState !== state) butterfly.dataset.butterflyState = state;
      butterfly.style.setProperty('--butterfly-size', photoScale.toFixed(3));
      butterfly.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0) rotate(' + angle.toFixed(2) + 'deg)';
    }
    function schedule() {
      if (!frame && state !== 'waiting' && !document.hidden) frame = window.requestAnimationFrame(tick);
    }
    function launch(kind) {
      if(kind!=='entry'&&desiredDark)kind='leave';
      if(kind==='leave')committedDark=true;else if(!desiredDark)committedDark=false;
      const end = kind === 'leave' ? { x: -target.width - 100, y: -butterfly.offsetHeight - 60 } : { x: target.x, y: target.y };
      const duration = kind === 'entry' ? 6400 : (kind === 'release' || kind === 'return-action') ? clamp(500 + Math.hypot(end.x-x, end.y-y)*.5, 650, 1000) : Math.max(kind === 'leave' ? 4200 : 3400, Math.abs(end.x - x) * 3.4);
      // A continuous tangent survives reversals; no cancelled animation can
      // restore an old CSS pose or switch the butterfly's opacity mid-flight.
      const reach = Math.min(380, duration * .22);
      flight = { kind: kind, elapsed: 0, duration: duration,
        start: { x: x, y: y, angle: angle },
        c1: kind === 'leave' ? {x:clamp(x+window.innerWidth*.24,100,window.innerWidth-target.width),y:Math.max(110,Math.min(window.innerHeight*.28,y+150))} : (kind === 'release' || kind === 'return-action') ? {x:clamp(x+vx*reach,0,window.innerWidth-target.width),y:clamp(y+vy*reach,0,window.innerHeight-butterfly.offsetHeight)} : kind === 'entry' ? { x: x - window.innerWidth * .06, y: window.innerHeight * .55 } : { x: x + vx * reach, y: y + vy * reach },
        c2: kind === 'leave' ? {x:Math.max(40,x*.35),y:Math.max(35,window.innerHeight*.12)} : { x: end.x + 20, y: kind === 'entry' ? end.y + window.innerHeight * .18 : end.y - 18 }, end: end };
      state = kind === 'leave' ? 'leaving' : kind === 'return-action' ? 'returning-action' : 'entering';
      butterfly.classList.remove('butterfly-away');
      butterfly.classList.add('butterfly-arrived', 'butterfly-flying');
      schedule();
    }
    function destination(node, kind, point) {
      const box = node.getBoundingClientRect(), w = butterfly.offsetWidth, h = butterfly.offsetHeight;
      const scale = kind === 'field' ? (window.innerWidth < 600 ? .38 : .42) : .66;
      const cx = kind === 'field' ? Math.max(w * scale / 2 + 2, box.left - w * scale / 2 - 5) : clamp(point ? point.x : box.left + box.width / 2, w * scale / 2, window.innerWidth - w * scale / 2);
      const cy = kind === 'field' ? clamp(box.top + Math.min(box.height, 48) / 2, h / 2, window.innerHeight - h / 2) : clamp(point ? point.y : box.top + box.height / 2, h * scale / 2, window.innerHeight - h * scale / 2);
      return { x: cx - w / 2, y: cy - h / 2, scale: scale };
    }
    function moveTo(node, kind, point) {
      if (drag) return Promise.resolve();
      if (!node || !node.isConnected || reduced()) return Promise.resolve();
      if (interaction) interaction.cancel();
      measure(performance.now());
      if(desiredDark){if(kind==='field')activeField=null;if(state!=='away'&&state!=='leaving')launch('leave');return Promise.resolve();}
      if (state === 'waiting') { x = Math.max(0, node.getBoundingClientRect().left - 100); y = window.innerHeight + 80; }
      flight = null; state = 'interacting';
      const end = destination(node, kind, point), from = { x: x, y: y, angle: angle, scale: photoScale };
      const duration = clamp(280 + Math.hypot(end.x - x, end.y - y) * .11, 320, 500);
      butterfly.classList.add('butterfly-arrived', 'butterfly-flying');
      butterfly.classList.remove('butterfly-away');
      return new Promise(function (resolve) {
        let timer;
        const trip = { node: node, kind: kind, end: end, from: from, duration: duration, elapsed: 0, cancel: function () {
          clearTimeout(timer); if (interaction === trip) interaction = null; resolve();
        }, finish: function () {
          clearTimeout(timer);
          if (interaction !== trip) { resolve(); return; }
          // Actions land at the captured viewport point, even if a menu closes
          // or an anchor scrolls. Fields alone track their live screen position.
          const landed = kind === 'action' ? trip.end : destination(node, kind);
          x = landed.x; y = landed.y; photoScale = landed.scale; angle = 0;
          interaction = null; state = kind === 'field' ? 'companion' : 'perched';
          render();
          if (kind === 'action') {
            document.dispatchEvent(new CustomEvent('mt:butterfly-hit', { detail: { target: node, point: {x:x+butterfly.offsetWidth/2,y:y+butterfly.offsetHeight/2} } }));
            if (activeField && activeField.isConnected && document.activeElement === activeField) moveTo(activeField, 'field');
            else { measure(performance.now()); launch('return-action'); }
          } else butterfly.classList.remove('butterfly-flying');
          resolve();
        } };
        interaction = trip;
        // A background tab, a stopped frame clock or a slow device cannot trap an action.
        timer = window.setTimeout(trip.finish, 620);
        schedule();
      });
    }
    butterflyDive = function (node, point) { return moveTo(node, 'action', point); };
    function formField(node) {
      return node && node.matches && node.matches('input:not([type="hidden"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select') && !node.closest('.honeypot') && node.closest('form.club-form, form.register-form, form.proof-form');
    }
    document.addEventListener('focusin', function (event) {
      if (!formField(event.target)) return;
      activeField = event.target;
      if (!drag && (!interaction || interaction.kind !== 'action')) moveTo(activeField, 'field');
    });
    function companionVisibility() {
      if (drag) return;
      if (!activeField) {
        const focused = document.activeElement;
        if (formField(focused)) {
          const box = focused.getBoundingClientRect(), bar = header.getBoundingClientRect();
          if (box.bottom > bar.bottom + 4 && box.top < window.innerHeight - 12) {
            activeField = focused;
            if (!interaction || interaction.kind !== 'action') moveTo(focused, 'field');
          }
        }
        return;
      }
      const box = activeField.getBoundingClientRect(), bar = header.getBoundingClientRect();
      if (box.bottom > bar.bottom + 4 && box.top < window.innerHeight - 12) return;
      activeField = null;
      if (interaction && interaction.kind === 'field') interaction.cancel();
      if (state === 'companion' || state === 'interacting' && !interaction) {
        measure(performance.now()); launch('return');
      }
    }
    document.addEventListener('focusout', function () {
      window.setTimeout(function () {
        if (formField(document.activeElement)) return;
        activeField = null;
        if (state === 'companion' || interaction && interaction.kind === 'field') {
          if (interaction) interaction.finish();
          measure(performance.now()); launch('return');
        }
      }, 0);
    });
    function flutter(event) {
      if (!formField(event.target) || reduced()) return;
      butterfly.classList.add('butterfly-typing');
      clearTimeout(flapTimer);
      flapTimer = window.setTimeout(function () { butterfly.classList.remove('butterfly-typing'); }, 280);
    }
    document.addEventListener('input', flutter);
    document.addEventListener('keydown', function (event) { if (event.key === 'Backspace' || event.key === 'Delete') flutter(event); });
    // Only the butterfly's small visible grip receives pointer input. The
    // viewport flight layer remains click-through over links and form fields.
    const grip = butterfly.querySelector?.('.butterfly-grip');
    function releaseDrag() {
      if (!drag) return;
      const previous = drag; drag = null;
      if(previous.id!==null)suppressDragClick=true;
      butterfly.classList.remove('butterfly-dragging');
      if (previous.id !== null && grip?.hasPointerCapture(previous.id)) grip.releasePointerCapture(previous.id);
      measure(performance.now()); lastFrame = 0;
      if (activeField?.isConnected && document.activeElement === activeField && !desiredDark) moveTo(activeField, 'field');
      else launch(desiredDark ? 'leave' : 'release');
    }
    function beginDrag(id, clientX, clientY) {
      if (drag) return false;
      if (interaction) interaction.cancel();
      flight = null; vx = 0; vy = 0; lastFrame = 0;
      drag = {id:id, x:clientX, y:clientY, offsetX:clientX-x-butterfly.offsetWidth/2, offsetY:clientY-y-butterfly.offsetHeight/2};
      state = 'dragging'; butterfly.classList.remove('butterfly-away');
      butterfly.classList.add('butterfly-arrived','butterfly-flying','butterfly-dragging');
      render(); schedule(); return true;
    }
    if (grip) {
      grip.addEventListener('pointerdown', function (event) {
        if (!event.isPrimary || event.button !== 0 || drag) return;
        event.preventDefault(); event.stopPropagation();
        if (beginDrag(event.pointerId,event.clientX,event.clientY)) grip.setPointerCapture(event.pointerId);
      });
      grip.addEventListener('pointermove', function (event) {
        if (!drag || drag.id !== event.pointerId) return;
        event.preventDefault(); drag.x = event.clientX; drag.y = event.clientY; schedule();
      });
      function endPointer(event) { if (drag && drag.id === event.pointerId) releaseDrag(); }
      ['pointerup','pointercancel','lostpointercapture'].forEach(name=>grip.addEventListener(name,endPointer));
      grip.addEventListener('click', function (event) { event.preventDefault(); event.stopPropagation(); });
      grip.addEventListener('dragstart', event=>event.preventDefault());
      grip.addEventListener('keydown', function (event) {
        const directions = {ArrowLeft:[-24,0],ArrowRight:[24,0],ArrowUp:[0,-24],ArrowDown:[0,24]};
        if (event.key === 'Escape' || event.key === 'Home') { event.preventDefault(); releaseDrag(); return; }
        if (!directions[event.key]) return;
        event.preventDefault(); event.stopPropagation();
        if (!drag) beginDrag(null,x+butterfly.offsetWidth/2,y+butterfly.offsetHeight/2);
        if (drag.id !== null) return;
        drag.x += directions[event.key][0]; drag.y += directions[event.key][1]; schedule();
      });
      grip.addEventListener('blur', ()=>{if(drag?.id===null)releaseDrag();});
      window.addEventListener('blur', releaseDrag);
    }
    // Consume only the compatibility click belonging to the ended drag. A new
    // real press clears this immediately, so the next button tap is never lost.
    window.addEventListener('pointerdown',()=>{suppressDragClick=false;},{capture:true,passive:true});
    const replay = new WeakSet();
    let actionTicket = 0;
    document.addEventListener('click', function (event) {
      if(suppressDragClick&&event.detail>0){suppressDragClick=false;event.preventDefault();event.stopImmediatePropagation();return;}
      if (document.documentElement.classList?.contains('intro-cover') || document.body.classList.contains('is-black-chapter') || document.body.classList.contains('story-immersive') || desiredDark || drag || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || reduced() || event.target.closest?.('.nav-butterfly,[data-no-butterfly],.mind-story')) return;
      const node = event.target.closest && event.target.closest('a[href], button, summary');
      const point = event.detail > 0 ? {x:event.clientX,y:event.clientY} : null;
      if (!node) {
        // Plain page taps are visual feedback only; never swallow selection,
        // field focus, file pickers, media controls or the browser's action.
        if (point && !event.target.closest?.('input,textarea,select,label,video,iframe') && !window.getSelection?.()?.toString()) moveTo(event.target,'action',point);
        return;
      }
      if (replay.has(node) || node.disabled) return;
      if (node.tagName === 'SUMMARY') { butterflyDive(node,point); return; }
      if (node.tagName === 'A') {
        const url = new URL(node.href, location.href);
        // Native navigation/downloads/modifiers must never wait for decoration.
        if (node.hasAttribute('download') || node.target && node.target !== '_self' || url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
        butterflyDive(node,point); return;
      } else if (node.type === 'submit' || node.hasAttribute('data-print')) return;
      event.preventDefault(); event.stopImmediatePropagation();
      const ticket = ++actionTicket;
      butterflyDive(node,point).then(function () {
        if (ticket !== actionTicket || !node.isConnected) return;
        replay.add(node);
        try { node.click(); } finally { replay.delete(node); }
      });
    }, true);
    function tick(now) {
      frame = 0;
      if (document.hidden || state === 'waiting') { lastFrame = 0; return; }
      const elapsedDt = lastFrame ? clamp(now - lastFrame, 0, 1000) : 16;
      const dt = Math.min(64,elapsedDt);
      lastFrame = now;
      if (needsMeasure || !target) measure(now);
      // Dark transitions outrank a retained field/click trip. Otherwise the
      // companion branch returns early forever and pins the photo mid-screen.
      if((desiredDark&&(interaction||state==='companion')) || (interaction&&interaction.node.isConnected===false)){
        if(interaction)interaction.cancel();activeField=null;launch(desiredDark?'leave':'return');
      }
      if (drag) {
        if (desiredDark) { releaseDrag(); return; }
        const oldX=x, oldY=y, follow=reduced()?1:1-Math.exp(-dt/28);
        photoScale += (1-photoScale)*follow;
        const w=butterfly.offsetWidth,h=butterfly.offsetHeight;
        const endX=clamp(drag.x-drag.offsetX,w/2,window.innerWidth-w/2)-w/2;
        const endY=clamp(drag.y-drag.offsetY,h/2,window.innerHeight-h/2)-h/2;
        x+=(endX-x)*follow; y+=(endY-y)*follow;
        vx=(x-oldX)/Math.max(1,dt); vy=(y-oldY)/Math.max(1,dt);
        angle+=(clamp(vx*12,-16,16)-angle)*follow; render();
        if(Math.abs(x-endX)+Math.abs(y-endY)+Math.abs(1-photoScale)>.1)schedule();
        return;
      }
      if (reduced()) {
        flight = null; committedDark = desiredDark; state = desiredDark ? 'away' : 'perched';
        x = target.x; y = target.y; angle = 0;
        butterfly.classList.toggle('butterfly-away', desiredDark);
        butterfly.classList.remove('butterfly-flying'); render(); lastFrame = 0; return;
      }
      if (interaction) {
        const trip = interaction, end = trip.kind === 'action' ? trip.end : destination(trip.node, trip.kind);
        trip.elapsed += elapsedDt;
        const t = clamp(trip.elapsed / trip.duration, 0, 1), u = clamp((t - .12) / .88, 0, 1);
        const ease = u * u * (3 - 2 * u), arc = Math.sin(Math.PI * u);
        x = trip.from.x + (end.x - trip.from.x) * ease;
        y = trip.from.y + (end.y - trip.from.y) * ease - arc * Math.min(75, Math.abs(end.x - trip.from.x) * .15 + 24);
        const heading = Math.atan2(end.y - trip.from.y, end.x - trip.from.x) * 180 / Math.PI + 90;
        const turn = ((heading - trip.from.angle + 540) % 360) - 180;
        angle = trip.from.angle + turn * Math.min(1, t / .18) * Math.sin(Math.PI * t * .82);
        photoScale = trip.from.scale + (end.scale - trip.from.scale) * Math.min(1, t * 3);
        render();
        if (t === 1) trip.finish();
        schedule(); return;
      }
      if (state === 'companion' && activeField) {
        const end = destination(activeField, 'field');
        x += (end.x - x) * (1 - Math.exp(-dt / 110));
        y += (end.y - y) * (1 - Math.exp(-dt / 110));
        angle += (0 - angle) * .15; photoScale = end.scale; render();
        if (Math.abs(x - end.x) + Math.abs(y - end.y) > .15) schedule();
        return;
      }
      photoScale += (1 - photoScale) * (1 - Math.exp(-dt / 240));
      // Brief crossings during a fast scroll never trigger a disappearance.
      if (desiredDark !== committedDark && now - darkSince >= 320) {
        committedDark = desiredDark;
        launch(desiredDark ? 'leave' : 'return');
      }
      const oldX = x, oldY = y;
      if (flight) {
        flight.elapsed += elapsedDt;
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
      lastScroll = next; needsMeasure = true; companionVisibility();
      document.body.classList.add('butterfly-scrolling');
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(function () {
        tilt = 0; document.body.classList.remove('butterfly-scrolling'); schedule();
      }, 260);
      schedule();
    }, { passive: true });
    window.addEventListener('resize', function () { needsMeasure = true; companionVisibility(); schedule(); });
    // Banners, font loading and content-visibility can move a chapter without
    // another scroll event. Refresh its boundary, but never reset a flight.
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(function () { needsMeasure = true; schedule(); });
      observer.observe(document.body); observer.observe(header);
    }
    document.addEventListener('visibilitychange', function () { if(document.hidden){window.cancelAnimationFrame(frame);frame=0;releaseDrag();}lastFrame=0;needsMeasure=true;schedule(); });
    window.addEventListener('pageshow',function(){lastFrame=0;needsMeasure=true;schedule();});
  }

  /* Two fast-start encodes; the untouched master is retained for the club.
     Buffering is not repaired by repeatedly seeking or reloading the file. */
  /* Dense reference frames on a WebGL plane: the camera, body and hand are
     those in the recording, not an invented three-pose slideshow. */
  function setupCinematicChapters() {
    const opening=$('.flower-prologue'), chapter=$('.tv-chapter');
    if(!opening||!chapter)return;
    const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
    const motionAllowed=()=>!reduced()&&!navigator.connection?.saveData;
    const cards=$('.flower-hand-cards',opening);
    function handCopy(position){const amount=clamp((position/4-17)/7);cards.style.opacity=String(amount);cards.setAttribute('aria-hidden',String(amount<.05));}
    // User-driven seeking is not autoplay. Do not disable it for Data Saver or
    // collapse its track for reduced motion; omit easing/extra zoom instead.
    const movie=$('.flower-video',opening),filmLayer=$('.flower-film',opening);
    let film=null,desiredTime=0,videoFailed=false,decodeTimer=0;
    function fallback(){
      if(film)return;videoFailed=true;clearTimeout(decodeTimer);movie.style.opacity='0';
      film=window.MTFrameSequence?.create($('.flower-canvas',opening),{manifest:'/assets/media/flower-sequence/manifest.json',count:157,onFrame:handCopy});update();
    }
    function seekMovie(){
      if(videoFailed||!movie||!Number.isFinite(movie.duration)||movie.seeking)return;
      const time=clamp(desiredTime,0,Math.max(0,movie.duration-1/12));
      if(Math.abs(movie.currentTime-time)>1/48){try{movie.currentTime=time;clearTimeout(decodeTimer);decodeTimer=setTimeout(()=>{if(movie.seeking)fallback();},4000);}catch(_){fallback();}}
    }
    function presented(){
      clearTimeout(decodeTimer);if(videoFailed)return;
      if(movie.readyState>=2){movie.style.opacity='1';movie.dataset.videoReady='true';movie.dataset.displayedFrame=(movie.currentTime*48).toFixed(2);handCopy(movie.currentTime*48);}
      seekMovie();
    }
    movie.addEventListener('loadedmetadata',seekMovie);
    movie.addEventListener('loadeddata',presented);
    movie.addEventListener('seeked',presented);
    movie.addEventListener('error',fallback);
    let viewportWidth=0,viewportHeight=innerHeight,frame=0,last=0,progress=0,target=0,horse=null;
    function size(){
      const width=document.documentElement.clientWidth;
      viewportHeight=width!==viewportWidth?Math.ceil(Math.max(innerHeight,window.visualViewport?.height||0)):Math.max(viewportHeight,Math.ceil(innerHeight));
      viewportWidth=width;opening.style.setProperty('--flower-height',viewportHeight+'px');
      const scale=Math.max(width/640,viewportHeight/478);cards.style.width=Math.min(width,300*scale)+'px';cards.style.height=158*scale+'px';cards.style.top=((viewportHeight-478*scale)/2+162*scale)+'px';update();
    }
    function render(now){
      frame=0;if(document.hidden){last=0;return;}
      const dt=last?Math.min(64,now-last):16;last=now;
      progress+=(target-progress)*(reduced()?1:1-Math.exp(-dt/95));
      if(Math.abs(target-progress)<.0003)progress=target;
      const p=progress;
      // Explicit close-in zoom first, then the original camera/hand footage.
      const source=p<.16?p/.16: p<.55?1+(p-.16)/.39*16:17+(p-.55)/.45*22;
      const zoom=reduced()?1:p<.16?1+p/.16*.16:1+.16*(1-clamp((p-.16)/.39));
      filmLayer.style.transform='scale('+zoom.toFixed(4)+')';
      desiredTime=source/12;movie.dataset.targetFrame=(source*4).toFixed(2);seekMovie();
      film?.setFrame(source*4);opening.dataset.flowerProgress=p.toFixed(4);
      if(progress!==target)frame=requestAnimationFrame(render);else last=0;
    }
    function update(){
      const bounds=opening.getBoundingClientRect(),covered=document.documentElement.classList.contains('intro-cover');
      target=clamp(-bounds.top/Math.max(1,opening.offsetHeight-viewportHeight));
      document.body.classList.toggle('flower-active',bounds.bottom>85&&bounds.top<viewportHeight);
      // Start the herd at the end of the girl camera track, not after the TV.
      const nextHorse=bounds.bottom<=viewportHeight+1;
      if(horse!==nextHorse){horse=nextHorse;document.body.classList.toggle('horse-era',horse);window.dispatchEvent(new CustomEvent('mt:horse-era',{detail:{active:horse}}));}
      film?.setActive(bounds.bottom>0&&bounds.top<viewportHeight&&!covered);
      if(!frame&&!document.hidden)frame=requestAnimationFrame(render);
    }
    window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',size,{passive:true});
    window.visualViewport?.addEventListener('resize',size,{passive:true});window.addEventListener('mt:intro-ready',update);size();
    if(movie.error||!movie.canPlayType('video/mp4; codecs="avc1.42E01E"'))fallback();
    else if(movie.readyState>=2)presented();else seekMovie();

    let tv=null,active=false,wanted=37,previousX=null,neutralTilt=null;
    function loadTv(){
      if(tv||!motionAllowed())return;
      tv=window.MTFrameSequence?.create($('.tv-canvas',chapter),{manifest:'/assets/media/tv-sequence/manifest.json',count:75});
      tv?.setFrame(wanted);tv?.setActive(active);
    }
    const observe=()=>{
      const bounds=chapter.getBoundingClientRect();
      active=bounds.top<innerHeight&&bounds.bottom>0;
      if(active){loadTv();tv?.setActive(true);}else tv?.setActive(false);
      const covered=bounds.top<=1&&bounds.bottom>=innerHeight-1;
      const changed=document.body.classList.contains('tv-covered')!==covered;
      document.body.classList.toggle('tv-covered',covered);
      if(changed)window.dispatchEvent(new CustomEvent('mt:horse-era'));
    };
    if('IntersectionObserver'in window){
      const near=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){loadTv();near.disconnect();}},{rootMargin:'700px'});near.observe(chapter);
    }
    window.addEventListener('scroll',observe,{passive:true});window.addEventListener('resize',observe,{passive:true});observe();
    window.addEventListener('pointermove',event=>{
      if(!active||!motionAllowed()){previousX=null;return;}
      if(previousX!==null)wanted=clamp(wanted+(event.clientX-previousX)/innerWidth*.8*74,0,74);
      previousX=event.clientX;tv?.setFrame(wanted);
    },{passive:true});
    window.addEventListener('pointerdown',event=>{previousX=event.clientX;},{passive:true});
    window.addEventListener('pointerup',()=>{previousX=null;},{passive:true});
    window.addEventListener('deviceorientation',event=>{
      if(!active||!motionAllowed()||!Number.isFinite(event.gamma))return;
      if(neutralTilt===null)neutralTilt=event.gamma;
      wanted=clamp(37+(event.gamma-neutralTilt)/35*37,0,74);tv?.setFrame(wanted);
    },{passive:true});
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden){cancelAnimationFrame(frame);frame=0;last=0;film?.setActive(false);tv?.setActive(false);}
      else{update();observe();}
    });
  }

  function setupHeroVideo() {
    const video = $('#heroVideo');
    if (!video) return;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    // Stable largest viewport: mobile toolbar changes must not resize/crop the
    // hardware video layer on every scroll. Only grow, or reset on width change.
    const media = $('.hero-media');
    let mediaWidth = 0, mediaHeight = 0;
    function sizeMedia() {
      if (!media?.style) return;
      const width = document.documentElement.clientWidth;
      const height = Math.ceil(Math.max(innerHeight, window.visualViewport?.height || 0));
      mediaHeight = width !== mediaWidth ? height : Math.max(mediaHeight, height); mediaWidth = width;
      const value = mediaHeight + 'px';
      if (media.style.getPropertyValue('--hero-viewport-height') !== value) media.style.setProperty('--hero-viewport-height', value);
    }
    sizeMedia(); window.addEventListener('resize', sizeMedia, {passive:true});
    window.visualViewport?.addEventListener('resize', sizeMedia, {passive:true});
    function introCovered() { return document.documentElement?.classList.contains('intro-cover'); }
    // Buffer a first frame behind the intro, not a continuously decoded movie.
    video.autoplay = false;
    const allowed = !reduced() && !(connection && connection.saveData);
    let resumeAt = 0;
    let recoveryUsed = false;
    let lastClock = -1;
    let lastAdvance = Date.now();
    let waitingTimer = 0;
    function coveredByStory() {
      const story = $('.mind-story');
      return document.body.classList.contains('story-immersive') && story?.dataset.storyCovered !== 'false';
    }
    const gated = video.dataset.afterFlower === 'true';
    function beforeHorse() { return gated && (!document.body.classList.contains('horse-era') || document.body.classList.contains('tv-covered')); }
    function drop() { video.hidden = true; pause(); }
    function pause() { try { video.pause(); } catch (error) { /* already stopped */ } }
    function play() {
      if (!allowed || document.hidden || video.hidden || coveredByStory() || introCovered() || beforeHorse()) return;
      const attempt = video.play();
      if (attempt && attempt.catch) attempt.catch(function () { /* retry on a gesture */ });
    }
    if (!allowed) { drop(); return; }
    const mobile = window.matchMedia('(max-width: 900px)').matches || (connection && /(^|-)2g|3g/.test(connection.effectiveType || ''));
    const wantedSource = mobile ? video.dataset.mobileSrc : video.dataset.desktopSrc;
    function selectSource() {
      if (!video.currentSrc || !video.currentSrc.split('?')[0].endsWith(wantedSource)) video.src = wantedSource;
      video.preload = 'auto';
    }
    if (!beforeHorse()) selectSource();
    window.addEventListener('mt:horse-era', function () { if (beforeHorse()) pause(); else { selectSource(); play(); } });
    if (introCovered()) pause();
    window.addEventListener('mt:intro-ready', play, {once:true});
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
      if (coveredByStory() || introCovered() || beforeHorse()) { pause(); lastAdvance = Date.now(); return; }
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
    window.addEventListener('scroll', function () {
      if (coveredByStory() || beforeHorse()) { pause(); lastAdvance = Date.now(); }
      else if (video.paused) play();
    }, { passive: true });
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

  function start() {
    setupButterfly();
    const warmWires=()=>{
      const chapter=$('.brand-chapter');
      const load=()=>requestAnimationFrame(()=>requestAnimationFrame(setupWireObjects));
      // Keep large animation-atlas decoding off the hero/splash too; the
      // server-rendered wire silhouettes remain until the chapter approaches.
      if(chapter&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();load();}},{rootMargin:'1200px'});observer.observe(chapter);}
      else load();
    };
    if(document.documentElement.classList.contains('intro-cover'))window.addEventListener('mt:intro-ready',warmWires,{once:true});
    else warmWires();
    setupSplash();
    setupBrandBand();
    setupHappinessGraph();
    setupMarqueeTiming();
    setupCardDeck();
    setupReveal();
    setupPortraits();
    setupCinematicChapters();
    setupHeroVideo();
    setupIntroWarmup();
    setupMotionBudget();
    setupPhotoFrame();
    setupGalleryStage();
    setupForms();
    setupAnchorNavigation();
    setupScrollUi();
    setupNavigation();
    setupDriftField();
    setupLiveUpdates();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
