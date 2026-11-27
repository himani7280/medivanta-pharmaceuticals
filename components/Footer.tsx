import { BRAND, contactHref, FOOTER, HEADING_FONT_CLASS, PAGE_CONTAINER, PAGE_GUTTER, type NavLink } from "@/data/data";
import { ChevronRightIcon, FacebookIcon, InstagramIcon, LinkedinIcon, NamedIcon, YoutubeIcon } from "@/lib/icons";
import { Logo } from "./Logo";
import { Float, Stagger, StaggerItem, StaggerList, StaggerListItem } from "./Motion";

const SOCIAL_ICONS = { facebook: FacebookIcon, instagram: InstagramIcon, youtube: YoutubeIcon, linkedin: LinkedinIcon } as const;

const Heading = ({ children }: { children: string }) => (
  <>
    <h3 className={`${HEADING_FONT_CLASS} text-[19px] font-semibold leading-[1.3] text-white`}>
      {children}
    </h3>
    <span className="mt-2 block h-[3px] w-11 rounded bg-[linear-gradient(90deg,#14b8a6,#7ee0e6)]" />
  </>
);

const LinkList = ({ links }: { links: NavLink[] }) => (
  <StaggerList stagger={0.05} className="mt-3.5 flex flex-col gap-1.5">
    {links.map((link) => (
      <StaggerListItem key={link.id}>
        <a href={link.href} className="group inline-flex items-center gap-2 text-[14.5px] leading-[1.5] text-white/75 transition-colors hover:text-[#7ee0e6] active:text-[#7ee0e6]">
          <ChevronRightIcon size={15} strokeWidth={2} className="shrink-0 text-[#7ee0e6] transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1" />
          {link.label}
        </a>
      </StaggerListItem>
    ))}
  </StaggerList>
);

const ContactRow = ({ icon, value }: { icon: string; value: string }) => (
  <StaggerListItem className="group flex items-start gap-3">
    <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-[#7ee0e6] transition duration-300 group-hover:-translate-y-0.5 group-hover:border-[#7ee0e6]/50 group-hover:bg-[#14b8a6]/30 group-hover:text-white group-active:-translate-y-0.5 group-active:border-[#7ee0e6]/50 group-active:bg-[#14b8a6]/30 group-active:text-white">
      <NamedIcon name={icon} size={18} />
    </span>
    <a
      href={contactHref(icon, value)}
      {...(icon === "pin" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="pt-1 text-[14.5px] leading-[1.45] text-white/80 transition-colors hover:text-[#7ee0e6] active:text-[#7ee0e6]"
    >
      {value}
    </a>
  </StaggerListItem>
);

export function Footer() {
  return (
    <div className="bg-white">
      <footer
        id="footer"
        className="relative overflow-hidden rounded-t-[32px] border-t border-[#7ee0e6]/30 bg-[#04191e] text-white shadow-[0_-20px_50px_-28px_rgba(4,25,30,0.45)] sm:rounded-t-[48px] xl:rounded-t-[60px]"
      >
        {/* Top rim glow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[2px] w-[min(62%,540px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#7ee0e6] to-transparent shadow-[0_0_24px_rgba(126,224,230,0.85)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_52%_42%_at_50%_0%,rgba(78,196,204,0.22)_0%,transparent_72%),linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(13,44,50,0.42)_100%)]"
        />

        <div className={`relative ${PAGE_GUTTER} pb-[clamp(1.1rem,2.4svh,1.75rem)] pt-[clamp(1.75rem,4svh,3.25rem)]`}>
          <div className={PAGE_CONTAINER}>
            <Stagger stagger={0.12} className="mx-auto grid max-w-[1160px] items-stretch gap-8 md:grid-cols-[0.78fr_1.44fr_0.92fr] lg:gap-8">
              {/* Quick links */}
              <StaggerItem>
                <Heading>{FOOTER.quickLinksTitle}</Heading>
                <LinkList links={FOOTER.quickLinks} />
              </StaggerItem>

              {/* Logo & socials */}
              <StaggerItem className="flex flex-col items-center justify-center gap-4 text-center">
                <Float amount={4} duration={5}>
                  <Logo light className="mx-auto w-[clamp(220px,24vw,430px)] max-w-full" />
                </Float>
                <Stagger stagger={0.07} className="flex items-center justify-center gap-3">
                  {FOOTER.socials.map((social) => {
                    const Icon = SOCIAL_ICONS[social.key as keyof typeof SOCIAL_ICONS] ?? FacebookIcon;
                    return (
                      <StaggerItem key={social.id}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="grid size-10 place-items-center rounded-full border border-[#7ee0e6]/30 bg-white/[0.05] text-white transition duration-300 hover:-translate-y-1 hover:scale-110 hover:border-[#7ee0e6]/70 hover:bg-[#14b8a6]/35 hover:shadow-[0_0_20px_rgba(79,227,214,0.35)] active:scale-95 active:border-[#7ee0e6]/70 active:bg-[#14b8a6]/35 active:shadow-[0_0_20px_rgba(79,227,214,0.35)]"
                        >
                          <Icon size={18} />
                        </a>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </StaggerItem>

              {/* Contact */}
              <StaggerItem className="md:max-w-[320px] md:justify-self-end">
                <Heading>{FOOTER.contactTitle}</Heading>
                <StaggerList stagger={0.08} className="mt-3.5 space-y-3">
                  <ContactRow icon="pin" value={BRAND.address} />
                  <ContactRow icon="phone" value={BRAND.phone} />
                  <ContactRow icon="mail" value={BRAND.email} />
                </StaggerList>
              </StaggerItem>
            </Stagger>

            <div className="mt-[clamp(1.25rem,3svh,2.25rem)] border-t border-white/12 pt-[clamp(0.85rem,1.8svh,1.25rem)] text-center text-[13.5px] text-white/70 sm:text-[14.5px]">
              <p>
                {FOOTER.copyright}{" "}
                <span className="mx-1.5 text-white/30" aria-hidden="true">|</span>
                <span className="font-medium text-[#7ee0e6]">{FOOTER.designedBy}</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
