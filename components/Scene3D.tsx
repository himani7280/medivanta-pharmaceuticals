"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* 3D double helix */
export function Helix3D({
  className,
  rungs = 15,
  gap = 22,
  radius = 46,
  scrollSpin = false,
  light = true,
}: {
  className?: string;
  rungs?: number;
  gap?: number;
  radius?: number;
  scrollSpin?: boolean;
  light?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 620]);
  const width = radius * 2 + 24;
  const rungItems = Array.from({ length: rungs }, (_, idx) => ({ id: `helix-rung-${idx + 1}`, index: idx }));

  return (
    <div ref={ref} className={`[perspective:900px] ${className ?? ""}`} style={{ width, height: rungs * gap }}>
      <motion.div
        className="relative size-full [transform-style:preserve-3d]"
        style={{ rotateY: scrollSpin && !reduce ? scrollRotate : undefined }}
        animate={!scrollSpin && !reduce ? { rotateY: 360 } : undefined}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {rungItems.map((rung) => (
          <div
            key={rung.id}
            className="absolute left-1/2 flex items-center [transform-style:preserve-3d]"
            style={{ top: rung.index * gap, width: radius * 2, marginLeft: -radius, transform: `rotateY(${rung.index * 27}deg)` }}
          >
            <span className="size-[11px] shrink-0 rounded-full bg-[#2dd4bf] shadow-[0_0_14px_3px_rgba(45,212,191,0.7)]" />
            <span className={`h-px flex-1 ${light ? "bg-white/45" : "bg-[#0f8f84]/45"}`} />
            <span className="size-[11px] shrink-0 rounded-full bg-[#86efac] shadow-[0_0_14px_3px_rgba(134,239,172,0.7)]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
