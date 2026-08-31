import type { Metadata } from "next";
import { headers } from "next/headers";
import { Rubik, IBM_Plex_Sans_Hebrew, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/data/site";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rubik",
  display: "swap",
});

const plex = IBM_Plex_Sans_Hebrew({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://formulainfra.co.il"),
  title: {
    default: `${site.name} — ${site.taglineHe}`,
    template: `%s | ${site.name}`,
  },
  description:
    "פורמולה תשתיות היא חברת החזקות בתחום התשתיות מקבוצת פורמולה מערכות, המאגדת שמונה חברות המכסות את מחזור החיים המלא של פרויקט תשתית — מידע, תכנון הנדסי וביצוע.",
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: site.name,
  },
  robots: { index: true, follow: true },
};

/**
 * Reading the request headers here opts the whole tree into per-request
 * rendering, which is what lets Next.js stamp its inline bootstrap scripts
 * with the CSP nonce issued in `src/middleware.ts`. Without it the pages
 * render statically, the nonce never reaches the HTML, and a `strict-dynamic`
 * policy blocks Next's own scripts - the site loads but never hydrates.
 */
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await headers();

  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} ${plex.variable} ${plexMono.variable}`}>
      <head>
        <noscript>
          {/* the scroll-reveal utility starts hidden; without JS it must not stay that way */}
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:right-3 focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          דילוג לתוכן המרכזי
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
