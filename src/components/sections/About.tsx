import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "../SectionWrapper";
import { Terminal, Lightbulb, Rocket, Coffee } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { personalInfo, stats } from "@/data/portfolio";

const traits = [
  {
    icon: <Terminal className="w-6 h-6 text-primary" />,
    title: "Clean Code",
    description: "I write maintainable, scalable, and well-documented code following best practices."
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-secondary" />,
    title: "Problem Solver",
    description: "I love tackling complex architectural challenges and finding elegant solutions."
  },
  {
    icon: <Rocket className="w-6 h-6 text-accent" />,
    title: "Performance First",
    description: "Optimization is not an afterthought. I build fast, responsive applications."
  },
  {
    icon: <Coffee className="w-6 h-6 text-orange-400" />,
    title: "Continuous Learner",
    description: "Technology moves fast. I stay fueled by coffee and a passion for new tools."
  }
];

function AnimatedStat({ value, suffix, label }: { value: number, suffix: string, label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        let targetValue = value;
        let animatedValue = targetValue * easeOutQuart;
        
        // Handle floats like 9.95
        if (value % 1 !== 0) {
          setCount(Number(animatedValue.toFixed(2)));
        } else {
          setCount(Math.min(Math.round(animatedValue), value));
        }

        if (currentStep >= steps) {
          setCount(value);
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref}>
      <p className="text-4xl sm:text-5xl font-display font-bold text-white mb-1 tracking-tight">
        {count}{suffix}
      </p>
      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
}

export function About() {
  return (
    <SectionWrapper id="about" title="About Me" subtitle="Get to know me">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6 text-muted-foreground text-lg leading-relaxed"
        >
          <p>
            {personalInfo.shortBio}
          </p>
          <p>
            My main areas of expertise include <span className="text-primary font-medium">React, Node.js, Python, and scalable cloud architectures (AWS, Docker)</span>. I enjoy bridging the gap between optimal backend architectures and robust APIs.
          </p>
          
          <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const numMatch = stat.value.match(/[\d.]+/);
              const num = numMatch ? parseFloat(numMatch[0]) : 0;
              const suffix = stat.value.replace(/[\d.]+/g, '');
              return (
                <AnimatedStat key={idx} value={num} suffix={suffix} label={stat.label} />
              );
            })}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {traits.map((trait, index) => (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl group hover:-translate-y-1 transition-transform"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {trait.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{trait.title}</h3>
              <p className="text-sm text-muted-foreground">{trait.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}
