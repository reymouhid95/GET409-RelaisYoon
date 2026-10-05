import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { History, Search, SearchX, SlidersHorizontal, X } from "lucide-react";

import { AgentIa } from "@/components/AgentIa";
import { FicheCard } from "@/components/FicheCard";
import { Button } from "@/components/ui/button";
import {
  SESSION,
  dernierReleve,
  ficheDisponible,
  filtresQuartier,
  fiches,
  type Statut,
} from "@/data/fiches";
import { useFraicheur } from "@/lib/fraicheur";
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
        "rounded-lg border px-3.5 py-2 text-sm font-semibold transition-[transform,border-color,background-color,color,box-shadow] duration-150 active:scale-95",
        actif
          ? "bg-primary border-primary text-primary-foreground shadow-card"
          : "border-border bg-background text-muted-foreground hover:border-brand-300 hover:bg-accent hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

/**
 * US-02 : quand tous les relevés sont périmés, on le dit franchement plutôt
 * que de laisser croire que ces prix sont ceux de ce soir.
 */
/*
 * Bannière de fraîcheur — pattern « service alert » des applis de transport
 * (TfL, SNCF Connect, Citymapper) :
 *   - rail ambre + fond pâle plutôt qu'un aplat rouge : l'avertissement se voit
 *     sans écraser la page ;
 *   - l'ambre, pas le rouge : dans notre langage couleur, le rouge dit « le
 *     service n'existe pas » (indisponible), l'ambre dit « l'info a vieilli »
 *     (à reconfirmer). Un bandeau rouge contredirait les cartes elles-mêmes ;
 *   - hiérarchie : titre (quoi) > corps (que faire) > fraîcheur (depuis quand),
 *     avec un lien vers l'aide pour « pourquoi ce message ».
 */
function BanniereSession({ perime, fraicheur }: { perime: boolean; fraicheur?: string }) {
  if (!perime) return null;

  return (
    <aside
      role="status"
      aria-label="Fraîcheur des relevés"
      className="animate-rise border-sun-400/35 bg-sun-400/10 relative overflow-hidden rounded-xl border"
    >
      {/* Rail de signalétique : marque le bloc comme un état, pas comme une carte. */}
      <span aria-hidden className="bg-sun-400 absolute inset-y-0 left-0 w-1" />

      <div className="flex items-start gap-3 py-4 pr-4 pl-5">
        <span
          className="bg-sun-400/15 text-sun-700 dark:text-sun-300 mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg"
          aria-hidden
        >
          <History className="size-4" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <p className="text-foreground font-display text-[0.9375rem] font-semibold">
              La session du soir est terminée
            </p>
            <span className="bg-sun-400/15 text-sun-700 dark:text-sun-300 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold">
              <span aria-hidden className="bg-sun-400 size-1.5 rounded-full" />À reconfirmer
              {fraicheur && (
                <span className="text-sun-700/80 dark:text-sun-300/80 font-semibold">
                  · {fraicheur}
                </span>
              )}
            </span>
          </div>

          <p className="text-muted-foreground mt-1.5 max-w-2xl text-sm leading-relaxed">
            Dernier relevé le {SESSION.dateLisible} (semaine {SESSION.semaine}) : ces prix ne sont
            plus garantis. Confirmez auprès du transporteur avant de monter.{" "}
            <Link
              to="/aide"
              className="text-primary font-semibold underline decoration-sun-400 decoration-2 underline-offset-4 hover:decoration-primary"
            >
              Pourquoi ce message&nbsp;?
            </Link>
          </p>
        </div>
      </div>
    </aside>
  );
}

function FichesPage() {
  const [filtre, setFiltre] = useState<string>("Tous");
  const [statutFiltre, setStatutFiltre] = useState<"Tous" | Statut>("Tous");
  const [recherche, setRecherche] = useState<string>("");

  // Pilote la bannière : source unique `dernierReleve` (data/fiches.ts).
  const fraicheurGlobale = useFraicheur(dernierReleve);

  const liste = useMemo(
    () =>
      fiches.filter((f) => {
        const parQuartier = filtre === "Tous" || normalise(f.quartier).includes(normalise(filtre));
        const parRecherche = normalise(`${f.quartier} ${f.station}`).includes(
          normalise(recherche.trim()),
        );
        const parStatut =
          statutFiltre === "Tous"
            ? true
            : statutFiltre === "Disponible"
              ? ficheDisponible(f)
              : !ficheDisponible(f);
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
        <p className="text-muted-foreground flex items-center gap-2.5 text-sm font-semibold">
          <span aria-hidden className="bg-sun-400 h-px w-8" />
          Relevés du soir · {SESSION.semaine}
        </p>
        <h1 className="text-h1 mt-4">Fiches du soir</h1>
        <p className="text-muted-foreground text-lede mt-3 max-w-2xl">
          Les correspondances notées sur le terrain entre 18h et 19h. Le statut indique ce qui a été
          relevé&nbsp;; au-delà d&apos;une heure, on le signale comme à reconfirmer plutôt que de le
          présenter comme une vérité en temps réel.
        </p>
      </header>

      <div className="mt-6">
        <BanniereSession
          perime={fraicheurGlobale?.perime ?? false}
          fraicheur={fraicheurGlobale?.libelle}
        />
      </div>

      {/* L'agent passe en tête : c'est l'action principale de la page, elle
          était reléguée sous la grille de fiches. */}
      <div className="mt-6">
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
          <div className="border-border bg-background focus-within:border-brand-400 focus-within:ring-brand-400/25 flex items-center gap-2.5 rounded-lg border transition-[border-color,box-shadow] duration-150 focus-within:ring-4">
            <Search className="text-muted-foreground ml-3 size-4 shrink-0" aria-hidden />
            <input
              id="recherche-quartier"
              type="search"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Rechercher un quartier ou une station…"
              className="placeholder:text-muted-foreground/70 min-w-0 flex-1 bg-transparent py-3 pr-3 text-sm outline-none"
            />
          </div>

          {/* Les pastilles viennent des données : impossible qu'un quartier
              exister dans le registre sans être filtrable. */}
          <div className="mt-3 flex flex-wrap gap-2">
            <PastilleFiltre actif={filtre === "Tous"} onClick={() => setFiltre("Tous")}>
              Tous
            </PastilleFiltre>
            {filtresQuartier.map(({ quartier, court }) => (
              <PastilleFiltre
                key={quartier}
                actif={filtre === quartier}
                onClick={() => setFiltre(quartier)}
              >
                {court}
              </PastilleFiltre>
            ))}
          </div>

          <fieldset className="border-border/70 mt-3 border-t pt-3">
            <legend className="text-muted-foreground flex items-center gap-1.5 px-1 text-xs font-semibold">
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
            <Button onClick={reinitialiser} variant="signal" className="mt-6 px-5">
              Voir tous les relevés
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {liste.map((fiche, i) => (
              <div
                key={fiche.id}
                className="min-w-0 animate-rise"
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
