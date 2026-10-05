import { Star } from "lucide-react";

import type { Favori } from "@/hooks/useFavoris";

export function AgentFavoris({
  favoris,
  consenti,
  onUtiliser,
  onEffacer,
  onConsentir,
}: {
  favoris: Favori[];
  consenti: boolean;
  onUtiliser: (f: Favori) => void;
  onEffacer: () => void;
  onConsentir: () => void;
}) {
  if (favoris.length === 0) return null;

  return (
    <div className="bg-surface mt-5 rounded-lg p-4">
      {!consenti && (
        <div className="border-border mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-dashed p-3">
          <p className="text-muted-foreground text-xs leading-relaxed">
            <span className="text-foreground font-semibold">Stations enregistrées. </span>
            Elles restent uniquement sur cet appareil (rien n&apos;est envoyé) et disparaissent si
            tu les effaces.
          </p>
          <button
            type="button"
            onClick={onConsentir}
            className="text-brand-700 hover:text-brand-800 text-xs font-bold underline-offset-4 hover:underline"
          >
            J&apos;ai compris
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <p className="text-muted-foreground text-xs font-semibold">Mes stations</p>
        <button
          type="button"
          onClick={onEffacer}
          className="text-muted-foreground hover:text-foreground text-xs font-semibold underline-offset-4 transition-colors hover:underline"
        >
          Tout effacer
        </button>
      </div>

      <ul className="mt-1.5 flex flex-wrap gap-2">
        {favoris.map((f) => (
          <li key={`${f.station}|${f.quartier}`}>
            <button
              type="button"
              onClick={() => onUtiliser(f)}
              className="border-border bg-background text-foreground hover:border-brand-300 hover:bg-brand-100 hover:text-brand-700 dark:hover:text-brand-600 inline-flex max-w-full items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-[transform,border-color,background-color,color] duration-150 active:scale-95"
            >
              <Star className="size-3 shrink-0 fill-current text-sun-400" aria-hidden />
              <span className="truncate">
                {f.quartier}{" "}
                <span className="text-muted-foreground font-normal">
                  · {f.station.split(" (")[0]}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
