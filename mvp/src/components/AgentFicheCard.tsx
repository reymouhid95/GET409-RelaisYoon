import { Clock3, MessageCircle, Sparkles } from "lucide-react";

import { StatutPastille } from "@/components/FicheCard";
import type { FicheAgent } from "@/lib/ficheAgent";
import { texteFicheRelaisYoon, urlPartageWhatsApp } from "@/lib/partage";

export function AgentFicheCard({ fiche }: { fiche: FicheAgent }) {
  return (
    <div className="ry-halo animate-pop bg-card relative mt-5 overflow-hidden rounded-2xl shadow-lift">
      <div className="from-brand-500/10 via-sun-400/8 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent" />

      <div className="relative p-6">
        <p className="text-primary inline-flex items-center gap-1.5 text-[0.6875rem] font-bold tracking-widest uppercase">
          <Sparkles className="size-3.5" aria-hidden />
          Réponse de l&apos;agent
        </p>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-h3">{fiche.station}</h3>
            <p className="text-muted-foreground mt-1 text-sm">{fiche.quartier}</p>
          </div>
          <StatutPastille statut="Disponible" />
        </div>

        <div className="border-border/70 mt-5 flex items-end justify-between gap-3 border-t pt-4">
          <p className="text-primary ry-num text-3xl leading-none font-extrabold tracking-tight">
            {fiche.prix}
          </p>
          <p className="text-muted-foreground ry-num flex items-center gap-1.5 text-xs font-semibold">
            <Clock3 className="size-3.5" aria-hidden />
            relevé {fiche.heure}
          </p>
        </div>

        {fiche.fraicheur && (
          <p className="bg-surface text-muted-foreground mt-3 inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold">
            Données du {fiche.fraicheur}
          </p>
        )}

        {fiche.sources && (
          <p className="text-muted-foreground/90 bg-surface mt-4 rounded-lg px-3 py-2 text-xs">
            <span className="font-bold">Sources : </span>
            {fiche.sources}
          </p>
        )}

        <a
          href={urlPartageWhatsApp(
            texteFicheRelaisYoon({
              station: fiche.station,
              quartier: fiche.quartier,
              prix: fiche.prix,
              heure: fiche.heure,
              statut: "Disponible",
            }),
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-whatsapp hover:bg-whatsapp-hover focus-visible:ring-whatsapp mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 active:scale-[0.98]"
        >
          <MessageCircle className="size-4" aria-hidden />
          Partager sur WhatsApp
        </a>
      </div>
    </div>
  );
}
