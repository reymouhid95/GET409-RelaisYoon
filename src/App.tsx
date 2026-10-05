import { useEffect, useMemo, useState } from "react";
import { DescribeView } from "./components/DescribeView";
import { ImageView } from "./components/ImageView";
import { JournalView } from "./components/JournalView";
import { LibraryView } from "./components/LibraryView";
import { ProductionPicker } from "./components/ProductionPicker";
import { PRESETS } from "./features/presets/presets";
import { filterPresets } from "./features/presets/search";
import {
  createAiEntry,
  createDefaultRepository,
  createEntry,
} from "./lib/entryRepository";
import type { Entry, ShotDescription } from "./types";

type Tab = "presets" | "describe" | "image" | "journal";

const DEFAULT_PRODUCTION = "Ma production";

const TABS: { id: Tab; label: string }[] = [
  { id: "presets", label: "Presets" },
  { id: "describe", label: "Décrire" },
  { id: "image", label: "Image" },
  { id: "journal", label: "Journal" },
];

export default function App() {
  const repo = useMemo(() => createDefaultRepository(), []);
  const [entries, setEntries] = useState<Entry[]>(() => repo.load());
  const [production, setProduction] = useState(DEFAULT_PRODUCTION);
  const [tab, setTab] = useState<Tab>("presets");
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

  function addAiEntry(source: "text" | "image", description: ShotDescription): void {
    setEntries((previous) => [createAiEntry(currentProduction, source, description), ...previous]);
    setTab("journal");
  }

  function removeEntry(id: string): void {
    setEntries((previous) => previous.filter((entry) => entry.id !== id));
  }

  function duplicateEntry(id: string): void {
    setEntries((previous) => {
      const source = previous.find((entry) => entry.id === id);
      if (!source) return previous;
      return [
        { ...source, id: crypto.randomUUID(), createdAt: Date.now() },
        ...previous,
      ];
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
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={tab === id ? "active" : ""}
            aria-current={tab === id}
            onClick={() => setTab(id)}
          >
            {label}
            {id === "journal" ? ` (${currentCount})` : ""}
          </button>
        ))}
      </nav>

      <main>
        {tab === "presets" && (
          <LibraryView
            presets={visiblePresets}
            query={query}
            onQueryChange={setQuery}
            onAdd={addPreset}
          />
        )}
        {tab === "describe" && <DescribeView onSaved={(d) => addAiEntry("text", d)} />}
        {tab === "image" && <ImageView onSaved={(d) => addAiEntry("image", d)} />}
        {tab === "journal" && (
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
