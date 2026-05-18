/* ============================================================
   AVA — i18n.js
   Multilingual system (FR / EN / AR) with RTL support
   Système multilingue (FR/EN/AR) avec support RTL pour l'arabe
   ============================================================ */
(function (window, document) {
  'use strict';

  const SUPPORTED = ['fr', 'en', 'ar'];
  const DEFAULT_LANG = 'fr';
  const STORAGE_KEY = 'ava-lang';
  const RTL_LANGS = ['ar'];

  let translations = null;
  let currentLang = DEFAULT_LANG;

  /**
   * Resolve the initial language: stored preference > browser > default.
   */
  function detectLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;

    const browser = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(browser)) return browser;

    return DEFAULT_LANG;
  }

  /**
   * Safely walk a dotted path on an object, e.g. "nav.home" → translations[lang].nav.home
   */
  function getByPath(obj, path) {
    if (!obj) return undefined;
    return path.split('.').reduce(function (acc, part) {
      return acc && acc[part] !== undefined ? acc[part] : undefined;
    }, obj);
  }

  /**
   * Translate one value: returns the string or the input untouched.
   */
  function t(key, lang) {
    lang = lang || currentLang;
    const value = getByPath(translations && translations[lang], key);
    if (value === undefined) {
      // Soft fallback to French, then to the raw key.
      const fr = getByPath(translations && translations.fr, key);
      return fr !== undefined ? fr : key;
    }
    return value;
  }

  /**
   * Apply translations to every element marked with [data-i18n].
   * The data-i18n value is a dot path into translations.<lang>.<...>.
   * Optional data-i18n-attr="placeholder" updates an attribute instead of textContent.
   */
  function applyTranslations() {
    if (!translations) return;

    const html = document.documentElement;
    html.setAttribute('lang', currentLang);
    html.setAttribute('dir', RTL_LANGS.includes(currentLang) ? 'rtl' : 'ltr');

    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(function (node) {
      const key = node.getAttribute('data-i18n');
      const attr = node.getAttribute('data-i18n-attr');
      const value = t(key);

      if (typeof value !== 'string') return;

      if (attr) {
        node.setAttribute(attr, value);
      } else {
        node.textContent = value;
      }
    });

    // Update the visible language switcher
    document.querySelectorAll('[data-lang-switch]').forEach(function (btn) {
      const lang = btn.getAttribute('data-lang-switch');
      btn.classList.toggle('is-active', lang === currentLang);
      btn.setAttribute('aria-pressed', String(lang === currentLang));
    });

    // Update <title> + meta description if data-i18n-title attribute is present on a meta tag
    const titleNode = document.querySelector('title[data-i18n]');
    if (titleNode) {
      const v = t(titleNode.getAttribute('data-i18n'));
      if (typeof v === 'string') document.title = v;
    }

    // Tell the rest of the app the language changed
    document.dispatchEvent(new CustomEvent('ava:lang-changed', { detail: { lang: currentLang } }));
  }

  /**
   * Change the active language and persist the choice.
   */
  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations();
  }

  /**
   * Bootstrap: fetch translations.json, set language, apply.
   */
  function init() {
    currentLang = detectLang();

    fetch('data/translations.json', { cache: 'no-cache' })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        translations = data;
        applyTranslations();
      })
      .catch(function (err) {
        console.error('AVA i18n: unable to load translations.json', err);
      });

    // Wire up language switcher buttons
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-lang-switch]');
      if (!btn) return;
      e.preventDefault();
      setLang(btn.getAttribute('data-lang-switch'));
    });
  }

  // Public API
  window.AVA = window.AVA || {};
  window.AVA.i18n = {
    init: init,
    setLang: setLang,
    getLang: function () { return currentLang; },
    t: t
  };

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document);
