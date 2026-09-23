# Prompts S1 — RelaisYoon

Outil principal : Claude.ai. Plan B : Mistral Le Chat.
Les crochets des templates ont été remplacés avant envoi.
La première sortie qui proposait une application a été rejetée :
une question d'empathie ne vend pas le produit.

## S1 — Découverte (ChatGPT)

Rôle : expertise mobilité Dakar. Demande : 3 problèmes des usagères qui
enchaînent BRT et clando à Guédiawaye — cause, impact quotidien, piste
accessible sans forfait data stable.
Retenu : l'absence d'info à la descente.
Écarté : toute piste qui suppose un smartphone alimenté toute la journée.

## S2 — Guide (Claude.ai)

Persona Awa, problème en une phrase, consigne explicite : aucune solution
dans les questions. Sortie relue, une question orientée supprimée.
Résultat : `guide-interview.md`.

## S3 — HMW (Claude.ai)

Observations : les dix verbatims de `notes-interview.md`.
Critère : ni trop vague, ni trop précis, pas de canal imposé.
Trois formulations gardées, une retenue (voir `carte-empathie.md`).

## S4 — Carte (Claude.ai)

Contrainte écrite dans le prompt : rester fidèle aux verbatims ;
ne pas importer les chiffres CETUD dans la voix d'Awa.
Contrôle fait après génération : chaque puce a une preuve dans les notes.
Résultat : `carte-empathie.md`.
