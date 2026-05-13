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
          style={{ color: "var(--violet-light)" }}
        />
      )}
    </div>
  );
}

// ── Credential Modal ────────────────────────────────────────────
function CredentialModal({
  cert,
  onClose,
}: {
  cert: Certification;
  onClose: () => void;
}) {
  const pdfUrl = cert.certificatePdf ?? cert.credentialUrl;
  const hasPdf = pdfUrl && pdfUrl !== "#";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="relative w-full max-w-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
        style={{ background: "var(--surface)" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all"
        >
          <X size={18} />
        </button>

        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{ background: "linear-gradient(90deg, var(--violet), var(--cyan))" }}
        />

        {/* Certificate preview */}
        {cert.certificatePdf ? (() => {
          const encodedUrl = cert.certificatePdf
            .split("/")
            .map((seg) => encodeURIComponent(seg))
            .join("/");
          return (
            <div className="w-full relative overflow-hidden bg-[#0d0d14]" style={{ height: "400px" }}>
              <object
                data={encodedUrl}
                type="application/pdf"
                className="w-full h-full"
              >
                {/* Fallback if browser can't render PDF inline */}
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-8 text-center"
                  style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.08) 100%)" }}
                >
                  <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-2 border border-white/10">
                    <IssuerLogo cert={cert} size={40} />
                  </div>
                  <span className="text-3xl font-black gradient-text" style={{ fontFamily: "var(--font-heading)" }}>
                    {cert.issuer}
                  </span>
                  <span className="text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-white/5 text-[var(--violet-light)] border border-white/10">
                    Certificate of Completion
                  </span>
                </div>
              </object>
            </div>
          );
        })() : (
          /* No PDF — show issuer banner */
          <div
            className="w-full h-44 flex flex-col items-center justify-center gap-3 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.08) 100%)" }}
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }} />
            <div className="relative z-10 w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-2">
              <IssuerLogo cert={cert} size={40} />
            </div>
            <span className="relative z-10 text-3xl font-black gradient-text" style={{ fontFamily: "var(--font-heading)" }}>
              {cert.issuer}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-8">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "var(--violet-light)" }}
          >
            {cert.issuer}
          </p>
          <h2
            className="text-xl sm:text-2xl font-bold mb-1"
            style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
          >
            {cert.title}
          </h2>
          <div className="flex items-center gap-2 mb-6">
            <Calendar size={13} style={{ color: "var(--text-muted)" }} />
            <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
              {cert.date}
            </span>
            {cert.expiryDate && (
              <>
                <span style={{ color: "var(--text-muted)" }}>·</span>
                <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                  Expires {cert.expiryDate}
                </span>
              </>
            )}
          </div>

          {/* Skills */}
          {cert.skills && cert.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: "rgba(124,58,237,0.08)",
                    color: "var(--violet-light)",
                    border: "1px solid rgba(124,58,237,0.18)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <CheckCircle size={11} />
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* CTA — always show if PDF is available */}
          {hasPdf && (() => {
            const encodedUrl = pdfUrl!
              .split("/")
              .map((seg) => encodeURIComponent(seg))
              .join("/");
            return (
              <a
                href={encodedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, var(--violet), var(--cyan))",
                  color: "#fff",
                }}
              >
                <ExternalLink size={16} />
                View Certificate
              </a>
            );
          })()}
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Section ────────────────────────────────────────────────
export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

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
                onClick={() => setSelectedCert(cert)}
                className="cursor-pointer"
              >
                <GlowCard
                  className="p-6 h-full flex flex-col"
                  glowColor="rgba(124,58,237,0.25)"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-white/5 border border-white/10"
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
                      <p className="text-xs" style={{ color: "var(--violet-light)" }}>
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
                    <div className="flex flex-wrap gap-1 mb-5 flex-1">
                      {cert.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[10px] font-medium"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            color: "var(--text-secondary)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* View button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedCert(cert); }}
                    className="flex items-center gap-1.5 text-xs font-semibold mt-auto transition-all hover:gap-2.5 group/btn"
                    style={{ color: "var(--violet-light)" }}
                  >
                    <ExternalLink size={12} className="transition-transform group-hover/btn:rotate-12" />
                    View Credentials
                  </button>
                </GlowCard>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Credential Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CredentialModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
