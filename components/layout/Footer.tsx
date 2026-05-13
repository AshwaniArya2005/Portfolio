"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { personal } from "@/data/personal";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t py-12"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
      }}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--violet), var(--cyan), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
          >
            AK
          </motion.div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {[
              { icon: FaGithub, href: `https://github.com/${personal.github}`, label: "GitHub" },
              { icon: FaLinkedin, href: `https://linkedin.com/in/${personal.linkedin}`, label: "LinkedIn" },
              { icon: FaInstagram, href: `https://instagram.com/${personal.instagram}`, label: "Instagram" },
              { icon: FaEnvelope, href: `mailto:${personal.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p
            className="text-sm flex items-center gap-1.5"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            © {year} {personal.name} · Built with{" "}
            <Heart size={12} fill="currentColor" className="text-pink-500" />
            {" "}using Next.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
