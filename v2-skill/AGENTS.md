# ATA suarl — landing page (03-landing)

Projet d'exercice : deux versions de la même page, à comparer côte à côte.
- `../v1-no-skill/index.html` — version de référence, volontairement générique.
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

## Règles de design (V2 uniquement)

Tokens dans `:root` : ocean `#0F3B4F`, paper `#EEF1EE`, encre `#123039`,
et les 4 couleurs de service : sun `#F4B942`, coral `#EF5B39`, sea `#3FBF9A`, sky `#6FC2E0`.

- Polices : Bricolage Grotesque (titres) + Newsreader (texte), chargées par
  Google Fonts, avec repli système si le réseau est absent.
- Une couleur = un métier : la même teinte code le même métier dans le quiz,
  les services et le portfolio. Ne pas réutiliser une couleur à tort.
- Jamais de : capitales espacées en étiquette, points médians dans les méta,
  flèche « → » en fin de bouton, cartes arrondies identiques, numéros 01/02/03
  hors séquence réelle.
- Accessibilité : `:focus-visible` visible, contraste AA,
  `prefers-reduced-motion` neutralise la bande et les transitions.
- Responsive obligatoire à 360 px, sans scroll horizontal.

## Validation avant de dire « terminé »

1. Quiz de bout en bout, puis « Refaire le questionnaire ».
2. Formulaire vide → 4 messages d'erreur ; formulaire rempli → message envoyé.
3. `document.documentElement.scrollWidth === 360` rendu à 360 px de large.
4. Revoir la V1 (`../v1-no-skill/index.html`) pour comparer.
