import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const demanderAgent = createServerFn({ method: "POST" })
  .validator((data) => z.object({ question: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["DIFY_API_KEY"];
    const journalise = process.env["NODE_ENV"] !== "production";

    if (!apiKey?.trim()) {
      console.error(
        "[agent Dify] DIFY_API_KEY absente ou vide. Vérifiez le fichier .env puis redémarrez Vite.",
      );
      return { ok: false as const, erreur: "Service temporairement indisponible" };
    }

    const controleur = new AbortController();
    const minuteur = setTimeout(() => controleur.abort(), 10000);

    try {
      if (journalise) console.info("[agent Dify] Question soumise :", data.question);

      const reponse = await fetch("https://api.dify.ai/v1/workflows/run", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: { query: data.question },
          query: data.question,
          response_mode: "blocking",
          user: "user-relaisyoon-" + Date.now(),
        }),
        signal: controleur.signal,
      });

      if (!reponse.ok) {
        const detail = await reponse.text();
        if (journalise) {
          console.error("[agent Dify] Réponse HTTP en erreur :", reponse.status, detail);
        }
        throw new Error(`Dify HTTP ${reponse.status}`);
      }

      const json = await reponse.json();
      if (journalise) console.info("[agent Dify] Réponse brute :", json);

      const outputs = json?.data?.outputs;
      const brut =
        typeof outputs === "string"
          ? outputs
          : (outputs?.fiche ?? outputs?.message_erreur ?? JSON.stringify(outputs));
      const texte = String(brut)
        .replace(/<think>[\s\S]*?<\/think>/g, "")
        .trim();
      return { ok: true as const, texte };
    } catch (e) {
      if (journalise) console.error("[agent Dify] Échec de la requête :", e);
      if (e instanceof DOMException && e.name === "AbortError") {
        return { ok: false as const, erreur: "La réponse prend trop de temps — réessayez" };
      }
      return { ok: false as const, erreur: "Service temporairement indisponible" };
    } finally {
      clearTimeout(minuteur);
    }
  });
