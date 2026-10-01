import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { AgentFicheCard } from "@/components/AgentFicheCard";
import { FicheCard } from "@/components/FicheCard";
import { fiches, filtresQuartier, type Statut } from "@/data/fiches";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { demanderAgent } from "@/lib/dify.functions";
import { parseFicheAgent } from "@/lib/ficheAgent";

export const Route = createFileRoute("/fiches")({
  head: () => ({
    meta: [
      { title: "Fiches du soir — RelaisYoon" },
      {
        name: "description",
        content:
          "Tous les relevés du soir : station, quartier, prix en FCFA, heure et disponibilité, filtrables par quartier.",
      },
      { property: "og:title", content: "Fiches du soir — RelaisYoon" },
      {
        property: "og:description",
        content: "Relevés BRT du soir filtrables par quartier : Sam Notaire, Ndiarème, Yeumbeul.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FichesPage,
});

function AgentIa() {
  const [question, setQuestion] = useState<string>("");
  const [chargement, setChargement] = useState<boolean>(false);
  const [resultat, setResultat] = useState<string | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);

  const recoitDictee = useCallback((texte: string) => {
    setQuestion(texte);
  }, []);
  const voix = useVoiceInput(recoitDictee);

  const demander = async () => {
    if (!question.trim() || chargement) return;
    setChargement(true);
    setResultat(null);
    setErreur(null);

    try {
      const reponse = await demanderAgent({ data: { question: question.trim() } });
      if (reponse.ok) {
        setResultat(reponse.texte);
      } else {
        setErreur(reponse.erreur);
      }
    } catch {
      setErreur("Service temporairement indisponible");
    } finally {
      setChargement(false);
    }
  };

  return (
    <section className="mt-10 rounded-2xl border border-border bg-card p-6">
      <h2 className="text-xl font-bold">Consulter l'agent IA</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Décris ta correspondance, l'agent te répond avec les relevés du soir.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="question-agent">
          Quelle correspondance cherches-tu ce soir ?
        </label>
        <input
          id="question-agent"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && demander()}
          placeholder="Quelle correspondance cherches-tu ce soir ? (ex : Petersen vers Guédiawaye)"
          className="w-full flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
        />
        <button
          type="button"
          onClick={() => (voix.ecoute ? voix.arreter() : voix.demarrer())}
          disabled={!voix.supporte || chargement}
          title={
            voix.supporte
              ? voix.ecoute
                ? "Arrêter la dictée"
                : "Dicter la question au micro"
              : "Dictée vocale non supportée par ce navigateur"
          }
          aria-label="Dicter la question au micro"
          aria-pressed={voix.ecoute}
          className={
            voix.ecoute
              ? "rounded-full bg-danger px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              : "rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
          }
        >
          {voix.ecoute ? "⏹ Écoute…" : "🎤"}
        </button>
        <button
          type="button"
          onClick={demander}
          disabled={chargement || !question.trim()}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Demander à l'agent 🚌
        </button>
      </div>

      {voix.erreur && (
        <p role="alert" className="mt-3 text-sm text-danger">
          {voix.erreur}
        </p>
      )}

      {chargement && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-secondary p-5 text-sm text-muted-foreground">
          <span
            className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"
            aria-hidden="true"
          />
          L'agent cherche une correspondance…
        </div>
      )}

      {erreur && (
        <p
          role="alert"
          className="mt-4 rounded-2xl bg-danger-soft p-5 text-sm font-semibold text-danger"
        >
          {erreur}
        </p>
      )}

      {resultat && !chargement && <ResultatAgent texte={resultat} />}
    </section>
  );
}

function ResultatAgent({ texte }: { texte: string }) {
  const fiche = parseFicheAgent(texte);
  if (!fiche) {
    return (
      <div className="mt-4 rounded-2xl bg-secondary p-5 text-sm whitespace-pre-wrap">{texte}</div>
    );
  }
  return <AgentFicheCard fiche={fiche} />;
}

function FichesPage() {
  const [filtre, setFiltre] = useState<string>("Tous");
  const [statutFiltre, setStatutFiltre] = useState<"Tous" | Statut>("Tous");
  const [recherche, setRecherche] = useState<string>("");

  const normalise = (valeur: string) =>
    valeur
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const liste = fiches.filter((f) => {
    const parQuartier = filtre === "Tous" || normalise(f.quartier).includes(normalise(filtre));
    const parRecherche = normalise(f.quartier).includes(normalise(recherche.trim()));
    const parStatut = statutFiltre === "Tous" || f.statut === statutFiltre;
    return parQuartier && parRecherche && parStatut;
  });

  const options = ["Tous", ...filtresQuartier];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight">Fiches du soir</h1>
      <p className="mt-2 text-muted-foreground">
        Relevés effectués ce soir à Dakar. Filtrez par quartier d'arrivée.
      </p>

      <label className="sr-only" htmlFor="recherche-quartier">
        Rechercher un quartier
      </label>
      <input
        id="recherche-quartier"
        type="search"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        placeholder="Rechercher un quartier…"
        className="mt-6 w-full rounded-full border border-border bg-card px-5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => {
          const actif = filtre === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setFiltre(option)}
              aria-pressed={actif}
              className={
                actif
                  ? "rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  : "rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              }
            >
              {option}
            </button>
          );
        })}
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-semibold">Disponibilité</legend>
        <div className="flex flex-wrap gap-2">
          {(["Tous", "Disponible", "Indisponible"] as const).map((statut) => {
            const actif = statutFiltre === statut;
            return (
              <button
                key={statut}
                type="button"
                onClick={() => setStatutFiltre(statut)}
                aria-pressed={actif}
                className={
                  actif
                    ? "rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                    : "rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                }
              >
                {statut}
              </button>
            );
          })}
        </div>
      </fieldset>

      <p className="mt-6 text-sm text-muted-foreground">
        {liste.length} fiche{liste.length > 1 ? "s" : ""} affichée
        {liste.length > 1 ? "s" : ""}
      </p>

      {liste.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
          Aucun relevé pour ce quartier ce soir.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liste.map((fiche) => (
            <FicheCard key={fiche.id} fiche={fiche} />
          ))}
        </div>
      )}

      <AgentIa />
    </div>
  );
}
