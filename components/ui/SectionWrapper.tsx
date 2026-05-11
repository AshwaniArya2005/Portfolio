"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  centered?: boolean;
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function SectionWrapper({
  id,
  children,
  className,
  style,
  containerClassName,
  label,
  title,
  subtitle,
  centered = true,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("section-padding", className)} style={style}>
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", containerClassName)}>
        {/* Section header */}
        {(label || title || subtitle) && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className={cn("mb-16", centered && "text-center")}
          >
            {/* Label */}
            {label && (
              <motion.div
                variants={itemVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-4"
              >
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                  style={{
                    background: "rgba(124, 58, 237, 0.1)",
                    color: "var(--violet-light)",
                    border: "1px solid rgba(124, 58, 237, 0.2)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--violet-light)" }}
                  />
                  {label}
                </span>
              </motion.div>
            )}

            {/* Title */}
            {title && (
              <motion.h2
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {title}
              </motion.h2>
            )}

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-lg max-w-2xl mx-auto"
                style={{ color: "var(--text-secondary)" }}
              >
                {subtitle}
              </motion.p>
            )}

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={cn("mt-6", centered && "flex justify-center")}
            >
              <div
                className="h-1 w-16 rounded-full"
                style={{
                  background: "linear-gradient(90deg, var(--violet), var(--cyan))",
                }}
              />
            </motion.div>
          </motion.div>
        )}

        {children}
      </div>
    </section>
  );
}
