import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/hero";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Education from "@/components/sections/education";
import Contact from "@/components/sections/contact";
import { useScrollEffect } from "@/hooks/use-scroll";
import { Github, Globe, Linkedin } from "lucide-react";

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
            <div className="flex space-x-8">
              <a href="https://github.com/aichRhythm"
                    className="text-muted-foreground hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/rhythm-aich/"
                    className="text-muted-foreground hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://rhythmaich.dev" className="text-muted-foreground hover:text-accent transition-colors">
                    <Globe className="w-5 h-5" />
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
