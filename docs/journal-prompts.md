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
