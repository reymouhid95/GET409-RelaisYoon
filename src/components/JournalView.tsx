import { useMemo, useState } from "react";
import { frameUrl } from "../lib/shotApi";
import type { Entry, EntrySource, Preset } from "../types";

interface JournalViewProps {
  entries: Entry[];
  production: string;
  presets: Preset[];
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

const SOURCE_LABELS: Record<EntrySource, string> = {
  preset: "Preset",
  text: "Texte",
  image: "Image",
};

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function JournalView({ entries, production, presets, onDelete, onDuplicate }: JournalViewProps) {
  const presetById = new Map(presets.map((preset) => [preset.id, preset]));
  const productionEntries = useMemo(
    () => entries.filter((entry) => entry.production === production),
    [entries, production],
  );
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);

  const shotSizeOf = (entry: Entry): string | undefined =>
    entry.description?.shotSize ??
    (entry.presetId ? presetById.get(entry.presetId)?.shotSize : undefined);

  const sizes = [...new Set(productionEntries.map(shotSizeOf).filter((s): s is string => !!s))].sort(
    (a, b) => a.localeCompare(b, "fr"),
  );
  const visible = sizeFilter
    ? productionEntries.filter((entry) => shotSizeOf(entry) === sizeFilter)
    : productionEntries;

  return (
    <section className="view" aria-label="Journal des prises">
      <header className="journal-header">
        <h2>{production || "Production sans nom"}</h2>
        <span className="count">
          {productionEntries.length} {productionEntries.length > 1 ? "prises" : "prise"}
        </span>
      </header>

      {productionEntries.length === 0 ? (
        <p className="empty">
          Aucune prise pour cette production. Ajoutez des presets, une description ou une image.
        </p>
      ) : (
        <>
          {sizes.length > 1 && (
            <div className="filter-chips" role="group" aria-label="Filtrer par taille de plan">
              <button
                type="button"
                className={sizeFilter === null ? "active" : ""}
                aria-pressed={sizeFilter === null}
                onClick={() => setSizeFilter(null)}
              >
                Toutes
              </button>
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={sizeFilter === size ? "active" : ""}
                  aria-pressed={sizeFilter === size}
                  onClick={() => setSizeFilter(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {visible.length === 0 ? (
            <p className="empty">
              Aucune prise en « {sizeFilter} » pour cette production.{" "}
              <button type="button" className="linklike" onClick={() => setSizeFilter(null)}>
                Voir toutes les prises
              </button>
            </p>
          ) : (
            <ul className="entry-list">
              {visible.map((entry) => {
                const preset = entry.presetId ? presetById.get(entry.presetId) : undefined;
                const title = entry.description
                  ? `${entry.description.shotSize} — ${entry.description.mood}`
                  : (preset?.name ?? "Preset inconnu");
                const focal = entry.description
                  ? `${entry.description.focalLengthMm} mm`
                  : preset?.focalLength;
                const meta = [SOURCE_LABELS[entry.source], focal, formatDate(entry.createdAt)]
                  .filter((part) => part !== undefined && part !== "")
                  .join(" · ");
                const thumb = entry.frameId ? frameUrl(entry.frameId) : undefined;
                return (
                  <li key={entry.id} className="entry-row">
                    {thumb && (
                      <img className="entry-thumb" src={thumb} alt="" loading="lazy" />
                    )}
                    <div>
                      <strong>{title}</strong>
                      <span className="entry-meta">{meta}</span>
                      {entry.description && (
                        <span className="entry-prompt">{entry.description.generationPrompt}</span>
                      )}
                    </div>
                    <div className="entry-actions">
                      <button type="button" onClick={() => onDuplicate(entry.id)}>
                        Dupliquer
                      </button>
                      <button type="button" className="danger" onClick={() => onDelete(entry.id)}>
                        Supprimer
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
