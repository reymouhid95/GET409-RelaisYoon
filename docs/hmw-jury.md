# Préparation Jury — HMW — RelaisYoon

## HMW Définitif

Comment pourrions-nous permettre à une usagère de Guédiawaye de savoir,
avant de descendre du BRT, si une correspondance part vers son quartier et
à quel prix, afin de ne plus finir le trajet à l'aveugle ?

## Les 5 Questions Probables

### Question 1

- Le jury demande : « Pourquoi pas une simple application mobile ? »
- Ce qu'il teste : la connaissance du persona et la rigueur des contraintes.
- Votre réponse : « Awa n'a plus de data trois semaines sur quatre. C'est
  la contrainte 2 : le MVP doit fonctionner sans connexion. Une appli
  l'exclut exactement quand elle en a besoin, le soir, en fin de mois. »
- Fichier à ouvrir : docs/contraintes-mvp.md — Contrainte 2.

### Question 2

- Le jury demande : « Quand il pleut, vos prix sont faux. À quoi bon ? »
- Ce qu'il teste : la robustesse face au risque terrain principal.
- Votre réponse : « C'est l'Hypothèse C2 : au-delà de 200 FCFA d'écart entre
  le relevé et le crié, le prix est marqué périmé et l'alerte A2 se
  déclenche. On préfère se taire qu'afficher faux — c'est écrit dans le
  script de démo. »
- Fichier à ouvrir : docs/hypotheses-validation.md — C2 ; docs/metriques-succes.md — A2.

### Question 3

- Le jury demande : « Pourquoi une seule usagère, un seul quartier ? »
- Ce qu'il teste : le cadrage — ni trop vague, ni trop large.
- Votre réponse : « Notre HMW a passé les 6 critères S2 : utilisatrice
  nommée, frustration dite en interview, périmètre d'un trajet réel.
  Élargir à tout Dakar, c'était la formulation écartée “fluidifier la
  mobilité”. On prouve sur un trajet, on étend après. »
- Fichier à ouvrir : docs/hmw-definitif.md — Validation contre les critères.

### Question 4

- Le jury demande : « Et si les chauffeurs refusent que vous affichiez
  leurs prix ? »
- Ce qu'il teste : les acteurs qui résistent, angle mort classique.
- Votre réponse : « C'est l'Hypothèse I1, classée importante : 5 soirs
  d'affichage test, entretiens avec 3 chauffeurs, zéro refus hostile
  exigé avant d'étendre. Si refus, on reste sur le canal SMS individuel,
  sans affichage public. »
- Fichier à ouvrir : docs/hypotheses-validation.md — I1.

### Question 5

- Le jury demande : « Concrètement, qu'est-ce qui change pour Awa ? »
- Ce qu'il teste : l'impact mesurable, pas l'intention.
- Votre réponse : « La Métrique Nord : 60 % des usagères interrogées savent
  avant la porte, contre zéro aujourd'hui — “personne ne me l'a dit dans
  le bus”. Mesurée à la descente, 10 usagères par semaine. »
- Fichier à ouvrir : docs/metriques-succes.md — Métrique Nord.

## Les 2 Questions Pièges

### Piège 1

- Le jury demande : « Tout repose sur une interview simulée de 5 minutes.
  C'est du vent, non ? »
- Pourquoi c'est un piège : il teste si l'équipe confond hypothèse et preuve.
- Stratégie : assumer la limite, montrer où elle est écrite, pointer le plan
  de validation. Ne jamais gonfler.
- Phrase d'ouverture : « Vous avez raison, c'est écrit noir sur blanc dans
  nos limites : interview simulée, hypothèse de S1. C'est exactement pour ça
  que C1 prévoit un test à la descente dès la semaine 1 de S3. »

### Piège 2

- Le jury demande : « Le BRT c'est le CETUD, les clandos c'est l'informel.
  Qui va vous laisser faire ? »
- Pourquoi c'est un piège : il teste la naïveté institutionnelle.
- Stratégie : citer le précédent officiel et la fenêtre de financement, puis
  l'option de repli sans affichage.
- Phrase d'ouverture : « Le rabattement R01A prouve qu'un opérateur peut
  publier une correspondance, et 100 millions de dollars financent la
  professionnalisation des informels. Et si l'affichage bloque, le SMS
  individuel reste — I1 prévoit les deux voies. »

## Réflexe en soutenance

Si vous ne savez pas répondre : « Bonne question — j'ouvre le fichier
correspondant dans notre dépôt pour vous montrer comment c'est documenté. »
