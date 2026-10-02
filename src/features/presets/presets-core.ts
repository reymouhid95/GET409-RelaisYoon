import type { Preset } from "../../types";

/** Core framing presets: the standard shot sizes, eye-level and simple setups. */
export const CORE_PRESETS: Preset[] = [
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
];
