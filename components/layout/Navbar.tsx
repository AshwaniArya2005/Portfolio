"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Code2 } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import { personal } from "@/data/personal";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certs" },
  { id: "coding-profiles", label: "Coding" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const activeSection = useScrollSpy(NAV_ITEMS.map((n) => n.id));

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "py-3 glass border-b"
            : "py-5 bg-transparent"
        )}
        style={{
          borderColor: scrolled ? "var(--border)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => scrollTo("hero")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 pl-1"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm tracking-wide font-bold"
                style={{
                  background: "var(--gradient-brand)",
                }}
              >
                {personal.initials}
              </div>
              <span
                className="font-bold text-base hidden sm:block tracking-wide"
                style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
              >
                {personal.name}
              </span>
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                    activeSection === item.id
                      ? "text-[var(--gold-light)]"
                      : "hover:text-[var(--gold-light)]"
                  )}
                  style={{
                    color: activeSection === item.id ? "var(--gold-light)" : "var(--text-secondary)",
                  }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "var(--gold-glow)" }}
                      transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              {mounted && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    background: "var(--surface)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border)",
                  }}
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={theme}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              )}

              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg md:hidden"
                style={{
                  background: "var(--surface)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border)",
                }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mobileOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-4 right-4 z-40 rounded-2xl p-4 glass"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.id)}
                  className="text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    background: activeSection === item.id ? "var(--gold-glow)" : "transparent",
                    color: activeSection === item.id ? "var(--gold-light)" : "var(--text-secondary)",
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
