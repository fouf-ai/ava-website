/* ============================================================
   AVA — filters.js
   Catalogue d'opportunités : rendu, filtres, recherche
   Opportunity Hub: rendering, filtering, deadline countdown
   ============================================================ */
(function (window, document) {
  'use strict';

  const STATE = {
    opportunities: [],
    filters: { type: 'all', region: 'all', level: 'all', language: 'all', funding: 'all' }
  };

  function getLang() {
    return (window.AVA && window.AVA.i18n && window.AVA.i18n.getLang()) || 'fr';
  }
  function t(key) {
    return window.AVA && window.AVA.i18n ? window.AVA.i18n.t(key) : key;
  }

  /**
   * Pull the title/description for the current language, falling back to English.
   */
  function localized(opp, baseField) {
    const lang = getLang();
    const suffix = lang === 'fr' ? 'Fr' : lang === 'ar' ? 'Ar' : '';
    if (suffix && opp[baseField + suffix]) return opp[baseField + suffix];
    return opp[baseField] || '';
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Decide which CSS class + label to use for a deadline.
   */
  function deadlineMeta(deadline) {
    const left = window.AVA.utils.daysUntil(deadline);
    if (left === null) return { text: '', cls: 'badge-deadline', expired: false };
    if (left < 0) {
      return { text: t('opportunities.expired'), cls: 'badge-expired', expired: true };
    }
    if (left <= 60) {
      return {
        text: left + ' ' + t('opportunities.daysLeft'),
        cls: 'badge-deadline',
        expired: false
      };
    }
    return {
      text: window.AVA.utils.formatDate(deadline, getLang()),
      cls: 'badge-deadline',
      expired: false
    };
  }

  /**
   * Render the full grid of opportunity cards.
   */
  function renderGrid() {
    const grid = document.getElementById('opportunities-grid');
    const countEl = document.getElementById('opportunities-count');
    const emptyEl = document.getElementById('opportunities-empty');
    if (!grid) return;

    const f = STATE.filters;
    const list = STATE.opportunities.filter(function (o) {
      if (f.type !== 'all' && o.type !== f.type) return false;
      if (f.region !== 'all' && o.region !== f.region) return false;
      if (f.level !== 'all' && o.level !== f.level) return false;
      if (f.language !== 'all' && !(o.language || []).includes(f.language)) return false;
      if (f.funding !== 'all' && o.funding !== f.funding) return false;
      return true;
    });

    countEl && (countEl.textContent = list.length + ' ' + t('opportunities.resultsCount'));

    if (!list.length) {
      grid.innerHTML = '';
      emptyEl && (emptyEl.hidden = false);
      return;
    }
    emptyEl && (emptyEl.hidden = true);

    grid.innerHTML = list.map(function (o) {
      const title = escapeHtml(localized(o, 'title'));
      const desc = escapeHtml(localized(o, 'description'));
      const org = escapeHtml(o.organization || '');
      const deadline = deadlineMeta(o.deadline);
      const typeLabel = t('opportunities.types.' + o.type) || o.type;
      const regionLabel = t('opportunities.regions.' + o.region) || o.region;
      const levelLabel = t('opportunities.levels.' + o.level) || o.level;
      const fundingLabel = t('opportunities.funding.' + o.funding) || o.funding;

      const langBadges = (o.language || []).map(function (l) {
        return '<span class="badge badge-language">' + escapeHtml(t('opportunities.languages.' + l) || l) + '</span>';
      }).join('');

      return [
        '<article class="card card-hover flex flex-col gap-4 reveal is-visible" data-opp-id="', escapeHtml(o.id), '">',
        '  <div class="flex flex-wrap gap-2">',
        '    <span class="badge badge-type">', escapeHtml(typeLabel), '</span>',
        '    <span class="badge badge-region">', escapeHtml(regionLabel), '</span>',
        '    <span class="badge badge-level">', escapeHtml(levelLabel), '</span>',
        '    <span class="badge badge-funding">', escapeHtml(fundingLabel), '</span>',
        '  </div>',
        '  <h3 class="font-heading text-xl leading-snug">', title, '</h3>',
        '  <p class="text-sm font-medium text-ava-grey">', org, '</p>',
        '  <p class="text-sm text-ava-ink leading-relaxed">', desc, '</p>',
        '  <div class="flex flex-wrap gap-2 items-center">',
              langBadges,
        '    <span class="badge ', deadline.cls, '">', escapeHtml(deadline.text), '</span>',
        '  </div>',
        '  <div class="mt-auto flex flex-wrap gap-3 pt-2 border-t border-ava-line">',
        '    <a class="btn btn-outline text-sm" href="', escapeHtml(o.link), '" target="_blank" rel="noopener noreferrer">',
        '      ', escapeHtml(t('opportunities.learnMore')),
        '    </a>',
        '    <a class="btn btn-ghost text-sm" href="about" data-i18n-static>',
        '      ', escapeHtml(t('opportunities.getCoached')),
        '    </a>',
        '  </div>',
        '</article>'
      ].join('');
    }).join('');
  }

  /**
   * Update visual state of filter chips.
   */
  function updateChipsState() {
    document.querySelectorAll('[data-filter-group]').forEach(function (group) {
      const key = group.getAttribute('data-filter-group');
      const value = STATE.filters[key];
      group.querySelectorAll('[data-filter-value]').forEach(function (chip) {
        chip.classList.toggle('is-active', chip.getAttribute('data-filter-value') === value);
        chip.setAttribute('aria-pressed', String(chip.getAttribute('data-filter-value') === value));
      });
    });
  }

  function resetFilters() {
    STATE.filters = { type: 'all', region: 'all', level: 'all', language: 'all', funding: 'all' };
    updateChipsState();
    renderGrid();
  }

  function bindEvents() {
    document.addEventListener('click', function (e) {
      const chip = e.target.closest('[data-filter-value]');
      if (chip) {
        const group = chip.closest('[data-filter-group]');
        if (!group) return;
        const key = group.getAttribute('data-filter-group');
        const value = chip.getAttribute('data-filter-value');
        STATE.filters[key] = value;
        updateChipsState();
        renderGrid();
        return;
      }

      const reset = e.target.closest('[data-filter-reset]');
      if (reset) {
        e.preventDefault();
        resetFilters();
      }
    });

    document.addEventListener('ava:lang-changed', function () {
      renderGrid();
    });
  }

  function init() {
    const grid = document.getElementById('opportunities-grid');
    if (!grid) return; // not on the opportunities page

    fetch('data/opportunities.json', { cache: 'no-cache' })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        STATE.opportunities = Array.isArray(data) ? data : [];
        // Wait briefly for i18n to be ready, then render
        if (window.AVA && window.AVA.i18n && window.AVA.i18n.t('opportunities.heading') !== 'opportunities.heading') {
          renderGrid();
        } else {
          document.addEventListener('ava:lang-changed', renderGrid, { once: true });
          // Render anyway after a short timeout in case translations resolve later
          setTimeout(renderGrid, 250);
        }
        bindEvents();
        updateChipsState();
      })
      .catch(function (err) { console.error('AVA filters: opportunities.json failed', err); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document);
