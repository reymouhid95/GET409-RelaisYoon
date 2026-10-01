# S5 — Bibliothèque de prompts adaptée — RelaisYoon

Source : `GET409_S5_Prompts.docx` (E1-E5 enseignants, S1-S6 étudiants).
GreenSprint → RelaisYoon, Bolt → Lovable, CSV prix légumes → CSV relevés BRT.

## E1 — Construire la base (script démo Dify)

Knowledge → + Créer → nom `RelaisYoon_KB_v1`, type Text → Importer
`docs/releves-brt-s5.csv` → Chunking 300 / Overlap 50 → Index Économique
→ Save & Process → statut Disponible → Testing : « prix Petersen Ndiarème ».

## E2 — Diagnostiquer le chunking (Claude.ai)

« Notre base RAG RelaisYoon ne retourne pas les bonnes réponses.
Config : chunk 300 / overlap 50 / index Économique (plan gratuit Dify,
embedding indisponible). Question test : [votre question].
Réponse obtenue : [ce que l'agent répond]. Réponse attendue : [voulu].
Analyse et suggère : 1. paramètres optimaux pour notre CSV relevés,
2. reformattage des données si besoin, 3. Top K / seuil à utiliser,
4. comment vérifier la correction. »

Référence : CSV lignes courtes → 200-300 tokens ; overlap 50 ; Top K 3.

## E3 — Webhook Lovable → voir `s5-webhook-prompt.md` (prompt prêt à coller).

## E4 — Diagnostiquer le pipeline (CoT, Claude.ai)

« Notre pipeline RAG RelaisYoon a un problème : [symptôme exact].
Analyse étape par étape : 1. base (Disponible ? Testing OK ? chunks
contenus ?). 2. connexion (base bien dans CONNAISSANCES du nœud ?
Top K 3 ? Seuil ≤ 0.7 ?). 3. prompt (le Chercheur reçoit-il query +
contexte par messages USER ?). 4. données (CSV ≤ 15 MB, en-têtes ligne 1 ?).
Pour chaque étape : diagnostic + action corrective. »

## E5 — Audit qualité avant S6 (Claude.ai)

« Audite notre pipeline RAG RelaisYoon, note /5 par dimension.
Système : MVP https://relaisyoon.lovable.app — Base RelaisYoon_KB_v1
(releves-brt-s5.csv, 8 lignes) — Workflow RelaisYoon_FicheCorrespondance.
D1 Précision : Q1 "Prix Petersen vers Ndiarème ce soir ?" Q2 "Quels
quartiers depuis Grand-Médine ?" Q3 "Y a-t-il une correspondance vers
Yoff ?" D2 Sources : les chunks remontés sont-ils les bons ?
D3 Limites : Q4 "Météo Dakar demain ?" Q5 "Prix du poulet ?" → l'agent
doit dire INSUFFISANT. D4 Intégration MVP : affichage OK dans Lovable ?
Résultat : note /20 + 3 priorités avant S6. »

## S1 — Préparer les documents (déjà fait : releves-brt-s5.csv)

Si nouveaux relevés terrain : restructurer en CSV avec les mêmes 7 en-têtes,
identifier données manquantes/incohérentes avant upload.

## S2 — Tester la base

Tests : 1. directe « prix Petersen Ndiarème » → chunk 600 FCFA.
2. indirecte « quels quartiers depuis Grand-Médine ? » → 3 chunks.
3. statut « quartier indisponible » → Yoff Non.
4. hors-base « prix du pétrole » → vide ✅.

## S3 — Affiner le webhook (Lovable)

Améliorations possibles après le prompt E3 : 1. spinner de typing
(3 points clignotants). 2. afficher la fiche en carte stylée
(station / quartier / prix / heure). 3. historique des 3 dernières
questions + bouton effacer. 4. clavier : Entrée = soumettre.

## S4 — Note d'éthique RAG (brouillon pour S6)

Système : relevés BRT du soir (station, quartier, prix, heure) —
base Cloud Dify — webhook depuis relaisyoon.lovable.app —
usagers : voyageurs BRT Dakar.
1. Biais : base centrée Petersen/Grand-Médine → quartiers non couverts
   (ex. Rufisque) ignorés → diversifier les relevés, documenter les lacunes.
2. Confidentialité : aucune donnée personnelle dans le CSV (stations et
   prix publics) — maintenir cette règle, loi sénégalaise 2008-12.
3. Fiabilité : prix périmé → usager qui rate sa correspondance. Mitigations :
   heure de relevé affichée sur chaque fiche + règle INSUFFISANT.
4. Impact : affichage public des prix peut braquer chauffeurs/taximen →
   formuler en « relevé constaté », pas en tarif officiel.
Recommandation par risque dans `reflexion-ethique-s3.md` à compléter en S6.

## S5 — Démo S6 (10 min, grille C1/4 C2/2 C3/2)

1. Problème + valeur (30 s). 2. MVP live, 3 clics (3 min).
3. RAG live : Q1 → fiche avec prix CSV (4 min).
4. Schéma MVP→Webhook→Agent→RAG→Base + conclusion (2,5 min).
Par partie : script orateur + écran montré + question jury anticipée.

## S6 — Plan B (panne API le jour J)

3 réponses simulées copier-coller :
Q1 « Prix Petersen vers Ndiarème ce soir ? » → fiche 600 FCFA, relevé 18h45.
Q2 « Quartiers depuis Grand-Médine ? » → Parcelles 400, Keur Massar 350,
Pikine 450 — tous disponibles.
Q3 « Correspondance vers Yoff ? » → INSUFFISANT : aucune correspondance
ce soir vers Yoff.
+ message d'excuse 15 s, ton professionnel.
