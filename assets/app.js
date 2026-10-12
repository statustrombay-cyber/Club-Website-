/* ==========================================================================
   Mindful Tattva · public site script
   --------------------------------------------------------------------------
   The HTML already carries the real content, so nothing here is required for
   the site to read or to work. This file only adds motion, the scroll-driven
   awareness rails, the photo viewer and live updates from the club dashboard.
   ========================================================================== */
(function () {
  'use strict';

  /* ----------------------------------------------------------- utilities */
  const $ = function (selector, root) { return (root || document).querySelector(selector); };
  const $$ = function (selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); };
  const text = function (value) { return String(value === null || value === undefined ? '' : value).trim(); };
  const esc = function (value) {
    return text(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };
  const safeImage = function (value) {
    const url = text(value);
    if (!url) return '';
    if (/^data:image\//i.test(url)) return url;
    if (/^https?:\/\//i.test(url)) return url;
    if (/^\/[A-Za-z0-9._\-\/]*$/.test(url) && url.indexOf('..') === -1) return url;
    return '';
  };
  const safeLink = function (value) {
    const url = text(value);
    if (/^(https?:\/\/|mailto:|tel:)/i.test(url)) return url;
    if (/^\/[A-Za-z0-9._\-\/]*$/.test(url) && url.indexOf('..') === -1) return url;
    return '#';
  };
  const byOrder = function (a, b) { return (Number(a && a.order) || 0) - (Number(b && b.order) || 0); };
  const initials = function (name) {
    const parts = text(name).split(/\s+/).filter(Boolean).slice(0, 2);
    const joined = parts.map(function (word) { return word.charAt(0); }).join('');
    return joined.toUpperCase() || 'MT';
  };
  const clamp = function (value, min, max) { return Math.min(max, Math.max(min, value)); };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

  const monthIndexOf = function (value) {
    const haystack = text(value).toLowerCase();
    for (let i = 0; i < MONTHS.length; i += 1) {
      if (haystack.indexOf(MONTHS[i].toLowerCase()) !== -1) return i;
      if (haystack.indexOf(MONTHS[i].slice(0, 3).toLowerCase()) !== -1) return i;
    }
    return -1;
  };

  /* --------------------------------------------------------- page state */
  let state = { revision: 0, site: {}, gallery: [], events: [], team: [], awareness: [], history: [] };
  (function readBootstrap() {
    const node = document.getElementById('mt-bootstrap');
    if (!node) return;
    try {
      const parsed = JSON.parse(node.textContent || '{}');
      if (parsed && typeof parsed === 'object') state = Object.assign(state, parsed);
    } catch (error) {
      /* the server-rendered markup is complete on its own */
    }
  }());

  /* -------------------------------------------------------------- header */
  function initHeader() {
    const header = document.getElementById('siteHeader');
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('siteNav');
    if (!header) return;

    const paintshadow = function () { header.classList.toggle('is-stuck', window.scrollY > 24); };
    window.addEventListener('scroll', paintshadow, { passive: true });
    paintshadow();

    if (!toggle || !nav) return;
    const setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
    };
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
    $$('a', nav).forEach(function (link) { link.addEventListener('click', function () { setOpen(false); }); });
    window.addEventListener('keydown', function (event) { if (event.key === 'Escape') setOpen(false); });
  }

  function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    let frame = 0;
    const update = function () {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const value = height > 0 ? clamp(window.scrollY / height, 0, 1) : 0;
      bar.style.transform = 'scaleX(' + value.toFixed(4) + ')';
    };
    const request = function () { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    update();
  }

  function setupReveals() {
    const targets = $$('.reveal:not(.is-visible)');
    if (!targets.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (node) { node.classList.add('is-visible'); });
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (node) { observer.observe(node); });
  }

  /* ------------------------------------------------------- awareness tab */
  function initAwarenessTab() {
    const tab = document.getElementById('awarenessTab');
    if (!tab) return;
    const section = document.querySelector('[data-awareness-stage]');
    let frame = 0;
    const update = function () {
      frame = 0;
      const scrolled = window.scrollY > window.innerHeight * 0.55;
      let covered = false;
      if (section) {
        const rect = section.getBoundingClientRect();
        covered = rect.top < window.innerHeight * 0.75 && rect.bottom > 120;
      }
      const show = scrolled && !covered;
      if (show) tab.hidden = false;
      tab.classList.toggle('is-shown', show);
      if (!show) window.setTimeout(function () { if (!tab.classList.contains('is-shown')) tab.hidden = true; }, 380);
    };
    const request = function () { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);

    /* The pill is fixed to the bottom-left corner, which is where a form field
       ends up on a phone. Hide it while a field has focus so it can never sit
       on top of what somebody is typing into. */
    const isField = function (node) {
      return !!(node && node.closest && node.closest('input, select, textarea'));
    };
    document.addEventListener('focusin', function (event) {
      if (isField(event.target)) tab.classList.add('is-typing');
    });
    document.addEventListener('focusout', function (event) {
      // relatedTarget is whatever is being focused next, so stepping from one
      // field straight to another keeps the pill out of the way.
      if (!isField(event.relatedTarget)) tab.classList.remove('is-typing');
    });

    update();
  }

  /* --------------------------------------------------------------- stats */
  function renderStats() {
    const rows = (state.site && state.site.stats) || [];
    const clean = rows.filter(function (row) { return text(row && row.value) !== '' || text(row && row.label) !== ''; });
    $$('[data-render="stats"]').forEach(function (grid) {
      grid.innerHTML = clean.map(function (row) {
        return '<div class="stat-chip"><strong>' + esc(row.value) + '</strong><span>' + esc(row.label) + '</span></div>';
      }).join('');
    });
  }

  /* ------------------------------------------------------------- history */
  function renderHistory() {
    const grid = $('[data-render="history"]');
    if (!grid) return;
    const entries = (state.history || []).filter(function (entry) { return text(entry.title) !== ''; }).sort(byOrder);
    if (!entries.length) return;
    grid.innerHTML = entries.map(function (entry) {
      return '<article class="timeline-item reveal">'
        + '<div class="timeline-year">' + esc(entry.year) + '</div>'
        + '<h3>' + esc(entry.title) + '</h3>'
        + (text(entry.body) ? '<p>' + esc(entry.body) + '</p>' : '')
        + '</article>';
    }).join('');
  }

  /* ---------------------------------------------------------------- team */
  function renderTeam() {
    $$('[data-render="team"]').forEach(function (grid) {
      const scope = grid.getAttribute('data-team-scope') || 'all';
      let members = (state.team || []).filter(function (member) { return text(member.name) !== ''; });
      if (scope === 'home') {
        members = members.filter(function (member) {
          return (member.group || 'management') === 'management' && member.showOnHome !== false;
        });
      } else if (scope !== 'all') {
        members = members.filter(function (member) { return (member.group || 'management') === scope; });
      }
      members = members.sort(byOrder);
      if (!members.length) return;

      grid.innerHTML = members.map(function (member) {
        const image = safeImage(member.image);
        const phone = text(member.phone);
        const email = text(member.email);
        const contact = (phone || email)
          ? '<div class="team-contact">'
            + (phone ? '<a href="tel:' + esc(phone.replace(/[^+\d]/g, '')) + '">' + esc(phone) + '</a>' : '')
            + (email ? '<a href="mailto:' + esc(email) + '">' + esc(email) + '</a>' : '')
            + '</div>'
          : '';
        return '<article class="team-card reveal">'
          + '<div class="team-avatar">' + (image ? '<img src="' + esc(image) + '" alt="' + esc(member.name) + '" loading="lazy">' : esc(initials(member.name))) + '</div>'
          + '<h3>' + esc(member.name) + '</h3>'
          + '<div class="team-role">' + esc(member.role || 'Core team') + '</div>'
          + (text(member.bio) ? '<p>' + esc(member.bio) + '</p>' : '')
          + contact
          + '</article>';
      }).join('');
      setupReveals();
    });
  }

  /* -------------------------------------------------------------- events */
  function renderEvents() {
    $$('[data-render="events"]').forEach(function (grid) {
      const limit = Number(grid.getAttribute('data-limit')) || 0;
      let events = (state.events || []).filter(function (event) {
        return text(event.title) !== '' && event.published !== false;
      });
      events = events.sort(byOrder);
      if (limit > 0) events = events.slice(0, limit);
      if (!events.length) return;

      grid.innerHTML = events.map(function (event) {
        const image = safeImage(event.image);
        const link = safeLink(event.registrationUrl);
        return '<article class="event-card reveal">'
          + (image
            ? '<div class="event-media"><img src="' + esc(image) + '" alt="' + esc(event.title) + '" loading="lazy">'
              + '<span class="kicker">' + esc(event.kicker || 'Mindful Tattva') + '</span></div>'
            : '')
          + '<div class="event-body">'
          + '<div class="event-date">' + esc(event.date || 'Date to be announced') + '</div>'
          + '<h3>' + esc(event.title) + '</h3>'
          + (text(event.description) ? '<p>' + esc(event.description) + '</p>' : '')
          + '<div class="event-facts">'
          + (text(event.time) ? '<span>◷ ' + esc(event.time) + '</span>' : '')
          + (text(event.location) ? '<span>⌖ ' + esc(event.location) + '</span>' : '')
          + '</div>'
          + (link !== '#' ? '<a class="event-link" href="' + esc(link) + '" target="_blank" rel="noreferrer noopener">View details ↗</a>' : '')
          + '</div></article>';
      }).join('');
      setupReveals();
    });
  }

  /* ------------------------------------------------------------ calendar */
  function renderCalendar() {
    const grid = $('[data-render="calendar"]');
    if (!grid) return;
    const events = (state.events || []).filter(function (event) {
      return text(event.title) !== '' && event.published !== false && monthIndexOf(event.date) !== -1;
    });
    grid.innerHTML = MONTHS.map(function (month, index) {
      const list = events.filter(function (event) { return monthIndexOf(event.date) === index; });
      return '<article class="month-card' + (list.length ? ' has-events' : '') + ' reveal">'
        + '<div class="month-head"><span>' + String(index + 1).padStart(2, '0') + '</span><h3>' + month + '</h3></div>'
        + '<div class="month-events">'
        + (list.length
          ? list.map(function (event) {
            return '<div class="month-event"><strong>' + esc(event.title) + '</strong>'
              + '<span>' + esc(event.date) + (text(event.time) ? ' · ' + esc(event.time) : '') + '</span>'
              + (text(event.location) ? '<small>⌖ ' + esc(event.location) + '</small>' : '')
              + '</div>';
          }).join('')
          : '<span class="month-empty">Open for new ideas</span>')
        + '</div></article>';
    }).join('');
    setupReveals();
  }

  /* ------------------------------------------------------------- gallery */
  let galleryFilter = 'all';
  let galleryQuery = '';

  function galleryItems() {
    return (state.gallery || []).filter(function (item) { return safeImage(item.image) !== ''; }).sort(byOrder);
  }

  function visibleGalleryItems() {
    const query = galleryQuery.toLowerCase();
    return galleryItems().filter(function (item) {
      if (galleryFilter !== 'all' && text(item.event) !== galleryFilter) return false;
      if (!query) return true;
      const haystack = [item.caption, item.event, item.date, item.alt, item.credit].map(text).join(' ').toLowerCase();
      return haystack.indexOf(query) !== -1;
    });
  }

  /* A caption is printed only when the club typed one in the dashboard; the
     event or date alone becomes a small badge on the photo instead. */
  function galleryCard(item, index) {
    const image = safeImage(item.image);
    if (!image) return '';
    const caption = text(item.caption);
    const meta = text(item.event) || text(item.date);
    const alt = text(item.alt) || caption || 'Mindful Tattva photo';
    return '<figure class="gallery-card reveal">'
      + '<button type="button" data-gallery-open="' + index + '" aria-label="Open photo' + (caption ? ': ' + esc(caption) : '') + '">'
      + '<img src="' + esc(image) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async">'
      + '</button>'
      + (caption
        ? '<figcaption><strong>' + esc(caption) + '</strong>' + (meta ? '<span>' + esc(meta) + '</span>' : '') + '</figcaption>'
        : (meta ? '<span class="gallery-badge">' + esc(meta) + '</span>' : ''))
      + '</figure>';
  }

  function renderGallery() {
    const grid = $('[data-render="gallery"]');
    if (!grid) return;
    const items = visibleGalleryItems();
    if (!items.length) {
      grid.innerHTML = '<div class="empty-state"><strong>No photos match that yet.</strong>'
        + '<p>Try another word, or clear the filter to see the whole album.</p></div>';
      return;
    }
    grid.innerHTML = items.map(galleryCard).join('');
    setupReveals();
  }

  function renderGalleryFilters() {
    const row = $('[data-render="gallery-filters"]');
    if (!row) return;
    const items = galleryItems();
    const events = [];
    items.forEach(function (item) {
      const name = text(item.event);
      if (name && events.indexOf(name) === -1) events.push(name);
    });
    if (!events.length) {
      row.innerHTML = '<span class="chip is-active">' + items.length + ' photo' + (items.length === 1 ? '' : 's') + '</span>';
      return;
    }
    const chips = [{ label: 'All photos', value: 'all', count: items.length }].concat(events.map(function (name) {
      return {
        label: name,
        value: name,
        count: items.filter(function (item) { return text(item.event) === name; }).length,
      };
    }));
    row.innerHTML = chips.map(function (chip) {
      return '<button type="button" class="chip' + (galleryFilter === chip.value ? ' is-active' : '') + '" data-gallery-filter="' + esc(chip.value) + '">'
        + esc(chip.label) + ' <span aria-hidden="true">' + chip.count + '</span></button>';
    }).join('');
  }

  function renderGalleryPreview() {
    $$('[data-render="gallery-preview"]').forEach(function (grid) {
      const limit = Number(grid.getAttribute('data-limit')) || 6;
      const items = galleryItems().slice(0, limit);
      if (!items.length) return;
      grid.innerHTML = items.map(galleryCard).join('');
      setupReveals();
    });
  }

  function initGalleryToolbar() {
    const toolbar = $('[data-gallery-toolbar]');
    if (toolbar) {
      toolbar.addEventListener('click', function (event) {
        const chip = event.target.closest('[data-gallery-filter]');
        if (!chip) return;
        galleryFilter = chip.getAttribute('data-gallery-filter') || 'all';
        renderGalleryFilters();
        renderGallery();
      });
    }
    const search = $('[data-gallery-search]');
    if (search) {
      let timer = 0;
      search.addEventListener('input', function () {
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          galleryQuery = text(search.value);
          renderGallery();
        }, 120);
      });
    }
  }

  /* ------------------------------------------------------------ lightbox */
  let lightboxItems = [];
  let lightboxIndex = 0;
  let lightboxReturn = null;

  function lightboxOpen(items, index) {
    const box = document.getElementById('lightbox');
    if (!box || !items.length) return;
    lightboxItems = items;
    lightboxIndex = clamp(index, 0, items.length - 1);
    lightboxReturn = document.activeElement;
    box.hidden = false;
    document.body.classList.add('lightbox-open');
    paintLightbox();
  }

  function paintLightbox() {
    const box = document.getElementById('lightbox');
    if (!box) return;
    const item = lightboxItems[lightboxIndex];
    if (!item) return;
    const image = document.getElementById('lightboxImage');
    const caption = document.getElementById('lightboxCaption');
    const body = document.getElementById('lightboxBody');
    const count = document.getElementById('lightboxCount');

    if (image) {
      /* Never write src="" — a browser reads that as the page's own URL and
         fires a pointless request for the document on every open. */
      const source = safeImage(item.image);
      if (source) image.src = source;
      else image.removeAttribute('src');
      image.alt = text(item.alt) || text(item.caption) || 'Mindful Tattva photo';
    }
    if (caption) {
      const line = text(item.caption);
      caption.textContent = line;
      caption.hidden = line === '';
    }
    if (body) {
      const blocks = [];
      if (text(item.fact)) blocks.push('<p class="lightbox-fact">' + esc(item.fact) + '</p>');
      if (text(item.body)) blocks.push('<p>' + esc(item.body) + '</p>');
      if (text(item.takeaway)) blocks.push('<p class="lightbox-takeaway"><strong>What helps</strong> ' + esc(item.takeaway) + '</p>');
      if (text(item.source)) blocks.push('<p class="lightbox-source">Source: ' + esc(item.source) + '</p>');
      body.innerHTML = blocks.join('');
      body.hidden = blocks.length === 0;
      const frame = $('.lightbox-frame', box);
      if (frame) frame.classList.toggle('has-note', blocks.length > 0);
    }
    if (count) {
      count.textContent = lightboxItems.length > 1 ? (lightboxIndex + 1) + ' / ' + lightboxItems.length : '';
    }
  }

  function lightboxStep(delta) {
    if (lightboxItems.length < 2) return;
    lightboxIndex = (lightboxIndex + delta + lightboxItems.length) % lightboxItems.length;
    paintLightbox();
  }

  function lightboxClose() {
    const box = document.getElementById('lightbox');
    if (!box || box.hidden) return;
    box.hidden = true;
    document.body.classList.remove('lightbox-open');
    const image = document.getElementById('lightboxImage');
    if (image) image.removeAttribute('src');
    if (lightboxReturn && typeof lightboxReturn.focus === 'function') lightboxReturn.focus();
  }

  function initLightbox() {
    const box = document.getElementById('lightbox');
    if (!box) return;

    box.addEventListener('click', function (event) {
      if (event.target.closest('[data-lightbox-close]')) return lightboxClose();
      if (event.target.closest('[data-lightbox-prev]')) return lightboxStep(-1);
      if (event.target.closest('[data-lightbox-next]')) return lightboxStep(1);
      return undefined;
    });

    document.addEventListener('keydown', function (event) {
      if (box.hidden) return;
      if (event.key === 'Escape') lightboxClose();
      if (event.key === 'ArrowLeft') lightboxStep(-1);
      if (event.key === 'ArrowRight') lightboxStep(1);
    });

    let startX = null;
    box.addEventListener('touchstart', function (event) {
      startX = event.touches[0] ? event.touches[0].clientX : null;
    }, { passive: true });
    box.addEventListener('touchend', function (event) {
      if (startX === null) return;
      const endX = event.changedTouches[0] ? event.changedTouches[0].clientX : startX;
      if (Math.abs(endX - startX) > 50) lightboxStep(endX < startX ? 1 : -1);
      startX = null;
    });

    document.addEventListener('click', function (event) {
      const trigger = event.target.closest('[data-gallery-open]');
      if (!trigger) return;
      const index = Number(trigger.getAttribute('data-gallery-open')) || 0;
      const items = lightboxItemsFromDom();
      if (!items.length) return;
      lightboxOpen(items, index);
    });
  }

  /** Photos exactly in the order the visitor can see them on this page. */
  function lightboxItemsFromDom() {
    const grid = $('[data-render="gallery"]') || $('[data-render="gallery-preview"]');
    if (!grid) return galleryItems().map(galleryLightboxItem);
    return $$('[data-gallery-open]', grid).map(function (button) {
      const item = visibleGalleryItems()[Number(button.getAttribute('data-gallery-open')) || 0];
      return item ? galleryLightboxItem(item) : null;
    }).filter(Boolean);
  }

  function galleryLightboxItem(item) {
    return {
      image: item.image,
      caption: text(item.caption),
      alt: text(item.alt) || text(item.caption),
      fact: '',
      body: '',
      takeaway: '',
      source: '',
    };
  }

  /* --------------------------------------------------- awareness tiles */
  function renderAwareness() {
    const wrappers = $$('[data-render="awareness"]');
    if (!wrappers.length) return;
    const tiles = (state.awareness || []).filter(function (tile) { return text(tile.title) !== ''; }).sort(byOrder);
    if (!tiles.length) return;

    wrappers.forEach(function (wrapper) {
      const entries = tiles.map(function (tile, index) { return [index, tile]; });
      const rails = [
        entries.filter(function (entry) { return entry[0] % 2 === 0; }),
        entries.filter(function (entry) { return entry[0] % 2 === 1; }),
      ];
      wrapper.innerHTML = rails.map(function (rail, railIndex) {
        const set = rail.length ? rail : rails[railIndex === 0 ? 1 : 0];
        return '<div class="rail" data-rail="' + railIndex + '">' + set.map(function (entry) {
          const tile = entry[1];
          const image = safeImage(tile.image);
          return '<article class="tile' + (image ? '' : ' tile-plain') + '" data-awareness-open="' + entry[0] + '" tabindex="0" role="button" '
            + 'aria-label="Read more: ' + esc(tile.title) + '">'
            + (image
              ? '<img src="' + esc(image) + '" alt="' + esc(tile.title) + '" loading="lazy" decoding="async">'
              : '<span class="tile-pattern" aria-hidden="true"></span>')
            + '<span class="tile-open" aria-hidden="true">+</span>'
            + '<div class="tile-copy">'
            + '<small>' + esc(tile.eyebrow || 'Awareness') + '</small>'
            + '<strong>' + esc(tile.title) + '</strong>'
            + (text(tile.stat) ? '<em>' + esc(tile.stat) + '</em>' : '')
            + '</div></article>';
        }).join('') + '</div>';
      }).join('');

      const stage = wrapper.closest('[data-awareness-stage]');
      if (stage) stage.style.setProperty('--tiles', String(Math.max(1, tiles.length)));
    });
  }

  /* -------------------------------------------------- awareness: the rails */
  let railCleanup = null;

  function initAwarenessRails() {
    const stage = $('[data-awareness-stage]');
    if (!stage) return;
    const rails = $$('.rail', stage);
    const progress = $('[data-rail-progress]', stage);
    if (!rails.length) return;

    if (railCleanup) {
      railCleanup();
      railCleanup = null;
    }

    const widths = new Map();
    const isScrollable = function () { return reduceMotion || window.innerWidth <= 760; };

    /* Each rail carries its own set of tiles; copies of the set are appended
       so a full left-to-right sweep always keeps the rail covered. That is
       what makes the tiles drift across the screen while the page scrolls. */
    const build = function () {
      rails.forEach(function (rail) {
        $$('[data-clone]', rail).forEach(function (node) { node.remove(); });
        const originals = $$('.tile', rail);
        if (!originals.length) return;
        const parent = rail.parentElement;
        const gapValue = parseFloat(window.getComputedStyle(rail).columnGap || '') || 16;
        const setWidth = originals.reduce(function (sum, node) { return sum + node.getBoundingClientRect().width; }, 0)
          + gapValue * Math.max(0, originals.length - 1);
        widths.set(rail, setWidth);
        if (setWidth <= 0 || !parent) return;

        let guard = 0;
        while (rail.scrollWidth < parent.clientWidth + setWidth && guard < 8) {
          originals.forEach(function (node) {
            const clone = node.cloneNode(true);
            clone.setAttribute('data-clone', '1');
            clone.setAttribute('aria-hidden', 'true');
            clone.tabIndex = -1;
            rail.appendChild(clone);
          });
          guard += 1;
        }
      });
    };

    const setMode = function () {
      const scrollable = isScrollable();
      rails.forEach(function (rail) {
        rail.classList.toggle('is-scrollable', scrollable);
        if (scrollable) {
          $$('[data-clone]', rail).forEach(function (node) { node.remove(); });
          rail.style.transform = '';
        }
      });
      if (!scrollable) build();
    };

    let frame = 0;
    const update = function () {
      frame = 0;
      if (isScrollable()) return;
      const rect = stage.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      if (distance <= 40) return;
      const value = clamp(-rect.top / distance, 0, 1);
      const eased = value * value * (3 - 2 * value);

      rails.forEach(function (rail, index) {
        const setWidth = widths.get(rail) || 0;
        if (setWidth <= 0) return;
        const lag = index % 2 === 0 ? 1 : 0.62;
        rail.style.transform = 'translate3d(' + (-setWidth * (1 - eased) * lag).toFixed(1) + 'px,0,0)';
      });

      if (progress) progress.style.width = (value * 100).toFixed(1) + '%';
    };

    const request = function () { if (!frame) frame = window.requestAnimationFrame(update); };
    const onResize = function () { setMode(); request(); };

    /* Delegated, so the generated copies open the very same note. */
    const openNote = function (node) {
      const list = (state.awareness || []).slice().sort(byOrder).map(function (tile) {
        return {
          image: tile.image,
          caption: text(tile.title),
          alt: text(tile.title),
          fact: text(tile.stat),
          body: text(tile.body),
          takeaway: text(tile.takeaway),
          source: text(tile.source),
        };
      });
      const index = Number(node.getAttribute('data-awareness-open')) || 0;
      if (list.length) lightboxOpen(list, index);
    };
    const onClick = function (event) {
      const node = event.target.closest('[data-awareness-open]');
      if (node && stage.contains(node)) openNote(node);
    };
    const onKeydown = function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const node = event.target.closest('[data-awareness-open]');
      if (!node || !stage.contains(node)) return;
      event.preventDefault();
      openNote(node);
    };

    stage.addEventListener('click', onClick);
    stage.addEventListener('keydown', onKeydown);
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', onResize);
    railCleanup = function () {
      stage.removeEventListener('click', onClick);
      stage.removeEventListener('keydown', onKeydown);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', onResize);
    };

    setMode();
    request();
  }

  /* --------------------------------------------------------------- forms */
  function initForms() {
    $$('form[data-form]').forEach(function (form) {
      const status = $('.form-status', form);
      form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const button = $('button[type="submit"]', form);
        const payload = Object.fromEntries(new FormData(form).entries());
        payload.type = form.getAttribute('data-form') || 'membership';

        if (status) {
          status.textContent = 'Sending…';
          status.classList.remove('is-error');
        }
        if (button) button.disabled = true;

        try {
          const response = await fetch('/api/submissions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(payload),
          });
          const result = await response.json().catch(function () { return {}; });
          if (!response.ok) throw new Error(result.error || 'Could not send that just now.');
          form.reset();
          if (status) status.textContent = 'Thank you — the club team has your details and will be in touch ✓';
        } catch (error) {
          if (status) {
            status.textContent = error.message || 'Could not send that just now. Please try again.';
            status.classList.add('is-error');
          }
        } finally {
          if (button) button.disabled = false;
        }
        return undefined;
      });
    });
  }

  /* ---------------------------------------------------------------- live */
  function renderEverything() {
    renderStats();
    renderAwareness();
    renderHistory();
    renderTeam();
    renderEvents();
    renderCalendar();
    renderGalleryFilters();
    renderGallery();
    renderGalleryPreview();
    initAwarenessRails();
    setupReveals();
  }

  async function poll() {
    const revision = Number(state.revision || 0);
    try {
      const response = await fetch('/api/site?since=' + revision, { headers: { Accept: 'application/json' } });
      if (!response.ok) return;
      const data = await response.json();
      if (!data || data.unchanged) return;
      state = Object.assign(state, data);
      renderEverything();
    } catch (error) {
      /* offline or the server restarted — the page keeps its content */
    }
  }

  function init() {
    initHeader();
    initScrollProgress();
    initAwarenessTab();
    initLightbox();
    initGalleryToolbar();
    initForms();
    renderEverything();

    document.addEventListener('visibilitychange', function () { if (!document.hidden) poll(); });
    window.setInterval(function () { if (!document.hidden) poll(); }, 20000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
