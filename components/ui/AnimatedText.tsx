"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  variant?: "word" | "char" | "line";
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: React.ElementType;
}

export function AnimatedText({
  text,
  className,
  variant = "word",
  delay = 0,
  stagger = 0.05,
  once = true,
}: AnimatedTextProps) {
  if (variant === "word") {
    const words = text.split(" ");
    return (
      <span className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once }}
            transition={{ duration: 0.5, ease: "easeOut", delay: delay + i * stagger }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
  }

  if (variant === "char") {
    const chars = text.split("");
    return (
      <span
        className={cn("inline-flex overflow-hidden", className)}
        style={{ perspective: "1000px" }}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 50, rotateX: -90 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once }}
            transition={{ duration: 0.4, ease: "easeOut", delay: delay + i * stagger }}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    );
  }

  // line variant
  return (
    <motion.span
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {text}
    </motion.span>
  );
}
