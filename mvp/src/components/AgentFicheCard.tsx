import { useState } from "react";
import { Check, Clock3, Link2, MessageCircle, Star } from "lucide-react";

import { BoutonLecture } from "@/components/BoutonLecture";
import { StatutPastille } from "@/components/FicheCard";
import type { Lecture } from "@/hooks/useSpeech";
import type { FicheAgent } from "@/lib/ficheAgent";
import { phraseFiche } from "@/lib/ficheAgent";
import { texteFicheRelaisYoon, urlPartageWhatsApp } from "@/lib/partage";
import { cn } from "@/lib/utils";

export function AgentFicheCard({
  fiche,
  lecture,
  favori,
}: {
  fiche: FicheAgent;
  lecture?: Lecture;
  favori?: { actif: boolean; onBasculer: () => void };
}) {
  const [lieuCopie, setLieuCopie] = useState(false);

  const copierLien = async () => {
    const params = new URLSearchParams({
      station: fiche.station,
      quartier: fiche.quartier,
      prix: fiche.prix,
      heure: fiche.heure,
      sources: fiche.sources,
      fraicheur: fiche.fraicheur,
    });
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/fiche?${params}`);
      setLieuCopie(true);
      window.setTimeout(() => setLieuCopie(false), 2500);
    } catch {
      /* presse-papiers refusé : le bouton reste silencieux */
    }
  };
  return (
    <div className="animate-pop bg-board text-board-foreground relative mt-5 overflow-hidden rounded-xl">
      <div className="p-6">
        <p className="flex items-center gap-2.5 text-xs font-semibold text-board-foreground/60">
          <span aria-hidden className="bg-sun-400 h-px w-6" />
          Réponse de l&apos;agent
        </p>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-h3 text-board-foreground">{fiche.station}</h3>
            <p className="mt-1 text-sm text-board-foreground/70">{fiche.quartier}</p>
          </div>
          <StatutPastille statut="Disponible" />
        </div>

        <div className="border-board-line mt-5 flex items-end justify-between gap-3 border-t pt-4">
          <p className="ry-num text-3xl leading-none font-bold text-sun-400">{fiche.prix}</p>
          <p className="ry-num flex items-center gap-1.5 text-xs font-semibold text-board-foreground/70">
            <Clock3 className="size-3.5" aria-hidden />
            relevé {fiche.heure}
          </p>
        </div>

        {fiche.fraicheur && (
          <p className="mt-3 inline-flex rounded-md bg-white/10 px-3 py-1.5 text-xs font-semibold text-board-foreground/80">
            Données du {fiche.fraicheur}
          </p>
        )}

        {fiche.sources && (
          <p className="mt-4 rounded-md bg-white/10 px-3 py-2 text-xs text-board-foreground/80">
            <span className="font-bold text-board-foreground">Sources : </span>
            {fiche.sources}
          </p>
        )}

        {favori && (
          <button
            type="button"
            onClick={favori.onBasculer}
            aria-pressed={favori.actif}
            title={
              favori.actif
                ? "Retirer des stations enregistrées"
                : "Garder cette station sur cet appareil"
            }
            className={cn(
              "mt-4 flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold transition-[transform,border-color,background-color,color] duration-150 active:scale-[0.98]",
              favori.actif
                ? "border-sun-400/60 bg-sun-400/15 text-sun-300"
                : "border-board-line text-board-foreground hover:bg-white/10",
            )}
          >
            <Star
              className={cn("size-4", favori.actif && "fill-current text-sun-400")}
              aria-hidden
            />
            {favori.actif ? "Station enregistrée" : "Garder cette station"}
          </button>
        )}

        {lecture && (
          <BoutonLecture
            texte={phraseFiche(fiche)}
            lecture={lecture}
            label="Écouter la fiche"
            className="border-board-line text-board-foreground hover:bg-white/10 mt-4 w-full"
          />
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
          className="bg-whatsapp hover:bg-whatsapp-hover mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white transition-[transform,background-color] duration-150 active:scale-[0.98]"
        >
          <MessageCircle className="size-4" aria-hidden />
          Partager sur WhatsApp
        </a>

        <button
          type="button"
          onClick={copierLien}
          className="border-board-line text-board-foreground hover:bg-white/10 mt-2 flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold transition-[transform,background-color] duration-150 active:scale-[0.98]"
        >
          {lieuCopie ? (
            <Check className="size-4 text-sun-400" aria-hidden />
          ) : (
            <Link2 className="size-4" aria-hidden />
          )}
          {lieuCopie ? "Lien copié" : "Copier le lien de la fiche"}
        </button>
      </div>
    </div>
  );
}
