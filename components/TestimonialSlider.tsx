"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { HEADING_FONT_CLASS, HOME, IMG } from "@/data/data";
import { ArrowLeftIcon, ArrowRightIcon, QuoteIcon, StarIcon } from "@/lib/icons";
import { EASE, Float, Spin3D, Stagger, StaggerItem } from "./Motion";
import { Photo } from "./Photo";

const { items, rating, controls } = HOME.partners;
const COUNT = items.length;

/* Card deck order */
const offsetOf = (i: number, active: number) => (i - active + COUNT) % COUNT;

/* Top-right fan poses */
const POSE = [
  { x: 0, y: 0, scale: 1, rotateZ: 0 },
  { x: 0, y: 0, scale: 0.96, rotateZ: 2 },
  { x: 0, y: 0, scale: 0.92, rotateZ: 4 },
] as const;

const DECK_Z = ["z-[3]", "z-[2]", "z-[1]"] as const;

const RATING_STARS = [
  { id: "rating-star-1" },
  { id: "rating-star-2" },
  { id: "rating-star-3" },
  { id: "rating-star-4" },
  { id: "rating-star-5" },
] as const;

const Stars = () => (
  <span className="inline-flex gap-0.5 text-[#f5b301]" role="img" aria-label={rating.starsAria}>
    {RATING_STARS.map((star) => (
      <StarIcon key={star.id} size={22} />
    ))}
  </span>
);

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + COUNT) % COUNT), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => go(1), 6000);
    return () => clearInterval(timer);
  }, [paused, go]);

  const activeItem = items[index];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Stagger stagger={0.14} className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <StaggerItem className="relative min-w-0 w-full pl-3.5 pt-3.5 sm:pl-5 sm:pt-5">
          <span className="absolute left-0 top-0 size-[58%] rounded-[36px] bg-[linear-gradient(135deg,#0f8f84,#1db37a)]" aria-hidden="true" />
          <div className="group relative z-10 aspect-[4/3.7] overflow-hidden rounded-[32px] bg-[#06222c] shadow-[0_44px_70px_-34px_rgba(11,43,75,0.8)]">
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="absolute inset-0"
              >
                <Photo
                  src={IMG[activeItem.image]}
                  alt={activeItem.imageAlt}
                  sizes="(min-width: 1024px) 42vw, 94vw"
                  className="object-top group-hover:scale-105 group-active:scale-105"
                />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent_48%,rgba(7,29,54,0.72)_100%)]" aria-hidden="true" />
            <div className="absolute inset-x-4 bottom-4 z-20 flex items-center gap-3 text-white sm:inset-x-5 sm:bottom-5">
              <span className="flex -space-x-3">
                {items.map((entry, i) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`View ${entry.name}`}
                    className={`relative size-10 overflow-hidden rounded-full transition duration-300 ${
                      i === index ? "z-10 scale-110 ring-2 ring-[#4fe3c1]" : "opacity-80 ring-2 ring-white hover:opacity-100 active:scale-105 active:opacity-100"
                    }`}
                  >
                    <Photo src={IMG[entry.avatar]} alt="" sizes="40px" className="object-top" />
                  </button>
                ))}
              </span>
              <span className="min-w-0 text-[13.5px] font-semibold leading-tight">
                <span className="block truncate">{activeItem.name}</span>
                <span className="block truncate text-[12px] font-normal text-white/80">{activeItem.role}</span>
              </span>
            </div>
          </div>

          {/* Partner rating badge */}
          <Float amount={9} duration={5.5} className="absolute right-3 top-8 z-20 hidden sm:block lg:-right-3">
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_28px_44px_-18px_rgba(11,43,75,0.6)]">
              <Spin3D duration={8}>
                <span className="grid size-14 place-items-center rounded-xl bg-[linear-gradient(135deg,#f5b301,#ff8a00)] text-white">
                  <StarIcon size={34} />
                </span>
              </Spin3D>
              <span>
                <span className={`${HEADING_FONT_CLASS} block text-[24px] font-bold leading-none text-[#0b2b4b]`}>
                  {rating.score}
                </span>
                <span className="block text-[12px] font-semibold text-[#4a5b6b]">{rating.label}</span>
              </span>
            </div>
          </Float>
        </StaggerItem>

        <StaggerItem className="min-w-0 w-full">
          {/* Card deck */}
          <div className="relative grid w-full min-w-0 pt-[34px] [perspective:1400px] sm:pt-[52px]">
            {items.map((item, i) => {
              const offset = offsetOf(i, index);
              const pose = POSE[Math.min(offset, 2)];
              const deckZ = DECK_Z[Math.min(offset, 2)];
              const hidden = offset > 2;
              return (
                <motion.figure
                  key={item.id}
                  aria-hidden={offset !== 0}
                  initial={false}
                  animate={{ ...pose, opacity: hidden ? 0 : 1 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className={`relative col-start-1 row-start-1 flex min-h-[250px] min-w-0 w-full origin-top-right flex-col rounded-[26px] bg-white p-5 shadow-[0_36px_60px_-30px_rgba(11,43,75,0.65)] ring-1 ring-[#0b2b4b]/8 sm:min-h-[300px] sm:rounded-[28px] sm:p-8 ${deckZ}`}
                >
                  <span className="absolute inset-x-7 top-0 h-[4px] rounded-b bg-[linear-gradient(90deg,#0f8f84,#1db37a)] sm:inset-x-8" />
                  <motion.div initial={false} animate={{ opacity: offset === 0 ? 1 : 0 }} transition={{ duration: 0.45 }} className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-center justify-between gap-3">
                      <QuoteIcon size={36} className="shrink-0 text-[#0f8f84] sm:size-[46px]" />
                      <Stars />
                    </div>
                    <blockquote className="mt-4 break-words text-[15px] leading-[1.65] text-[#1d3447] sm:text-[18px]">{item.quote}</blockquote>
                    <figcaption className="mt-auto flex min-w-0 items-center gap-3.5 pt-5">
                      <span className="relative size-[48px] shrink-0 overflow-hidden rounded-full ring-2 ring-[#0f8f84] ring-offset-2 ring-offset-white sm:size-[54px]">
                        <Photo src={IMG[item.avatar]} alt={item.name} sizes="54px" className="object-top" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`${HEADING_FONT_CLASS} block truncate text-[16.5px] font-semibold text-[#0b2b4b] sm:text-[17.5px]`}>
                          {item.name}
                        </span>
                        <span className="block break-words text-[13px] leading-[1.4] text-[#4a5b6b] sm:text-[13.5px]">{item.role}</span>
                      </span>
                    </figcaption>
                  </motion.div>
                </motion.figure>
              );
            })}
          </div>

          <div className="mt-7 flex items-center justify-center gap-5 sm:mt-8 lg:justify-start">
            <button type="button" aria-label={controls.prevLabel} onClick={() => go(-1)} className="grid size-[48px] place-items-center rounded-full border border-[#0b2b4b]/25 text-[#0b2b4b] transition duration-300 hover:scale-110 hover:border-[#0f8f84] hover:bg-[#0f8f84] hover:text-white active:scale-95 active:border-[#0f8f84] active:bg-[#0f8f84] active:text-white sm:size-[54px]">
              <ArrowLeftIcon size={24} />
            </button>
            <div className="flex items-center gap-2.5" role="tablist" aria-label={controls.tablistLabel}>
              {items.map((entry, i) => (
                <button key={entry.id} type="button" role="tab" aria-selected={i === index} aria-label={`Show ${entry.name}`} onClick={() => setIndex(i)} className={`h-[10px] rounded-full transition-all duration-500 ${i === index ? "w-8 bg-[#0f8f84]" : "w-[10px] bg-[#0b2b4b]/20 hover:bg-[#0f8f84]/50 active:bg-[#0f8f84]/70"}`} />
              ))}
            </div>
            <button type="button" aria-label={controls.nextLabel} onClick={() => go(1)} className="grid size-[48px] place-items-center rounded-full border border-[#0b2b4b]/25 text-[#0b2b4b] transition duration-300 hover:scale-110 hover:border-[#0f8f84] hover:bg-[#0f8f84] hover:text-white active:scale-95 active:border-[#0f8f84] active:bg-[#0f8f84] active:text-white sm:size-[54px]">
              <ArrowRightIcon size={24} />
            </button>
          </div>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
