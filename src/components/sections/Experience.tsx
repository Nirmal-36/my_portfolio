import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../SectionWrapper";
import { Briefcase, GraduationCap, ChevronDown } from "lucide-react";
import { useState } from "react";
import { experienceTimeline } from "@/data/portfolio";

// Keep the newest entries at the top of the timeline. Dates may be ranges
// (for example, "2023 - Present") or labels such as "2026 (Expected)".
const getStartYear = (period: string) => {
  const year = period.match(/\d{4}/)?.[0];
  return year ? Number(year) : 0;
};

const experiences = experienceTimeline
  .map((exp, i) => ({
    id: i + 1,
    role: exp.title,
    company: exp.organization,
    period: exp.date,
    description: exp.description,
    icon: <exp.icon className="w-5 h-5 text-white" />
  }))
  .sort((a, b) => getStartYear(b.period) - getStartYear(a.period));

export function Experience() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <SectionWrapper id="experience" title="Experience" subtitle="My journey so far">
      <div className="relative max-w-4xl mx-auto py-10">
        {/* Animated Center Line */}
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent md:-translate-x-1/2 origin-top"
        />

        <div className="space-y-8">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            const isExpanded = expandedId === exp.id;
            
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-4 md:left-1/2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center -translate-x-1/2 mt-1.5 md:mt-0 z-10 transition-shadow duration-500 ${isExpanded ? 'shadow-[0_0_20px_rgba(99,102,241,0.8)] bg-primary/20' : 'shadow-[0_0_10px_rgba(99,102,241,0.3)]'}`}>
                  {exp.icon}
                </div>

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? "md:pl-12" : "md:pr-12"}`}>
                  <button 
                    onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details for ${exp.role} at ${exp.company}`}
                    aria-expanded={isExpanded}
                    className={`text-left w-full glass-card p-6 md:p-8 rounded-3xl relative cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${isExpanded ? 'border-primary/50 bg-card/80' : ''}`}
                  >
                    {/* Arrow pointing to timeline */}
                    <div className={`hidden md:block absolute top-8 w-4 h-4 bg-card border-t border-r border-white/10 ${
                      isEven ? "left-0 -translate-x-2 -rotate-[135deg]" : "right-0 translate-x-2 rotate-45"
                    } ${isExpanded ? 'border-primary/50' : ''}`} />
                    
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">
                        {exp.period}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="text-muted-foreground p-1 rounded-full hover:bg-white/10 transition-colors"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <p className="text-secondary font-medium">{exp.company}</p>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-muted-foreground text-sm leading-relaxed pt-4 border-t border-white/10">
                            {exp.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}