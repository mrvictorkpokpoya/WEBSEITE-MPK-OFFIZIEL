# PRD — Site officiel MULTIPLIKATOR Institut de Langues

## Problème original
Créer le site web officiel, premium et institutionnel de MULTIPLIKATOR Institut de Langues (réseau multi-campus au Bénin). 16+ pages : campus, présentation, 6 départements (MPK Training Plus, Exam Prep, Translation Pro, Consulting Pro, Tourism Programm, Extra Services), cours en ligne. Authentification (Espace apprenant — JWT + Google Emergent), boutique/paiement Stripe (bundles/cartes cadeaux), formulaire de contact (Resend, onboarding@resend.dev). Design premium institutionnel, palette bordeaux (#580505) / blanc, police Poppins.

## Identité & contenu officiel
- Logo officiel : `LOGO_MARK` et `LOGO_FULL` dans `/app/frontend/src/lib/data.js` (assets emergent)
- Copyright : « © MULTIPLIKATOR START UP GROUP »
- Email : contact@multiplikator-world.com
- Téléphones : +229 01 96 59 38 66 | +229 01 99 93 33 33 (Parakou/Djougou : +229 01 67 46 44 04)
- Couleur d'accent secondaire : #C4D2ED à 5–8 % (classes `.bg-tint`, `.bg-tint-soft`)
- Noms de campus toujours en MAJUSCULES : GODOMEY PK 14, AKPAKPA, PORTO-NOVO, LOKOSSA, DJOUGOU, PARAKOU, EN LIGNE
- Adresses officielles des campus : voir CAMPUSES dans data.js (source : flyer fourni par le client)
- Plan d'accès : image fournie pour GODOMEY PK 14 uniquement ; placeholders « bientôt disponible » pour les autres
- Menu header : 3 onglets (L'Institut [incl. section Communauté], Formations & Services, Contact)

## Implémenté (historique)
### Session 1 (juin 2026)
- Scaffolding complet : backend FastAPI (auth JWT + Google, contact, Stripe checkout), 20+ pages React, routing
- Design system bordeaux/blanc, police Poppins, header simplifié 4 onglets

### Session 2 (12-13 juin 2026)
- Couleur C4D2ED intégrée en tint subtil (PageHero, page Campus, titres footer)
- Noms de campus en MAJUSCULES partout (data.js, Gallery, Home, News, Campuses)
- Footer : titres lisibles (périwinkle #C4D2ED au lieu du rouge illisible), logo officiel, copyright « © MULTIPLIKATOR START UP GROUP »
- Coordonnées réelles partout (footer, contact, social) : contact@multiplikator-world.com, +229 01 96 59 38 66 | +229 01 99 93 33 33
- Page Campus refaite façon Evolanguage : cartes par campus (nom, adresse, tél, email, bouton Communauté WhatsApp, plan d'accès) + carte EN LIGNE avec horaires (8h-11h / 11h30-14h30 / 15h-18h / 19h-22h)
- Menu « Communauté » déplacé en sous-section de l'onglet « L'Institut »
- Logo officiel MPK intégré au header et footer
- Image hero de la page d'accueil remplacée par la photo d'équipe fournie par le client (asset au40q6vj)
- Réseaux sociaux étendus : TikTok, LinkedIn, Telegram ajoutés au footer et à la page Réseaux sociaux (icônes de marque via react-icons)

### Session 3 (13 juin 2026 — itération UX/contenu majeure)
- **Header** : 4 onglets définitifs en MAJUSCULES — L'INSTITUT · SERVICE · COMMUNAUTÉ · CONTACT (Communauté ressortie comme top-level)
- **Footer** : alignement MULTIPLIKATOR sur ligne sup. du logo ; titres NAVIGATION / NOS CAMPUS / CONTACT agrandis et alignés ; colonne Contact élargie pour éviter retour à la ligne ; icône WhatsApp sur 1er numéro, Telegram sur 2ème ; bouton WhatsApp direct stylé C4D2ED ; liens Politique de confidentialité + Traitement des données
- **CTAs globaux** : tous reformatés en fond #C4D2ED + bordure bordeaux 1.5px + texte bordeaux semi-bold (style "Voir bundles & cartes cadeaux")
- **Hero Home** : CTAs "Découvrir nos formations" et "Nous contacter" maintenant visibles avec contraste fort + ombre
- **Stats Home** : ajout de labels descriptifs au-dessus des chiffres (IMPLANTATIONS · COMMUNAUTÉ · DEPUIS · COUVERTURE)
- **Titres sections Home** : tous en MAJUSCULES (Nos points forts, Nos départements, Témoignages, Nos campus, Votre prochain niveau, Cours en ligne)
- **Contact direct (page Contact)** : simplifié — lieu GODOMEY PK14 + email + WhatsApp 1er numéro + Telegram 2ème numéro ; suppression Parakou/Djougou et du 3ème numéro ; ajout bloc Conformité avec liens politiques
- **TrainingPlus.jsx — Cours produit individuel** :
  - Grille 4 colonnes pour cours de langues (A1.1, A1.2, A2.1, A2.2 / B1.1...B2.2 / C1.1...C2.2)
  - Grille 4 colonnes pour cours préparatoires (Goethe A1-B2 / ÖSD A1-B2) avec prix interne/externe/temps
  - CTA "Acheter ce cours" → redirige vers /boutique?course={id}
  - NB : 03 semaines par niveau préparatoire
- **Team.jsx** : refonte complète en 3 catégories
  - Administration actuelle (Dr. Lambert Amagnon SEHOUBO, Charles ABI OBOSSOU, Directeur du Tourisme à venir)
  - Équipe technique (6 personnes : Fructueux JEFFERSON, Mariam SIMPORE, Julien KOLOBH, Karim Narcisse DJAKPO, Quirin DOSSOU, Gildas DOSSOU)
  - Collègues résidant en Allemagne (14 anciens collaborateurs avec alternance H/F dans le tri)
  - Tous les noms de famille en MAJUSCULES
- **Nouvelles pages** : `/confidentialite` (Privacy.jsx) et `/traitement-donnees` (DataPolicy.jsx) — contenu institutionnel complet

### Session 4 (13 juin 2026 — Stripe par cours + footer raffiné + E2E testing)
- **Footer raffiné** : MULTIPLIKATOR restauré en `font-serif text-2xl` aligné en haut du logo (orthographe initiale) ; campus en noms complets « MPK CAMPUS GODOMEY PK 14 », « MPK CAMPUS AKPAKPA » etc. ; lien navigation « Boutique M » (au lieu de Boutique & Cartes Cadeaux) ; tailles ajustées pour rester lisible (titres 12px, items 13px)
- **Header** : « Boutique M » aussi dans le dropdown SERVICE
- **Stripe checkout direct par cours** :
  - Backend : ajout de 16 package_id `prep_goethe_{a1..b2}_{int|ext}` et `prep_osd_{a1..b2}_{int|ext}` dans CATALOG (server.py)
  - Frontend : `startCheckout(packageId)` dans TrainingPlus.jsx appelle POST /api/payments/checkout/session et redirige sur l'URL Stripe retournée
  - Cours de langues (semi_a1_1 → semi_b2_2) : bouton « Acheter ce cours » → Stripe direct
  - Cours préparatoires : 2 boutons par carte (« Acheter Interne » / « Acheter Externe ») pour la double tarification
  - Cours C1.1 → C2.2 : « Sur devis » → redirection contact (pas de Stripe)
- **Testing E2E v3 effectué (première fois) — TOUT PASSE 100% :**
  - Backend : 16/16 pytest tests (auth, contact + admin gating, catalog 44 items, Stripe création/status/invalid-id, persistence)
  - Frontend : 4 onglets UPPERCASE, hero CTAs, footer complet, TrainingPlus grilles, Stripe redirect, /contact toast, /team 3 catégories, /confidentialite, /traitement-donnees
  - Régression backend pytest disponible à `/app/backend/tests/backend_test.py`

### Session 7 (14 juin 2026 — Bugfix Stripe XOF + Foire aux téléchargements + Inversion CTAs)
- **🐛 BUGFIX critique Stripe XOF** : le wrapper `emergentintegrations.StripeCheckout` multiplie par 100 tous les montants (assumption 2-decimal). Pour XOF/FCFA (zero-decimal currency), Stripe affichait 3 500 000 au lieu de 35 000. Helper `stripe_amount()` ajouté à server.py qui divise par 100 si currency in ZERO_DECIMAL_CURRENCIES (XOF, JPY, KRW, XAF, BIF, RWF, etc.). Vérifié sur 5 produits : tous affichent maintenant le bon montant.
- **CTAs inversés** : fond bordeaux (#580505) + texte #C4D2ED (couleurs initiales pour le case, periwinkle pour le texte). Appliqué à tous les CTAs principaux (Home hero, TrainingPlus course-buy, ExamPrep prep-buy Interne, footer/contact WhatsApp direct, Investment Nous contacter, History Découvrir). Les CTAs secondaires (ghost) gardent leur style initial (bordeaux text sur bg blanc).
- **Nouvelle rubrique `/telechargements`** (Downloads.jsx) : Foire aux téléchargements avec 3 catégories (Brochures & PDFs, Dépliants, Visuels & Réseaux sociaux), 12 items total (placeholder url=# avec badge "Bientôt disponible" Lock). Ajouté au dropdown COMMUNAUTÉ du Header + lien dans Footer.
- **Cards style image 3** : nouveau composant `CleanCard` (Common.jsx) avec fond blanc, cercle gris icône, titre serif, ligne séparatrice, ombre douce (shadow-[0_8px_24px_-12px_rgba(88,5,5,0.18)] + hover renforcé). Utilisé dans Investment.jsx, Alumni.jsx, ExamPrep.jsx, et CourseProductCard
- **Refonte /appel-a-investissement** : SUPPRESSION de tous les montants (370M, 85M, 210M, 45M, 32M) et stats de croissance ; chaque projet affiche "En cours de conception" avec pastille pulsante ; titre CTA final = "Contactez-nous pour discuter des modalités." ; 3 boutons (Nous contacter, Email direct, WhatsApp)
- **Nouvelle page `/alumnis`** (Alumni.jsx — MPK World Alumnis) : 8 alumnis fictifs avec destination/parcours/citation, stats résumé (150+, Allemagne, 92%, 2021), filtres Tous/Allemagne/Autriche, item ajouté au dropdown COMMUNAUTÉ du Header
- **Politique de confidentialité enrichie** (Privacy.jsx) : 12 sections détaillées (Responsable, Données, Finalités, Bases légales RGPD, Durée 10 ans comptable, Destinataires Goethe/ÖSD/Stripe/Resend, Transferts internationaux, Sécurité, Droits, Cookies, Mineurs, Modifications)
- **Nouvelles CGU** (`/conditions-utilisation` — Terms.jsx) : 15 sections (Objet, Éditeur MPK Start Up Group, Accès, Compte apprenant, Inscription, Boutique avec règles annulation/remboursement, PI, Engagements, Responsabilités, Liens externes, Données perso, Cookies, Modification, Droit béninois Cotonou, Contact)
- **Migration des cours préparatoires** : retirés de `/departements/training-plus`, intégrés dans `/departements/exam-prep` avec PrepCard (style image 3) et Stripe direct pour les 16 package_id (Goethe/ÖSD A1-B2 × Interne/Externe). TrainingPlus affiche maintenant un teaser dark burgundy "Voir les cours préparatoires" vers ExamPrep
- **Plan d'accès campus Parakou** intégré (1mxtvkgx_WhatsApp Image 2026-06-14 at 00.09.43.jpeg) — 6/6 campus avec leur vrai plan
- **Footer** : 3 liens légaux en bas (Confidentialité · Traitement des données · CGU)
- **Testing E2E v3** — 36/36 assertions PASS (frontend + Stripe backend sanity)

### Session 5 (14 juin 2026 — Responsive + Réseaux sociaux + Notre histoire + Appel à investissement)
- **Responsive tablet + mobile** : Hero, CTAs, stats, paddings adaptés
- **Vrais liens réseaux sociaux** (SOCIAL_URLS dans data.js) — Facebook, Instagram, TikTok, LinkedIn, YouTube

## Backlog priorisé
### P0
- Plan d'accès du campus PARAKOU (1 image manquante)
- Validation client des prix langues (estimations actuelles à confirmer)
### Session 5 (17 février 2026) — Internationalisation complète
- **i18n complet sur 27 pages** : Home, Investment, Campuses, TrainingPlus, ExamPrep, History, Alumni, ExtraServices, Blog, Downloads, About, Team, TranslationPro, ConsultingPro, TourismProgramm, OnlineCourses, Shop, Gallery, Testimonials, News, Social, Contact, Login, Register, Dashboard, PaymentSuccess, Privacy/Terms/DataPolicy (hero)
- **3 locales remplies** (`fr.json`, `en.json`, `de.json` — ~715 lignes chacune) avec traductions natives professionnelles EN et DE
- **Marquage produit** : "Boutique MPK" en FR / "MPK Shop" en EN/DE (demande explicite client)
- **Formatage prix** : remplacement de tous les espaces par des points comme séparateurs de milliers (46.000 et non 46 000) dans `data.js`, Shop.jsx (`toLocaleString('de-DE')`), PaymentSuccess.jsx
- **HTML lang attribute** : synchronisé automatiquement avec la langue active (SEO + a11y) via `i18n.on('languageChanged', ...)`
- **Données dynamiques traduites** : titres/descriptions cours (LANGUAGE_COURSES, PREP_COURSES, PREP_MODULES), citations alumnis, articles blog, news, downloads, témoignages, départements — tous via clés i18n indexées par ID
- **Test agent itération 5** : 100% PASS frontend (FR/EN/DE sur 27 pages, 0 leak de langue, prix avec points OK)
- **Noms propres préservés** dans toutes les langues : MULTIPLIKATOR, GODOMEY PK 14, AKPAKPA, PORTO-NOVO, LOKOSSA, DJOUGOU, PARAKOU, noms d'équipe


- Fournir le nom du Directeur du Tourisme (placeholder « À venir »)
- Validation client du contenu de la chronologie /notre-histoire (jalons 2021-2026 actuellement rédigés par l'IA, à corriger si besoin)
- Validation client du contenu de /appel-a-investissement (montants, projets, formes de partenariat — à ajuster aux vraies orientations stratégiques de la direction)
### Session 6 (19 février 2026) — Refonte TrainingPlus + pages langues
- **Restructure visuelle TrainingPlus** : H2 "Cours d'allemand · Semi-Intensif" devient le gros titre (auparavant eyebrow). CTA inclus dans la description ("Achetez votre cours d'allemand selon votre niveau ici").
- **Niveaux C1/C2 Semi-Intensif** : 4 sous-niveaux ajoutés (C1.1, C1.2, C2.1, C2.2) — affichage "Sur devis" public ; prix internes 155K/175K base pour bundles
- **Premium VIP Accéléré restructuré** : 12 cartes sous-niveaux A1.1 → C2.2 (durée /2, format intensif). Prix VIP : A1-A2 sublevels=100K/2sem, B1=107.5K/2sem, B2=125K/3sem, C1=140K/3sem, C2=sur devis. Niveaux complets corrigés : A1=200K/4sem, A2=200K/4sem, B1=215K/4sem, B2=250K/**6sem** (était 8), C1=280K/**6sem** (était 8), C2=sur demande.
- **Bundles enrichis** : 9 packs (A1+A2, A2+B1, B1+B2, A1→B1, A1→B2, A1→C1, A2→B2, A2→C1, B1→C1) avec variations subtiles de bordeaux (tones #2B0000 → #540000), ruban couleur en haut, ombres renforcées
- **Cards renforcées** : border 0.22 → 0.45 hover, shadow 12px → 22px hover, plus de profondeur
- **Pages langues dédiées** : `/langues/anglais` (Kids English Training 15K/1mois + inscriptions 2.5K + 12 sublevels), `/langues/francais` et `/langues/chinois` (structure A1.1→C2.2 placeholder "en cours de conception")
- **MPK Exam Prep** : déplacé APRÈS les sections cours de langues
- **Découvrir** remplace "Me notifier" → renvoie vers la page langue
- **Catalog Stripe** : 9 nouveaux IDs bundles + 10 nouveaux VIP sublevels + kids_english + kids_english_reg, tous opérationnels (testés 100% par testing agent)
- **i18n complet** : nouvelles clés `training_plus.section_german_*` et namespace `languages.*` dans FR/EN/DE
- **Test agent itération 6** : 31/31 backend PASS, frontend 100%, 0 régression



### P1
- Blocs « En construction » pour cours Anglais, FLE, Chinois
- Liens réels des communautés WhatsApp par campus (provisoire : wa.me numéro principal)
### Session 7 (19 février 2026) — Anglais opérationnel + MPK Clubs
- **Programme anglais entièrement disponible** : 12 sous-niveaux Semi-Intensif (A1.1-C2.2 ; A1-B2 avec prix, C1-C2 sur devis), 6 niveaux complets, 12 sous-niveaux Premium VIP, 6 niveaux complets VIP, 9 bundles. Tarification à **-20% par rapport à l'allemand**, format 3×3h/semaine.
  - Semi-Intensif sublevels: A1=36.800 / A2=40.000 / B1=48.000 / B2=54.000 ; complets A1=73.600 / A2=80.000 / B1=96.000 / B2=108.000
  - VIP sublevels: 80.000-112.000 ; complets 160.000-224.000
  - 36 nouveaux IDs Stripe (eng_*, vip_eng_*, bundle_eng_*) — 48/48 tests pytest passés
- **Mme Tessilatou GBADAMASSI** ajoutée comme N°2 de l'administration ("Secrétaire-Comptable"), positionnée juste après Dr. Lambert SEHOUBO
- **Nouvelle page /clubs (MPK Clubs Sport & Langues)** sous Communauté :
  - **MPK Sport Clubs** : MFC (Football, vert), MBC (Basketball, orange), MVC (Volleyball, bleu)
  - **MPK Language Clubs** : MEC (English Club, bordeaux), MDK (Deutschklub, bordeaux foncé)
  - Page entièrement traduite FR/EN/DE (clubs_page namespace)
- **English nav-card** sur TrainingPlus affiche désormais "Disponible — A1.1 → C2.2" (statut available)
- **Test agent itération 7** : Backend 48/48 PASS, frontend 100% + i18n /clubs corrigée


- Plans d'accès des 5 autres campus (en attente du client)
- Vrais liens réseaux sociaux (Facebook/Instagram/YouTube/TikTok actuellement génériques)

### P2
- Cartes cadeaux physiques/digitales dans Shop.jsx
- Refactoring : routes backend dans /app/backend/routes, tests pytest dans /app/backend/tests

## Mocks / placeholders connus
### Session 8 (19 février 2026) — Cart + Client# + UI polish
- **Système panier multi-items** : 6 endpoints `/api/cart/*` (add/get/remove/upsell/checkout/finalize), persistence localStorage `mpk-cart-token`, déduplication, anti-mixed-currency
- **Numéro client auto** format `MPK-YYYY-NNNNN` avec compteur séquentiel MongoDB atomique (`db.client_counters`), idempotent via `$setOnInsert` sur `db.clients`
- **Upsell automatique** : `registration_fee` (5K) + `documentation_fee` (10K) auto-injectés pour first-time buyers, checkbox UI sur `/panier` avec fallback "régler au secrétariat"
- **Cart icon** dans Header avec badge live (compte items via custom event `mpk-cart-updated`)
- **Drapeaux clubs** : UK flag SVG sur MEC, drapeau allemand SVG sur MDK (top-left), couleurs bordeaux préservées
- **Sport clubs** : contours bordeaux MPK #580505 uniformes, couleurs vert/orange/bleu préservées pour icônes + boutons "Rejoindre"
- **Header allégé** : fusion "Connexion" + "S'inscrire" en un seul bouton **"MY MPK ❤"** → /connexion (la page Login a déjà un lien "Créer un compte")
- **Blanc neige pur #FFFFFF** sur tous les cards intérieurs (Kids English carte de #FAFAFA → blanc pur)
- **Test agent itération 8** : 23/23 backend pytest PASS (cart CRUD, upsell, idempotency, multi-currency rejection) + frontend E2E (Panier → Header badge → Cart page → Stripe redirect → numéro client display)

### Session 10 (19 juin 2026) — Restructuration menu Communauté + visuels MPK
- **Menu Communauté** restructuré : ne contient plus que **2 items** au lieu de 8 → `/blog-infos` ("Blog, Infos et Actualités") + `/concours-promotions` ("Concours et Promotions")
- **Composant `MpkFlyers.jsx`** créé avec **5 dépliants HTML/CSS officiels** (no images) inspirés des flyers WhatsApp client :
  1. `FlyerLanguageCourses` — Cours de Langues Allemand/Anglais avec dates 06 Juill → 04 Sept 2026
  2. `FlyerPrepCourses` — Cours Préparatoires A1/A2/B1/B2 avec pricing Interne/Externe + durées
  3. `FlyerCalendar` — Calendrier Annuel des Rentrées (12 mois colorés bordeaux/bleu marine)
  4. `FlyerExamGoodLuck` — Bonne Chance examen (gradient sable + drop-shadow bordeaux)
  5. `FlyerAcademicHolidays` — Congés Académiques du 19 au 30 juin 2026 + reprise 01 juill.
- **Page `BlogInfos.jsx`** : Hero + section Visuels (3 flyers : Calendrier/Examen/Congés) + Articles blog (catégories filtrables) + Actualités (6 news par défaut) + CTA Téléchargements
- **Page `ConcoursPromotions.jsx`** : Hero + section Offres (2 flyers : Cours de Langues + Cours Préparatoires) + 3 Concours (Campus Life, 100 mots, Jeune Talent) + 4 Promotions (early bird -15%, bundle -20%, parrainage 10K, famille -25%) + CTA Boutique
- **i18n FR/EN/DE** : ajout des clés `nav.blog_infos`, `nav.concours_promo`, sections `blog_infos.*` et `concours.*` complètes (titres, kickers, concours, promos, badges, deadlines)
- **Routes ajoutées** : `/blog-infos` + `/concours-promotions` dans App.js (anciennes routes /blog, /actualites, /telechargements, /alumnis, /clubs, /galerie, /temoignages, /reseaux toujours actives via URL directe et footer)



- Liens WhatsApp communauté = numéro principal (pas de vrais groupes)
- Photos campus = images stock
- Plans d'accès manquants pour 5 campus
- Équipe (TEAM) = données fictives à valider par le client
