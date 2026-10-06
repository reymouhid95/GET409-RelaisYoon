import { useState } from "react";
import { analyzeImage, uploadFrame } from "../lib/shotApi";
import type { ShotDescription } from "../types";
import { ShotReviewCard } from "./ShotReviewCard";

interface ImageViewProps {
  onSaved: (description: ShotDescription, frameId?: string) => void;
}

const MAX_DIMENSION = 1600;

interface PickedImage {
  base64: string;
  previewUrl: string;
  mimeType: string;
}

/** Resize client-side (max 1600 px) and strip the data-url prefix. */
async function resizeImage(file: File): Promise<PickedImage> {
  const source = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Lecture du fichier impossible."));
    reader.readAsDataURL(file);
  });

  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Fichier image illisible."));
    img.src = source;
  });

  const scale = Math.min(1, MAX_DIMENSION / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Redimensionnement impossible.");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
  return {
    base64: dataUrl.slice(dataUrl.indexOf(",") + 1),
    previewUrl: dataUrl,
    mimeType: "image/jpeg",
  };
}

export function ImageView({ onSaved }: ImageViewProps) {
  const [picked, setPicked] = useState<PickedImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<ShotDescription | null>(null);
  const [frameId, setFrameId] = useState<string | undefined>(undefined);

  async function handleFile(file: File | undefined): Promise<void> {
    if (!file) return;
    setError(null);
    setDraft(null);
    setPicked(null);
    if (!file.type.startsWith("image/")) {
      setError("Format non pris en charge : choisissez une image (PNG, JPEG, WebP…).");
      return;
    }
    try {
      setPicked(await resizeImage(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue.");
    }
  }

  async function analyze(): Promise<void> {
    if (!picked) return;
    setLoading(true);
    setError(null);
    try {
      const description = await analyzeImage(picked.base64, picked.mimeType);
      setDraft(description);
      setFrameId(await uploadFrame(picked.base64, picked.mimeType));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue.");
    } finally {
      setLoading(false);
    }
  }

  if (draft) {
    return (
      <section className="view" aria-label="Fiche image">
        <ShotReviewCard
          initial={draft}
          onSave={(saved) => onSaved(saved, frameId)}
          onCancel={() => setDraft(null)}
        />
      </section>
    );
  }

  return (
    <section className="view" aria-label="Analyser une image">
      <p className="view-intro">
        Importez une image de référence : elle est redimensionnée à 1600 px max avant l'envoi.
      </p>
      <div className="upload-row">
        <input
          type="file"
          accept="image/*"
          onChange={(event) => void handleFile(event.target.files?.[0])}
          aria-label="Choisir une image"
        />
        {picked && <img src={picked.previewUrl} alt="Aperçu de l'image envoyée" className="preview" />}
      </div>
      <div className="compose-toolbar">
        <span className="count">{picked ? "Prêt à analyser" : "Aucune image"}</span>
        <button type="button" onClick={() => void analyze()} disabled={!picked || loading}>
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
