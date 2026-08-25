import { Github, Linkedin, Twitter } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-center md:text-left">
            <span className="font-display font-bold text-2xl tracking-wide">
              {personalInfo.name.split(' ')[0]}<span className="text-primary">.dev</span>
            </span>
            <p className="text-muted-foreground mt-2 text-sm">
              Building scalable digital experiences that matter.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub Profile" className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <p>Designed & Built with <span className="text-red-500">♥</span> using React & Tailwind</p>

        </div>
      </div>
    </footer>
  );
}
