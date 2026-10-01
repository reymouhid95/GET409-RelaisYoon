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
