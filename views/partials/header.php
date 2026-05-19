  <!-- Skip link -->
  <a href="#main-content" class="skip-link" data-i18n="nav.skipToContent">Aller au contenu principal</a>

  <!-- =================== HEADER =================== -->
  <header class="site-header">
    <div class="container-ava flex items-center justify-between py-4">
      <!-- Logo -->
      <a href="index" class="logo flex items-center gap-2" aria-label="African Visionaries Alliance — Accueil">
        <img src="assets/images/logo/logo-ava.png" alt="Logo — African Visionaries Alliance" width="36" height="36" onerror="this.style.display='none'">
        <span>AVA</span>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden lg:flex items-center gap-7" aria-label="Navigation principale">
        <a href="index" class="nav-link" data-nav-key="home" data-i18n="nav.home">Accueil</a>
        <a href="about" class="nav-link" data-nav-key="about" data-i18n="nav.about">À Propos</a>
        <div class="dropdown">
          <button type="button" class="nav-link inline-flex items-center gap-1" aria-haspopup="true" aria-expanded="false">
            <span data-i18n="nav.programs">Nos Programmes</span>
            <i data-lucide="chevron-down" style="width:14px;height:14px;" aria-hidden="true"></i>
          </button>
          <div class="dropdown-menu" role="menu">
            <a href="about#pathways" role="menuitem" data-i18n="nav.pathways">AVA Pathways</a>
            <a href="about#academy" role="menuitem" data-i18n="nav.academy">AVA Academy</a>
            <a href="opportunities" role="menuitem" data-i18n="nav.hub">Opportunity Hub</a>
          </div>
        </div>
        <a href="opportunities" class="nav-link" data-nav-key="opportunities" data-i18n="nav.opportunities">Opportunités</a>
        <a href="team" class="nav-link" data-nav-key="team" data-i18n="nav.team">Équipe</a>
        <a href="documents" class="nav-link" data-nav-key="documents" data-i18n="nav.documents">Documents</a>
      </nav>

      <!-- Right cluster -->
      <div class="flex items-center gap-3">
        <div class="lang-switch" role="group" aria-label="Language switcher">
          <button type="button" data-lang-switch="fr" aria-pressed="true">FR</button>
          <button type="button" data-lang-switch="en" aria-pressed="false">EN</button>
          <button type="button" data-lang-switch="ar" aria-pressed="false">AR</button>
        </div>

        <button type="button" class="lg:hidden p-2 rounded-md hover:bg-ava-mist" data-mobile-toggle aria-expanded="false" aria-controls="mobile-drawer" aria-label="Menu">
          <i data-lucide="menu" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- =================== MOBILE DRAWER =================== -->
  <div class="mobile-backdrop" data-mobile-backdrop aria-hidden="true"></div>
  <aside id="mobile-drawer" class="mobile-drawer" data-mobile-drawer aria-hidden="true" aria-label="Menu mobile">
    <div class="flex items-center justify-between mb-6">
      <span class="font-heading font-semibold text-ava-green-dark text-lg">AVA</span>
      <button type="button" class="p-2 rounded-md hover:bg-ava-mist" data-mobile-close aria-label="Fermer">
        <i data-lucide="x" aria-hidden="true"></i>
      </button>
    </div>
    <nav class="flex flex-col gap-1" aria-label="Navigation mobile">
      <a href="index" class="nav-link py-2.5" data-nav-key="home" data-i18n="nav.home">Accueil</a>
      <a href="about" class="nav-link py-2.5" data-nav-key="about" data-i18n="nav.about">À Propos</a>
      <a href="opportunities" class="nav-link py-2.5" data-nav-key="opportunities" data-i18n="nav.opportunities">Opportunités</a>
      <a href="team" class="nav-link py-2.5" data-nav-key="team" data-i18n="nav.team">Équipe</a>
      <a href="documents" class="nav-link py-2.5" data-nav-key="documents" data-i18n="nav.documents">Documents</a>
    </nav>
    <div class="mt-8 pt-6 border-t border-ava-line">
      <p class="text-xs font-semibold uppercase tracking-wider text-ava-grey mb-3" data-i18n="nav.programs">Nos Programmes</p>
      <a href="about#pathways" class="nav-link py-2 block" data-i18n="nav.pathways">AVA Pathways</a>
      <a href="about#academy" class="nav-link py-2 block" data-i18n="nav.academy">AVA Academy</a>
      <a href="opportunities" class="nav-link py-2 block" data-i18n="nav.hub">Opportunity Hub</a>
    </div>
  </aside>
