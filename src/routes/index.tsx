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
  Download,
  ArrowRight,
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rishi Rathi — Java Backend Developer" },
      {
        name: "description",
        content:
          "Portfolio of Rishi Rathi, Java backend developer building scalable, secure systems with Spring Boot, REST APIs and PostgreSQL.",
      },
      { property: "og:title", content: "Rishi Rathi — Java Backend Developer" },
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

/* ─── Typing Effect ─── */
function useTypingEffect(
  texts: string[],
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseDuration = 2200
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
          setCharIndex((p) => p + 1);
          if (charIndex + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          setDisplayText(current.slice(0, charIndex - 1));
          setCharIndex((p) => p - 1);
          if (charIndex - 1 === 0) {
            setIsDeleting(false);
            setTextIndex((p) => (p + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}

/* ─── Card Glow Hook ─── */
function useCardGlow() {
  return useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }, []);
}

/* ─── Particles ─── */
function Particles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${8 + Math.random() * 10}s`,
    size: `${2 + Math.random() * 2}px`,
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
            animation: `particle-float ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Tag ─── */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="tag-hover cursor-default rounded-full border border-border px-2.5 py-0.5 text-[11px] text-foreground/80">
      {children}
    </span>
  );
}

/* ═══════════════ MAIN PORTFOLIO ═══════════════ */
function Portfolio() {
  const typedText = useTypingEffect([
    "Java Backend Developer",
    "Spring Boot Engineer",
    "REST API Architect",
    "Problem Solver",
  ]);
  const glow = useCardGlow();
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ═══════ HERO ═══════ */}
      <header className="noise-overlay relative min-h-screen overflow-hidden">
        {/* Gradient orbs */}
        <div className="hero-orb left-1/4 top-1/4 h-[500px] w-[500px] bg-[oklch(0.74_0.19_295/0.4)]" />
        <div className="hero-orb-2 right-1/4 bottom-1/4 h-[400px] w-[400px] bg-[oklch(0.76_0.16_210/0.35)]" />
        <div className="hero-orb right-[10%] top-[15%] h-[300px] w-[300px] bg-[oklch(0.80_0.18_330/0.2)]" />

        {/* Grid pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(oklch(0.74 0.19 295 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.74 0.19 295 / 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
        </div>

        <Particles />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
          {/* Profile image */}
          <div
            className={`mb-8 transition-all duration-1000 ${heroReady ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 rounded-full bg-[oklch(0.74_0.19_295/0.25)] blur-3xl" />
              <div className="pulse-ring relative">
                <div className="rotating-border rounded-full">
                  <img
                    src={rishiPortrait}
                    alt="Rishi Rathi"
                    className="relative h-36 w-36 rounded-full object-cover object-top sm:h-44 sm:w-44"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Badge */}
          <div
            className={`mb-6 transition-all duration-700 delay-200 ${heroReady ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-md">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to backend roles · Jaipur, India
            </span>
          </div>

          {/* Name */}
          <h1
            className={`text-foreground text-6xl font-bold leading-tight sm:text-8xl md:text-9xl transition-all duration-700 delay-300 ${heroReady ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            Rishi Rathi
          </h1>

          {/* Typing subtitle */}
          <p
            className={`mt-5 h-8 font-mono text-base text-accent sm:text-lg transition-all duration-700 delay-[450ms] ${heroReady ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            <span className="typing-cursor">{typedText}</span>
          </p>

          {/* Description */}
          <p
            className={`mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground transition-all duration-700 delay-[600ms] ${heroReady ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            Building scalable, secure backend systems with Java & Spring Boot.
            Turning complex problems into clean, reliable APIs.
          </p>

          {/* CTA */}
          <div
            className={`mt-10 flex flex-wrap justify-center gap-4 transition-all duration-700 delay-[750ms] ${heroReady ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            <a href="#projects" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm">
              View Projects <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={resumePdf}
              download="RISHI_RATHI_RESUME.pdf"
              className="btn-outline inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
            <a href="#contact" className="btn-ghost inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold">
              Contact Me
            </a>
          </div>

          {/* Social row */}
          <div
            className={`mt-10 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground transition-all duration-700 delay-[900ms] ${heroReady ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            <a className="flex items-center gap-2 transition hover:text-primary" href={links.github} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <span className="text-border">·</span>
            <a className="flex items-center gap-2 transition hover:text-primary" href={links.linkedin} target="_blank" rel="noreferrer">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <span className="text-border">·</span>
            <a className="flex items-center gap-2 transition hover:text-primary" href={links.leetcode} target="_blank" rel="noreferrer">
              <Code2 className="h-4 w-4" /> LeetCode
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <a href="#about" className="scroll-indicator flex flex-col items-center gap-1 text-xs text-muted-foreground/50 transition hover:text-primary">
            <span className="tracking-widest uppercase">scroll</span>
            <ChevronDown className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* ═══════ ABOUT — BENTO GRID ═══════ */}
      <AnimatedSection id="about" eyebrow="About" title="Education & background">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Education — spans 2 cols */}
          <div className="glass-card rounded-2xl p-6 sm:col-span-2 lg:col-span-2" onMouseMove={glow}>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold">B.Tech, Computer Science & Engineering</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Arya College of Engineering · RTU, Jaipur
              </p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">Aug 2023 – Jul 2027</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                I spend most of my time in the backend: designing REST APIs, modelling relational
                data and keeping services correct under concurrent load. Java and Spring Boot are
                the core I build everything else around.
              </p>
            </div>
          </div>

          {/* CGPA */}
          <div className="glass-card-accent rounded-2xl p-6" onMouseMove={glow}>
            <p className="text-xs tracking-widest text-muted-foreground uppercase">CGPA</p>
            <p className="mt-2 font-display text-5xl font-bold gradient-text-static">
              <AnimatedCounter target={9.02} duration={2000} />
            </p>
          </div>

          {/* Location */}
          <div className="glass-card rounded-2xl p-6" onMouseMove={glow}>
            <div className="relative z-10">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">Based in</p>
              <p className="mt-2 text-2xl font-semibold">Jaipur</p>
              <p className="text-sm text-muted-foreground">Rajasthan, India</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <OrbitDivider />

      {/* ═══════ SKILLS ═══════ */}
      <AnimatedSection id="skills" eyebrow="Skills" title="The Nucleus">
        <p className="-mt-6 mb-8 max-w-2xl text-muted-foreground">
          Java sits at the core. Everything else orbits it in shells — hover to pause the orbit and
          inspect a node. The outer dashed shell is what I'm currently exploring.
        </p>
        <Nucleus />
      </AnimatedSection>

      <OrbitDivider />

      {/* ═══════ PROJECTS ═══════ */}
      <AnimatedSection id="projects" eyebrow="Work" title="Projects & experience">
        <div className="grid gap-5 md:grid-cols-2">
          {timeline.map((item) => (
            <article
              key={item.title}
              className="glass-card group rounded-2xl p-6"
              onMouseMove={glow}
            >
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold sm:text-xl">{item.title}</h3>
                  <span className="rounded-full border border-primary/50 bg-primary/10 px-2.5 py-0.5 text-[11px] text-primary">
                    {item.badge}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{item.period}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
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
                <div className="mt-5 flex flex-wrap gap-4">
                  {item.repo && (
                    <a
                      href={item.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary transition hover:gap-3"
                    >
                      <Github className="h-4 w-4" /> View repository
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-accent transition hover:gap-3"
                    >
                      <ExternalLink className="h-4 w-4" /> Live demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

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

      {/* ═══════ ACHIEVEMENTS ═══════ */}
      <AnimatedSection id="achievements" eyebrow="Proof of work" title="Achievements">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="glass-card rounded-2xl p-6" onMouseMove={glow}>
            <div className="relative z-10">
              <p className="text-4xl">🦈</p>
              <p className="mt-3 text-lg font-semibold">Pull Shark</p>
              <p className="mt-1 text-sm text-muted-foreground">GitHub achievement badge</p>
            </div>
          </div>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="glass-card-accent rounded-2xl p-6"
            onMouseMove={glow}
          >
            <p className="font-display text-5xl font-bold gradient-text-static">
              <AnimatedCounter target={16} duration={1800} />
            </p>
            <p className="mt-3 text-lg font-semibold">Public repos</p>
            <p className="mt-1 text-sm text-muted-foreground">
              DSA practice & learning-log repos
            </p>
          </a>
          <a
            href={links.leetcode}
            target="_blank"
            rel="noreferrer"
            className="glass-card-accent rounded-2xl p-6"
            onMouseMove={glow}
          >
            <p className="font-display text-5xl font-bold gradient-text-static">
              <AnimatedCounter target={200} suffix="+" duration={2000} />
            </p>
            <p className="mt-3 text-lg font-semibold">LeetCode</p>
            <p className="mt-1 text-sm text-muted-foreground">_BAKI_HANMA_ profile</p>
          </a>
        </div>
      </AnimatedSection>

      {/* ═══════ CERTIFICATIONS ═══════ */}
      <AnimatedSection id="certifications" eyebrow="Credentials" title="Certifications">
        <div className="flex flex-wrap gap-3">
          {certifications.map((c) => (
            <span
              key={c}
              className="tag-hover rounded-xl border border-border bg-surface/50 px-4 py-2 text-sm text-foreground/85 backdrop-blur-sm"
            >
              {c}
            </span>
          ))}
        </div>
      </AnimatedSection>

      <OrbitDivider />

      {/* ═══════ CONTACT ═══════ */}
      <AnimatedSection id="contact" eyebrow="Contact" title="Let's build something">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-5">
            <p className="text-muted-foreground leading-relaxed">
              I'm always open to discussing backend architecture, Java projects, or new
              opportunities. Drop me a line!
            </p>
            <div className="space-y-3">
              <a className="social-link flex items-center gap-3 text-muted-foreground" href={`mailto:${links.email}`}>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/50">
                  <Mail className="h-4 w-4 text-primary" />
                </span>
                {links.email}
              </a>
              <a className="social-link flex items-center gap-3 text-muted-foreground" href={`tel:${links.phone.replace(/\s/g, "")}`}>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/50">
                  <Phone className="h-4 w-4 text-primary" />
                </span>
                {links.phone}
              </a>
              <a className="social-link flex items-center gap-3 text-muted-foreground" href={links.github} target="_blank" rel="noreferrer">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/50">
                  <Github className="h-4 w-4 text-primary" />
                </span>
                github.com/Rishi895-Rathi
              </a>
              <a className="social-link flex items-center gap-3 text-muted-foreground" href={links.linkedin} target="_blank" rel="noreferrer">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/50">
                  <Linkedin className="h-4 w-4 text-primary" />
                </span>
                LinkedIn
              </a>
              <a className="social-link flex items-center gap-3 text-muted-foreground" href={links.leetcode} target="_blank" rel="noreferrer">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/50">
                  <Code2 className="h-4 w-4 text-primary" />
                </span>
                _BAKI_HANMA_ · LeetCode
              </a>
            </div>
          </div>

          <form
            action={`mailto:${links.email}`}
            method="post"
            encType="text/plain"
            className="glass-card dot-grid rounded-2xl p-6"
            onMouseMove={glow}
          >
            <div className="relative z-10 space-y-4">
              <div>
                <label htmlFor="name" className="text-xs tracking-widest text-muted-foreground uppercase">Name</label>
                <input id="name" name="name" required className="input-glow mt-1 w-full rounded-lg border border-input bg-background/80 px-3 py-2.5 text-sm outline-none backdrop-blur-sm" />
              </div>
              <div>
                <label htmlFor="email" className="text-xs tracking-widest text-muted-foreground uppercase">Email</label>
                <input id="email" name="email" type="email" required className="input-glow mt-1 w-full rounded-lg border border-input bg-background/80 px-3 py-2.5 text-sm outline-none backdrop-blur-sm" />
              </div>
              <div>
                <label htmlFor="message" className="text-xs tracking-widest text-muted-foreground uppercase">Message</label>
                <textarea id="message" name="message" rows={4} required className="input-glow mt-1 w-full rounded-lg border border-input bg-background/80 px-3 py-2.5 text-sm outline-none backdrop-blur-sm" />
              </div>
              <button type="submit" className="btn-primary w-full rounded-lg px-4 py-3 text-sm">
                Send message
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Opens your mail client ·{" "}
                <a className="text-primary hover:underline" href={`mailto:${links.email}`}>
                  {links.email}
                </a>
              </p>
            </div>
          </form>
        </div>
      </AnimatedSection>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="section-glow border-t border-border py-10 text-center">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <a className="btn-outline inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold" href={resumePdf} download="RISHI_RATHI_RESUME.pdf">
              <Download className="h-3.5 w-3.5" /> Download Resume
            </a>
            <span className="text-border">·</span>
            <span>© {new Date().getFullYear()} Rishi Rathi</span>
            <span className="text-border">·</span>
            <span className="text-xs">Built with Java-shaped patience</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
