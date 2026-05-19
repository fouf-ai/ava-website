<?php
require_once __DIR__ . '/src/config.php';
require_once __DIR__ . '/src/helpers.php';

$stats = getStats($pdo);

$stat1 = statVal($stats, 'students_trained', 23);
$stat2 = statVal($stats, 'cohort_year',      2026);
$stat3 = statVal($stats, 'countries',        4);

$title       = 'African Visionaries Alliance — Bourses et opportunités pour la jeunesse africaine';
$description = 'AVA équipe les étudiants et jeunes professionnels africains pour accéder aux bourses, fellowships et opportunités internationales. Coaching personnalisé, e-learning, catalogue panafricain.';
$canonical   = 'https://africanvisionaries.org/';
?>
<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <?php require __DIR__ . '/views/partials/head.php'; ?>
</head>

<body class="font-body text-ava-ink antialiased bg-ava-paper">

<?php require __DIR__ . '/views/partials/header.php'; ?>

  <!-- =================== MAIN =================== -->
  <main id="main-content">

    <!-- HERO -->
    <section class="hero-bg" aria-label="Accueil — African Visionaries Alliance">
      <div class="container-ava py-16 md:py-24 lg:py-32 relative z-10">
        <div class="max-w-3xl">
          <p class="eyebrow mb-5"><span>African Visionaries Alliance</span></p>
          <h1 class="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-balance mb-6" style="color: var(--ava-green-dark); line-height: 1.05;">
            <span data-i18n="hero.tagline">Voir plus loin. Agir plus vite. Bâtir l'Afrique.</span>
          </h1>
          <p class="text-lg md:text-xl leading-relaxed text-ava-ink text-pretty mb-8 max-w-2xl" data-i18n="hero.subtitle">
            L'African Visionaries Alliance dote les étudiants et jeunes professionnels africains des connaissances, de l'accompagnement et des connexions nécessaires pour accéder aux opportunités internationales d'éducation, de bourse et d'emploi — et pour transformer ces opportunités en mobilité professionnelle mesurable.
          </p>
          <div class="flex flex-wrap gap-3">
            <a href="about#pathways" class="btn btn-primary">
              <i data-lucide="graduation-cap" aria-hidden="true" style="width:18px;height:18px;"></i>
              <span data-i18n="hero.ctaPrimary">Postuler à AVA Pathways</span>
            </a>
            <a href="opportunities" class="btn btn-outline">
              <span data-i18n="hero.ctaSecondary">Explorer les Opportunités</span>
              <i data-lucide="arrow-right" aria-hidden="true" style="width:18px;height:18px;"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- FOUR PILLARS -->
    <section class="py-16 md:py-24" style="background: var(--ava-paper);">
      <div class="container-ava">
        <div class="mb-12 reveal">
          <p class="eyebrow mb-4"><span>Programmes</span></p>
          <h2 class="section-heading" data-i18n="pillars.heading">Nos quatre piliers</h2>
          <p class="section-subheading" data-i18n="pillars.subheading">Trois programmes ciblés. Un engagement de jeunesse. Aucune dispersion.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <article class="card card-hover pillar-card reveal">
            <div class="pillar-icon"><i data-lucide="graduation-cap" aria-hidden="true"></i></div>
            <h3 class="font-heading text-xl mb-2" data-i18n="pillars.pathways.title">AVA Pathways</h3>
            <p class="text-sm leading-relaxed" style="color: var(--ava-grey);" data-i18n="pillars.pathways.description">Coaching de candidature personnalisé, en 1-on-1, pour étudiants et jeunes professionnels africains visant des bourses et programmes internationaux.</p>
          </article>

          <article class="card card-hover pillar-card reveal">
            <div class="pillar-icon"><i data-lucide="book-open" aria-hidden="true"></i></div>
            <h3 class="font-heading text-xl mb-2" data-i18n="pillars.academy.title">AVA Academy</h3>
            <p class="text-sm leading-relaxed" style="color: var(--ava-grey);" data-i18n="pillars.academy.description">Plateforme d'e-learning certifié sur les compétences de candidature : rédaction d'essais, lettres de motivation, préparation aux entretiens.</p>
          </article>

          <article class="card card-hover pillar-card reveal">
            <div class="pillar-icon"><i data-lucide="globe" aria-hidden="true"></i></div>
            <h3 class="font-heading text-xl mb-2" data-i18n="pillars.hub.title">AVA Opportunity Hub</h3>
            <p class="text-sm leading-relaxed" style="color: var(--ava-grey);" data-i18n="pillars.hub.description">Catalogue multilingue (FR/EN/AR) de bourses, fellowships, stages et emplois ouverts à la jeunesse africaine.</p>
          </article>

          <article class="card card-hover pillar-card reveal">
            <div class="pillar-icon"><i data-lucide="heart-handshake" aria-hidden="true"></i></div>
            <h3 class="font-heading text-xl mb-2" data-i18n="pillars.emergencies.title">Réponses aux Urgences Sociales</h3>
            <p class="text-sm leading-relaxed" style="color: var(--ava-grey);" data-i18n="pillars.emergencies.description">Mobilisation jeunesse et coordination régionale dans les cinq régions d'Afrique.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- IMPACT — dynamic from DB -->
    <section class="py-16 md:py-24" style="background: var(--ava-mist);">
      <div class="container-ava">
        <div class="mb-10 text-center reveal">
          <p class="eyebrow mb-4 justify-center" style="display:inline-flex;"><span>Année 0 · 2026</span></p>
          <h2 class="section-heading" data-i18n="impact.heading">Notre point de départ</h2>
          <p class="section-subheading mx-auto" data-i18n="impact.subheading">Année 0. Les chiffres sont petits. Ils sont vrais.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          <div class="card stat-card reveal">
            <div class="stat-value"><?= e((string) $stat1) ?></div>
            <div class="stat-label" data-i18n="impact.stat1Label">étudiants accompagnés à ce jour</div>
          </div>
          <div class="card stat-card reveal">
            <div class="stat-value"><?= e((string) $stat2) ?></div>
            <div class="stat-label" data-i18n="impact.stat2Label">première cohorte formelle</div>
          </div>
          <div class="card stat-card reveal">
            <div class="stat-value"><?= e((string) $stat3) ?></div>
            <div class="stat-label" data-i18n="impact.stat3Label">régions africaines couvertes</div>
          </div>
        </div>

        <p class="mt-8 text-center text-sm max-w-2xl mx-auto leading-relaxed" style="color: var(--ava-grey);" data-i18n="impact.note">
          Nous ne gonflons pas les chiffres. À mesure que les cohortes avancent, nous publierons ici des résultats mesurables et vérifiables.
        </p>
      </div>
    </section>

    <!-- FOUNDER NOTE -->
    <section class="py-16 md:py-24">
      <div class="container-ava">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div class="md:col-span-4 reveal">
            <div class="team-photo aspect-square rounded-2xl overflow-hidden" style="background: linear-gradient(135deg, var(--ava-green-dark), var(--ava-green-light));">
              <img src="assets/images/team/president.jpg" alt="Portrait de Jean-Lucien Fouf-Kagna Grebaye, Président &amp; Fondateur de l'African Visionaries Alliance" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'">
            </div>
          </div>
          <div class="md:col-span-8 reveal">
            <p class="eyebrow mb-4"><span data-i18n="founder.heading">Mot du Fondateur</span></p>
            <blockquote class="font-heading text-2xl md:text-3xl leading-snug text-balance mb-6" style="color: var(--ava-green-dark);">
              <span data-i18n="founder.text">« AVA est née d'une conviction simple : trop de jeunes Africains brillants passent à côté d'opportunités internationales par manque d'information, d'accompagnement ou de réseau — pas par manque de talent. Nous construisons ce qui nous a manqué. »</span>
            </blockquote>
            <div class="flex flex-col gap-1">
              <p class="font-semibold" data-i18n="founder.name">Jean-Lucien Fouf-Kagna Grebaye</p>
              <p class="text-sm" style="color: var(--ava-grey);" data-i18n="founder.role">Président & Fondateur</p>
            </div>
            <a href="about" class="btn btn-outline mt-6">
              <span data-i18n="founder.cta">En savoir plus sur AVA</span>
              <i data-lucide="arrow-right" aria-hidden="true" style="width:16px;height:16px;"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER -->
    <section class="py-16 md:py-20" style="background: var(--ava-green-dark); color: #fff;">
      <div class="container-ava">
        <div class="max-w-2xl mx-auto text-center reveal">
          <h2 class="font-heading text-3xl md:text-4xl mb-3" style="color: #fff;" data-i18n="newsletter.heading">Restez informés</h2>
          <p class="text-base mb-8" style="color: rgba(255,255,255,0.85);" data-i18n="newsletter.subheading">Une lettre mensuelle. Pas de spam. Désinscription en un clic.</p>
          <form id="newsletter-form" class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" novalidate>
            <label for="newsletter-email" class="sr-only" data-i18n="newsletter.emailLabel">Adresse e-mail</label>
            <input id="newsletter-email" type="email" required class="field flex-1" placeholder="votre.email@exemple.com" data-i18n="newsletter.placeholder" data-i18n-attr="placeholder">
            <button type="submit" class="btn btn-gold" data-i18n="newsletter.button">S'abonner</button>
          </form>
          <p id="newsletter-status" class="mt-4 text-sm hidden" style="color: #fff;" role="status"></p>
          <p class="mt-4 text-xs" style="color: rgba(255,255,255,0.65);" data-i18n="newsletter.consent">En vous abonnant, vous acceptez de recevoir nos communications.</p>
        </div>
      </div>
    </section>

  </main>

<?php require __DIR__ . '/views/partials/footer.php'; ?>

</body>
</html>
