"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { BRAND, contactHref, HEADER, HEADING_FONT_CLASS, NAV_CTA, NAV_LINKS, PAGE_CONTAINER, PAGE_GUTTER } from "@/data/data";
import { ArrowRightIcon, MailIcon, PhoneIcon } from "@/lib/icons";
import { Logo } from "./Logo";
import { Stagger, StaggerItem } from "./Motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Drawer animation */
const drawer: Variants = {
  closed: { x: "-100%", transition: { duration: 0.35, ease: EASE } },
  open: {
    x: 0,
    transition: { duration: 0.45, ease: EASE, when: "beforeChildren", staggerChildren: 0.045, delayChildren: 0.08 },
  },
};

const drawerItem: Variants = {
  closed: { opacity: 0, x: -18, transition: { duration: 0.15 } },
  open: { opacity: 1, x: 0, transition: { duration: 0.38, ease: EASE } },
};

/* Menu button icon */
const Burger = ({ open }: { open: boolean }) => (
  <span className="relative block h-[16px] w-[20px]" aria-hidden="true">
    <motion.span className="absolute left-0 top-0 h-[2px] w-full origin-center rounded bg-current" animate={open ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }} transition={{ duration: 0.35, ease: EASE }} />
    <motion.span className="absolute left-0 top-[7px] h-[2px] w-full rounded bg-current" animate={open ? { opacity: 0, scaleX: 0.2 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.25 }} />
    <motion.span className="absolute bottom-0 left-0 h-[2px] w-full origin-center rounded bg-current" animate={open ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }} transition={{ duration: 0.35, ease: EASE }} />
  </span>
);

type NavBarContentProps = {
  sticky: boolean;
  active: string;
  open: boolean;
  onLogoClick: () => void;
  onCtaClick: () => void;
  onToggle: () => void;
};

/* Shared navbar bar */
function NavBarContent({ sticky, active, open, onLogoClick, onCtaClick, onToggle }: NavBarContentProps) {
  return (
    <div
      className={`relative flex h-[58px] ${PAGE_CONTAINER} items-center justify-between gap-4 rounded-[20px] border px-3 backdrop-blur-xl transition-all duration-300 sm:h-[66px] sm:px-4 lg:h-[72px] lg:px-5 2xl:h-[78px] ${
        sticky || open
          ? "border-[#7ee0e6]/25 bg-[#04191e]/90 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.68),inset_0_1px_0_rgba(255,255,255,0.14)]"
          : "border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.09)_0%,rgba(13,44,50,0.48)_100%)] shadow-[0_18px_48px_-18px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.15)]"
      }`}
    >
      {/* Top highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-14 -top-px h-px bg-gradient-to-r from-transparent via-[#7ee0e6]/45 to-transparent"
      />

      <motion.a
        href="#home"
        aria-label={HEADER.homeAriaLabel}
        onClick={onLogoClick}
        whileHover={{ scale: 1.02 }}
        className="relative z-10 block shrink-0"
      >
        <Logo light priority={!sticky} className="w-[152px] sm:w-[176px] xl:w-[200px]" />
      </motion.a>

      <nav className="hidden xl:block" aria-label={HEADER.navAriaLabel}>
        {sticky ? (
          <ul className="flex items-center gap-5 xl:gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={`relative block whitespace-nowrap py-1 text-[14.5px] font-medium tracking-[0.01em] transition-colors duration-300 ${
                      isActive ? "text-[#7ee0e6]" : "text-white/85 hover:text-[#7ee0e6] active:text-[#7ee0e6]"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <Stagger immediate stagger={0.055} delay={0.12} className="flex items-center gap-5 xl:gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <StaggerItem key={link.id}>
                  <a
                    href={link.href}
                    className={`relative block whitespace-nowrap py-1 text-[14.5px] font-medium tracking-[0.01em] transition-colors duration-300 ${
                      isActive ? "text-[#7ee0e6]" : "text-white/85 hover:text-[#7ee0e6] active:text-[#7ee0e6]"
                    }`}
                  >
                    {link.label}
                  </a>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </nav>

      <div className="relative z-10 flex items-center gap-3">
        <a
          href={NAV_CTA.href}
          onClick={onCtaClick}
          className="group hidden h-[38px] items-center gap-2 rounded-full border border-[#7ee0e6]/45 bg-[linear-gradient(180deg,rgba(78,196,204,0.34)_0%,rgba(22,102,110,0.52)_100%)] px-5 text-[14px] font-medium text-white shadow-[0_0_24px_rgba(79,227,214,0.32),inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[#7ee0e6]/75 hover:bg-[linear-gradient(180deg,rgba(92,214,222,0.44)_0%,rgba(26,120,128,0.62)_100%)] hover:shadow-[0_0_34px_rgba(79,227,214,0.52)] active:scale-[0.97] active:border-[#7ee0e6]/75 active:bg-[linear-gradient(180deg,rgba(92,214,222,0.44)_0%,rgba(26,120,128,0.62)_100%)] sm:inline-flex lg:h-[42px] lg:px-6 lg:text-[14.5px] 2xl:h-[46px]"
        >
          {NAV_CTA.label}
          <ArrowRightIcon size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1" />
        </a>
        <motion.button
          type="button"
          aria-label={open ? HEADER.closeMenuLabel : HEADER.openMenuLabel}
          aria-expanded={open}
          whileTap={{ scale: 0.92 }}
          onClick={onToggle}
          className={`grid size-10 place-items-center rounded-full border transition-colors duration-300 xl:hidden ${
            open
              ? "border-[#7ee0e6]/60 bg-[#14b8a6]/30 text-white"
              : "border-white/20 bg-white/10 text-white hover:border-[#7ee0e6]/50 active:border-[#7ee0e6]/60 active:bg-[#14b8a6]/25"
          }`}
        >
          <Burger open={open} />
        </motion.button>
      </div>
    </div>
  );
}

export function Navbar() {
  const reduce = useReducedMotion();
  const [pastHome, setPastHome] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  /* Reveal sticky navbar after hero scrolls out */
  useEffect(() => {
    const checkPastHome = () => {
      const homeEl = document.getElementById("home");
      if (!homeEl) {
        setPastHome(window.scrollY > 500);
        return;
      }
      setPastHome(homeEl.getBoundingClientRect().bottom <= 0);
    };
    checkPastHome();
    window.addEventListener("scroll", checkPastHome, { passive: true });
    window.addEventListener("resize", checkPastHome, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkPastHome);
      window.removeEventListener("resize", checkPastHome);
    };
  }, []);

  /* Active section observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActive(entry.target.id === "contact" ? "#home" : `#${entry.target.id}`);
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.href.slice(1));
      if (el) observer.observe(el);
    });
    const contactEl = document.getElementById("contact");
    if (contactEl) observer.observe(contactEl);
    return () => observer.disconnect();
  }, []);

  /* Lock scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleLogoClick = () => setOpen(false);
  const handleCtaClick = () => setActive("#home");
  const handleToggle = () => setOpen((v) => !v);

  return (
    <>
      {/* Hero header (scrolls away with page) */}
      <motion.header
        aria-hidden={pastHome}
        initial={reduce ? false : { y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: EASE }}
        className={`absolute inset-x-0 top-0 z-40 ${PAGE_GUTTER} pt-3 sm:pt-4 xl:pt-5`}
      >
        <NavBarContent
          sticky={false}
          active={active}
          open={open}
          onLogoClick={handleLogoClick}
          onCtaClick={handleCtaClick}
          onToggle={handleToggle}
        />
      </motion.header>

      {/* Sticky navbar (drops in from top after home hero) */}
      <AnimatePresence>
        {pastHome && (
          <motion.header
            key="sticky-navbar"
            initial={reduce ? { opacity: 0 } : { y: "-115%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: "-115%", opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className={`fixed inset-x-0 top-0 z-50 ${PAGE_GUTTER} pt-3 sm:pt-4 xl:pt-5`}
          >
            <NavBarContent
              sticky
              active={active}
              open={open}
              onLogoClick={handleLogoClick}
              onCtaClick={handleCtaClick}
              onToggle={handleToggle}
            />
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[55] bg-black/55 backdrop-blur-[3px] xl:hidden"
              aria-hidden="true"
            />
            <motion.aside
              key="mobile-drawer"
              variants={drawer}
              initial="closed"
              animate="open"
              exit="closed"
              aria-label={HEADER.mobileNavAriaLabel}
              className="fixed inset-y-0 left-0 z-[60] flex w-[min(82vw,320px)] flex-col overflow-y-auto overscroll-contain border-r border-[#7ee0e6]/25 bg-[linear-gradient(180deg,#052128_0%,#04191e_55%,#020d10_100%)] px-4 pb-6 pt-5 text-white shadow-[24px_0_60px_-16px_rgba(0,0,0,0.75)] xl:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <a href="#home" onClick={() => setOpen(false)} aria-label={HEADER.homeAriaLabel}>
                  <Logo light className="w-[150px]" />
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={HEADER.closeNavLabel}
                  className="grid size-9 place-items-center rounded-full border border-white/15 bg-white/8 text-white transition active:scale-95 active:border-[#7ee0e6]/60"
                >
                  <Burger open />
                </button>
              </div>

              <nav aria-label={HEADER.mobileNavAriaLabel} className="mt-5 flex flex-1 flex-col">
                <ul className="space-y-2">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = active === link.href;
                    return (
                      <motion.li key={link.id} variants={drawerItem}>
                        <a
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`group flex items-center gap-3 rounded-xl border px-3.5 py-2.5 backdrop-blur transition duration-300 active:scale-[0.98] ${
                            isActive
                              ? "border-[#7ee0e6]/55 bg-white/12 text-[#7ee0e6]"
                              : "border-white/10 bg-white/[0.04] text-white/90 hover:border-[#7ee0e6]/35 active:border-[#7ee0e6]/50 active:bg-white/10"
                          }`}
                        >
                          <span
                            className={`grid size-7 shrink-0 place-items-center rounded-lg text-[11.5px] font-bold tabular-nums transition-colors ${
                              isActive ? "bg-[#14b8a6] text-white" : "bg-white/10 text-[#7ee0e6]"
                            }`}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className={`${HEADING_FONT_CLASS} flex-1 text-[16px] font-semibold leading-tight`}>
                            {link.label}
                          </span>
                          <ArrowRightIcon size={16} className="text-white/55 transition-transform duration-300 group-active:translate-x-1" />
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>

                <motion.a
                  variants={drawerItem}
                  href={NAV_CTA.href}
                  onClick={() => {
                    setActive("#home");
                    setOpen(false);
                  }}
                  className="mt-5 inline-flex h-[46px] w-full items-center justify-center gap-2.5 rounded-full border border-[#7ee0e6]/45 bg-[linear-gradient(180deg,rgba(78,196,204,0.36)_0%,rgba(22,102,110,0.58)_100%)] text-[15px] font-medium text-white shadow-[0_0_24px_rgba(79,227,214,0.3)] active:scale-[0.98]"
                >
                  {NAV_CTA.label}
                  <ArrowRightIcon size={17} />
                </motion.a>

                <motion.div variants={drawerItem} className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
                  <a
                    href={contactHref("phone", BRAND.phone)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] py-2.5 text-[13.5px] font-medium active:scale-[0.97] active:border-[#7ee0e6]/50"
                  >
                    <PhoneIcon size={16} className="text-[#7ee0e6]" />
                    {HEADER.quickActions.callLabel}
                  </a>
                  <a
                    href={contactHref("mail", BRAND.email)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] py-2.5 text-[13.5px] font-medium active:scale-[0.97] active:border-[#7ee0e6]/50"
                  >
                    <MailIcon size={16} className="text-[#7ee0e6]" />
                    {HEADER.quickActions.emailLabel}
                  </a>
                </motion.div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
