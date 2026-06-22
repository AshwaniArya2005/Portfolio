"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { skills, skillCategories, type SkillCategory } from "@/data/skills";
import { cn } from "@/lib/utils";

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("Languages");
  const filtered = skills.filter((s) => s.category === activeCategory);

  return (
    <SectionWrapper
      id="skills"
      label="Tech Stack"
      title="Skills & Technologies"
      subtitle="Tools and technologies I use to bring ideas to life."
      className="relative overflow-hidden"
    >
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, var(--gold-glow) 0%, transparent 100%)",
        }}
      />

      {/* Category tabs */}
      <div className="relative z-10 flex flex-wrap justify-center gap-2 mb-12">
        {skillCategories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-5 py-2 rounded-full text-sm font-medium overflow-hidden transition-colors duration-200"
            style={{
              background: activeCategory === cat ? "var(--gold-glow)" : "var(--surface)",
              color: activeCategory === cat ? "var(--gold-light)" : "var(--text-secondary)",
              border: activeCategory === cat
                ? "1px solid var(--border-strong)"
                : "1px solid var(--border)",
            }}
          >
            {activeCategory === cat && (
              <motion.div
                layoutId="skill-tab-bg"
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--gold-glow)" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </motion.button>
        ))}
      </div>

      {/* Skills grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 flex flex-wrap justify-center gap-6 sm:gap-8"
        >
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.045, type: "spring", stiffness: 320, damping: 20 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl w-[calc(50%-0.75rem)] sm:w-[170px] lg:w-[190px]"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              {/* Glow overlay on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 1px ${skill.color || "#7c3aed"}40`,
                  background: `radial-gradient(circle at 50% 0%, ${skill.color || "#7c3aed"}18, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <motion.span
                className="text-4xl z-10"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                transition={{ duration: 0.4 }}
              >
                {skill.icon}
              </motion.span>

              {/* Name */}
              <span
                className="text-sm font-semibold text-center z-10"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
              >
                {skill.name}
              </span>

              {/* Proficiency bar */}
              <div className="w-full z-10">
                <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.9, delay: i * 0.045 + 0.2, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: skill.color
                        ? `linear-gradient(90deg, ${skill.color}80, ${skill.color})`
                        : "var(--gradient-brand)",
                    }}
                  />
                </div>
              </div>

              {/* Level tooltip */}
              <div
                className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {skill.level}%
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Category count summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 flex flex-wrap justify-center gap-6"
      >
        {skillCategories.map((cat) => {
          const count = skills.filter((s) => s.category === cat).length;
          return (
            <div key={cat} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--gradient-brand)" }}
              />
              <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                {cat}{" "}
                <span style={{ color: "var(--text-secondary)" }}>({count})</span>
              </span>
            </div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
