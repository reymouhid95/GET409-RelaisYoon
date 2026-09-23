# Contraintes MVP — RelaisYoon

## Persona

Awa Diop, 34 ans, employée de maison, Guédiawaye. Android au forfait data
épuisé avant la paie. Chaîne réelle : marche, BRT, puis clando ou car rapide.

## Contraintes Non Négociables

### Contrainte 1

- Critère : Le MVP DOIT informer avant la descente, pas sur le quai.
- Origine : Chapeau Blanc (la descente est prévisible toutes les 6 minutes,
  la correspondance ne l'est pas) + verbatim « Personne ne me l'a dit
  dans le bus ».
- Élimine : tout affichage consultable uniquement après être descendue.

### Contrainte 2

- Critère : Le MVP DOIT fonctionner sans connexion data.
- Origine : Chapeau Noir (l'appli BRT meurt avec le forfait, trois semaines
  sur quatre).
- Élimine : application mobile, carte temps réel en ligne, notifications push.

### Contrainte 3

- Critère : Le MVP NE DOIT PAS afficher un départ ou un prix sans son heure
  de relevé.
- Origine : Chapeau Noir (une info fausse fait rater la vraie voiture ;
  la pluie périme les prix du matin).
- Élimine : prix sans heure, départs théoriques présentés comme garantis.

### Contrainte 4

- Critère : Le MVP DOIT fonctionner là où rien n'est publié.
- Origine : Chapeau Blanc (seule la correspondance R01A de Petersen est
  documentée ; ailleurs, le vide).
- Élimine : toute solution qui suppose une base de correspondances complète
  dès le premier jour. Le MVP démarre là où il y a au moins un relevé.

## Fonctionnalités Éliminées

- Application de suivi des clandos en temps réel → éliminée (donnée
  inexistante, data requis).
- Prix du trajet sans heure de relevé → éliminé (mensonge poli quand
  il pleut).
- Paiement ou réservation dans le MVP → éliminé (hors problème : Awa veut
  savoir, pas réserver).
- Couverture de tout Dakar au lancement → éliminée (commencer par les
  stations où un relevé existe).

## Critère de Validation Final

Le MVP est valide si et seulement si Awa sait, avant que la porte du bus
s'ouvre et sans data, si une voiture part vers son quartier, à quel prix
relevé à quelle heure.
