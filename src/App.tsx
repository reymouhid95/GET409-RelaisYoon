import { useEffect, useMemo, useState } from "react";
import { JournalView } from "./components/JournalView";
import { LibraryView } from "./components/LibraryView";
import { ProductionPicker } from "./components/ProductionPicker";
import { PRESETS } from "./features/presets/presets";
import { filterPresets } from "./features/presets/search";
import { createDefaultRepository, createEntry } from "./lib/entryRepository";
import type { Entry } from "./types";

type Tab = "library" | "journal";

const DEFAULT_PRODUCTION = "Ma production";

export default function App() {
  const repo = useMemo(() => createDefaultRepository(), []);
  const [entries, setEntries] = useState<Entry[]>(() => repo.load());
  const [production, setProduction] = useState(DEFAULT_PRODUCTION);
  const [tab, setTab] = useState<Tab>("library");
  const [query, setQuery] = useState("");

  useEffect(() => {
    repo.save(entries);
  }, [repo, entries]);

  const productions = useMemo(
    () => [...new Set(entries.map((entry) => entry.production))].sort(),
    [entries],
  );
  const visiblePresets = useMemo(() => filterPresets(PRESETS, query), [query]);
  const currentProduction = production.trim() || DEFAULT_PRODUCTION;
  const currentCount = entries.filter((entry) => entry.production === currentProduction).length;

  function addPreset(presetId: string): void {
    setEntries((previous) => [createEntry(currentProduction, presetId), ...previous]);
  }

  function removeEntry(id: string): void {
    setEntries((previous) => previous.filter((entry) => entry.id !== id));
  }

  function duplicateEntry(id: string): void {
    setEntries((previous) => {
      const source = previous.find((entry) => entry.id === id);
      if (!source) return previous;
      return [createEntry(source.production, source.presetId), ...previous];
    });
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>PromptLens</h1>
          <p className="tagline">Journal de références visuelles pour productions vidéo par IA</p>
        </div>
        <ProductionPicker value={production} productions={productions} onChange={setProduction} />
      </header>

      <nav className="tabs" aria-label="Sections">
        <button
          type="button"
          className={tab === "library" ? "active" : ""}
          aria-current={tab === "library"}
          onClick={() => setTab("library")}
        >
          Bibliothèque
        </button>
        <button
          type="button"
          className={tab === "journal" ? "active" : ""}
          aria-current={tab === "journal"}
          onClick={() => setTab("journal")}
        >
          Journal ({currentCount})
        </button>
      </nav>

      <main>
        {tab === "library" ? (
          <LibraryView
            presets={visiblePresets}
            query={query}
            onQueryChange={setQuery}
            onAdd={addPreset}
          />
        ) : (
          <JournalView
            entries={entries}
            production={currentProduction}
            presets={PRESETS}
            onDelete={removeEntry}
            onDuplicate={duplicateEntry}
          />
        )}
      </main>
    </div>
  );
}
