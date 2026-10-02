#!/usr/bin/env bash
# Chrono démo S6 — paliers de la grille C1/4 C2/2 C3/2, bips au changement
# de partie. Lancer dans un terminal dédié :  bash docs/demo-timer.sh
set -u

paliers=(
  "0|Partie 1 — Problème + valeur (30s)"
  "30|Partie 2 — MVP live, 3 clics (3 min)"
  "210|Partie 3 — RAG live (4 min)"
  "450|Partie 4 — Schéma + conclusion (2,5 min)"
  "600|FIN"
)

debut=$(date +%s)
dernier=""

while true; do
  e=$(( $(date +%s) - debut ))
  lib="..."
  for p in "${paliers[@]}"; do
    t=${p%%|*}
    l=${p#*|}
    if (( e >= t )); then lib="$l"; fi
  done

  if [[ "$lib" != "$dernier" ]]; then
    printf '\a'
    dernier="$lib"
  fi

  mm=$(( e / 60 ))
  ss=$(( e % 60 ))
  printf '\r%02d:%02d  %-46s' "$mm" "$ss" "$lib"

  if (( e >= 600 )); then
    printf '\a\n'
    echo "DÉPASSEMENT — coupe et enregistre le retard par partie."
    break
  fi
  sleep 1
done
