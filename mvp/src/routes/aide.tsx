import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/aide")({
  head: () => ({
    meta: [
      { title: "Aide — RelaisYoon" },
      {
        name: "description",
        content: "Réponses aux questions fréquentes sur les correspondances BRT du soir à Dakar.",
      },
    ],
  }),
  component: AidePage,
});

const questions = [
  {
    question: "Comment trouver une correspondance vers mon quartier ?",
    reponse:
      "Ouvrez les Fiches du soir, puis filtrez par quartier et disponibilité. Vous pouvez aussi demander à l'agent IA en précisant votre station de départ et votre quartier d'arrivée.",
  },
  {
    question: "Que signifie le statut Disponible ?",
    reponse:
      "Le statut correspond au relevé effectué par l'équipe à l'heure indiquée sur la fiche. La disponibilité peut évoluer : confirmez-la auprès du transporteur avant de monter.",
  },
  {
    question: "Comment lire le prix et l'heure d'une fiche ?",
    reponse:
      "Le prix est indiqué en FCFA et l'heure correspond au moment du relevé. Ce sont des informations de terrain, pas une garantie de tarif ou de départ en temps réel.",
  },
  {
    question: "Pourquoi l'agent répond-il qu'il n'a pas assez d'informations ?",
    reponse:
      "Essayez une question plus précise en indiquant la station de départ et le quartier recherché. L'agent ne peut répondre qu'à partir des relevés disponibles dans sa base.",
  },
  {
    question: "Puis-je dicter ma question à l'agent ?",
    reponse:
      "Oui, utilisez le bouton microphone sur la page Fiches du soir. La dictée dépend de la prise en charge vocale de votre navigateur.",
  },
  {
    question: "L'agent est-il disponible hors du créneau 18h–19h ?",
    reponse:
      "L'agent interroge la base des relevés, pas les véhicules en temps réel. En dehors du créneau de relevé, les chiffres restent ceux de la dernière collecte.",
  },
] as const;

function AidePage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-12 sm:px-6 sm:py-20">
      <header className="animate-rise">
        <p className="text-muted-foreground flex items-center gap-2.5 text-sm font-semibold">
          <span aria-hidden className="bg-sun-400 h-px w-8" />
          Aide
        </p>
        <h1 className="text-h1 mt-4">Questions fréquentes</h1>
        <p className="text-muted-foreground text-lede mt-3">
          Utiliser les relevés de correspondance BRT à Dakar, et comprendre ce que l&apos;agent peut
          — ou ne peut pas — vous dire.
        </p>
      </header>

      <div className="border-border/70 divide-border/70 mt-10 divide-y border-y">
        {questions.map(({ question, reponse }) => (
          <details key={question} className="group animate-rise">
            <summary className="marker:hidden flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left">
              <h2 className="text-h3 group-hover:text-primary transition-colors duration-200">
                {question}
              </h2>
              <span
                aria-hidden
                className="border-border bg-background text-muted-foreground group-hover:border-brand-300 group-hover:bg-brand-100 group-hover:text-brand-700 grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,border-color,background-color,color] duration-200 group-open:rotate-45"
              >
                <Plus className="size-4" />
              </span>
            </summary>
            <p className="text-muted-foreground animate-fade mb-5 max-w-2xl text-[0.9375rem] leading-relaxed">
              {reponse}
            </p>
          </details>
        ))}
      </div>

      <div className="from-brand-500/8 to-sun-400/10 mt-12 rounded-xl bg-gradient-to-br p-8 text-center">
        <h2 className="text-h3">Vous n'avez pas trouvé votre réponse&nbsp;?</h2>
        <p className="text-muted-foreground mx-auto mt-2 max-w-sm text-sm">
          Écrivez-nous : un prix a changé ou une correspondance manque, on corrige le relevé.
        </p>
        <Button asChild variant="signal" className="mt-6 h-11 px-6">
          <Link to="/contact">Nous écrire</Link>
        </Button>
      </div>

      <Button asChild variant="ghost" className="text-primary mt-6 rounded-full">
        <Link to="/fiches">Voir les fiches du soir</Link>
      </Button>
    </div>
  );
}
