# Réflexion Éthique S3 — RelaisYoon (L4)

Générée avec le prompt éthique du Template S3 (raisonnement étape par étape),
placeholders remplacés par RelaisYoon. 178 mots.

## Risque 1 — Le prix périmé qui fait rater le trajet

Scénario : l'agent affiche un prix relevé à 17h pour une descente à 20h sous
la pluie ; Awa monte dans le mauvais clando, paie double, marche la fin du
trajet. Impactée : l'usagère, seule, sans recours, le soir. Probabilité
haute par temps de pluie, impact critique, urgence immédiate. Garde-fous :
technique — marquage PÉRIMÉ automatique au-delà d'une heure et alerte A2 ;
transparence — l'heure du relevé est affichée dans le message lui-même ;
prompt — règle système « jamais de prix sans heure » dans le Rédacteur.

**Mise à jour (02/10/2026 — module D, fonctionnalité P-A)** : garde-fous
« technique » partiellement opérationnel — badge `Données du [Semaine]`
sous chaque fiche (la fraîcheur est visible d'un coup d'œil, avant paiement)
+ règle Chercheur « écart avec la date du jour > 7 jours → INSUFFISANT,
aucun prix affiché ». Vérifié par le test T8 (date simulée 2026-08-15 →
refus motivé). Reste ouvert : le marquage PÉRIMÉ « au-delà d'une heure de
la descente » n'est pas implémenté — la donnée est hebdomadaire (S40-2026),
pas horaire ; à documenter en soutenance si questionnée.

## Risque 2 — L'affichage public qui braque les chauffeurs

Scénario : les prix des clandos affichés à la station sont vécus comme une
dénonciation ; un chauffeur refuse Awa ou augmente son prix contre elle.
Impactés : l'usagère et les chauffeurs, relation dégradée durablement.
Probabilité moyenne, impact élevé, urgence avant extension. Garde-fous :
technique — pas de nom de chauffeur, jamais ; transparence — message « prix
constatés, non imposés » sur chaque affichage ; prompt — le Chercheur ne
collecte que station, quartier, prix, heure, aucune identité.

## Règle d'or

Se taire plutôt qu'afficher faux : sans donnée fraîche, l'agent répond
INSUFFISANT et la branche erreur s'affiche. Une info absente se contourne ;
une info fausse fait rater la vraie voiture.

## Risque 3 — L'historique de trajets laissé derrière soi

Scénario : Awa consulte RelaisYoon sur un téléphone partagé ou emprunté ;
ses 3 derniers trajets restent visibles après son départ. Impactée :
l'usagère (trajets du soir). Probabilité faible, impact discret, urgence
basse. Garde-fous : mémoire volatile React uniquement — ni localStorage,
ni cookie, ni requête serveur ; bouton « Effacer » visible ; purge
automatique à la fermeture de l'onglet. Vérifié par le test T10
(recharge → liste vide).

## Risque 4 — La fiche illisible pour qui n'entend pas le français

Scénario : RelaisYoon promet l'audio à une usagère peu à l'aise avec
l'écrit, mais son navigateur n'a aucune voix française — le bouton muet la
laisse croire que l'app est cassée, ou pire : une voix non validée
prononce mal un prix. Impactée : l'usagère (prix mal entendu = mauvais
paiement). Garde-fous : détection stricte des voix `fr-*` avant d'afficher
le bouton (masqué = jamais de promesse fausse) ; `utterance.lang =
"fr-FR"` ; aucune traduction ni voix générée hors français sans validation
humaine. Vérifié par T11/T12 (lecture + toggle) et par l'absence du bouton
sur navigateur sans voix FR.
