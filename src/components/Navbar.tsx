import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, FileDown } from "lucide-react";

const RESUME_PATH = `${import.meta.env.BASE_URL}resume.pdf`;

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active section detection
      const sections = navItems.map((item) => item.href.substring(1));
      let current = sections[0];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 200)) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4 glass border-b border-white/10" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => scrollTo("#hero")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow">
              <Code2 className="text-white w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-display font-bold text-xl tracking-wide hidden sm:block">
              Nirmal<span className="text-primary">.dev</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.href)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSection === item.href.substring(1)
                    ? "text-white"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noreferrer"
              aria-label="View and Download Resume"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold border border-primary/40 text-primary hover:bg-primary/10 transition-all duration-200 text-sm"
            >
              <FileDown className="w-4 h-4" />
              Resume
            </a>
            <button 
              onClick={() => scrollTo("#contact")}
              className="px-6 py-2.5 rounded-full font-semibold bg-white text-black hover:scale-105 transition-transform"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            aria-label={mobileMenuOpen ? "Close Mobile Menu" : "Open Mobile Menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 text-muted-foreground hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 absolute top-full left-0 w-full overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollTo(item.href)}
                  className={`px-4 py-3 rounded-xl text-left font-medium ${
                    activeSection === item.href.substring(1)
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              {/* Resume in mobile menu */}
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-xl text-left font-medium text-primary bg-primary/10 flex items-center gap-2"
              >
                <FileDown className="w-4 h-4" />
                View / Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
