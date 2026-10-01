import { AlertTriangle, ArrowRight, Clock3, MapPin, MessageCircle, Navigation } from "lucide-react";

import { urlItineraire } from "@/lib/carto";
import { statutFiche, type Depart, type Fiche } from "@/data/fiches";
import { useFraicheur } from "@/lib/fraicheur";
import { texteFicheRelaisYoonMulti, urlPartageWhatsApp } from "@/lib/partage";
import { cn } from "@/lib/utils";

/** « 01/10 18h40 » — l'heure du relevé, telle que l'usagère la note sur le terrain. */
function formaterReleve(iso: string | null): string {
  if (!iso) return "inconnu";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "inconnu";
  const jour = String(d.getDate()).padStart(2, "0");
  const mois = String(d.getMonth() + 1).padStart(2, "0");
  const heures = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${jour}/${mois} ${heures}h${minutes}`;
}

export function StatutPastille({ statut }: { statut: Fiche["departs"][number]["statut"] }) {
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

/**
 * Le marqueur de fraîcheur (US-02). Tant que le composant n'est pas monté, on
 * affiche le libellé statique issu de la donnée : le serveur et le client
 * rendront alors exactement la même chose, et l'heure relative n'apparaît
 * qu'ensuite, côté navigateur.
 */
export function BadgeFraicheur({ depart }: { depart: Depart }) {
  const fraicheur = useFraicheur(depart.releveLe);

  if (!fraicheur) {
    return (
      <span className="text-muted-foreground text-xs font-semibold">relevé à {depart.heure}</span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold",
        fraicheur.perime ? "text-danger" : "text-success",
      )}
    >
      {fraicheur.perime && <AlertTriangle className="size-3" aria-hidden />}
      {fraicheur.perime ? "périmé" : `relevé ${fraicheur.libelle}`}
    </span>
  );
}

function LigneDepart({ depart, Dernier }: { depart: Depart; Dernier?: boolean }) {
  const frais = useFraicheur(depart.releveLe);

  return (
    <li
      className={cn(
        "flex items-center justify-between gap-3 py-2.5",
        !Dernier && "border-border/60 border-b",
        frais?.perime && "text-muted-foreground",
      )}
    >
      <div className="min-w-0">
        <p className="ry-num flex items-center gap-1.5 text-sm font-bold">
          <Clock3 className="text-muted-foreground size-3.5 shrink-0" aria-hidden />
          {depart.heure}
        </p>
        <p className="ml-5 mt-0.5">
          <BadgeFraicheur depart={depart} />
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p
          className={cn(
            "ry-num text-xl leading-none font-extrabold",
            // Un prix périmé reste lisible — l'usagère sait qu'il existe une
            // correspondance, elle doit seulement savoir qu'elle doit
            // confirmer le tarif. Le barré le ferait passer pour supprimé.
            frais?.perime ? "text-muted-foreground" : "text-primary",
          )}
        >
          {depart.prix.toLocaleString("fr-FR")}
          <span className="text-muted-foreground ml-0.5 text-xs font-bold">FCFA</span>
        </p>
        <p className="text-muted-foreground mt-1 text-[0.6875rem] font-semibold">{depart.statut}</p>
      </div>
    </li>
  );
}

export function FicheCard({ fiche }: { fiche: Fiche }) {
  const disponible = statutFiche(fiche) === "Disponible";
  const releveLe = formaterReleve(fiche.departs[0]?.releveLe ?? null);

  return (
    <article
      className={cn(
        "group border-border/80 bg-card relative flex flex-col overflow-hidden rounded-2xl border shadow-card transition-all duration-300",
        "hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift",
        !disponible && "bg-surface/60",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r transition-opacity duration-300",
          disponible
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
          <StatutPastille statut={statutFiche(fiche)} />
        </div>

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

        {/*
          Plusieurs départs par soirée (Sam Notaire part à 18h40 ET 19h05) :
          l'ancien modèle n'en montrait qu'un, donc l'usagère arrivait en
          retard pour le second.
        */}
        <ul className="mt-2">
          {fiche.departs.map((depart, i) => (
            <LigneDepart
              key={`${depart.heure}-${depart.prix}`}
              depart={depart}
              Dernier={i === fiche.departs.length - 1}
            />
          ))}
        </ul>
      </div>

      <div className="border-border/70 grid grid-cols-2 gap-2 border-t p-3">
        <a
          href={urlItineraire(fiche.station)}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border bg-background text-muted-foreground hover:border-brand-300 hover:bg-accent hover:text-foreground focus-visible:ring-brand-400 flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-bold transition-all duration-200 active:scale-[0.98]"
        >
          <Navigation className="size-4" aria-hidden />
          Itinéraire
        </a>
        <a
          href={urlPartageWhatsApp(
            texteFicheRelaisYoonMulti({
              station: fiche.station,
              quartier: fiche.quartier,
              departs: fiche.departs.map((d) => ({
                heure: d.heure,
                prix: d.prix,
                statut: d.statut,
              })),
              releveLe,
              statut: statutFiche(fiche),
            }),
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-whatsapp hover:bg-whatsapp-hover focus-visible:ring-whatsapp flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-white transition-all duration-200 active:scale-[0.98]"
        >
          <MessageCircle className="size-4" aria-hidden />
          WhatsApp
        </a>
      </div>
    </article>
  );
}
