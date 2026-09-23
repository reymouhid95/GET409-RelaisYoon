# Métriques de Succès — RelaisYoon

## MVP

Service d'info correspondance à la descente du BRT : départs et prix vers
les quartiers, relevés chaque soir, diffusés sans data (SMS, USSD, affichage
ou annonce). Premier périmètre : les stations où un relevé existe.

## ⭐ Métrique Nord

- Indicateur : % d'usagères qui savaient avant de descendre (départ + prix
  vers leur quartier).
- Valeur cible à 30 jours : 60 % des usagères interrogées.
- Comment mesurer : entretien à la descente, 10 usagères par semaine,
  question unique « saviez-vous avant d'ouvrir la porte ? ».

## 📈 Métriques de Progression

### Métrique P1

- Indicateur : usagères consultant l'info au forfait data vide.
- Valeur cible à 30 jours : 15 actives sur 20 suivies.
- Comment mesurer : compteur du canal sans data (SMS reçus, codes USSD,
  déclaratif pour l'affichage).

### Métrique P2

- Indicateur : % d'infos de moins d'une heure à l'heure de la descente.
- Valeur cible à 30 jours : 80 % des infos diffusées.
- Comment mesurer : contrôle des heures de relevé sur le registre.

### Métrique P3

- Indicateur : % de trajets où l'écart prix affiché / prix payé reste
  sous 200 FCFA.
- Valeur cible à 30 jours : 80 % des trajets suivis.
- Comment mesurer : carnet de bord tenu par 2 usagères volontaires.

## 🚨 Métriques d'Alerte

### Alerte A1

- Signal : moins de 25 % d'usage actif à J+15.
- Seuil : < 5 usagères actives sur 20 suivies.
- Action corrective : entretien terrain immédiat — format, horaire, langue ?

### Alerte A2

- Signal : prix affichés contredits dans plus de 30 % des cas sur une semaine.
- Seuil : > 3 cas signalés en 1 semaine.
- Action corrective : suspendre l'affichage, vérifier la source des relevés.

## Tableau de Bord S6

À la démo S6, nous présenterons ces 3 chiffres :

- Métrique Nord — valeur réelle vs cible 60 %.
- Métrique P1 — valeur réelle vs 15 actives.
- Alerte A1 — déclenchée ou non.
