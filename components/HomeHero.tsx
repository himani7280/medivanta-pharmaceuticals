"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HEADING_FONT_CLASS, HOME, IMG, PAGE_CONTAINER, PAGE_GUTTER } from "@/data/data";
import { ArrowRightIcon } from "@/lib/icons";
import { EASE, Stagger, StaggerItem } from "./Motion";

const { hero } = HOME;

/* Floating motes */
const MOTES = [
  { id: "hero-mote-1", className: "left-[44%] top-[24%] size-[4px]", delay: 0, duration: 7 },
  { id: "hero-mote-2", className: "left-[51%] top-[32%] size-[3px]", delay: 1.2, duration: 6 },
  { id: "hero-mote-3", className: "left-[56%] top-[19%] size-[5px]", delay: 0.6, duration: 8 },
  { id: "hero-mote-4", className: "left-[48%] top-[45%] size-[3px]", delay: 2.1, duration: 7.5 },
  { id: "hero-mote-5", className: "left-[61%] top-[28%] size-[4px]", delay: 1.7, duration: 6.5 },
  { id: "hero-mote-6", className: "left-[38%] top-[34%] size-[2.5px]", delay: 0.9, duration: 8.5 },
] as const;

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[380px] w-full items-center overflow-hidden bg-[#020c0e] text-white sm:min-h-[460px] md:min-h-[540px] lg:min-h-[clamp(600px,100svh,1040px)]"
    >
      {/* Hero backdrop */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { scale: 1.045, opacity: 0.85 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <Image
          src={IMG[hero.image]}
          alt={hero.imageAlt}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[76%_60%] sm:object-[72%_60%] lg:object-[right_62%]"
        />
      </motion.div>

      {/* Left vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,#020b0d_0%,rgba(2,12,14,0.92)_28%,rgba(2,12,14,0.48)_50%,rgba(2,12,14,0.08)_74%,transparent_100%)] max-lg:bg-[linear-gradient(90deg,rgba(2,11,13,0.94)_0%,rgba(2,12,14,0.72)_52%,rgba(2,12,14,0.22)_100%)]"
      />

      {/* Teal rim glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_54%_38%_at_64%_0%,rgba(74,205,212,0.2)_0%,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(2,11,13,0.26)_0%,transparent_24%,transparent_80%,rgba(2,11,13,0.42)_100%)]"
      />

      {/* Floating particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
        {MOTES.map((mote) => (
          <motion.span
            key={mote.id}
            animate={reduce ? undefined : { y: [0, -14, 0], opacity: [0.18, 0.55, 0.18] }}
            transition={{ duration: mote.duration, delay: mote.delay, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute rounded-full bg-[#8be9ee] blur-[0.6px] ${mote.className}`}
          />
        ))}
      </div>

      {/* Hero copy */}
      <div className={`relative z-10 w-full ${PAGE_GUTTER} pb-10 pt-24 sm:pb-12 sm:pt-28 lg:pb-[clamp(2.5rem,6svh,5rem)] lg:pt-[clamp(6.5rem,14svh,9.5rem)]`}>
        <div className={PAGE_CONTAINER}>
          <Stagger immediate stagger={0.14} delay={0.12} className="max-w-[740px]">
            <h1
              className={`${HEADING_FONT_CLASS} text-[clamp(2rem,8.2vw,2.9rem)] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[clamp(2.5rem,5.4vw,4.7rem)]`}
            >
              <StaggerItem className="block whitespace-nowrap">
                <span className="text-white">{hero.line1Plain} </span>
                <span className="text-[#7ee0e6]">{hero.line1Accent}</span>
              </StaggerItem>
              <StaggerItem className="block whitespace-nowrap">
                <span className="text-white">{hero.line2Plain} </span>
                <span className="text-[#7ee0e6]">{hero.line2Accent}</span>
              </StaggerItem>
            </h1>

            <StaggerItem className="mt-6 sm:mt-8 lg:mt-10">
              <a
                href={hero.primary.href}
                className="group inline-flex h-[48px] items-center gap-2.5 rounded-full border border-[#7ee0e6]/45 bg-[linear-gradient(180deg,rgba(56,158,166,0.3)_0%,rgba(16,74,80,0.48)_100%)] px-7 text-[15px] font-medium text-white shadow-[0_0_28px_rgba(79,227,214,0.28),inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[#7ee0e6]/75 hover:bg-[linear-gradient(180deg,rgba(70,180,188,0.42)_0%,rgba(22,96,104,0.6)_100%)] hover:shadow-[0_0_38px_rgba(79,227,214,0.5)] active:scale-[0.98] active:border-[#7ee0e6]/75 active:bg-[linear-gradient(180deg,rgba(70,180,188,0.42)_0%,rgba(22,96,104,0.6)_100%)] active:shadow-[0_0_38px_rgba(79,227,214,0.5)] sm:h-[52px] sm:px-8 sm:text-[16px]"
              >
                {hero.primary.label}
                <ArrowRightIcon size={22} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1" />
              </a>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
