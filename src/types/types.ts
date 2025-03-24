import { RefObject } from "react";

export interface SidebarProps {
  scrollToSection: (ref: RefObject<HTMLDivElement | null>) => void;
  sectionRefs: {
    aboutRef: RefObject<HTMLDivElement | null>;
    skillsRef: RefObject<HTMLDivElement | null>;
    experienceRef: RefObject<HTMLDivElement | null>;
    projectsRef: RefObject<HTMLDivElement | null>;
    educationRef: RefObject<HTMLDivElement | null>;
    researchRef: RefObject<HTMLDivElement | null>;
    interestsRef: RefObject<HTMLDivElement | null>;
    contactRef: RefObject<HTMLDivElement | null>;
  };
}

export interface MainContentProps {
  sectionRefs: {
    aboutRef: RefObject<HTMLDivElement | null>;
    skillsRef: RefObject<HTMLDivElement | null>;
    experienceRef: RefObject<HTMLDivElement | null>;
    projectsRef: RefObject<HTMLDivElement | null>;
    educationRef: RefObject<HTMLDivElement | null>;
    researchRef: RefObject<HTMLDivElement | null>;
    interestsRef: RefObject<HTMLDivElement | null>;
    contactRef: RefObject<HTMLDivElement | null>;
  };
  scrollWidth: number;
}

export interface ScrollProgressBarProps {
  scrollWidth: number;
}
