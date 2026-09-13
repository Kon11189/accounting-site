import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { SITE } from "@/data/site";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: `${SITE.name} — бухгалтерия для бизнеса в Беларуси`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "бухгалтерия Беларусь",
    "ИП Беларусь",
    "ООО бухгалтерия",
    "УСН",
    "НПД",
    "налоги ИП",
    "ФСЗН",
    "Белгосстрах",
    "МНС",
    "ЭСЧФ",
    "калькулятор налогов",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_BY",
    siteName: SITE.name,
    title: `${SITE.name} — бухгалтерия для бизнеса в Беларусь`,
    description: SITE.description,
    url: `https://${SITE.domain}`,
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
  robots: { index: true, follow: true },
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: SITE.name,
  description: SITE.description,
  areaServed: "BY",
  url: `https://${SITE.domain}`,
  email: SITE.email,
  telephone: SITE.phone,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <Header />
        <main className="min-h-screen pt-[var(--header-h)]">{children}</main>
        <Footer />
        <MobileBottomNav />
        <CookieBanner />
      </body>
    </html>
  );
}
