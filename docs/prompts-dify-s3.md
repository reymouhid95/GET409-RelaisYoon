# Prompts Dify S3 — RelaisYoon

Conformes au Template Étudiant S3 (juin 2026). Règles du template respectées :
températures 0,3 / 0,7, INSUFFISANT en capitales, et surtout : **aucune
variable écrite dans les SYSTEM** — les variables passent par des messages
USER via {x}.

Écart modèle (23 septembre 2026) : le Template impose Llama-3.1-8b-instant,
mais le fournisseur répond 404 `model_not_found` au run. Repli : tout autre
modèle proposé comme configuré dans le workspace (ex. gpt-5 vu dans la
liste), en gardant les températures. Prompts inchangés.

Nom du Workflow : `RelaisYoon_FicheCorrespondance_v1_RelaisYoon`

## Architecture réelle (29 septembre 2026)

DÉBUT (query) → RÉCUPÉRATION DE CONNAISSANCES (releve-test-s3.md)
→ CHERCHEUR → SI/SINON (Chercheur · text contient INSUFFISANT)
→ IF : Sortie « message erreur » (Chercheur · text)
→ ELSE : RÉDACTEUR → Sortie 2 « fiche » (Rédacteur · text)

Modèles : gpt-oss-20b via Groq sur les deux nœuds (écart documenté : llama
404, puis 0 crédits sandbox pour gpt-5).
Variables par messages USER via {x}, jamais dans les SYSTEM.
Sortie du nœud Récupération injectée dans le USER du Chercheur.
Indexation : le modèle d'embedding est indisponible dans le sandbox
(0 crédits) — la base `releve-test-s3` a été recréée en **Recherche
Texte Intégral** (aucun embedding requis), segmentée par ligne ; le nœud
Récupération pointe cette nouvelle base.

## P1 — SYSTEM Chercheur (Zero-Shot structuré)

Coller dans SYSTEM. Puis ajouter un message USER portant la variable
Debut · query ( badge sans triangle orange ).

```
Tu es un analyste spécialisé en mobilité urbaine au Sénégal pour RelaisYoon,
service d'info correspondance à la descente du BRT, sans connexion data.

MISSION : Analyser la question ci-dessous et collecter toutes les données
disponibles.

PROCESSUS EN 3 ÉTAPES :
1. ANALYSER la question :
   - Station de descente
   - Quartier de destination
   - Heure du trajet
2. RECHERCHER les données sur :
   - Registre des relevés du soir (station, quartier, prix, heure)
   - Horaires et cadence du BRT
   - Perturbations signalées (pluie, trafic)
3. ÉVALUER si les données sont suffisantes

FORMAT DE SORTIE OBLIGATOIRE :
Si données SUFFISANTES — retourner :
STATION : [valeur]
QUARTIER : [valeur]
PRIX : [valeur]
HEURE : [heure du relevé]
SOURCES : [origine des informations]

Si données INSUFFISANTES — retourner UNIQUEMENT :
"INSUFFISANT : [raison précise en 1 phrase]"
```

## P2 — SYSTEM Rédacteur (Few-Shot : exemple fourni)

Coller dans SYSTEM. Puis ajouter un message USER portant la variable
Chercheur · text ( badge sans triangle orange ).

```
Tu es un rédacteur spécialisé en communication pour RelaisYoon, service
d'info correspondance à la descente du BRT, sans connexion data.

MISSION : Rédiger un rapport structuré et accessible à partir des données
reçues.

EXEMPLE DE RAPPORT ATTENDU :
――――――――――――――――――――――――
INFO CORRESPONDANCE
Guédiawaye · relevé 18h40
――――――――――――――――――――――――
DÉPART : BRT arrivé 18h52, clando vers Sam Notaire
――――――――――――――――――――――――
PRIX + HEURE : 500 FCFA, relevé à 18h40
――――――――――――――――――――――――
FRAÎCHEUR : à jour (moins d'une heure)
――――――――――――――――――――――――
RECOMMANDATION : monter maintenant, prix stable ce soir
――――――――――――――――――――――――

SUR CE MODELE, rédige le rapport pour les données reçues.
Si une donnée manque : indiquer Non disponible.
Ton : direct. Longueur : 100 mots maximum.
```

## P3 — Test de run

- Question 1 (précise, doit aller au Rédacteur) :
  « Départs vers Guédiawaye ce soir et prix ? »
- Question 2 (vague, doit déclencher INSUFFISANT et aller à SORTIE) :
  « transport »

## Câblage des sorties (Correctif Dify S3)

- Branche IF → nœud Réception « message erreur » : insérer Chercheur · text
  (taper { ou / dans le champ, variable en surbrillance bleue).
- Branche ELSE → nœud Réception « Sortie 2 » : insérer Rédacteur · text.
- Sans variable insérée dans chaque Réception, la publication est bloquée.
