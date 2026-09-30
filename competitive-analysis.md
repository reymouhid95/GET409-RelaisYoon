# Analyse concurrentielle — Séquence

**Date de recherche :** 30 septembre 2026
**Méthode :** navigation automate (Chromium headless 1440×900, `playwright-core`), captures pleine page + captures du premier écran, extraction du DOM (title, meta, H1, liens, textes, styles calculés).
**Périmètre :** 3 studios, pages publiques uniquement (accueil + 1 page de service/expertise pour chacun).
**Règle de preuve :** toute affirmation est tracée par une URL et un fichier de `screenshots/`. Ce qui n'a pas été observé est marqué **non observé** — jamais déduit.

---

## 1. Résumé exécutif

Les trois concurrents occupent trois territoires distincts : Dada ! Animation (récits animés 3D, Paris), D5XR (expériences immersives pour marques, Londres), Dardart Dakar (production audiovisuelle 360, Dakar). Aucun des trois ne présente d'ancrage Afrique de l'Ouest sur les pages consultées, aucun n'affiche de tarifs publics, et aucun ne combine animation 3D + XR + jeu + IA dans un même discours.

**Plus grande opportunité :** occuper le territoire « la vidéo générée, dirigée comme un tournage, depuis Dakar » — bilingue, avec preuves nommées.
**Plus grande menace :** Dardart Dakar, seul concurrent local, avec un tunnel de conversion très direct (CTA « Démarrer un projet », chat, réponse « en 2 minutes »).

---

## 2. Profils concurrents

### 2.1 Dada ! Animation — https://www.dada-animation.com/

| | |
|---|---|
| Pages consultées | accueil (200), `/en/expertises` (200) |
| Captures | `dada-home.png`, `dada-home-fold.png`, `dada-home-y900.png`, `dada-home-y1800.png`, `dada-expertises.png`, `dada-expertises-fold.png` |
| Positionnement (auto-déclaré) | « Studio d'animation 3D à Paris » (title), « Créateurs d'univers et d'expériences narratives » (H1) |
| Promesse | « crée des œuvres originales … pour réaliser des récits animés captivants (Documentaire, Série, Expérience VR, etc) ! » (texte héros) |
| Offre visible | 4 expertises : Storytelling et conception créative · Animation 3D · Immersion et Interactivité · Conseil créatif et technologique |
| Preuves | 8 projets nommés (Trimaros, Les Hoofs de TFou, Mekka Nikki, Captain Tone-up, Maya and the Honey Festival, Lady Liberty, Handi Reality, There Were Millions) ; showreel vidéo (fichier MP4 exposé) |
| CTA | « Showreel », « En savoir plus », « Contactez-nous » |
| Langues | FR (défaut, `lang="fr-FR"`) + EN (`/en/`), bascule FR \| EN visible |
| Blog / contenus | « News » en navigation |
| Tarifs publics | **non observé** (les pages consultées ne montrent aucun prix ; le mot « budget » apparaît uniquement dans une phrase d'accroche de la page expertises) |
| Témoignages | **non observés** sur les pages consultées |
| Afrique de l'Ouest | **aucune mention observée** (accueil + expertises) |
| Design (calculé) | fond `rgb(30,30,30)` · texte blanc · accent H1 `rgb(240,66,55)` · bouton secondaire `rgb(216,152,191)` · police « Geometria » · héros animé en diapositives (la capture du premier écran montre la diapositive « interactivity & immersion ») · bandeau de consentement cookies visible |
| Localisation | 15-17 rue de Sambre et Meuse, 75010 Paris · réseaux X, Facebook, LinkedIn, YouTube |

**Forces :** promesse claire et métier précis ; preuves par projets nommés ; bilingue ; blog actif ; showreel immédiat.
**Faiblesses observées :** aucun tarif ni fourchette de budget ; aucun ancrage géographique hors Paris ; bandeau cookies qui masque une partie du héros à la première visite.

---

### 2.2 D5XR — https://www.d5-xr.com/

| | |
|---|---|
| Pages consultées | accueil (200), `/about` (200) |
| Captures | `d5xr-home.png`, `d5xr-home-fold.png`, `d5xr-about.png`, `d5xr-about-fold.png` |
| Positionnement (meta) | « D5XR is a creative studio that brings immersive tech to global brands. » |
| Promesse | « Step beyond the screen » (héros sur visuel 3D/vidéo) ; « D5XR has built a global reputation for delivering dynamic immersive experiences. » |
| Offre visible | nav Projects / Services / Insights / About / Contact ; page À propos structurée en 3 blocs : « XR is our passion », « XR for all » (« From zero XR experience to full deployment »), « XR that pushes limits » |
| Preuves | forte densité média (11 images + 1 vidéo sur l'accueil, 14 vidéos sur `/about`) ; **aucun chiffre, aucun nom de client ni témoignage extraits** de ces deux pages |
| CTA | bouton « Contact » rouge en haut à droite (visible sur `d5xr-home-fold.png`) ; pas d'autre CTA principal dans le héros |
| Langues | anglais uniquement (`lang="en"`) — **pas de version FR observée** |
| Blog / contenus | « Insights » en navigation |
| Tarifs publics | **non observé** |
| Témoignages | **non observés** (formulations génériques « blue-chip company clients to SMEs ») |
| Afrique de l'Ouest | **aucune mention observée** |
| Design (calculé) | fond `rgb(19,21,22)` · police sans-serif générique · **aucun élément `<h1>` détecté** sur les deux pages (titre héros en div) |
| Détail technique | documents légaux (T&C, Privacy, Cookies) hébergés hors domaine sur `d5design.box.com` |

**Forces :** direction artistique très élevée (héros 3D plein écran), positionnement « XR pour toutes marques » lisible, CTA Contact toujours présent.
**Faiblesses observées :** pas de version française (perte du segment francophone) ; aucune preuve chiffrée ni témoignage sur les pages consultées ; structure sémantique faible (pas de H1) ; légal externalisé.

---

### 2.3 Dardart Dakar — https://dardartdakar.com/

| | |
|---|---|
| Pages consultées | accueil (200), `/services` (**429 au premier essai**, rate-limit hébergeur o2switch TigerProtect, puis 200 après attente) |
| Captures | `dardart-home.png`, `dardart-home-fold.png` (héros non rendu en headless), `dardart-home-y1500.png`, `dardart-home-y2600.png`, `dardart-services.png`, `dardart-services-fold.png` |
| Positionnement (meta) | « agence créative de production audiovisuelle, photo, digital et print basée à Dakar, au service de l'Afrique » |
| Promesse | sur-titre « AGENCE CRÉATIVE — DAKAR, SÉNÉGAL » ; H1 « Production audiovisuelle & communication 360 » ; « De la stratégie à la diffusion, nous donnons une image forte à votre marque. » |
| Offre visible (page services) | 10 offres numérotées : Stratégie de marque, Rebranding, Film publicitaire, Film corporate & institutionnel, Création de contenu, Community management, Shooting photo professionnel, Podcast vidéo, Captation d'événement, Dardart Print — + méthode en 4 temps (Brief & Stratégie → Direction artistique → Production → Post & Diffusion) |
| Preuves | bandeau « ILS NOUS FONT CONFIANCE — Clients & partenaires » (logos non lisibles dans l'extraction texte : **non observé** dans ce périmètre) ; coordonnées complètes (adresse, 2 téléphones, email) |
| CTA | « Voir nos réalisations », « Démarrer un projet › », « DÉMARRER UN PROJET » répété en header et footer ; « Décrivez votre projet en 2 minutes. On revient vers vous avec une proposition adaptée. » ; bulle de chat (bulle rouge visible sur la capture pleine page) |
| Langues | FR (`lang="fr"`) + bascule FR \| EN |
| Blog / contenus | **non observé** (pas de section blog en navigation) |
| Tarifs publics | **non observé** sur accueil et services |
| Afrique | **oui** — « basée au Sénégal, au service de l'Afrique », adresse Nord Foire, 150 Rue YF 194, Dakar |
| Design (calculé) | fond `rgb(10,10,11)` · texte `rgb(244,244,245)` · police Inter · accents vert (labels) et rouge (chat) ; **héros blanc non rendu en capture headless (vidéo/hero non chargé) : visuel du héros non observé** |
| Réseaux | Instagram, LinkedIn, YouTube |

**Forces :** seul concurrent local de Dakar ; tunnel de conversion très direct (2 minutes, chat, CTA répété) ; offre large ; FR/EN ; SEO local explicite (sur-titre, adresse, téléphone).
**Faiblesses observées :** aucune offre 3D / XR / jeu / IA visible parmi les 10 services ; pas de blog observé ; pas de preuve de spécialisation technique ; héros vidéo fragile (échec de rendu + rate-limit 429 observés).

---

## 3. Matrice comparative

| Dimension | Dada ! Animation | D5XR | Dardart Dakar |
|---|---|---|---|
| Territoire | Récits animés 3D, Paris | XR immersif pour marques, Londres | Audiovisuel & communication 360, Dakar |
| Phrase d'accroche | « Créateurs d'univers et d'expériences narratives » | « Step beyond the screen » | « Production audiovisuelle & communication 360 » |
| Preuves visibles | 8 projets nommés + showreel | Densité média (14 vidéos /page) sans chiffres | Bandeau clients (noms non observés) + coordonnées |
| Tarifs publics | non observé | non observé | non observé |
| Bilingue FR/EN | oui | non (EN seul) | oui |
| Blog / insights | oui (News) | oui (Insights) | non observé |
| Ancre Afrique de l'Ouest | aucune mention | aucune mention | oui (Dakar, « au service de l'Afrique ») |
| CTA principal | Contactez-nous | Contact (bouton rouge) | Démarrer un projet + chat + « 2 minutes » |
| 3D + XR + Jeu + IA combinés | partiel (3D + XR, pas de jeu/IA observé) | XR seulement | non observé |

---

## 4. Lacunes, opportunités, menaces

### Lacunes observées (angles non occupés)
1. **Aucun ancrage Dakar / Afrique de l'Ouest** chez les deux studios internationaux — le territoire « fabriqués à Dakar » est libre sur ce périmètre.
2. **Aucun tarif ni fourchette** chez personne — la transparence budgétaire est un angle disponible.
3. **Personne ne combine 3D, XR, jeu et IA** dans un même discours sur les pages consultées.
4. **D5XR sans version française** — le segment francophone n'est pas servi.
5. **Dardart sans offre technique 3D/XR/IA** — la profondeur technologique n'est pas défendue localement.

### Opportunités
- Preuves nommées (études de cas) : Dada montre la voie avec 8 projets listés ; Séquence peut faire de même avec ses **vrais** projets.
- Bilingue FR/EN + promesse de délai chiffrée et tenable (benchmark Dardart « 2 minutes »).
- Contenus courts « animation/XR/jeu/IA vus depuis Dakar » : ni Dada (News) ni D5XR (Insights) ne couvrent cet angle.

### Menaces
- **Dardart** : présence locale, CTA agressifs, contacts visibles, confiance institutionnelle affichée.
- **Dada** : crédibilité culturelle et showreel fort, bilingual, portfolios nommés.
- **D5XR** : niveau de production visuelle très élevé, référence « global reputation ».

---

## 5. Recommandations (5)

1. **Occuper l'ancre Dakar** : page/tiroir « vidéo générée, dirigée comme un tournage » avec adresse et projets locaux — preuve visuelle, pas de slogan seul. *(Source : absence d'ancrage chez Dada et D5XR, §2.1, §2.2)*
2. **Système de preuves nommées** : lister les projets réels comme Dada (8 projets) — jamais de projet inventé. *(Source : §2.1, preuves)*
3. **Bilingue dès le départ** : FR par défaut + EN, comme Dada et Dardart ; avantage direct sur D5XR. *(Source : §2.2, langues)*
4. **Un CTA unique + engagement de délai** : « Démarrer un projet » + délai de réponse affiché et tenu (benchmark « 2 minutes » de Dardart). *(Source : §2.3, CTA)*
5. **Insights mensuels** (1 bilan/mois) sur animation/XR/jeu/IA vus de Dakar : angle non couvert par News (Dada) ni Insights (D5XR). *(Source : §2.1, §2.2, blog)*

---

## 6. Annexes — inventaire des preuves

| Fichier `screenshots/` | Page | Type |
|---|---|---|
| `dada-home.png` | dada-animation.com | pleine page |
| `dada-home-fold.png` | dada-animation.com | premier écran (diapositive « interactivity & immersion » + bandeau cookies) |
| `dada-home-y900.png`, `dada-home-y1800.png` | dada-animation.com | sections intermédiaires |
| `dada-expertises.png`, `dada-expertises-fold.png` | /en/expertises | pleine page / premier écran |
| `d5xr-home.png`, `d5xr-home-fold.png` | d5-xr.com | pleine page / premier écran (héros 3D + bouton Contact) |
| `d5xr-about.png`, `d5xr-about-fold.png` | /about | pleine page / premier écran |
| `dardart-home.png` | dardartdakar.com | pleine page (héros non rendu : non observé) |
| `dardart-home-y1500.png`, `dardart-home-y2600.png` | dardartdakar.com | sections services / clients |
| `dardart-services.png`, `dardart-services-fold.png` | /services | pleine page / premier écran (10 offres) |

**Limites :** pages non consultées (tarifs, portfolio complet, pages légales) marquées non observés ; aucun chiffre d'affaires, fréquentation ou avis tiers n'a été collecté ; le premier appel `/services` de Dardart a renvoyé HTTP 429 (rate-limit hébergeur) puis a été repris avec succès.
