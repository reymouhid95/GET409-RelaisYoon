import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BusFront, Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Accueil" },
  { to: "/fiches", label: "Fiches du soir" },
  { to: "/aide", label: "Aide" },
  { to: "/contact", label: "Contact" },
] as const;

type Theme = "light" | "dark";

function lireTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [monte, setMonte] = useState(false);

  // Le thème est posé par le script de __root avant le paint : on le lit au
  // montage pour éviter un écart entre le HTML rendu et l'hydratation.
  useEffect(() => {
    setTheme(lireTheme());
    setMonte(true);
  }, []);

  const basculer = useCallback(() => {
    setTheme((precedent) => {
      const suivant: Theme = precedent === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", suivant === "dark");
      document.documentElement.style.colorScheme = suivant;
      try {
        localStorage.setItem("ry-theme", suivant);
      } catch {
        /* stockage indisponible : le thème vaut pour la session */
      }
      return suivant;
    });
  }, []);

  const sombre = theme === "dark";

  return (
    <button
      type="button"
      onClick={basculer}
      aria-label={sombre ? "Passer en thème clair" : "Passer en thème sombre"}
      title={sombre ? "Thème clair" : "Thème sombre"}
      className="border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-brand-300 grid size-10 shrink-0 place-items-center rounded-full border transition-[transform,border-color,background-color,color] duration-200 active:scale-95"
    >
      <span
        className={cn(
          "grid place-items-center transition-[transform,opacity] duration-300",
          monte && !sombre ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
        )}
      >
        <Sun className="size-[1.15rem]" aria-hidden />
      </span>
      <span
        className={cn(
          "grid place-items-center transition-[transform,opacity] duration-300",
          monte && sombre ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0",
        )}
      >
        <Moon className="size-[1.15rem]" aria-hidden />
      </span>
    </button>
  );
}

/*
 * Lien de navigation : l'état actif est marqué par un filet ambre sous le
 * libellé (code de signalétique) plutôt qu'une pilule colorée — on sait où
 * on est sans que la nav bruite.
 */
function LienNav({
  to,
  label,
  exact,
}: {
  to: "/" | "/fiches" | "/aide" | "/contact";
  label: string;
  exact?: boolean;
}) {
  return (
    <Link
      to={to}
      activeOptions={exact ? { exact: true } : undefined}
      className="text-muted-foreground hover:text-foreground relative rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-150"
      activeProps={{
        className:
          "text-foreground after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-sun-400",
      }}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="ry-glass border-border/60 sticky top-0 z-50 border-b">
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-85"
        >
          <span
            className="bg-board text-sun-400 grid size-9 place-items-center rounded-lg transition-transform duration-200 fine:group-hover:-translate-y-px"
            aria-hidden
          >
            <BusFront className="size-5" />
          </span>
          <span className="font-display text-[1.0625rem] font-bold tracking-tight">
            Relais<span className="text-primary">Yoon</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Navigation principale">
            {navItems.map((item) => (
              <LienNav key={item.to} to={item.to} label={item.label} exact={item.to === "/"} />
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>

      {/* Sur mobile la nav passe sur une seconde ligne : à 360 px de large,
          quatre liens + le logo + le toggle ne tiennent pas sur une ligne,
          et l'usagère consulte souvent le site juste après être descendue
          du BRT, donc sur téléphone. */}
      <nav
        className="border-border/60 -mt-0.5 flex items-center gap-1 overflow-x-auto border-t px-2 pb-2 sm:hidden"
        aria-label="Navigation principale"
      >
        {navItems.map((item) => (
          <LienNav key={item.to} to={item.to} label={item.label} exact={item.to === "/"} />
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-border/60 relative mt-24 overflow-hidden border-t">
      <div aria-hidden className="bg-sun-400 absolute inset-x-0 top-0 h-0.5" />
      <div className="mx-auto max-w-page px-4 pt-14 pb-10 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span
                className="bg-board text-sun-400 grid size-8 place-items-center rounded-md"
                aria-hidden
              >
                <BusFront className="size-4" />
              </span>
              <span className="font-display font-bold tracking-tight">
                Relais<span className="text-primary">Yoon</span>
              </span>
            </div>
            <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-relaxed">
              Relevés de correspondance BRT effectués chaque soir sur le terrain, à Dakar.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-foreground">Navigation</h2>
            <ul className="mt-3.5 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-foreground">Nous trouver</h2>
            <p className="text-muted-foreground mt-3.5 text-sm leading-relaxed">
              Station Petersen
              <br />
              Avenue Malick Sy, Dakar
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-foreground">Relevés</h2>
            <p className="text-muted-foreground mt-3.5 text-sm leading-relaxed">
              Chaque soir
              <br />
              de 18h à 19h
            </p>
            <p className="text-muted-foreground/80 mt-4 text-xs">
              Données de terrain, non contractuelles.
            </p>
          </div>
        </div>

        <div className="border-border/60 text-muted-foreground mt-12 flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 RelaisYoon — projet étudiant GET409.</p>
          <p>Amadou Oury BAH · Rogelle Mombo · Darvy Valtine</p>
        </div>
      </div>
    </footer>
  );
}
