# GET409 — RelaisYoon

## Notre equipe

| Prenom Nom      | Role                              | GitHub        |
| --------------- | --------------------------------- | ------------- |
| Amadou Oury BAH | Dev UI (No-Code), Chef de Produit | @reymouhid95  |
| Rogelle Mombo   | Master Prompt Engineer            | @Rogelle-2MR  |
| Darvy Valtine   | Responsable Impact                | @DarvyValtine |

Équipe arrêtée à 3 membres le 22 septembre 2026 (écart assumé : le handout demande 4 à 5, aucun membre fictif ajouté).

E-mail GitHub Amadou Oury BAH : thiernooury89@gmail.com
E-mail GitHub Rogelle Mombo : rogellereolia3@gmail.com (@Rogelle-2MR, invitation acceptée)
E-mail GitHub Darvy Valtine : darvyvaltine@gmail.com (@DarvyValtine, invitation acceptée)

Dépôt : [reymouhid95/GET409-RelaisYoon](https://github.com/reymouhid95/GET409-RelaisYoon.git) — public, branche `main`, créé le 22 septembre 2026, renommé au format `GET409-RelaisYoon` le même jour.

## Notre defi

Secteur : Mobilité urbaine Dakar — dernier kilomètre après le BRT

Probleme : Comment pourrions-nous permettre à une usagère de Guédiawaye de savoir, avant de descendre du BRT, si une correspondance part vers son quartier et à quel prix, afin de ne plus finir le trajet à l'aveugle ?

## Livrables S1

- [x] Fiche equipe — docs/fiche-equipe.md
- [x] Carte d'empathie — docs/carte-empathie.md
- [x] Guide d'interview + notes — docs/guide-interview.md, docs/notes-interview.md
- [x] Prompts S1 + pitch 90 s — docs/prompts-s1.md, docs/pitch-90s.md
- [x] Dossier complet — docs/GET409_S1_RelaisYoon.docx
- [x] Enonce HMW — dans la carte d'empathie
- [x] Depot public : https://github.com/reymouhid95/GET409-RelaisYoon.git — format GET409-RelaisYoon conforme
- [x] @Rogelle-2MR et @DarvyValtine collaborateurs Write — invitations acceptées le 23 septembre 2026 (vérifié via l'API)
- [x] Dépôt public vérifié — branche main, format GET409-RelaisYoon conforme

## Livrables S2 — terminés le 23 septembre 2026

Phase 6 chapeaux — terminée (4/4) :

- [x] docs/chapeaux-bono.md — 18 insights + synthèse
- [x] docs/contraintes-mvp.md — 4 contraintes + critère final
- [x] docs/hypotheses-validation.md — 3 critiques, 1 importante, 1 secondaire
- [x] docs/metriques-succes.md — Nord 60 %, P1-P3, A1-A2

Phase VPC — terminée (4/4) :

- [x] docs/vpc.md — profil Awa + proposition, FIT sans orphelin
- [x] docs/vpc-connections.md — étape 06, traçabilité chapeaux → VPC
- [x] docs/backlog-s3.md — étape 07, user stories MUST/SHOULD/COULD
- [x] docs/pitch-vpc-draft.md — bloc 60 s pour la soutenance

Phase HMW — terminée (4/4) :

- [x] docs/hmw-definitif.md — P-HMW, décision engageante
- [x] docs/hmw-alignement.md — filtre sprint S3 : US-01, US-02, US-03 si temps, US-04 reportée
- [x] docs/hmw-demo.md — script démo S6 (valeurs cibles, à remplacer)
- [x] docs/hmw-jury.md — 5 questions + 2 pièges
- [x] docs/pitch-vpc-draft.md — bloc 60 s, 2 versions

Transverse :

- [x] docs/journal-prompts.md — 12 entrées S2 notées /5 (chapeaux,
      VPC, HMW, pitch) + journaux L3 S3, S4 (tableau itérations) et S5 (P1-P3)

## Livrables S3 — terminés le 29 septembre 2026

Infra Dify :

- [x] Compte Dify créé (via GitHub) + workspace `GET409-RelaisYoon`
- [x] Membres invités — clos : impossible sur le plan gratuit Dify
      (sandbox 0 crédits, option d'invitation réservée aux plans payants) ;
      répartition des rôles tracée dans docs/fiche-equipe.md
- [x] Workflow `RelaisYoon_FicheCorrespondance_v1_RelaisYoon` (type Workflow) :
      DÉBUT (query) → RÉCUPÉRATION (RelaisYoon_KB_v1 / releves-brt-s5.csv,
      depuis S5 v#8 — remplace l'ancienne base releve-test-s3.md) →
      CHERCHEUR → SI/SINON → IF : Sortie erreur / ELSE : RÉDACTEUR → Sortie 2
- [x] Condition : Chercheur · text contient INSUFFISANT (capitales)
- [x] SYSTEM P1/P2 conformes (sans variables) + messages USER via {x}
- [x] Sorties configurées : message_erreur (Chercheur) / fiche (Rédacteur)
- [x] Modèles : gpt-5 puis gpt-oss-20b via Groq (llama 404, écart documenté)
- [x] Base de connaissances : embedding indisponible (sandbox 0 crédits) →
      base `releve-test-s3` recréée en **Recherche Texte Intégral** (document
      réindexé, segmenté par ligne)
- [x] Test Q2 (vague) : INSUFFISANT → Sortie, message affiché
- [x] Test Q1 (précise) : ELSE → Rédacteur → fiche (29 sept.)
- [x] Publication + URL publique : https://udify.app/workflow/Ssl70Rg8K9Q3epGM

Livrables (100 pts) :

- [x] L1 Agent V1 (40 pts) — Q1/Q2 testés sur l'app publique,
      captures docs/l1-q1-fiche.png + docs/l1-q2-erreur.png
- [x] L2 Schéma d'architecture (30 pts) — docs/l2-schema.png
- [x] L3 Journal S3 — docs/journal-prompts.md, Zero/Few/CoT + runs (20 pts)
- [x] L4 Réflexion éthique — docs/reflexion-ethique-s3.md, 2 risques (10 pts)

## Livrables S4 — terminés le 1 octobre 2026 (Lovable)

Étapes du template (`GET409_S4_Template_Lovable_Etudiants.docx`) :

- [x] Étape 1 — connexion GitHub à Lovable AVANT toute création
- [x] Étape 2 — prompt rempli généré en un envoi :
      docs/s4-lovable-prompt.md (RelaisYoon, 3 pages, 6 relevés réalistes)
- [x] Étape 3 — checklist preview 6/6 (header, navigation, hero + 2 CTA,
      6 cartes avec pastilles, filtres quartier, formulaire Contact)
- [x] Étape 4 — 3 itérations (P1 correction, P2 visuelle, P3 fonctionnelle)
      documentées au format tableau L3 dans docs/journal-prompts.md
- [x] Étape 5 — publication (Public — Anyone with the URL)
- [x] URL obtenue : https://relaisyoon.lovable.app

L1 (35 pts) : URL publique ci-dessus, MVP fonctionnel.
Dépôt synchronisé avec GitHub (push OK).

## Livrables S5 — en cours (Intégration MVP & RAG, 1 octobre 2026)

Adaptation des 7 fichiers `class05/` au projet (cf. commit) :

- [x] Données : docs/releves-brt-s5.csv — 8 relevés BRT
- [x] Plan RAG : docs/s5-rag-plan.md — base `RelaisYoon_KB_v1`
      (Économique/Texte Intégral, chunk 300/50, Top K 3, 4 questions test)
- [x] Prompt webhook : docs/s5-webhook-prompt.md — prêt à coller dans Lovable
      (page Fiches du soir, bouton bleu 🚌, clé API à insérer)
- [x] Prompts E1-E5 + S1-S6 : docs/s5-prompts-adaptes.md
      (diagnostic, audit, éthique, démo S6, Plan B)
- [x] Créer `RelaisYoon_KB_v1` dans Dify + tester (Étape 2-3 du plan RAG)
      — 4/4 tests OK (3 directs ✅, hors-base ⚠️ géré par INSUFFISANT)
- [x] Re-pointer le nœud RÉCUPÉRATION + republier le workflow (v#8)
      — Q1 → fiche ELSE, Q2 (poulet/Sandaga) → erreur IF
- [x] Créer la clé API Dify + coller le prompt webhook dans Lovable
      — « Consulter l'agent IA » sur Fiches du soir, clé côté serveur
- [x] Tester le pipeline complet : « Hello » → INSUFFISANT,
      Q1 → fiche 600 FCFA affichée dans le MVP
- [x] L2 Pipeline RAG (30 pts) — docs/s5-l2-base.png + docs/s5-l2-workflow.png
- [x] L3 Schéma Archi V2 (20 pts) — docs/s5-l3-schema.svg
- [x] L1 MVP V2 (30 pts) — https://relaisyoon.lovable.app,
      formulaire RAG fonctionnel (Q1 → fiche, hors-sujet → INSUFFISANT)
- [x] Code source du MVP intégré dans `mvp/` (TanStack Start + shadcn,
      synchronisé depuis le dépôt Lovable connecté)
- [x] L4 Journal S5 (20 pts) — P1 base, P2 webhook, P3 cohérence,
      notés 5/5 dans docs/journal-prompts.md

### Itérations MVP (code local, `mvp/`)

- [x] P4 Notes vocales — dictée navigateur (`fr-FR`) dans « Consulter
      l'agent IA », transcript injecté dans la question
- [x] P5 WhatsApp — bouton « Partager sur WhatsApp » (`wa.me/?text=`)
      sur les fiches et sous la réponse de l'agent
- [x] P6 Résultat structuré — réponse agent parsée en carte
      station/quartier/prix/heure (repli texte brut si INSUFFISANT)
- [x] P7 Correction dépréciation `inputValidator()` → `validator()`
- [x] Vérifs : `tsc` 0 erreur, eslint propre, `npm run build` OK

> ⚠️ Ces changements sont sur `GET409-RelaisYoon/mvp/` (local) : pour les
> voir sur https://relaisyoon.lovable.app, les pousser sur le dépôt Lovable
> connecté `reymouhid95/relaisyoon` (redéploiement automatique).
