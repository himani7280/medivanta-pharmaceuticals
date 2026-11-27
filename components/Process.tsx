"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { HEADING_FONT_CLASS, HEADING_TO_CONTENT, HOME } from "@/data/data";
import { NamedIcon } from "@/lib/icons";
import { Stagger, StaggerItem, TiltCard } from "./Motion";

const { steps } = HOME.process;

/* Five-step timeline */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className={`relative ${HEADING_TO_CONTENT}`}>
      <span className="absolute left-[44px] top-6 h-[calc(100%-3rem)] w-[3px] rounded bg-[#0b2b4b]/10 lg:left-[10%] lg:top-[45px] lg:h-[3px] lg:w-[80%]" aria-hidden="true" />
      <motion.span style={{ scaleY: fill }} className="absolute left-[44px] top-6 h-[calc(100%-3rem)] w-[3px] origin-top rounded bg-[linear-gradient(180deg,#0f8f84,#1db37a)] lg:hidden" aria-hidden="true" />
      <motion.span style={{ scaleX: fill }} className="absolute left-[10%] top-[45px] hidden h-[3px] w-[80%] origin-left rounded bg-[linear-gradient(90deg,#0f8f84,#1db37a)] lg:block" aria-hidden="true" />

      <Stagger stagger={0.11} className="grid gap-8 lg:grid-cols-5 lg:gap-5">
        {steps.map((step, i) => (
          <StaggerItem key={step.id} className="relative grid grid-cols-[90px_1fr] items-start gap-4 lg:block lg:text-center">
            <div className="relative z-10 lg:mx-auto lg:w-fit">
              <span className="relative grid size-[90px] place-items-center rounded-full bg-white shadow-[0_18px_34px_-14px_rgba(15,143,132,0.7)] ring-4 ring-[#e3f5f1]">
                <span className="grid size-[70px] place-items-center rounded-full bg-[linear-gradient(135deg,#0f8f84,#1db37a)] text-white">
                  <NamedIcon name={step.icon} size={40} />
                </span>
                <span className="absolute -right-1 -top-1 grid size-7 place-items-center rounded-full bg-[#0b2b4b] text-[12px] font-bold text-white">
                  {i + 1}
                </span>
              </span>
            </div>
            <div className="lg:mt-6">
              <TiltCard max={6} className="rounded-2xl">
                <div className="rounded-2xl bg-white p-4 shadow-[0_16px_32px_-22px_rgba(11,43,75,0.55)] ring-1 ring-[#0b2b4b]/8 sm:p-5">
                  <h3 className={`${HEADING_FONT_CLASS} text-[19px] font-semibold leading-[1.3] text-[#0b2b4b]`}>
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-[1.6] text-[#4a5b6b]">{step.text}</p>
                </div>
              </TiltCard>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
