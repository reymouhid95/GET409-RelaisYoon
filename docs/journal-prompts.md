# Journal de Prompts — RelaisYoon

Format : technique, prompt envoyé (résumé), réponse (2-3 lignes), note /5,
itération si < 3/5.

## P-CHAPEAUX — 6 Chapeaux de Bono (S2 · Étape 01)

- Technique : idéation structurée, 3 insights par chapeau + synthèse bleue.
- Prompt : persona Awa Diop (34 ans, employée de maison, Guédiawaye, Android
  au forfait épuisé), problème en 1 phrase issue des interviews S1, HMW S1
  comme entrée explicite (le HMW définitif n'existe pas encore).
- Réponse : 18 insights + synthèse. Le blanc s'appuie sur les faits publiés
  (SunuBRT, CETUD, Banque mondiale) ; le rouge et le noir sur les dix
  verbatims ; le vert propose 3 pistes dont une low-tech à tester.
- Note : 4/5. Ancré et traçable, mais le blanc repose sur des pages web,
  pas sur un relevé à quai, et l'interview source est simulée.
- Itération : aucune reformulation. Action : valider le blanc par une
  observation réelle à une station avant S3.

## P-CHAPEAUX-CONTRAINTES (S2 · Étape 02)

- Technique : contraintes non négociables au format DOIT / NE DOIT PAS,
  avec origine et fonctionnalité éliminée.
- Prompt : sections Blanc + Noir de `chapeaux-bono.md`, persona Awa.
- Réponse : 4 contraintes (avant la descente, sans data, heure de relevé
  obligatoire, vide de donnée assumé) + 4 fonctionnalités éliminées
  + critère de validation final en 1 phrase.
- Note : 4/5. Chaque contrainte trace vers un chapeau. La contrainte 4
  admet une limite : le MVP démarre là où un relevé existe, ce qui reste
  à prouver station par station.
- Itération : aucune. Action : lister les stations avec relevé en S3.

## P-CHAPEAUX-HYPOTHESES (S2 · Étape 03)

- Technique : risques → hypothèses testables, classées par criticité.
- Prompt : sections Noir + Synthèse bleue de `chapeaux-bono.md`.
- Réponse : 3 critiques (compréhension sans formation, fiabilité du soir,
  usage au forfait vide), 1 importante (acceptation des chauffeurs),
  1 secondaire (correspondantes de quai). Priorité S3 : tester C1 + C3
  en un seul passage à la descente.
- Note : 4/5. Indicateurs mesurables sans technologie. Le seuil de 200 FCFA
  de C2 est une première proposition, à calibrer sur les premiers relevés.
- Itération : aucune. Action : calibrer le seuil C2 dès 5 relevés réels.

## P-CHAPEAUX-METRIQUES (S2 · Étape 04)

- Technique : valeur (chapeau jaune) → Nord + progression + alertes.
- Prompt : section Jaune de `chapeaux-bono.md`, HMW, persona, MVP en
  2 phrases.
- Réponse : Nord = % d'usagères informées avant la descente (cible 60 %) ;
  P1 usage au forfait vide, P2 fraîcheur < 1 h, P3 écart < 200 FCFA ;
  A1 sous-usage, A2 prix contredits. Tableau de bord S6 à 3 chiffres.
- Note : 4/5. Tout est mesurable sans technologie. P1 en déclaratif pour
  l'affichage reste fragile : à fiabiliser par comptage direct en S3.
- Itération : aucune. Action : prévoir un comptage direct des lectures
  d'affichage dès le pilote.

## P-VPC (S2 · Étape 05)

- Technique : Value Proposition Canvas, profil client puis proposition,
  FIT check final.
- Prompt : sections Blanc, Rouge, Noir de `chapeaux-bono.md`.
- Réponse : 3 jobs, 3 pains, 3 gains d'Awa ; service d'info correspondance
  sans data ; 3 relievers et 3 creators mappés 1-pour-1 ; FIT sans orphelin.
- Note : 4/5. Mapping complet et traçable. Le Creator 3 (rentrée à l'heure)
  dépend de facteurs hors MVP (pluie, trafic) : bénéfice à formuler avec
  prudence en soutenance.
- Itération : aucune. Action : P-VPC-CONNECTIONS vérifiera chaque origine.

## P-VPC-CONNECTIONS (S2 · Étape 06)

- Technique : traçabilité, chaque élément VPC rattaché à un chapeau
  avec citation.
- Prompt : `vpc.md` + `chapeaux-bono.md` complets.
- Réponse : 3 jobs, 3 pains, 3 gains, 3 relievers, 3 creators tous tracés ;
  1 tension honnête (Creator 3 promet une heure non contrôlée) avec
  recommandation de reformulation.
- Note : 5/5. Aucun orphelin, une vraie tension détectée au lieu d'être
  masquée. C'est le fichier qui répondra au jury.
- Itération : aucune.

## P-VPC-BACKLOG (S2 · Étape 07)

- Technique : proposition de valeur → user stories priorisées MUST /
  SHOULD / COULD avec outil, effort, adresse et critère d'acceptation.
- Prompt : sections Produits, Relievers, Creators, FIT de `vpc.md` +
  contraintes de `contraintes-mvp.md`, HMW, persona, outils Bolt.new + Dify.
- Réponse : US-01 et US-02 MUST (info avant descente, heure de relevé),
  US-03 SHOULD (code court sans data), US-04 COULD (ardoises, post-MVP).
  Sprint S3 en 2 semaines, démo S6 = US-01 en live au forfait vide.
- Note : 4/5. US-01 et US-02 testent directement C1 + C3. Le coût réel
  du SMS/USSD au Sénégal n'est pas chiffré : à valider avant d'en faire
  le canal par défaut.
- Itération : aucune. Action : chiffrer le coût SMS/USSD en S3.

## P-HMW — HMW définitif

- Technique : HMW draft + chapeaux + FIT VPC → décision engageante.
- Prompt : HMW S1, fait clé du Blanc, risque prioritaire du Noir, question
  structurante du Bleu, FIT (Pain 1 → Reliever 1).
- Réponse : HMW confirmé sans réécriture. 6 critères validés un par un.
  3 reformulations écartées avec motif (solution imposée 2 fois,
  largeur 1 fois).
- Note : 5/5. Confirmer au lieu de réécrire pour le plaisir est aussi une
  décision — elle est écrite et motivée.
- Itération : aucune.

## P-HMW-ALIGNEMENT

- Technique : backlog noté Persona / Problème / Contexte, ordre de sprint.
- Prompt : `hmw-definitif.md` + `backlog-s3.md` complets.
- Réponse : US-01 et US-02 à 6/6, US-03 à 5/6 si temps, US-04 reportée
  (4/6, dépend de S1 non validée). Décision : US-01 → US-02 → US-03.
- Note : 5/5. Chaque score est motivé en 1 phrase. La démo S6 est déjà
  définie : US-01 en live au forfait vide.
- Itération : aucune.

## P-HMW-DEMO

- Technique : HMW + métriques → script démo 5 minutes en 4 blocs.
- Prompt : `hmw-definitif.md` + sections Nord, Progression, Tableau de bord
  de `metriques-succes.md`, MVP en 2 phrases, outils Dify + SMS.
- Réponse : situation avant (45 s), MVP en action (2 min 30, téléphone sans
  data), métriques (1 min), réponse au HMW (45 s). 2 questions anticipées,
  signal de succès observable.
- Note : 4/5. Script solide, mais les valeurs sont des cibles : le MVP
  n'existe pas encore. Le vrai travail sera le remplacement par les réelles.
- Itération : aucune. Action : rejouer le script à blanc dès US-01 construite.

## P-HMW-JURY

- Technique : HMW + traçabilité → 5 questions probables + 2 pièges.
- Prompt : `hmw-definitif.md` + `vpc-connections.md`, niveau Master,
  réponses traçables vers un fichier précis.
- Réponse : appli (C2), pluie (C2/A2), cadrage (critères), chauffeurs (I1),
  impact (Nord). Pièges : interview simulée assumée, naïveté
  institutionnelle contrée par R01A et les 100 M$.
- Note : 5/5. Chaque réponse ouvre un fichier exact. Le piège 1 est le
  plus important : il protège l'équipe de son propre point faible.
- Itération : aucune. Action : répéter les 2 pièges à voix haute avant S6.

## P-VPC-PITCH

- Technique : VPC → bloc pitch 60 secondes, 2 registres + accroche.
- Prompt : `vpc.md` complet, HMW, équipe, persona, 60 secondes.
- Réponse : version formelle (Awa, prix datés, forfait vide), version
  directe (chiffres, cible 60 %), accroche « Savoir avant la porte »,
  3 jargons bannis avec remplacements.
- Note : 4/5. Les deux versions tiennent en 60 secondes. La directe cite
  la cible 60 % comme acquise : à reformuler après les mesures S3.
- Itération : aucune. Action : réécrire la directe avec les vraies valeurs.

## L3 — Journal S3 (3 prompts, 3 techniques)

### P1 Chercheur — Zero-Shot structuré

- Prompt : rôle + mission + processus 3 étapes + format de sortie imposé,
  sans exemple. Variables interdites dans le SYSTEM : la question arrive
  par message USER (Debut · query).
- Réponse attendue : champs STATION / QUARTIER / PRIX / HEURE / SOURCES,
  ou « INSUFFISANT : raison » uniquement.
- Note : 5/5 (confirmée le 29/09 par les runs Q1/Q2) : le modèle suit le
  format imposé sans exemple et refuse d'inventer quand les segments
  manquent.
- Incident run 23 septembre : 404 `llama-3.1-8b-instant does not exist`.
  Cause : modèle retiré côté fournisseur, pas erreur de prompt. Repli :
  modèle configuré disponible, températures inchangées. Leçon : un prompt
  valide ne compense pas un modèle indisponible — toujours tester le run
  avant de figer.

### P2 Rédacteur — Few-Shot

- Prompt : même structure + EXEMPLE de rapport complet (INFO
  CORRESPONDANCE Guédiawaye). Données via message USER (Chercheur · text).
- Réponse attendue : rapport calqué sur l'exemple, 100 mots max,
  « Non disponible » si donnée manquante.
- Note : 5/5 (confirmée le 29/09) : le Rédacteur calque l'exemple sans
  dériver — fiche Q1 fidèle au format INFO CORRESPONDANCE, donnée manquante
  rendue en « Non disponible ».

### Runs S3 — validation du garde-fou

- Q vague (« Deplacement ») → INSUFFISANT → Sortie : branche IF prouvée,
  message d'erreur affiché (Sortie configurée avec Chercheur · text).
- Q précise sans station, puis avec station + heure → INSUFFISANT motivé
  à chaque fois (« aucun relevé du soir disponible »). Le Chercheur refuse
  d'inventer : la règle d'or L4 (« se taire plutôt qu'afficher faux »)
  est vérifiée en pratique, pas seulement écrite.
- ELSE (Rédacteur) non prouvée à cette date : aucune source branchée.
  Résolu le 29/09 par la base de connaissances (voir runs ci-dessous).

### Runs S3 — base branchée, Sortie 2 posée (29 septembre)

- Base `releve-test-s3.md` créée en Connaissance, nœud Récupération entre
  DÉBUT et Chercheur (requête = Debut · query), sortie injectée dans le
  USER du Chercheur.
- Sortie 2 ajoutée après Rédacteur (variable « fiche » = Rédacteur · text) ;
  Sortie IF = « message erreur » (Chercheur · text).
- Modèles passés sur gpt-5 (llama toujours 404).
- Prochain run : Q1 complète → ELSE attendu, Rédacteur vert.

### P3 Éthique — Chain-of-Thought

- Prompt du Template S3 : « Raisonne étape par étape », identifier 2
  risques → évaluer gravité → proposer garde-fous (technique, message,
  règle prompt). Placeholders RelaisYoon.
- Réponse : 2 risques (prix périmé, chauffeurs braqués) + règle d'or.
  Voir `reflexion-ethique-s3.md`.
- Note : 5/5. Spécifique au projet, aucun point générique — critère
  éliminatoire L4 respecté.

### Runs S3 — chaîne complète validée sur app publique (29 septembre)

- Q1 (« Je descends à Petersen à 18h30, correspondances vers Guédiawaye
  et prix ? ») → Récupération 2-3 segments (Prix 400 FCFA, Quartier
  Guédiawaye Ndiarème, relevé 18h45) → Chercheur format valide →
  **branche ELSE → Rédacteur → fiche affichée**. La branche ELSE, non
  prouvée depuis le 23, est désormais vertueuse.
- Q2 (« Correspondances depuis Petersen vers Yoff à 2h du matin ? ») →
  Chercheur INSUFFISANT motivé → **branche IF → Sortie message d'erreur**.
  Les deux branches sont prouvées sur la version publiée.
- URL publique : https://udify.app/workflow/Ssl70Rg8K9Q3epGM
- Incidents résolus (leçons) :
  1. Variables `{x}` du Chercheur : contexte par message USER, jamais
     dans le SYSTEM (conforme Template S3). Vérifier la présence des DEUX
     variables (query + contexte) avant de soupçonner le prompt.
  2. Sortie 2 `fiche: null` = variable de sortie non mappée → re-mapper
     Rédacteur · text via {x}.
  3. Sandbox 0 crédits → modèle d'embedding indisponible → retrieval en
     échec silencieux (`result: []`) et erreur 400 « vectors dimensions
     does not fit » après changement de modèle → remplacer la base par une
     base en **Recherche Texte Intégral** (aucun embedding requis) et
     re-pointer le nœud Récupération. Le token de test isolé via le menu
     Test de Récupération a évité de re-déboguer le workflow à tort.
  4. Modèle passé à gpt-oss-20b (Groq) : le raisonnement `<think>` part
     parfois dans la sortie → la condition SI/SINON sur « INSUFFISANT »
     reste robuste car le texte final reste concaténé.
- Reste : captures L1/L2 à verser dans docs/, invitation workspace
  membres, soumission formulaire e-Academy, push Git.

## S4 — Lovable : 3 itérations (1 octobre)

Prompt initial (Étape 2) : prompt S4 rempli (`s4-lovable-prompt.md`),
RelaisYoon — 3 pages, 6 relevés, filtres quartier, généré en un envoi.
Checklist preview : 6/6 points OK.

- P1 Correction — « relevé Keur Massar 300 FCFA → 350 FCFA » → appliqué.
  Note : 5/5, correction ciblée, aucune dérive sur les autres fiches.
- P2 Visuelle — « bannière bleue sous le hero : Relevés du soir mis à jour
  chaque semaine + 📢 » → appliquée. Note : 5/5, style cohérent avec le hero.
- P3 Fonctionnelle — « champ de recherche filtrant les quartiers en temps
  réel sur Fiches du soir » → fonctionnelle. Note : 5/5, comportement attendu
  sans effet de bord sur les pastilles.

Leçon : 1 prompt = 1 correction (règle du template) — les 3 itérations sont
passées du premier coup en respectant cette discipline.

### Tableau L3 — journal des itérations (format template S4)

| # | Type | Objectif | Prompt envoyé | Résultat |
|---|---|---|---|---|
| P1 | Correction | prix erroné | « Sur la page Fiches du soir, le relevé Keur Massar affiche 300 FCFA — corrige-le à 350 FCFA. » | ✅ |
| P2 | Visuelle | bannière d'annonce | « Ajoute une bannière bleue sous le hero sur la page d'accueil avec le texte "Relevés du soir mis à jour chaque semaine" et l'emoji 📢. » | ✅ |
| P3 | Fonctionnelle | recherche temps réel | « Sur la page Fiches du soir, ajoute un champ de recherche en haut qui filtre les relevés par nom de quartier en temps réel. » | ✅ |

Règles respectées : 1 prompt = 1 modification, aucun échec, pas de boucle.
Protocole d'urgence du template non déclenché (Stop/Revert inutiles).

## S5 — Intégration MVP & RAG (1 octobre, L4)

### P1 Base RAG — Prompt structuré (E1/S1)

- Données : `releves-brt-s5.csv`, 7 en-têtes ligne 1, 8 lignes, < 1 Ko.
- Config : Généralités 300/50, Économique (index inversé), Top K 3.
- Tests : 3 directs ✅ (Ndiarème 600, Grand-Médine 3 chunks, Yoff Non),
  1 hors-base ⚠️ (index inversé remonte des matchs partiels — le garde-fou
  INSUFFISANT du Chercheur absorbe le cas).
- Note : 5/5. Base verte du premier import, chunking adapté aux lignes CSV.

### P2 Webhook — Prompt Lovable (E3)

- Prompt de `s5-webhook-prompt.md` : composant « Consulter l'agent IA »
  sur Fiches du soir, POST api.dify.ai/v1/workflows/run, Bearer côté
  serveur, `response.data.outputs` (notre workflow renvoie `fiche` ou
  `message_erreur`, pas `answer` — écart doc template noté).
- Résultat : « Hello » → INSUFFISANT ; Q1 → fiche Ndiarème 600 FCFA
  affichée. Pipeline bout-en-bout ✅.
- Note : 5/5.

### P3 Cohérence — Zero-Shot (S2)

- Q1/Q2 rejouées après re-pointage : ELSE → fiche Sam Notaire 500 FCFA,
  puis Ndiarème 600 FCFA selon chunks remontés (les deux relevés valides) ;
  Q2 poulet/Sandaga → INSUFFISANT motivé.
- Leçon : avec une phrase complète, l'index inversé peut rater la bonne
  ligne → diagnostiquer via TRACE/RÉCUPÉRATION avant de toucher au prompt.
- Note : 5/5.

### P4-P6 Itérations MVP code (1 octobre, hors Lovable)

Fichiers : `mvp/src/hooks/useVoiceInput.ts`, `mvp/src/lib/partage.ts`,
`mvp/src/lib/ficheAgent.ts`, `mvp/src/components/AgentFicheCard.tsx`,
`mvp/src/routes/fiches.tsx`, `mvp/src/components/FicheCard.tsx`.

| # | Type | Objectif | Changement | Résultat |
|---|---|---|---|---|
| P4 | Fonctionnelle | notes vocales | Hook `useVoiceInput` (Web Speech API `fr-FR`) + bouton 🎤 à côté du champ agent, transcript injecté dans la question, état Écoute/arrêt, erreur si non supporté | ✅ |
| P5 | Fonctionnelle | partage WhatsApp | `lib/partage.ts` (`wa.me/?text=` encodé) : bouton vert Partager sur chaque fiche + sous la réponse de l'agent | ✅ |
| P6 | Visuelle | résultat structuré | Parser `parseFicheAgent` (STATION/QUARTIER/PRIX/HEURE/SOURCES) → `AgentFicheCard` façon FicheCard ; repli texte brut si INSUFFISANT | ✅ |
| P7 | Correction | dépréciation API | `createServerFn().inputValidator()` → `.validator()` (warning Vite en `pnpm dev`) | ✅ |

- Vérifications : `tsc --noEmit` 0 erreur, eslint propre (avec `--fix`),
  `npm run build` OK (nitro/cloudflare).
- Note : 5/5 — 1 prompt = 1 correction, aucune régression sur le pipeline
  Dify (la clé reste côté serveur, aucun secret ajouté).
