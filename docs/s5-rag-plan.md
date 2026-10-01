# S5 — Plan RAG adapté — RelaisYoon

Sources : `GET409_S5_RAG_Tutoriel_et_Template (1).docx`, `GET409_S5.pptx`,
`GET409_S5_Lovable_v2 (1).pptx`, `GET409_S5_Handout.pptx`

## Fiche d'identité

| Champ | Valeur |
|---|---|
| Équipe | RelaisYoon |
| Base créée | `RelaisYoon_KB_v1` — Dify Connaissance |
| Documents | `releves-brt-s5.csv` (8 lignes) + `releve-test-s3.md` (optionnel) |
| Mode d'index | Économique · Index inversé (Texte Intégral) · Top K = 3 |
| Chunking | Longueur 300 · Chevauchement 50 (données courtes, lignes CSV) |
| Nœud existant | RÉCUPÉRATION → re-pointer vers `RelaisYoon_KB_v1` |
| Résultat visé | L'agent répond avec les prix/heures réels du CSV |

## Étape 1 — Préparer : déjà fait

`docs/releves-brt-s5.csv` : en-têtes ligne 1
(Station,Quartier,Prix_FCFA,Heure,Disponibilite,Semaine,Source),
séparateur virgule, 8 lignes, < 1 Ko. Cohérent avec les relevés S3
et les 6 fiches du MVP Lovable.

## Étape 2 — Créer la base dans Dify (toi, navigateur)

1. Connaissance → + Créer → Importer à partir d'un fichier →
   uploader `releves-brt-s5.csv`
2. Segmentation Généralités : longueur 300, chevauchement 50
3. Mode d'index : **Économique** (plan gratuit — Index inversé)
4. Enregistrer & Traiter → attendre INTÉGRATION TERMINÉE
5. Renommer la base `RelaisYoon_KB_v1` (… → Paramètres)
6. Vérifier Documents → 🟢 Disponible

> Écart assumé vs template : les handouts recommandent aussi
> `text-embedding-ada-002` (Haute Qualité), mais le sandbox a 0 crédit
> et aucun modèle d'embedding disponible (incident S3 documenté).
> Le Template RAG lui-même prescrit le mode Économique sur plan gratuit.

## Étape 3 — Tester AVANT de connecter (Test de Récupération)

| # | Question test | Résultat attendu |
|---|---|---|
| 1 | prix Petersen Ndiarème | Chunk Prix 600 FCFA ✅ |
| 2 | quels quartiers sont desservis depuis Grand-Médine | Chunks Parcelles, Keur Massar, Pikine ✅ |
| 3 | quartier indisponible | Chunk Yoff · Non ✅ |
| 4 | prix du pétrole en FCFA (hors-base) | aucun chunk ou score faible ✅ |

## Étape 4 — Re-pointer le nœud du workflow

1. Studio → `RelaisYoon_FicheCorrespondance_v1_RelaisYoon`
2. Nœud RÉCUPÉRATION → remplacer l'ancienne base par `RelaisYoon_KB_v1`
3. Vérifier : TEXTE DE LA REQUÊTE = Début · query ;
   CHERCHEUR · CONTEXTE = Récupération · result ;
   message USER du Chercheur = query + contexte
4. Publier une mise à jour → Exécuter test Q1 → fiche avec prix du CSV

> Écart assumé vs tutoriel RAG : le tuto ajoute `{{#context#}}` dans le
> SYSTEM du Chercheur. Nous gardons l'injection par message USER via {x}
> (règle du Template S3 : aucune variable dans les SYSTEM). Équivalent
> fonctionnel, conforme au barème S3.

## Dépannage (adapté de la table 29)

| Problème | Solution |
|---|---|
| Test de récupération vide | mots trop différents du CSV → utiliser les mots exacts du fichier |
| Agent ignore la base | vérifier `RelaisYoon_KB_v1` dans CONNAISSANCES du nœud RAG |
| Réponses hors-sujet | chunk size trop grand → réduire à 200, reformater le CSV |
