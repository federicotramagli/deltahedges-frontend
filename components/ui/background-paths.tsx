"use client";

import React from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BackgroundPathsProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

function FloatingPaths({
  position,
  className,
}: {
  position: number;
  className?: string;
}) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className={cn("h-full w-full", className)} viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.012}
            initial={{ pathLength: 0.3, opacity: 0.45 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.5, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  title = "Deploy prop pairs in the cloud",
  description = "Collega challenge e broker una sola volta, lascia DeltaHedge gestire il runtime e monitora risk, phase progress e PnL da un’unica dashboard.",
  primaryLabel = "Apri la dashboard",
  secondaryLabel = "Vedi come funziona",
  onPrimaryClick,
  onSecondaryClick,
}: BackgroundPathsProps) {
  const words = title.split(" ");

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#05070b]">
      <div className="absolute inset-0">
        <FloatingPaths position={1} className="text-[#22335f]" />
        <FloatingPaths position={-1} className="text-[#22335f]" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(39,61,115,0.24),transparent_32%)]" />

      <div className="relative z-10 container mx-auto px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          className="mx-auto max-w-5xl"
        >
          <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs uppercase tracking-[0.32em] text-zinc-400 backdrop-blur-md">
            DeltaHedge Cloud Engine
          </div>

          <h1 className="mb-8 text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="mr-4 inline-block last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-balance text-lg leading-8 text-zinc-400 sm:text-xl">
            {description}
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              type="button"
              size="lg"
              className="min-w-52 rounded-2xl border border-white/10 bg-white text-black shadow-lg shadow-white/10 hover:bg-white/90"
              onClick={onPrimaryClick}
            >
              {primaryLabel}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="min-w-52 rounded-2xl border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
              onClick={onSecondaryClick}
            >
              {secondaryLabel}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
