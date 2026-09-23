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
