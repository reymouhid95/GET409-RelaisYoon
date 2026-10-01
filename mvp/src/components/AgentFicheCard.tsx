import { StatutPastille } from "@/components/FicheCard";
import type { FicheAgent } from "@/lib/ficheAgent";
import { texteFicheRelaisYoon, urlPartageWhatsApp } from "@/lib/partage";

export function AgentFicheCard({ fiche }: { fiche: FicheAgent }) {
  return (
    <div className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-card-foreground">{fiche.station}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{fiche.quartier}</p>
        </div>
        <StatutPastille statut="Disponible" />
      </div>
      <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
        <p className="text-2xl font-extrabold text-primary">{fiche.prix}</p>
        <p className="text-sm text-muted-foreground">relevé {fiche.heure}</p>
      </div>
      {fiche.sources && (
        <p className="mt-2 text-xs text-muted-foreground">Sources : {fiche.sources}</p>
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
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Partager sur WhatsApp
      </a>
    </div>
  );
}
