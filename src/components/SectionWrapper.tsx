import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function SectionWrapper({ id, children, className = "", title, subtitle }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-24 md:py-32 relative ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
          >
            {subtitle && (
              <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                {title}
              </h2>
            )}
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full" />
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
