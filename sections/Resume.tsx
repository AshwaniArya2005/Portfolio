"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink, FileText } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { personal } from "@/data/personal";

export function Resume() {
  return (
    <SectionWrapper
      id="resume"
      label="Resume"
      title="My Resume"
      subtitle="A snapshot of my skills, experience, and achievements."
      className="relative"
      style={{ background: "var(--surface)" } as React.CSSProperties}
    >
      <div className="max-w-4xl mx-auto">
        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <MagneticButton
            id="resume-download"
            href={personal.resumeUrl}
            target="_blank"
            variant="primary"
            size="lg"
            className="gap-2"
          >
            <Download size={18} />
            Download PDF
          </MagneticButton>
          <MagneticButton
            id="resume-view"
            href={personal.resumeUrl}
            target="_blank"
            variant="secondary"
            size="lg"
            className="gap-2"
          >
            <ExternalLink size={18} />
            Open in New Tab
          </MagneticButton>
        </motion.div>

        {/* Resume preview frame */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{ border: "1px solid var(--border)" }}
        >
          {/* Glow rim */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            style={{ boxShadow: "inset 0 0 0 1px rgba(124,58,237,0.2)" }}
          />

          {/* Header bar (fake browser chrome) */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}
          >
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <div
              className="flex-1 mx-4 px-3 py-1 rounded-md text-xs text-center truncate"
              style={{
                background: "var(--surface)",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                border: "1px solid var(--border)",
              }}
            >
              {personal.siteUrl}/resume.pdf
            </div>
          </div>

          {/* PDF iframe or placeholder */}
          <div className="relative" style={{ height: "70vh", minHeight: 500 }}>
            <iframe
              src={`${personal.resumeUrl}#toolbar=0`}
              className="w-full h-full"
              title="Resume Preview"
              style={{ background: "var(--surface)" }}
            />

            {/* Fallback overlay shown if iframe blocked */}
            <noscript>
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                style={{ background: "var(--surface)" }}
              >
                <FileText size={48} style={{ color: "var(--text-muted)" }} />
                <p style={{ color: "var(--text-secondary)" }}>
                  Resume preview unavailable.
                </p>
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: "var(--violet-light)" }}
                >
                  Download directly
                </a>
              </div>
            </noscript>
          </div>
        </motion.div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs mt-4"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          Replace <code className="px-1 py-0.5 rounded" style={{ background: "var(--surface-2)" }}>public/resume.pdf</code> to update your resume instantly
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
