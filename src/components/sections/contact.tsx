import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Globe, Linkedin, FileUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import GlassCard from "@/components/ui/glass-card";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast({
          title: "Error sending message",
          description: data.error || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-card">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text"
        >
          Let's Work Together
        </motion.h2>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground mb-6"
            >
              Ready to build something amazing? Let's discuss your next project and create
              exceptional user experiences together.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold mb-4 text-accent">Get In Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="text-accent text-lg mr-3" />
                  <div>
                    <p className="text-foreground text-sm">Email</p>
                    <a href="mailto:rhythmaich@gmail.com" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                      rhythmaich@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="text-accent text-lg mr-3" />
                  <div>
                    <p className="text-foreground text-sm">Phone</p>
                    <a href="tel:+918016919157" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                      +91-8016919157
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-accent text-lg mr-3" />
                  <div>
                    <p className="text-foreground text-sm">Location</p>
                    <p className="text-muted-foreground text-sm">Pune, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-md font-semibold mb-4 text-foreground">Follow Me</h4>
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
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-4 text-foreground">My Resume</h4>
                <div className="flex space-x-8">
                  <a href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                    <FileUser className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </GlassCard>

            {/* Contact Form */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold mb-4 text-accent">Send Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-foreground text-sm">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground text-sm">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-foreground text-sm">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project collaboration"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-foreground text-sm">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    className="mt-1 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
