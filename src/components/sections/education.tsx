import { motion } from "framer-motion";
import { GraduationCap, Trophy, BookOpen } from "lucide-react";
import GlassCard from "@/components/ui/glass-card";

export default function Education() {
  return (
    <section id="education" className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text"
        >
          Education & Achievements
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Education */}
          <GlassCard className="p-6">
            <div className="text-accent text-3xl mb-4">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Education</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-accent pl-3">
                <h4 className="text-lg font-semibold text-foreground">Bachelor of Technology</h4>
                <p className="text-success text-sm">Chemical Engineering</p>
                <p className="text-muted-foreground text-sm">National Institute of Technology, Durgapur</p>
                <p className="text-muted-foreground text-sm">June 2018 – June 2022</p>
                <p className="text-foreground mt-2 text-sm">CGPA: 7.62</p>
              </div>
            </div>
          </GlassCard>

          {/* Achievements */}
          <GlassCard className="p-6">
            <div className="text-accent text-3xl mb-4">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Achievements</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-success pl-3">
                <h4 className="text-md font-semibold text-foreground">Rising Star Award</h4>
                <p className="text-success text-sm">Capgemini India 2023</p>
                <p className="text-muted-foreground text-xs">Outstanding performance in H2-2023</p>
              </div>
              <div className="border-l-4 border-success pl-3">
                <h4 className="text-md font-semibold text-foreground">Best Paper Award</h4>
                <p className="text-success text-sm">35th Indian Engineering Congress 2020</p>
                <p className="text-muted-foreground text-xs">Chemical Engineering Division</p>
              </div>
            </div>
          </GlassCard>

          {/* Publications */}
          <GlassCard className="p-6">
            <div className="text-accent text-3xl mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Publications</h3>
            <div className="border-l-4 border-accent pl-3">
              <h4 className="text-md font-semibold text-foreground">HDPE Reactor Optimization Using AI</h4>
              <p className="text-success text-sm">Journal of Interdisciplinary Research 2021</p>
              <p className="text-muted-foreground text-xs">Published by Taylor and Francis Group</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
