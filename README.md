# African Visionaries Alliance — Site Web Officiel

**Domaine cible :** https://ava-africa.me
**Hébergement :** Hostinger (shared hosting, Apache)
**Stack :** HTML statique + Tailwind CDN + JavaScript vanille (ES6)
**Langues :** Français (par défaut) / Anglais / Arabe (RTL)

---

## 📋 Table des matières

1. [Aperçu du projet](#aperçu-du-projet)
2. [Structure des fichiers](#structure-des-fichiers)
3. [Déploiement sur Hostinger](#déploiement-sur-hostinger)
4. [Vérifications post-déploiement](#vérifications-post-déploiement)
5. [Modifier le contenu](#modifier-le-contenu)
6. [Système multilingue](#système-multilingue)
7. [Ajouter des opportunités](#ajouter-des-opportunités)
8. [Mettre à jour l'équipe](#mettre-à-jour-léquipe)
9. [Remplacer les images et PDFs](#remplacer-les-images-et-pdfs)
10. [Dépannage](#dépannage)

---

## Aperçu du projet

Site institutionnel statique pour l'African Visionaries Alliance (AVA), organisation panafricaine à but non lucratif basée à Bangui (RCA), enregistrée sous l'Ordonnance n° 66/024 du 21 février 1966.

**Aucune base de données. Aucun back-end. Aucune dépendance Node/PHP/CMS.** Le site est composé exclusivement de fichiers HTML, CSS, JS et JSON ; il fonctionne directement sur tout hébergement Apache ou Nginx avec support `.htaccess` (Apache) ou règles équivalentes.

**Pages :**
- `/` (`index.html`) — Accueil
- `/about` — À propos, mission, gouvernance, mentions légales
- `/opportunities` — Catalogue filtrable des bourses et opportunités
- `/team` — Équipe (15 postes / 4 niveaux)
- `/documents` — Charte, Statuts, Règlement intérieur
- `/404` — Page d'erreur personnalisée

---

## Structure des fichiers

```
ava-website/
├── index.html              # Page d'accueil
├── about.html              # À propos
├── opportunities.html      # Catalogue des opportunités
├── team.html               # Équipe
├── documents.html          # Documents légaux
├── 404.html                # Page d'erreur
├── .htaccess               # Configuration Apache (URLs propres, cache, sécurité)
├── robots.txt              # Directives moteurs de recherche
├── sitemap.xml             # Plan du site
├── README.md               # Ce fichier
│
├── css/
│   ├── main.css            # Styles principaux (variables, composants, RTL)
│   └── tailwind.config.js  # Référence config Tailwind (CDN inline aussi)
│
├── js/
│   ├── i18n.js             # Système multilingue (FR/EN/AR)
│   ├── navigation.js       # En-tête sticky, drawer mobile, dropdowns
│   ├── filters.js          # Filtres dynamiques des opportunités
│   ├── app.js              # Rendu équipe + newsletter + footer year
│   └── utils.js            # Scroll reveal, lazy load
│
├── data/
│   ├── translations.json   # Toutes les traductions FR/EN/AR
│   ├── opportunities.json  # Catalogue des opportunités
│   └── team.json           # Membres de l'équipe (15 postes, 4 niveaux)
│
└── assets/
    ├── images/
    │   ├── logo/           # logo-ava.png, favicon.ico
    │   ├── team/           # 15 photos des membres (placeholders fournis)
    │   └── hero/           # Images de fond hero (optionnel)
    ├── fonts/              # Polices locales (optionnel — Google Fonts via CDN)
    └── documents/          # AVA_Charter.pdf, AVA_Statutes.pdf, AVA_Internal_Regulations.pdf
```

---

## Déploiement sur Hostinger

### Étape 1 — Préparer l'archive

Le ZIP fourni contient le dossier `ava-website/` à la racine. Décompressez-le localement avant l'upload : **vous devez uploader le *contenu* du dossier, pas le dossier lui-même.**

### Étape 2 — Connexion au panneau Hostinger

1. Connectez-vous à [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Sélectionnez votre domaine (ava-africa.me)
3. Ouvrez **« Gestionnaire de fichiers »** (File Manager)
4. Naviguez vers le dossier **`public_html/`**

### Étape 3 — Nettoyer `public_html`

Supprimez tout fichier par défaut existant dans `public_html/` (par ex. `default.php`, `index.html` de bienvenue Hostinger).

### Étape 4 — Uploader les fichiers

**Option A — Via le gestionnaire de fichiers Hostinger :**
1. Cliquez sur **« Téléverser »** (Upload)
2. Sélectionnez **tous les fichiers et dossiers** du dossier `ava-website/` décompressé
3. Attendez la fin du transfert

**Option B — Via FTP (recommandé pour grands transferts) :**
1. Récupérez vos identifiants FTP dans **Hostinger > Fichiers > Comptes FTP**
2. Utilisez FileZilla ou WinSCP
3. Connectez-vous et naviguez vers `/public_html/`
4. Glissez-déposez tout le contenu de `ava-website/`

### Étape 5 — Vérifier la présence du `.htaccess`

⚠️ **Critique :** le fichier `.htaccess` commence par un point et peut être masqué.

Dans le gestionnaire Hostinger :
- Cliquez sur l'icône **« Paramètres »** (engrenage en haut à droite)
- Activez **« Afficher les fichiers cachés »** (Show Hidden Files)
- Confirmez que `.htaccess` est bien présent dans `public_html/`

### Étape 6 — Vérifier les permissions

| Type | Permission |
|------|-----------|
| Dossiers | `755` |
| Fichiers | `644` |
| `.htaccess` | `644` |

Pour modifier, clic droit sur le fichier → **« Permissions »**.

### Étape 7 — Activer HTTPS

1. Dans hPanel : **Avancé > SSL**
2. Activer **« SSL gratuit »** (Let's Encrypt) pour ava-africa.me
3. Attendre 5–15 minutes pour la propagation
4. Décommenter le bloc HTTPS forcé dans `.htaccess` (lignes 24-26) :
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

---

## Vérifications post-déploiement

### Checklist immédiate

- [ ] `https://ava-africa.me/` charge la page d'accueil
- [ ] `https://ava-africa.me/about` (sans `.html`) charge la page À propos
- [ ] `https://ava-africa.me/about.html` redirige vers `/about` (301)
- [ ] `https://ava-africa.me/page-inexistante` affiche la page 404 personnalisée
- [ ] Le commutateur de langue FR/EN/AR fonctionne sur toutes les pages
- [ ] L'arabe (AR) inverse la direction du texte (RTL)
- [ ] Les opportunités se filtrent dynamiquement
- [ ] Le menu mobile s'ouvre et se ferme
- [ ] Le logo et favicon s'affichent (sinon : voir [Remplacer les images](#remplacer-les-images-et-pdfs))

### Outils de test

| Test | Outil |
|------|-------|
| Performance | [PageSpeed Insights](https://pagespeed.web.dev/) |
| Accessibilité | [WAVE](https://wave.webaim.org/) |
| HTML | [validator.w3.org](https://validator.w3.org/) |
| Mobile | [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) |
| HTTPS | [SSL Labs](https://www.ssllabs.com/ssltest/) |
| Sitemap | Google Search Console > soumettre `sitemap.xml` |

### Soumettre à Google

1. Créer une propriété [Search Console](https://search.google.com/search-console)
2. Vérifier la propriété (méta-tag ou DNS)
3. **Sitemaps > Ajouter un nouveau sitemap** → entrez : `sitemap.xml`
4. Demander l'indexation des 5 pages principales

---

## Modifier le contenu

### Textes (traductions)

Tous les textes du site sont centralisés dans **`data/translations.json`**.

Structure :
```json
{
  "fr": { "hero": { "tagline": "..." } },
  "en": { "hero": { "tagline": "..." } },
  "ar": { "hero": { "tagline": "..." } }
}
```

**Règle d'or :** quand vous modifiez une clé en français, modifiez aussi `en` et `ar` au même endroit pour préserver la cohérence trilingue. Si une traduction manque, le système affiche la version française par défaut.

Pour ajouter une nouvelle clé :
1. Ajoutez-la dans les trois sections (`fr`, `en`, `ar`) avec le même chemin
2. Dans le HTML, marquez l'élément avec `data-i18n="chemin.de.la.cle"`

---

## Système multilingue

Le système est piloté par `js/i18n.js`. Au chargement :

1. La langue est lue depuis `localStorage` (clé `ava-lang`)
2. À défaut, FR est appliquée
3. Tous les éléments avec `data-i18n="..."` reçoivent le texte traduit
4. Pour AR, `<html dir="rtl">` est appliqué et la police passe à Noto Sans Arabic
5. Le commutateur de langue dans l'en-tête déclenche le rechargement des textes sans recharger la page

**Préférence persistante :** le choix de langue est conservé entre les visites (localStorage).

---

## Ajouter des opportunités

Éditer **`data/opportunities.json`**. Chaque entrée doit suivre cette structure :

```json
{
  "id": "mastercard-uct-2026",
  "title": "Mastercard Foundation Scholars Program — UCT",
  "organization": "University of Cape Town",
  "type": "scholarship",
  "region": "africa",
  "level": "undergraduate",
  "language": "en",
  "funding": "full",
  "deadline": "2026-08-31",
  "description": "Programme entièrement financé...",
  "url": "https://..."
}
```

**Valeurs autorisées** (utilisées par les filtres) :
- `type`: `scholarship` · `fellowship` · `internship` · `job` · `program` · `coaching`
- `region`: `africa` · `europe` · `north-america` · `asia` · `global`
- `level`: `undergraduate` · `master` · `phd` · `professional`
- `language`: `fr` · `en` · `bilingual`
- `funding`: `full` · `partial` · `stipend` · `free`

Le rendu se fait automatiquement au chargement de `/opportunities`. Aucun rebuild nécessaire.

---

## Mettre à jour l'équipe

Éditer **`data/team.json`**. Chaque membre :

```json
{
  "tier": 1,
  "order": 1,
  "name": "Nom Prénom",
  "role": "Titre du poste (FR)",
  "roleEn": "Position title (EN)",
  "roleAr": "...",
  "bio": "Bio courte FR",
  "bioEn": "Short bio EN",
  "bioAr": "...",
  "photo": "assets/images/team/nom-fichier.jpg",
  "linkedin": "https://linkedin.com/in/...",
  "filled": true
}
```

**`filled: false`** → la carte affiche « Poste à pourvoir » avec un placeholder `?` (utile pour les 14 postes vacants jusqu'à recrutement).

**Tiers :**
- Tier 1 — Bureau Exécutif (5 postes)
- Tier 2 — Direction Opérationnelle (4 postes)
- Tier 3 — Coordination Régionale (4 postes)
- Tier 4 — Organe Consultatif (2 postes)

Engagement statutaire : **40 % de femmes minimum** dans la composition de l'équipe.

---

## Remplacer les images et PDFs

### Logo
Remplacez `assets/images/logo/logo-ava.png` (format recommandé : PNG transparent, 256×256 px ou plus).

### Favicon
Remplacez `assets/images/logo/favicon.ico`. Vous pouvez en générer un sur [favicon.io](https://favicon.io/).

### Photos d'équipe (15)
Placez les fichiers dans `assets/images/team/` avec les noms attendus par `data/team.json`. Recommandé : portraits carrés, 400×400 px, JPG ou WebP, < 100 ko chacun.

**Noms de fichiers attendus :**
`president.jpg`, `directeur.jpg`, `resp-bourses.jpg`, `resp-formation.jpg`, `resp-cyber.jpg`, `resp-finances.jpg`, `resp-partenariats.jpg`, `assistant.jpg`, `developpeur.jpg`, `vp-centre.jpg`, `formateur.jpg`, `vp-est.jpg`, `rep-genre.jpg`, `resp-urgences.jpg`, `rep-jeunesse1.jpg`

Si une image manque, l'attribut `onerror="this.style.display='none'"` masque automatiquement la balise — pas de lien cassé visible.

### Documents PDF (3)
Remplacez dans `assets/documents/` :
- `AVA_Charter.pdf` — Charte
- `AVA_Statutes.pdf` — Statuts
- `AVA_Internal_Regulations.pdf` — Règlement intérieur

---

## Dépannage

### Les URLs propres (sans `.html`) ne fonctionnent pas
→ Vérifier que `.htaccess` est bien uploadé (afficher les fichiers cachés)
→ Vérifier que `mod_rewrite` est activé chez Hostinger (devrait l'être par défaut)
→ Contactez le support Hostinger si le module est désactivé

### La page 404 affiche la page Hostinger par défaut
→ Confirmer `ErrorDocument 404 /404.html` dans `.htaccess`
→ Vérifier que `404.html` existe à la racine de `public_html/`

### Le commutateur de langue ne change rien
→ Ouvrir la console navigateur (F12) et chercher des erreurs
→ Vérifier que `data/translations.json` est accessible via l'URL directe
→ S'assurer que les fichiers `js/*.js` se chargent (Network tab)

### Les opportunités ne s'affichent pas
→ Valider le JSON sur [jsonlint.com](https://jsonlint.com/)
→ Vérifier la console pour l'erreur de parsing

### Les images ne se chargent pas
→ Vérifier les noms exacts des fichiers (sensible à la casse sur Linux)
→ Confirmer les permissions `644` sur les images

### La police arabe ne se charge pas
→ Vérifier que la connexion à Google Fonts n'est pas bloquée
→ Optionnel : héberger localement Noto Sans Arabic dans `assets/fonts/`

---

## Crédits techniques

- **Polices :** Fraunces, Inter, Noto Sans Arabic (Google Fonts)
- **Icônes :** [Lucide](https://lucide.dev/) (CDN)
- **CSS Framework :** [Tailwind CSS v3.4](https://tailwindcss.com/) (CDN)
- **Conformité :** WCAG 2.1 AA, sémantique HTML5, ARIA labels

---

## Contact technique

Pour toute question liée au site :
- **Email :** contact@africanvisionaries.org
- **Adresse :** Avenue Barthélemy Boganda, Bangui, RCA
- **Téléphone :** +236 72 54 51 21

---

© 2026 African Visionaries Alliance. Enregistrement en cours — Ordonnance n° 66/024 (RCA).
