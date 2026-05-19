<?php
// Variables expected: $title, $description, $canonical (optional)
$canonical = $canonical ?? 'https://africanvisionaries.org/';
?>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#035a42">

<title><?= e($title) ?></title>
<meta name="description" content="<?= e($description) ?>">

<link rel="canonical" href="<?= e($canonical) ?>">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="African Visionaries Alliance">
<meta property="og:title" content="<?= e($title) ?>">
<meta property="og:description" content="<?= e($description) ?>">
<meta property="og:url" content="<?= e($canonical) ?>">
<meta property="og:image" content="https://africanvisionaries.org/assets/images/logo/logo-ava.png">
<meta property="og:locale" content="fr_FR">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?= e($title) ?>">
<meta name="twitter:description" content="<?= e($description) ?>">
<meta name="twitter:image" content="https://africanvisionaries.org/assets/images/logo/logo-ava.png">

<!-- Favicon -->
<link rel="icon" type="image/png" href="assets/images/logo/favicon.ico">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Tailwind CDN + config -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          'ava-green-dark':  '#035a42',
          'ava-green-light': '#19ab90',
          'ava-gold':        '#fea61b',
          'ava-red':         '#e72931',
          'ava-brown':       '#492412',
          'ava-ink':         '#1f2937',
          'ava-grey':        '#6b7280',
          'ava-mist':        '#f5f5f5',
          'ava-paper':       '#ffffff',
          'ava-line':        '#e5e7eb',
        },
        fontFamily: {
          heading: ['Fraunces', 'Georgia', 'serif'],
          body:    ['Inter', 'system-ui', 'sans-serif'],
        },
        maxWidth: { 'content': '1200px' }
      }
    }
  };
</script>

<!-- Custom CSS -->
<link rel="stylesheet" href="css/main.css">

<!-- JSON-LD : NGO Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "African Visionaries Alliance",
  "alternateName": "AVA",
  "url": "https://africanvisionaries.org",
  "logo": "https://africanvisionaries.org/assets/images/logo/logo-ava.png",
  "description": "Pan-African non-profit organisation providing scholarship navigation, application coaching and certified e-learning for African students and young professionals.",
  "founder": { "@type": "Person", "name": "Jean-Lucien Fouf-Kagna Grebaye" },
  "foundingDate": "2026",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Barthelemy Boganda",
    "addressLocality": "Bangui",
    "addressCountry": "CF"
  },
  "email": "contact@africanvisionaries.org",
  "telephone": "+236 72 54 51 21",
  "areaServed": "Africa",
  "knowsLanguage": ["fr", "en", "ar"]
}
</script>
