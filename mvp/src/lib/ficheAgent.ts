export type FicheAgent = {
  station: string;
  quartier: string;
  prix: string;
  heure: string;
  sources: string;
  fraicheur: string;
};

function extrait(texte: string, cle: string): string | null {
  const m = texte.match(new RegExp(`^(?:\\*\\*)?${cle}(?:\\*\\*)?\\s*:\\s*(.+)$`, "im"));
  return m?.[1]?.trim() ?? null;
}

export function parseFicheAgent(texte: string): FicheAgent | null {
  if (/INSUFFISANT/i.test(texte)) return null;
  const station = extrait(texte, "STATION");
  const quartier = extrait(texte, "QUARTIER");
  const prix = extrait(texte, "PRIX");
  const heure = extrait(texte, "HEURE");
  const sources = extrait(texte, "SOURCES");
  const fraicheur = extrait(texte, "FRA[IÎ]CHEUR");
  if (!station || !quartier || !prix || !heure) return null;
  return {
    station,
    quartier,
    prix,
    heure,
    sources: sources ?? "",
    fraicheur: fraicheur ?? "",
  };
}
