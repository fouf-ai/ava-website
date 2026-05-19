  <!-- =================== FOOTER =================== -->
  <footer class="site-footer pt-16 pb-8">
    <div class="container-ava">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <img src="assets/images/logo/logo-ava.png" alt="Logo — African Visionaries Alliance" width="36" height="36" onerror="this.style.display='none'">
            <span class="font-heading text-xl font-semibold text-white">AVA</span>
          </div>
          <p class="text-sm leading-relaxed mb-4" data-i18n="footer.tagline">Bourses et opportunités pour la jeunesse africaine.</p>
          <p class="text-xs" style="color: rgba(255,255,255,0.55);" data-i18n="footer.registration">Enregistrement en cours · Ordonnance n° 66/024 (RCA)</p>
        </div>

        <div>
          <h3 data-i18n="footer.navHeading">Navigation</h3>
          <ul class="flex flex-col gap-2 text-sm">
            <li><a href="index" data-i18n="nav.home">Accueil</a></li>
            <li><a href="about" data-i18n="nav.about">À Propos</a></li>
            <li><a href="team" data-i18n="nav.team">Équipe</a></li>
            <li><a href="opportunities" data-i18n="nav.opportunities">Opportunités</a></li>
            <li><a href="documents" data-i18n="nav.documents">Documents</a></li>
          </ul>
        </div>

        <div>
          <h3 data-i18n="footer.programsHeading">Programmes</h3>
          <ul class="flex flex-col gap-2 text-sm">
            <li><a href="about#pathways" data-i18n="nav.pathways">AVA Pathways</a></li>
            <li><a href="about#academy" data-i18n="nav.academy">AVA Academy</a></li>
            <li><a href="opportunities" data-i18n="nav.hub">Opportunity Hub</a></li>
          </ul>
        </div>

        <div>
          <h3 data-i18n="footer.contactHeading">Contact</h3>
          <ul class="flex flex-col gap-3 text-sm">
            <li class="flex items-start gap-2">
              <i data-lucide="map-pin" aria-hidden="true" style="width:16px;height:16px;flex-shrink:0;margin-top:2px;"></i>
              <span>
                <span data-i18n="footer.address">Av. Barthelemy Boganda</span><br>
                <span data-i18n="footer.city">Bangui, Central African Republic</span>
              </span>
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="mail" aria-hidden="true" style="width:16px;height:16px;flex-shrink:0;"></i>
              <a href="mailto:contact@africanvisionaries.org" data-i18n="footer.email">contact@africanvisionaries.org</a>
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="phone" aria-hidden="true" style="width:16px;height:16px;flex-shrink:0;"></i>
              <a href="tel:+23672545121" data-i18n="footer.phone">+236 72 54 51 21</a>
            </li>
          </ul>
          <div class="flex items-center gap-3 mt-4">
            <a href="#" aria-label="LinkedIn"><i data-lucide="linkedin" aria-hidden="true" style="width:20px;height:20px;"></i></a>
            <a href="#" aria-label="X / Twitter"><i data-lucide="twitter" aria-hidden="true" style="width:20px;height:20px;"></i></a>
            <a href="#" aria-label="Instagram"><i data-lucide="instagram" aria-hidden="true" style="width:20px;height:20px;"></i></a>
          </div>
        </div>
      </div>

      <div class="footer-bottom pt-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        <p>© <span id="footer-year"><?= date('Y') ?></span> <span data-i18n="footer.copyright">African Visionaries Alliance. Tous droits réservés.</span></p>
        <div class="flex gap-4">
          <a href="documents" data-i18n="footer.legal">Mentions légales</a>
          <a href="documents" data-i18n="footer.privacy">Politique de confidentialité</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest" defer></script>

  <!-- AVA scripts -->
  <script src="js/i18n.js" defer></script>
  <script src="js/utils.js" defer></script>
  <script src="js/navigation.js" defer></script>
  <script src="js/app.js" defer></script>
