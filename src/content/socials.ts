export type SocialIcon = "github" | "linkedin" | "email";

export type Social = {
  label: string;
  href: string;
  icon: SocialIcon;
  handle: string;
  ariaLabel: string;
};

export const socials: Social[] = [
  {
    label: "GitHub",
    href: "https://github.com/aichRhythm",
    icon: "github",
    handle: "aichRhythm",
    ariaLabel: "Rhythm Aich on GitHub",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rhythm-aich/",
    icon: "linkedin",
    handle: "rhythm-aich",
    ariaLabel: "Rhythm Aich on LinkedIn",
  },
  {
    label: "Email",
    href: "mailto:rhythmaich@gmail.com",
    icon: "email",
    handle: "rhythmaich@gmail.com",
    ariaLabel: "Email Rhythm Aich",
  },
];
