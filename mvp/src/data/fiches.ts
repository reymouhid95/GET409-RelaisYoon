/*
 * Registre des relevés — aligné sur docs/releves-brt-s5.csv (8 lignes, S40-2026).
 *
 * Modèle : une fiche = une (station, quartier) qui peut partir PLUSIEURS fois
 * dans la soirée. Sam Notaire a deux départs (18h40 et 19h05) : l'ancien
 * modèle, qui ne portait qu'une seule heure par fiche, ne pouvait pas les
 * représenter.
 *
 * `releveLe` est l'horodatage du relevé sur le terrain. C'est la donnée qui
 * alimente le marqueur PÉRIMÉ (US-02) : à chaque nouvelle soirée de collecte,
 * il faut la mettre à jour — sinon tout le site affiche « périmé », ce qui
 * est le comportement correct et voulu, pas un bug.
 */

export type Statut = "Disponible" | "Indisponible";

export type Depart = {
  heure: string;
  prix: number;
  statut: Statut;
  /** ISO 8601, heure du Sénégal (UTC+0). */
  releveLe: string;
};

export type Fiche = {
  id: number;
  station: string;
  quartier: string;
  departs: Depart[];
};

export const fiches: Fiche[] = [
  {
    id: 1,
    station: "Petersen (Papa Gueye Fall)",
    quartier: "Guédiawaye Sam Notaire",
    departs: [
      { heure: "18h40", prix: 500, statut: "Disponible", releveLe: "2026-10-01T18:40:00Z" },
      { heure: "19h05", prix: 500, statut: "Disponible", releveLe: "2026-10-01T18:40:00Z" },
    ],
  },
  {
    id: 2,
    station: "Petersen (Papa Gueye Fall)",
    quartier: "Guédiawaye Ndiarème",
    departs: [
      { heure: "18h45", prix: 600, statut: "Disponible", releveLe: "2026-10-01T18:45:00Z" },
    ],
  },
  {
    id: 3,
    station: "Grand-Médine",
    quartier: "Parcelles Assainies",
    departs: [
      { heure: "18h30", prix: 400, statut: "Disponible", releveLe: "2026-10-01T18:30:00Z" },
    ],
  },
  {
    id: 4,
    station: "Petersen (Papa Gueye Fall)",
    quartier: "Yeumbeul",
    departs: [
      { heure: "18h50", prix: 700, statut: "Disponible", releveLe: "2026-10-01T18:50:00Z" },
    ],
  },
  {
    id: 5,
    station: "Grand-Médine",
    quartier: "Keur Massar",
    departs: [
      { heure: "18h35", prix: 350, statut: "Disponible", releveLe: "2026-10-01T18:35:00Z" },
    ],
  },
  {
    id: 6,
    station: "Petersen (Papa Gueye Fall)",
    quartier: "Yoff",
    departs: [
      { heure: "18h45", prix: 500, statut: "Indisponible", releveLe: "2026-10-01T18:45:00Z" },
    ],
  },
  {
    id: 7,
    station: "Grand-Médine",
    quartier: "Pikine Icotaf",
    departs: [
      { heure: "19h00", prix: 450, statut: "Disponible", releveLe: "2026-10-01T19:00:00Z" },
    ],
  },
];

/** Une fiche est disponible si au moins un de ses départs l'est. */
export function ficheDisponible(fiche: Fiche): boolean {
  return fiche.departs.some((d) => d.statut === "Disponible");
}

export function statutFiche(fiche: Fiche): Statut {
  return ficheDisponible(fiche) ? "Disponible" : "Indisponible";
}

/** Dernier relevé du registre, pour dater la session affichée. */
export const SESSION = {
  /** Libellé de la collecte, repris de la colonne `Semaine` du CSV. */
  semaine: "S40-2026",
  dateLisible: "1ᵉʳ octobre 2026",
};

/**
 * Horodatage le plus récent du registre — pilote l'état global (barre d'état)
 * et la bannière de fraîcheur. Source unique : ne pas recalculer ailleurs.
 */
export const dernierReleve: string =
  fiches
    .flatMap((f) => f.departs)
    .map((d) => d.releveLe)
    .sort()
    .at(-1) ?? "";

/*
 * Les quartiers sont dérivés des données : la liste ne peut plus diverger du
 * contenu, contrairement à une constante écrite à la main (3 quartiers
 * manquants côté interface pour les 6 réellement présents).
 */
export const quartiers: string[] = [...new Set(fiches.map((f) => f.quartier))].sort((a, b) =>
  a.localeCompare(b, "fr"),
);

/** Chaque quartier avec son nom court, pour les pastilles de filtre. */
export const filtresQuartier = quartiers.map((quartier) => ({
  quartier,
  court: quartier.replace(/^Guédiawaye\s+/, ""),
}));
