# Alignement HMW — Backlog S3 — RelaisYoon

## HMW Définitif

Comment pourrions-nous permettre à une usagère de Guédiawaye de savoir,
avant de descendre du BRT, si une correspondance part vers son quartier et
à quel prix, afin de ne plus finir le trajet à l'aveugle ?

## Tableau d'Alignement

| US | Story résumée | Persona /2 | Problème /2 | Contexte /2 | Total /6 | Décision |
|---|---|---|---|---|---|---|
| US-01 | Départs + prix avant la descente | 2 | 2 | 2 | 6/6 | CONSTRUIRE |
| US-02 | Prix avec heure de relevé | 2 | 2 | 2 | 6/6 | CONSTRUIRE |
| US-03 | Code court sans data | 2 | 1 | 2 | 5/6 | CONSTRUIRE si temps |
| US-04 | Ardoises des correspondantes | 2 | 1 | 1 | 4/6 | REPORTER |

## Justifications

- US-01 (6/6) : Awa directement, problème central exact, contraintes
  respectées (avant la porte, sans data).
- US-02 (6/6) : sans l'heure, le prix est le mensonge poli du chapeau noir.
  Indissociable de US-01.
- US-03 (5/6) : problème partiel — elle répond au Pain 3 (canal), pas au
  cœur (savoir avant). Utile en secours, pas en premier.
- US-04 (4/6) → reportée : dépend de l'Hypothèse S1, non validée, et ne
  répond pas au « avant de descendre ». Roadmap post-MVP.

## Sprint S3 — Ordre de construction

1. US-01 — Score : 6/6
2. US-02 — Score : 6/6
3. US-03 — Score : 5/6, si temps disponible

## Décision de sprint

En S3, l'équipe RelaisYoon construira US-01 puis US-02, puis US-03 si le
temps le permet. La démo S6 prouvera le HMW si US-01 fonctionne en live :
une usagère au forfait vide reçoit départs et prix avant la descente.
