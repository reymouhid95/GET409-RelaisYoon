import { useState } from "react";
import type { ShotDescription } from "../types";

interface ShotReviewCardProps {
  initial: ShotDescription;
  onSave: (description: ShotDescription) => void;
  onCancel: () => void;
}

const HEX = /^#[0-9a-fA-F]{6}$/;

export function ShotReviewCard({ initial, onSave, onCancel }: ShotReviewCardProps) {
  const [draft, setDraft] = useState<ShotDescription>(initial);
  const [paletteText, setPaletteText] = useState(initial.palette.join(", "));

  const paletteValid =
    paletteText.split(",").map((c) => c.trim()).filter((c) => c !== "").every((c) => HEX.test(c)) &&
    paletteText.split(",").some((c) => c.trim() !== "");
  const formValid =
    draft.shotSize.trim() !== "" &&
    draft.cameraAngle.trim() !== "" &&
    draft.focalLengthMm > 0 &&
    draft.lighting.trim() !== "" &&
    draft.mood.trim() !== "" &&
    draft.generationPrompt.trim().length >= 10 &&
    paletteValid;

  function set<K extends keyof ShotDescription>(key: K, value: ShotDescription[K]): void {
    setDraft((previous) => ({ ...previous, [key]: value }));
  }

  function save(): void {
    const palette = paletteText
      .split(",")
      .map((color) => color.trim())
      .filter((color) => color !== "");
    onSave({ ...draft, palette });
  }

  return (
    <div className="review-card">
      <h3>Fiche à vérifier</h3>
      <p className="review-hint">Corrigez les champs si besoin avant d'enregistrer.</p>
      <div className="field-grid">
        <label>
          Taille de plan
          <input value={draft.shotSize} onChange={(e) => set("shotSize", e.target.value)} />
        </label>
        <label>
          Angle caméra
          <input value={draft.cameraAngle} onChange={(e) => set("cameraAngle", e.target.value)} />
        </label>
        <label>
          Focale (mm)
          <input
            type="number"
            min="1"
            step="0.1"
            value={draft.focalLengthMm}
            onChange={(e) => set("focalLengthMm", Number(e.target.value))}
          />
        </label>
        <label>
          Humeur
          <input value={draft.mood} onChange={(e) => set("mood", e.target.value)} />
        </label>
        <label className="span-2">
          Lumière
          <input value={draft.lighting} onChange={(e) => set("lighting", e.target.value)} />
        </label>
        <label className="span-2">
          Palette (hex, séparées par des virgules)
          <input
            value={paletteText}
            className={paletteValid ? "" : "invalid"}
            onChange={(e) => setPaletteText(e.target.value)}
          />
        </label>
        <label className="span-2">
          Prompt de génération (anglais)
          <textarea
            rows={4}
            value={draft.generationPrompt}
            onChange={(e) => set("generationPrompt", e.target.value)}
          />
        </label>
      </div>
      <p className="confidence">Confiance du modèle : {Math.round(draft.confidence * 100)} %</p>
      <div className="actions">
        <button type="button" onClick={save} disabled={!formValid}>
          Enregistrer dans le journal
        </button>
        <button type="button" className="secondary" onClick={onCancel}>
          Recommencer
        </button>
      </div>
    </div>
  );
}
