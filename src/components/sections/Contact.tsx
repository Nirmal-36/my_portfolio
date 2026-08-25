import { motion, useSpring } from "framer-motion";
import { SectionWrapper } from "../SectionWrapper";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { personalInfo } from "@/data/portfolio";

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const springX = useSpring(0, { stiffness: 300, damping: 20 });
  const springY = useSpring(0, { stiffness: 300, damping: 20 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
    ).then(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      formRef.current?.reset();
    }).catch((err) => {
      setIsSubmitting(false);
      toast({
        title: "Error sending message",
        description: "Please check your EmailJS configuration or try again later.",
        variant: "destructive"
      });
      console.error("EmailJS Error:", err);
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Magnetic pull strength (0-1)
    const pull = 0.3;
    springX.set(x * pull);
    springY.set(y * pull);
  };

  const handleMouseLeave = () => {
    springX.set(0);
    springY.set(0);
  };

  return (
    <SectionWrapper id="contact" title="Get In Touch" subtitle="Let's build something">
      <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
        
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="lg:col-span-2 space-y-8"
        >
          <div>
            <h3 className="text-3xl font-display font-bold text-white mb-4">Let's talk about your next project.</h3>
            <p className="text-muted-foreground">
              Currently accepting new freelance projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-white font-medium">{personalInfo.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-white font-medium">{personalInfo.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-white font-medium">{personalInfo.phone}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="lg:col-span-3 glass-card p-8 rounded-3xl"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Your Name</label>
                <input 
                  required
                  type="text" 
                  name="user_name"
                  placeholder="John Doe"
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Your Email</label>
                <input 
                  required
                  type="email" 
                  name="user_email"
                  placeholder="john@example.com"
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Subject</label>
              <input 
                required
                type="text" 
                name="subject"
                placeholder="Project Inquiry"
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Message</label>
              <textarea 
                required
                rows={5}
                name="message"
                placeholder="Tell me about your project..."
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              ></textarea>
            </div>

            <motion.button 
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ x: springX, y: springY }}
              disabled={isSubmitting}
              type="submit"
              className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-shadow flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>Send Message <Send className="w-4 h-4" /></>
              )}
            </motion.button>
          </form>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
