import type { Metadata, Viewport } from "next";
import { Archivo_Black, Space_Grotesk, Space_Mono } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Interactions } from "@/components/Interactions";
import { SITE } from "@/lib/site";
import "./globals.css";

// Three subset WOFF2 files; only the display face is preloaded.
const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo-black",
});
const body = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-space-grotesk",
});
const mono = Space_Mono({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Stackd — Get paid. Skip the boring bit.",
    template: "%s · Stackd",
  },
  description: SITE.description,
  alternates: {
    types: { "application/rss+xml": [{ url: "/rss.xml", title: "Stackd changelog" }] },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Stackd — Get paid. Skip the boring bit.",
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF4E0",
  colorScheme: "light",
};

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="nb-skip nb-btn nb-btn--sm">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <Interactions />
        {plausibleDomain ? (
          <Script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        ) : null}
      </body>
    </html>
  );
}
