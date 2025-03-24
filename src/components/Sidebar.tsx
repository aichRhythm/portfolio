import { SidebarProps } from "@/types/types";

export default function Sidebar({
  scrollToSection,
  sectionRefs,
}: SidebarProps) {
  return (
    <div className="w-xl h-screen p-6 bg-white shadow-md sticky top-0">
      <h1 className="text-xl font-bold mb-4">My Portfolio</h1>
      <nav>
        <ul>
          <li
            className="mb-2 cursor-pointer"
            onClick={() => scrollToSection(sectionRefs.aboutRef)}
          >
            About
          </li>
          <li
            className="mb-2 cursor-pointer"
            onClick={() => scrollToSection(sectionRefs.skillsRef)}
          >
            Skills
          </li>
          <li
            className="mb-2 cursor-pointer"
            onClick={() => scrollToSection(sectionRefs.experienceRef)}
          >
            Experience
          </li>
          <li
            className="mb-2 cursor-pointer"
            onClick={() => scrollToSection(sectionRefs.projectsRef)}
          >
            Projects
          </li>
          <li
            className="mb-2 cursor-pointer"
            onClick={() => scrollToSection(sectionRefs.educationRef)}
          >
            Education
          </li>
          <li
            className="mb-2 cursor-pointer"
            onClick={() => scrollToSection(sectionRefs.researchRef)}
          >
            Research
          </li>
          <li
            className="mb-2 cursor-pointer"
            onClick={() => scrollToSection(sectionRefs.interestsRef)}
          >
            Interests
          </li>
          <li
            className="cursor-pointer"
            onClick={() => scrollToSection(sectionRefs.contactRef)}
          >
            Contact
          </li>
        </ul>
      </nav>
    </div>
  );
}
