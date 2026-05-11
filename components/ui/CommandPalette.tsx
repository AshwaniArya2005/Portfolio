"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, User, Code2, Layers, Award, Trophy, FileText, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { theme, setTheme } = useTheme();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const commands: Command[] = [
    {
      id: "home",
      label: "Go to Home",
      icon: <Home size={16} />,
      action: () => scrollTo("hero"),
      keywords: ["hero", "top", "start"],
    },
    {
      id: "about",
      label: "About Me",
      icon: <User size={16} />,
      action: () => scrollTo("about"),
      keywords: ["bio", "info"],
    },
    {
      id: "skills",
      label: "View Skills",
      icon: <Code2 size={16} />,
      action: () => scrollTo("skills"),
      keywords: ["tech", "stack", "languages"],
    },
    {
      id: "projects",
      label: "See Projects",
      icon: <Layers size={16} />,
      action: () => scrollTo("projects"),
      keywords: ["work", "portfolio"],
    },
    {
      id: "certifications",
      label: "Certifications",
      icon: <Award size={16} />,
      action: () => scrollTo("certifications"),
      keywords: ["certs", "certificates"],
    },
    {
      id: "coding",
      label: "Coding Profiles",
      icon: <Trophy size={16} />,
      action: () => scrollTo("coding-profiles"),
      keywords: ["leetcode", "codeforces", "github", "cp"],
    },
    {
      id: "resume",
      label: "View Resume",
      icon: <FileText size={16} />,
      action: () => scrollTo("resume"),
      keywords: ["cv", "download"],
    },
    {
      id: "contact",
      label: "Contact Me",
      icon: <Mail size={16} />,
      action: () => scrollTo("contact"),
      keywords: ["email", "hire", "message"],
    },
    {
      id: "theme",
      label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
      action: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        setOpen(false);
      },
      keywords: ["theme", "dark", "light", "mode"],
    },
  ];

  const filtered = commands.filter(
    (cmd) =>
      !query ||
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.keywords?.some((kw) => kw.includes(query.toLowerCase()))
  );

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-strong)",
                boxShadow: "0 0 0 1px var(--border), 0 32px 80px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.15)",
              }}
            >
              {/* Search input */}
              <div
                className="flex items-center gap-3 px-4 py-3.5 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <Search size={16} style={{ color: "var(--text-muted)" }} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-body)",
                  }}
                />
                <kbd
                  className="px-1.5 py-0.5 text-xs rounded border"
                  style={{
                    color: "var(--text-muted)",
                    borderColor: "var(--border)",
                    background: "var(--surface-2)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  ESC
                </kbd>
              </div>

              {/* Commands list */}
              <div className="py-2 max-h-72 overflow-y-auto">
                {filtered.length === 0 ? (
                  <p
                    className="px-4 py-8 text-center text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    No commands found
                  </p>
                ) : (
                  filtered.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-violet-500/10"
                    >
                      <span
                        className="p-1.5 rounded-lg"
                        style={{
                          color: "var(--violet-light)",
                          background: "rgba(124,58,237,0.1)",
                        }}
                      >
                        {cmd.icon}
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {cmd.label}
                      </span>
                    </button>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div
                className="px-4 py-2 border-t flex items-center justify-between"
                style={{ borderColor: "var(--border)" }}
              >
                <span
                  className="text-xs"
                  style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                >
                  {filtered.length} command{filtered.length !== 1 ? "s" : ""}
                </span>
                <div className="flex items-center gap-2">
                  <kbd
                    className="px-1.5 py-0.5 text-xs rounded border"
                    style={{
                      color: "var(--text-muted)",
                      borderColor: "var(--border)",
                      background: "var(--surface-2)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    ⌘K
                  </kbd>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    to toggle
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
