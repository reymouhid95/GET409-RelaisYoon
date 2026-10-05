import { z } from "zod";

/** Maximum decoded image size accepted by describeShotFromImage (4 MB). */
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export const textInputSchema = z.object({
  text: z.string().trim().min(1, "Le texte ne peut pas être vide.").max(2000),
});

export const imageInputSchema = z.object({
  imageBase64: z.string().min(1, "L'image ne peut pas être vide."),
  mimeType: z.string().regex(/^image\/(png|jpeg|webp|heic|heif)$/),
});

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Couleur hexadécimale #RRGGBB attendue.");

/** The single JSON schema returned by both callable functions. */
export const shotDescriptionSchema = z.object({
  shotSize: z.string().min(1),
  cameraAngle: z.string().min(1),
  focalLengthMm: z.number().positive(),
  lighting: z.string().min(1),
  palette: z.array(hexColor).min(1).max(8),
  mood: z.string().min(1),
  generationPrompt: z.string().min(10),
  confidence: z.number().min(0).max(1),
});

export type ShotDescription = z.infer<typeof shotDescriptionSchema>;
export type TextInput = z.infer<typeof textInputSchema>;
export type ImageInput = z.infer<typeof imageInputSchema>;

/** Decoded byte length of a base64 payload, without allocating the whole buffer twice. */
export function decodedImageBytes(base64: string): number {
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
  return Math.floor((base64.length * 3) / 4) - padding;
}
