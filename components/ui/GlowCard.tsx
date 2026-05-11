"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
  disableHoverAnim?: boolean;
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(124, 58, 237, 0.3)",
  intensity = 1,
  disableHoverAnim = false,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={disableHoverAnim ? undefined : { y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "relative rounded-2xl overflow-hidden transition-all duration-300",
        className
      )}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Spotlight radial gradient */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor} 0%, transparent 40%)`,
            opacity: intensity,
          }}
        />
      )}

      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl z-0 pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? `inset 0 0 0 1px ${glowColor}, 0 0 30px ${glowColor}`
            : "inset 0 0 0 1px transparent",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
