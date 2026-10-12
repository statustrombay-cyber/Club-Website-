/* ==========================================================================
   Mindful Tattva · public site script
   --------------------------------------------------------------------------
   Every word and picture on a page is already in the HTML, written by PHP from
   the club's own content. This file only adds movement and the small moments
   of interaction:

     · the drifting bubbles and the depth that gathers as you scroll
     · the reveal that lifts each section into place
     · the mobile menu
     · the photo gallery's stage on the gallery page
     · the club forms and the payment screenshot upload
     · a quiet check for new content while the dashboard is being edited
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

  /* ------------------------------------------------------- depth & reveal */
  function setupDepth() {
    if (window.__mtDepthAtmosphere) return;
    window.__mtDepthAtmosphere = true;
    let frame = 0;
    const update = function () {
      frame = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      const opacity = Math.max(0, Math.min(.5, (progress - .08) * .62));
      document.documentElement.style.setProperty('--depth-opacity', opacity.toFixed(3));
    };
    const onScroll = function () { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  function setupReveal() {
    const targets = $$('.section, .detail-card, .event-card, .gallery-item, .team-card, .calendar-item, .member-card, .psyche-card');
    if (!('IntersectionObserver' in window) || reduced()) {
      targets.forEach(function (node) { node.classList.add('is-visible'); });
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    targets.forEach(function (node, index) {
      if (!node.classList.contains('scroll-reveal')) {
        node.classList.add('scroll-reveal');
        node.style.transitionDelay = Math.min(index * 35, 280) + 'ms';
      }
      observer.observe(node);
    });
  }

  /* ------------------------------------------------------------ mobile nav */
  function setupMenu() {
    const button = $('#menuButton');
    const nav = $('#navLinks');
    if (!button || !nav) return;
    button.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', nav).forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      });
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

    const paint = function (slide) {
      stage.style.backgroundImage = slide.image ? "url('" + String(slide.image).replace(/[()'"]/g, '') + "')" : '';
      stage.classList.toggle('has-image', Boolean(slide.image));
      stage.setAttribute('aria-label', slide.alt || slide.caption || 'Mindful Tattva gallery photo');
      if (caption) caption.textContent = slide.caption || 'Mindful Tattva memory';
      if (kicker) kicker.textContent = slide.kicker || 'Mindful Tattva memory';
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

  function setupForms() {
    $$('form[data-ajax-form]').forEach(function (form) {
      form.addEventListener('submit', async function (event) {
        event.preventDefault();
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

  function start() {
    setupDepth();
    setupReveal();
    setupMenu();
    setupGalleryStage();
    setupForms();
    setupLiveUpdates();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
