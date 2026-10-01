import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — RelaisYoon" },
      {
        name: "description",
        content:
          "Signalez un prix relevé ou contactez l'équipe RelaisYoon — Station Petersen, avenue Malick Sy, Dakar.",
      },
      { property: "og:title", content: "Contact — RelaisYoon" },
      {
        property: "og:description",
        content: "Écrivez-nous pour signaler un prix de correspondance BRT à Dakar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const champInitial = { nom: "", email: "", station: "", message: "" };

function ContactPage() {
  const [form, setForm] = useState(champInitial);
  const [envoye, setEnvoye] = useState(false);

  const champClass =
    "mt-1 w-full rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight">Contact</h1>
      <p className="mt-2 text-muted-foreground">
        Un prix a changé ? Une correspondance manque ? Dites-le nous.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <form
          className="rounded-2xl border border-border bg-card p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setEnvoye(true);
            setForm(champInitial);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              Nom
              <input
                required
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                className={champClass}
                placeholder="Awa Diop"
              />
            </label>
            <label className="block text-sm font-semibold">
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={champClass}
                placeholder="awa@exemple.sn"
              />
            </label>
          </div>

          <label className="mt-4 block text-sm font-semibold">
            Station habituelle
            <input
              required
              value={form.station}
              onChange={(e) => setForm({ ...form, station: e.target.value })}
              className={champClass}
              placeholder="Petersen (Papa Gueye Fall)"
            />
          </label>

          <label className="mt-4 block text-sm font-semibold">
            Message
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={champClass}
              placeholder="Le prix vers Sam Notaire est passé à 600 FCFA ce soir."
            />
          </label>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
          >
            Envoyer
          </button>

          {envoye && (
            <p className="mt-4 rounded-xl bg-success-soft px-4 py-3 text-sm font-semibold text-success">
              Merci ! Votre message a bien été pris en compte.
            </p>
          )}
        </form>

        <aside className="rounded-2xl border border-border bg-primary/5 p-6">
          <h2 className="font-bold">Nous trouver</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Station Petersen, avenue Malick Sy, Dakar
          </p>
          <h3 className="mt-6 font-bold">Horaires des relevés</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Chaque soir, de 18h à 19h, sur le terrain.
          </p>
        </aside>
      </div>
    </div>
  );
}
