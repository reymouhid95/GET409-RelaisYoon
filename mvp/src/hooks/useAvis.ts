import { useCallback, useEffect, useState } from "react";

export type Avis = "up" | "down";

const CLE = "ry-avis";
const MAX = 50;

function lire(): Record<string, Avis> {
  try {
    const brut = localStorage.getItem(CLE);
    return brut ? (JSON.parse(brut) as Record<string, Avis>) : {};
  } catch {
    return {};
  }
}

/*
 * P-E — avis👍👎 sur les réponses. Tout reste local : aucun avis n'est
 * envoyé au serveur ni à Dify (affiché à l'utilisateur).
 */
export function useAvis() {
  const [avis, setAvis] = useState<Record<string, Avis>>(lire);

  useEffect(() => {
    try {
      localStorage.setItem(CLE, JSON.stringify(avis));
    } catch {
      /* stockage indisponible */
    }
  }, [avis]);

  const noter = useCallback((question: string, choix: Avis) => {
    setAvis((precedent) => {
      const actuel = precedent[question];
      const suivant = { ...precedent };
      if (actuel === choix) delete suivant[question];
      else suivant[question] = choix;
      const cles = Object.keys(suivant);
      if (cles.length > MAX) {
        for (const ancienne of cles.slice(0, cles.length - MAX)) delete suivant[ancienne];
      }
      return suivant;
    });
  }, []);

  const avisDe = useCallback((question: string) => avis[question] ?? null, [avis]);

  return { avisDe, noter };
}
