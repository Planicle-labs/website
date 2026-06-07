import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans, JetBrains_Mono, Antonio, Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";
import BookingProvider from "@/components/BookingProvider";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-antonio",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://planicle.com"),
  title: "Planicle Labs — Software Studio for Startups",
  description: "We build premium websites, apps, and AI workflows for high-growth Seed to Series B startups. Precision engineering, absolute execution, no hand-holding.",
  keywords: [
    "software studio",
    "software studio for startups",
    "startup development",
    "mvp builders",
    "web application development",
    "ai workflows",
    "delhi developers",
    "software agency india"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Planicle Labs — Software Studio for Startups",
    description: "We build premium websites, apps, and AI workflows for high-growth Seed to Series B startups. Precision engineering, absolute execution, no hand-holding.",
    url: "https://planicle.com",
    siteName: "Planicle Labs",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Planicle Labs — Software Studio for Startups",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Planicle Labs — Software Studio for Startups",
    description: "We build premium websites, apps, and AI workflows for high-growth Seed to Series B startups. Precision engineering, absolute execution, no hand-holding.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://planicle.com/#organization",
      name: "Planicle Labs",
      url: "https://planicle.com",
      logo: {
        "@type": "ImageObject",
        url: "https://planicle.com/logo.svg",
        width: 512,
        height: 512,
      },
      description:
        "We build premium websites, apps, and AI workflows for high-growth Seed to Series B startups. Precision engineering, absolute execution, no hand-holding.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "New Delhi",
        addressRegion: "DL",
        addressCountry: "IN",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@planicle.com",
        areaServed: "IN",
        availableLanguage: ["English"],
      },
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "PostgreSQL",
        "AI workflows",
        "Large language models",
        "MVP development",
        "Web application development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://planicle.com/#website",
      url: "https://planicle.com",
      name: "Planicle Labs",
      inLanguage: "en-IN",
      publisher: { "@id": "https://planicle.com/#organization" },
    },
    {
      "@type": "Service",
      "@id": "https://planicle.com/#service-product-systems",
      serviceType: "Product Systems",
      name: "Product Systems",
      description:
        "Bespoke web applications, high-performance APIs, and custom database architecture built with zero tech debt.",
      provider: { "@id": "https://planicle.com/#organization" },
      areaServed: { "@type": "Country", name: "India" },
      category: "Software Development",
    },
    {
      "@type": "Service",
      "@id": "https://planicle.com/#service-ai-workflows",
      serviceType: "AI Workflow Engineering",
      name: "AI Workflow Engineering",
      description:
        "Custom LLM integrations, semantic search pipelines, and autonomous agent systems that automate operational drag.",
      provider: { "@id": "https://planicle.com/#organization" },
      areaServed: { "@type": "Country", name: "India" },
      category: "AI & Automation",
    },
    {
      "@type": "Service",
      "@id": "https://planicle.com/#service-growth-infrastructure",
      serviceType: "Growth Infrastructure",
      name: "Growth Infrastructure",
      description:
        "High-conversion landing pages, custom analytics pipelines, and speed-optimized onboarding flows engineered to convert.",
      provider: { "@id": "https://planicle.com/#organization" },
      areaServed: { "@type": "Country", name: "India" },
      category: "Growth Engineering",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} ${antonio.variable} ${cormorantGaramond.variable} ${spaceGrotesk.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans text-[#0C0C0E] bg-[#F4F3EF]">
        <BookingProvider>
          {children}
        </BookingProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

