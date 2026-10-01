import { ArrowRight, Clock3, MapPin, MessageCircle } from "lucide-react";

import type { Fiche } from "@/data/fiches";
import { texteFicheRelaisYoon, urlPartageWhatsApp } from "@/lib/partage";
import { cn } from "@/lib/utils";

export function StatutPastille({ statut }: { statut: Fiche["statut"] }) {
  const dispo = statut === "Disponible";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-bold tracking-wide uppercase",
        dispo ? "bg-success-soft text-success" : "bg-danger-soft text-danger",
      )}
    >
      <span
        aria-hidden
        className={cn("size-1.5 rounded-full", dispo ? "bg-success animate-pulse" : "bg-danger")}
      />
      {statut}
    </span>
  );
}

export function FicheCard({ fiche }: { fiche: Fiche }) {
  const dispo = fiche.statut === "Disponible";

  return (
    <article
      className={cn(
        "group border-border/80 bg-card relative flex flex-col overflow-hidden rounded-2xl border shadow-card transition-all duration-300",
        "hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift",
        // Une fiche indisponible reste lisible mais clairement moins attirante :
        // l'œil doit aller en premier vers ce qui part réellement ce soir.
        !dispo && "bg-surface/60",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r transition-opacity duration-300",
          dispo
            ? "from-brand-500 via-brand-400 to-sun-400 opacity-100"
            : "from-muted-foreground/40 to-transparent opacity-60",
        )}
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-h3 truncate">{fiche.station}</h3>
            <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
              <MapPin className="size-3.5 shrink-0" aria-hidden />
              <span className="truncate">{fiche.quartier}</span>
            </p>
          </div>
          <StatutPastille statut={fiche.statut} />
        </div>

        {/* Le trajet est l'information centrale : on le rend visuel. */}
        <div className="border-border/70 mt-5 flex items-center gap-2.5 border-t pt-4">
          <span className="text-muted-foreground truncate text-xs font-semibold tracking-wide uppercase">
            {fiche.station.split(" ")[0]}
          </span>
          <span className="text-brand-400 relative h-px flex-1" aria-hidden>
            <ArrowRight className="absolute -top-[7px] right-0 size-3.5" />
          </span>
          <span className="truncate text-xs font-semibold tracking-wide uppercase">
            {fiche.quartier.split(" ").slice(-1)[0]}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <p className="text-primary ry-num text-3xl leading-none font-extrabold tracking-tight">
            {fiche.prix.toLocaleString("fr-FR")}
            <span className="text-muted-foreground ml-1 text-sm font-bold tracking-normal">
              FCFA
            </span>
          </p>
          <p className="text-muted-foreground ry-num flex items-center gap-1.5 text-xs font-semibold">
            <Clock3 className="size-3.5" aria-hidden />
            relevé {fiche.heure}
          </p>
        </div>
      </div>

      <div className="border-border/70 border-t p-3">
        <a
          href={urlPartageWhatsApp(
            texteFicheRelaisYoon({
              station: fiche.station,
              quartier: fiche.quartier,
              prix: `${fiche.prix} FCFA`,
              heure: fiche.heure,
              statut: fiche.statut,
            }),
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-whatsapp hover:bg-whatsapp-hover focus-visible:ring-whatsapp flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 active:scale-[0.98]"
        >
          <MessageCircle className="size-4" aria-hidden />
          Partager sur WhatsApp
        </a>
      </div>
    </article>
  );
}
