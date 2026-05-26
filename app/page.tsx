"use client";

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import ProcessSection from '@/components/ProcessSection';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/ServicesSection';
import { useBooking } from '@/components/BookingProvider';

// Dynamically load browser-only Shader overlay to prevent hydration issues
const HeroShader = dynamic(() => import("@/components/HeroShader"), {
  ssr: false,
});

export default function Home() {
  const { openBooking } = useBooking();

  return (
    <main className="w-full flex-col min-h-screen relative overflow-x-clip selection:bg-[#EF4A2A] selection:text-white">
      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 1: HERO (Full viewport height) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen h-screen flex flex-col justify-between bg-n-100 overflow-hidden">
        {/* Animated Shader Overlay */}
        <HeroShader />

        {/* Floating Custom Navigation Header */}
        <Navbar />

        {/* Hero Content (z-20) */}
        <div className="flex-1 flex flex-col justify-center w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 z-20 relative pointer-events-auto">
          {/* Headline H1 */}
          <h1 className="font-serif text-[clamp(2.25rem,6.5vw,5rem)] font-normal leading-[1.05] tracking-[-0.03em] text-n-700 max-w-5xl">
            Accelerate your time <br className="hidden sm:block" />
            <span className="italic font-light text-brand-orange">to market.</span>
          </h1>

          {/* Body Copy */}
          <p className="font-sans text-[15px] sm:text-[17px] text-n-500 max-w-[65ch] leading-[1.65] mt-6 sm:mt-8">
            We build premium websites, apps, and advanced digital systems for
            startups who value absolute execution. No hand-holding, no
            templates. Just clean code and rapid market dominance.
          </p>

          {/* CTA Row */}
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-4 items-center">
            {/* Primary CTA (BOOK A CALL ») */}
            <button
              onClick={openBooking}
              className="group inline-flex items-center bg-brand-orange hover:bg-brand-orange/95 hover:scale-[1.02] text-white rounded-full pl-6 pr-2 py-3 sm:py-2.5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] shadow-lg shadow-brand-orange/10 hover:shadow-brand-orange/20 cursor-pointer border-none outline-none"
            >
              <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-widest mr-4 relative overflow-hidden h-[18px]">
                <span className="flex flex-col transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                  <span className="h-[18px] flex items-center">
                    BOOK A CALL
                  </span>
                  <span className="h-[18px] flex items-center">
                    BOOK A CALL
                  </span>
                </span>
              </span>
              <span className="w-9 h-9 sm:w-9 sm:h-9 bg-white text-brand-orange rounded-full flex items-center justify-center text-[13px] sm:text-[12px] font-bold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
                »
              </span>
            </button>

            {/* Secondary CTA (OUR SERVICES) */}
            <a
              href="#services"
              className="group inline-flex items-center border border-n-500/30 hover:border-n-700 hover:scale-[1.02] text-n-700 rounded-full pl-6 pr-2 py-3 sm:py-2.5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]"
            >
              <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-widest mr-4 relative overflow-hidden h-[18px]">
                <span className="flex flex-col transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                  <span className="h-[18px] flex items-center">
                    OUR SERVICES
                  </span>
                  <span className="h-[18px] flex items-center">
                    OUR SERVICES
                  </span>
                </span>
              </span>
              <span className="w-9 h-9 sm:w-9 sm:h-9 bg-n-700 text-white rounded-full flex items-center justify-center text-[13px] sm:text-[12px] font-bold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
                ›
              </span>
            </a>
          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      <ProcessSection />

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 3: SERVICES BENTO GRID (Dark canvas) */}
      {/* ──────────────────────────────────────────────────────── */}
      <ServicesSection />
      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 3: PREMIUM CLOSING CTA / FOOTER                 */}
      {/* ──────────────────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
