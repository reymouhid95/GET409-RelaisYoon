import type { Entry, Preset } from "../types";

interface JournalViewProps {
  entries: Entry[];
  production: string;
  presets: Preset[];
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function JournalView({ entries, production, presets, onDelete, onDuplicate }: JournalViewProps) {
  const presetById = new Map(presets.map((preset) => [preset.id, preset]));
  const productionEntries = entries.filter((entry) => entry.production === production);

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
          Aucune prise pour cette production. Ajoutez des presets depuis la Bibliothèque.
        </p>
      ) : (
        <ul className="entry-list">
          {productionEntries.map((entry) => {
            const preset = presetById.get(entry.presetId);
            return (
              <li key={entry.id} className="entry-row">
                <div>
                  <strong>{preset?.name ?? "Preset inconnu"}</strong>
                  <span className="entry-meta">
                    {preset?.shotSize} · {preset?.focalLength} · {formatDate(entry.createdAt)}
                  </span>
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
    </section>
  );
}
