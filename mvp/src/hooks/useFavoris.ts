import { useCallback, useEffect, useState } from "react";

export type Favori = { station: string; quartier: string };

const CLE_FAVORIS = "ry-favoris";
const CLE_CONSENTEMENT = "ry-favoris-consent";
const MAX = 5;

function lire<T>(cle: string, defaut: T): T {
  try {
    const brut = localStorage.getItem(cle);
    return brut ? (JSON.parse(brut) as T) : defaut;
  } catch {
    return defaut;
  }
}

function ecrire(cle: string, valeur: unknown) {
  try {
    localStorage.setItem(cle, JSON.stringify(valeur));
  } catch {
    /* stockage indisponible : la session reste utilisable */
  }
}

/*
 * P-D — favoris de stations. Persistance locale assumée (contrairement à
 * l'historique P-B) : le consentement est demandé à l'enregistrement
 * premier et l'effacement total est toujours possible.
 */
export function useFavoris() {
  const [favoris, setFavoris] = useState<Favori[]>(() => lire<Favori[]>(CLE_FAVORIS, []));
  const [consenti, setConsenti] = useState<boolean>(() => lire<boolean>(CLE_CONSENTEMENT, false));

  useEffect(() => {
    ecrire(CLE_FAVORIS, favoris);
  }, [favoris]);

  const basculer = useCallback((f: Favori) => {
    setFavoris((precedent) => {
      const dejaLa = precedent.some((x) => x.station === f.station && x.quartier === f.quartier);
      if (dejaLa)
        return precedent.filter((x) => !(x.station === f.station && x.quartier === f.quartier));
      return [...precedent, f].slice(-MAX);
    });
  }, []);

  const estFavori = useCallback(
    (f: Favori) => favoris.some((x) => x.station === f.station && x.quartier === f.quartier),
    [favoris],
  );

  const effacer = useCallback(() => setFavoris([]), []);
  const accorder = useCallback(() => {
    setConsenti(true);
    ecrire(CLE_CONSENTEMENT, true);
  }, []);

  return { favoris, consenti, basculer, estFavori, effacer, accorder };
}
