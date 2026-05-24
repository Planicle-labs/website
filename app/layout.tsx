import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Axion Studio — Premium Design & Digital Agency",
  description: "We craft digital experiences for brands ready to dominate their category online. Strategy-led creatives delivering results in digital and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans text-gray-900 bg-[#EFEFEF]">
        {children}
      </body>
    </html>
  );
}
