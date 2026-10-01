# S5 — Prompt webhook Lovable — RelaisYoon

Source : `GET409_S5_Webhook_Tutoriel_et_Template.docx` (Tables 23-26 adaptées)

## Étape 1 — Récupérer l'URL et la clé (toi, navigateur)

1. Dify Studio → workflow `RelaisYoon_FicheCorrespondance_v1_RelaisYoon`
2. Publier → flèche → Accéder à la référence API
3. Noter l'URL : `https://api.dify.ai/v1/workflows/run` (identique pour tous)
4. Clé API → + Créer une nouvelle clé secrète → copier `app-xxxx`
   (visible une seule fois — la noter dans un bloc-notes, jamais sur GitHub)

## Étape 2 — Prompt à coller dans Lovable

Remplacer `[COLLER_TA_CLÉ_API_ICI]` par la clé de l'étape 1, puis coller :

````
Dans mon MVP RelaisYoon, ajoute une fonctionnalité de
consultation de l'agent IA sur la page Fiches du soir.

INTERFACE À AJOUTER :
1. Un champ de texte avec placeholder :
   "Quelle correspondance cherches-tu ce soir ? (ex : Petersen vers Guédiawaye)"
2. Un bouton bleu "Demander à l'agent 🚌"
3. Une zone de résultat sous le formulaire (fond gris clair)
4. Un spinner de chargement pendant la requête
5. Un message d'erreur rouge si la requête échoue

CONNEXION WEBHOOK DIFY :
URL : https://api.dify.ai/v1/workflows/run
Méthode : POST
Headers :
  Authorization: Bearer [COLLER_TA_CLÉ_API_ICI]
  Content-Type: application/json
Body JSON :
  {
    "inputs": {},
    "query": valeurDuChampTexte,
    "response_mode": "blocking",
    "user": "user-relaisyoon-" + Date.now()
  }

TRAITEMENT DE LA RÉPONSE :
- Succès : afficher response.data.outputs (le workflow renvoie soit
  "fiche", soit "message_erreur") dans la zone résultat
- Erreur réseau : "Service temporairement indisponible"
- Timeout (>10s) : "La réponse prend trop de temps — réessayez"

STYLE : cohérent avec le MVP bleu #1D4ED8. Responsive mobile.
````

## Étape 3 — Checklist (5 points)

☐ Section agent IA visible sur la page Fiches du soir
☐ Champ texte + bouton bleu fonctionnels
☐ Spinner visible pendant la requête
☐ Réponse de l'agent reçue (fiche OU message INSUFFISANT — les deux prouvent le pipeline)
☐ Pipeline complet : Lovable → Dify API → Agent → Réponse affichée ✅

## Dépannage (adapté)

| Problème | Solution |
|---|---|
| 401 Unauthorized | clé expirée/mal copiée → régénérer (sans espaces) |
| Réponse vide | notre workflow renvoie `outputs`, pas `answer` — ajuster le path |
| Timeout | vérifier que le workflow est bien publié (version à jour) |
| Composant absent | le prompt doit mentionner la page exacte « Fiches du soir » |

⚠️ Sécurité : clé visible dans le frontend = acceptable pour le prototype
de cours. Ne jamais commiter la clé sur GitHub.
