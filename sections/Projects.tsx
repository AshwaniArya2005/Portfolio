"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ExternalLink, Code, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
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

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <SectionWrapper
      id="projects"
      label="My Work"
      title="Featured Projects"
      subtitle="Things I've built — from ML research to full-stack applications."
    >

      <LayoutGroup>
        {/* Featured projects — Carousel */}
        {featured.length > 0 && (
          <div className="mb-16 relative group/carousel">
            <div className="overflow-hidden -ml-4 sm:-ml-8 py-4" ref={emblaRef}>
              <div className="flex touch-pan-y items-stretch">
                {featured.map((project, i) => (
                  <div key={project.id} className="flex-[0_0_100%] min-w-0 lg:flex-[0_0_85%] pl-4 sm:pl-8">
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.07 }}
                      onClick={() => setSelectedProject(project)}
                      onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
                      role="button"
                      tabIndex={0}
                      className="group outline-none h-full block"
                    >
                      <TiltCard maxTilt={3} className="h-full">
                        <GlowCard className="h-full" disableHoverAnim={true}>
                          <div className="flex flex-col md:flex-row h-full">
                            {/* Project image placeholder / actual image */}
                            <div
                              className="w-full md:w-[45%] lg:w-[50%] relative overflow-hidden flex-shrink-0 h-64 md:h-auto border-b md:border-b-0 md:border-r border-white/5"
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
                              <span className="text-5xl font-bold gradient-text opacity-60"
                                style={{ fontFamily: "var(--font-heading)" }}>
                                {project.title.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                            
                            {/* Actual Image */}
                            {project.image && (
                              <img
                                src={project.image}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.opacity = '0';
                                }}
                              />
                            )}
                            
                            {/* Gradient Overlay for better blend */}
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[var(--surface)]/80 via-transparent to-transparent z-15 opacity-0 md:opacity-100 mix-blend-multiply" />
                            
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 z-15 flex items-center justify-center backdrop-blur-[2px]">
                               <span className="text-white text-sm font-semibold px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                 View Project Details
                               </span>
                            </div>

                            {/* Status badge */}
                            <div className="absolute top-4 left-4 z-20">
                              <Badge status={project.status} />
                            </div>
                            {project.featured && (
                              <div className="absolute top-4 right-4 z-20">
                                <Badge status="featured" />
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="w-full md:w-[55%] lg:w-[50%] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col flex-1 justify-center relative bg-[var(--surface)]/50">
                            {/* Subtle background glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--violet-light)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            
                            <h3
                              className="text-2xl sm:text-3xl font-bold mb-4 group-hover:text-[var(--violet-light)] transition-colors"
                              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                            >
                              {project.title}
                            </h3>
                            <p
                              className="text-sm sm:text-base leading-relaxed mb-8 flex-1 text-pretty"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {project.description}
                            </p>

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-2.5 mb-8">
                              {project.tech.slice(0, 5).map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide"
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
                              {project.tech.length > 5 && (
                                <span className="text-[11px] text-muted-foreground self-center ml-1 font-mono tracking-wide px-2 py-1 bg-white/5 rounded-md">+{project.tech.length - 5}</span>
                              )}
                            </div>

                            {/* Links */}
                            <div className="flex flex-wrap sm:flex-nowrap gap-4 mt-auto" onClick={(e) => e.stopPropagation()}>
                              {project.githubUrl && (
                                <MagneticButton
                                  href={project.githubUrl}
                                  target="_blank"
                                  variant="secondary"
                                  size="md"
                                  className="gap-2 flex-1 justify-center whitespace-nowrap"
                                >
                                  <Code size={18} />
                                  Source Code
                                </MagneticButton>
                              )}
                              {project.liveUrl && project.liveUrl !== "#" && (
                                <MagneticButton
                                  href={project.liveUrl}
                                  target="_blank"
                                  variant="primary"
                                  size="md"
                                  className="gap-2 flex-1 justify-center whitespace-nowrap shadow-lg shadow-[var(--violet-light)]/20"
                                >
                                  <ExternalLink size={18} />
                                  Live Demo
                                </MagneticButton>
                              )}
                            </div>
                          </div>
                          </div>
                        </GlowCard>
                      </TiltCard>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-6 lg:-left-8 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
              <button
                onClick={scrollPrev}
                className="p-3.5 rounded-full bg-[var(--surface-2)]/80 text-white backdrop-blur-md border border-white/10 hover:border-[var(--violet)]/50 hover:bg-[var(--surface)] hover:text-[var(--violet-light)] hover:scale-110 transition-all shadow-xl"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-6 lg:-right-8 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
              <button
                onClick={scrollNext}
                className="p-3.5 rounded-full bg-[var(--surface-2)]/80 text-white backdrop-blur-md border border-white/10 hover:border-[var(--violet)]/50 hover:bg-[var(--surface)] hover:text-[var(--violet-light)] hover:scale-110 transition-all shadow-xl"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
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
                          className="px-2 py-0.5 rounded text-[10px] font-medium"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            color: "var(--text-secondary)",
                            border: "1px solid rgba(255,255,255,0.08)",
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
                {selectedProject.featured ? (
                  /* Featured: Full image hero header */
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
                        <Badge status="featured" />
                      </div>
                      <h2
                        className="text-2xl sm:text-4xl font-bold"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                      >
                        {selectedProject.title}
                      </h2>
                    </div>
                  </div>
                ) : (
                  /* Non-featured: Compact text header */
                  <div className="px-6 sm:px-8 pt-10 pb-6 relative overflow-hidden">
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ background: "linear-gradient(90deg, var(--violet), var(--cyan))" }}
                    />
                    <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
                      style={{ background: "var(--violet)" }} />
                    <div className="flex gap-2 mb-4">
                      <Badge status={selectedProject.status} />
                    </div>
                    <h2
                      className="text-2xl sm:text-3xl font-bold"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                    >
                      {selectedProject.title}
                    </h2>
                  </div>
                )}

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
