# Script Démo S6 — RelaisYoon (10 min)

Grille officielle : **C1/4 · C2/2 · C3/2** — source `s5-prompts-adaptes.md` § S5.
Chaque partie : script orateur (mots à dire) + écran montré + question jury anticipée.

## Matériel — J-1 et 5 min avant

- Onglet 1 : app en ligne (page agent, connecté).
- Onglet 2 : Dify — workflow `RelaisYoon_FicheCorrespondance_v1_RelaisYoon`,
  dernière TRACE déjà ouverte (panne ou lenteur sandbox le jour J).
- Onglet 3 : `releves-brt-s5.csv` ouvert (8 lignes, colonnes visibles).
- Onglet 4 : schéma `docs/s5-l3-schema.svg`.
- Téléphone de secours avec l'app (test croisé, comme le 02/10).
- Vérifier : point vert Dify + 1 réponse réelle en amont. Sinon → Plan B.

---

## Partie 1 — Problème + valeur (30 s) · C1

**Script orateur :**

> « Awa, 34 ans, descend du BRT à Petersen chaque soir. Elle doit savoir,
> avant que la porte s'ouvre, si une correspondance part vers son quartier
> et à quel prix — sinon elle finit son trajet à l'aveugle. On a interrogé
> dix usagers : "Personne ne me l'a dit dans le bus." Le MVP répond à cette
> seule question, avec une donnée qui ne ment pas. »

**Écran montré :** HMW définitif (`hmw-definitif.md`, énoncé surligné).

**Question jury anticipée :**
« Pourquoi cette question et pas une carte des bus ? »
→ R : c'est le HMW de S1, validé par interview (persona Awa, verbatim
« Personne ne me l'a dit dans le bus »). Une carte répond à "où", pas à
"est-ce que je peux monter maintenant, et à quel prix".

---

## Partie 2 — MVP live, 3 clics (3 min) · C2

**Clic 1 — la fiche.** Dire :

> « Clic 1 : elle tape sa correspondance. »

Cliquer l'amorce `Petersen vers Guédiawaye`. Montrer : station, prix
**500 FCFA**, relevé **18h40**, badge **« Données du S40-2026 »**, bouton
Partager sur WhatsApp.

> « Le prix porte sa semaine de relevé. Le badge, c'est P-A : on ne dit
> jamais "à jour", on dit quand c'était relevé. »

**Clic 2 — l'écoute.** Dire :

> « Clic 2 : elle lit peu, elle écoute. »

Cliquer **🔊 Écouter** → la fiche est lue à voix haute en français
(station, prix, relevé, fraîcheur). Clic sur **Arrêter**.

> « Une voix française ou le bouton n'existe pas. Jamais de bouton muet. »

**Clic 3 — le refus.** Dire :

> « Clic 3 — le garde-fou : elle cherche ce qu'on n'a pas. »

Poser `Station inexistante XYZ` (testé en T12) →
afficher la réponse **INSUFFISANT** (pas de prix inventé), avec Écouter et
Partager. Puis montrer le bloc **« Mes 3 derniers trajets »** (3 lignes,
plus récente en tête) et cliquer **Effacer**.

> « Se taire plutôt qu'afficher faux. Et l'historique ne survit pas à la
> fermeture de l'onglet — rien n'est stocké. »

**Écran montré :** app en ligne uniquement (page agent).

**Question jury anticipée :**
« Et sans data, ça marche ? »
→ R : le MVP web nécessite du réseau — c'est un choix assumé pour la
validation sur le tronçon. Le canal sans data du pitch est le partage
WhatsApp (la fiche part en message) ; l'intégration SMS/USSD est le
prochain raccord, hors MVP.

---

## Partie 3 — RAG live : Q1 → fiche avec prix CSV (4 min) · C2

**Étape 1 — la question.** Dire :

> « Q1 : "Prix Petersen vers Ndiarème ce soir ?" »

Poser la question dans l'app → fiche **600 FCFA, relevé 18h45**.

**Étape 2 — d'où vient le prix.** Basculer sur le CSV, montrer la ligne :

> « `Petersen, Guediawaye Ndiarème, 600, 18h45, Oui, S40-2026` — huit
> relevés de terrain, pas des prix piochés par le modèle. »

**Étape 3 — ce que le modèle a reçu.** Ouvrir la TRACE Dify du run,
montrer dans l'entrée USER :

> « `{query}` + `Date du jour : 2026-10-02` — la date est dans USER,
> jamais dans le SYSTEM. Le Chercheur compare à la colonne Semaine :
> écart > 7 jours → INSUFFISANT. »

Puis la sortie : les 6 champs (`STATION… FRAÎCHEUR`) que l'app parse en
carte.

**Étape 4 — le modèle.** Dire :

> « Workflow Dify, `gpt-oss-20b` via Groq, base RelaisYoon_KV en
> Recherche Texte Intégral : la recherche se fait dans nos relevés, la
> génération ne fait que mettre en forme. Le point vert dit que le
> pipeline vit. »

**Écran montré :** app → CSV → Dify TRACE → schéma en onglet (transition
vers partie 4).

**Questions jury anticipées :**
- « Le modèle peut inventer un prix ? » → R : pas s'il trouve la donnée ;
  si elle est absente ou périmée, la règle D3 impose `INSUFFISANT` —
  testé (T8 : date simulée 15/08 → refus motivé). L'échec le plus cher
  est un faux prix, on construit contre.
- « Ces prix sont d'où ? Sont-ils fiables ? » → R : relevés terrain
  RelaisYoon, une semaine donnée (S40-2026), sources dans chaque fiche.
  C'est pour ça que la date est affichée en clair : l'usagère juge.

---

## Partie 4 — Schéma + conclusion (2,5 min) · C3

**Script orateur :**

> « Tout ce que vous venez de voir tient en cinq blocs : le MVP sur
> Cloudflare Workers capte la question, l'envoie en webhook au workflow
> Dify, l'agent Rêve cherche dans la base de relevés, renvoie six champs
> que l'application affiche en carte — avec sa date de fraîcheur. Trois
> fonctionnalités cette session : fraîcheur affichée, mémoire de session
> volatile, lecture vocale française. »

Puis, sur l'écran éthique (note ou slide) :

> « Deux risques ont été écrits avant le code : le prix périmé — réglé
> par le badge et le refus automatique — et l'historique de trajets laissé
> derrière soi — réglé par la mémoire volatile, purgée au rechargement.
> On préfère se taire qu'afficher faux. »

**Clôture (20 s) :**

> « Awa sait, avant la porte, le prix et sa date. La promesse de S1 tient :
> même réponse sur mon téléphone et sur l'écran. »

**Écran montré :** `s5-l3-schema.svg` (MVP → Webhook → Agent → RAG →
Base), puis la note d'éthique (`reflexion-ethique-s3.md`).

**Question jury anticipée :**
« Les données sont où, qui y a accès ? »
→ R : base CSV versionnée dans le dépôt, pas de donnée personnelle
collectée (pas de compte, pas de tracking) ; l'historique reste dans le
navigateur et meurt avec l'onglet. Aucune clé API côté client.

---

## Questions jury supplémentaires (file d'attente)

- **« Pourquoi pas une app native ? »** → Contrainte 2 : data précaire.
  Le web + WhatsApp partagé couvre le cas d'usage ; une app à installer
  exclut l'usage de dépannage.
- **« Et si Groq tombe en panne ? »** → Modèle documenté comme « à
  surveiller », plan de secours Gemini écrit (documentation), + Plan B
  plus bas le jour J.
- **« Combien ça coûte ? »** → Dify sandbox + Workers plan gratuit
  pendant le MVP ; coût de mise à l'échelle = hébergement Dify
  auto-hébergé, chiffrage en S7.
- **« Vous êtes 3 au lieu de 4 ? »** → Oui, écart assumé et documenté
  (`fiche-equipe.md`), les rôles restent couverts.
- **« Les chauffeurs vont-ils mentir sur les prix ? »** → Risque 2 de la
  note d'éthique : pas de nom de chauffeur, message « prix constatés,
  non imposés » ; l'usagère voit l'heure du relevé et juge.

---

## Plan B — panne API le jour J (déjà prévu)

3 réponses simulées collées en direct (ton professionnel, 15 s d'excuse :
« Le service temps réel est momentanément indisponible — voici les
derniers relevés validés. ») :

1. « Prix Petersen vers Ndiarème ce soir ? » → fiche **600 FCFA**,
   relevé 18h45.
2. « Quartiers depuis Grand-Médine ? » → Pikine Icotaf **450** (19h00),
   Parcelles Assainies **400** (18h30), Keur Massar **350** (18h35) —
   tous disponibles. (Ordre du run réel T14 du 02/10 — le Plan B copie
   le comportement live, jamais l'inverse.)
3. « Correspondance vers Yoff ? » → **INSUFFISANT** : aucune
   correspondance disponible ce soir. (Préférer `Station inexistante XYZ`
   si le run live a montré Yoff en fiche — ne jamais s'écarter du Plan B
   sans l'avoir testé la veille.)

Copie exacte du format des 6 champs (mêmes que le parseur).

---

## Signal de succès de la démo

Un membre du jury, sans aide, cite **prix + date de relevé** d'une fiche
qu'on vient de poser — et demande si l'INSUFFISANT est vraiment refusé
(signe que le garde-fou a été compris).
