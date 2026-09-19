export type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const roles: Role[] = [
  {
    company: "Bain & Company",
    title: "Software Engineer",
    location: "Bengaluru, India",
    period: "Oct 2025 — Present",
    current: true,
    summary:
      "Building an internal enterprise training platform end to end, from schema to interface.",
    highlights: [
      "Designed a rules engine covering 20+ training types, replacing spreadsheet-driven configuration.",
      "Built an allocation engine that filters 2,000+ employees into 60+ batches, automating around 80% of assignments.",
      "Shipped attendance and feedback flows used by 10,000+ employees a year.",
      "Modelled the PostgreSQL schema and wired Okta authentication with role-based access control.",
    ],
    stack: ["React.js", "FastAPI", "PostgreSQL", "Azure", "Okta", "Docker"],
  },
  {
    company: "Capgemini India",
    title: "Associate Consultant",
    location: "Pune, India",
    period: "Oct 2022 — Sep 2025",
    summary: "Product engineering for banking clients, across mobile and web.",
    highlights: [
      "Built a shared React Native + TypeScript component library used across a major banking app.",
      "Wrote native bridges for push notifications, QR scanning, logging and media handling.",
      "Cut load time by 30% and memory usage by 20% through render and bundle optimisation.",
      "Held 95% test coverage with Jest and React Testing Library.",
      "Delivered React microfrontends for banking dashboards backed by Redux Toolkit.",
      "Optimised PostgreSQL queries behind dashboards for 100+ bank branches.",
    ],
    stack: [
      "React Native",
      "React",
      "TypeScript",
      "Redux Toolkit",
      "PostgreSQL",
      "Jest",
    ],
  },
  {
    company: "Capgemini India",
    title: "Internship Trainee",
    location: "Pune, India",
    period: "Feb 2022 — Apr 2022",
    summary: "Backend APIs for a customer service application.",
    highlights: [
      "Built REST APIs with Express.js and MongoDB for an insurance customer service product.",
      "Integrated Stripe for payments and SendGrid for transactional email.",
    ],
    stack: ["Express.js", "Node.js", "MongoDB", "Stripe", "SendGrid"],
  },
  {
    company: "Nestlé India",
    title: "Production Intern",
    location: "Goa, India",
    period: "Apr 2021 — May 2021",
    summary: "A study in packaging-line automation, before software.",
    highlights: [
      "Studied the product packaging line and modelled automation options for throughput.",
      "Built cost models to weigh each configuration against capital and labour savings.",
    ],
    stack: ["Process analysis", "Cost modelling"],
  },
];

export const education = {
  school: "National Institute of Technology, Durgapur",
  degree: "B.Tech, Chemical Engineering",
  period: "Jun 2018 — Jun 2022",
  detail: "CGPA 7.62 / 10",
};

export type Achievement = { title: string; org: string };

export const achievements: Achievement[] = [
  { title: "Rising Star Award", org: "Capgemini India" },
  {
    title: "Best Paper Award",
    org: "35th Indian Engineering Congress — Chemical Engineering",
  },
];
