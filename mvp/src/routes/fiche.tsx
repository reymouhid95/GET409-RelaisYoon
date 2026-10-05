import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { AgentFicheCard } from "@/components/AgentFicheCard";
import type { FicheAgent } from "@/lib/ficheAgent";
import { normaliseFichePartagee } from "@/lib/ficheAgent";

type FichePartagee = FicheAgent;

const chaine = (v: unknown): string =>
  typeof v === "string" ? v : v !== undefined && v !== null ? String(v) : "";

export const Route = createFileRoute("/fiche")({
  validateSearch: (search: Record<string, unknown>): FichePartagee => ({
    station: chaine(search["station"]),
    quartier: chaine(search["quartier"]),
    prix: chaine(search["prix"]),
    heure: chaine(search["heure"]),
    sources: chaine(search["sources"]),
    fraicheur: chaine(search["fraicheur"]),
  }),
  head: () => ({
    meta: [
      { title: "Fiche partagée — RelaisYoon" },
      {
        name: "description",
        content: "Correspondance partagée : station, quartier, prix, heure et fraîcheur.",
      },
    ],
  }),
  component: FichePartageePage,
});

function FichePartageePage() {
  const recherche = Route.useSearch();
  const fiche = normaliseFichePartagee(recherche);
  const complet = !!(fiche.station && fiche.quartier && fiche.prix && fiche.heure);

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-10">
      <p className="text-muted-foreground flex items-center gap-2.5 text-sm font-semibold">
        <span aria-hidden className="bg-sun-400 h-px w-6" />
        Fiche partagée
      </p>

      {complet ? (
        <>
          <p className="text-muted-foreground mt-2 text-sm">
            Quelqu&apos;un t&apos;a partagé cette correspondance — les chiffres viennent des relevés
            RelaisYoon.
          </p>
          <AgentFicheCard fiche={fiche} />
        </>
      ) : (
        <div className="bg-surface mt-4 rounded-2xl p-5">
          <p className="text-sm font-bold">Lien de fiche incomplet</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Il manque des informations — ouvre les relevés pour poser la question toi-même.
          </p>
        </div>
      )}

      <Link
        to="/fiches"
        className="bg-sun-400 text-signal-ink hover:bg-sun-300 mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition-[transform,background-color] duration-150 active:scale-[0.98]"
      >
        Poser la question à l&apos;agent
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </main>
  );
}
