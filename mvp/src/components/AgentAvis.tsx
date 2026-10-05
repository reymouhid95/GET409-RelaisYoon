import { ThumbsDown, ThumbsUp } from "lucide-react";

import type { Avis } from "@/hooks/useAvis";
import { cn } from "@/lib/utils";

export function AgentAvis({
  question,
  avisDe,
  noter,
}: {
  question: string;
  avisDe: (q: string) => Avis | null;
  noter: (q: string, a: Avis) => void;
}) {
  const actuel = avisDe(question);

  return (
    <div className="mt-3 flex items-center gap-2">
      <span className="text-muted-foreground text-xs font-semibold">Utile&nbsp;?</span>
      <button
        type="button"
        onClick={() => noter(question, "up")}
        aria-pressed={actuel === "up"}
        aria-label="Réponse utile"
        title="Réponse utile"
        className={cn(
          "grid size-8 place-items-center rounded-md transition-[transform,background-color,color,box-shadow] duration-150 active:scale-95",
          actuel === "up"
            ? "bg-brand-500/15 text-brand-700 ring-brand-400/40 ring-1"
            : "text-muted-foreground hover:bg-accent hover:text-foreground",
        )}
      >
        <ThumbsUp className={cn("size-4", actuel === "up" && "fill-current")} aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => noter(question, "down")}
        aria-pressed={actuel === "down"}
        aria-label="Réponse à améliorer"
        title="Réponse à améliorer"
        className={cn(
          "grid size-8 place-items-center rounded-md transition-[transform,background-color,color,box-shadow] duration-150 active:scale-95",
          actuel === "down"
            ? "bg-danger/15 text-danger ring-danger/40 ring-1"
            : "text-muted-foreground hover:bg-accent hover:text-foreground",
        )}
      >
        <ThumbsDown className={cn("size-4", actuel === "down" && "fill-current")} aria-hidden />
      </button>
      {actuel && (
        <span className="text-muted-foreground text-xs font-semibold" role="status">
          Merci&nbsp;!{actuel === "down" && " On regarde."}
        </span>
      )}
      <span className="text-muted-foreground/70 ml-auto text-[0.625rem]">
        reste sur ton appareil
      </span>
    </div>
  );
}
