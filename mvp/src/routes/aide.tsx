import { createFileRoute, Link } from "@tanstack/react-router";

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
];

function AidePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight">Questions fréquentes</h1>
      <p className="mt-2 text-muted-foreground">
        Utiliser les relevés de correspondance BRT à Dakar.
      </p>

      <div className="mt-8 divide-y divide-border border-y border-border">
        {questions.map(({ question, reponse }) => (
          <details key={question} className="group py-5">
            <summary className="cursor-pointer list-none font-semibold text-foreground marker:hidden">
              <span className="flex items-center justify-between gap-4">
                {question}
                <span
                  aria-hidden="true"
                  className="text-xl text-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{reponse}</p>
          </details>
        ))}
      </div>

      <Link
        to="/fiches"
        className="mt-8 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Voir les fiches du soir
      </Link>
    </main>
  );
}
