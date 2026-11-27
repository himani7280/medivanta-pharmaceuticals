"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import { SCROLL_TO_TOP } from "@/data/data";
import { ArrowUpIcon } from "@/lib/icons";
import { EASE } from "./Motion";

const RING_RADIUS = 23;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/* Scroll-to-top button */
export function ScrollToTop() {
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 28, mass: 0.35 });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 260);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          type="button"
          onClick={scrollToTop}
          aria-label={SCROLL_TO_TOP.ariaLabel}
          title={SCROLL_TO_TOP.title}
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.35, ease: EASE }}
          whileHover={reduce ? undefined : { y: -3, scale: 1.05 }}
          whileTap={reduce ? undefined : { scale: 0.94 }}
          className="group fixed bottom-6 right-4 z-40 grid size-[54px] place-items-center rounded-full border border-[#7ee0e6]/30 bg-[#04191e]/90 text-white shadow-[0_14px_34px_-10px_rgba(0,0,0,0.75),0_0_24px_rgba(79,227,214,0.28)] backdrop-blur-xl transition-colors duration-300 hover:border-[#7ee0e6]/65 hover:shadow-[0_18px_40px_-10px_rgba(0,0,0,0.85),0_0_32px_rgba(79,227,214,0.48)] active:border-[#7ee0e6]/70 active:shadow-[0_18px_40px_-10px_rgba(0,0,0,0.85),0_0_32px_rgba(79,227,214,0.48)] sm:bottom-8 sm:right-6"
        >
          {/* Progress ring */}
          <svg
            viewBox="0 0 54 54"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 size-full -rotate-90"
          >
            <circle
              cx="27"
              cy="27"
              r={RING_RADIUS}
              fill="none"
              stroke="rgba(126, 224, 230, 0.16)"
              strokeWidth="2.5"
            />
            <motion.circle
              cx="27"
              cy="27"
              r={RING_RADIUS}
              fill="none"
              stroke="url(#scroll-top-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              style={{ pathLength: smoothProgress }}
            />
            <defs>
              <linearGradient id="scroll-top-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#7ee0e6" />
              </linearGradient>
            </defs>
          </svg>

          <ArrowUpIcon
            size={21}
            strokeWidth={2.1}
            className="relative text-[#7ee0e6] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-white group-active:-translate-y-0.5 group-active:text-white"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
