"use client";

import { animate, motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* Clip-path image reveal */
export function ImageReveal({
  children,
  className,
  from = "left",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  from?: "left" | "right" | "bottom";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const hidden = { left: "inset(0% 100% 0% 0%)", right: "inset(0% 0% 0% 100%)", bottom: "inset(100% 0% 0% 0%)" }[from];
  const variants: Variants = {
    hidden: { clipPath: hidden, scale: 1.08 },
    show: { clipPath: "inset(0% 0% 0% 0%)", scale: 1, transition: { duration: 1.2, delay, ease: EASE } },
  };
  return (
    <motion.div className={className} initial={reduce ? "show" : "hidden"} whileInView="show" viewport={{ once: true, margin: "-80px" }}>
      <motion.div className="relative size-full" variants={variants}>
        {children}
      </motion.div>
    </motion.div>
  );
}

const makeStaggerParent = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  stagger?: number;
  delay?: number;
  immediate?: boolean;
};

/* Stagger container */
export function Stagger({ children, className, id, stagger = 0.09, delay = 0, immediate = false }: StaggerProps) {
  const reduce = useReducedMotion();
  const variants = makeStaggerParent(stagger, delay);

  if (immediate) {
    return (
      <motion.div id={id} className={className} variants={variants} initial={reduce ? "show" : "hidden"} animate="show">
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      variants={variants}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <motion.div className={className} style={style} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/* Stagger list */
export function StaggerList({ children, className, stagger = 0.08, delay = 0 }: Omit<StaggerProps, "id" | "immediate">) {
  const reduce = useReducedMotion();
  return (
    <motion.ul
      className={className}
      variants={makeStaggerParent(stagger, delay)}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.ul>
  );
}

export function StaggerListItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.li className={className} variants={staggerChild}>
      {children}
    </motion.li>
  );
}

/* Floating animation */
export function Float({ children, className, amount = 12, duration = 6, delay = 0 }: { children: ReactNode; className?: string; amount?: number; duration?: number; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} animate={reduce ? undefined : { y: [0, -amount, 0] }} transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}>
      {children}
    </motion.div>
  );
}

/* Scroll progress bar */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[linear-gradient(90deg,#0f8f84,#1db37a)]" />;
}

/* Count-up number */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 1.8, ease: EASE, onUpdate: (v) => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}

/* Scroll 3D tilt */
export function ScrollTilt({ children, className, angle = 16 }: { children: ReactNode; className?: string; angle?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [angle, 0, 0, -angle]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.92, 1, 1, 0.92]);
  if (reduce) return <div ref={ref} className={className}>{children}</div>;
  return (
    <motion.div ref={ref} style={{ rotateX, scale, transformPerspective: 900 }} className={className}>
      {children}
    </motion.div>
  );
}

/* Tilt card */
export function TiltCard({ children, className = "", max = 10, glare = true }: { children: ReactNode; className?: string; max?: number; glare?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 170, damping: 16 });
  const sry = useSpring(ry, { stiffness: 170, damping: 16 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const gOpacity = useMotionValue(0);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.5), transparent 58%)`;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    gx.set(px * 100);
    gy.set(py * 100);
    gOpacity.set(1);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
    gOpacity.set(0);
  };

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onPointerUp={reset}
      whileHover={{ scale: 1.02 }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
      {glare && <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]" style={{ background: glareBg, opacity: gOpacity }} />}
    </motion.div>
  );
}

/* 3D spin */
export function Spin3D({ children, className, duration = 7 }: { children: ReactNode; className?: string; duration?: number }) {
  const reduce = useReducedMotion();
  return (
    <div className={`[perspective:700px] ${className ?? ""}`}>
      <motion.div animate={reduce ? undefined : { rotateY: [0, 360] }} transition={{ duration, repeat: Infinity, ease: "linear" }} className="[transform-style:preserve-3d]">
        {children}
      </motion.div>
    </div>
  );
}
