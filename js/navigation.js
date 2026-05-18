/* ============================================================
   AVA — navigation.js
   Sticky header behaviour, mobile drawer, dropdowns, a11y
   En-tête sticky, tiroir mobile, dropdowns, accessibilité clavier
   ============================================================ */
(function (window, document) {
  'use strict';

  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    function update() {
      const y = window.scrollY || window.pageYOffset;
      header.classList.toggle('is-scrolled', y > 100);
      lastScroll = y;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  function initMobileDrawer() {
    const trigger = document.querySelector('[data-mobile-toggle]');
    const drawer = document.querySelector('[data-mobile-drawer]');
    const backdrop = document.querySelector('[data-mobile-backdrop]');
    const closers = document.querySelectorAll('[data-mobile-close]');

    if (!trigger || !drawer || !backdrop) return;

    let lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('aria-modal', 'true');
      trigger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      // Move focus inside the drawer
      const focusable = drawer.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
      const firstLink = focusable[0];
      const lastLink = focusable[focusable.length - 1];
      if (firstLink) firstLink.focus();

      // Trap focus inside drawer
      function handleKey(e) {
        if (e.key !== 'Tab') return;
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        if (e.shiftKey) {
          if (document.activeElement === firstLink) {
            e.preventDefault();
            lastLink.focus();
          }
        } else {
          if (document.activeElement === lastLink) {
            e.preventDefault();
            firstLink.focus();
          }
        }
      }
      drawer.__focusHandler = handleKey;
      document.addEventListener('keydown', handleKey);
    }

    function close() {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.removeAttribute('role');
      drawer.removeAttribute('aria-modal');
      trigger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
      if (drawer.__focusHandler) {
        document.removeEventListener('keydown', drawer.__focusHandler);
        delete drawer.__focusHandler;
      }
    }

    trigger.addEventListener('click', function () {
      const open_ = drawer.classList.contains('is-open');
      open_ ? close() : open();
    });

    backdrop.addEventListener('click', close);
    closers.forEach(function (el) { el.addEventListener('click', close); });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });

    // Close drawer if the viewport grows past the mobile breakpoint
    const mq = window.matchMedia('(min-width: 1024px)');
    function onMQ(ev) {
      if (ev.matches && drawer.classList.contains('is-open')) close();
    }
    if (mq.addEventListener) mq.addEventListener('change', onMQ);
    else if (mq.addListener) mq.addListener(onMQ);
  }

  /**
   * Highlight the current page in the nav.
   */
  function markActiveLink() {
    const path = window.location.pathname.replace(/\/$/, '');
    const filename = path.split('/').pop() || 'index';
    const slug = filename.replace('.html', '') || 'index';

    document.querySelectorAll('[data-nav-key]').forEach(function (link) {
      const key = link.getAttribute('data-nav-key');
      if (key === slug || (slug === 'index' && key === 'home')) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /**
   * Enhance dropdown accessibility by managing aria-expanded.
   */
  function initDropdownA11y() {
    document.querySelectorAll('.dropdown').forEach(function (drop) {
      const btn = drop.querySelector('button[aria-haspopup="true"]');
      const menu = drop.querySelector('.dropdown-menu');
      if (!btn) return;
      btn.setAttribute('aria-expanded', 'false');

      // Ensure menu has an id and button references it for assistive tech
      if (menu) {
        if (!menu.id) menu.id = 'dropdown-menu-' + Math.random().toString(36).slice(2, 9);
        btn.setAttribute('aria-controls', menu.id);
        menu.setAttribute('role', 'menu');
        menu.setAttribute('tabindex', '-1');
      }

      btn.addEventListener('click', function () {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
      });

      btn.addEventListener('focus', function () { btn.setAttribute('aria-expanded', 'true'); });
      btn.addEventListener('blur', function () {
        setTimeout(function () {
          if (!drop.contains(document.activeElement)) btn.setAttribute('aria-expanded', 'false');
        }, 120);
      });

      drop.addEventListener('mouseenter', function () { btn.setAttribute('aria-expanded', 'true'); });
      drop.addEventListener('mouseleave', function () { btn.setAttribute('aria-expanded', 'false'); });
    });
  }

  function init() {
    initStickyHeader();
    initMobileDrawer();
    markActiveLink();
    initDropdownA11y();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document);
