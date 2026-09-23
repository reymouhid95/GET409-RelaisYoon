# Script Démo S6 — RelaisYoon

## HMW à prouver

Comment pourrions-nous permettre à une usagère de Guédiawaye de savoir,
avant de descendre du BRT, si une correspondance part vers son quartier et
à quel prix, afin de ne plus finir le trajet à l'aveugle ?

## Matériel nécessaire

- Téléphone Android au forfait data vide (celui d'Awa ou équivalent).
- Laptop avec Dify ouvert — agent info correspondance configuré.
- Relevés du soir : départs et prix de la station, avec heures.

Note : le MVP se construit en S3. Les valeurs ci-dessous sont les cibles
de `metriques-succes.md`, à remplacer par les réelles avant la démo.

## Script — 5 minutes chrono

### Bloc 1 — La situation avant · 45 secondes

- Dire : « Hier, Awa est descendue du BRT sans savoir. Elle a demandé sur
  le quai, on lui a crié deux prix pour la même rue. Elle a choisi un visage
  et marché sous la pluie. Personne ne le lui avait dit dans le bus. »
- Montrer : la carte d'empathie, Pain 1 surligné.
- Le jury voit : le problème exact du HMW, pas une généralité.

### Bloc 2 — Le MVP en action · 2 minutes 30

- Dire : « Ce soir, avant que la porte s'ouvre, Awa reçoit ceci. »
- Montrer : le message sur le téléphone au forfait vide — départs, prix,
  heure de relevé, lus à voix haute.
- Le jury voit : une info datée sur un téléphone sans data.
- Dire : « Le prix porte son heure. S'il a plus d'une heure, il est marqué
  périmé. C'est la contrainte 3. »
- Montrer : un prix frais et un prix marqué périmé côte à côte.
- Le jury voit : le garde-fou contre le mensonge poli.

### Bloc 3 — Les métriques réelles · 1 minute

- Dire : « Sur 30 jours, voici nos chiffres. »
- Montrer : tableau de bord — Nord vs 60 %, P1 vs 15 actives, A1 oui/non.
- Le jury voit : des données de terrain, pas des intentions.

### Bloc 4 — La réponse au HMW · 45 secondes

- Dire : « Awa savait avant la porte, sans data, à quel prix et relevé
  à quelle heure. Elle n'a plus fini son trajet à l'aveugle. »
- Montrer : le HMW définitif affiché + la Métrique Nord.
- Le jury voit : la promesse de S1 tenue avec des chiffres.

## Questions jury anticipées

- Q : « Et s'il pleut et que les prix doublent ? » → R : « C'est
  l'Hypothèse C2. Au-delà de 200 FCFA d'écart, le prix est marqué périmé
  et l'alerte A2 se déclenche. On préfère se taire qu'afficher faux. »
- Q : « Pourquoi pas une appli ? » → R : « Contrainte 2 : Awa n'a plus
  de data trois semaines sur quatre. Une appli l'exclut. Le canal sans
  data est le produit, pas un pis-aller. »

## Signal de succès de la démo

La démo est réussie si un membre du jury lit le message sur le téléphone
sans data et cite départ, prix et heure sans aide.
