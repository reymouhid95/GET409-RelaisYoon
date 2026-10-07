# Dossier de production — Vidéo promo RelaisYoon (class07)

Tutoriel source : `class07/class07/Tutoriel — Vidéo promo d'une app avec Google Flow (Omni Flash).docx.md`
(8 étapes, validation enseignant à chaque étape).

- Livrable : vidéo **9:16, 1080 × 1920** + dossier de production.
- Règles de langue : analyse en français, prompts Flow **en anglais**,
  dialogues en français.
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
| Points bloquants | 1. 🔊/🎤 masqués sur Firefox (filmer la dictée sur **Chrome/Edge**).<br>2. **Ne pas promettre le hors-ligne** : le « sans data » a été écarté du HMW final — l'agent appelle une API.<br>3. Aucun prix fictif à l'écran : seuls les relevés réels S40-2026 (déjà conforme).<br>4. CTA définitif : URL Workers `https://reymouhid95-get409-relaisyoon-mvp.thiernooury89.workers.dev` |

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
| Durée et ratio | **9:16** (export 1080 × 1920) |
| Références | logo `favicon.svg`, personnages générés (**Awa**, usagère ; 1 passager secondaire), couleurs bleu RelaisYoon + jaune soleil |
| Audio | Dialogues en **français, tutoiement** (registre de l'agent) ; pas de musique dans les clips générés |

### Pitch en une phrase (26 mots)

> Il est 19h12 à Petersen : en 8 minutes, Awa sait quelle correspondance
> part, à quelle heure et combien elle coûte — avant même de descendre du BRT.

* [x] 5 idées notées, 1 concept choisi
* [x] Tableau de cadrage rempli
* [x] Pitch validé

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

* [x] Découpage rempli, total égal à la durée cible
* [x] Au moins un plan de screen recording réel prévu

## Étape 4 — Projet Flow et bible de l'agent

**À faire dans Flow** : créer un projet nommé **« 19h20 »**, ouvrir
l'agent du projet, coller le bloc ci-dessous dans son champ
d'instructions. Mettre la bible à jour à chaque changement de casting,
de tenue ou de style.

**Bible (en anglais, à coller telle quelle)** :

```text
PROJECT: "19h20" - a 60-second vertical social ad (9:16) for RelaisYoon, a free web app that tells BRT riders in Dakar which correspondance (shared taxi) to take from a bus stop, its exact fare and departure time, before they step off the bus. Target audience: daily BRT commuters in Dakar, mainly young adults, watching on TikTok, Reels and Snapchat.

STORY: At 19:12 Awa gets off the BRT at Petersen with 8 minutes before her next departure. She asks RelaisYoon on her phone and instantly gets the fiche: 350 FCFA, ideal departure 19:20. She boards the right vehicle with confidence, and shares the app with a friend.

VISUAL STYLE: highly realistic observational documentary look. Handheld camera with subtle natural movement, 35mm lens feel, natural available light only, light film grain, true-to-life skin tones, no glossy commercial look. Authentic and respectful representation of Dakar.

CAST (locked, never redesign):
- [TBD at step 5], provisional main character: a Senegalese woman around 28, daily commuter, warm and practical. Outfit: [TBD], one outfit for the whole video.
- [TBD at step 5], provisional secondary: the correspondance attendant at the stop, man around 40.
- [TBD at step 5], provisional secondary: her friend at the end, woman around 30.
Once a character sheet is approved, use it as the only identity reference for that character.

VOICES (keep identical in every shot):
- Awa: young woman, around 28, Senegalese French accent, warm, confident, everyday tone.
All dialogue is spoken in French, with the vouvoiement-free friendly register of the app.

RULES FOR EVERY GENERATION:
- No on-screen text, captions, labels, subtitles or watermarks.
- No logos or brands. Phones and devices are generic, with a plain blank screen, never readable interface.
- Videos: single continuous shot unless I give timecodes. No music, only ambient sound and sound effects.
- Maximum three main subjects in focus per shot. Background people stay out of focus.
- Never modify an approved asset. Ask me before regenerating anything already approved.
- Default: 4 variations per request.

ASSET NAMING: K1_Awa (main character), K7_Salif (correspondance attendant), K8_Aminata (friend) for characters, P01 to P10 for video shots. Keep approved assets in a collection named "19h20_References".
```

*Notes* : CAST volontairement **provisoire** (étape 5 le verrouille) ;
dialogues en **français** avec le registre tutoiement de l'app ; les
règles « No on-screen text / generic devices / no music » sont celles du
tutoriel — le texte et l'interface viendront des captures réelles et du
montage.

* [x] Projet Flow créé
* [x] Bible collée dans l'agent

## Étape 5 — Casting et turnarounds

**Nommage** : `K1_Awa` (principal, tenue unique du début à la fin),
`K7_Salif` (gardien de correspondance), `K8_Aminata` (amie). Options :
`K1b_Awa_face` (planche visage, si besoin de gros plans), plans `P01`–`P10`.

**Cohérence des tenues** : Awa en **bleu** (couleur de marque, seul son
tenue la plus marquante), Salif en **vert olive**, Aminata en **terracotta**
— aucune concurrence dans un même plan, chacun tient sur fond de rue du soir.

### K1_Awa — planche principale (exécuter dans Flow)

Paramètres : **16:9, 4 variations**. Garder **une seule** et ne plus jamais
la régénérer.

```text
Create the character turnaround sheet for Awa, named K1_Awa. Four full-body views of the same 28-year-old Senegalese woman, side by side, evenly spaced, identical scale and lighting: front view, three-quarter view, side profile, back view. Dark brown skin, short natural hair, warm friendly face, slim build. She wears a light-blue short-sleeve blouse tucked into a long dark-blue skirt, white sneakers and a small black shoulder bag. Neutral relaxed standing pose, arms by the sides. Plain light grey studio background, soft even front light, no cast shadows. Photorealistic, natural skin texture, sharp focus. No text, no labels, no numbers.
```

### K7_Salif — planche secondaire

```text
Create the character turnaround sheet for Salif, named K7_Salif. Four full-body views of the same 40-year-old Senegalese man, side by side, evenly spaced, identical scale and lighting: front view, three-quarter view, side profile, back view. Dark brown skin, close-cropped hair, short greying beard, calm reassuring presence. He wears an olive-green polo shirt, dark trousers and black shoes. Neutral relaxed standing pose, arms by the sides. Plain light grey studio background, soft even front light, no cast shadows. Photorealistic, natural skin texture, sharp focus. No text, no labels, no numbers.
```

### K8_Aminata — planche secondaire

```text
Create the character turnaround sheet for Aminata, named K8_Aminata. Four full-body views of the same 30-year-old Senegalese woman, side by side, evenly spaced, identical scale and lighting: front view, three-quarter view, side profile, back view. Medium brown skin, shoulder-length braided hair, bright curious expression. She wears a terracotta midi dress in plain fabric and simple sandals. Neutral relaxed standing pose, arms by the sides. Plain light grey studio background, soft even front light, no cast shadows. Photorealistic, natural skin texture, sharp focus. No text, no labels, no numbers.
```

### Après validation : verrouiller dans la bible

Remplacer la section CAST (provisoire) de la bible par :

```text
CAST (locked, never redesign):
- K1_Awa, 28, main character. Dark brown skin, short natural hair, warm friendly face. Outfit: light-blue short-sleeve blouse, long dark-blue skirt, white sneakers, small black shoulder bag — worn in every shot.
- K7_Salif, 40, correspondance attendant. Dark brown skin, close-cropped hair, short greying beard. Outfit: olive-green polo shirt, dark trousers, black shoes — worn in P07.
- K8_Aminata, 30, Awa's friend. Medium brown skin, shoulder-length braided hair. Outfit: terracotta midi dress, sandals — worn in P09.
Once a character sheet is approved, use it as the only identity reference for that character.
```

**Dérive d'identité** (défaut n°1) : comparer chaque résultat à la
planche d'origine ; prompt de correction :
`In image 1, change only the [woman's/man's] face and skin in all four views to match the person in image 2: same facial features, same age around [AGE], same [SKIN TONE] on face, neck, arms and feet. Keep the outfit, hair, poses, background, lighting and framing of image 1 exactly as they are. No text, no labels. Keep everything else the same.`

### Checklist de validation (par personnage)

* [x] Même visage, même teint et même coiffure sur les 4 vues
* [x] Âge conforme au prompt
* [x] Aucun libellé ajouté (« FRONT », « SIDE »)
* [x] Mains à 5 doigts, pieds corrects
* [x] Vue de dos cohérente avec la vue de face
* [x] Bible mise à jour (CAST verrouillé)

* [x] K1_Awa validée ✅ (05/10)
* [x] K7_Salif validé ✅ (05/10)
* [x] K8_Aminata validée ✅ (05/10)

*(Validation : 4 vues conformes, checklist OK — planches dans
`docs/video-promo/turnarounds/`, commit `3418e7f`.)*

## Étape 6 — Prompts des plans vidéo

Règles : **un plan à la fois, validé avant le suivant**. Params Flow
communs : **9:16**, durée générée = utile + 2 s, résolution max. Tags à
attacher : `K1_Awa` (+ `K7_Salif` / `K8_Aminata` selon les plans).

### P01 — Hook : 19h12 (0-4 s)

**Fiche** : reference-to-video · Flow : 9:16, 6 s générées pour 4 s ·
tags : K1_Awa · vigilance : l'heure « 19h12 » sera ajoutée **en post**,
pas dans le clip.

```text
Single continuous shot, no scene cuts. The woman shown in K1_Awa steps down from a city bus through the open rear door at a busy bus stop in Dakar, holds her small black shoulder bag and looks around uncertainly. Setting: Petersen bus stop at dusk, warm street light, minibus taxis waiting in a line, people softly out of focus in the background. Handheld medium shot, slight natural movement, observational documentary style, natural light only. Audio: bus doors closing, evening street ambience, distant engines. No music. No captions. No on-screen text.
```

### P02 — Le problème (4-10 s)

**Fiche** : reference-to-video · 9:16, 8 s pour 6 s · tags : K1_Awa,
P01 (décor) · vigilance : réplique angoissée, 5 mots.

```text
Single continuous shot, no scene cuts. The woman shown in K1_Awa stands at the edge of the bus stop and watches two shared taxis pull away; she takes a small step forward and stops, unsure. She says in French, anxious: "Et si je me trompe ?" Setting: the bus stop shown in P01 at dusk, tail lights of departing vehicles, warm street light. Handheld close-medium shot, observational documentary style, natural light only. Audio: engines accelerating, street ambience. No music. No captions. No on-screen text.
```

### P03 — Elle ouvre l'app (10-16 s)

**Fiche** : reference-to-video · 9:16, 8 s pour 6 s · tags : K1_Awa,
P01 · vigilance : **écran uni obligatoire** (l'UI sera incrustée en post).

```text
Single continuous shot, no scene cuts. The woman shown in K1_Awa takes her phone from her shoulder bag, holds it in one hand and taps the screen with a focused expression; the phone screen is plain uniform light grey with no content, no icons and no reflections. She says in French, determined: "On regarde." Setting: the bus stop shown in P01 at dusk. Handheld medium close-up, observational documentary style, natural light only. Audio: street ambience, a light tap sound. No music. No captions. No on-screen text.
```

### P04 — L'app répond (16-24 s) — SCREEN RÉEL

**Fiche** : **screen recording (post)**, aucune génération Flow ·
durée : 8 s utiles (enregistrer ~10 s) · contenu : sur **Chrome/Edge**,
taper `Petersen vers Guédiawaye ?` → **Demander** → la fiche
(Grand-Médine… 350 FCFA, relevé 18h35, DISPONIBLE) qui se charge ·
vigilance : plein écran vertical, mode sombre, notifications masquées,
parcours lent et fluide **sans hésitation**, 3 prises gardes la plus
nette.

### P05 — Soulagement : « 19h20, parfait » (24-30 s)

**Fiche** : reference-to-video · 9:16, 8 s pour 6 s · tags : K1_Awa,
P01 · vigilance : le téléphone reste **écran uni**.

```text
Single continuous shot, no scene cuts. The woman shown in K1_Awa looks at her phone, then up at the arriving shared taxi, and smiles with relief. She says in French, calm: "19h20, parfait." Setting: the bus stop shown in P01 at dusk, headlights of an approaching vehicle. Handheld medium shot, observational documentary style, natural light only. Audio: approaching vehicle engine, street ambience. No music. No captions. No on-screen text.
```

### P06 — Feature heure (30-36 s) — SCREEN RÉEL

**Fiche** : **screen recording (post)** · durée : 6 s utiles ·
contenu : champ 🕐 `19:30` → réponse « ton départ idéal : 19h20 » ·
vigilance : même prise que P04 (même session d'enregistrement),
données réelles S40-2026 uniquement.

### P07 — Elle monte, prix exact (36-42 s)

**Fiche** : reference-to-video · 9:16, 8 s pour 6 s · tags : K1_Awa,
K7_Salif · vigilance : **2 personnages nets max** ; les pièces comptent
(audio).

```text
Single continuous shot, no scene cuts. The woman shown in K1_Awa hands coins to the man shown in K7_Salif at the open door of a shared taxi; he counts them with a nod and she steps inside. He says in French, warm: "C'est 350, monte." Setting: the vehicle and the bus stop shown in P01 at dusk. Handheld medium shot, observational documentary style, natural light only. Audio: coins clinking, vehicle idling, street ambience. No music. No captions. No on-screen text.
```

### P08 — Le trajet tranquille (42-48 s)

**Fiche** : reference-to-video · 9:16, 8 s pour 6 s · tags : K1_Awa,
P07 (intérieur véhicule) · vigilance : fenêtres = flou lumineux, pas de
marques visibles.

```text
Single continuous shot, no scene cuts. The woman shown in K1_Awa sits by the window inside the moving shared taxi; she leans back and watches Dakar street life pass by, relaxed. Setting: interior of the vehicle shown in P07 at night, blurred city lights outside the window. Handheld medium close-up from the seat in front, observational documentary style, natural light only. Audio: engine hum, muffled street sounds. No music. No captions. No on-screen text.
```

### P09 — La preuve : elle partage l'app (48-54 s)

**Fiche** : reference-to-video · 9:16, 8 s pour 6 s · tags : K1_Awa,
K8_Aminata · vigilance : écran uni ; 2 répliques courtes.

```text
Single continuous shot, no scene cuts. The woman shown in K8_Aminata approaches the woman shown in K1_Awa, who is holding her phone, and asks her a question; Awa turns the phone so her friend can see the screen, which is plain uniform light grey with no content. Aminata says in French, curious: "Et moi vers Yeumbeul ?" then Awa answers in French, helpful: "Regarde." Setting: the bus stop shown in P01 at night. Handheld two-shot, observational documentary style, natural light only. Audio: quiet street ambience. No music. No captions. No on-screen text.
```

### P10 — CTA (54-60 s)

**Fiche** : reference-to-video · 9:16, 8 s pour 6 s · tags : K1_Awa,
P09 · vigilance : **logo + URL + slogan en post** (zone centrale
libre) ; pas de nom de marque dans la réplique.

```text
Single continuous shot, no scene cuts. The woman shown in K1_Awa stands at the bus stop at night, lowers her phone after checking it, and smiles calmly toward the street as her vehicle arrives. She says in French, confident: "On sait avant de descendre." Setting: the bus stop shown in P01 at night, warm street light, soft bokeh of city lights behind. Handheld medium shot, observational documentary style, natural light only. Audio: quiet night street, distant engine. No music. No captions. No on-screen text.
```

### Conseils de génération

- 4 variations par demande ; garder **la meilleure**, ne pas revenir en
  arrière sur un plan validé.
- Défaut n°1 → texte parasite : le négatif final est déjà dans chaque
  prompt ; sinon éditer : `Remove all on-screen text. Keep everything
  else the same.`
- Défaut n°2 → écran inventé : `Make the phone screen a plain, uniform
  light grey with no content, no icons and no reflections.`
- Un clip enchaîne plusieurs plans ? Le premier bloc « Single
  continuous shot » a sauté → éditer.

* [x] Un prompt par plan, chacun avec sa fiche
* [x] Plans générés et approuvés un par un

## Étape 7 — Diagnostic et édition

Journal des éditions complet : `docs/video-promo-s8-journal-editions.md`

* [x] Journal des éditions tenu à jour

## Étape 8 — Interface de l'app et post-production

* [x] Montage exporté en 1080 × 1920 (CapCut)

---

## Rendu final

- [x] Vidéo 9:16 exportée 1080 × 1920 (50 s)
- [x] Dossier complet : fiche app, cadrage, découpage, bible, turnarounds,
  prompts + fiches, journal des éditions
