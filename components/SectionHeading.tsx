import { HEADING_FONT_CLASS, HEADING_TEXT_MT, HEADING_TITLE_MT } from "@/data/data";
import { Stagger, StaggerItem } from "./Motion";

/* Shared typography */
export const TITLE_SIZE = "text-[clamp(1.6rem,3.3vw,2.85rem)] leading-[1.22]";
export const BODY_SIZE = "text-[14.5px] leading-[1.7] sm:text-[15.5px] xl:text-[16.5px] xl:leading-[28px]";

/* Pill badge */
export function Chip({ children, dark = false, className = "" }: { children: string; dark?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] sm:text-[13px] ${dark ? "bg-white/10 text-[#7ff0d6] ring-1 ring-white/20" : "bg-[#e3f5f1] text-[#0b7f78] ring-1 ring-[#0f8f84]/20"} ${className}`}>
      <span className="relative flex size-2">
        <span className={`absolute inline-flex size-full animate-ping rounded-full opacity-70 ${dark ? "bg-[#4fe3c1]" : "bg-[#0f8f84]"}`} />
        <span className={`relative inline-flex size-2 rounded-full ${dark ? "bg-[#4fe3c1]" : "bg-[#0f8f84]"}`} />
      </span>
      {children}
    </span>
  );
}

type SectionHeadingProps = { eyebrow: string; plain: string; accent: string; text?: string; dark?: boolean; align?: "center" | "left" };

/* Section heading */
export function SectionHeading({ eyebrow, plain, accent, text, dark = false, align = "center" }: SectionHeadingProps) {
  const center = align === "center";
  return (
    <Stagger stagger={0.1} className={center ? "text-center" : ""}>
      <StaggerItem>
        <Chip dark={dark}>{eyebrow}</Chip>
      </StaggerItem>
      <StaggerItem>
        <h2 className={`${HEADING_FONT_CLASS} ${HEADING_TITLE_MT} font-semibold tracking-[-0.015em] ${dark ? "text-white" : "text-[#0b2b4b]"} ${TITLE_SIZE}`}>
          {plain} <span className={dark ? "text-[#4fe3c1]" : "text-[#0f8f84]"}>{accent}</span>
        </h2>
      </StaggerItem>
      {text && (
        <StaggerItem>
          <p className={`${HEADING_TEXT_MT} max-w-[760px] ${center ? "mx-auto" : ""} ${dark ? "text-white/75" : "text-[#4a5b6b]"} ${BODY_SIZE}`}>{text}</p>
        </StaggerItem>
      )}
    </Stagger>
  );
}
