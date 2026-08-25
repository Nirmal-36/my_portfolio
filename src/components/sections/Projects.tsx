import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../SectionWrapper";
import { ExternalLink, Github } from "lucide-react";
import React, { useState, useRef } from "react";
import { projectsData, personalInfo } from "@/data/portfolio";

const projects = projectsData.map((p, i) => ({
  id: i + 1,
  title: p.title,
  description: p.description,
  tags: p.tech,
  image: p.image,
  links: { github: p.githubUrl, live: p.demoUrl }
}));

function ProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shine, setShine] = useState({ x: 0, y: 0, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const maxTilt = 15;
    const tiltX = -((y - centerY) / centerY) * maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(tiltX);
    setRotateY(tiltY);
    setShine({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShine(s => ({ ...s, opacity: 0 }));
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ perspective: 1000 }}
      className="relative h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
        style={{ transformStyle: "preserve-3d" }}
        className="group relative h-full rounded-3xl overflow-hidden glass border border-white/10 bg-card cursor-pointer"
      >
        {/* Shine effect */}
        <div 
          className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay transition-opacity duration-300"
          style={{ 
            opacity: shine.opacity,
            background: `radial-gradient(circle at ${shine.x}px ${shine.y}px, rgba(255,255,255,0.4) 0%, transparent 60%)` 
          }}
        />

        {/* Image Container */}
        <div className="relative h-52 overflow-hidden bg-card flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-md z-30 p-6 flex flex-col justify-end border-t border-primary/50"
            >
              <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-6">{project.description}</p>
              
              {/* Tags */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {project.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/20">
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Links */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 pt-4 border-t border-white/10"
              >
                <a href={project.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors">
                  <Github className="w-5 h-5" /> Code
                </a>
                <a href={project.links.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors ml-auto px-4 py-2 rounded-full bg-primary/20 hover:bg-primary/40">
                  Live Demo <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <SectionWrapper id="projects" title="Featured Projects" subtitle="My recent work">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <a 
          href={personalInfo.github}
          target="_blank"
          rel="noreferrer"
          aria-label="View more projects on my GitHub Profile"
          className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-colors font-medium text-white inline-flex items-center gap-2 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] focus:outline-none focus:ring-2 focus:ring-primary"
        >
          View More on GitHub <Github className="w-4 h-4" />
        </a>
      </div>
    </SectionWrapper>
  );
}
