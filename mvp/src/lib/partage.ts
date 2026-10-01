import { STATION_RELEVE } from "@/lib/carto";

/*
 * Version multi-départs : une même station peut servir un quartier deux fois
 * dans la soirée. Écrire « 18h40 — 500 FCFA · 19h05 — 500 FCFA » évite de
 * faire croire à l'usagère qu'il n'y a qu'un passage.
 */
export function texteFicheRelaisYoonMulti(args: {
  station: string;
  quartier: string;
  departs: { heure: string; prix: number; statut: string }[];
  releveLe: string;
  statut: string;
}): string {
  const liste = args.departs.map((d) => `${d.heure} → ${d.prix} FCFA (${d.statut})`).join(" · ");

  return (
    `RelaisYoon 🚌 — STATION : ${args.station} · QUARTIER : ${args.quartier} · ` +
    `DÉPARTS : ${liste} · relevé du ${args.releveLe} · ${args.statut}`
  );
}

export function urlPartageWhatsApp(texte: string): string {
  return `https://wa.me/?text=${encodeURIComponent(texte)}`;
}

export function texteFicheRelaisYoon(args: {
  station: string;
  quartier: string;
  prix: string;
  heure: string;
  statut: string;
}): string {
  return (
    `RelaisYoon 🚌 — STATION : ${args.station} · QUARTIER : ${args.quartier} · ` +
    `PRIX : ${args.prix} · relevé ${args.heure} · ${args.statut}`
  );
}

/*
 * Partage d'une réponse de l'agent qui n'a PAS produit de fiche exploitable
 * (hors sujet, ou question trop vague). On transmet alors l'échange entier :
 * la question sert au destinataire, qui peut la reformuler à l'agent.
 */
export function texteReponseAgent(args: { question: string; reponse: string }): string {
  return (
    `RelaisYoon 🚌 — j'ai demandé : ${args.question}\n` +
    `Réponse de l'agent : ${args.reponse}\n` +
    `Source : ${STATION_RELEVE}`
  );
}
