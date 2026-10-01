import { Link } from "@tanstack/react-router";

const navItems = [
  { to: "/", label: "Accueil" },
  { to: "/fiches", label: "Fiches du soir" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
          <span aria-hidden className="text-2xl">
            🚌
          </span>
          <span className="text-primary">RelaisYoon</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/70 py-8">
      <div className="mx-auto max-w-5xl px-4 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">🚌 RelaisYoon</p>
        <p className="mt-1">Relevés effectués chaque soir par l'équipe à Dakar.</p>
        <p className="mt-1">Station Petersen, avenue Malick Sy, Dakar</p>
      </div>
    </footer>
  );
}
