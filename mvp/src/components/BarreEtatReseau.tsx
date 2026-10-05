import { dernierReleve, fiches } from "@/data/fiches";
import { useFraicheur } from "@/lib/fraicheur";
import { cn } from "@/lib/utils";

const TOTAL_DEPARTS = fiches.reduce((n, f) => n + f.departs.length, 0);
const DEPARTS_DISPONIBLES = fiches.reduce(
  (n, f) => n + f.departs.filter((d) => d.statut === "Disponible").length,
  0,
);

/**
 * Barre d'état du réseau — pattern Citymapper/TfL : une ligne, en haut de
 * toutes les pages, qui dit l'essentiel avant même de lire la page.
 *
 *   vert  = les relevés sont récents (moins d'une heure)
 *   ambre = les relevés ont vieilli, à reconfirmer (US-02)
 *
 * Elle ne remplace pas la bannière de /fiches (qui explique et donne le lien
 * d'aide) : elle rend l'état visible partout, y compris sur l'accueil.
 * Rendue côté serveur sans la fraîcheur (null) pour éviter tout écart
 * d'hydratation — l'état se précise après le montage.
 */
export function BarreEtatReseau() {
  const fraicheur = useFraicheur(dernierReleve);
  const connu = fraicheur !== null;
  const perime = fraicheur?.perime ?? false;

  return (
    <div
      role="status"
      aria-label="État des relevés du soir"
      className="border-border/70 bg-surface/60 border-b"
    >
      <div className="mx-auto flex max-w-page flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2 text-xs sm:px-6">
        <span className="inline-flex items-center gap-2 font-bold">
          <span
            aria-hidden
            className={cn(
              "size-2 rounded-full",
              !connu ? "bg-border" : perime ? "bg-sun-400" : "bg-success",
            )}
          />
          <span
            className={cn(
              !connu && "text-muted-foreground",
              connu && perime && "text-sun-700 dark:text-sun-300",
              connu && !perime && "text-success",
            )}
          >
            {!connu ? "Relevés du soir" : perime ? "Relevés à reconfirmer" : "Relevés à jour"}
          </span>
        </span>

        <span aria-hidden className="bg-border hidden h-3 w-px sm:block" />

        <span className="text-muted-foreground">
          <span className="text-foreground ry-num font-bold">{fiches.length}</span> fiches ·{" "}
          <span className="text-foreground ry-num font-bold">{DEPARTS_DISPONIBLES}</span> départs
          disponibles sur {TOTAL_DEPARTS}
        </span>

        {connu && (
          <span className="text-muted-foreground ml-auto hidden sm:inline">
            Dernier relevé {fraicheur.libelle}
          </span>
        )}
      </div>
    </div>
  );
}
