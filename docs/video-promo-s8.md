# Dossier de production — Vidéo promo RelaisYoon (class07)

Tutoriel source : `class07/class07/Tutoriel — Vidéo promo d'une app avec Google Flow (Omni Flash).docx.md`
(8 étapes, validation enseignant à chaque étape).

- Livrable : vidéo **60 s, 9:16, 1080 × 1920** + dossier de production.
- Règles de langue : analyse en français, prompts Flow **en anglais**,
  dialogues en français, texte à l'écran uniquement en post-production.
- Un livrable par étape, validé avant de passer au suivant.

---

## Étape 1 — Fiche App

| Rubrique | RelaisYoon |
| :---- | :---- |
| Nom | RelaisYoon |
| Fonction principale | Savoir quelle correspondance BRT prendre et combien elle coûte **avant de descendre du bus** — question libre → fiche station / quartier / prix / heure |
| Problème résolu | À la descente du BRT, monter dans la mauvaise correspondance ou découvrir le prix trop tard ; finir le trajet à l'aveugle |
| Utilisateurs cibles | Usagers BRT de Dakar/Guédiawaye (persona : **Awa Diop**, mobile, français) — dans le bus, le soir |
| 3 à 5 fonctionnalités démontrables | 1. **Agent IA** : « Petersen vers Guédiawaye ? » → fiche claire (350 FCFA, 18h35, DISPONIBLE)<br>2. **Heure du trajet 🕐** → « ton départ idéal : 19h20 »<br>3. **🔊 Écouter la fiche** (voix FR) + **🎤 dictée** de la question<br>4. **★ Stations enregistrées** (retrouver sa correspondance en 1 clic)<br>5. **Partage** : lien de fiche + WhatsApp |
| Identité visuelle | Logo : `mvp/public/favicon.svg` (+ `apple-touch-icon.png`). Couleurs (oklch du CSS) : **bleu** `--brand-500: oklch(0.63 0.19 263)` / `--brand-700: oklch(0.45 0.19 265)`, **jaune soleil** `--sun-400: oklch(0.81 0.145 74)` / `--sun-500: oklch(0.75 0.16 66)`, fond clair `oklch(0.99 0.003 250)` ; thème sombre disponible. Police : titres `ry-num`/display du site (à relever si besoin : `mvp/src/styles.css`). Style : sérieux, lisible, bleu nuit + jaune |
| Ton de marque | Direct et rassurant. Site : vouvoiement (« Vous descendez à Petersen… ») ; agent : tutoiement (« Tape ta question », « ton départ idéal »). Écrire les dialogues vidéo dans le même registre : **tutoiement usager, ton de service public** |
| Contexte d'usage | Dans le BRT ou à la descente, sur mobile, **le soir** (relevés du soir S40-2026), en mouvement, une main sur le téléphone |
| Captures disponibles | ⚠️ Captures **techniques** seulement : `docs/l1-q1-fiche.png`, `docs/l1-q2-erreur.png`, `docs/s5-l2-*.png`, `docs/s5-l3-schema.svg`. **Aucune capture d'écran de l'app sur téléphone** — à prendre (3 à 5, numérotées) |
| Points bloquants | 1. **Captures téléphono à faire** (prérequis du tutoriel).<br>2. 🔊/🎤 masqués sur Firefox (filmer la dictée sur **Chrome/Edge**).<br>3. **Ne pas promettre le hors-ligne** : le « sans data » a été écarté du HMW final — l'agent appelle une API.<br>4. Aucun prix fictif à l'écran : seuls les relevés réels S40-2026 (déjà conforme).<br>5. CTA définitif : URL Workers `https://reymouhid95-get409-relaisyoon-mvp.thiernooury89.workers.dev` (à confirmer : domaine court pour l'écran final ?) |

**À faire avant validation** (ne pas inventer) :

- ☐ Prendre 3-5 captures d'écran de l'app sur téléphone (accueil agent,
  fiche réponse, heure du trajet, stations enregistrées, fiche partagée)
- ☐ Convertir les couleurs oklch en hex si Flow/Canva l'exige
- ☐ Trancher le CTA final (URL Workers actuelle ou lien plus court)

* ☐ Fiche App remplie et validée par l'enseignant

---

## Étape 2 — Concept et cadrage

*(à remplir après validation de l'étape 1)*

* ☐ 5 idées notées, 1 concept choisi
* ☐ Tableau de cadrage rempli
* ☐ Pitch validé

## Étape 3 — Découpage en plans

*(à remplir)*

* ☐ Découpage rempli, total égal à 60 s
* ☐ Au moins un plan de screen recording réel prévu

## Étape 4 — Projet Flow et bible de l'agent

*(à remplir — gabarit anglais du tutoriel §4)*

* ☐ Projet Flow créé
* ☐ Bible collée dans l'agent

## Étape 5 — Casting et turnarounds

*(à remplir)*

* ☐ Turnarounds validés (personnages, 4 vues)

## Étape 6 — Prompts des plans vidéo

*(à remplir — 6 blocs, 1 prompt + 1 fiche par plan)*

* ☐ Un prompt par plan, chacun avec sa fiche
* ☐ Plans générés et approuvés un par un

## Étape 7 — Diagnostic et édition

*(à remplir)*

* ☐ Journal des éditions tenu à jour

## Étape 8 — Interface de l'app et post-production

*(à remplir)*

* ☐ Screen recording propre enregistré
* ☐ Montage exporté en 1080 × 1920

---

## Rendu final et auto-évaluation

*(grille /20 du tutoriel — à noter à la fin)*

- ☐ Vidéo 60 s 9:16 exportée 1080 × 1920
- ☐ Dossier complet : fiche app, cadrage, découpage, bible, turnarounds,
  prompts + fiches, journal des éditions, liste de post-production
