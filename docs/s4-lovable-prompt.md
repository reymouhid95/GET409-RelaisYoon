# S4 — Template Lovable rempli — RelaisYoon

Source : `class04/class04/etu/GET409_S4_Template_Lovable_Etudiants.docx`

## Fiche d'identité

| Champ | Valeur |
|---|---|
| Équipe | RelaisYoon (Amadou Oury BAH, Rogelle Mombo, Darvy Valtine) |
| Projet | RelaisYoon — fiche correspondance BRT |
| Persona | Awa Diop · 34 ans · commerciale · Guédiawaye · smartphone Android |
| URL obtenue | https://relaisyoon.lovable.app (publiée le 1/10/2026) |

## Étape 1 — Connexion

lovable.dev → Get started → **Continue with GitHub** (AVANT tout projet,
sinon le projet est perdu).

## Étape 2 — Prompt à coller

````
Crée une application web complète appelée RelaisYoon.

# CONTEXTE
RelaisYoon est une plateforme numérique qui affiche des fiches de correspondance
BRT du soir (station, quartier, prix, heure de relevé, disponibilité) pour les
usagers d'Awa Diop, 34 ans, commerciale à Guédiawaye, afin de ne plus finir le
trajet à l'aveugle après avoir descendu du BRT.

# PAGES À CRÉER (3 pages)

1. ACCUEIL
   Hero avec le titre « RelaisYoon — savoir où montrer avant de descendre »,
   le sous-titre « Fiches de correspondance BRT relevées chaque soir à Dakar »,
   et deux boutons :
   « Je cherche une correspondance » et « Je relève un prix »

2. FICHES DU SOIR
   Liste des relevés du soir avec 3 filtres par quartier :
   Sam Notaire / Ndiarème / Yeumbeul
   Chaque fiche affiche : station, quartier, prix en FCFA, heure du relevé,
   et une pastille de statut.

3. CONTACT
   Formulaire 4 champs (nom, email, message, station habituelle) +
   bouton d'envoi + adresse « Station Petersen, avenue Malick Sy, Dakar ».

# DESIGN
   Couleurs : bleu BRT #1D4ED8 en couleur principale, fond clair,
   pastilles vert « Disponible » / rouge « Indisponible »,
   emoji 🚌 dans le header avec le nom RelaisYoon.

# DONNÉES (6 exemples réalistes — noms locaux, prix réels, zones précises)
1. Petersen (Papa Gueye Fall) | Guédiawaye Sam Notaire | 500 FCFA | relevé 18h40 | Disponible
2. Petersen (Papa Gueye Fall) | Guédiawaye Ndiarème | 600 FCFA | relevé 18h45 | Disponible
3. Grand-Médine | Parcelles Assainies | 400 FCFA | relevé 18h30 | Disponible
4. Petersen (Papa Gueye Fall) | Yeumbeul | 700 FCFA | relevé 18h50 | Disponible
5. Grand-Médine | Keur Massar | 300 FCFA | relevé 18h35 | Disponible
6. Petersen (Papa Gueye Fall) | Yoff | 500 FCFA | relevé 18h45 | Indisponible

# STACK TECHNIQUE
   Réutilise la stack par défaut de Lovable (React + Tailwind).
````

## Étape 3 — Checklist preview (6 points)

☐ RelaisYoon + 🚌 dans le header
☐ Navigation 3 pages : Accueil | Fiches du soir | Contact
☐ Hero + 2 CTA
☐ 6 cartes + pastilles Disponible (vert) / Indisponible (rouge)
☐ Filtres quartier fonctionnels
☐ Formulaire Contact 4 champs + adresse

## Étape 4 — 3 itérations minimum (journal L3)

| # | Type | Prompt |
|---|---|---|
| P1 | Correction | corriger un prix / statut / texte existant |
| P2 | Visuelle | ajouter un élément visuel (bannière, section) |
| P3 | Fonctionnelle | comportement dynamique (animation, filtre avancé) |
| P4 | Libre | au choix |

Une correction = un prompt. Ne jamais demander plusieurs choses à la fois.

## Étape 5 — Publication (4 clics)

1. Publish (icône nuage, haut droite) → 2. Continue (Public — Anyone with the URL)
→ 3. Continue (SEO) → 4. Publish → noter `[nom-projet].lovable.app`
dans la fiche d'identité, tester dans un nouvel onglet.

**L1 = URL soumise dans les 48h (35 pts).**
