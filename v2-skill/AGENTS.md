# Séquence — landing page (03-landing)

Projet d'exercice : deux versions de la même page, à comparer côte à côte.
- `../v1-no-skill/index.html` — version de référence.
- `index.html` (ici) — même contenu, direction artistique appliquée.

## Aperçu

Ouvrir le fichier dans un navigateur : `google-chrome index.html`.
Pas de build, pas de serveur, pas de dépendance npm.

## Contenu autorisé

- Copie en français, une seule page, un seul fichier HTML autonome.
- Interdits : faux clients, faux témoignages, notes/étoiles, chiffres inventés.
  Les emplacements de projets restent écrits `[Projet à venir]`.
- Les deux versions gardent les mêmes sections et la même logique de quiz
  (secteur → format → budget → recommandation), sinon la comparaison ne vaut plus.
- Images générées : toujours légendées comme générées, jamais présentées comme
  des tournages réels.

## Règles de design (V2 uniquement)

Tokens dans `:root` : nuit `#0D0F14`, papier `#F5F2EA`, encre `#14161C`,
accents lime `#CDFF4F` et corail `#FF6B4A`, neutre gris `#8A8F98`,
et les 4 couleurs de format : lime `#CDFF4F`, corail `#FF6B4A`,
ciel `#7CC4FF`, violet `#B7A4FF`.

- Polices : Space Grotesk (titres) + Inter (texte), chargées par
  Google Fonts, avec repli système si le réseau est absent.
- Une couleur = un format : la même teinte code le même format dans le quiz,
  les services et le portfolio. Lime = action/CTA, corail = accent éditorial
  (un seul par section). Ne pas réutiliser une couleur à tort.
- Jamais de : capitales espacées en étiquette, points médians dans les méta,
  flèche « → » en fin de bouton, cartes arrondies identiques, numéros 01/02/03
  hors séquence réelle.
- Accessibilité : `:focus-visible` visible, contraste AA,
  `prefers-reduced-motion` neutralise la bande et les transitions.
- Responsive obligatoire à 360 px, sans scroll horizontal.

## Do / Don't

- **Do** : placeholders visibles `[Projet à venir]`, couleurs de format stables,
  `:focus-visible`, validation quiz/form/360 px avant de dire « terminé ».
- **Do** : forcer `loading="eager"` + `decode()` sur les images lazy avant capture.
- **Don't** : inventer clients, chiffres, prix ou délais ; cacher les placeholders.
- **Don't** : mots interdits (révolutionnaire, disruptif, leader, premium),
  capitales espacées, « → » en bouton, dépendance npm ou second fichier.

## Validation avant de dire « terminé »

1. Quiz de bout en bout, puis « Refaire le questionnaire ».
2. Formulaire vide → 4 messages d'erreur ; formulaire rempli → message envoyé.
3. `document.documentElement.scrollWidth === 360` rendu à 360 px de large.
4. Revoir la V1 (`../v1-no-skill/index.html`) pour comparer.
