import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const make = (paths: ReactNode) =>
  function Icon({ size = 20, ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
        {paths}
      </svg>
    );
  };

const makeFilled = (paths: ReactNode) =>
  function Icon({ size = 20, ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
        {paths}
      </svg>
    );
  };

/* Pharma icons */
const PillIcon = make(<><rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-45 12 12)" /><path d="M9.5 9.5l5 5" /></>);
const CapsuleIcon = make(<><rect x="3" y="8" width="18" height="8" rx="4" /><path d="M12 8v8M6.5 10.5v3" /></>);
const SyringeIcon = make(<path d="M18.5 2.5l3 3M17 4l3 3-9.5 9.5-4 1 1-4zM6 18l-3 3M12 8l2 2M9.5 10.5l2 2" />);
const DropIcon = make(<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11zM9 14.5a3 3 0 0 0 3 3" />);
const FlaskIcon = make(<><path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3" /><path d="M7.5 15h9" /></>);
const MicroscopeIcon = make(<><path d="M6 18h12M8 21h8M10 3l4 2-3 7-4-2z" /><path d="M13.5 11.5A5 5 0 0 1 12 20" /></>);
const DnaIcon = make(<><path d="M6 3c0 6 12 6 12 12s-12 6-12 6M18 3c0 6-12 6-12 12s12 6 12 6" /><path d="M8 7.5h8M7.5 12h9M8 16.5h8" /></>);
const ShieldIcon = make(<><path d="M12 3l7.5 2.8v5.7c0 4.6-3.1 8-7.5 9.5-4.4-1.5-7.5-4.9-7.5-9.5V5.8z" /><path d="M8.8 12l2.2 2.2 4.2-4.4" /></>);
const FactoryIcon = make(<><path d="M3 21V10l6 4V10l6 4V6h3l1 15zM3 21h18M8 17h2M13 17h2" /></>);
const TruckIcon = make(<><path d="M2 6h11v10H2zM13 9h4.5l3 3.5V16H13M5.5 19a1.8 1.8 0 1 0 0-.01M16.5 19a1.8 1.8 0 1 0 0-.01" /></>);
const GlobeIcon = make(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>);
const AwardIcon = make(<><circle cx="12" cy="9" r="5.5" /><path d="M9 14l-1.5 7 4.5-2.5 4.5 2.5L15 14" /></>);
const UsersIcon = make(<><circle cx="12" cy="8" r="3" /><circle cx="5.5" cy="10" r="2.2" /><circle cx="18.5" cy="10" r="2.2" /><path d="M7 19c0-3 2.4-5 5-5s5 2 5 5M2.5 17c0-2 1.3-3.4 3-3.7M21.5 17c0-2-1.3-3.4-3-3.7" /></>);
const LeafIcon = make(<><path d="M20 4C10 4 5 8.5 5 14.5c0 1 .2 1.8.5 2.5C6.5 18 8 19 10 19c6 0 10-5 10-15z" /><path d="M4 21c2-6 5-9 9-11" /></>);
const CheckCircleIcon = make(<><circle cx="12" cy="12" r="9" /><path d="M8 12.3l2.7 2.7L16 9.5" /></>);
const PinIcon = make(<><path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>);

/* UI icons */
export const PhoneIcon = make(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />);
export const MailIcon = make(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>);
export const ArrowRightIcon = make(<path d="M5 12h14M13 6l6 6-6 6" />);
export const ArrowLeftIcon = make(<path d="M19 12H5M11 6l-6 6 6 6" />);
export const ArrowUpIcon = make(<path d="M12 19V5M6 11l6-6 6 6" />);
export const ArrowUpRightIcon = make(<path d="M7 17L17 7M8 7h9v9" />);
export const ChevronRightIcon = make(<path d="M9 6l6 6-6 6" />);
export const QuoteIcon = makeFilled(<path d="M4 18v-6c0-4 2-7 6-8l.6 1.6C8.6 6.4 8 8 8 9.5h2.5V18zm9 0v-6c0-4 2-7 6-8l.6 1.6c-2 .8-2.6 2.4-2.6 3.9H20V18z" />);
export const StarIcon = makeFilled(<path d="M12 2.8l2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.3l-5.7 3 1.1-6.3L2.8 9.5l6.4-.9z" />);

/* Social icons */
export const FacebookIcon = makeFilled(<path d="M13.5 21v-8h2.7l.5-3.2h-3.2V7.8c0-.9.4-1.7 1.8-1.7h1.5V3.3A18 18 0 0 0 14.2 3C11.7 3 10 4.5 10 7.3v2.5H7.2V13H10v8z" />);
export const InstagramIcon = make(<><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="0.8" fill="currentColor" /></>);
export const LinkedinIcon = makeFilled(<path d="M5 9h3v10H5zM6.5 4.2a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM10 9h2.9v1.4c.5-.9 1.6-1.7 3.2-1.7 3 0 3.9 1.9 3.9 4.6V19h-3v-5c0-1.3-.3-2.3-1.6-2.3S13 12.7 13 14v5h-3z" />);
export const YoutubeIcon = makeFilled(<path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z" />);

const ICONS = {
  pill: PillIcon,
  capsule: CapsuleIcon,
  syringe: SyringeIcon,
  drop: DropIcon,
  flask: FlaskIcon,
  microscope: MicroscopeIcon,
  dna: DnaIcon,
  shield: ShieldIcon,
  factory: FactoryIcon,
  truck: TruckIcon,
  globe: GlobeIcon,
  award: AwardIcon,
  users: UsersIcon,
  leaf: LeafIcon,
  check: CheckCircleIcon,
  pin: PinIcon,
  phone: PhoneIcon,
  mail: MailIcon,
} as const;

type IconName = keyof typeof ICONS;

export function NamedIcon({ name, ...props }: IconProps & { name: string }) {
  const Icon = ICONS[name as IconName] ?? PillIcon;
  return <Icon {...props} />;
}
