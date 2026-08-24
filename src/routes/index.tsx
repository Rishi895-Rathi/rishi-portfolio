import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Code2 } from "lucide-react";
import { Nucleus } from "@/components/portfolio/Nucleus";
import { OrbitDivider } from "@/components/portfolio/OrbitDivider";
import { timeline, learningRepos, certifications, links } from "@/components/portfolio/data";
import rishiPortrait from "@/assets/rishi-portrait.png.asset.json";
import resumePdf from "@/assets/RISHI_RATHI_RESUME.pdf.asset.json";
import { useResumeLink } from "@/lib/resume";

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

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-6 py-16">
      <p className="mb-2 flex items-center gap-2 text-[11px] tracking-[0.25em] text-primary uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[var(--glow-soft)]" />
        {eyebrow}
      </p>
      <h2 className="mb-10 text-3xl font-bold sm:text-4xl">{title}</h2>
      {children}
    </section>
  );
}

function Tag({ children, dim }: { children: React.ReactNode; dim?: boolean }) {
  return (
    <span
      className={[
        "rounded-full border px-2.5 py-0.5 text-[11px]",
        dim ? "border-dashed border-border text-muted-foreground" : "border-border text-foreground/80",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function Portfolio() {
  const resume = useResumeLink(resumePdf.url, "RISHI_RATHI_RESUME.pdf");

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <header className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="absolute h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
          <span className="absolute h-[300px] w-[300px] rounded-full border border-primary/15" />
          <span className="absolute h-[520px] w-[520px] rounded-full border border-dashed border-primary/10" />
          <span className="absolute h-[760px] w-[760px] rounded-full border border-primary/[0.07]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" /> Jaipur, Rajasthan · Open to backend roles
            </p>
            <h1 className="text-5xl font-bold sm:text-7xl">Rishi Rathi</h1>
            <p className="mt-4 font-mono text-sm text-primary sm:text-base">
              Java Backend Developer | Spring Boot • REST APIs • PostgreSQL
            </p>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Aspiring Software Engineer building scalable, secure backend systems with Java and Spring
              Boot.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--glow-soft)] transition hover:opacity-90"
              >
                View Projects
              </a>
              <a
                href={resume.url}
                download={resume.fileName}
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

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <a className="flex items-center gap-2 hover:text-primary" href={`mailto:${links.email}`}>
                <Mail className="h-4 w-4" /> {links.email}
              </a>
              <a className="flex items-center gap-2 hover:text-primary" href={`tel:${links.phone.replace(/\s/g, "")}`}>
                <Phone className="h-4 w-4" /> {links.phone}
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a className="flex items-center gap-2 hover:text-primary" href={links.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <span className="text-border">·</span>
              <a className="flex items-center gap-2 hover:text-primary" href={links.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <span className="text-border">·</span>
              <a className="flex items-center gap-2 hover:text-primary" href={links.leetcode} target="_blank" rel="noreferrer">
                <Code2 className="h-4 w-4" /> LeetCode
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
              <img
                src={rishiPortrait.url}
                alt="Rishi Rathi"
                className="relative h-56 w-56 rounded-full border-2 border-primary/40 object-cover shadow-[var(--glow-soft)] sm:h-72 sm:w-72"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <Section id="about" eyebrow="About" title="Education & background">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:col-span-2">
            <h3 className="text-xl font-semibold">B.Tech, Computer Science & Engineering</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Arya College of Engineering · Rajasthan Technical University, Jaipur
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">Aug 2023 – Jul 2027</p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              I spend most of my time in the backend: designing REST APIs, modelling relational data
              and keeping services correct under concurrent load. Java and Spring Boot are the core
              I build everything else around.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-primary/40 bg-primary/5 p-6">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">CGPA</p>
              <p className="font-display text-4xl font-bold text-primary">9.02</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">Based in</p>
              <p className="mt-1 text-lg font-semibold">Jaipur, Rajasthan</p>
            </div>
          </div>
        </div>
      </Section>

      <OrbitDivider />

      {/* SKILLS */}
      <Section id="skills" eyebrow="Skills" title="The Nucleus">
        <p className="-mt-6 mb-8 max-w-2xl text-muted-foreground">
          Java sits at the core. Everything else orbits it in shells — hover to pause the orbit and
          inspect a node. The outer dashed shell is what I'm currently exploring.
        </p>
        <Nucleus />
      </Section>

      <OrbitDivider />

      {/* PROJECTS */}
      <Section id="projects" eyebrow="Work" title="Projects & experience">
        <ol className="relative space-y-6 border-l border-border pl-6 sm:pl-8">
          {timeline.map((item) => (
            <li key={item.title} className="relative">
              <span className="absolute top-7 -left-[31px] h-3 w-3 rounded-full border border-primary bg-background sm:-left-[39px]" />
              <article className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:border-primary/50">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold sm:text-xl">{item.title}</h3>
                  <span className="rounded-full border border-primary/50 bg-primary/10 px-2.5 py-0.5 text-[11px] text-primary">
                    {item.badge}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{item.period}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{item.body}</p>
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
                    className="mt-5 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Github className="h-4 w-4" /> View repository
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
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
                  className="font-mono text-xs text-foreground/70 hover:text-primary"
                >
                  {r.name}
                </a>
                <span className="text-border">—</span>
                <span className="text-xs">{r.line}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <OrbitDivider />

      {/* ACHIEVEMENTS */}
      <Section id="achievements" eyebrow="Proof of work" title="Achievements">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-3xl">🦈</p>
            <p className="mt-3 font-semibold">Pull Shark</p>
            <p className="mt-1 text-sm text-muted-foreground">GitHub achievement badge</p>
          </div>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/50"
          >
            <p className="font-display text-4xl font-bold text-primary">16</p>
            <p className="mt-3 font-semibold">Public repositories</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Including DSA practice and learning-log repos
            </p>
          </a>
          <a
            href={links.leetcode}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/50"
          >
            <p className="font-display text-4xl font-bold text-primary">200+</p>
            <p className="mt-3 font-semibold">LeetCode problems</p>
            <p className="mt-1 text-sm text-muted-foreground">_BAKI_HANMA_ - LeetCode Profile</p>
          </a>
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certifications" eyebrow="Credentials" title="Certifications">
        <div className="flex flex-wrap gap-3">
          {certifications.map((c) => (
            <span
              key={c}
              className="rounded-xl border border-border bg-card px-4 py-2 text-sm text-foreground/85"
            >
              {c}
            </span>
          ))}
        </div>
      </Section>

      <OrbitDivider />

      {/* CONTACT */}
      <Section id="contact" eyebrow="Contact" title="Let's build something">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-muted-foreground">
            <a className="flex items-center gap-3 hover:text-primary" href={`mailto:${links.email}`}>
              <Mail className="h-4 w-4 text-primary" /> {links.email}
            </a>
            <a className="flex items-center gap-3 hover:text-primary" href={`tel:${links.phone.replace(/\s/g, "")}`}>
              <Phone className="h-4 w-4 text-primary" /> {links.phone}
            </a>
            <a className="flex items-center gap-3 hover:text-primary" href={links.github} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4 text-primary" /> github.com/Rishi895-Rathi
            </a>
            <a className="flex items-center gap-3 hover:text-primary" href={links.linkedin} target="_blank" rel="noreferrer">
              <Linkedin className="h-4 w-4 text-primary" /> LinkedIn
            </a>
            <a className="flex items-center gap-3 hover:text-primary" href={links.leetcode} target="_blank" rel="noreferrer">
              <Code2 className="h-4 w-4 text-primary" /> _BAKI_HANMA - LeetCode Profile
            </a>
          </div>

          <form
            action={`mailto:${links.email}`}
            method="post"
            encType="text/plain"
            className="space-y-4 rounded-2xl border border-border bg-card p-6"
          >
            <div>
              <label htmlFor="name" className="text-xs tracking-widest text-muted-foreground uppercase">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs tracking-widest text-muted-foreground uppercase">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-xs tracking-widest text-muted-foreground uppercase">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Send message
            </button>
            <p className="text-xs text-muted-foreground">
              Static form — it opens your mail client. Direct email works too:{" "}
              <a className="text-primary hover:underline" href={`mailto:${links.email}`}>
                {links.email}
              </a>
            </p>
          </form>
        </div>
      </Section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        <a
          className="text-primary hover:underline"
          href={resume.url}
          download={resume.fileName}
        >
          Download Resume
        </a>
        <span className="mx-2">·</span>© {new Date().getFullYear()} Rishi Rathi · Built with
        Java-shaped patience.
      </footer>
    </main>
  );
}
