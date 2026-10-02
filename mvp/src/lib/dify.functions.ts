import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/* Module E : détail technique pour le diagnostic — code HTTP + raison Dify
   extraite du corps d'erreur (jamais les headers, jamais la clé). */
function raisonDify(corps: string): string {
  try {
    const json = JSON.parse(corps) as { code?: unknown; message?: unknown };
    const morceaux = [json.code, json.message].filter(
      (v): v is string => typeof v === "string" && v.length > 0,
    );
    if (morceaux.length > 0) return morceaux.join(" · ");
  } catch {
    /* corps non JSON : on retient un extrait brut */
  }
  return corps.slice(0, 200);
}

export const demanderAgent = createServerFn({ method: "POST" })
  .validator((data) =>
    z
      .object({
        question: z.string().min(1),
        heure: z.string().max(8).optional().default(""),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env["DIFY_API_KEY"];
    const journalise = process.env["NODE_ENV"] !== "production";

    if (!apiKey?.trim()) {
      console.error(
        "[agent Dify] DIFY_API_KEY absente ou vide. Vérifiez le fichier .env puis redémarrez Vite.",
      );
      return {
        ok: false as const,
        erreur: "Service temporairement indisponible",
        detail: "DIFY_API_KEY absente côté serveur",
      };
    }

    const controleur = new AbortController();
    const minuteur = setTimeout(() => controleur.abort(), 30000);

    try {
      if (journalise) console.info("[agent Dify] Question soumise :", data.question);

      const reponse = await fetch("https://api.dify.ai/v1/workflows/run", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            query: data.question,
            date: new Date().toISOString().slice(0, 10),
            heure: data.heure ?? "",
          },
          query: data.question,
          response_mode: "blocking",
          user: "user-relaisyoon-" + Date.now(),
        }),
        signal: controleur.signal,
      });

      if (!reponse.ok) {
        const detail = `Dify HTTP ${reponse.status} · ${raisonDify(await reponse.text())}`;
        if (journalise) {
          console.error("[agent Dify] Réponse HTTP en erreur :", detail);
        }
        return { ok: false as const, erreur: "Service temporairement indisponible", detail };
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
        return {
          ok: false as const,
          erreur: "La réponse prend trop de temps — réessayez",
          detail: "abort après 30 s",
        };
      }
      return {
        ok: false as const,
        erreur: "Service temporairement indisponible",
        detail: e instanceof Error ? e.message.slice(0, 200) : "erreur inconnue",
      };
    } finally {
      clearTimeout(minuteur);
    }
  });
