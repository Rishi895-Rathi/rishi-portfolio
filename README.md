# Nucleus Backend

Build a modern, single-page developer portfolio website for a Java Backend Developer. The site must be responsive, dark-mode-first, and feel like a product built by someone who genuinely ships backend systems — clean, technical, not overly flashy.

CORE DESIGN CONCEPT — "The Nucleus"

The entire skills section must be built around a nucleus/atom metaphor:

A glowing central nucleus node represents Java — the core identity everything else orbits around.
Around it, concentric orbiting rings (like electron shells) each carry a category of skills, animated with slow continuous rotation (CSS animation, pause on hover):
Ring 1 (closest — Core Backend): Spring Boot, Spring Security, Spring Data JPA, Hibernate, JDBC
Ring 2 (Languages & Data): Python, C++, SQL, JavaScript
Ring 3 (Databases): PostgreSQL, MySQL, MongoDB, Redis
Ring 4 (Tooling): GitHub, Docker, Postman, Swagger, IntelliJ IDEA, Eclipse, Maven
Outer ring (Exploring): AWS, Apache Kafka — styled slightly dimmer/dashed to signal "dabbled with, currently learning"
Each skill is a small orbiting pill/node; hovering pauses rotation and highlights that node with a tooltip.
On mobile, degrade gracefully to a radial/grouped layout (or static concentric circles) — do NOT drop the nucleus metaphor, just simplify the animation.
Use this same nucleus/orbit visual language subtly elsewhere on the site (e.g., section dividers, loading state, hero background) to keep it cohesive as the site's signature motif.
SECTIONS TO BUILD

1. Hero

Name: Rishi Rathi
Title: Java Backend Developer | Spring Boot • REST APIs • PostgreSQL
One-line pitch: "Aspiring Software Engineer building scalable, secure backend systems with Java and Spring Boot."
CTA buttons: "View Projects", "Download Resume", "Contact Me"
Contact: rishirathi202@gmail.com | +91 6376078008
Social links: GitHub · LinkedIn · LeetCode

2. About / Education

B.Tech, Computer Science & Engineering — Arya College of Engineering, Rajasthan Technical University, Jaipur (Aug 2023 – Jul 2027)
CGPA: 9.02
Based in Jaipur, Rajasthan

3. Skills — The Nucleus (see design concept above)

4. Projects & Experience (unified timeline — newest first, each entry as a card with a small status badge, date range, tech-stack tags, and a GitHub link where available. Note: repos like dsa-tracker and GSSoC notes are personal learning/practice repos — do NOT feature them as project cards here; they can optionally be linked from the GitHub stat card in Achievements instead.)

Hospital Management System — 2026: Present · Badge: Current project Developing a Java Spring Boot backend for managing Patients, Doctors, and Appointments using DTO-based architecture and relational database integration. Implemented appointment scheduling logic to prevent conflicting bookings by ensuring a doctor cannot be assigned multiple appointments at the same date and time. Designed RESTful APIs for patient, doctor, and appointment management while maintaining data consistency and integrity. Stack: Java, Spring Boot, Postman, PostgreSQL, Docker Next step: deploying the app to make it live/publicly accessible Repo: https://github.com/Rishi895-Rathi/Hospital-Analysis-System
Email Automation Platform: Java Spring Boot Backend — 2026: Jan – Jul · Badge: Testing Phase Engineered a Java Spring Boot backend system that automates lead generation and outreach. The platform accepts seed inputs such as a company name, industry, or business category, discovers similar companies from multiple online sources, extracts relevant contact information, and automates personalized email communication. Streamlines prospect discovery, data aggregation, and outreach workflows for business networking and lead engagement at scale. Stack: Java, Spring Boot, PostgreSQL, Docker, Outreach AI, Prospeo AI (email automation) Status note: Core backend and automation flow are built and in testing — a few features are still being finished, so display this as in progress / not yet fully complete even though the active build window runs through July 2026.
TaskFlow API — 2026 – 2026 · Badge: Personal project RESTful task and project management service with JWT auth, rate limiting, real-time updates, and Hibernate-optimized queries for high throughput. Stack: Spring Boot, Swagger, PostgreSQL, REST APIs, JWT Repo: https://github.com/Rishi895-Rathi/todo-api
GSSoC 2026 Contributions — 2026 · Badge: Open source Contributed backend improvements to three open-source Java projects. Focused on API performance, new endpoints, and test coverage. Stack: Java, Spring Boot, Open Source
Backend Internship | Currency Converter — Summer 2025 · Badge: Learning project Developed a desktop-based currency conversion application using Java Swing that provides real-time exchange rates through external currency APIs. Enables users to convert between multiple currencies instantly through an intuitive graphical interface, with accurate and up-to-date results. Stack: Java, JDBC, REST, MySQL, Swing Repo: https://github.com/Rishi895-Rathi/currencyconverter
SEO Intern — Single Tap — 23 Sep 2024 – 22 Nov 2024 · Badge: Professional experience Worked on off-page SEO for client websites — link building and other off-page optimization activities to improve search visibility and domain authority. Stack: SEO
Java Backend Internship — Summer 2025 · Badge: Professional experience Built a School Management System using Java and database integration to manage students, teachers, and academic records. Implemented CRUD operations and structured data management to simplify administrative workflows and improve record accessibility. Stack: Java, Spring Boot, PostgreSQL, AWS
Snake Game — 2024 · Badge: Learning Project Engineered a Snake Game using Java Swing, featuring real-time keyboard controls, collision detection, score tracking, dynamic snake growth, and game-over handling. Implemented event-driven game mechanics and object-oriented design principles for an interactive desktop gaming experience. Stack: Java, Swing Repo: https://github.com/Rishi895-Rathi/snake-game-
Hangman Game: Python Intern — Summer 2023 · Badge: Current project Built a Hangman Game in Python featuring random word selection, input validation, attempt tracking, and interactive gameplay. Implemented core game logic and string manipulation techniques for an engaging word-guessing experience while strengthening problem-solving and programming fundamentals. Stack: Python

4b. Other GitHub Repos (learning/practice — low emphasis) Add a small, visually de-emphasized strip below the main project timeline — plain text list or muted small-cards, NOT full project cards, no screenshots, no elaborate descriptions. Just repo name + one short line + GitHub link. This section must clearly read as "in-progress learning notes", not shipped work — smaller font, muted color, maybe a subtle "learning log" label above it.

GSSoC Notes — personal notes from GSSoC open-source contributions
dsa-tracker — tracker for DSA/problem-solving practice
DevOps Learning — notes/practice repo while learning DevOps fundamentals (Link each to its GitHub repo under github.com/Rishi895-Rathi if available; otherwise just list the repo name.)

5. Achievements / Proof of Work (small badge/stat cards — keep this section credibility-focused, not decorative)

🦈 GitHub Pull Shark achievement badge
16 public repositories on GitHub
200+ problems solved on LeetCode, holding 3 LeetCode badges (username: _BAKI_HANMA_)

6. Certifications

Java
C
PostgreSQL
MongoDB
Forage — Software Engineering Job Simulation
Generative AI (LinkedIn Learning)

7. Contact / Footer

Email, phone, GitHub, LinkedIn, LeetCode links repeated
Simple contact form (name, email, message) — no backend needed, just mailto: fallback or a note that it's a static form
TECH & STYLE NOTES
Suggested stack: React + Tailwind CSS (or plain HTML/CSS/JS if a lighter build is preferred), since the target audience (recruiters/hiring managers) will judge load speed too.
Color palette: dark background, one accent color used consistently for the nucleus glow and CTA buttons (e.g., electric blue or teal — pick one, don't mix).
Typography: one clean sans-serif for headings, one for body — avoid more than 2 font families.
Keep animations performant (CSS transforms, not JS-heavy re-renders) — the orbit animation should not tank Lighthouse scores.
Fully responsive: hero, nucleus skills section, and project cards must reflow cleanly on mobile.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ad13119b-de35-4e0d-87dd-2419e699c845).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
