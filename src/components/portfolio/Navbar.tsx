import { useEffect, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastY && y > 300);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.getElementById(l.href.slice(1))
    ).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
      }
    },
    []
  );

  return (
    <nav
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[oklch(0.74_0.19_295/0.1)] bg-[oklch(0.13_0.02_285/0.7)] shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
          : "bg-transparent",
        hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          aria-label="Home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group font-display text-xl font-bold transition-all"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[oklch(0.74_0.19_295/0.3)] bg-[oklch(0.74_0.19_295/0.1)] text-sm text-[oklch(0.74_0.19_295)] transition-all group-hover:border-[oklch(0.74_0.19_295/0.6)] group-hover:shadow-[0_0_15px_oklch(0.74_0.19_295/0.2)]">
            RR
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={[
                "relative rounded-lg px-3 py-2 text-sm font-medium transition-all",
                active === link.href
                  ? "text-[oklch(0.74_0.19_295)]"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")!}
            >
              {link.label}
              {active === link.href && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[oklch(0.74_0.19_295)] shadow-[0_0_8px_oklch(0.74_0.19_295/0.5)]" />
              )}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="rounded-lg border border-border p-2 text-muted-foreground transition hover:border-[oklch(0.74_0.19_295/0.5)] hover:text-[oklch(0.74_0.19_295)] md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={[
          "overflow-hidden border-t border-border/50 bg-[oklch(0.13_0.02_285/0.95)] backdrop-blur-2xl transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={[
                "rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active === link.href
                  ? "bg-[oklch(0.74_0.19_295/0.1)] text-[oklch(0.74_0.19_295)]"
                  : "text-muted-foreground hover:bg-surface hover:text-foreground",
              ].join(" ")}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
