import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/Motion";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BODY_FONT_CLASS, FONTS_HREF, SITE_METADATA } from "@/data/data";

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full max-w-full scroll-smooth scroll-pt-[104px] overflow-x-clip antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS_HREF} />
      </head>
      <body
        className={`${BODY_FONT_CLASS} relative flex min-h-full flex-col overflow-x-clip bg-white text-[15px] leading-[1.7] text-[#0b2b4b] [text-rendering:optimizeLegibility] selection:bg-[#0f8f84] selection:text-white [&_:focus-visible]:rounded-md [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-2 [&_:focus-visible]:outline-[#14b8a6] [&_a]:[-webkit-tap-highlight-color:transparent] [&_button]:[-webkit-tap-highlight-color:transparent]`}
      >
        <ScrollProgress />
        <Navbar />
        <main className="min-w-0 w-full flex-1 overflow-x-clip">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
