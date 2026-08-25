import { createFileRoute } from "@tanstack/react-router";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code2,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Nucleus } from "@/components/portfolio/Nucleus";
import { OrbitDivider } from "@/components/portfolio/OrbitDivider";
import { AnimatedSection } from "@/components/portfolio/AnimatedSection";
import { AnimatedCounter } from "@/components/portfolio/AnimatedCounter";
import {
  timeline,
  learningRepos,
  certifications,
  links,
} from "@/components/portfolio/data";
import rishiPortrait from "@/assets/rishi-portrait.png";
import resumePdf from "@/assets/RISHI_RATHI_RESUME.pdf";

export const Route = createFileRoute("/")(  {
  head: () => ({
    meta: [
      { title: "Rishi Rathi — Java Backend Developer" },
      {
        name: "description",
        content:
          "Portfolio of Rishi Rathi, Java backend developer building scalable, secure systems with Spring Boot, REST APIs and PostgreSQL.",
      },
      {
        property: "og:title",
        content: "Rishi Rathi — Java Backend Developer",
      },
      {
        property: "og:description",
        content:
          "Spring Boot, REST APIs and PostgreSQL. Projects, experience and skills of an aspiring software engineer based in Jaipur.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

/* ──────── Typing Effect Hook ──────── */
function useTypingEffect(
  texts: string[],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000
) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);

          if (charIndex + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          setDisplayText(current.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);

          if (charIndex - 1 === 0) {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    isDeleting,
    textIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return displayText;
}

/* ──────── Card Glow Effect ──────── */
function useCardGlow() {
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
      e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
    },
    []
  );
  return handleMouseMove;
}

/* ──────── Floating Particles ──────── */
function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 8}s`,
    size: `${2 + Math.random() * 3}px`,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            animation: `particle-float ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ──────── Tag ──────── */
function Tag({ children, dim }: { children: React.ReactNode; dim?: boolean }) {
  return (
    <span
      className={[
        "tag-hover rounded-full border px-2.5 py-0.5 text-[11px] cursor-default",
        dim
          ? "border-dashed border-border text-muted-foreground"
          : "border-border text-foreground/80",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

/* ──────── Main Portfolio ──────── */
function Portfolio() {
  const typedText = useTypingEffect([
    "Java Backend Developer",
    "Spring Boot Engineer",
    "REST API Designer",
    "Problem Solver",
  ]);
  const cardGlow = useCardGlow();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ───── HERO ───── */}
      <header className="animated-gradient-bg noise-overlay relative overflow-hidden border-b border-border">
        {/* Background effects */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="absolute h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
          <span className="absolute h-[300px] w-[300px] rounded-full border border-primary/15" />
          <span className="absolute h-[520px] w-[520px] rounded-full border border-dashed border-primary/10" />
          <span className="absolute h-[760px] w-[760px] rounded-full border border-primary/[0.07]" />
        </div>

        <Particles />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 pt-32 pb-24 md:grid-cols-2 md:pt-40 md:pb-32">
          <div>
            {/* Location badge */}
            <p
              className={`mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm transition-all duration-700 ${
                heroVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-4 opacity-0"
              }`}
            >
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to backend roles
            </p>

            {/* Name with gradient shimmer */}
            <h1
              className={`gradient-text text-5xl font-bold sm:text-7xl transition-all duration-700 delay-150 ${
                heroVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              Rishi Rathi
            </h1>

            {/* Typing effect subtitle */}
            <p
              className={`mt-4 font-mono text-sm text-primary sm:text-base transition-all duration-700 delay-300 ${
                heroVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <span className="typing-cursor">{typedText}</span>
            </p>

            {/* Description */}
            <p
              className={`mt-6 max-w-2xl text-lg text-muted-foreground transition-all duration-700 delay-[450ms] ${
                heroVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              Aspiring Software Engineer building scalable, secure backend
              systems with Java and Spring Boot.
            </p>

            {/* CTA Buttons */}
            <div
              className={`mt-9 flex flex-wrap gap-3 transition-all duration-700 delay-[600ms] ${
                heroVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <a
                href="#projects"
                className="btn-gradient rounded-lg px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--glow-soft)]"
              >
                View Projects
              </a>
              <a
                href={resumePdf}
                download="RISHI_RATHI_RESUME.pdf"
                className="rounded-lg border border-primary/60 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10"
              >
                Download Resume
              </a>
              <a
                href="#contact"
                className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition hover:border-primary/60"
              >
                Contact Me
              </a>
            </div>

            {/* Contact info */}
            <div
              className={`mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground transition-all duration-700 delay-[750ms] ${
                heroVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <a
                className="social-link flex items-center gap-2"
                href={`mailto:${links.email}`}
              >
                <Mail className="h-4 w-4" /> {links.email}
              </a>
              <a
                className="social-link flex items-center gap-2"
                href={`tel:${links.phone.replace(/\s/g, "")}`}
              >
                <Phone className="h-4 w-4" /> {links.phone}
              </a>
            </div>
            {/* Social links */}
            <div
              className={`mt-4 flex flex-wrap gap-3 text-sm transition-all duration-700 delay-[900ms] ${
                heroVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <a
                className="social-link flex items-center gap-2"
                href={links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <span className="text-border">·</span>
              <a
                className="social-link flex items-center gap-2"
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <span className="text-border">·</span>
              <a
                className="social-link flex items-center gap-2"
                href={links.leetcode}
                target="_blank"
                rel="noreferrer"
              >
                <Code2 className="h-4 w-4" /> LeetCode
              </a>
            </div>
          </div>

          {/* Profile image with animated ring */}
          <div
            className={`flex justify-center md:justify-end transition-all duration-1000 delay-500 ${
              heroVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
              <div className="pulse-ring relative">
                <div className="rotating-border rounded-full">
                  <img
                    src={rishiPortrait}
                    alt="Rishi Rathi"
                    className="relative h-56 w-56 rounded-full object-cover object-top sm:h-72 sm:w-72"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
          <a
            href="#about"
            className="scroll-indicator flex flex-col items-center gap-1 text-xs text-muted-foreground/60 transition hover:text-primary"
          >
            <span>scroll</span>
            <ChevronDown className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* ───── ABOUT ───── */}
      <AnimatedSection id="about" eyebrow="About" title="Education & background">
        <div className="grid gap-6 md:grid-cols-3">
          <div
            className="card-hover-glow rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:col-span-2"
            onMouseMove={cardGlow}
          >
            <div className="relative z-10">
              <h3 className="text-xl font-semibold">
                B.Tech, Computer Science & Engineering
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Arya College of Engineering · Rajasthan Technical University,
                Jaipur
              </p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                Aug 2023 – Jul 2027
              </p>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                I spend most of my time in the backend: designing REST APIs,
                modelling relational data and keeping services correct under
                concurrent load. Java and Spring Boot are the core I build
                everything else around.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div
              className="card-hover-glow rounded-2xl border border-primary/40 bg-primary/5 p-6"
              onMouseMove={cardGlow}
            >
              <div className="relative z-10">
                <p className="text-xs tracking-widest text-muted-foreground uppercase">
                  CGPA
                </p>
                <p className="font-display text-4xl font-bold text-primary">
                  <AnimatedCounter target={9.02} duration={2000} />
                </p>
              </div>
            </div>
            <div
              className="card-hover-glow rounded-2xl border border-border bg-card p-6"
              onMouseMove={cardGlow}
            >
              <div className="relative z-10">
                <p className="text-xs tracking-widest text-muted-foreground uppercase">
                  Based in
                </p>
                <p className="mt-1 text-lg font-semibold">Jaipur, Rajasthan</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <OrbitDivider />

      {/* ───── SKILLS ───── */}
      <AnimatedSection id="skills" eyebrow="Skills" title="The Nucleus">
        <p className="-mt-6 mb-8 max-w-2xl text-muted-foreground">
          Java sits at the core. Everything else orbits it in shells — hover to
          pause the orbit and inspect a node. The outer dashed shell is what I'm
          currently exploring.
        </p>
        <Nucleus />
      </AnimatedSection>

      <OrbitDivider />

      {/* ───── PROJECTS ───── */}
      <AnimatedSection id="projects" eyebrow="Work" title="Projects & experience">
        <ol className="relative space-y-6 border-l border-border pl-6 sm:pl-8">
          {timeline.map((item) => (
            <li key={item.title} className="relative">
              <span className="absolute top-7 -left-[31px] h-3 w-3 rounded-full border border-primary bg-background sm:-left-[39px]" />
              <article
                className="card-hover-glow rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
                onMouseMove={cardGlow}
              >
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold sm:text-xl">
                      {item.title}
                    </h3>
                    <span className="rounded-full border border-primary/50 bg-primary/10 px-2.5 py-0.5 text-[11px] text-primary">
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {item.period}
                  </p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                  {item.note && (
                    <p className="mt-3 border-l-2 border-primary/50 pl-3 text-sm text-foreground/80">
                      {item.note}
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                  {item.repo && (
                    <a
                      href={item.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm text-primary transition hover:underline hover:drop-shadow-[0_0_6px_var(--primary)]"
                    >
                      <Github className="h-4 w-4" /> View repository
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>

        {/* Learning log */}
        <div className="mt-12">
          <p className="mb-3 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
            Learning log — in-progress notes, not shipped work
          </p>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            {learningRepos.map((r) => (
              <li key={r.name} className="flex flex-wrap items-center gap-x-2">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link font-mono text-xs text-foreground/70"
                >
                  {r.name}
                </a>
                <span className="text-border">—</span>
                <span className="text-xs">{r.line}</span>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      <OrbitDivider />

      {/* ───── ACHIEVEMENTS ───── */}
      <AnimatedSection id="achievements" eyebrow="Proof of work" title="Achievements">
        <div className="grid gap-4 sm:grid-cols-3">
          <div
            className="card-hover-glow rounded-2xl border border-border bg-card p-6"
            onMouseMove={cardGlow}
          >
            <div className="relative z-10">
              <p className="text-3xl">🦈</p>
              <p className="mt-3 font-semibold">Pull Shark</p>
              <p className="mt-1 text-sm text-muted-foreground">
                GitHub achievement badge
              </p>
            </div>
          </div>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="card-hover-glow rounded-2xl border border-border bg-card p-6"
            onMouseMove={cardGlow}
          >
            <div className="relative z-10">
              <p className="font-display text-4xl font-bold text-primary">
                <AnimatedCounter target={16} duration={1800} />
              </p>
              <p className="mt-3 font-semibold">Public repositories</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Including DSA practice and learning-log repos
              </p>
            </div>
          </a>
          <a
            href={links.leetcode}
            target="_blank"
            rel="noreferrer"
            className="card-hover-glow rounded-2xl border border-border bg-card p-6"
            onMouseMove={cardGlow}
          >
            <div className="relative z-10">
              <p className="font-display text-4xl font-bold text-primary">
                <AnimatedCounter target={200} suffix="+" duration={2000} />
              </p>
              <p className="mt-3 font-semibold">LeetCode problems</p>
              <p className="mt-1 text-sm text-muted-foreground">
                _BAKI_HANMA_ - LeetCode Profile
              </p>
            </div>
          </a>
        </div>
      </AnimatedSection>

      {/* ───── CERTIFICATIONS ───── */}
      <AnimatedSection id="certifications" eyebrow="Credentials" title="Certifications">
        <div className="flex flex-wrap gap-3">
          {certifications.map((c) => (
            <span
              key={c}
              className="tag-hover rounded-xl border border-border bg-card px-4 py-2 text-sm text-foreground/85"
            >
              {c}
            </span>
          ))}
        </div>
      </AnimatedSection>

      <OrbitDivider />

      {/* ───── CONTACT ───── */}
      <AnimatedSection id="contact" eyebrow="Contact" title="Let's build something">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-muted-foreground">
            <a
              className="social-link flex items-center gap-3"
              href={`mailto:${links.email}`}
            >
              <Mail className="h-4 w-4 text-primary" /> {links.email}
            </a>
            <a
              className="social-link flex items-center gap-3"
              href={`tel:${links.phone.replace(/\s/g, "")}`}
            >
              <Phone className="h-4 w-4 text-primary" /> {links.phone}
            </a>
            <a
              className="social-link flex items-center gap-3"
              href={links.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4 text-primary" />{" "}
              github.com/Rishi895-Rathi
            </a>
            <a
              className="social-link flex items-center gap-3"
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-4 w-4 text-primary" /> LinkedIn
            </a>
            <a
              className="social-link flex items-center gap-3"
              href={links.leetcode}
              target="_blank"
              rel="noreferrer"
            >
              <Code2 className="h-4 w-4 text-primary" /> _BAKI_HANMA_ -
              LeetCode Profile
            </a>
          </div>

          <form
            action={`mailto:${links.email}`}
            method="post"
            encType="text/plain"
            className="dot-grid space-y-4 rounded-2xl border border-border bg-card p-6"
          >
            <div>
              <label
                htmlFor="name"
                className="text-xs tracking-widest text-muted-foreground uppercase"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="input-glow mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-xs tracking-widest text-muted-foreground uppercase"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input-glow mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="text-xs tracking-widest text-muted-foreground uppercase"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="input-glow mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="btn-gradient w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-foreground transition"
            >
              Send message
            </button>
            <p className="text-xs text-muted-foreground">
              Static form — it opens your mail client. Direct email works too:{" "}
              <a
                className="text-primary hover:underline"
                href={`mailto:${links.email}`}
              >
                {links.email}
              </a>
            </p>
          </form>
        </div>
      </AnimatedSection>

      {/* ───── FOOTER ───── */}
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        <a
          className="text-primary hover:underline"
          href={resumePdf}
          download="RISHI_RATHI_RESUME.pdf"
        >
          Download Resume
        </a>
        <span className="mx-2">·</span>© {new Date().getFullYear()} Rishi Rathi
        · Built with Java-shaped patience.
      </footer>
    </main>
  );
}
