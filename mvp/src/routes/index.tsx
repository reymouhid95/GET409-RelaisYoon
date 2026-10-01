import { createFileRoute, Link } from "@tanstack/react-router";

import { FicheCard } from "@/components/FicheCard";
import { fiches } from "@/data/fiches";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RelaisYoon — savoir où monter avant de descendre" },
      {
        name: "description",
        content:
          "Fiches de correspondance BRT relevées chaque soir à Dakar : station, quartier, prix en FCFA et disponibilité.",
      },
      { property: "og:title", content: "RelaisYoon — correspondances BRT du soir à Dakar" },
      {
        property: "og:description",
        content: "Prix et disponibilité des correspondances après le BRT, relevés chaque soir.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const apercu = fiches.slice(0, 3);

  return (
    <div>
      <section className="border-b border-border bg-primary/5">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Relevés du soir · Dakar
          </p>
          <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            RelaisYoon — savoir où monter avant de descendre
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Fiches de correspondance BRT relevées chaque soir à Dakar
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/fiches"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Je cherche une correspondance
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-card px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              Je relève un prix
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-primary px-4 py-3">
        <p className="mx-auto max-w-5xl text-center text-sm font-semibold text-primary-foreground">
          📢 Relevés du soir mis à jour chaque semaine
        </p>
      </div>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-bold tracking-tight">Derniers relevés</h2>
          <Link to="/fiches" className="text-sm font-semibold text-primary hover:underline">
            Voir toutes les fiches du soir →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {apercu.map((fiche) => (
            <FicheCard key={fiche.id} fiche={fiche} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              titre: "Relevé chaque soir",
              texte: "Les prix sont notés sur le terrain entre 18h et 19h.",
            },
            {
              titre: "Quartiers couverts",
              texte: "Sam Notaire, Ndiarème, Yeumbeul et au-delà.",
            },
            {
              titre: "Statut clair",
              texte: "Une pastille indique si la correspondance est disponible.",
            },
          ].map((item) => (
            <div key={item.titre} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-bold">{item.titre}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.texte}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
