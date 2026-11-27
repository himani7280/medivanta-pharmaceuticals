"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { HEADING_FONT_CLASS, HEADING_TITLE_MT, HOME, IMG, MONO_FONT_CLASS, PAGE_CONTAINER, PAGE_GUTTER, PAGE_MAX_WIDTH } from "@/data/data";
import { ArrowUpRightIcon, NamedIcon } from "@/lib/icons";
import { Stagger, StaggerItem, TiltCard } from "./Motion";
import { Photo } from "./Photo";
import { Chip, TITLE_SIZE } from "./SectionHeading";

const { products } = HOME;
const { items } = products;

/* Horizontal products rail */
export function ProductsRail() {
  const ref = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [max, setMax] = useState(0);
  const [edgePad, setEdgePad] = useState(24);

  useEffect(() => {
    let rafId = 0;
    const measure = () => {
      const vp = viewportRef.current;
      const track = trackRef.current;
      if (!vp || !track) return;
      const w = vp.clientWidth;
      const pad = w >= 1280 ? Math.max(24, (w - PAGE_MAX_WIDTH) / 2) : w >= 640 ? 16 : 10;
      setEdgePad(pad);
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (trackRef.current && viewportRef.current) {
          setMax(Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth));
        }
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(p, [0.02, 0.98], [0, -max]);
  const bar = useTransform(p, [0, 1], [0, 1]);
  const current = useTransform(p, (v) => String(Math.min(items.length, Math.floor(v * items.length) + 1)).padStart(2, "0"));

  const handleEnquireClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      const top = Math.max(0, contactEl.getBoundingClientRect().top + window.scrollY - 96);
      window.scrollTo({ top, behavior: "smooth" });
      window.history.replaceState(null, "", "#contact");
    }
  };

  return (
    <section
      id="products"
      ref={ref}
      className="relative h-[340svh] bg-[radial-gradient(ellipse_at_80%_15%,#0c4d54_0%,#05222c_48%,#020e14_100%)] text-white sm:h-[380svh] lg:h-[420svh]"
    >
      <div
        ref={viewportRef}
        className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden pb-[clamp(1rem,2.4svh,2rem)] pt-[clamp(4.6rem,9.5svh,6.4rem)]"
      >
        <div className={`w-full shrink-0 ${PAGE_GUTTER}`}>
          <div className={`${PAGE_CONTAINER} flex items-end justify-between gap-6`}>
            <Stagger stagger={0.1}>
              <StaggerItem>
                <Chip dark>{products.eyebrow}</Chip>
              </StaggerItem>
              <StaggerItem>
                <h2 className={`${HEADING_FONT_CLASS} ${HEADING_TITLE_MT} max-w-[900px] font-semibold tracking-[-0.015em] ${TITLE_SIZE}`}>
                  {products.titlePlain} <span className="text-[#7ee0e6]">{products.titleAccent}</span>
                </h2>
              </StaggerItem>
            </Stagger>
            <p className={`${MONO_FONT_CLASS} hidden shrink-0 text-right text-[12px] uppercase tracking-[0.2em] text-white/60 sm:block`}>
              <motion.span className="text-[30px] font-semibold leading-none text-[#4fe3c1] xl:text-[34px]">{current}</motion.span>
              <span className="block">/ {String(items.length).padStart(2, "0")}</span>
            </p>
          </div>
        </div>

        <div className="mt-3 flex min-h-0 flex-1 items-center sm:mt-4 [perspective:1500px]">
          <motion.div
            ref={trackRef}
            style={{ x, paddingLeft: edgePad, paddingRight: edgePad }}
            className="flex h-full w-max items-center"
          >
            <Stagger stagger={0.08} className="flex h-full w-max items-center gap-4 sm:gap-6">
            {items.map((item, i) => (
              <StaggerItem key={item.id} className="flex h-full shrink-0 items-center">
              <TiltCard max={6} glare={false} className="shrink-0">
                <article
                  tabIndex={0}
                  className="group relative h-[clamp(260px,48svh,480px)] max-h-[calc(100svh-14.5rem)] w-[min(78vw,300px)] overflow-hidden rounded-2xl border border-[#7ee0e6]/20 bg-[#06222c] shadow-[0_24px_50px_-24px_rgba(0,0,0,0.75)] outline-none sm:h-[clamp(320px,54svh,520px)] sm:max-h-[calc(100svh-15rem)] sm:w-[325px] lg:h-[clamp(350px,56svh,550px)] lg:w-[355px] 2xl:w-[400px]"
                >
                  <Photo
                    src={IMG[item.image]}
                    alt={item.title}
                    sizes="(min-width: 1280px) 365px, (min-width: 640px) 330px, 74vw"
                    className="group-hover:scale-110 group-active:scale-110 group-focus-within:scale-110"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,14,20,0.42)_0%,transparent_38%,rgba(2,14,20,0.72)_78%,rgba(2,14,20,0.92)_100%)] transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_32%,rgba(2,18,24,0.94)_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100"
                    aria-hidden="true"
                  />
                  <span className={`${HEADING_FONT_CLASS} pointer-events-none absolute right-4 top-3 text-[52px] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(126,224,230,0.65)] sm:text-[66px]`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className={`${MONO_FONT_CLASS} pointer-events-none absolute left-4 top-4 rounded-full bg-[linear-gradient(135deg,#0f8f84,#1db37a)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_20px_-8px_rgba(20,184,166,0.9)]`}>
                    {item.category}
                  </p>

                  {/* Card caption */}
                  <div className="absolute inset-x-0 bottom-0 z-30 p-3.5 sm:p-5">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <NamedIcon
                        name={item.icon}
                        size={32}
                        className="shrink-0 text-[#4fe3c1] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-[-8deg] group-active:-translate-y-0.5 group-active:rotate-[-8deg] sm:size-9"
                      />
                      <h3 className={`${HEADING_FONT_CLASS} text-[20px] font-semibold leading-tight tracking-[-0.015em] sm:text-[26px]`}>
                        {item.title}
                      </h3>
                    </div>

                    <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-active:grid-rows-[1fr] group-active:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                      <div className="overflow-hidden">
                        <p className="mt-1.5 max-w-[310px] text-[12.5px] leading-[1.45] text-white/85 sm:mt-2.5 sm:text-[14px] sm:leading-[1.55]">
                          {item.text}
                        </p>
                        <a
                          href={products.ctaHref}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={handleEnquireClick}
                          className="relative z-30 mt-2.5 inline-flex cursor-pointer items-center gap-2 border-b border-[#4fe3c1] pb-0.5 text-[13px] font-semibold text-[#4fe3c1] transition-[gap,color] duration-300 hover:gap-3 hover:text-[#7ee0e6] active:gap-3 active:text-[#7ee0e6] sm:mt-3.5 sm:text-[14px]"
                        >
                          {products.ctaLabel}
                          <ArrowUpRightIcon size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </TiltCard>
              </StaggerItem>
            ))}
            </Stagger>
          </motion.div>
        </div>

        <div className={`mt-4 w-full shrink-0 ${PAGE_GUTTER} sm:mt-5`}>
          <div className={`${PAGE_CONTAINER} h-[3px] overflow-hidden rounded-full bg-white/15`}>
            <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-[linear-gradient(90deg,#14b8a6,#7ee0e6)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
