import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/hero";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Education from "@/components/sections/education";
import Contact from "@/components/sections/contact";
import { useScrollEffect } from "@/hooks/use-scroll";

export default function Portfolio() {
  useScrollEffect();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <footer className="bg-darker py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-xl font-bold gradient-text mb-3 md:mb-0">
              Rhythm Aich
            </div>
            <div className="flex space-x-4 mb-3 md:mb-0 text-sm">
              <a href="#home" className="text-muted-foreground hover:text-accent transition-colors">Home</a>
              <a href="#skills" className="text-muted-foreground hover:text-accent transition-colors">Skills</a>
              <a href="#experience" className="text-muted-foreground hover:text-accent transition-colors">Experience</a>
              <a href="#projects" className="text-muted-foreground hover:text-accent transition-colors">Projects</a>
              <a href="#contact" className="text-muted-foreground hover:text-accent transition-colors">Contact</a>
            </div>
            <div className="flex space-x-4">
              <a href="https://github.com/aichRhythm" className="text-muted-foreground hover:text-accent transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://rhythmaich.dev" className="text-muted-foreground hover:text-accent transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="border-t border-muted mt-6 pt-6 text-center text-muted-foreground">
            <p className="text-sm">&copy; 2024 Rhythm Aich. All rights reserved. Built with React expertise and passion.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
