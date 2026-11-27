import raw from "./data.json";

/* Site data, fonts, layout tokens, and contact helpers */
const medivanta = raw.MediVanta;
const template = medivanta.templateComponents["template-1"];
const sections = medivanta.sections;

export type NavLink = {
  id: string;
  label: string;
  href: string;
};

type PageComponentSlot = {
  key: string;
  component: string;
};

type SectionMap = typeof sections;
type SectionKey = keyof SectionMap;

function resolvePageVariant<K extends SectionKey>(slots: PageComponentSlot[], key: K) {
  const slot = slots.find((item) => item.key === key);
  const variants = sections[key].variants as unknown as Record<
    string,
    SectionMap[K]["variants"][keyof SectionMap[K]["variants"]]
  >;
  if (slot && slot.component in variants) {
    return variants[slot.component];
  }
  return variants[Object.keys(variants)[0]];
}

const headerVariantKey = template.shared.Header as keyof typeof sections.SiteChromeContent.variants;
const footerVariantKey = template.shared.Footer as keyof typeof sections.SiteChromeContent.variants;
const HEADER_CHROME = sections.SiteChromeContent.variants[headerVariantKey];
const FOOTER_CHROME = sections.SiteChromeContent.variants[footerVariantKey];

/* Fonts */
export const FONTS_HREF = medivanta.fonts.stylesheet;
export const BODY_FONT_CLASS = medivanta.fonts.classes.body;
export const HEADING_FONT_CLASS = medivanta.fonts.classes.heading;
export const MONO_FONT_CLASS = medivanta.fonts.classes.mono;

/* Template & chrome */
export const HOME_COMPONENTS: PageComponentSlot[] = template.pages.home.components;
export const SITE_METADATA = HEADER_CHROME.metadata;
export const BRAND = HEADER_CHROME.brand;
export const HEADER = HEADER_CHROME.header;
export const NAV_LINKS: NavLink[] = HEADER_CHROME.header.navLinks;
export const NAV_CTA = HEADER_CHROME.header.cta;
export const FOOTER = FOOTER_CHROME.footer;
export const SCROLL_TO_TOP = FOOTER_CHROME.scrollToTop;
export const IMG: Record<string, string> = sections.Media.variants.MediVantaImages1.images;

/* Home page content */
export const HOME = {
  hero: resolvePageVariant(HOME_COMPONENTS, "Hero"),
  about: resolvePageVariant(HOME_COMPONENTS, "About"),
  products: resolvePageVariant(HOME_COMPONENTS, "Products"),
  process: resolvePageVariant(HOME_COMPONENTS, "HowItWorks"),
  research: resolvePageVariant(HOME_COMPONENTS, "Research"),
  quality: resolvePageVariant(HOME_COMPONENTS, "Quality"),
  partners: resolvePageVariant(HOME_COMPONENTS, "Partners"),
  contact: resolvePageVariant(HOME_COMPONENTS, "Contact"),
};

/* Layout grid & spacing */
export const PAGE_MAX_WIDTH = 1560;
export const PAGE_GUTTER = "px-2.5 sm:px-4 xl:px-6";
export const PAGE_CONTAINER = "mx-auto w-full max-w-[1560px]";
export const PAGE_SECTION_TOP = "pt-[clamp(3rem,6.5svh,5.5rem)]";
export const PAGE_SECTION_Y = "py-[clamp(3rem,6.5svh,5.5rem)]";
export const HEADING_TO_CONTENT = "mt-[clamp(1.75rem,4svh,3.5rem)]";
export const HEADING_TITLE_MT = "mt-[clamp(0.65rem,1.5svh,1.15rem)]";
export const HEADING_TEXT_MT = "mt-[clamp(0.65rem,1.6svh,1.25rem)]";

/* Contact link helper */
export const contactHref = (icon: string, value: string) => {
  if (icon === "phone") return `tel:${value.replace(/[^\d+]/g, "")}`;
  if (icon === "mail") return `mailto:${value}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
};
