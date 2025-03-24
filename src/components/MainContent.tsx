import ScrollProgressBar from "./ScrollPorgressBar";
import { MainContentProps } from "@/types/types";

export default function MainContent({
  sectionRefs,
  scrollWidth,
}: MainContentProps) {
  return (
    <div className="flex-1 p-10">
      <ScrollProgressBar scrollWidth={scrollWidth} />

      <section ref={sectionRefs.aboutRef} id="about" className="mb-16">
        <h2 className="text-3xl font-bold">About Me</h2>
        <p className="mt-4">
          I am a passionate software developer with a strong background in web
          development and a keen interest in creating efficient and scalable
          applications. I enjoy learning new technologies and continuously
          improving my skills.
        </p>
      </section>

      <section ref={sectionRefs.skillsRef} id="skills" className="mb-16">
        <h2 className="text-3xl font-bold">Skills</h2>
        <p className="mt-4">some skills</p>
      </section>

      <section
        ref={sectionRefs.experienceRef}
        id="experience"
        className="mb-16"
      >
        <h2 className="text-3xl font-bold">Experience</h2>
        <p className="mt-4">
          I have worked at several tech companies where I contributed to various
          projects, ranging from small startups to large enterprises. My roles
          have included full-stack development, front-end engineering, and
          back-end services.
        </p>
      </section>

      <section ref={sectionRefs.projectsRef} id="projects" className="mb-16">
        <h2 className="text-3xl font-bold">Projects</h2>
        <p className="mt-4">Here are some of the projects I have worked on:</p>
        <ul className="list-disc ml-6 mt-2">
          <li>
            <strong>Project A:</strong> A web application for managing tasks and
            projects, built with React and Node.js.
          </li>
          <li>
            <strong>Project B:</strong> An e-commerce platform with a custom
            CMS, developed using Django and React.
          </li>
          <li>
            <strong>Project C:</strong> A mobile app for tracking fitness
            activities, created with React Native and Firebase.
          </li>
        </ul>
      </section>

      <section ref={sectionRefs.educationRef} id="education" className="mb-16">
        <h2 className="text-3xl font-bold">Education</h2>
        <p className="mt-4">
          I hold a Bachelor's degree in Computer Science from XYZ University,
          where I graduated with honors. During my studies, I focused on
          software engineering, algorithms, and data structures.
        </p>
      </section>

      <section ref={sectionRefs.researchRef} id="research" className="mb-16">
        <h2 className="text-3xl font-bold">Research</h2>
        <p className="mt-4">
          My research interests include machine learning, artificial
          intelligence, and data science. I have published several papers on
          these topics and have presented my work at various conferences.
        </p>
      </section>

      <section ref={sectionRefs.interestsRef} id="interests" className="mb-16">
        <h2 className="text-3xl font-bold">Interests</h2>
        <p className="mt-4">
          In my free time, I enjoy hiking, reading books on technology and
          science, and experimenting with new programming languages and
          frameworks. I am also an avid open-source contributor.
        </p>
      </section>

      <section ref={sectionRefs.contactRef} id="interests" className="mb-16">
        <h2 className="text-3xl font-bold">Contact</h2>
        <p className="mt-4">Contacts</p>
      </section>
    </div>
  );
}
