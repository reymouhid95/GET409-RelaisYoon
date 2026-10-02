import { useCallback, useState, type FormEvent } from "react";
import { AlertCircle, MessageCircle, Mic, MicOff, RotateCcw, Send, Sparkles } from "lucide-react";

import { AgentFicheCard } from "@/components/AgentFicheCard";
import { BoutonLecture } from "@/components/BoutonLecture";
import { useSpeech, type Lecture } from "@/hooks/useSpeech";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { demanderAgent } from "@/lib/dify.functions";
import { parseFicheAgent } from "@/lib/ficheAgent";
import { texteReponseAgent, urlPartageWhatsApp } from "@/lib/partage";
import { cn } from "@/lib/utils";

/* Amorces alignées sur les relevés réels : cliquer doit envoyer la question,
   pas seulement remplir le champ. */
const AMORCES = [
  "Petersen vers Guédiawaye",
  "Combien coûte Yeumbeul ?",
  "Correspondance pour Keur Massar",
];

/*
 * Toute réponse de l'agent est partageable, y compris INSUFFISANT : c'est le
 * cas le plus fréquent, et sans bouton l'usagère ne peut pas transmettre sa
 * question — ni la faire reformuler par un proche qui a la donnée.
 */
function ResultatAgent({
  texte,
  question,
  lecture,
}: {
  texte: string;
  question: string;
  lecture: Lecture;
}) {
  const fiche = parseFicheAgent(texte);

  if (!fiche) {
    return (
      <div className="animate-rise bg-surface mt-5 rounded-2xl p-5">
        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">{texte}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <BoutonLecture texte={texte} lecture={lecture} label="Écouter la réponse" />
          <a
            href={urlPartageWhatsApp(texteReponseAgent({ question, reponse: texte }))}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-whatsapp hover:bg-whatsapp-hover focus-visible:ring-whatsapp inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 active:scale-[0.98]"
          >
            <MessageCircle className="size-4" aria-hidden />
            Partager la question sur WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return <AgentFicheCard fiche={fiche} lecture={lecture} />;
}

function ChargementAgent() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-fade mt-5 rounded-2xl border border-border/70 bg-card p-5"
    >
      <div className="flex items-center gap-3">
        <Sparkles className="text-primary size-4 animate-pulse" aria-hidden />
        <p className="text-sm font-semibold">L&apos;agent cherche une correspondance…</p>
      </div>
      <div className="mt-4 space-y-2.5" aria-hidden>
        <div className="ry-skeleton h-4 w-2/3 rounded" />
        <div className="ry-skeleton h-4 w-1/2 rounded" />
        <div className="ry-skeleton h-9 w-40 rounded-xl" />
      </div>
    </div>
  );
}

export function AgentIa() {
  const [question, setQuestion] = useState<string>("");
  const [questionPosee, setQuestionPosee] = useState<string>("");
  const [chargement, setChargement] = useState<boolean>(false);
  const [resultat, setResultat] = useState<string | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [detail, setDetail] = useState<string | null>(null);
  const [historique, setHistorique] = useState<string[]>([]);

  const recoitDictee = useCallback((texte: string) => {
    setQuestion(texte);
  }, []);
  const voix = useVoiceInput(recoitDictee);
  const lecture = useSpeech();

  const demander = async (questionPosee: string) => {
    const propre = questionPosee.trim();
    if (!propre || chargement) return;
    lecture.arreter();
    setChargement(true);
    setResultat(null);
    setErreur(null);
    setDetail(null);
    setQuestionPosee(propre);

    try {
      const reponse = await demanderAgent({ data: { question: propre } });
      if (reponse.ok) {
        setResultat(reponse.texte);
        setHistorique((precedent) =>
          [propre, ...precedent.filter((q) => q !== propre)].slice(0, 3),
        );
      } else {
        setErreur(reponse.erreur);
        setDetail(reponse.detail);
      }
    } catch {
      setErreur("Service temporairement indisponible");
      setDetail("appel serveur impossible (réseau ou serveur injoignable)");
    } finally {
      setChargement(false);
    }
  };

  const soumettre = (e: FormEvent) => {
    e.preventDefault();
    void demander(question);
  };

  return (
    <section
      aria-labelledby="titre-agent"
      className="ry-halo animate-rise bg-card relative overflow-hidden rounded-3xl shadow-lift"
    >
      <div
        aria-hidden
        className="from-brand-500/12 via-sun-400/10 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent"
      />

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-primary inline-flex items-center gap-1.5 text-[0.6875rem] font-bold tracking-widest uppercase">
            <Sparkles className="size-3.5" aria-hidden />
            Agent IA
          </p>
          <span className="text-muted-foreground bg-surface-2 text-[0.6875rem] font-semibold">
            {!voix.supporte ? "Clavier uniquement" : "Clavier ou micro"}
          </span>
        </div>

        <h2 id="titre-agent" className="text-h2 mt-3 max-w-xl">
          Quelle correspondance cherches-tu ce soir&nbsp;?
        </h2>
        <p className="text-muted-foreground mt-2 max-w-lg text-lede">
          Décris ton départ et ton quartier d&apos;arrivée — l&apos;agent interroge les relevés du
          soir et te répond avec une fiche.
        </p>

        <form onSubmit={soumettre} className="mt-6">
          <label className="sr-only" htmlFor="question-agent">
            Quelle correspondance cherches-tu ce soir ?
          </label>
          <div className="bg-background focus-within:border-brand-400 focus-within:ring-brand-400/25 flex flex-col gap-2.5 rounded-2xl border p-2 transition-all duration-200 focus-within:ring-4 sm:flex-row sm:items-center">
            <input
              id="question-agent"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Petersen vers Guédiawaye"
              autoComplete="off"
              className="placeholder:text-muted-foreground/70 min-w-0 flex-1 bg-transparent px-3 py-2.5 text-base outline-none"
            />

            <div className="flex items-center gap-2">
              {voix.supporte && (
                <button
                  type="button"
                  onClick={() => (voix.ecoute ? voix.arreter() : voix.demarrer())}
                  disabled={chargement}
                  title={voix.ecoute ? "Arrêter la dictée" : "Dicter la question au micro"}
                  aria-label={voix.ecoute ? "Arrêter la dictée" : "Dicter la question au micro"}
                  aria-pressed={voix.ecoute}
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-xl transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
                    voix.ecoute
                      ? "bg-danger animate-pulse-ring text-danger-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {voix.ecoute ? (
                    <MicOff className="size-[1.15rem]" aria-hidden />
                  ) : (
                    <Mic className="size-[1.15rem]" aria-hidden />
                  )}
                </button>
              )}

              <button
                type="submit"
                disabled={chargement || !question.trim()}
                className="from-brand-500 to-brand-700 shadow-glow hover:from-brand-600 hover:to-brand-800 inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-5 text-sm font-bold text-white transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none sm:flex-none"
              >
                {chargement ? (
                  <>
                    <RotateCcw className="size-4 animate-spin" aria-hidden />
                    Recherche
                  </>
                ) : (
                  <>
                    <Send className="size-4" aria-hidden />
                    Demander
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground text-xs font-semibold">Essaie&nbsp;:</span>
          {AMORCES.map((amorce) => (
            <button
              key={amorce}
              type="button"
              onClick={() => {
                setQuestion(amorce);
                void demander(amorce);
              }}
              disabled={chargement}
              className="border-border bg-background text-muted-foreground hover:border-brand-300 hover:bg-brand-100 hover:text-brand-700 dark:hover:text-brand-600 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
            >
              {amorce}
            </button>
          ))}
        </div>

        {historique.length > 0 && (
          <div className="bg-surface mt-5 rounded-2xl p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-muted-foreground text-[0.6875rem] font-bold uppercase tracking-widest">
                Mes 3 derniers trajets
              </p>
              <button
                type="button"
                onClick={() => setHistorique([])}
                className="text-muted-foreground hover:text-foreground text-xs font-semibold underline-offset-4 transition-colors hover:underline"
              >
                Effacer
              </button>
            </div>
            <ul className="mt-1.5">
              {historique.map((q) => (
                <li key={q}>
                  <button
                    type="button"
                    disabled={chargement}
                    onClick={() => {
                      setQuestion(q);
                      void demander(q);
                    }}
                    className="text-foreground hover:text-brand-700 hover:bg-accent w-full truncate rounded-lg px-2 py-1.5 text-left text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50"
                  >
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {voix.erreur && (
          <p role="alert" className="text-danger mt-4 text-sm font-medium">
            {voix.erreur}
          </p>
        )}

        {chargement && <ChargementAgent />}

        {erreur && (
          <div
            role="alert"
            className="border-danger/25 bg-danger-soft text-danger mt-5 flex items-start gap-3 rounded-2xl border p-5"
          >
            <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden />
            <div>
              <p className="text-sm font-bold">{erreur}</p>
              <p className="mt-1 text-sm opacity-90">
                Les fiches ci-dessous restent lisibles — consulte-les directement.
              </p>
              {detail && (
                <p className="text-muted-foreground mt-2 font-mono text-[0.6875rem] break-all">
                  Diagnostic : {detail}
                </p>
              )}
            </div>
          </div>
        )}

        {resultat && !chargement && (
          <ResultatAgent texte={resultat} question={questionPosee} lecture={lecture} />
        )}
      </div>
    </section>
  );
}
