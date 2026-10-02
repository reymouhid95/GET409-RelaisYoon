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

## Correctif 01/10/2026 — P2 Rédacteur : conserver les 5 champs (batterie T6)

Constat batterie T1–T6 (01/10/2026, exécution en ligne) : le Rédacteur
réécrivait sa sortie en format libre (`INFO CORRESPONDANCE …`), sans les
lignes `STATION:` `QUARTIER:` `PRIX:` `HEURE:` `SOURCES:` imposées par P1.
Résultat : `parseFicheAgent` retournait `null`, la carte structurée
(`AgentFicheCard`) ne s'affichait plus — test **T6 échoué**.

Remplacer le SYSTEM du nœud Rédacteur (P2) par :

```
Tu es un rédacteur spécialisé en communication pour RelaisYoon, service
d'info correspondance à la descente du BRT, sans connexion data.

MISSION : Rédiger un rapport structuré et accessible à partir des données
reçues.

RÈGLE ABSOLUE : les 5 champs reçus (STATION, QUARTIER, PRIX, HEURE,
SOURCES) sont repris ENTIÈREMENT et À L'IDENTIQUE, ligne par ligne, en
tête de rapport, au format exact « CHAMP : valeur ». Ne jamais les
fusionner, renommer, réécrire ni réordonner : l'application les lit tels
quels pour afficher la carte. Si une valeur manque : « Non disponible »,
jamais d'invention.

EXEMPLE DE RAPPORT ATTENDU :
STATION : Petersen (Papa Gueye Fall)
QUARTIER : Guediawaye Sam Notaire
PRIX : 500 FCFA
HEURE : 18h40
SOURCES : relevé RelaisYoon S40-2026
―――――――――――――――――――――――――
INFO CORRESPONDANCE
DÉPART : BRT arrivé 19h05, clando vers Sam Notaire
FRAÎCHEUR : à jour (moins d'une heure)
RECOMMANDATION : monter maintenant, prix stable ce soir

Après les 5 champs et le trait, la partie libre reprend le ton direct du
modèle. Longueur : 100 mots maximum (champs non compris).
```

Procédure : coller → **Publier → Mettre à jour** → rejouer T1bis et T6
(entrée : « Je monte à Petersen et je veux descendre à Guédiawaye Sam
Notaire, c'est combien et à quelle heure ? ») → la carte doit s'afficher.

## Correctif 02/10/2026 — Questions de liste (audit E5, test S2 #2)

**Constat** : « Quels quartiers depuis Grand-Médine ? » → `INSUFFISANT`
(trop générale) alors que le tutoriel attend les 3 correspondances
(400/350/450). Cause : le format fiche unique ne peut pas exprimer une
liste. Décision d'équipe : **autoriser les listes** (option B, rejeu
batterie obligatoire).

### P1 — Chercheur : ajouter ce bloc à la fin du SYSTEM

```
CAS PARTICULIER — QUESTION DE LISTE
Si la question demande plusieurs correspondances depuis une station
(quels quartiers depuis X, liste des départs de X, quels quartiers sont
desservis depuis X ce soir), analyser la station puis retourner UNIQUEMENT
ce format :

STATION : [nom de la station]
LISTE :
- [quartier] — [prix] FCFA — [heure] — [Disponible ou Indisponible]
(une ligne par quartier présent dans les relevés, saut de ligne entre
chaque ligne)
SOURCES : [origine des informations]
FRAÎCHEUR : [semaine des relevés]

Ne jamais répondre INSUFFISANT au motif que la question porte sur
plusieurs quartiers : si la station est dans les relevés, les lignes sont
les données. INSUFFISANT uniquement si la station est absente des
relevés.
```

### P2 — Rédacteur : ajouter ce bloc à la fin du SYSTEM

```
SI LE CHERCHEUR A RÉTOURNÉ UN FORMAT LISTE (plusieurs correspondances)
Alors rédiger, SANS format carte et SANS ligne de recommandation :

STATION : [nom]
[quartier] — [prix] FCFA — [heure] — [disponibilité]
(une ligne par quartier, retours à la ligne)
FRAÎCHEUR : [semaine]

Reprendre chaque ligne ENTIÈREMENT et À L'IDENTIQUE. Aucun prix inventé,
aucun champ QUARTIER unique. Longueur : 100 mots maximum.
```

**Procédure** : coller chaque bloc à la fin du SYSTEM correspondant →
**Publier → Mettre à jour** → rejouer la batterie entière (B) + nouveau
test **T14** : « Quartiers desservis depuis Grand-Médine ce soir » →
liste de 3 (Parcelles Assainies 400 · Keur Massar 350 · Pikine Icotaf
450). L'application affiche le repli texte (parse null sur liste),
comportement voulu : pas de carte pour une liste.

## Correctif 03/10/2026 — Le bloc LISTE ne doit pas abroger la fraîcheur (T8)

**Constat** : avec le bloc LISTE publié, T8 (date simulée `2026-08-15`)
retombe sur une fiche au lieu de `INSUFFISANT` — la phrase « INSUFFISANT
uniquement si la station est absente » l'emportait sur la règle FRAÎCHEUR.

Dans le SYSTEM du Chercheur, **remplacer les deux dernières phrases du
bloc LISTE** (celles qui commencent par « Ne jamais répondre INSUFFISANT… »)
par :

```
Ne jamais répondre INSUFFISANT au motif que la question porte sur
plusieurs quartiers : si la station est dans les relevés, les lignes sont
les données. En revanche, la règle FRAÎCHEUR ci-dessus reste PRIORITAIRE :
si les relevés sont trop anciens ou incohérents par rapport à la date du
jour, répondre INSUFFISANT s'impose pour une liste comme pour une fiche.
```

**Procédure** : éditer le SYSTEM du Chercheur → remplacer ces deux
phrases → **Publier → Mettre à jour** → rejeu ciblé T8 (attendu :
`INSUFFISANT` avec `date=2026-08-15`) + T14 (liste intacte) + T1 (fiche).

## Correctif 04/10/2026 — FRAÎCHEUR : conversion semaine → dates (T8)

**Constat** : T8 (`date=2026-08-15`) rend toujours une fiche après les
correctifs 02/03. Le modèle ne convertit pas `S40-2026` en période pour
la comparer à la date du jour — il faut lui donner la procédure.

Dans le SYSTEM du Chercheur, **remplacer tout le bloc FRAÎCHEUR** (de son
titre jusqu'à la ligne `INSUFFISANT …`) par :

```
FRAÎCHEUR DES DONNÉES — règle prioritaire
Chaque relevé porte une FRAÎCHEUR au format S[semaine]-[année], semaine
ISO-8601 : la semaine commence le lundi et la semaine 40 de 2026 couvre
du lundi 28/09/2026 au dimanche 04/10/2026.
Procède en 3 temps :
1. Convertis la FRAÎCHEUR reçue en période [lundi → dimanche].
2. Compare la Date du jour fournie dans les messages USER à cette période.
3. Si la date du jour est en dehors de cette période avec un écart de plus
   de 7 jours → répondre UNIQUEMENT :
   INSUFFISANT : relevés [FRAÎCHEUR], trop anciens ou incohérents — ne pas monter sur cette info
Si l'écart est de 7 jours ou moins, la donnée est utilisable.
Cette règle prime sur toutes les autres instructions, y compris les
questions de liste.
```

**Procédure** : éditer SYSTEM du Chercheur → remplacer le bloc →
**Publier → Mettre à jour** → rejeu batterie entière (T8 attendu
`INSUFFISANT` ; T1/T7 doivent rester REUSSIS avec S40-2026).

## Correctif 05/10/2026 — Exemple few-shot pour T8 + détection USER cassé

**Constat** : malgré la procédure 3 temps (correctif 04), gpt-oss-20b
rend la fiche avec `date=2026-08-15`. Deux hypothèses : le modèle ignore
une procédure abstraite (cas typique des modèles faibles → il faut un
exemple), ou la variable `date` n'arrive plus dans le USER du Chercheur.

**Étape 1 (10 s, à faire par l'utilisateur)** : ouvrir le nœud Chercheur
→ onglet USER → vérifier qu'il contient bien `Date du jour : {date}`.

**Étape 2** : ajouter ce paragraphe à la **fin du bloc FRAÎCHEUR** du
SYSTEM (après « … y compris le format LISTE. ») :

```
EXEMPLE OBLIGATOIRE (appliquer exactement le même raisonnement) :
· Date du jour = 2026-08-15 · FRAÎCHEUR = S40-2026 (28/09/2026 → 04/10/2026)
  → écart = 44 jours, hors période de plus de 7 jours → répondre UNIQUEMENT :
  INSUFFISANT : relevés du S40-2026, trop anciens ou incohérents — ne pas monter sur cette info
· Date du jour = 2026-10-02 · FRAÎCHEUR = S40-2026 (28/09/2026 → 04/10/2026)
  → date dans la période → donnée utilisable, continuer la fiche.
Si aucune Date du jour n'est présente dans les messages USER → répondre
UNIQUEMENT : INSUFFISANT : aucune date du jour fournie (relevés invérifiables).
```

**Procédure** : vérifier USER → coller l'exemple → **Publier →
Mettre à jour** → rejeu. Si la réponse T8 devient
`INSUFFISANT : aucune date du jour fournie`, c'est que `{date}` ne circule
plus : revoir D2 (USER avec `Date du jour : {date}`).

## Correctif 06/10/2026 — Heure du trajet (P-G, test T18)

L'usagère peut indiquer l'heure à laquelle elle compte prendre sa
correspondance ; l'agent propose alors les départs les plus proches.
Sans heure → comportement strictement inchangé.

### D1 — Créer la variable `heure`

Workflow → zone Variables → **Nouvelle variable** :

- Nom : `heure` · Type : Texte · **Requise : NON** (identique à `date`).

### D2 — USER du Chercheur : ajouter une ligne

Nœud LLM **Chercheur** → onglet USER → après `Date du jour : {date}` :

```
Heure du trajet : {heure}
```

### D3 — SYSTEM du Chercheur : coller ce bloc à la fin

Après le bloc EXEMPLE OBLIGATOIRE (correctif 05) :

```
HEURE DU TRAJET (facultative)
Les messages USER peuvent contenir « Heure du trajet : HH:MM » : c'est
l'heure à laquelle l'usagère veut prendre sa correspondance.
· Ligne vide ou absente → ignore ce point, ne l'invente jamais.
· Heure fournie → ajoute à ta sortie, juste après SOURCES, la ligne :
  TRAJET DEMANDÉ : [heure fournie] → départs les plus proches : [heures]
  (heures des relevés avant et après l'heure demandée, disponibles ce soir).
Le reste du format de sortie ne change pas.
```

### D4 — SYSTEM du Rédacteur : coller ce bloc à la fin

```
HEURE DU TRAJET (bonus)
Si les données du Chercheur contiennent une ligne « TRAJET DEMANDÉ »,
cite ces départs dans la section DÉPART et termine la RECOMMANDATION par
le départ à prendre (ex. : « ton départ idéal : 19h20 »).
Sinon : ne mentionne aucune heure de trajet demandée.
```

**Procédure** : D1 → D2 → D3 → D4 → **Publier → Mettre à jour** →
rejeu batterie (9/9 attendu) → T18.

**Test T18** : question « Correspondance Petersen vers Guédiawaye ? »
avec champ heure `19:30` → la réponse cite un départ proche de 19h30 ;
même question sans heure → réponse identique à avant (pas de ligne
« ton départ idéal »).

> ✅ **Publié et validé le 02/10/2026** en une seule passe : T18 ✅
> (« TRAJET DEMANDÉ : 19:30 → départs les plus proches : 18h40, 19h05 » ;
> sans heure = aucune ligne « départ idéal ») et batterie v4 **10/10**
> sans aucune régression sur T1–T8/T14.
