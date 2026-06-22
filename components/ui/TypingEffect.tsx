"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypingEffectProps {
  phrases: readonly string[] | string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
  cursorClassName?: string;
}

export function TypingEffect({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseTime = 2000,
  className = "",
  cursorClassName = "",
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentPhrase = phrases[phraseIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentPhrase.length) {
            setDisplayText(currentPhrase.slice(0, displayText.length + 1));
          } else {
            setIsPaused(true);
            setTimeout(() => {
              setIsPaused(false);
              setIsDeleting(true);
            }, pauseTime);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className={`ml-0.5 inline-block w-0.5 h-[1em] rounded-full ${cursorClassName}`}
        style={{ background: "var(--gold-light)" }}
      />
    </span>
  );
}
