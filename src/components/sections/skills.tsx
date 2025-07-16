import { motion } from "framer-motion";
import { Code, Layers, Settings, Database, Smartphone, Cog } from "lucide-react";
import GlassCard from "@/components/ui/glass-card";

export default function Skills() {
  const skillCategories = [
    {
      icon: Code,
      title: "Programming Languages",
      skills: ["TypeScript", "JavaScript", "Python", "Swift", "Kotlin", "SQL", "GraphQL"],
    },
    {
      icon: Layers,
      title: "Frameworks & Libraries",
      skills: ["React", "React Native", "Node.js", "Next.js", "Redux", "Material UI", "TailwindCSS"],
    },
    {
      icon: Settings,
      title: "Tools & DevOps",
      skills: ["Git", "Docker", "Firebase", "CI/CD", "Jest", "Figma", "Kubernetes"],
    },
    {
      icon: Database,
      title: "Databases",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      skills: ["React Native", "iOS", "Android", "Cross-platform", "Native Bridging"],
    },
    {
      icon: Cog,
      title: "Methodologies",
      skills: ["Agile", "TDD", "Microservices", "RESTful APIs", "SOLID"],
    },
  ];

  return (
    <section id="skills" className="py-16 bg-card">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text"
        >
          Technical Skills
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <GlassCard key={category.title} delay={index * 0.1} className="p-6">
                <div className="text-accent text-2xl mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-secondary px-2 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
