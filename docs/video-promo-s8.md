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

### Les 5 idées notées (1 à 4 — viralité / clarté de l'app / facilité de production)

| # | Idée | Format | Viralité | Clarté | Prod | Total |
| :-- | :--- | :-- | :-- | :-- | :-- | :-- |
| 1 | **« 19h20 »** — il est 19h12 à Petersen, Awa a 8 min pour savoir quelle correspondance partir : l'app donne l'heure, le prix et la station avant qu'elle descende | Compte à rebours | 3 | **4** | **3** | **10** |
| 2 | POV humour — « Et là, tu montes quand même… » : le passager demande dans le doute, contre l'app qui répond en une fiche avant la descente | POV humour | **4** | 3 | 3 | 10 |
| 3 | Avant/Après — sortir 1 000 FCFA au hasard vs la fiche : 350 FCFA, 18h35, DISPONIBLE | Transformation | 3 | **4** | 3 | 10 |
| 4 | La routine du soir — voix off d'Awa dans le BRT : « avant de descendre, je regarde… » | GRWM | 2 | 4 | 2 | 8 |
| 5 | Sons du bus (portes, monnaie) + la fiche qui claque à l'écran | ASMR | 3 | 1 | 3 | 7 |

**Concept retenu : idée 1 — « 19h20 »** (le concept principal doit d'abord
montrer clairement l'app : clarté 4 + l'échéance crée la tension jusqu'à la
fin). L'idée 2 est gardée comme **contenu d'engagement** (viral mais moins
clair) si on produit une 2e vidéo.

### Arc narratif

1. **Problème** — 19h12, Awa descend à Petersen sans savoir : « Et si je
   montais dans la mauvaise correspondance ? »
2. **App en action** — elle ouvre RelaisYoon, tape la question (screen
   recording réel, étape 8)
3. **Bénéfice concret** — la fiche : 350 FCFA, part à 19h20 — elle monte
   en confiance
4. **Call-to-action** — l'URL, sur le dernier plan

### Tableau de cadrage

| Paramètre | Réponse RelaisYoon |
| :-- | :-- |
| Objectif et plateforme | Faire connaître RelaisYoon aux usagers BRT de Dakar (profil Awa) sur **TikTok, Reels, Snapchat** ; action attendue : essayer l'app (URL en bio + CTA écran) |
| Durée et ratio | **60 s, 9:16** (export 1080 × 1920) |
| Références | Captures écran de l'app (à prendre, étape 1), logo `favicon.svg`, personnages générés (**Awa**, usagère ; 1 passager secondaire), couleurs bleu RelaisYoon + jaune soleil |
| Audio | Dialogues en **français, tutoiement** (registre de l'agent) ; pas de musique dans les clips générés → **une piste posée au montage** ; sous-titres obligatoires en post |

### Pitch en une phrase (26 mots)

> Il est 19h12 à Petersen : en 8 minutes, Awa sait quelle correspondance
> part, à quelle heure et combien elle coûte — avant même de descendre du BRT.

* ☐ 5 idées notées, 1 concept choisi
* ☐ Tableau de cadrage rempli
* ☐ Pitch validé

## Étape 3 — Découpage en plans

Concept « 19h20 » — total **60 s**, 10 plans, dont **2 screens réels**.
Continuité : Awa porte la même tenue partout (tag `K1_Awa`, verrouillé
étape 5) ; le premier plan validé à Petersen devient la référence de décor.

| N° | Temps | Durée | Intention | Tâche | Tags |
| :-- | :-- | :-- | :-- | :-- | :-- |
| P01 | 0-4 s | 4 s | **Hook** : 19h12 — les portes du BRT s'ouvrent à Petersen, Awa descend et hésite | reference-to-video | K1_Awa |
| P02 | 4-10 s | 6 s | **Problème** : elle regarde les correspondances qui s'élancent, panique (« Et si je montais dans la mauvaise ? ») | reference-to-video | K1_Awa |
| P03 | 10-16 s | 6 s | **Réaction** : elle sort son téléphone, ouvre RelaisYoon, écran uni (incrustation post) | reference-to-video | K1_Awa, P02 |
| P04 | 16-24 s | 8 s | **App en action** : elle tape « Petersen vers Guédiawaye », la fiche apparaît (350 FCFA, 18h35) | screen recording (post) | captures |
| P05 | 24-30 s | 6 s | **Soulagement** : elle sourit, l'heure qui compte « 19h20 » | reference-to-video | K1_Awa, P01 |
| P06 | 30-36 s | 6 s | **Feature heure** : champ 🕐 « 19h30 » → « ton départ idéal : 19h20 » | screen recording (post) | captures |
| P07 | 36-42 s | 6 s | **Bénéfice** : elle monte dans la bonne correspondance, paie le prix exact annoncé | reference-to-video | K1_Awa, K7_Salif |
| P08 | 42-48 s | 6 s | **Tranquillité** : dans le véhicule, elle regarde par la fenêtre, détendue | reference-to-video | K1_Awa, P07 |
| P09 | 48-54 s | 6 s | **Preuve sociale** : son amie demande « et moi vers Yeumbeul ? », Awa lui montre l'app | reference-to-video | K1_Awa, K8_Aminata, P08 |
| P10 | 54-60 s | 6 s | **CTA** : plan final, logo + URL en post (« Savoir où monter avant de descendre ») | reference-to-video | K1_Awa, P09 |

**Total : 4+6+6+8+6+6+6+6+6+6 = 60 s** ✅

Règles appliquées :

- Générer **+2 s** sur chaque plan reference-to-video (couper sur
  l'instant fort) ; ratio/durée se règlent dans Flow, pas dans le prompt.
- 2 plans de **screen recording réel** (P04, P06) — jamais d'interface
  générée.
- Max 2-3 personnages nets par plan (P09 : 2).
- Continuité notée : tenue Awa (`K1_Awa`) identique ; décors référencés
  par le plan précédent (`the bus stop shown in P01`,
  `the vehicle shown in P07`).

* ☐ Découpage rempli, total égal à la durée cible
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
