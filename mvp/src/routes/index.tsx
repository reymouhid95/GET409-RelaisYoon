import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  CalendarClock,
  ClipboardCheck,
  MapPin,
  MessageCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { FicheCard } from "@/components/FicheCard";
import { Button } from "@/components/ui/button";
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

const ETAPES = [
  {
    icone: Bot,
    titre: "Vous posez la question",
    texte:
      "« Petersen vers Guédiawaye ? » — au clavier ou à la voix, depuis la page Fiches du soir.",
  },
  {
    icone: TrendingUp,
    titre: "L'agent interroge les relevés",
    texte: "Seuls les relevés du soir sont utilisés comme source. Rien n'est inventé hors base.",
  },
  {
    icone: MessageCircle,
    titre: "Vous repartez avec la fiche",
    texte: "Quartier, prix en FCFA, heure du relevé — et un bouton pour partager sur WhatsApp.",
  },
] as const;

const GARANTIES = [
  {
    icone: CalendarClock,
    titre: "Relevé chaque soir",
    texte: "Les prix sont notés sur le terrain entre 18h et 19h, puis publiés.",
  },
  {
    icone: MapPin,
    titre: "Quartiers couverts",
    texte: "Sam Notaire, Ndiarème, Yeumbeul, Yoff et Keur Massar.",
  },
  {
    icone: ClipboardCheck,
    titre: "Statut clair",
    texte: "Une pastille indique si la correspondance part réellement ce soir-là.",
  },
] as const;

function Index() {
  const apercu = fiches.slice(0, 3);
  const tousLesDeparts = fiches.flatMap((f) => f.departs);
  const departsDisponibles = tousLesDeparts.filter((d) => d.statut === "Disponible").length;

  return (
    <div>
      {/* ---------------------------------------------------------- Hero */}
      <section className="ry-mesh relative overflow-hidden border-b">
        <div aria-hidden className="ry-grid pointer-events-none absolute inset-0" />

        <div className="relative mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="animate-rise">
              <p className="border-brand-200 bg-brand-100/70 text-brand-700 dark:border-brand-800 dark:bg-brand-900/50 dark:text-brand-300 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase">
                <span className="bg-success animate-pulse size-1.5 rounded-full" aria-hidden />
                Relevés du soir · Dakar
              </p>

              <h1 className="text-display mt-6">
                Savoir où monter
                <br />
                <span className="ry-gradient-text">avant de descendre.</span>
              </h1>

              <p className="text-muted-foreground text-lede mt-6 max-w-xl">
                Une usagère de Guédiawaye descend du BRT à Petersen. Il lui faut savoir si une
                correspondance part vers son quartier, et à quel prix — sans finir le trajet à
                l&apos;aveugle.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="from-brand-500 to-brand-700 shadow-glow hover:from-brand-600 hover:to-brand-800 h-13 rounded-full px-7 text-[0.9375rem]"
                >
                  <Link to="/fiches">
                    Je cherche une correspondance
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-border bg-card/70 h-13 rounded-full px-7 text-[0.9375rem] backdrop-blur"
                >
                  <Link to="/contact">Je relève un prix</Link>
                </Button>
              </div>
            </div>

            {/* Aperçu produit : la preuve visuelle plutôt qu'une promesse. */}
            <div className="animate-pop relative" style={{ animationDelay: "120ms" }}>
              <div
                aria-hidden
                className="from-brand-500/20 to-sun-400/20 absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br blur-2xl"
              />
              <div className="bg-card/80 border-border/70 rounded-3xl border p-6 shadow-pop backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-muted-foreground text-[0.6875rem] font-bold tracking-widest uppercase">
                    Ce soir · 18h40
                  </p>
                  <span className="bg-success-soft text-success inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase">
                    <span className="bg-success size-1.5 rounded-full" aria-hidden />
                    En direct
                  </span>
                </div>

                <div className="mt-5 space-y-2.5">
                  {apercu.map((fiche) => (
                    <div
                      key={fiche.id}
                      className="bg-background/70 border-border/60 flex items-center justify-between gap-3 rounded-xl border px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{fiche.quartier}</p>
                        <p className="text-muted-foreground truncate text-xs">
                          {fiche.departs.map((d) => d.heure).join(" · ")} · {fiche.station}
                        </p>
                      </div>
                      <p className="text-primary ry-num shrink-0 text-lg font-extrabold">
                        {Math.min(...fiche.departs.map((d) => d.prix))}
                        <span className="text-muted-foreground ml-0.5 text-[0.625rem] font-bold">
                          FCFA
                        </span>
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-border/60 mt-5 flex items-center gap-2.5 border-t pt-4">
                  <Sparkles className="text-primary size-4 shrink-0" aria-hidden />
                  <p className="text-muted-foreground text-xs">
                    {departsDisponibles} départs disponibles sur {tousLesDeparts.length} relevés
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Bandeau */}
      <section className="border-border/60 bg-card/50 border-b">
        <div className="mx-auto grid max-w-page grid-cols-2 divide-x divide-y sm:grid-cols-4 sm:divide-y-0">
          {[
            { valeur: String(tousLesDeparts.length), libelle: "départs relevés" },
            { valeur: String(departsDisponibles), libelle: "départs disponibles" },
            { valeur: "18h–19h", libelle: "créneau de relevé" },
            { valeur: "0", libelle: "prix inventés" },
          ].map((stat) => (
            <div key={stat.libelle} className="px-4 py-7 text-center">
              <p className="text-primary ry-num text-2xl font-extrabold tracking-tight sm:text-3xl">
                {stat.valeur}
              </p>
              <p className="text-muted-foreground mt-1.5 text-xs font-semibold">{stat.libelle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ Méthode */}
      <section className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-primary text-[0.6875rem] font-bold tracking-widest uppercase">
            Comment ça marche
          </p>
          <h2 className="text-h1 mt-3">Trois étapes, pas de détour</h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ETAPES.map((etape, i) => (
            <div
              key={etape.titre}
              className="group border-border/70 bg-card animate-rise relative rounded-2xl border p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="text-brand-400 ry-num absolute top-5 right-6 text-4xl font-extrabold opacity-30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="from-brand-500 to-brand-700 shadow-card grid size-11 place-items-center rounded-xl bg-gradient-to-br text-white">
                <etape.icone className="size-5" aria-hidden />
              </span>
              <h3 className="text-h3 mt-5">{etape.titre}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{etape.texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ Derniers relevés */}
      <section className="bg-surface/60 border-border/60 border-y">
        <div className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-primary text-[0.6875rem] font-bold tracking-widest uppercase">
                Derniers relevés
              </p>
              <h2 className="text-h1 mt-3">Ce qui part ce soir</h2>
            </div>
            <Button asChild variant="ghost" className="text-primary rounded-full">
              <Link to="/fiches">
                Toutes les fiches du soir
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apercu.map((fiche, i) => (
              <div
                key={fiche.id}
                className="animate-rise"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <FicheCard fiche={fiche} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Garanties */}
      <section className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-3">
          {GARANTIES.map((garantie) => (
            <div
              key={garantie.titre}
              className="border-border/70 bg-card/60 flex gap-4 rounded-2xl border p-5"
            >
              <span className="bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300 grid size-10 shrink-0 place-items-center rounded-xl">
                <garantie.icone className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-bold">{garantie.titre}</h3>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  {garantie.texte}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- CTA */}
      <section className="mx-auto max-w-page px-4 pb-4 sm:px-6">
        <div className="ry-mesh border-border/70 relative overflow-hidden rounded-3xl border p-10 text-center sm:p-16">
          <div aria-hidden className="ry-grid pointer-events-none absolute inset-0" />
          <div className="relative">
            <h2 className="text-h1 mx-auto max-w-2xl">Vous descendez à Petersen dans une heure.</h2>
            <p className="text-muted-foreground text-lede mx-auto mt-4 max-w-xl">
              Posez votre question à l&apos;agent et repartez avec le prix, le quartier et
              l&apos;heure du relevé.
            </p>
            <Button
              asChild
              size="lg"
              className="from-brand-500 to-brand-700 shadow-glow hover:from-brand-600 hover:to-brand-800 mt-8 h-13 rounded-full px-8 text-[0.9375rem]"
            >
              <Link to="/fiches">
                Consulter l&apos;agent
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
