/* ============================================================
   AVA — app.js
   Bootstrap global du site : icônes Lucide, rendu équipe, divers
   Global site bootstrap: Lucide icons, team rendering, etc.
   ============================================================ */
(function (window, document) {
  'use strict';

  /**
   * Render the icon library. Called after every DOM update that
   * inserts new <i data-lucide="..."> placeholders.
   */
  function paintIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /**
   * Build the team grid on team.html and the governance overview on about.html.
   */
  function getLang() {
    return (window.AVA && window.AVA.i18n && window.AVA.i18n.getLang()) || 'fr';
  }
  function t(key) {
    return window.AVA && window.AVA.i18n ? window.AVA.i18n.t(key) : key;
  }
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function localizedRole(member) {
    const lang = getLang();
    if (lang === 'en' && member.roleEn) return member.roleEn;
    if (lang === 'ar' && member.roleAr) return member.roleAr;
    return member.role;
  }
  function localizedBio(member) {
    const lang = getLang();
    if (lang === 'en' && member.bioEn) return member.bioEn;
    if (lang === 'ar' && member.bioAr) return member.bioAr;
    return member.bio;
  }

  /**
   * Compute the placeholder fallback for an empty photo
   * (initials if member is filled, "?" if vacant).
   */
  function photoFallback(member) {
    if (!member.filled || member.name.indexOf('pourvoir') !== -1) return '?';
    return member.name.split(/\s+/).slice(0, 2).map(function (s) {
      return s.charAt(0).toUpperCase();
    }).join('');
  }

  function renderTeam(team) {
    const tiers = [
      { id: 1, container: 'team-tier-1' },
      { id: 2, container: 'team-tier-2' },
      { id: 3, container: 'team-tier-3' },
      { id: 4, container: 'team-tier-4' }
    ];

    tiers.forEach(function (tier) {
      const grid = document.getElementById(tier.container);
      if (!grid) return;
      const members = team.filter(function (m) { return m.tier === tier.id; })
                         .sort(function (a, b) { return a.order - b.order; });

      grid.innerHTML = members.map(function (m) {
        const isFilled = !!m.filled;
        const displayName = isFilled ? m.name : t('team.openPosition');
        const role = localizedRole(m);
        const bio = localizedBio(m);
        const initials = photoFallback(m);
        const hasPhoto = !!m.photo;
        const altText = isFilled
          ? 'Portrait de ' + escapeHtml(m.name) + ', ' + escapeHtml(role)
          : escapeHtml(t('team.openPosition')) + ' — ' + escapeHtml(role);
        const openBadge = !isFilled
          ? '<span class="team-photo-badge" aria-hidden="true">' + escapeHtml(t('team.openPosition')) + '</span>'
          : '';

        return [
          '<article class="team-card card card-hover reveal" data-filled="', isFilled ? 'true' : 'false', '">',
          '  <div class="team-photo">',
                hasPhoto
                  ? '<img src="' + escapeHtml(m.photo) + '" alt="' + altText + '" loading="lazy" onerror="this.style.display=\'none\'; var fb=this.parentNode.querySelector(\'.photo-fallback\'); if(fb){fb.style.display=\'flex\';}">'
                  : '',
          '    <span class="photo-fallback" ', hasPhoto ? 'style="display:none;"' : '', ' aria-hidden="true">', escapeHtml(initials), '</span>',
                openBadge,
          '  </div>',
          '  <h3 class="font-heading text-lg leading-tight mb-1">', escapeHtml(displayName), '</h3>',
          '  <p class="text-sm font-medium text-ava-green-dark mb-2" style="color: var(--ava-green-dark);">', escapeHtml(role), '</p>',
          '  <p class="text-sm text-ava-grey leading-relaxed" style="color: var(--ava-grey);">', escapeHtml(bio), '</p>',
              m.linkedin
                ? '<a class="inline-flex items-center gap-1 mt-3 text-sm font-medium" style="color: var(--ava-green-dark);" href="' + escapeHtml(m.linkedin) + '" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">'
                  + '<i data-lucide="linkedin" aria-hidden="true" style="width:16px;height:16px;"></i><span>LinkedIn</span></a>'
                : '',
          '</article>'
        ].join('');
      }).join('');
    }); // closes tiers.forEach

    paintIcons();
    window.AVA && window.AVA.utils && window.AVA.utils.initScrollReveal();
  } // closes renderTeam

  function initTeamPage() {
    const anchor = document.getElementById('team-tier-1');
    if (!anchor) return;

    fetch('data/team.json', { cache: 'no-cache' })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        const team = Array.isArray(data) ? data : [];

        // Render now, and re-render whenever the language changes.
        const doRender = function () { renderTeam(team); };

        // Render once translations are ready (or immediately as fallback)
        if (window.AVA && window.AVA.i18n && window.AVA.i18n.t('team.openPosition') !== 'team.openPosition') {
          doRender();
        } else {
          setTimeout(doRender, 250);
        }
        document.addEventListener('ava:lang-changed', doRender);
      })
      .catch(function (err) { console.error('AVA app: team.json failed', err); });
  }

  /**
   * Simple newsletter form handler — local feedback only, no backend.
   */
  function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const status = document.getElementById('newsletter-status');
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        if (status) {
          status.textContent = getLang() === 'en'
            ? 'Thank you — we will keep you posted.'
            : getLang() === 'ar' ? 'شكراً — سنبقيك على اطلاع.'
            : 'Merci — nous vous tiendrons informé(e).';
          status.classList.remove('hidden');
        }
        input.value = '';
      }
    });
  }

  function initFooterYear() {
    const y = document.getElementById('footer-year');
    if (y) y.textContent = new Date().getFullYear();
  }

  function init() {
    paintIcons();
    initTeamPage();
    initNewsletterForm();
    initFooterYear();

    // Re-render icons whenever language changes (in case content was re-injected)
    document.addEventListener('ava:lang-changed', paintIcons);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document);
