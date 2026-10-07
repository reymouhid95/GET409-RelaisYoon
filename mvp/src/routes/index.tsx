import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  CalendarClock,
  ClipboardCheck,
  MapPin,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

import { FicheCard } from "@/components/FicheCard";
import { Button } from "@/components/ui/button";
import { dernierReleve, fiches } from "@/data/fiches";
import { useFraicheur } from "@/lib/fraicheur";

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

  // « En direct » n'est honnête que si le relevé le plus récent a moins
  // d'une heure (SEUIL_PERIME_MINUTES) : au-delà, pas de badge du tout plutôt
  // qu'une prétention de temps réel. Null côté serveur → badge absent à
  // l'hydratation, il n'apparaît que si la donnée est réellement fraîche.
  const fraicheur = useFraicheur(dernierReleve);
  const enDirect = fraicheur !== null && !fraicheur.perime;

  return (
    <div>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b">
        <div aria-hidden className="ry-grid pointer-events-none absolute inset-0" />

        <div className="relative mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* min-w-0 : sans ça, la colonne vaut la taille min-content d'un
                enfant et le titre déborde (puis est rogné par overflow-hidden)
                sur les petits écrans. */}
            <div className="min-w-0">
              {/* Filet de signalétique + libellé : pas de pilule décorative. */}
              <p className="animate-fade text-muted-foreground flex items-center gap-2.5 text-sm font-semibold">
                <span aria-hidden className="bg-sun-400 h-px w-8" />
                Relevés du soir · Dakar
              </p>

              <h1 className="text-display animate-rise mt-5">
                Savoir où monter avant de descendre.
              </h1>

              <p
                className="text-muted-foreground text-lede animate-rise mt-6 max-w-xl"
                style={{ animationDelay: "60ms" }}
              >
                Une usagère de Guédiawaye descend du BRT à Petersen. Il lui faut savoir si une
                correspondance part vers son quartier, et à quel prix — sans finir le trajet à
                l&apos;aveugle.
              </p>

              <div
                className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "120ms" }}
              >
                <Button asChild size="lg" variant="signal" className="h-12 px-7 text-[0.9375rem]">
                  <Link to="/fiches">
                    Je cherche une correspondance
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 border-border bg-card/70 px-7 text-[0.9375rem] backdrop-blur"
                >
                  <Link to="/contact">Je relève un prix</Link>
                </Button>
              </div>
            </div>

            {/*
              Le panneau de départs : l'objet mémorable de la page. Surface
              sombre always-on (un objet du monde réel, pas une section
              peinte), chiffres ambre alignés en tabulaire, filets pointillés.
            */}
            <div className="min-w-0 animate-rise" style={{ animationDelay: "160ms" }}>
              <div className="ry-board rounded-xl p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-board-foreground/60 text-[0.6875rem] font-bold tracking-widest uppercase">
                    Ce soir · 18h40
                  </p>
                  {enDirect && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-sun-400/15 px-2.5 py-1 text-[0.6875rem] font-bold text-sun-500 uppercase">
                      <span className="bg-sun-400 size-1.5 rounded-full" aria-hidden />
                      En direct
                    </span>
                  )}
                </div>

                <div className="mt-5">
                  {apercu.map((fiche) => (
                    <div
                      key={fiche.id}
                      className="ry-board-row flex items-center justify-between gap-3 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{fiche.quartier}</p>
                        <p className="text-board-foreground/60 truncate text-xs">
                          {fiche.departs.map((d) => d.heure).join(" · ")} · {fiche.station}
                        </p>
                      </div>
                      <p className="ry-num shrink-0 text-lg font-bold text-sun-400">
                        {Math.min(...fiche.departs.map((d) => d.prix))}
                        <span className="text-board-foreground/60 ml-0.5 text-[0.625rem] font-semibold">
                          FCFA
                        </span>
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-board-line/60 mt-4 flex items-center gap-2.5 border-t pt-4">
                  <span className="bg-success size-1.5 shrink-0 rounded-full" aria-hidden />
                  <p className="text-board-foreground/70 text-xs">
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
              <p className="ry-num font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {stat.valeur}
              </p>
              <p className="text-muted-foreground mt-1.5 text-xs font-medium">{stat.libelle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ Méthode */}
      <section className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-muted-foreground flex items-center gap-2.5 text-sm font-semibold">
            <span aria-hidden className="bg-sun-400 h-px w-8" />
            Comment ça marche
          </p>
          <h2 className="text-h1 mt-4">Trois étapes, pas de détour</h2>
        </div>

        {/*
          Les étapes forment une vraie séquence : le motif « ligne de
          itinéraire » (points d'arrêt + filet) encode l'information au lieu
          de décorer. Chaque étape est une station sur la ligne.
        */}
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {ETAPES.map((etape, i) => (
            <li key={etape.titre} className="relative">
              <div aria-hidden className="mb-6 flex items-center">
                <span className="bg-sun-400 relative z-10 size-3.5 shrink-0 rounded-full ring-4 ring-sun-400/20" />
                {i < ETAPES.length - 1 && (
                  <span className="bg-border hidden h-px flex-1 md:block" />
                )}
              </div>
              <span className="bg-surface-2 text-muted-foreground grid size-10 place-items-center rounded-md">
                <etape.icone className="size-5" aria-hidden />
              </span>
              <h3 className="text-h3 mt-4">{etape.titre}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{etape.texte}</p>
              <span className="sr-only">
                Étape {i + 1} sur {ETAPES.length}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------ Derniers relevés */}
      <section className="bg-surface/60 border-border/60 border-y">
        <div className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-muted-foreground flex items-center gap-2.5 text-sm font-semibold">
                <span aria-hidden className="bg-sun-400 h-px w-8" />
                Derniers relevés
              </p>
              <h2 className="text-h1 mt-4">Ce qui part ce soir</h2>
            </div>
            <Button asChild variant="ghost" className="text-primary rounded-full">
              <Link to="/fiches">
                Toutes les fiches du soir
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apercu.map((fiche) => (
              <FicheCard key={fiche.id} fiche={fiche} />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Garanties */}
      <section className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="sr-only">Ce que garantit le relevé</h2>
        <div className="border-border/70 grid divide-y rounded-xl border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {GARANTIES.map((garantie) => (
            <div key={garantie.titre} className="flex gap-4 p-6">
              <span className="bg-surface-2 text-primary grid size-10 shrink-0 place-items-center rounded-md">
                <garantie.icone className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-semibold">{garantie.titre}</h3>
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
        <div className="ry-board relative overflow-hidden rounded-xl p-10 sm:p-14">
          <div aria-hidden className="ry-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative max-w-2xl">
            <h2 className="text-board-foreground text-h1">
              Vous descendez à Petersen dans une heure.
            </h2>
            <p className="text-board-foreground/70 text-lede mt-4">
              Posez votre question à l&apos;agent et repartez avec le prix, le quartier et
              l&apos;heure du relevé.
            </p>
            <Button asChild size="lg" variant="signal" className="mt-8 h-12 px-8 text-[0.9375rem]">
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
