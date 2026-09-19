export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML5", "CSS3"],
  },
  {
    label: "Frontend",
    items: [
      "React.js",
      "React Native",
      "Next.js",
      "Redux Toolkit",
      "React Context",
      "Material UI",
      "TailwindCSS",
      "Styled Components",
    ],
  },
  {
    label: "Backend",
    items: ["FastAPI", "Node.js", "Express.js", "REST APIs"],
  },
  {
    label: "Cloud & DevOps",
    items: ["Azure App Services", "Docker", "Kubernetes", "GitHub Actions"],
  },
  {
    label: "Auth",
    items: ["Okta", "JWT"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    label: "Testing",
    items: ["Jest", "React Testing Library", "Enzyme", "PyTest"],
  },
  {
    label: "Tools",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "Swagger",
      "Jira",
      "Confluence",
      "Figma",
    ],
  },
];
