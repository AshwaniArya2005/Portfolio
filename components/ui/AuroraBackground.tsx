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
        {/* Primary violet blob */}
        <div
          className="aurora-blob absolute"
          style={{
            width: "60vw",
            height: "60vw",
            maxWidth: "800px",
            maxHeight: "800px",
            top: "-20%",
            left: "-10%",
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.18) 0%, transparent 70%)",
            animationDelay: "0s",
          }}
        />
        {/* Cyan blob */}
        <div
          className="aurora-blob absolute"
          style={{
            width: "50vw",
            height: "50vw",
            maxWidth: "700px",
            maxHeight: "700px",
            top: "30%",
            right: "-15%",
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
            animationDelay: "-4s",
          }}
        />
        {/* Pink accent blob */}
        <div
          className="aurora-blob absolute"
          style={{
            width: "40vw",
            height: "40vw",
            maxWidth: "500px",
            maxHeight: "500px",
            bottom: "10%",
            left: "30%",
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
            animationDelay: "-2s",
          }}
        />
        {/* Small violet accent */}
        <div
          className="aurora-blob absolute"
          style={{
            width: "30vw",
            height: "30vw",
            maxWidth: "400px",
            maxHeight: "400px",
            bottom: "-5%",
            left: "10%",
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
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
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 100%)",
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
