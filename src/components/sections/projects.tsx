import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
// import GlassCard from "@/components/ui/glass-card";

export default function Projects() {
  const projects = [
    {
      title: "Mobile Banking Application",
      description: "High-performance React Native banking app with custom UI components, native bridging, and 95% test coverage serving major banking clients.",
      technologies: ["React Native", "TypeScript", "Jest", "Firebase"],
      gradient: "from-blue-900 to-blue-600",
      mockup: "banking",
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "Microfrontend architecture dashboard with Redux state management, optimized PostgreSQL queries, and Redis caching for 100+ bank branches.",
      technologies: ["React", "GraphQL", "PostgreSQL", "Redis"],
      gradient: "from-emerald-900 to-emerald-600",
      mockup: "dashboard",
    },
    {
      title: "Customer Service API",
      description: "RESTful API backend for insurance company with Stripe payment integration, SendGrid email services, and MongoDB for dynamic data handling.",
      technologies: ["Node.js", "Express", "MongoDB", "Stripe"],
      gradient: "from-purple-900 to-purple-600",
      mockup: "api",
    },
    {
      title: "Process Automation",
      description: "Designed and evaluated automation solutions for Nestlé's packaging line, achieving 20% throughput increase and 12% labor reduction.",
      technologies: ["Process Design", "Cost Analysis", "Optimization", "Automation"],
      gradient: "from-orange-900 to-orange-600",
      mockup: "automation",
    },
  ];

  const ProjectMockup = ({ type }: { type: string }) => {
    switch (type) {
      case "banking":
        return (
          <div className="h-64 bg-gradient-to-br from-blue-900 to-blue-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 left-4 right-4">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div className="text-white text-sm">Mobile Banking</div>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="bg-white bg-opacity-20 rounded h-16 mb-2"></div>
                <div className="flex space-x-2">
                  <div className="bg-white bg-opacity-20 rounded h-8 flex-1"></div>
                  <div className="bg-white bg-opacity-20 rounded h-8 flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case "dashboard":
        return (
          <div className="h-64 bg-gradient-to-br from-emerald-900 to-emerald-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 left-4 right-4">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-white bg-opacity-20 rounded h-6"></div>
                  <div className="bg-white bg-opacity-20 rounded h-6"></div>
                  <div className="bg-white bg-opacity-20 rounded h-6"></div>
                </div>
                <div className="bg-white bg-opacity-20 rounded h-20 mb-2"></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white bg-opacity-20 rounded h-12"></div>
                  <div className="bg-white bg-opacity-20 rounded h-12"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case "api":
        return (
          <div className="h-64 bg-gradient-to-br from-purple-900 to-purple-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 left-4 right-4">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-white text-sm mb-2">API Endpoints</div>
                <div className="space-y-2">
                  <div className="bg-green-500 bg-opacity-30 rounded px-2 py-1 text-xs">GET /customers</div>
                  <div className="bg-blue-500 bg-opacity-30 rounded px-2 py-1 text-xs">POST /payments</div>
                  <div className="bg-yellow-500 bg-opacity-30 rounded px-2 py-1 text-xs">PUT /tickets</div>
                  <div className="bg-red-500 bg-opacity-30 rounded px-2 py-1 text-xs">DELETE /sessions</div>
                </div>
              </div>
            </div>
          </div>
        );
      case "automation":
        return (
          <div className="h-64 bg-gradient-to-br from-orange-900 to-orange-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 left-4 right-4">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-white text-sm mb-2">Process Optimization</div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full"></div>
                  <div className="flex-1 h-1 bg-white bg-opacity-20 mx-2"></div>
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full"></div>
                  <div className="flex-1 h-1 bg-white bg-opacity-20 mx-2"></div>
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full"></div>
                </div>
                <div className="text-white text-xs">20% Throughput Increase</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-16 bg-card">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text"
        >
          Featured Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl overflow-hidden card-hover"
            >
              <ProjectMockup type={project.mockup} />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-accent">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-secondary px-2 py-1 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent/80 text-xs"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Case Study
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent/80 text-xs"
                  >
                    <Github className="w-3 h-3 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
