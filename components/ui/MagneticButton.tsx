"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  id?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  onClick,
  href,
  target,
  variant = "primary",
  size = "md",
  id,
  disabled,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantStyles = {
    primary: {
      background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
      color: "white",
      border: "none",
    },
    secondary: {
      background: "var(--surface)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-strong)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
      border: "none",
    },
    outline: {
      background: "transparent",
      color: "var(--violet-light)",
      border: "1px solid var(--violet)",
    },
  };

  const commonProps = {
    ref: ref as React.RefObject<HTMLButtonElement>,
    id,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
  };

  const motionProps = {
    animate: { x: position.x, y: position.y },
    transition: { type: "spring" as const, stiffness: 350, damping: 30 },
    whileTap: { scale: disabled ? 1 : 0.95 },
    whileHover: { scale: disabled ? 1 : 1.02 },
  };

  const buttonClass = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold",
    "transition-all duration-200 cursor-pointer overflow-hidden",
    sizeClasses[size],
    disabled && "opacity-50 pointer-events-none",
    className
  );

  const content = (
    <>
      {/* Shimmer on hover for primary */}
      {variant === "primary" && (
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
            transform: "skewX(-15deg) translateX(-100%)",
            animation: "none",
          }}
        />
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        {...(motionProps as object)}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={buttonClass}
        style={variantStyles[variant]}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      {...commonProps}
      type={type}
      disabled={disabled}
      className={buttonClass}
      style={variantStyles[variant]}
    >
      {content}
    </motion.button>
  );
}
