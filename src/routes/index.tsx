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

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rishi Rathi",
  "jobTitle": "Java Backend Developer",
  "url": "https://rishi-portfolio-taupe.vercel.app/",
  "sameAs": [
    "https://github.com/Rishi895-Rathi",
    "https://www.linkedin.com/in/er-rishirathi/"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "addressCountry": "India"
  },
  "knowsAbout": ["Java", "Spring Boot", "PostgreSQL", "REST APIs", "Backend Development"],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Arya College of Engineering"
  }
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rishi Rathi | Java Backend Developer & API Architect" },
      {
        name: "description",
        content:
          "Portfolio of Rishi Rathi, an aspiring Java Backend Developer specializing in scalable, secure systems with Spring Boot, REST APIs, and PostgreSQL. Based in Jaipur, India.",
      },
      { property: "og:title", content: "Rishi Rathi | Java Backend Developer" },
      {
        property: "og:description",
        content:
          "Discover the projects, experience, and skills of Rishi Rathi, a Java Backend Developer building secure REST APIs and scalable architectures.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://rishi-portfolio-taupe.vercel.app/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rishi Rathi | Java Backend Developer" },
      { name: "twitter:description", content: "Discover the projects, experience, and skills of Rishi Rathi, a Java Backend Developer." },
    ],
    links: [
      { rel: "canonical", href: "https://rishi-portfolio-taupe.vercel.app/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(personSchema)
      }
    ]
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
    const current = texts[textIndex] ?? "";
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

/* ─── Cherry Blossom SVG ─── */
function BlossomDecoration() {
  return (
    <svg
      className="blossom-bg"
      style={{ bottom: "-40px", right: "-20px", width: "420px", height: "420px" }}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Simple stylized blossom silhouette */}
      {[0,72,144,216,288].map((rot, i) => (
        <g key={i} transform={`rotate(${rot} 100 100)`}>
          <ellipse cx="100" cy="60" rx="18" ry="32" fill="#c084c8" opacity="0.9"/>
          <ellipse cx="100" cy="68" rx="10" ry="16" fill="#e8b4f0" opacity="0.5"/>
        </g>
      ))}
      <circle cx="100" cy="100" r="12" fill="#f5d0f8" opacity="0.9"/>
      {/* Smaller blossoms scattered */}
      {[
        {cx:30,cy:40,r:3},{cx:170,cy:60,r:2},{cx:50,cy:160,r:2.5},
        {cx:155,cy:155,r:2},{cx:20,cy:130,r:1.5},{cx:180,cy:30,r:2},
      ].map((p,i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#c084c8" opacity="0.7"/>
      ))}
    </svg>
  );
}

/* ─── Section Divider ─── */
function SectionRule({ label }: { label?: string }) {
  return (
    <div className="mx-auto max-w-6xl px-6 flex items-center gap-6 py-2">
      <div className="section-rule flex-1" />
      {label && (
        <span className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--border-bright)] uppercase shrink-0">
          {label}
        </span>
      )}
      <div className="section-rule flex-1" />
    </div>
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

  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* Featured = first 2, rest are list */
  const featuredProjects = timeline.slice(0, 2);
  const listProjects = timeline.slice(2);

  return (
    <main className="noise-bg min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* ═══════ HERO ═══════ */}
      <header className="scan-lines relative min-h-screen overflow-hidden">

        {/* Single ambient glow — far background, barely visible */}
        <div
          className="hero-bg-glow"
          style={{
            width: "700px",
            height: "700px",
            top: "-100px",
            left: "-200px",
            background: "var(--primary)",
          }}
        />
        <div
          className="hero-bg-glow"
          style={{
            width: "400px",
            height: "400px",
            bottom: "0px",
            right: "-100px",
            background: "var(--accent)",
            opacity: "0.07",
          }}
        />

        {/* Cherry blossom decoration — bottom right corner */}
        <BlossomDecoration />

        {/* ── Asymmetric hero layout ── */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-6">

          {/* Top spacer for nav */}
          <div className="h-20" />

          {/* Main content — left aligned, asymmetric */}
          <div className="flex flex-col-reverse gap-12 py-8 md:flex-row md:items-center md:gap-0">

            {/* ── Left: Text block ── */}
            <div className="flex-1 md:pr-12">

              {/* Status badge */}
              <div
                className={`mb-8 transition-all duration-700 ${heroReady ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
              >
                <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-widest text-[var(--muted-foreground)] uppercase">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Open to backend roles
                  <span className="text-[var(--border-bright)]">·</span>
                  <MapPin className="h-3 w-3" /> Jaipur, India
                </span>
              </div>

              {/* Name — huge, left-aligned, two lines */}
              <div
                className={`transition-all duration-700 delay-150 ${heroReady ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
              >
                {/* Thin vertical accent rule */}
                <div className="mb-4 flex items-stretch gap-4">
                  <div className="w-px bg-[var(--primary)] self-stretch shrink-0" />
                  <div>
                    <h1 className="font-display font-bold leading-[0.9] tracking-tight text-[var(--foreground)]"
                      style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}>
                      RISHI<br />RATHI
                    </h1>
                  </div>
                </div>
              </div>

              {/* Typed role */}
              <p
                className={`mt-5 font-mono text-sm text-[var(--accent-2)] transition-all duration-700 delay-300 ${heroReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                <span className="typing-cursor">{typedText}</span>
              </p>

              {/* Description */}
              <p
                className={`mt-5 max-w-md text-base leading-relaxed text-[var(--muted-foreground)] transition-all duration-700 delay-[400ms] ${heroReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                Building scalable, secure backend systems with Java &amp; Spring Boot.
                Turning complex problems into clean, reliable APIs.
              </p>

              {/* Tech stack line */}
              <p
                className={`mt-5 font-mono text-[0.7rem] tracking-wide text-[var(--border-bright)] transition-all duration-700 delay-[500ms] ${heroReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                {"< Java / Spring Boot / PostgreSQL / Docker / REST APIs />"}
              </p>

              {/* CTAs */}
              <div
                className={`mt-10 flex flex-wrap gap-3 transition-all duration-700 delay-[600ms] ${heroReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                <a href="#projects" className="btn-primary">
                  View Projects <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a href={resumePdf} download="RISHI_RATHI_RESUME.pdf" className="btn-outline">
                  <Download className="h-3.5 w-3.5" /> Resume
                </a>
                <a href="#contact" className="btn-ghost">
                  Contact
                </a>
              </div>

              {/* Social row */}
              <div
                className={`mt-10 flex flex-wrap gap-5 text-xs text-[var(--muted-foreground)] transition-all duration-700 delay-[750ms] ${heroReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                <a className="social-link flex items-center gap-1.5" href={links.github} target="_blank" rel="noreferrer">
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
                <a className="social-link flex items-center gap-1.5" href={links.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
                <a className="social-link flex items-center gap-1.5" href={links.leetcode} target="_blank" rel="noreferrer">
                  <Code2 className="h-3.5 w-3.5" /> LeetCode
                </a>
              </div>
            </div>

            {/* ── Right: Portrait ── */}
            <div
              className={`flex shrink-0 justify-center md:justify-end transition-all duration-1000 delay-200 ${heroReady ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="relative">
                {/* Subtle glow behind portrait */}
                <div className="absolute inset-0 rounded-2xl blur-2xl"
                  style={{ background: "radial-gradient(circle, rgba(124,106,240,0.2) 0%, transparent 70%)" }}
                />
                {/* Portrait — no spinning borders, clean */}
                <img
                  src={rishiPortrait}
                  alt="Rishi Rathi - Java Backend Developer"
                  fetchPriority="high"
                  className="relative h-56 w-56 rounded-2xl object-cover object-top sm:h-72 sm:w-72"
                  style={{
                    filter: "contrast(1.05) saturate(0.8)",
                    boxShadow: "0 0 0 1px var(--border), var(--shadow-panel)",
                  }}
                />
                {/* Corner accent */}
                <div className="absolute -bottom-3 -right-3 h-16 w-16 border-b border-r border-[var(--primary)] opacity-60" />
                <div className="absolute -top-3 -left-3 h-16 w-16 border-t border-l border-[var(--accent)] opacity-40" />
              </div>
            </div>
          </div>

          {/* Scroll indicator — bottom */}
          <div className="flex justify-center pb-10">
            <a
              href="#about"
              className="scroll-indicator flex flex-col items-center gap-2 font-mono text-[0.6rem] tracking-[0.3em] text-[var(--muted-foreground)] uppercase opacity-60 transition hover:opacity-100"
            >
              scroll
              <ChevronDown className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* ═══════ ABOUT — BENTO ═══════ */}
      <SectionRule label="profile" />
      <AnimatedSection id="about" eyebrow="About" title="Education & background">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Education — spans 2 cols */}
          <div className="panel p-6 sm:col-span-2 lg:col-span-2">
            <h3 className="text-base font-semibold text-[var(--foreground)]">
              B.Tech, Computer Science & Engineering
            </h3>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Arya College of Engineering · RTU, Jaipur
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">
              Aug 2023 – Jul 2027
            </p>
            <p className="mt-5 text-sm leading-relaxed text-[var(--muted-foreground)]">
              I spend most of my time in the backend: designing REST APIs, modelling relational
              data and keeping services correct under concurrent load. Java and Spring Boot are
              the core I build everything else around.
            </p>
          </div>

          {/* CGPA */}
          <div className="panel-accent p-6">
            <p className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--muted-foreground)] uppercase">CGPA</p>
            <p className="mt-3 stat-num gradient-text-static">
              <AnimatedCounter target={9.02} duration={2000} />
            </p>
            <p className="mt-2 font-mono text-[0.6rem] text-[var(--muted-foreground)]">/ 10.0</p>
          </div>

          {/* Location */}
          <div className="panel p-6">
            <p className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--muted-foreground)] uppercase">Based in</p>
            <p className="mt-3 text-xl font-semibold text-[var(--foreground)]">Jaipur</p>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">Rajasthan, India</p>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════ SKILLS ═══════ */}
      <SectionRule label="stack" />
      <AnimatedSection id="skills" eyebrow="Skills" title="The Nucleus">
        <p className="-mt-6 mb-10 max-w-xl text-sm leading-relaxed text-[var(--muted-foreground)]">
          Java sits at the core. Everything else orbits it in shells — hover to pause the orbit and
          inspect a node. The outer dashed shell is what I'm currently exploring.
        </p>
        <Nucleus />
      </AnimatedSection>

      {/* ═══════ PROJECTS ═══════ */}
      <SectionRule label="work" />
      <AnimatedSection id="projects" eyebrow="Work" title="Projects & experience">

        {/* Featured — top 2 projects, card style */}
        <div className="grid gap-5 md:grid-cols-2 mb-16">
          {featuredProjects.map((item, idx) => (
            <article key={item.title} className="project-featured">
              {/* Number index */}
              <span className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--muted-foreground)] uppercase">
                0{idx + 1}
              </span>

              <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {item.title}
                </h3>
                <span className="font-mono text-[0.6rem] tracking-wide border border-[var(--primary-border)] bg-[var(--primary-dim)] text-[var(--primary)] rounded-sm px-2 py-0.5 uppercase">
                  {item.badge}
                </span>
              </div>

              <p className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">{item.period}</p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground)]">{item.body}</p>

              {item.note && (
                <p className="mt-4 border-l-2 border-[var(--accent)] pl-3 text-xs text-[var(--foreground)]/70">
                  {item.note}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-1.5">
                {item.stack.map((s) => (
                  <span key={s} className="tech-tag">{s}</span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-5">
                {item.repo && (
                  <a
                    href={item.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--primary)] transition hover:text-[var(--accent)] hover:gap-2.5"
                  >
                    <Github className="h-3.5 w-3.5" /> View repository <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent-2)] transition hover:gap-2.5"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Rest — editorial list entries */}
        <div className="border-t border-[var(--border)]">
          {listProjects.map((item, idx) => (
            <article key={item.title} className="project-entry group">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[0.55rem] tracking-widest text-[var(--muted-foreground)]">
                    0{idx + 3}
                  </span>
                  <h3 className="text-base font-semibold text-[var(--foreground)]">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[var(--muted-foreground)]">{item.period}</span>
                  <span className="font-mono text-[0.55rem] tracking-wide border border-[var(--border-bright)] text-[var(--muted-foreground)] rounded-sm px-2 py-0.5 uppercase">
                    {item.badge}
                  </span>
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted-foreground)]">{item.body}</p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {item.stack.map((s) => (
                    <span key={s} className="tech-tag">{s}</span>
                  ))}
                </div>
                {item.repo && (
                  <a
                    href={item.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--primary)] transition hover:text-[var(--accent)] ml-auto"
                  >
                    <Github className="h-3.5 w-3.5" /> Repo <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Learning log */}
        <div className="mt-14 border-t border-[var(--border)] pt-8">
          <p className="mb-4 font-mono text-[0.6rem] tracking-[0.3em] text-[var(--muted-foreground)] uppercase">
            〉 Learning log — in-progress, not shipped work
          </p>
          <ul className="space-y-2">
            {learningRepos.map((r) => (
              <li key={r.name} className="flex flex-wrap items-center gap-x-3 text-sm">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link font-mono text-xs text-[var(--accent-2)]"
                >
                  {r.name}
                </a>
                <span className="text-[var(--border-bright)]">—</span>
                <span className="text-xs text-[var(--muted-foreground)]">{r.line}</span>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* ═══════ ACHIEVEMENTS ═══════ */}
      <SectionRule label="achievements" />
      <AnimatedSection id="achievements" eyebrow="Proof of work" title="Achievements">
        {/* Horizontal counter strip */}
        <div className="grid gap-px border border-[var(--border)] rounded-md overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          {/* Pull Shark */}
          <div className="bg-[var(--surface-2)] p-6">
            <span className="text-3xl" role="img" aria-label="shark">🦈</span>
            <p className="mt-3 font-semibold text-[var(--foreground)]">Pull Shark</p>
            <p className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">GitHub achievement</p>
          </div>

          {/* LeetCode Badges */}
          <a
            href={links.leetcode}
            target="_blank"
            rel="noreferrer"
            className="bg-[var(--surface-2)] p-6 transition hover:bg-[var(--surface)] group"
          >
            <span className="text-3xl" role="img" aria-label="medal">🏅</span>
            <p className="mt-3 stat-num gradient-text-teal">
              <AnimatedCounter target={6} duration={1500} />
            </p>
            <p className="mt-1 font-semibold text-[var(--foreground)] group-hover:text-[var(--accent-2)]">
              LeetCode Badges
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">_BAKI_HANMA_</p>
          </a>

          {/* Public repos */}
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="bg-[var(--surface-2)] p-6 transition hover:bg-[var(--surface)] group"
          >
            <p className="stat-num gradient-text-static">
              <AnimatedCounter target={16} duration={1800} />
            </p>
            <p className="mt-3 font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)]">
              Public Repos
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">GitHub</p>
          </a>

          {/* LeetCode solved */}
          <a
            href={links.leetcode}
            target="_blank"
            rel="noreferrer"
            className="bg-[var(--surface-2)] p-6 transition hover:bg-[var(--surface)] group"
          >
            <p className="stat-num gradient-text-static">
              <AnimatedCounter target={400} suffix="+" duration={2000} />
            </p>
            <p className="mt-3 font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)]">
              Problems Solved
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">LeetCode</p>
          </a>
        </div>
      </AnimatedSection>

      {/* ═══════ CERTIFICATIONS ═══════ */}
      <SectionRule label="credentials" />
      <AnimatedSection id="certifications" eyebrow="Credentials" title="Certifications">
        <div className="flex flex-wrap gap-2">
          {certifications.map((c) => (
            <span
              key={c}
              className="tech-tag cursor-default px-3 py-1 text-xs"
              style={{ fontSize: "0.75rem", padding: "0.3rem 0.75rem" }}
            >
              {c}
            </span>
          ))}
        </div>
      </AnimatedSection>

      {/* ═══════ CONTACT ═══════ */}
      <SectionRule label="contact" />
      <AnimatedSection id="contact" eyebrow="Contact" title="Let's build something">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left — CTA text + links */}
          <div>
            <p className="text-sm leading-relaxed text-[var(--muted-foreground)] max-w-sm">
              I'm always open to discussing backend architecture, Java projects, or new
              opportunities. If you have something interesting in mind, reach out.
            </p>

            <div className="mt-8 space-y-4">
              <a
                className="social-link flex items-center gap-3 text-sm text-[var(--muted-foreground)]"
                href={`mailto:${links.email}`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-[var(--border)] bg-[var(--surface-2)]">
                  <Mail className="h-3.5 w-3.5 text-[var(--primary)]" />
                </span>
                {links.email}
              </a>
              <a
                className="social-link flex items-center gap-3 text-sm text-[var(--muted-foreground)]"
                href={`tel:${links.phone.replace(/\s/g, "")}`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-[var(--border)] bg-[var(--surface-2)]">
                  <Phone className="h-3.5 w-3.5 text-[var(--primary)]" />
                </span>
                {links.phone}
              </a>
              <a
                className="social-link flex items-center gap-3 text-sm text-[var(--muted-foreground)]"
                href={links.github}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-[var(--border)] bg-[var(--surface-2)]">
                  <Github className="h-3.5 w-3.5 text-[var(--primary)]" />
                </span>
                github.com/Rishi895-Rathi
              </a>
              <a
                className="social-link flex items-center gap-3 text-sm text-[var(--muted-foreground)]"
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-[var(--border)] bg-[var(--surface-2)]">
                  <Linkedin className="h-3.5 w-3.5 text-[var(--primary)]" />
                </span>
                LinkedIn
              </a>
              <a
                className="social-link flex items-center gap-3 text-sm text-[var(--muted-foreground)]"
                href={links.leetcode}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-[var(--border)] bg-[var(--surface-2)]">
                  <Code2 className="h-3.5 w-3.5 text-[var(--primary)]" />
                </span>
                _BAKI_HANMA_ · LeetCode
              </a>
            </div>
          </div>

          {/* Right — Contact form, simplified */}
          <form
            action={`mailto:${links.email}`}
            method="post"
            encType="text/plain"
            className="panel p-6 space-y-5"
          >
            <div>
              <label htmlFor="name" className="block font-mono text-[0.6rem] tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-2">
                Name
              </label>
              <input id="name" name="name" required className="input-field" />
            </div>
            <div>
              <label htmlFor="email" className="block font-mono text-[0.6rem] tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-2">
                Email
              </label>
              <input id="email" name="email" type="email" required className="input-field" />
            </div>
            <div>
              <label htmlFor="message" className="block font-mono text-[0.6rem] tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-2">
                Message
              </label>
              <textarea id="message" name="message" rows={4} required className="input-field resize-none" />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              Send message
            </button>
            <p className="text-center font-mono text-[0.6rem] text-[var(--muted-foreground)]">
              Opens your mail client · <a className="text-[var(--primary)] hover:underline" href={`mailto:${links.email}`}>{links.email}</a>
            </p>
          </form>
        </div>
      </AnimatedSection>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-[var(--border)] py-10 text-center">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--muted-foreground)]">
            <a
              className="btn-outline text-xs px-4 py-2"
              href={resumePdf}
              download="RISHI_RATHI_RESUME.pdf"
            >
              <Download className="h-3 w-3" /> Resume
            </a>
            <span className="text-[var(--border-bright)]">·</span>
            <span className="font-mono">© {new Date().getFullYear()} Rishi Rathi</span>
            <span className="text-[var(--border-bright)]">·</span>
            <span className="font-mono opacity-50">Built with Java-shaped patience · 一期一会</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
