# Hypothèses de Validation — RelaisYoon

## HMW Définitif (provisoire, en attente de P-HMW)

Comment pourrions-nous permettre à une usagère de Guédiawaye de savoir,
avant de descendre du BRT, si une correspondance part vers son quartier et
à quel prix, afin de ne plus finir le trajet à l'aveugle ?

## Hypothèses CRITIQUES

Si fausse → le MVP ne fonctionne pas.

### Hypothèse C1

- Affirmation : Nous croyons qu'Awa comprend une info correspondance
  (départ + prix + heure de relevé) sans formation préalable.
- Indicateur : Nous le saurons si 4 usagères sur 5 expliquent l'info
  correctement en moins de 30 secondes, sans explication.
- Méthode : test à la descente, carte prototype en main.
- Qui valide : usagères du BRT vers les quartiers.
- Délai S3 : semaine 1.

### Hypothèse C2

- Affirmation : Nous croyons que l'info reste utilisable le soir malgré
  la volatilité (pluie, prix doublés).
- Indicateur : Nous le saurons si l'écart entre le prix relevé et le prix
  crié reste sous 200 FCFA sur 5 soirs consécutifs à la même station.
- Méthode : relevés comparés à heure fixe, carnet de terrain.
- Qui valide : membre de l'équipe à la station.
- Délai S3 : semaines 1-2.

### Hypothèse C3

- Affirmation : Nous croyons qu'Awa consulte l'info alors que son forfait
  data est vide.
- Indicateur : Nous le saurons si 3 usagères sur 5 au forfait vide accèdent
  à l'info par le canal sans data (SMS, USSD, affichage, annonce).
- Méthode : test avec téléphones au forfait épuisé.
- Qui valide : usagères en fin de mois.
- Délai S3 : semaine 2.

## Hypothèses IMPORTANTES

Si fausse → l'expérience est dégradée mais le MVP reste utilisable.

### Hypothèse I1

- Affirmation : Nous croyons que les chauffeurs et rabatteurs acceptent
  que leurs prix soient affichés.
- Indicateur : Nous le saurons si aucun refus hostile n'est observé sur
  5 soirs d'affichage test.
- Méthode : entretien direct avec 3 chauffeurs de la station.
- Qui valide : chauffeurs et rabatteurs.
- Délai S3 : semaines 2-3.

## Hypothèses SECONDAIRES

À valider après le MVP.

### Hypothèse S1

- Affirmation : Nous croyons que des correspondantes de quai peuvent tenir
  une ardoise des prix à jour chaque soir.
- Indicateur : ardoise exacte 4 soirs sur 5 sans relance de l'équipe.
- Méthode : pilote avec 1 correspondante volontaire.
- Qui valide : correspondante + contrôle équipe.
- Délai : post-MVP.

## Priorité de Validation S3

La première chose à tester en S3 : une usagère au forfait vide comprend-elle
l'info correspondance sans aucune explication (C1 + C3 combinés, un seul test
à la descente) ?
