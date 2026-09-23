# Backlog S3 — RelaisYoon

## HMW Définitif (provisoire, en attente de P-HMW)

Comment pourrions-nous permettre à une usagère de Guédiawaye de savoir,
avant de descendre du BRT, si une correspondance part vers son quartier et
à quel prix, afin de ne plus finir le trajet à l'aveugle ?

## User Stories MUST

À construire obligatoirement en S3.

### US-01

- Story : En tant qu'Awa, je veux recevoir les départs et prix vers mon
  quartier avant la descente afin de choisir ma correspondance sans demander
  sur place.
- Priorité : MUST
- Outil : Dify (agent d'info) + SMS API
- Effort : moyen
- Adresse : Pain Reliever #1
- Critère d'acceptation : l'info arrive avant l'ouverture des portes, avec
  l'heure de relevé ; sans data, elle passe quand même.

### US-02

- Story : En tant qu'Awa, je veux que chaque prix porte son heure de relevé
  afin de ne pas me fier à un prix périmé par la pluie.
- Priorité : MUST
- Outil : Dify (template de message) + Bolt.new (registre des relevés)
- Effort : moyen
- Adresse : Pain Reliever #2
- Critère d'acceptation : prix de plus d'une heure marqué périmé ;
  aucun prix sans heure n'est diffusé.

## User Stories SHOULD

À construire si le temps le permet.

### US-03

- Story : En tant qu'Awa, je veux demander l'info par code court (station)
  afin de l'obtenir même quand je n'ai rien reçu.
- Priorité : SHOULD
- Outil : SMS/USSD API + Dify
- Effort : moyen
- Adresse : Pain Reliever #3
- Critère d'acceptation : réponse en moins d'une minute, sans data,
  sur un téléphone au forfait vide.

## User Stories COULD

Roadmap post-MVP.

### US-04

- Story : En tant qu'Awa, je veux que des correspondantes de quai affichent
  les prix du soir afin d'avoir l'info même sans téléphone.
- Priorité : COULD
- Outil : organisationnel (ardoise) + Bolt.new (registre)
- Effort : élevé
- Adresse : Gain Creator #3 / Hypothèse S1
- Critère d'acceptation : ardoise exacte 4 soirs sur 5 sans relance.

## Sprint S3 — Ce qu'on construit en priorité

- Semaine 1 : US-01 (agent Dify + SMS) + US-02 (template + registre).
- Semaine 2 : US-03 si avance + tests à la descente (C1 + C3).
- Démo S6 : US-01 en live — une usagère au forfait vide reçoit départs
  et prix avant la descente.
