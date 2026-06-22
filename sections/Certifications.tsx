"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Award, Calendar, X, CheckCircle } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlowCard } from "@/components/ui/GlowCard";
import { certifications, type Certification } from "@/data/certifications";

// ── Helper Components ───────────────────────────────────────────
function IssuerLogo({ cert, size = 22 }: { cert: Certification; size?: number }) {
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Actual Logo */}
      {cert.issuerLogo && !error ? (
        <img
          src={cert.issuerLogo}
          alt={cert.issuer}
          className="relative z-10 w-full h-full object-contain rounded-full p-1"
          onError={() => setError(true)}
        />
      ) : (
        /* If error or no logo, show fallback icon */
        <Award
          size={size}
          className="relative z-10"
          style={{ color: "var(--gold-light)" }}
        />
      )}
    </div>
  );
}



// ── Main Section ────────────────────────────────────────────────
export function Certifications() {

  return (
    <SectionWrapper
      id="certifications"
      label="Credentials"
      title="Certifications"
      subtitle="Industry-recognized certifications that validate my skills."
      className="relative"
      style={{ background: "var(--surface)" } as React.CSSProperties}
    >
      {/* Certs grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {[...certifications]
            .sort((a, b) => {
              const yearA = parseInt(a.date.match(/\d{4}/)?.[0] || "0");
              const yearB = parseInt(b.date.match(/\d{4}/)?.[0] || "0");
              return yearB - yearA;
            })
            .map((cert, i) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className=""
              >
                <GlowCard
                  className="p-6 h-full flex flex-col group transition-all duration-300 hover:-translate-y-1"
                  glowColor="var(--gold-glow)"
                >
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4 min-h-[3rem]">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-black/5 dark:bg-white/5 border border-[var(--border)]"
                      >
                        <IssuerLogo cert={cert} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-sm font-bold leading-tight mb-1"
                          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                        >
                          {cert.title}
                        </h3>
                        <p className="text-xs" style={{ color: "var(--gold-light)" }}>
                          {cert.issuer}
                        </p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-4">
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
                          background: "var(--gold-glow)",
                          color: "var(--gold-light)",
                          border: "1px solid var(--border-strong)",
                        }}
                      >
                        {cert.category}
                      </span>
                    </div>

                    {/* Skills */}
                    <div className="min-h-[4.5rem] mb-5">
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.slice(0, 4).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded text-[10px] font-medium"
                              style={{
                                background: "var(--surface-2)",
                                color: "var(--text-secondary)",
                                border: "1px solid var(--border)",
                                fontFamily: "var(--font-mono)",
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* View button */}
                  {(() => {
                    const pdfUrl = cert.certificatePdf ?? cert.credentialUrl;
                    const encodedUrl = pdfUrl
                      ?.split("/")
                      .map((seg) => encodeURIComponent(seg))
                      .join("/");

                    return (
                      <a
                        href={encodedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all duration-500 overflow-hidden active:scale-[0.98] hover:text-white"
                        style={{
                          background: "var(--surface-2)",
                          color: "var(--text-primary)",
                          border: "1px solid var(--border)"
                        }}
                      >
                        {/* Hover Gradient Overlay */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 z-0"
                          style={{ background: "var(--gradient-brand)" }}
                        />
                        
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-40 blur-xl transition-opacity duration-500 z-0"
                          style={{ background: "var(--gradient-brand)" }}
                        />

                        <span className="relative z-10 flex items-center gap-2.5">
                          <ExternalLink size={14} className="transition-transform duration-500 group-hover/btn:rotate-12 group-hover/btn:scale-110" />
                          VIEW CERTIFICATE
                        </span>
                      </a>
                    );
                  })()}
                </GlowCard>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
