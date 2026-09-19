export type ProjectLink = { label: string; url: string };
export type ProjectMetric = { value: string; label: string };

export type Project = {
  slug: string;
  index: string;
  title: string;
  year: string;
  context: string;
  problem: string;
  role: string;
  stack: string[];
  metrics: ProjectMetric[];
  links: ProjectLink[];
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "clipboard-history",
    index: "01",
    title: "Clipboard History",
    year: "2024",
    context: "Open-source Chrome extension",
    problem:
      "Copy-paste forgets everything the moment you copy the next thing. I built a clipboard manager that keeps a searchable history in the browser, then added optional cloud sync with InstantDB so it follows you across machines.",
    role: "Creator & maintainer",
    stack: ["Plasma", "React", "TypeScript", "InstantDB"],
    metrics: [
      { value: "10,000+", label: "Active users" },
      { value: "4.6★", label: "54 reviews" },
      { value: "119", label: "GitHub stars" },
      { value: "31", label: "Forks" },
    ],
    links: [{ label: "GitHub", url: "https://github.com/aichRhythm" }],
  },
  {
    slug: "clipboard-history-mobile",
    index: "02",
    title: "Clipboard History Mobile",
    year: "2024",
    context: "Companion app for iOS & Android",
    problem:
      "The extension needed a pocket-sized counterpart. As principal developer I shipped a React Native companion that syncs the same history to phones — reusing the sync layer and keeping the interaction model identical.",
    role: "Principal developer",
    stack: ["React Native", "Expo", "TypeScript"],
    metrics: [
      { value: "2", label: "App stores" },
      { value: "1", label: "Shared sync layer" },
      { value: "iOS + Android", label: "Platforms" },
    ],
    links: [{ label: "GitHub", url: "https://github.com/aichRhythm" }],
  },
  {
    slug: "portfolio",
    index: "03",
    title: "This Portfolio",
    year: "2026",
    context: "The site you're on right now",
    problem:
      "A portfolio should demonstrate the craft it claims. This is a dark editorial build with scroll-driven motion, a sticky project stack, and a horizontal gallery — React, TypeScript, Lenis and GSAP working together.",
    role: "Design & build",
    stack: ["React", "TypeScript", "Lenis", "GSAP"],
    metrics: [
      { value: "1", label: "Continuous scroll" },
      { value: "60fps", label: "Motion budget" },
    ],
    links: [{ label: "Live site", url: "https://rhythmaich.dev" }],
  },
  {
    slug: "bain-training-platform",
    index: "04",
    title: "Bain Enterprise Training Platform",
    year: "2025",
    context: "Internal platform, Bain & Company",
    problem:
      "Training operations ran on spreadsheets. I built the rules engine that models 20+ training types and an allocation engine that sorts 2,000+ employees into 60+ batches — automating roughly 80% of manual assignment work and giving attendance and feedback a real home.",
    role: "Software Engineer",
    stack: [
      "React.js",
      "FastAPI",
      "PostgreSQL",
      "Azure",
      "Okta",
      "Docker",
    ],
    metrics: [
      { value: "~80%", label: "Assignments automated" },
      { value: "2,000+", label: "Employees filtered" },
      { value: "60+", label: "Batches allocated" },
      { value: "10,000+", label: "Employees / year" },
    ],
    links: [],
    note: "Enterprise build — private repository",
  },
];
