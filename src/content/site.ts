export const site = {
  name: "Rhythm Aich",
  initials: "RA",
  role: "Frontend-focused Fullstack Developer",
  location: "Bengaluru, India",
  timeZone: "Asia/Kolkata",
  email: "rhythmaich@gmail.com",
  url: "https://rhythmaich.dev",
  resume: "/resume.pdf",
  availability: "Open to select work",
  positioning:
    "I build fast, accessible product interfaces — and the systems that hold them up.",
  credential: "// frontend-focused fullstack developer",
  meta: {
    title: "Rhythm Aich — Frontend-focused Fullstack Developer",
    description:
      "Frontend-focused fullstack developer in Bengaluru. React, React Native, TypeScript, and the backends that hold them up.",
  },
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Off the Clock", href: "#off-the-clock" },
  { label: "Contact", href: "#contact" },
];

export const footerLinks: NavLink[] = [
  { label: "Selected Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#skills" },
  { label: "Off the Clock", href: "#off-the-clock" },
  { label: "Contact", href: "#contact" },
];
