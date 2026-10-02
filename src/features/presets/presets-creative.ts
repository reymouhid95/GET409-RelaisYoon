import type { Preset } from "../../types";

/** Creative presets: unusual angles, controlled lighting and lens effects. */
export const CREATIVE_PRESETS: Preset[] = [
  {
    id: "plongee-verticale",
    name: "Plongée verticale (overhead)",
    shotSize: "Plan taille",
    cameraAngle: "Plongée verticale",
    focalLength: "35 mm",
    lighting: "Lumière flat au sol",
    mood: "Méthodique",
    generationPrompt:
      "Vue en plongée verticale sur un plan de travail, mains au centre du cadre, lumière plate sans ombre portée.",
  },
  {
    id: "silhouette-contre-jour",
    name: "Silhouette contre-jour",
    shotSize: "Plan américain",
    cameraAngle: "Face, contre-jour",
    focalLength: "50 mm",
    lighting: "Soleil bas à l'arrière du sujet",
    mood: "Mystérieux",
    generationPrompt:
      "Silhouette nette d'un personnage contre un soleil bas, aucun détail dans l'ombre, ciel orange dégradé.",
  },
  {
    id: "insert-objet",
    name: "Insert objet",
    shotSize: "Très gros plan",
    cameraAngle: "Plongée légère",
    focalLength: "100 mm macro",
    lighting: "Lumière rasante",
    mood: "Précis",
    generationPrompt:
      "Insert macro d'un objet tenu entre les doigts, texture très nette, lumière rasante qui révèle le relief.",
  },
  {
    id: "over-shoulder",
    name: "Par-dessus l'épaule",
    shotSize: "Plan rapproché taille",
    cameraAngle: "Trois-quarts arrière",
    focalLength: "70 mm",
    lighting: "Lumière de fenêtre",
    mood: "Dialogue",
    generationPrompt:
      "Plan par-dessus l'épaule d'un interlocuteur, avant-plan flou d'épaule et de tête, visage net au fond.",
  },
  {
    id: "suivi-lateral",
    name: "Suivi latéral (tracking)",
    shotSize: "Plan taille",
    cameraAngle: "Latéral, caméra en mouvement",
    focalLength: "35 mm",
    lighting: "Lumière naturelle continue",
    mood: "En mouvement",
    generationPrompt:
      "Plan de suivi latéral d'une personne qui marche, arrière-plan filant, cadrage stable à hauteur de poitrine.",
  },
  {
    id: "rack-focus",
    name: "Bascule de mise au point",
    shotSize: "Premier plan",
    cameraAngle: "Face",
    focalLength: "85 mm",
    lighting: "Source pratiquée en arrière-plan",
    mood: "Révélation",
    generationPrompt:
      "Premier plan où la mise au point bascule de l'avant-plan au regard, bokeh de lumières en arrière-plan.",
  },
  {
    id: "lumiere-fenetre",
    name: "Lumière de fenêtre",
    shotSize: "Plan rapproché taille",
    cameraAngle: "Trois-quarts",
    focalLength: "50 mm",
    lighting: "Lumière naturelle latérale",
    mood: "Doux",
    generationPrompt:
      "Personne près d'une fenêtre, lumière latérale douce qui modèle le visage, mur clair en fond.",
  },
  {
    id: "reflet",
    name: "Reflet (miroir / flaque)",
    shotSize: "Plan taille",
    cameraAngle: "Face via reflet",
    focalLength: "40 mm",
    lighting: "Néons diffus",
    mood: "Contemplatif",
    generationPrompt:
      "Personnage filmé à travers son reflet dans une vitre pluvieuse, néons diffus, plans superposés.",
  },
  {
    id: "nuit-neons",
    name: "Nuit urbaine, néons",
    shotSize: "Plan large",
    cameraAngle: "Face, légère contre-plongée",
    focalLength: "24 mm",
    lighting: "Néons colorés, sources pratiquées",
    mood: "Nocturne",
    generationPrompt:
      "Plan large nocturne dans une rue à néons, sol mouillé qui renvoie les reflets, passants en contre-jour.",
  },
  {
    id: "fond-flou",
    name: "Fond flou (faible profondeur)",
    shotSize: "Premier plan",
    cameraAngle: "Trois-quarts",
    focalLength: "135 mm",
    lighting: "Lumière dure latérale",
    mood: "Portrait",
    generationPrompt:
      "Premier plan avec très faible profondeur de champ, sujet net, arrière-plan réduit à des taches de lumière.",
  },
];
