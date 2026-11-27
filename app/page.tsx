import { Fragment, type ReactNode } from "react";
import { ContactForm } from "@/components/Forms";
import { HomeHero } from "@/components/HomeHero";
import { Counter, Float, ImageReveal, ScrollTilt, Spin3D, Stagger, StaggerItem, StaggerList, StaggerListItem, TiltCard } from "@/components/Motion";
import { Photo } from "@/components/Photo";
import { Process } from "@/components/Process";
import { ProductsRail } from "@/components/ProductsRail";
import { Helix3D } from "@/components/Scene3D";
import { BODY_SIZE, Chip, SectionHeading, TITLE_SIZE } from "@/components/SectionHeading";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import {
  contactHref,
  HEADING_FONT_CLASS,
  HEADING_TEXT_MT,
  HEADING_TITLE_MT,
  HEADING_TO_CONTENT,
  HOME,
  HOME_COMPONENTS,
  IMG,
  PAGE_CONTAINER,
  PAGE_GUTTER,
  PAGE_SECTION_TOP,
  PAGE_SECTION_Y,
} from "@/data/data";
import { NamedIcon } from "@/lib/icons";

const { about, research, process, quality, partners, contact } = HOME;

const SECTION = `${PAGE_GUTTER} ${PAGE_SECTION_Y}`;
const SECTION_TOP = `${PAGE_GUTTER} ${PAGE_SECTION_TOP}`;
const CONTAINER = PAGE_CONTAINER;

const SECTION_REGISTRY: Record<string, () => ReactNode> = {
  Hero: () => <HomeHero />,

  About: () => (
    <section id="about" className={`${SECTION} bg-white`}>
      <div className={`${CONTAINER} grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16`}>
        <div className="relative w-full pb-4 pl-4 pr-4 pt-4 sm:pl-5 sm:pr-6 sm:pt-5">
          <span className="absolute left-0 top-0 size-[62%] rounded-[36px] bg-[linear-gradient(135deg,#0f8f84,#1db37a)] opacity-90" aria-hidden="true" />
          <ImageReveal from="left" className="relative z-10 aspect-[4/4.6] overflow-hidden rounded-[32px] shadow-[0_40px_70px_-34px_rgba(11,43,75,0.75)]">
            <div className="group relative size-full">
              <Photo src={IMG[about.image]} alt={about.imageAlt} sizes="(min-width: 1024px) 40vw, 90vw" className="group-hover:scale-105 group-active:scale-105" />
            </div>
          </ImageReveal>
          <Float amount={9} duration={6} className="absolute -bottom-0 right-0 z-20 w-[52%]">
            <ImageReveal from="bottom" delay={0.25} className="aspect-[4/3] overflow-hidden rounded-[26px] border-[5px] border-white bg-white shadow-[0_30px_50px_-24px_rgba(11,43,75,0.7)]">
              <div className="group relative size-full">
                <Photo src={IMG[about.inset]} alt={about.insetAlt} sizes="(min-width: 1024px) 22vw, 45vw" className="group-hover:scale-110 group-active:scale-110" />
              </div>
            </ImageReveal>
          </Float>
          <Float amount={7} duration={5} delay={0.6} className="absolute left-2 top-[52%] z-20 sm:left-3">
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_26px_44px_-18px_rgba(11,43,75,0.55)]">
              <Spin3D duration={8}>
                <span className="grid size-14 place-items-center rounded-xl bg-[linear-gradient(135deg,#0f8f84,#1db37a)] text-white">
                  <NamedIcon name="award" size={34} />
                </span>
              </Spin3D>
              <span>
                <span className="block text-[26px] font-bold leading-none text-[#0b2b4b]">
                  <Counter value={about.badge.value} suffix={about.badge.suffix} />
                </span>
                <span className="block text-[12.5px] font-semibold text-[#4a5b6b]">{about.badge.label}</span>
              </span>
            </div>
          </Float>
        </div>

        <div>
          <Stagger stagger={0.1}>
            <StaggerItem>
              <Chip>{about.eyebrow}</Chip>
            </StaggerItem>
            <StaggerItem>
              <h2 className={`${HEADING_FONT_CLASS} ${HEADING_TITLE_MT} font-semibold tracking-[-0.015em] text-[#0b2b4b] ${TITLE_SIZE}`}>
                {about.titleLine1} <span className="text-[#0f8f84]">{about.titleAccent}</span>
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className={`${HEADING_TEXT_MT} text-[#4a5b6b] ${BODY_SIZE}`}>{about.text}</p>
            </StaggerItem>
          </Stagger>
          <Stagger stagger={0.11} delay={0.1} className="mt-[clamp(1.25rem,3svh,2rem)] grid gap-4">
            {about.points.map((point) => (
              <StaggerItem key={point.id}>
                <TiltCard max={5} className="rounded-2xl">
                  <div className="group flex items-center gap-4 rounded-2xl bg-[#f2faf8] p-4 ring-1 ring-[#0f8f84]/10 transition duration-500 hover:bg-white hover:shadow-[0_22px_40px_-26px_rgba(15,143,132,0.7)] active:bg-white active:shadow-[0_22px_40px_-26px_rgba(15,143,132,0.7)] sm:p-5">
                    <span className="grid size-[68px] shrink-0 place-items-center rounded-2xl bg-white text-[#0f8f84] shadow-[0_10px_20px_-12px_rgba(11,43,75,0.5)] transition duration-500 group-hover:rotate-[-8deg] group-hover:bg-[linear-gradient(135deg,#0f8f84,#1db37a)] group-hover:text-white group-active:rotate-[-8deg] group-active:bg-[linear-gradient(135deg,#0f8f84,#1db37a)] group-active:text-white">
                      <NamedIcon name={point.icon} size={38} />
                    </span>
                    <div>
                      <h3 className={`${HEADING_FONT_CLASS} text-[19px] font-semibold leading-[1.3] text-[#0b2b4b]`}>
                        {point.title}
                      </h3>
                      <p className="mt-1 text-[14.5px] leading-[1.6] text-[#4a5b6b]">{point.text}</p>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  ),

  Products: () => <ProductsRail />,

  HowItWorks: () => (
    <section id="process" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <SectionHeading eyebrow={process.eyebrow} plain={process.titlePlain} accent={process.titleAccent} text={process.text} />
        <Process />
      </div>
    </section>
  ),

  Research: () => (
    <section id="research" className={`relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_80%_20%,#0f6a6b_0%,#0b3a58_45%,#071d36_100%)] ${SECTION} text-white`}>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_50%,#000_10%,transparent_70%)]" aria-hidden="true" />
      <div className={`${CONTAINER} grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16`}>
        <div>
          <Stagger stagger={0.1}>
            <StaggerItem>
              <Chip dark>{research.eyebrow}</Chip>
            </StaggerItem>
            <StaggerItem>
              <h2 className={`${HEADING_FONT_CLASS} ${HEADING_TITLE_MT} font-semibold tracking-[-0.015em] ${TITLE_SIZE}`}>
                {research.titleLine1} <span className="text-[#4fe3c1]">{research.titleAccent}</span>
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className={`${HEADING_TEXT_MT} text-white/75 ${BODY_SIZE}`}>{research.text}</p>
            </StaggerItem>
          </Stagger>
          <Stagger stagger={0.1} delay={0.1} className="mt-[clamp(1.25rem,3svh,2rem)] grid gap-4 sm:grid-cols-2">
            {research.items.map((item) => (
              <StaggerItem key={item.id}>
                <ScrollTilt angle={10} className="h-full">
                  <TiltCard max={8} className="h-full rounded-2xl">
                    <div className="group h-full rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur transition duration-500 hover:border-[#4fe3c1]/60 hover:bg-white/[0.12] active:border-[#4fe3c1]/60 active:bg-white/[0.12]">
                      <span className="grid size-[64px] place-items-center rounded-xl bg-[linear-gradient(135deg,#14b8a6,#1db37a)] text-white shadow-[0_14px_24px_-10px_rgba(20,184,166,0.9)] transition duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-active:rotate-[-8deg] group-active:scale-110">
                        <NamedIcon name={item.icon} size={36} />
                      </span>
                      <h3 className={`${HEADING_FONT_CLASS} mt-4 text-[19px] font-semibold leading-[1.3]`}>
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[14.5px] leading-[1.6] text-white/70">{item.text}</p>
                    </div>
                  </TiltCard>
                </ScrollTilt>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="relative mx-auto w-full max-w-[640px] pb-4 pl-4 lg:mx-0 lg:max-w-none">
          <ImageReveal from="right" className="relative aspect-[16/11] overflow-hidden rounded-[32px] shadow-[0_44px_80px_-36px_rgba(0,0,0,0.8)] ring-1 ring-white/20">
            <div className="group relative size-full">
              <Photo src={IMG[research.image]} alt={research.imageAlt} sizes="(min-width: 1024px) 45vw, 90vw" className="group-hover:scale-105 group-active:scale-105" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,43,75,0.1),rgba(15,143,132,0.28))]" aria-hidden="true" />
            </div>
          </ImageReveal>
          <Float amount={9} duration={6} className="absolute -bottom-2 left-0 z-20 w-[34%]">
            <ImageReveal from="bottom" delay={0.25} className="aspect-[3/4] overflow-hidden rounded-[24px] border-[5px] border-white/90 bg-white shadow-[0_30px_50px_-24px_rgba(0,0,0,0.7)]">
              <div className="group relative size-full">
                <Photo src={IMG[research.glass]} alt={research.glassAlt} sizes="(min-width: 1024px) 16vw, 32vw" className="group-hover:scale-110 group-active:scale-110" />
              </div>
            </ImageReveal>
          </Float>
          <div className="absolute -right-3 top-1/2 z-20 hidden -translate-y-1/2 sm:block xl:-right-6">
            <Helix3D scrollSpin rungs={14} gap={22} radius={40} />
          </div>
        </div>
      </div>
    </section>
  ),

  Quality: () => (
    <section id="quality" className={`bg-white ${PAGE_SECTION_TOP}`}>
      <div className={PAGE_GUTTER}>
        <div className={`${CONTAINER} grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-16`}>
          <ImageReveal from="left" className="relative aspect-[14/10] overflow-hidden rounded-[32px] shadow-[0_44px_70px_-36px_rgba(11,43,75,0.75)]">
            <div className="group relative size-full">
              <Photo src={IMG[quality.image]} alt={quality.imageAlt} sizes="(min-width: 1024px) 48vw, 92vw" className="group-hover:scale-105 group-active:scale-105" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(7,29,54,0.5)_100%)]" aria-hidden="true" />
            </div>
          </ImageReveal>

          <div>
            <Stagger stagger={0.1}>
              <StaggerItem>
                <Chip>{quality.eyebrow}</Chip>
              </StaggerItem>
              <StaggerItem>
                <h2 className={`${HEADING_FONT_CLASS} ${HEADING_TITLE_MT} font-semibold tracking-[-0.015em] text-[#0b2b4b] ${TITLE_SIZE}`}>
                  {quality.titleLine1} <span className="text-[#0f8f84]">{quality.titleAccent}</span>
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className={`${HEADING_TEXT_MT} text-[#4a5b6b] ${BODY_SIZE}`}>{quality.text}</p>
              </StaggerItem>
            </Stagger>
            <Stagger stagger={0.1} delay={0.1} className="mt-[clamp(1.25rem,2.8svh,1.75rem)] grid gap-3 sm:grid-cols-2">
              {quality.badges.map((badge) => (
                <StaggerItem key={badge.id}>
                  <TiltCard max={7} className="rounded-2xl">
                    <div className="group flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-[0_16px_32px_-22px_rgba(11,43,75,0.5)] ring-1 ring-[#0b2b4b]/8 transition duration-500 hover:ring-[#0f8f84]/40 active:ring-[#0f8f84]/40">
                      <span className="grid size-[70px] shrink-0 place-items-center rounded-xl bg-[#e3f5f1] text-[#0f8f84] transition duration-500 group-hover:bg-[linear-gradient(135deg,#0f8f84,#1db37a)] group-hover:text-white group-active:bg-[linear-gradient(135deg,#0f8f84,#1db37a)] group-active:text-white">
                        <NamedIcon name={badge.icon} size={42} />
                      </span>
                      <span>
                        <span className={`${HEADING_FONT_CLASS} block text-[18px] font-semibold leading-[1.3] text-[#0b2b4b]`}>
                          {badge.title}
                        </span>
                        <span className="block text-[13.5px] text-[#4a5b6b]">{badge.text}</span>
                      </span>
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>

      {/* Stats banner */}
      <div className="mt-14 w-full bg-[linear-gradient(135deg,#04191e_0%,#0b4a63_52%,#0f6a6b_100%)] shadow-[0_32px_64px_-34px_rgba(4,25,30,0.65)] xl:mt-16">
        <div className={PAGE_GUTTER}>
          <Stagger stagger={0.1} className={`${CONTAINER} grid grid-cols-2 divide-white/15 lg:grid-cols-4 lg:divide-x`}>
            {quality.stats.map((stat) => (
              <StaggerItem key={stat.id} className="px-4 py-[clamp(1.75rem,4svh,3.25rem)] text-center text-white">
                <Spin3D className="mx-auto flex w-fit text-[#4fe3c1]" duration={7}>
                  <NamedIcon name={stat.icon} size={56} />
                </Spin3D>
                <p className="mt-3.5 text-[34px] font-bold leading-none sm:text-[46px]">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-[13.5px] font-medium text-white/75 sm:text-[15px]">{stat.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  ),

  Partners: () => (
    <section id="partners" className={`${SECTION_TOP} bg-white`}>
      <div className={CONTAINER}>
        <SectionHeading eyebrow={partners.eyebrow} plain={partners.titlePlain} accent={partners.titleAccent} text={partners.text} />
        <div className={HEADING_TO_CONTENT}>
          <TestimonialSlider />
        </div>
      </div>
    </section>
  ),

  Contact: () => (
    <section id="contact" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <SectionHeading eyebrow={contact.eyebrow} plain={contact.titlePlain} accent={contact.titleAccent} text={contact.text} />

        <Stagger stagger={0.12} className={HEADING_TO_CONTENT}>
          <StaggerItem>
            <div className="grid overflow-hidden rounded-[32px] bg-white shadow-[0_44px_80px_-36px_rgba(11,43,75,0.65)] ring-1 ring-[#0b2b4b]/10 lg:grid-cols-[1.18fr_0.82fr]">
              {/* Enquiry form */}
              <div className="p-5 sm:p-7 lg:p-8 xl:p-9 2xl:p-11">
                <ContactForm />
              </div>

              {/* Direct contact */}
              <div className="relative isolate flex flex-col justify-center overflow-hidden bg-[linear-gradient(160deg,#04191e_0%,#0b4a63_58%,#0f6a6b_100%)] p-5 text-white sm:p-7 lg:p-8 xl:p-9 2xl:p-11">
                <div className="absolute inset-0 -z-10 opacity-20 mix-blend-luminosity">
                  <Photo src={IMG[contact.image]} alt={contact.imageAlt} sizes="(min-width: 1024px) 40vw, 100vw" />
                </div>
                <Stagger stagger={0.1}>
                  <StaggerItem>
                    <h3 className={`${HEADING_FONT_CLASS} text-[23px] font-semibold leading-[1.25] sm:text-[26px]`}>
                      {contact.directTitlePlain} <span className="text-[#4fe3c1]">{contact.directTitleAccent}</span>
                    </h3>
                  </StaggerItem>
                  <StaggerItem>
                    <p className="mt-2 text-[14.5px] leading-[1.6] text-white/75">{contact.text}</p>
                  </StaggerItem>
                </Stagger>
                <StaggerList stagger={0.1} delay={0.1} className="mt-5 space-y-3.5">
                  {contact.cards.map((card) => (
                    <StaggerListItem key={card.id} className="group flex items-start gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/12 text-[#4fe3c1] ring-1 ring-white/20 transition duration-300 group-hover:-translate-y-1 group-hover:bg-[#14b8a6] group-hover:text-white group-active:-translate-y-1 group-active:bg-[#14b8a6] group-active:text-white">
                        <NamedIcon name={card.icon} size={22} />
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white/60">{card.title}</h4>
                        <a
                          href={contactHref(card.icon, card.value)}
                          {...(card.icon === "pin" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="break-words text-[15.5px] leading-[1.55] text-white transition-colors hover:text-[#4fe3c1] active:text-[#4fe3c1]"
                        >
                          {card.value}
                        </a>
                      </div>
                    </StaggerListItem>
                  ))}
                </StaggerList>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  ),
};

export default function Home() {
  return (
    <>
      {HOME_COMPONENTS.map((slot) => {
        const renderSection = SECTION_REGISTRY[slot.key];
        return renderSection ? <Fragment key={`${slot.key}-${slot.component}`}>{renderSection()}</Fragment> : null;
      })}
    </>
  );
}
