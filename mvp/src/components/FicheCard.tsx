import { AlertTriangle, ArrowRight, Clock3, MapPin, MessageCircle, Navigation } from "lucide-react";

import { urlItineraire } from "@/lib/carto";
import { statutFiche, type Depart, type Fiche } from "@/data/fiches";
import { compteARebours, useFraicheur, useMaintenant } from "@/lib/fraicheur";
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

/** « 18h40 » → minutes depuis minuit, pour trier les départs. */
function heureEnMinutes(heure: string): number {
  const [h, m] = heure.split("h");
  const heures = Number(h);
  const minutes = Number(m);
  return (Number.isNaN(heures) ? 0 : heures) * 60 + (Number.isNaN(minutes) ? 0 : minutes);
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
 * Fraîcheur de la DONNÉE (US-02), remontée en tête de carte : c'est la
 * première chose à lire avant de faire confiance à l'heure ci-dessous.
 *
 * D'où le code couleur — l'ambre signale un doute, pas une contradiction :
 *   vert  = le service existe (disponible)
 *   rouge = le service n'existe pas (indisponible)
 *   ambre = l'info est ancienne, à reconfirmer auprès du transporteur
 * Un badge rouge « périmé » posé à côté d'un badge vert « Disponible » se
 * lisait comme deux verdicts incompatibles.
 */
export function BadgeFraicheur({ releveLe }: { releveLe: string }) {
  const fraicheur = useFraicheur(releveLe);

  if (!fraicheur) {
    // Rendu serveur : l'heure absolue est stable, pas d'écart d'hydratation.
    return (
      <span className="bg-surface-2 text-muted-foreground inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold">
        <Clock3 className="size-3 shrink-0" aria-hidden />
        Relevé le {formaterReleve(releveLe)}
      </span>
    );
  }

  return (
    <span
      title={
        fraicheur.perime
          ? "Relevé ancien : le prix ou la disponibilité ont pu changer depuis. Confirmez auprès du transporteur."
          : "Relevé récent, l'information est à jour."
      }
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
        // sun-700 (encre-ambre foncée) sur clair : ~4.6:1. sun-400 ne passe
        // jamais en texte — il reste réservé aux surfaces.
        fraicheur.perime
          ? "bg-sun-400/15 text-sun-700 dark:text-sun-300"
          : "bg-success-soft text-success",
      )}
    >
      {fraicheur.perime ? (
        <AlertTriangle className="size-3 shrink-0" aria-hidden />
      ) : (
        <Clock3 className="size-3 shrink-0" aria-hidden />
      )}
      Relevé {fraicheur.libelle}
    </span>
  );
}

/**
 * Le départ mis en avant : le prochain réellement à venir si on est dans la
 * soirée du relevé (aucun sinon), sinon le plus tôt de la fiche. Son libellé
 * change avec — on ne dit jamais « prochain » d'un horaire déjà passé.
 */
function BlocProchain({ depart, compte }: { depart: Depart; compte: number | null }) {
  const frais = useFraicheur(depart.releveLe);

  return (
    <div className="border-border/70 bg-surface-2 mt-4 rounded-lg border px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs font-semibold">
            {compte !== null ? "Prochain départ" : "Horaire relevé"}
          </p>
          <p className="ry-num text-foreground text-4xl leading-none font-extrabold mt-1.5">
            {depart.heure}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p
            className={cn(
              "ry-num text-xl leading-none font-extrabold",
              // Un prix périmé reste lisible — l'usagère doit seulement savoir
              // qu'elle doit confirmer le tarif. Barré, il semblerait supprimé.
              frais?.perime ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {depart.prix.toLocaleString("fr-FR")}
            <span className="text-muted-foreground ml-0.5 text-xs font-bold">FCFA</span>
          </p>
          <p
            className={cn(
              "mt-1.5 text-[0.6875rem] font-bold",
              depart.statut === "Disponible" ? "text-success" : "text-danger",
            )}
          >
            {depart.statut}
          </p>
        </div>
      </div>

      {/*
        Compte à rebours : affiché uniquement si la fenêtre est réelle
        (relevé du jour, départ pas encore passé). Voir compteARebours —
        hors fenêtre, pas de « dans X min » du tout, l'heure reste datée par
        le badge de fraîcheur au-dessus.
      */}
      {compte !== null && (
        <p
          title="Décompte calculé depuis le relevé d'aujourd'hui"
          className="bg-success-soft text-success mt-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
        >
          <span aria-hidden className="bg-success size-1.5 rounded-full animate-pulse" />
          dans {compte} min
        </p>
      )}
    </div>
  );
}

export function FicheCard({ fiche }: { fiche: Fiche }) {
  const disponible = statutFiche(fiche) === "Disponible";
  const maintenant = useMaintenant();

  // Tous les départs d'une fiche partagent l'horodatage du relevé ; on prend
  // le plus ancien (le plus prudent) pour la fraîcheur affichée en carte.
  const releveLe = fiche.departs.map((d) => d.releveLe).sort()[0] ?? "";
  const releveFormate = formaterReleve(releveLe || null);

  // Tri chronologique : le board affiche le plus tôt d'abord.
  const tri = [...fiche.departs].sort((a, b) => heureEnMinutes(a.heure) - heureEnMinutes(b.heure));
  const prochain = tri.find((d) => compteARebours(d, maintenant) !== null) ?? tri[0];
  const compte = compteARebours(prochain, maintenant);
  const autres = tri.filter((d) => d !== prochain);

  return (
    <article
      className={cn(
        "group border-border/80 bg-card relative flex flex-col overflow-hidden rounded-xl border shadow-card",
        "transition-[transform,border-color,box-shadow] duration-200 ease-out",
        // Le survol n'existe qu'avec un vrai pointeur : sur tactile, :hover
        // reste collé après un tap et la carte semble bloquée.
        "fine:hover:-translate-y-1 fine:hover:border-brand-300 fine:hover:shadow-lift",
        !disponible && "bg-surface/60",
      )}
    >
      {/* Trait de signalétique : ambre si la correspondance part, sinon discret. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-0.5 transition-colors duration-200",
          disponible ? "bg-sun-400" : "bg-border",
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

        {/* Fraîcheur remontée : à lire avant l'horaire, pas enfouie sous lui. */}
        <div className="mt-3">
          <BadgeFraicheur releveLe={releveLe} />
        </div>

        {/* Motif ligne d'itinéraire : station → quartier, comme un tracé de ligne. */}
        <div className="border-border/70 mt-4 flex items-center gap-2.5 border-t pt-4">
          <span className="text-muted-foreground truncate text-xs font-semibold">
            {fiche.station.split(" ")[0]}
          </span>
          <span className="bg-border relative h-px flex-1" aria-hidden>
            <span className="bg-sun-400 absolute -top-[3px] left-0 size-1.5 rounded-full" />
            <ArrowRight className="text-muted-foreground absolute -top-[7px] right-0 size-3.5" />
          </span>
          <span className="truncate text-xs font-semibold">
            {fiche.quartier.split(" ").slice(-1)[0]}
          </span>
        </div>

        {/*
          Plusieurs départs par soirée (Sam Notaire part à 18h40 ET 19h05) :
          l'ancien modèle n'en montrait qu'un, donc l'usagère arrivait en
          retard pour le second.
        */}
        <BlocProchain depart={prochain} compte={compte} />

        {autres.length > 0 && (
          <div className="mt-3">
            <p className="text-muted-foreground text-xs font-semibold">Autres départs</p>
            <ul className="mt-1.5">
              {autres.map((depart, i) => (
                <li
                  key={`${depart.heure}-${depart.prix}`}
                  className={cn(
                    "flex items-center justify-between gap-3 py-2 text-sm",
                    i > 0 && "border-border/60 border-t",
                  )}
                >
                  <span className="ry-num flex items-center gap-1.5 font-bold">
                    <Clock3 className="text-muted-foreground size-3.5 shrink-0" aria-hidden />
                    {depart.heure}
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    {depart.statut === "Indisponible" && (
                      <span className="text-danger text-xs font-bold">indisponible</span>
                    )}
                    <span className="ry-num font-bold">
                      {depart.prix.toLocaleString("fr-FR")}
                      <span className="text-muted-foreground ml-0.5 text-xs font-bold">FCFA</span>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-border/70 grid grid-cols-2 gap-2 border-t p-3">
        <a
          href={urlItineraire(fiche.station)}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border bg-background text-muted-foreground hover:border-brand-300 hover:bg-accent hover:text-foreground flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-bold transition-[transform,border-color,background-color,color] duration-150 active:scale-[0.98]"
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
              releveLe: releveFormate,
              statut: statutFiche(fiche),
            }),
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-whatsapp hover:bg-whatsapp-hover flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-bold text-white transition-[transform,background-color] duration-150 active:scale-[0.98]"
        >
          <MessageCircle className="size-4" aria-hidden />
          WhatsApp
        </a>
      </div>
    </article>
  );
}
