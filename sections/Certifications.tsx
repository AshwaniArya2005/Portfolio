"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Award, Calendar, Tag } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlowCard } from "@/components/ui/GlowCard";
import { certifications, certCategories, type CertCategory } from "@/data/certifications";

export function Certifications() {
  const [activeCategory, setActiveCategory] = useState<"All" | CertCategory>("All");
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

  const filtered =
    activeCategory === "All"
      ? certifications
      : certifications.filter((c) => c.category === activeCategory);

  return (
    <SectionWrapper
      id="certifications"
      label="Credentials"
      title="Certifications"
      subtitle="Industry-recognized certifications that validate my skills."
      className="relative"
      style={{ background: "var(--surface)" } as React.CSSProperties}
    >
      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {certCategories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={{
              background: activeCategory === cat ? "rgba(124,58,237,0.15)" : "var(--background)",
              color: activeCategory === cat ? "var(--violet-light)" : "var(--text-secondary)",
              border: activeCategory === cat
                ? "1px solid rgba(124,58,237,0.4)"
                : "1px solid var(--border)",
            }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Certs grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((cert, i) => (
            <motion.div
              key={cert.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <GlowCard
                className="p-6 h-full flex flex-col cursor-pointer"
                glowColor="rgba(124,58,237,0.25)"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                    style={{ background: "rgba(124,58,237,0.1)" }}
                  >
                    <Award size={22} style={{ color: "var(--violet-light)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-sm font-bold leading-tight mb-1"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                    >
                      {cert.title}
                    </h3>
                    <p className="text-xs" style={{ color: "var(--violet-light)" }}>
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                  >
                    <Calendar size={11} />
                    {cert.date}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(6,182,212,0.1)",
                      color: "var(--cyan)",
                      border: "1px solid rgba(6,182,212,0.2)",
                    }}
                  >
                    {cert.category}
                  </span>
                </div>

                {/* Skills */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4 flex-1">
                    {cert.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-1.5 py-0.5 rounded text-xs"
                        style={{
                          background: "var(--surface-2)",
                          color: "var(--text-muted)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Credential link */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors mt-auto"
                    style={{ color: "var(--violet-light)" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={12} />
                    View Credential
                  </a>
                )}
              </GlowCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-16" style={{ color: "var(--text-muted)" }}>
          No certifications in this category.
        </p>
      )}
    </SectionWrapper>
  );
}
