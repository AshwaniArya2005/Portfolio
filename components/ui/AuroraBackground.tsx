"use client";

import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showRadial?: boolean;
}

export function AuroraBackground({
  children,
  className,
  showRadial = true,
}: AuroraBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Aurora blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Primary gold blob */}
        <div
          className="aurora-blob absolute"
          style={{
            width: "60vw",
            height: "60vw",
            maxWidth: "800px",
            maxHeight: "800px",
            top: "-20%",
            left: "-10%",
            background: "radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)",
            animationDelay: "0s",
          }}
        />
        {/* Copper blob */}
        <div
          className="aurora-blob absolute"
          style={{
            width: "50vw",
            height: "50vw",
            maxWidth: "700px",
            maxHeight: "700px",
            top: "30%",
            right: "-15%",
            background: "radial-gradient(circle, var(--copper-glow) 0%, transparent 70%)",
            animationDelay: "-4s",
          }}
        />
        {/* Accent blob */}
        <div
          className="aurora-blob absolute"
          style={{
            width: "40vw",
            height: "40vw",
            maxWidth: "500px",
            maxHeight: "500px",
            bottom: "10%",
            left: "30%",
            background: "radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)",
            animationDelay: "-2s",
            opacity: 0.6,
          }}
        />
        {/* Small accent */}
        <div
          className="aurora-blob absolute"
          style={{
            width: "30vw",
            height: "30vw",
            maxWidth: "400px",
            maxHeight: "400px",
            bottom: "-5%",
            left: "10%",
            background: "radial-gradient(circle, var(--copper-glow) 0%, transparent 70%)",
            animationDelay: "-6s",
          }}
        />
      </div>

      {/* Radial gradient overlay for depth */}
      {showRadial && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, var(--gold-glow) 0%, transparent 100%)",
          }}
        />
      )}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {children}
    </div>
  );
}
