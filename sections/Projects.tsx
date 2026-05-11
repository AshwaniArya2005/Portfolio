"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ExternalLink, Code, Star, GitFork, Filter } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlowCard } from "@/components/ui/GlowCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/Badge";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { projects, projectCategories, type ProjectCategory } from "@/data/projects";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  const featured = projects.filter((p) => p.featured);
  const regular = projects.filter((p) => !p.featured);

  return (
    <SectionWrapper
      id="projects"
      label="My Work"
      title="Featured Projects"
      subtitle="Things I've built — from ML research to full-stack applications."
    >

      <LayoutGroup>
        {/* Featured projects — large cards */}
        {featured.length > 0 && (
          <motion.div layout className="grid md:grid-cols-2 gap-6 mb-6">
            <AnimatePresence>
              {featured.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  className="group outline-none"
                >
                  <TiltCard maxTilt={8} className="h-full">
                    <GlowCard className="h-full flex flex-col overflow-hidden" disableHoverAnim={true}>
                      {/* Project image placeholder / actual image */}
                      <div
                        className="h-48 relative overflow-hidden flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.2) 100%)`,
                        }}
                      >
                        {/* Grid pattern (placeholder) */}
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{
                            backgroundImage:
                              "linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)",
                            backgroundSize: "30px 30px",
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl font-bold gradient-text opacity-60"
                            style={{ fontFamily: "var(--font-heading)" }}>
                            {project.title.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        
                        {/* Actual Image */}
                        {project.image && (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.opacity = '0';
                            }}
                          />
                        )}
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-15 flex items-center justify-center">
                           <span className="text-white text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                             View Details
                           </span>
                        </div>

                        {/* Status badge */}
                        <div className="absolute top-3 left-3 z-20">
                          <Badge status={project.status} />
                        </div>
                        {project.featured && (
                          <div className="absolute top-3 right-3 z-20">
                            <Badge status="featured" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <h3
                          className="text-lg font-bold mb-2 group-hover:text-[var(--violet-light)] transition-colors"
                          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                        >
                          {project.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed mb-4 flex-1 line-clamp-2"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {project.description}
                        </p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tech.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded text-xs font-medium"
                              style={{
                                background: "rgba(124,58,237,0.08)",
                                color: "var(--violet-light)",
                                border: "1px solid rgba(124,58,237,0.15)",
                                fontFamily: "var(--font-mono)",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="text-[10px] text-muted-foreground self-center ml-1">+{project.tech.length - 4} more</span>
                          )}
                        </div>

                        {/* Links */}
                        <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                          {project.githubUrl && (
                            <MagneticButton
                              href={project.githubUrl}
                              target="_blank"
                              variant="secondary"
                              size="sm"
                              className="gap-1.5 flex-1 justify-center"
                            >
                              <Code size={14} />
                              Code
                            </MagneticButton>
                          )}
                          {project.liveUrl && project.liveUrl !== "#" && (
                            <MagneticButton
                              href={project.liveUrl}
                              target="_blank"
                              variant="primary"
                              size="sm"
                              className="gap-1.5 flex-1 justify-center"
                            >
                              <ExternalLink size={14} />
                              Live Demo
                            </MagneticButton>
                          )}
                        </div>
                      </div>
                    </GlowCard>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Regular projects — compact grid */}
        {regular.length > 0 && (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {regular.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  className="group outline-none"
                >
                  <GlowCard className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h3
                        className="text-sm font-bold group-hover:text-[var(--violet-light)] transition-colors"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                      >
                        {project.title}
                      </h3>
                      <Badge status={project.status} />
                    </div>
                    <p
                      className="text-xs leading-relaxed mb-4 flex-1 line-clamp-3"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 rounded text-xs"
                          style={{
                            background: "var(--surface-2)",
                            color: "var(--text-muted)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-xs"
                          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3 mt-auto pt-2" onClick={(e) => e.stopPropagation()}>
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-all border border-white/5 hover:border-white/20 hover:bg-white/5"
                          style={{ color: "var(--text-secondary)" }}>
                          <Code size={14} /> Code
                        </a>
                      )}
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-all hover:bg-[var(--cyan)]/10 border"
                          style={{ color: "var(--cyan)", borderColor: "rgba(6,182,212,0.2)" }}>
                          <ExternalLink size={14} /> Demo
                        </a>
                      )}
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </LayoutGroup>


      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 shadow-2xl flex flex-col"
              style={{ background: "var(--surface)" }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-black/20 text-white/50 hover:text-white transition-colors backdrop-blur-md"
              >
                <Code className="rotate-45" size={20} />
              </button>

              <div className="overflow-y-auto custom-scrollbar">
                {/* Header Image */}
                <div className="h-64 sm:h-80 relative overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(6,182,212,0.3) 100%)`,
                    }}
                  />
                  {selectedProject.image && (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex gap-2 mb-3">
                      <Badge status={selectedProject.status} />
                      {selectedProject.featured && <Badge status="featured" />}
                    </div>
                    <h2
                      className="text-2xl sm:text-4xl font-bold"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                    >
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">About Project</h4>
                      <p
                        className="text-base sm:text-lg leading-relaxed mb-6"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {selectedProject.longDescription || selectedProject.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">Technologies</h4>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {selectedProject.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              background: "rgba(124,58,237,0.1)",
                              color: "var(--violet-light)",
                              border: "1px solid rgba(124,58,237,0.2)",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">Project Links</h4>
                      <div className="flex flex-col gap-3">
                        {selectedProject.githubUrl && (
                          <MagneticButton
                            href={selectedProject.githubUrl}
                            target="_blank"
                            variant="secondary"
                            className="w-full gap-2 justify-center"
                          >
                            <Code size={18} />
                            View Source Code
                          </MagneticButton>
                        )}
                        {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                          <MagneticButton
                            href={selectedProject.liveUrl}
                            target="_blank"
                            variant="primary"
                            className="w-full gap-2 justify-center shadow-lg shadow-[var(--violet-light)]/20"
                          >
                            <ExternalLink size={18} />
                            Launch Live Demo
                          </MagneticButton>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
