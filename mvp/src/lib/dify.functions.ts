import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const demanderAgent = createServerFn({ method: "POST" })
  .validator((data) => z.object({ question: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["DIFY_API_KEY"]!;
    const controleur = new AbortController();
    const minuteur = setTimeout(() => controleur.abort(), 10000);

    try {
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

      if (!reponse.ok) throw new Error("http");
      const json = await reponse.json();
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
      if (e instanceof DOMException && e.name === "AbortError") {
        return { ok: false as const, erreur: "La réponse prend trop de temps — réessayez" };
      }
      return { ok: false as const, erreur: "Service temporairement indisponible" };
    } finally {
      clearTimeout(minuteur);
    }
  });
