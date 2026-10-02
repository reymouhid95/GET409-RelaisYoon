import type { Preset } from "../../types";

/** The 20 built-in shot presets shipped with PromptLens (Phase 1). */
export const PRESETS: Preset[] = [
  {
    id: "gros-plan-visage",
    name: "Gros plan visage",
    shotSize: "Gros plan",
    cameraAngle: "Face, hauteur des yeux",
    focalLength: "85 mm",
    lighting: "Lumière douce latérale, une source",
    mood: "Intime",
    generationPrompt:
      "Gros plan d'un visage face caméra, lumière douce venant de la gauche, arrière-plan flou, grain de pellicule léger.",
  },
  {
    id: "tres-gros-plan-yeux",
    name: "Très gros plan yeux",
    shotSize: "Très gros plan",
    cameraAngle: "Face",
    focalLength: "100 mm macro",
    lighting: "Contre-jour fin sur les paupières",
    mood: "Tendu",
    generationPrompt:
      "Très gros plan sur des yeux, cils nets, reflet de la source dans l'iris, tout le reste hors champ de netteté.",
  },
  {
    id: "premier-plan",
    name: "Premier plan (NP)",
    shotSize: "Premier plan",
    cameraAngle: "Trois-quarts",
    focalLength: "50 mm",
    lighting: "Clé et retour équilibrés",
    mood: "Neutre",
    generationPrompt:
      "Premier plan d'une personne de trois-quarts, fond gris neutre, éclairage de studio équilibré, cadrage épaules-tête.",
  },
  {
    id: "plan-rapproche-taille",
    name: "Plan rapproché taille",
    shotSize: "Plan rapproché taille",
    cameraAngle: "Face, légèrement trois-quarts",
    focalLength: "50 mm",
    lighting: "Lumière naturelle diffuse",
    mood: "Conversation",
    generationPrompt:
      "Plan rapproché taille pendant une conversation, lumière de fenêtre diffuse, arrière-plan de bureau flou.",
  },
  {
    id: "plan-taille",
    name: "Plan taille",
    shotSize: "Plan taille",
    cameraAngle: "Face",
    focalLength: "40 mm",
    lighting: "Lumière d'atelier, sources multiples",
    mood: "Travail",
    generationPrompt:
      "Plan taille d'une personne au travail, sources pratiquées visibles dans le cadre, ambiance d'atelier lumineux.",
  },
  {
    id: "plan-americain",
    name: "Plan américain",
    shotSize: "Plan américain (genoux)",
    cameraAngle: "Face",
    focalLength: "45 mm",
    lighting: "Contre-jour doux",
    mood: "Dynamique",
    generationPrompt:
      "Plan américain cadrant de la tête aux genoux, contre-jour doux qui dessine les épaules, fond de couloir profond.",
  },
  {
    id: "plan-large",
    name: "Plan large",
    shotSize: "Plan large",
    cameraAngle: "Face, caméra à hauteur de poitrine",
    focalLength: "24 mm",
    lighting: "Lumière du jour, ombres marquées",
    mood: "Espace",
    generationPrompt:
      "Plan large d'un personnage minuscule dans un espace vaste, lumière du jour dure, ombres géométriques au sol.",
  },
  {
    id: "plan-ensemble",
    name: "Plan d'ensemble",
    shotSize: "Plan d'ensemble",
    cameraAngle: "Face",
    focalLength: "16 mm",
    lighting: "Lumière ambiante homogène",
    mood: "Établissement",
    generationPrompt:
      "Plan d'ensemble d'une rue de Dakar au petit matin, silhouettes à l'horizon, lumière ambiante homogène.",
  },
  {
    id: "plan-aerien",
    name: "Plan aérien drone",
    shotSize: "Plan d'ensemble",
    cameraAngle: "Plongée 90°",
    focalLength: "20 mm",
    lighting: "Soleil rasant, fin de journée",
    mood: "Épique",
    generationPrompt:
      "Vue aérienne verticale prise au drone, motif urbain en contrebas, ombres longues du soleil rasant.",
  },
  {
    id: "contre-plongee",
    name: "Contre-plongée héroïque",
    shotSize: "Plan taille",
    cameraAngle: "Contre-plongée",
    focalLength: "28 mm",
    lighting: "Lumière zénithale et contre-jour",
    mood: "Puissant",
    generationPrompt:
      "Contre-plongée héroïque d'une silhouette dominant le cadre, ciel en fond, contre-jour qui bombe les épaules.",
  },
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
