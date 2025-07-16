import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import GlassCard from "@/components/ui/glass-card";

export default function Experience() {
  const experiences = [
    {
      title: "Associate Consultant",
      company: "Capgemini India",
      period: "October 2022 – Present",
      location: "Pune, India",
      projects: [
        {
          name: "Mobile Banking Application",
          technologies: "React Native, Jest, GitHub Actions",
          achievements: [
            "Designed and developed high-performance, reusable UI components using TypeScript and React Native for major banking client",
            "Implemented React Native bridging for backend utilities including logger, push notifications, and QR scanner",
            "Achieved 95% test coverage with Jest and React Testing Library",
            "Optimized performance achieving 30% reduction in load time and 20% improvement in memory usage",
          ],
        },
        {
          name: "Real-time Banking Analytics Dashboard",
          technologies: "React, GraphQL, PostgreSQL, Redis",
          achievements: [
            "Developed microfrontend architecture enabling independent development and deployment",
            "Centralized state management using Redux Toolkit across microfrontends",
            "Optimized PostgreSQL queries for 100+ bank branches with Redis caching",
          ],
        },
      ],
    },
    {
      title: "Internship Trainee",
      company: "Capgemini India",
      period: "February 2022 – April 2022",
      location: "Pune, India",
      projects: [
        {
          name: "API layer of Customer Service Application",
          technologies: "Express, Node.js, MongoDB, Stripe, SendGrid",
          achievements: [
            "Built and maintained RESTful APIs for insurance company customer service",
            "Integrated Stripe for payment processing and SendGrid for email communication",
            "Utilized MongoDB for dynamic, schema-less data handling",
          ],
        },
      ],
    },
    {
      title: "Production Intern",
      company: "Nestlé India",
      period: "April 2021 – May 2021",
      location: "Goa, India",
      projects: [
        {
          name: "Automation of Product Packaging Line",
          technologies: "Microsoft Excel, Microsoft PowerPoint",
          achievements: [
            "Designed automation solutions projected to increase throughput by 20%",
            "Developed cost model estimating $200,000+ project costs",
            "Reduced labor needs by 12% through optimized staffing model",
          ],
        },
      ],
    },
  ];

  return (
    <section id="experience" className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text"
        >
          Experience
        </motion.h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-accent"></div>
            
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative mb-8"
              >
                <div className="absolute left-6 w-4 h-4 bg-accent rounded-full border-4 border-background"></div>
                <div className="ml-20">
                  <GlassCard className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-bold text-accent">{experience.title}</h3>
                      <span className="text-muted-foreground text-sm">{experience.period}</span>
                    </div>
                    <h4 className="text-lg text-success mb-2">{experience.company}</h4>
                    <p className="text-muted-foreground mb-4 text-sm">{experience.location}</p>
                    
                    <div className="space-y-4">
                      {experience.projects.map((project, projectIndex) => (
                        <div key={projectIndex} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-md font-semibold mb-2 text-foreground">{project.name}</h5>
                            <p className="text-muted-foreground mb-3 text-sm">{project.technologies}</p>
                          </div>
                          <ul className="space-y-2 text-muted-foreground">
                            {project.achievements.map((achievement, achievementIndex) => (
                              <li key={achievementIndex} className="flex items-start text-sm">
                                <CheckCircle className="w-3 h-3 text-success mr-2 mt-1 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
