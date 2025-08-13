import { motion } from "framer-motion";
import { ChevronDown, FolderOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedText from "@/components/ui/animated-text";

export default function Hero() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-success rounded-full blur-3xl"
        />
      </div>
      
      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="block text-muted-foreground">Hello, I'm</span>
            <span className="gradient-text">Rhythm Aich</span>
          </h1>
          <div className="text-lg md:text-xl text-muted-foreground mb-8 h-6">
            <span>React & React Native Developer</span>
          </div>
          <AnimatedText
            text="Specialized in building scalable, high-performance applications for banking, insurance, and financial services. Creating robust solutions that enhance user experience and streamline business operations."
            className="text-md text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
            delay={0.3}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => handleNavClick("#projects")}
              className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              View Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleNavClick("#contact")}
              className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
