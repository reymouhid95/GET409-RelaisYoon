# Guide d'enregistrements d'écran — Vidéo promo RelaisYoon (S8)

**Objectif** : Enregistrer les 2 screen recordings réels requis (P04 et P06) sur Chrome/Edge, selon les spécifications du tutoriel Flow.

---

## ⚠️ Pré-requis

- Navigateur : **Chrome ou Edge** (Firefox interdit — voir docs/video-promo-s8.md § Points bloquants #2)
- Application RelaisYoon déjà ouverte et connectée à l'agent Dify
- Mode sombre activé dans le navigateur
- Onglets/pop-ups autorisés pour `api.dify.ai`
- Fenêtre normale (pas de mode démo/incognito qui masquerait l'interface)

---

## Enregistrement P04 — L'app répond (16-24 s)

**Durée cible** : 8 s utiles (enregistrer ~10 s pour avoir la marge)
**Contenu obligatoire** :

1. Ouvrir l'application RelaisYoon sur la page d'accueil ("Fiches du soir")
2. Taper la question : `Petersen vers Guédiawaye ?`
3. Cliquer sur **Demander** (ou bouton bleu 🚌)
4. Laisser la fiche se charger complètement
5. La fiche affichée doit montrer :
   - **Station** : Grand-Médine (ou correspondance pertinente)
   - **Prix** : 350 FCFA
   - **Heure** : 18h35
   - **Statut** : DISPONIBLE
6. Enregistrer l'écran vertical (9:16, 1080×1920)
7. **Durée** : ~10 secondes d'enregistrement

### Vigilance (à vérifier pendant/enregistrement) :

- [ ] **Plein écran vertical** — l'application doit occuper tout l'écran en mode 9:16
- [ ] **Mode sombre** — confirmée dans la config CSS du projet (bleu `--brand-500` / `--brand-700`, jaune `--sun-400` / `--sun-500`)
- [ ] **Notifications masquées** — aucune notification entrante à l'écran
- [ ] **Parcours lent et fluide** — pas de clics précipités, animation naturelle
- [ ] **Sans hésitation** — la fiche apparaît directement, pas d'écran de chargement interminable
- [ ] **3 prises gardes la plus nette** — viser 3 versions successives, garder la meilleure

### Contenu à l'écran (ne pas modifier) :

- Fiche RelaisYoon avec station, prix, heure, statut
- Boutons d'action de l'interface
- **Absolument pas** : texte ajouté en post-production, logos, watermarks

---

## Enregistrement P06 — Feature heure (30-36 s)

**Durée cible** : 6 s utiles
**Contenu obligatoire** :

1. Toujours sur la **même session** que P04 (ne pas fermer/recharger l'application entre les deux)
2. Montrer le champ **🕐** (heure du départ)
3. La réponse de l'agent doit afficher : `"ton départ idéal : 19h20"`
4. L'horloge/heure affichée doit être `19:30` dans l'interface (ou champ de saisie)
5. Enregistrer l'écran vertical (9:16, 1080×1920)
6. **Durée** : ~8 secondes pour obtenir 6 s utiles

### Vigilance (à vérifier pendant/enregistrement) :

- [ ] **Même session que P04** — pas de déconnexion, pas de nouveau lancement
- [ ] **Champ 🕐 `19:30`** clairement visible dans l'interface
- [ ] **Réponse** : `"ton départ idéal : 19h20"` s'affiche clairement
- [ ] **Mode sombre** — identique à P04
- [ ] **Notifications masquées** — identique à P04
- [ ] **Données réelles S40-2026** — prix 350 FCFA, heure cohérente avec les relevés

### Continuité avec P04 :

- Même application ouverte, même onglet/navigateur
- Même affichage mode sombre
- Pas de re-tap de question (on passe directement du résultat P04 à la feature heure)
- Le téléphone reste à l'écran mais en mode uniforme (ou hors champ selon l'édition)

---

## 📋 Checklist d'enregistrement (à cocher avant de commencer)

| Item | P04 | P06 |
|------|-----|-----|
| Navigateur Chrome/Edge | | |
| Application RelaisYoon connectée | | |
| Mode sombre activé | | |
|Notifications masquées (✓/✗) | | |
| Écran vertical 9:16 | | |
| Question tapée : `Petersen vers Guédiawaye ?` | ✓ (P04) | |
| Fiche affichée (350 FCFA, 18h35, DISPONIBLE) | ✓ (P04) | |
| Champ 🕐 `19:30` visible | | ✓ |
| Réponse "ton départ idéal : 19h20" | | ✓ |
| Session identique P04→P06 | | ✓ |
| 3 prises enregistrées | ✓ | |
| Aucune notification entrante | ✓ | ✓ |

---

## 💡 Tips d'enregistrement

1. **Préparer avant** : Avoir l'app déjà lancée, connectée, en mode sombre
2. **Boucle de test** : Faire un essai rapide avant l'enregistrement "officiel"
3. **Parler à l'écran** (optionnel) : Si vous comptez ajouter une réplique vocale plus tard, pouvez dire `"Petersen vers Guédiawaye ?"` pendant l'enregistrement
4. **Garder le téléphone visible** : L'interface doit être visible en entier, pas de zoom excessif
5. **Lumière** : Assurez-vous qu'il n'y a pas de reflets gênants sur l'écran (ordinateur portable ou éclairer doucement)

---

## 🎬 Après enregistrement

1. **Exporter** les vidéos dans un dossier `video-promo/recordings/`
2. **Nommer** : `P04-app-reponds.mp4` et `P06-feature-heure.mp4`
3. **Vérifier** chaque clip : son audible, image claire, pas de bugs d'affichage
4. **Montage** : Dans le montage final (1080×1920, 60s), placer :
   - P04 à la position 16-24 s de la vidéo
   - P06 à la position 30-36 s de la vidéo
5. **Rappel** : 1 piste musique ajoutée en post-production, sous-titres en français obligatoires

---

*Guide généré à partir de docs/video-promo-s8.md — Étape 6 et Étape 8*