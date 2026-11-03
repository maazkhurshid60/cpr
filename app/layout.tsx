import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Reveal from "./components/Reveal";
import { JsonLd } from "./components/ui";
import { SITE } from "@/lib/site";
import { COURSES } from "@/lib/courses";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-montserrat", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "CPR, First Aid & BLS Classes in Los Angeles County | DRZ Emergency Response Training",
    template: "%s | DRZ Emergency Response Training",
  },
  description:
    "American Heart Association CPR, First Aid, AED and BLS classes in Los Angeles County. Small classes, blended options and onsite group training for workplaces.",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    images: [{ url: "/images/hero.webp", width: 1600, height: 1067, alt: "Students practicing CPR on manikins" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0b1b36",
};

/** The business, for Google. No street address yet (the questionnaire says
 *  "to be determined"), so it is described as a service-area business. */
const business = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  name: SITE.name,
  legalName: SITE.legalName,
  slogan: SITE.tagline,
  url: SITE.url,
  telephone: "+1-626-786-3632",
  email: SITE.email,
  image: `${SITE.url}/images/hero.webp`,
  areaServed: SITE.counties.map((c) => ({ "@type": "AdministrativeArea", name: `${c} County, CA` })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AHA training courses",
    itemListElement: COURSES.map((c) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Course", name: c.name, url: `${SITE.url}/courses/${c.slug}` },
    })),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Reveal />
        <JsonLd data={business} />
      </body>
    </html>
  );
}
