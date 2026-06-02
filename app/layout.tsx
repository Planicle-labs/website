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
  title: "Planicle — Software Studio for Startups",
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
    title: "Planicle — Software Studio for Startups",
    description: "We build premium websites, apps, and AI workflows for high-growth Seed to Series B startups. Precision engineering, absolute execution, no hand-holding.",
    url: "https://planicle.com",
    siteName: "Planicle",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Planicle — Software Studio for Startups",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Planicle — Software Studio for Startups",
    description: "We build premium websites, apps, and AI workflows for high-growth Seed to Series B startups. Precision engineering, absolute execution, no hand-holding.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
      </body>
    </html>
  );
}

