import { Volume2, VolumeX } from "lucide-react";

import type { Lecture } from "@/hooks/useSpeech";
import { cn } from "@/lib/utils";

export function BoutonLecture({
  texte,
  lecture,
  label = "Écouter la réponse",
  className,
}: {
  texte: string;
  lecture: Lecture;
  label?: string;
  className?: string;
}) {
  if (!lecture.dispo) return null;

  return (
    <button
      type="button"
      onClick={() => lecture.basculer(texte)}
      aria-label={lecture.enLecture ? "Arrêter la lecture" : label}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl border border-border/70 px-4 py-2.5 text-sm font-bold transition-all active:scale-[0.98]",
        lecture.enLecture ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent",
        className,
      )}
    >
      {lecture.enLecture ? (
        <VolumeX className="size-4" aria-hidden />
      ) : (
        <Volume2 className="size-4" aria-hidden />
      )}
      {lecture.enLecture ? "Arrêter" : "Écouter"}
    </button>
  );
}
