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
