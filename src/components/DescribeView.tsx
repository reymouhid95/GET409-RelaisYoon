import { useState } from "react";
import { analyzeText } from "../lib/shotApi";
import type { ShotDescription } from "../types";
import { ShotReviewCard } from "./ShotReviewCard";

interface DescribeViewProps {
  onSaved: (description: ShotDescription) => void;
}

const MAX_CHARS = 2000;

export function DescribeView({ onSaved }: DescribeViewProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<ShotDescription | null>(null);

  async function analyze(): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      setDraft(await analyzeText(text.trim()));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue.");
    } finally {
      setLoading(false);
    }
  }

  if (draft) {
    return (
      <section className="view" aria-label="Fiche décrire">
        <ShotReviewCard initial={draft} onSave={onSaved} onCancel={() => setDraft(null)} />
      </section>
    );
  }

  return (
    <section className="view" aria-label="Décrire une prise">
      <p className="view-intro">
        Décrivez la prise en français : le modèle renvoie une fiche que vous pourrez corriger.
      </p>
      <textarea
        rows={6}
        maxLength={MAX_CHARS}
        value={text}
        placeholder="Ex. : gros plan sur un visage, lumière douce de fenêtre, fond flou…"
        onChange={(event) => setText(event.target.value)}
        aria-label="Description de la prise"
      />
      <div className="compose-toolbar">
        <span className="count">
          {text.length} / {MAX_CHARS}
        </span>
        <button
          type="button"
          onClick={() => void analyze()}
          disabled={loading || text.trim() === ""}
        >
          {loading ? "Analyse en cours…" : "Analyser avec Gemini"}
        </button>
      </div>
      {loading && (
        <p className="loading" role="status">
          <span className="spinner" aria-hidden="true" /> Appel des fonctions…
        </p>
      )}
      {error && (
        <p className="error-banner" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
