"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "@/data/personal";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: "var(--background)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Background blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="aurora-blob w-96 h-96 -top-20 -left-20 opacity-30"
              style={{ background: "var(--gold)" }}
            />
            <div
              className="aurora-blob w-80 h-80 bottom-0 right-0 opacity-20"
              style={{ background: "var(--copper)", animationDelay: "-3s" }}
            />
          </div>

          {/* Logo / Initials */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="relative z-10 mb-8"
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white"
              style={{
                background: "var(--gradient-brand)",
                boxShadow: "0 0 40px var(--gold-glow)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {personal.initials}
            </div>
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative z-10 mb-10 text-lg font-medium"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-heading)" }}
          >
            {personal.name}
          </motion.p>

          {/* Progress bar */}
          <div
            className="relative z-10 w-48 h-[2px] rounded-full overflow-hidden"
            style={{ background: "var(--surface-2)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: "var(--gradient-brand)",
                transition: "width 0.1s ease",
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 mt-4 text-xs"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
