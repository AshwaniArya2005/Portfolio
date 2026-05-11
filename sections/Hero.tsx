"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, ArrowRight, Code, Mail, Code2, ChevronDown } from "lucide-react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ParticleField } from "@/components/ui/ParticleField";
import { TypingEffect } from "@/components/ui/TypingEffect";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { personal } from "@/data/personal";
import { socialLinks } from "@/data/social";
import { Code as CodeIcon, X, ExternalLink, Mail as MailIcon, Trophy } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { SiLeetcode, SiCodeforces } from "react-icons/si";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Code: FaGithub,
  Linkedin: FaLinkedin,
  Twitter: FaXTwitter,
  Code2: SiLeetcode,
  Trophy: SiCodeforces,
  Mail: FaEnvelope,
};

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  // Spotlight effect
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setSpotlightPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AuroraBackground className="relative min-h-screen flex items-center">
      <section ref={heroRef} id="hero" className="relative w-full min-h-screen flex items-center">
        {/* Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(600px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(124,58,237,0.07) 0%, transparent 50%)`,
            transition: "background 0.6s ease-out",
          }}
        />

        {/* Particle field */}
        <div className="absolute inset-0 z-0">
          <ParticleField count={90} speed={0.4} />
        </div>

        <motion.div
          style={{ opacity, y }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16"
        >
          <div className="max-w-4xl">
            {/* Greeting badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: "rgba(124, 58, 237, 0.1)",
                  color: "var(--violet-light)",
                  border: "1px solid rgba(124, 58, 237, 0.25)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  👋
                </motion.span>
                Hey there! I'm
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-none mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span style={{ color: "var(--text-primary)" }}>Ashwani</span>
              <br />
              <span className="gradient-text">Kumar Arya</span>
            </motion.h1>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6 h-12 flex items-center"
            >
              <span
                className="text-xl sm:text-2xl font-medium"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-heading)" }}
              >
                <TypingEffect
                  phrases={personal.roles}
                  className="text-xl sm:text-2xl"
                />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg max-w-2xl mb-10 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {personal.bioShort}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <MagneticButton
                id="hero-view-work"
                variant="primary"
                size="lg"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="gap-2 shadow-lg"
              >
                View My Work
                <ArrowRight size={18} />
              </MagneticButton>

              <MagneticButton
                id="hero-download-resume"
                variant="secondary"
                size="lg"
                href={personal.resumeUrl}
                target="_blank"
                className="gap-2"
              >
                <Download size={18} />
                Download Resume
              </MagneticButton>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-4"
            >
              <span
                className="text-xs tracking-widest uppercase font-medium"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
              >
                Find me on
              </span>
              <div className="w-8 h-px" style={{ background: "var(--border-strong)" }} />
              <div className="flex items-center gap-3">
                {socialLinks.slice(0, 5).map((link, i) => {
                  const Icon = iconMap[link.icon] || Mail;
                  return (
                    <motion.a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.08, type: "spring" }}
                      whileHover={{ scale: 1.25, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2.5 rounded-xl transition-colors"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ color: "var(--text-muted)" }}
          aria-label="Scroll down"
        >
          <span className="text-xs" style={{ fontFamily: "var(--font-mono)" }}>scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>
      </section>
    </AuroraBackground>
  );
}
