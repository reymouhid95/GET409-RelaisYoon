import { useEffect, useState } from "react";

/*
 * US-02 (MUST, backlog S3) + Risque 1 de docs/reflexion-ethique-s3.md :
 * un prix de plus d'une heure doit être marqué PÉRIMÉ, pour qu'Awa ne se
 * fie pas à un tarif qu'un chauffeur a pu changer depuis.
 */

/** Au-delà d'une heure, un relevé n'est plus un prix fiable. */
export const SEUIL_PERIME_MINUTES = 60;

/** Le Sénégal est à UTC+0 toute l'année : les horodatages sont donc en Z. */
export const MS_PAR_MINUTE = 60_000;

export type Fraicheur = {
  minutes: number;
  perime: boolean;
  /** « à l'instant », « il y a 12 min », « périmé » */
  libelle: string;
};

export function calculerFraicheur(releveLe: string, maintenant: number): Fraicheur {
  const minutes = Math.max(0, Math.round((maintenant - Date.parse(releveLe)) / MS_PAR_MINUTE));
  const perime = minutes > SEUIL_PERIME_MINUTES;

  if (minutes < 2) return { minutes, perime, libelle: "à l'instant" };
  if (minutes < 60) return { minutes, perime, libelle: `il y a ${minutes} min` };
  if (minutes < 60 * 24)
    return { minutes, perime, libelle: `il y a ${Math.round(minutes / 60)} h` };

  return { minutes, perime, libelle: `il y a ${Math.round(minutes / (60 * 24))} j` };
}

/**
 * L'heure relative dépend de l'instant courant : la rendre dès le SSR
 * produirait un écart d'hydratation (le serveur calcule à T, le client à
 * T+δ). On ne l'affiche donc qu'après le montage, et l'heure absolue du
 * relevé — elle, est stable — est rendue par le serveur.
 */
export function useFraicheur(releveLe: string): Fraicheur | null {
  const [fraicheur, setFraicheur] = useState<Fraicheur | null>(null);

  useEffect(() => {
    const maj = () => setFraicheur(calculerFraicheur(releveLe, Date.now()));
    maj();
    const minuteur = setInterval(maj, MS_PAR_MINUTE);
    return () => clearInterval(minuteur);
  }, [releveLe]);

  return fraicheur;
}
