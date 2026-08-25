import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Code2, ChevronDown, FileDown, Eye } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { personalInfo } from "@/data/portfolio";

const RESUME_PATH = `${import.meta.env.BASE_URL}resume.pdf`;

const roles = ["Software Engineering Student", "Backend Developer", "Full-Stack Developer", "Problem Solver"];
const techs = ["React", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "Docker", "AWS", "Python", "FastAPI", "Django"];
const repeatedTechs = [...techs, ...techs, ...techs, ...techs]; // Duplicate for smooth infinite loop

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; baseVx: number; baseVy: number; size: number }[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(Math.floor(window.innerWidth * window.innerHeight / 15000), 100);
      for (let i = 0; i < numParticles; i++) {
        const vx = (Math.random() - 0.5) * 0.5;
        const vy = (Math.random() - 0.5) * 0.5;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: vx,
          vy: vy,
          baseVx: vx,
          baseVy: vy,
          size: Math.random() * 2 + 1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(99, 102, 241, 0.5)"; // primary color
      
      particles.forEach((p, index) => {
        // Mouse repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx -= (dx / dist) * force * 0.5;
          p.vy -= (dy / dist) * force * 0.5;
        }

        // Return to base velocity
        p.vx += (p.baseVx - p.vx) * 0.05;
        p.vy += (p.baseVy - p.vy) * 0.05;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - dist2 / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50" />;
}

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 bg-background pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none" 
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-bg.png)` }}
        />
        <ParticleCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-0 pointer-events-none" />
        
        {/* Animated glowing orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-secondary/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col justify-center min-h-[calc(100vh-5rem)]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center flex-1">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="px-4 py-2 rounded-full glass border-primary/30 text-primary text-sm font-medium mb-8 flex items-center gap-2"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              Available for new opportunities
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight mb-4 glitch-wrapper cursor-default">
              Hi, I'm <br />
              <span className="text-gradient glitch-effect" data-text={personalInfo.name}>{personalInfo.name}</span>
            </h1>
            
            <div className="h-12 sm:h-14 mb-6">
              <motion.p 
                key={roleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-2xl sm:text-3xl text-muted-foreground font-light"
              >
                I am a <span className="text-white font-medium">{roles[roleIndex]}</span>
              </motion.p>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
              {personalInfo.shortBio.split('.')[0]}. {personalInfo.shortBio.split('.')[1]}.
            </p>

            <div className="relative z-50 flex flex-wrap items-center gap-4 mb-12 pointer-events-auto">
              <button 
                onClick={() => scrollTo("#projects")}
                className="px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-primary to-secondary text-white neon-glow flex items-center gap-2 group cursor-pointer"
              >
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Resume Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View Resume"
                  className="px-5 py-4 rounded-full font-semibold glass border border-white/20 text-white hover:bg-white/10 flex items-center gap-2 group cursor-pointer transition-all duration-200 hover:border-primary/50"
                >
                  <Eye className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  View Resume
                </a>
                <a
                  href={RESUME_PATH}
                  download="Nirmal_Madhunala_Resume.pdf"
                  aria-label="Download Resume"
                  className="p-4 rounded-full glass border border-white/20 text-white hover:bg-white/10 flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-primary/50 group"
                  title="Download Resume"
                >
                  <FileDown className="w-4 h-4 text-primary group-hover:translate-y-0.5 transition-transform" />
                </a>
              </div>
              
              <div className="flex items-center gap-4 ml-2">
                <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub Profile" className="relative z-50 p-3 rounded-full glass hover:bg-white/10 transition-colors text-white cursor-pointer hover:scale-110">
                  <Github className="w-5 h-5" />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" className="relative z-50 p-3 rounded-full glass hover:bg-white/10 transition-colors text-white cursor-pointer hover:scale-110">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={`mailto:${personalInfo.email}`} aria-label="Send Email" className="relative z-50 p-3 rounded-full glass hover:bg-white/10 transition-colors text-white cursor-pointer hover:scale-110">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:flex justify-center relative"
          >
            <div className="relative w-80 h-80 xl:w-[400px] xl:h-[400px]">
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-primary to-secondary blur-2xl opacity-40 animate-pulse" />
              
              <div className="relative z-10 w-full h-full rounded-[3rem] border-2 border-primary/20 shadow-[0_0_30px_rgba(99,102,241,0.3)] overflow-hidden transform rotate-3 hover:rotate-0 transition-all duration-500 group bg-card/50 backdrop-blur-sm">
                
                {/* 
                  Using the AI-generated 3D character portrait.
                  It natively fits the theme, so we removed the heavy grayscale filters.
                */}
                <img 
                  src={`${import.meta.env.BASE_URL}images/avatar_3d.png`}
                  alt={personalInfo.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700"
                />
              </div>
              
              {/* Floating badges */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-12 glass px-4 py-3 rounded-2xl flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Code2 className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Experience</p>
                  <p className="font-bold text-white">1+ Year</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Marquee and Scroll down */}
        <div className="absolute bottom-0 left-0 w-full pb-8 flex flex-col items-center pointer-events-none">
          <div className="w-full overflow-hidden mb-12 relative flex pointer-events-none">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex animate-marquee whitespace-nowrap gap-12 w-[200%]">
              {repeatedTechs.map((tech, i) => (
                <span key={i} className="text-2xl font-bold text-white/10 uppercase tracking-wider">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer"
            onClick={() => scrollTo("#about")}
          >
            <ChevronDown className="w-8 h-8 text-white/50 hover:text-white transition-colors" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
