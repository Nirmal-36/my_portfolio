import { motion } from "framer-motion";
import { SectionWrapper } from "../SectionWrapper";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { skillsCategories } from "@/data/portfolio";

function AnimatedProgress({ name, percentage, delay }: { name: string; percentage: number; delay: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const duration = 1500;
      const steps = 60;
      const stepTime = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setCount(Math.min(Math.round(percentage * easeOutQuart), percentage));

        if (currentStep >= steps) clearInterval(timer);
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, percentage]);

  return (
    <div ref={ref} className="mb-6 last:mb-0">
      <div className="flex justify-between mb-2">
        <span className="text-white font-medium">{name}</span>
        <span className="text-primary font-display font-bold">{count}%</span>
      </div>
      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, delay: delay, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_10px_rgba(99,102,241,0.6)] relative"
        >
          <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/30 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <SectionWrapper id="skills" title="Skills & Arsenal" subtitle="What I work with">
      <div className="grid md:grid-cols-2 gap-8">
        {skillsCategories.map((category, idx) => (
          <motion.div 
            key={category.category} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6 md:p-8 rounded-3xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-white/5 text-white flex items-center justify-center border border-white/10">
                <category.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white tracking-tight">{category.category}</h3>
            </div>
            <div>
              {category.skills.map((skill, skillIdx) => (
                <AnimatedProgress 
                  key={skill.name} 
                  name={skill.name} 
                  percentage={skill.level} 
                  delay={(idx * 0.2) + (skillIdx * 0.1)} 
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
