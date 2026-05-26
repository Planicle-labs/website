import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans, JetBrains_Mono, Antonio, Cormorant_Garamond } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Planicle — Elite Software Studio for Startups",
  description: "We build premium websites, apps, and AI workflows for high-growth Seed to Series B startups. Precision engineering, absolute execution, no hand-holding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} ${antonio.variable} ${cormorantGaramond.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans text-[#0C0C0E] bg-[#F4F3EF]">
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  );
}

