import Image from "next/image";
import { BRAND, IMG } from "@/data/data";

type LogoProps = { className?: string; priority?: boolean; light?: boolean };

/* Brand logo */
export function Logo({ className = "w-[170px]", priority = false, light = false }: LogoProps) {
  return <Image src={light ? IMG.logoLight : IMG.logo} alt={BRAND.name} width={900} height={231} unoptimized priority={priority} className={`h-auto ${className}`} />;
}
