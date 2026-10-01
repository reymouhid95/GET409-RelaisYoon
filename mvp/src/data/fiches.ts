export type Statut = "Disponible" | "Indisponible";

export type Fiche = {
  id: number;
  station: string;
  quartier: string;
  prix: number;
  heure: string;
  statut: Statut;
};

export const fiches: Fiche[] = [
  {
    id: 1,
    station: "Petersen (Papa Gueye Fall)",
    quartier: "Guédiawaye Sam Notaire",
    prix: 500,
    heure: "18h40",
    statut: "Disponible",
  },
  {
    id: 2,
    station: "Petersen (Papa Gueye Fall)",
    quartier: "Guédiawaye Ndiarème",
    prix: 600,
    heure: "18h45",
    statut: "Disponible",
  },
  {
    id: 3,
    station: "Grand-Médine",
    quartier: "Parcelles Assainies",
    prix: 400,
    heure: "18h30",
    statut: "Disponible",
  },
  {
    id: 4,
    station: "Petersen (Papa Gueye Fall)",
    quartier: "Yeumbeul",
    prix: 700,
    heure: "18h50",
    statut: "Disponible",
  },
  {
    id: 5,
    station: "Grand-Médine",
    quartier: "Keur Massar",
    prix: 350,
    heure: "18h35",
    statut: "Disponible",
  },
  {
    id: 6,
    station: "Petersen (Papa Gueye Fall)",
    quartier: "Yoff",
    prix: 500,
    heure: "18h45",
    statut: "Indisponible",
  },
];

export const filtresQuartier = ["Sam Notaire", "Ndiarème", "Yeumbeul"] as const;
