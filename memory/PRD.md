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
- Fournir le nom du Directeur du Tourisme (placeholder « À venir »)
- Validation client du contenu de la chronologie /notre-histoire (jalons 2021-2026 actuellement rédigés par l'IA, à corriger si besoin)
- Validation client du contenu de /appel-a-investissement (montants, projets, formes de partenariat — à ajuster aux vraies orientations stratégiques de la direction)

### P1
- Blocs « En construction » pour cours Anglais, FLE, Chinois
- Liens réels des communautés WhatsApp par campus (provisoire : wa.me numéro principal)
- Plans d'accès des 5 autres campus (en attente du client)
- Vrais liens réseaux sociaux (Facebook/Instagram/YouTube/TikTok actuellement génériques)

### P2
- Cartes cadeaux physiques/digitales dans Shop.jsx
- Refactoring : routes backend dans /app/backend/routes, tests pytest dans /app/backend/tests

## Mocks / placeholders connus
- Liens WhatsApp communauté = numéro principal (pas de vrais groupes)
- Photos campus = images stock
- Plans d'accès manquants pour 5 campus
- Équipe (TEAM) = données fictives à valider par le client
