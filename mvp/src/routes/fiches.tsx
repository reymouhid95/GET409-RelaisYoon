import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarClock, Search, SearchX, SlidersHorizontal, X } from "lucide-react";

import { AgentIa } from "@/components/AgentIa";
import { FicheCard } from "@/components/FicheCard";
import { Button } from "@/components/ui/button";
import { fiches, filtresQuartier, type Statut } from "@/data/fiches";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/fiches")({
  head: () => ({
    meta: [
      { title: "Fiches du soir — RelaisYoon" },
      {
        name: "description",
        content:
          "Tous les relevés du soir : station, quartier, prix en FCFA, heure et disponibilité, filtrables par quartier.",
      },
      { property: "og:title", content: "Fiches du soir — RelaisYoon" },
      {
        property: "og:description",
        content: "Relevés BRT du soir filtrables par quartier : Sam Notaire, Ndiarème, Yeumbeul.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FichesPage,
});

const normalise = (valeur: string) =>
  valeur
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const STATUTS = ["Tous", "Disponible", "Indisponible"] as const;

function PastilleFiltre({
  actif,
  onClick,
  children,
}: {
  actif: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actif}
      className={cn(
        "rounded-full border px-3.5 py-2 text-sm font-semibold transition-all duration-200 active:scale-95",
        actif
          ? "bg-primary border-primary text-primary-foreground shadow-card"
          : "border-border bg-background text-muted-foreground hover:border-brand-300 hover:bg-accent hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function FichesPage() {
  const [filtre, setFiltre] = useState<string>("Tous");
  const [statutFiltre, setStatutFiltre] = useState<"Tous" | Statut>("Tous");
  const [recherche, setRecherche] = useState<string>("");

  const liste = useMemo(
    () =>
      fiches.filter((f) => {
        const parQuartier = filtre === "Tous" || normalise(f.quartier).includes(normalise(filtre));
        const parRecherche = normalise(f.quartier).includes(normalise(recherche.trim()));
        const parStatut = statutFiltre === "Tous" || f.statut === statutFiltre;
        return parQuartier && parRecherche && parStatut;
      }),
    [filtre, recherche, statutFiltre],
  );

  const filtresActifs = filtre !== "Tous" || statutFiltre !== "Tous" || recherche.trim() !== "";

  const reinitialiser = () => {
    setFiltre("Tous");
    setStatutFiltre("Tous");
    setRecherche("");
  };

  return (
    <div className="mx-auto max-w-page px-4 py-10 sm:px-6 sm:py-14">
      <header className="animate-rise">
        <p className="text-primary inline-flex items-center gap-1.5 text-[0.6875rem] font-bold tracking-widest uppercase">
          <CalendarClock className="size-3.5" aria-hidden />
          Relevés du soir
        </p>
        <h1 className="text-h1 mt-3">Fiches du soir</h1>
        <p className="text-muted-foreground text-lede mt-3 max-w-2xl">
          Les correspondances notées sur le terrain entre 18h et 19h. Posez votre question à
          l&apos;agent, ou parcourez les fiches.
        </p>
      </header>

      {/* L'agent passe en tête : c'est l'action principale de la page, elle
          était reléguée sous la grille de fiches. */}
      <div className="mt-8">
        <AgentIa />
      </div>

      <section className="mt-12" aria-labelledby="titre-liste">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="titre-liste" className="text-h2">
              Tous les relevés
            </h2>
            <p className="text-muted-foreground mt-1.5 text-sm" aria-live="polite">
              <span className="ry-num font-bold text-foreground">{liste.length}</span> fiche
              {liste.length > 1 ? "s" : ""} affichée{liste.length > 1 ? "s" : ""}
              {filtresActifs && " · filtres appliqués"}
            </p>
          </div>

          {filtresActifs && (
            <Button
              variant="ghost"
              size="sm"
              onClick={reinitialiser}
              className="text-muted-foreground hover:text-danger hover:bg-danger-soft rounded-full"
            >
              <X className="size-3.5" aria-hidden />
              Réinitialiser
            </Button>
          )}
        </div>

        <div className="bg-card border-border/70 sticky top-[4.25rem] z-30 mt-6 rounded-2xl border p-3 shadow-card backdrop-blur-xl sm:p-4">
          <label className="sr-only" htmlFor="recherche-quartier">
            Rechercher un quartier
          </label>
          <div className="border-border bg-background focus-within:border-brand-400 focus-within:ring-brand-400/25 flex items-center gap-2.5 rounded-xl border transition-all duration-200 focus-within:ring-4">
            <Search className="text-muted-foreground ml-3 size-4 shrink-0" aria-hidden />
            <input
              id="recherche-quartier"
              type="search"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Rechercher un quartier…"
              className="placeholder:text-muted-foreground/70 min-w-0 flex-1 bg-transparent py-3 pr-3 text-sm outline-none"
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {["Tous", ...filtresQuartier].map((option) => (
              <PastilleFiltre
                key={option}
                actif={filtre === option}
                onClick={() => setFiltre(option)}
              >
                {option}
              </PastilleFiltre>
            ))}
          </div>

          <fieldset className="border-border/70 mt-3 border-t pt-3">
            <legend className="text-muted-foreground flex items-center gap-1.5 px-1 text-[0.6875rem] font-bold tracking-widest uppercase">
              <SlidersHorizontal className="size-3" aria-hidden />
              Disponibilité
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {STATUTS.map((statut) => (
                <PastilleFiltre
                  key={statut}
                  actif={statutFiltre === statut}
                  onClick={() => setStatutFiltre(statut)}
                >
                  {statut}
                </PastilleFiltre>
              ))}
            </div>
          </fieldset>
        </div>

        {liste.length === 0 ? (
          <div className="animate-rise border-border bg-surface mt-8 flex flex-col items-center rounded-2xl border border-dashed px-6 py-16 text-center">
            <span className="bg-surface-2 text-muted-foreground grid size-14 place-items-center rounded-full">
              <SearchX className="size-6" aria-hidden />
            </span>
            <h3 className="text-h3 mt-5">Aucun relevé pour ce filtre</h3>
            <p className="text-muted-foreground mt-2 max-w-sm text-sm">
              Ce soir, aucune correspondance ne correspond à cette combinaison. Élargissez la
              recherche ou consultez les questions fréquentes.
            </p>
            <Button onClick={reinitialiser} className="mt-6 rounded-full px-5">
              Voir tous les relevés
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {liste.map((fiche, i) => (
              <div
                key={fiche.id}
                className="animate-rise"
                style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
              >
                <FicheCard fiche={fiche} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
