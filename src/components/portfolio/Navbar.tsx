import { useEffect, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact",      href: "#contact" },
];

export function Navbar() {
  const [active, setActive]       = useState("");
  const [scrolled, setScrolled]   = useState(false);
  const [hidden, setHidden]       = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastY, setLastY]         = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastY && y > 350);
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
        entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }, []
  );

  return (
    <nav
      className={[
        "navbar",
        scrolled ? "navbar-scrolled" : "",
        hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0",
        "transition-transform duration-300",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Wordmark */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-display text-sm font-bold tracking-[0.15em] uppercase text-[var(--teal)] transition hover:text-[var(--vermilion)]"
        >
          Rishi Rathi
        </a>

        {/* Desktop */}
        <div className="hidden items-center md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={["nav-link", active === link.href ? "nav-link-active" : ""].join(" ")}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="p-1.5 text-[var(--teal)] transition hover:text-[var(--vermilion)] md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={[
        "overflow-hidden bg-[var(--cream-light)] border-t border-[rgba(19,52,50,0.1)] transition-all duration-300 md:hidden",
        mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
      ].join(" ")}>
        <div className="flex flex-col px-6 py-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={[
                "py-3 text-sm font-medium tracking-widest uppercase border-b border-[rgba(19,52,50,0.08)] last:border-0 transition-colors",
                active === link.href
                  ? "text-[var(--vermilion)]"
                  : "text-[var(--teal)] hover:text-[var(--vermilion)]",
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
