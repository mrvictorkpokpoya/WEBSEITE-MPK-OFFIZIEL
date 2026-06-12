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

### Session 2 (12 juin 2026)
- Couleur C4D2ED intégrée en tint subtil (PageHero, page Campus, titres footer)
- Noms de campus en MAJUSCULES partout (data.js, Gallery, Home, News, Campuses)
- Footer : titres lisibles (périwinkle #C4D2ED au lieu du rouge illisible), logo officiel, copyright « © MULTIPLIKATOR START UP GROUP »
- Coordonnées réelles partout (footer, contact, social) : contact@multiplikator-world.com, +229 01 96 59 38 66 | +229 01 99 93 33 33
- Page Campus refaite façon Evolanguage : cartes par campus (nom, adresse, tél, email, bouton Communauté WhatsApp, plan d'accès) + carte EN LIGNE avec horaires (8h-11h / 11h30-14h30 / 15h-18h / 19h-22h)
- Menu « Communauté » déplacé en sous-section de l'onglet « L'Institut »
- Logo officiel MPK intégré au header et footer

## Backlog priorisé
### P0
- E2E testing_agent jamais exécuté sur l'app (auth JWT/Google, Stripe checkout, formulaire contact + Resend) — À FAIRE
- Vérifier l'affichage des tarifs complexes dans TrainingPlus.jsx (A1.1 vs A1 complet vs bundles)

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
