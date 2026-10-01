import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock, CheckCircle2, MapPin, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

const coordonnees = [
  {
    icone: MapPin,
    titre: "Nous trouver",
    texte: "Station Petersen, avenue Malick Sy, Dakar",
  },
  {
    icone: CalendarClock,
    titre: "Horaires des relevés",
    texte: "Chaque soir, de 18h à 19h, sur le terrain",
  },
] as const;

function ContactPage() {
  const [form, setForm] = useState(champInitial);
  const [envoye, setEnvoye] = useState(false);

  const champClass =
    "border-input bg-background focus:border-brand-400 focus:ring-brand-400/25 mt-2 w-full rounded-xl border px-4 py-3 text-sm transition-all duration-200 outline-none focus:ring-4";

  return (
    <div className="mx-auto max-w-page px-4 py-12 sm:px-6 sm:py-20">
      <header className="animate-rise max-w-2xl">
        <p className="text-primary text-[0.6875rem] font-bold tracking-widest uppercase">Contact</p>
        <h1 className="text-h1 mt-3">Un prix a changé&nbsp;?</h1>
        <p className="text-muted-foreground text-lede mt-3">
          Une correspondance manque, un tarif n&apos;est plus le bon&nbsp;? Dites-le nous — le
          relevé est corrigé pour tout le monde.
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
        <form
          className="border-border/70 bg-card animate-rise rounded-3xl border p-6 shadow-card sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setEnvoye(true);
            setForm(champInitial);
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-bold">
              Nom
              <input
                required
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                className={champClass}
                placeholder="Awa Diop"
                autoComplete="name"
              />
            </label>
            <label className="block text-sm font-bold">
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={champClass}
                placeholder="awa@exemple.sn"
                autoComplete="email"
              />
            </label>
          </div>

          <label className="mt-5 block text-sm font-bold">
            Station habituelle
            <input
              required
              value={form.station}
              onChange={(e) => setForm({ ...form, station: e.target.value })}
              className={champClass}
              placeholder="Petersen (Papa Gueye Fall)"
            />
          </label>

          <label className="mt-5 block text-sm font-bold">
            Message
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={cn(champClass, "resize-y")}
              placeholder="Le prix vers Sam Notaire est passé à 600 FCFA ce soir."
            />
          </label>

          <Button
            type="submit"
            className="from-brand-500 to-brand-700 shadow-glow hover:from-brand-600 hover:to-brand-800 mt-6 h-12 w-full rounded-full text-[0.9375rem] sm:w-auto sm:px-7"
          >
            <Send className="size-4" aria-hidden />
            Envoyer le relevé
          </Button>

          {envoye && (
            <p
              role="status"
              className="border-success/25 bg-success-soft text-success animate-pop mt-5 flex items-start gap-3 rounded-xl border p-4 text-sm font-semibold"
            >
              <CheckCircle2 className="mt-px size-4 shrink-0" aria-hidden />
              Merci ! Votre message a bien été pris en compte.
            </p>
          )}
        </form>

        <aside className="space-y-4">
          {coordonnees.map((item) => (
            <div
              key={item.titre}
              className="border-border/70 bg-surface/70 animate-rise rounded-2xl border p-6"
            >
              <span className="bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300 grid size-10 place-items-center rounded-xl">
                <item.icone className="size-5" aria-hidden />
              </span>
              <h2 className="text-h3 mt-4">{item.titre}</h2>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{item.texte}</p>
            </div>
          ))}

          <div className="from-brand-500/10 to-sun-400/10 rounded-2xl bg-gradient-to-br p-6">
            <h2 className="text-h3">Ce que l&apos;agent ne peut pas faire</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Il répond à partir des relevés stockés, pas de la position des véhicules. Pour un
              départ en temps réel, vérifiez auprès du transporteur.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
