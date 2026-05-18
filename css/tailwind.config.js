/**
 * Tailwind CSS Configuration — AVA Website
 * ----------------------------------------
 * This config is applied at runtime via the Tailwind CDN <script> tag
 * inline in every HTML page. This file is kept for reference, for
 * developers who later wish to migrate to a built (postcss/cli) pipeline.
 *
 * Brand tokens come from the AVA logo palette (see section 5 of the spec).
 *
 * Configuration Tailwind CSS — Site AVA
 * Les tokens proviennent de la palette du logo AVA. Ce fichier est appliqué
 * via le CDN Tailwind inline dans chaque page HTML.
 */

module.exports = {
  content: ['./*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        'ava-green-dark':  '#035a42', // Vert profond Afrique — primary
        'ava-green-light': '#19ab90', // Vert turquoise — secondary, hover
        'ava-gold':        '#fea61b', // Or — CTAs, accents
        'ava-red':         '#e72931', // Rouge brique — alerts
        'ava-brown':       '#492412', // Brun silhouette — borders
        'ava-ink':         '#1f2937', // Anthracite — body text
        'ava-grey':        '#6b7280', // Gris — secondary text
        'ava-mist':        '#f5f5f5', // Très clair — section backgrounds
        'ava-paper':       '#ffffff', // Blanc — main background
        'ava-line':        '#e5e7eb', // Bordure — dividers
      },
      fontFamily: {
        heading: ['Fraunces', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        'content': '1200px',
        'prose-ava': '68ch',
      },
      boxShadow: {
        'ava-card':       '0 1px 3px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.03)',
        'ava-card-hover': '0 10px 25px rgba(3, 90, 66, 0.10), 0 6px 10px rgba(3, 90, 66, 0.04)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
