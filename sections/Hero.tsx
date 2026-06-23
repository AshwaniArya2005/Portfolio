"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
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
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { SiLeetcode, SiCodeforces } from "react-icons/si";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Code: FaGithub,
  Linkedin: FaLinkedin,
  Instagram: FaInstagram,
  Code2: SiLeetcode,
  Trophy: SiCodeforces,
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
            background: `radial-gradient(600px circle at ${spotlightPos.x}% ${spotlightPos.y}%, var(--gold-glow) 0%, transparent 50%)`,
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
          <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-0">
            {/* Left: Text Content */}
            <div className="max-w-2xl flex-1 w-full">

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-none mb-4 text-center sm:text-left"
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
              className="mb-6 h-12 flex items-center justify-center sm:justify-start"
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
              className="text-base sm:text-lg max-w-2xl mb-10 leading-relaxed text-center sm:text-left"
              style={{ color: "var(--text-secondary)" }}
            >
              {personal.bioShort}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-12 justify-center sm:justify-start"
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
              className="flex items-center gap-3 sm:gap-4 justify-center sm:justify-start flex-wrap"
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
            </div>{/* end left column */}

            {/* Right: Circular Profile Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex-shrink-0 flex items-center justify-center lg:mt-8"
            >
              {/* Outer decorative ring */}
              <div
                className="relative"
                style={{
                  width: "clamp(200px, 40vw, 320px)",
                  height: "clamp(200px, 40vw, 320px)",
                }}
              >
                {/* Rotating dashed ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "1.5px dashed var(--border-strong)",
                    top: -14,
                    left: -14,
                    right: -14,
                    bottom: -14,
                    width: "calc(100% + 28px)",
                    height: "calc(100% + 28px)",
                  }}
                />

                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: "0 0 40px 6px var(--gold-glow), inset 0 0 30px 4px var(--gold-glow)",
                    borderRadius: "50%",
                  }}
                />

                {/* Gold border frame */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, var(--gold), var(--gold-light), transparent, var(--gold))",
                    padding: 3,
                    borderRadius: "50%",
                  }}
                >
                  {/* Inner circle with photo */}
                  <div
                    className="w-full h-full rounded-full overflow-hidden"
                    style={{
                      background: "var(--surface)",
                    }}
                  >
                    <Image
                      src="/profile2.png"
                      alt="Ashwani Kumar Arya"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover object-top"
                      priority
                      unoptimized
                    />
                  </div>
                </div>

                {/* Small accent dot top */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                  style={{ background: "var(--gold)", boxShadow: "0 0 10px var(--gold)" }}
                />
                {/* Small accent dot bottom */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                  style={{ background: "var(--gold)", boxShadow: "0 0 10px var(--gold)" }}
                />
              </div>
            </motion.div>

          </div>{/* end two-col */}
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
