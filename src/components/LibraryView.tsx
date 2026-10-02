import type { Preset } from "../types";

interface LibraryViewProps {
  presets: Preset[];
  query: string;
  onQueryChange: (query: string) => void;
  onAdd: (presetId: string) => void;
}

export function LibraryView({ presets, query, onQueryChange, onAdd }: LibraryViewProps) {
  return (
    <section className="view" aria-label="Bibliothèque de presets">
      <div className="view-toolbar">
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Rechercher : gros plan, contre-plongée, nuit…"
          aria-label="Rechercher un preset"
        />
        <span className="count">{presets.length} / 20 presets</span>
      </div>

      {presets.length === 0 ? (
        <p className="empty">Aucun preset ne correspond à « {query} ».</p>
      ) : (
        <ul className="card-grid">
          {presets.map((preset) => (
            <li key={preset.id} className="card">
              <h3>{preset.name}</h3>
              <ul className="chips">
                <li>{preset.shotSize}</li>
                <li>{preset.focalLength}</li>
                <li>{preset.cameraAngle}</li>
              </ul>
              <dl>
                <div>
                  <dt>Lumière</dt>
                  <dd>{preset.lighting}</dd>
                </div>
                <div>
                  <dt>Humeur</dt>
                  <dd>{preset.mood}</dd>
                </div>
              </dl>
              <p className="prompt">{preset.generationPrompt}</p>
              <button type="button" onClick={() => onAdd(preset.id)}>
                Ajouter au journal
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
