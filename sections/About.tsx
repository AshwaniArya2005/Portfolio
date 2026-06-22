"use client";

import { motion } from "framer-motion";
import { Binary, Brain, Layers, Lightbulb, Code2, Award, Trophy, Star } from "lucide-react";
import { SectionWrapper, containerVariants, itemVariants } from "@/components/ui/SectionWrapper";
import { GlowCard } from "@/components/ui/GlowCard";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { achievements, focusAreas } from "@/data/achievements";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Binary, Brain, Layers, Lightbulb, Code2, Award, Trophy, Star,
};

function StatCounter({ achievement }: { achievement: typeof achievements[0] }) {
  const { count, ref } = useAnimatedCounter(achievement.value, 2000);
  const Icon = iconMap[achievement.icon] || Star;

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      variants={itemVariants}
      className="h-full"
    >
      <GlowCard
        className="p-6 text-center h-full flex flex-col justify-center"
        glowColor={`${achievement.color}30`}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
          style={{ background: `${achievement.color}20`, color: achievement.color }}
        >
          <Icon size={20} />
        </div>
        <div
          className="text-3xl font-bold mb-1"
          style={{ fontFamily: "var(--font-heading)", color: achievement.color }}
        >
          {achievement.prefix}{count}{achievement.suffix}
        </div>
        <div className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
          {achievement.label}
        </div>
        {achievement.description && (
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
            {achievement.description}
          </div>
        )}
      </GlowCard>
    </motion.div>
  );
}

export function About() {
  return (
    <SectionWrapper
      id="about"
      label="About Me"
      title="The Story So Far"
      subtitle="A CS student building at the intersection of algorithms, intelligence, and great products."
      className="relative"
    >
      {/* Main bento grid */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left: Story */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6"
        >
          <motion.div
            variants={itemVariants}
            className="rounded-2xl p-8"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Availability badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium" style={{ color: "#10b981", fontFamily: "var(--font-mono)" }}>
                {personal.availability}
              </span>
            </div>

            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              I&apos;m a passionate Computer Science student with a deep love for{" "}
              <span className="font-semibold" style={{ color: "var(--gold-light)" }}>
                competitive programming
              </span>
              ,{" "}
              <span className="font-semibold" style={{ color: "var(--copper)" }}>
                machine learning research
              </span>
              , and{" "}
              <span className="font-semibold" style={{ color: "var(--text-accent)" }}>
                full-stack development
              </span>
              . I believe great software lives at the intersection of elegant
              algorithms and beautiful interfaces.
            </p>

            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              When I&apos;m not building web applications, I am actively diving into the field of Data Science. I love analyzing datasets, building predictive models, and uncovering actionable insights from raw data. I thrive on complexity and find joy in making intelligent systems simple for end users.
            </p>

            {/* Tech interests */}
            <div className="mt-8 flex flex-wrap gap-2">
              {["Java", "Python", "React.js", "Node.js", "MongoDB", "Express", "Three.js", "Data Science","AI/ML"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "var(--gold-glow)",
                      color: "var(--gold-light)",
                      border: "1px solid var(--border-strong)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Focus areas grid */}
          <div className="grid grid-cols-2 gap-4">
            {focusAreas.map((area, i) => {
              const Icon = iconMap[area.icon] || Star;
              return (
                <motion.div
                  key={area.id}
                  variants={itemVariants}
                  custom={i}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={cn("p-5 rounded-2xl bg-gradient-to-br", area.gradient)}
                  style={{ border: "1px solid var(--border)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                    style={{
                      background: "var(--surface)",
                      color: "var(--gold-light)",
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <h3
                    className="text-sm font-bold mb-1.5"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                  >
                    {area.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {area.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right: Stats */}
        <div className="space-y-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 gap-4"
          >
            {achievements.map((a) => (
              <StatCounter key={a.id} achievement={a} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <h3
              className="text-sm font-semibold mb-4 flex items-center gap-2"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}
            >
              <span style={{ color: "var(--gold-light)" }}>$</span> Currently exploring
            </h3>
            <div className="space-y-3">
              {[
                { topic: "MERN Stack Development & Architecture", progress: 90 },
                { topic: "Data Science & Predictive Analytics", progress: 75 },
                { topic: "Machine Learning & AI Models", progress: 65 },
                { topic: "Network Security & Analysis", progress: 80 },
              ].map(({ topic, progress }) => (
                <div key={topic}>
                  <div className="flex justify-between mb-1">
                     <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{topic}</span>
                    <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {progress}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "var(--surface-2)" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ background: "var(--gradient-brand)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
