export type Ring = {
  label: string;
  radius: number;
  duration: number;
  reverse?: boolean;
  dim?: boolean;
  skills: string[];
};

export const rings: Ring[] = [
  {
    label: "Core Backend",
    radius: 120,
    duration: 34,
    skills: ["Spring Boot", "Spring Security", "Spring Data JPA", "JDBC"],
  },
  {
    label: "Languages & Data",
    radius: 185,
    duration: 46,
    reverse: true,
    skills: ["Python", "C++", "SQL", "JavaScript"],
  },
  {
    label: "Databases",
    radius: 250,
    duration: 58,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Hibernate", "CI/CD"],
  },
  {
    label: "Tooling",
    radius: 320,
    duration: 72,
    reverse: true,
    skills: ["GitHub", "Docker", "Postman", "Swagger", "Redis", "IntelliJ IDEA", "Eclipse", "Maven"],
  },
  {
    label: "Exploring",
    radius: 385,
    duration: 90,
    dim: true,
    skills: ["AWS", "Apache Kafka", "Mockito", "JUnit"],
  },
];

export type TimelineItem = {
  title: string;
  period: string;
  badge: string;
  body: string;
  note?: string;
  stack: string[];
  repo?: string;
  link?: string;
};

export const timeline: TimelineItem[] = [
  {
    title: "Hospital Management System",
    period: "2026",
    badge: "Live project",
    body: "Java Spring Boot backend managing Patients, Doctors and Appointments with a DTO-based architecture and relational database integration. Appointment scheduling logic prevents conflicting bookings so a doctor is never double-assigned for the same date and time, with RESTful APIs across patient, doctor and appointment management keeping data consistent and intact.",
    note: "Open issue: Looking for contributors to implement email verification. Feel free to submit a PR!",
    stack: ["Java", "Spring Boot", "Postman", "PostgreSQL", "Docker"],
    repo: "https://github.com/Rishi895-Rathi/Hospital-Analysis-System",
    link: "https://hospital-analysis-system.vercel.app",
  },
  {
    title: "Email Automation Platform — Spring Boot Backend",
    period: "Jan – Jul 2026",
    badge: "Backend Completed",
    body: "Java Spring Boot backend that automates lead generation and outreach. It accepts seed inputs such as a company name, industry or business category, discovers similar companies across multiple online sources, extracts relevant contact information and automates personalized email communication — streamlining prospect discovery, data aggregation and outreach at scale.",
    note: "Backend is fully complete and operational (requires your own API keys). The frontend is currently a work in progress.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Outreach AI", "Prospeo AI"],
    repo: "https://github.com/Rishi895-Rathi/Email-automation",
  },
  {
    title: "TaskFlow API",
    period: "2026",
    badge: "Personal project",
    body: "RESTful task and project management service with JWT authentication, rate limiting, real-time updates and Hibernate-optimized queries tuned for high throughput.",
    stack: ["Spring Boot", "Swagger", "PostgreSQL", "REST APIs", "JWT"],
    repo: "https://github.com/Rishi895-Rathi/todo-api",
  },
  {
    title: "GSSoC 2026 Contributions",
    period: "2026",
    badge: "Open source",
    body: "Contributed backend improvements to three open-source Java projects, focused on API performance, new endpoints and test coverage.",
    stack: ["Java", "Spring Boot", "Open Source"],
  },
  {
    title: "Backend Internship — Currency Converter",
    period: "Summer 2025",
    badge: "Learning project",
    body: "Desktop currency conversion application built with Java Swing that pulls real-time exchange rates from external currency APIs, letting users convert between multiple currencies instantly through an intuitive interface.",
    stack: ["Java", "JDBC", "REST", "MySQL", "Swing"],
    repo: "https://github.com/Rishi895-Rathi/currencyconverter",
  },
  {
    title: "Java Backend Internship — School Management System",
    period: "Summer 2025",
    badge: "Professional experience",
    body: "Built a School Management System using Java with database integration to manage students, teachers and academic records. Implemented CRUD operations and structured data management to simplify administrative workflows and improve record accessibility.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "AWS"],
    repo: "https://github.com/Rishi895-Rathi/schl_management_db",
  },
  {
    title: "SEO Intern — Single Tap",
    period: "23 Sep 2024 – 22 Nov 2024",
    badge: "Professional experience",
    body: "Worked on off-page SEO for client websites — link building and other off-page optimization activities to improve search visibility and domain authority.",
    stack: ["SEO"],
  },
  {
    title: "Snake Game",
    period: "2024",
    badge: "Learning project",
    body: "Java Swing game with real-time keyboard controls, collision detection, score tracking, dynamic snake growth and game-over handling — built around event-driven mechanics and object-oriented design.",
    stack: ["Java", "Swing"],
    repo: "https://github.com/Rishi895-Rathi/snake-game-",
  },
  {
    title: "Hangman Game — Python Internship",
    period: "Summer 2023",
    badge: "Learning project",
    body: "Python Hangman game with random word selection, input validation, attempt tracking and interactive gameplay, built to strengthen core game logic, string manipulation and problem-solving fundamentals.",
    stack: ["Python"],
  },
];

export const learningRepos = [
  {
    name: "GSSoC Notes",
    line: "Personal notes from GSSoC open-source contributions",
    url: "https://github.com/Rishi895-Rathi",
  },
  {
    name: "dsa-tracker",
    line: "Tracker for DSA / problem-solving practice",
    url: "https://github.com/Rishi895-Rathi/dsa-tracker",
  },
  {
    name: "DevOps Learning",
    line: "Notes and practice while learning DevOps fundamentals",
    url: "https://github.com/Rishi895-Rathi",
  },
];

export const certifications = [
  "Java",
  "C",
  "PostgreSQL",
  "MongoDB",
  "Forage — Software Engineering Job Simulation",
  "Generative AI (LinkedIn Learning)",
];

export const links = {
  github: "https://github.com/Rishi895-Rathi",
  linkedin: "https://www.linkedin.com/in/er-rishirathi/",
  leetcode: "https://leetcode.com/u/_BAKI_HANMA/",
  email: "rishirathi202@gmail.com",
  phone: "+91 6376078008",
};
