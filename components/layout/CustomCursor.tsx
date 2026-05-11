"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useSpring(0, { stiffness: 800, damping: 40 });
  const mouseY = useSpring(0, { stiffness: 800, damping: 40 });
  const ringX = useSpring(0, { stiffness: 200, damping: 30 });
  const ringY = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    // Check if touch device
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      const target = e.target as Element;
      const isPointerEl =
        target.matches("a, button, [role=button], input, textarea, select, label, [tabindex]") ||
        !!target.closest("a, button, [role=button]");
      const isTextEl = target.matches("p, h1, h2, h3, h4, h5, h6, span, li") &&
        !isPointerEl;

      setIsPointer(isPointerEl);
      setIsText(isTextEl);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, ringX, ringY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Cursor dot */}
      <motion.div
        ref={cursorDot}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isClicking ? 0.5 : isPointer ? 1.5 : isText ? 0.3 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: "var(--violet-light)", boxShadow: "0 0 10px var(--violet-light)" }}
        />
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        ref={cursorRing}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isPointer ? 1.5 : isClicking ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
          borderColor: isPointer ? "var(--cyan)" : "var(--violet-light)",
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-8 h-8 rounded-full border-2 border-violet-400"
          style={{ borderColor: "var(--violet-light)" }}
        />
      </motion.div>

      {/* Spotlight glow */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="w-64 h-64 rounded-full"
          style={{
            background: isPointer
              ? "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </>
  );
}
