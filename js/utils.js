/* ============================================================
   AVA — utils.js
   Scroll reveal, image fade-in, helpers
   Apparitions au scroll, fondus d'images, helpers divers
   ============================================================ */
(function (window, document) {
  'use strict';

  /**
   * Reveal elements with the .reveal class as they enter the viewport.
   */
  function initScrollReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { io.observe(el); });
  }

  /**
   * Mark lazy-loaded images as loaded for the fade-in effect.
   */
  function initLazyImages() {
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    imgs.forEach(function (img) {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('is-loaded');
      } else {
        img.addEventListener('load', function () { img.classList.add('is-loaded'); }, { once: true });
        img.addEventListener('error', function () { img.classList.add('is-loaded'); }, { once: true });
      }
    });
  }

  /**
   * Generic helper: format a date for the user's current language.
   */
  function formatDate(isoDate, lang) {
    if (!isoDate) return '';
    const d = new Date(isoDate);
    if (isNaN(d)) return isoDate;
    const localeMap = { fr: 'fr-FR', en: 'en-GB', ar: 'ar-EG' };
    try {
      return new Intl.DateTimeFormat(localeMap[lang] || 'fr-FR', {
        day: '2-digit', month: 'long', year: 'numeric'
      }).format(d);
    } catch (e) {
      return isoDate;
    }
  }

  /**
   * Days remaining between today (UTC midnight) and a deadline date.
   * Returns a negative number when the deadline is in the past.
   */
  function daysUntil(isoDate) {
    if (!isoDate) return null;
    const target = new Date(isoDate);
    if (isNaN(target)) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    return Math.round((target - today) / (1000 * 60 * 60 * 24));
  }

  function init() {
    initScrollReveal();
    initLazyImages();
  }

  // Public API
  window.AVA = window.AVA || {};
  window.AVA.utils = {
    formatDate: formatDate,
    daysUntil: daysUntil,
    initScrollReveal: initScrollReveal,
    initLazyImages: initLazyImages
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document);
