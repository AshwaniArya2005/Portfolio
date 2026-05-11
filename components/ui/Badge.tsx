"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type StatusType = "completed" | "in-progress" | "archived" | "featured" | "new" | "live";

interface BadgeProps {
  status: StatusType;
  className?: string;
  size?: "sm" | "md";
}

const statusConfig: Record<StatusType, { label: string; color: string; bg: string; pulse?: boolean }> = {
  completed: {
    label: "Completed",
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.1)",
    pulse: false,
  },
  "in-progress": {
    label: "In Progress",
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.1)",
    pulse: true,
  },
  archived: {
    label: "Archived",
    color: "#6b7280",
    bg: "rgba(107, 114, 128, 0.1)",
    pulse: false,
  },
  featured: {
    label: "Featured",
    color: "#a855f7",
    bg: "rgba(168, 85, 247, 0.1)",
    pulse: false,
  },
  new: {
    label: "New",
    color: "#06b6d4",
    bg: "rgba(6, 182, 212, 0.1)",
    pulse: true,
  },
  live: {
    label: "Live",
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.1)",
    pulse: true,
  },
};

export function Badge({ status, className, size = "sm" }: BadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        className
      )}
      style={{ background: config.bg, color: config.color }}
    >
      <span className="relative flex h-1.5 w-1.5">
        {config.pulse && (
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full opacity-75"
            animate={{ scale: [1, 2.5], opacity: [0.75, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            style={{ background: config.color }}
          />
        )}
        <span
          className="relative inline-flex rounded-full h-1.5 w-1.5"
          style={{ background: config.color }}
        />
      </span>
      {config.label}
    </span>
  );
}
