import type { Fiche } from "@/data/fiches";

export function StatutPastille({ statut }: { statut: Fiche["statut"] }) {
  const dispo = statut === "Disponible";
  return (
    <span
      className={
        dispo
          ? "inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success"
          : "inline-flex items-center gap-1.5 rounded-full bg-danger-soft px-2.5 py-1 text-xs font-semibold text-danger"
      }
    >
      <span
        aria-hidden
        className={`size-2 rounded-full ${dispo ? "bg-success" : "bg-danger"}`}
      />
      {statut}
    </span>
  );
}

export function FicheCard({ fiche }: { fiche: Fiche }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-card-foreground">{fiche.station}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{fiche.quartier}</p>
        </div>
        <StatutPastille statut={fiche.statut} />
      </div>
      <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
        <p className="text-2xl font-extrabold text-primary">
          {fiche.prix} <span className="text-sm font-semibold">FCFA</span>
        </p>
        <p className="text-sm text-muted-foreground">relevé {fiche.heure}</p>
      </div>
    </article>
  );
}
