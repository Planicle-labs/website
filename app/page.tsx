'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import ProcessSection from '@/components/ProcessSection';

// Dynamically load browser-only Shader overlay to prevent hydration issues
const HeroShader = dynamic(() => import('@/components/HeroShader'), { ssr: false });

export default function Home() {
  return (
    <main className="w-full flex-col min-h-screen relative overflow-x-clip selection:bg-[#EF4A2A] selection:text-white">
      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 1: HERO (Full viewport height) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen h-screen flex flex-col justify-between bg-[#F4F3EF] overflow-hidden">
        {/* Animated Shader Overlay */}
        <HeroShader />

        {/* Floating Custom Navigation Header */}
        <Navbar />

        {/* Hero Content (z-20) */}
        <div className="flex-1 flex flex-col justify-end w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20 z-20 relative pointer-events-auto">
          {/* Label tag */}
          <div className="inline-flex mb-6 sm:mb-8">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-[#EF4A2A] border border-[#EF4A2A]/20 px-3.5 py-1.5 rounded-full uppercase select-none">
              BUILT FOR FOUNDERS
            </span>
          </div>

          {/* Headline H1 */}
          <h1 className="font-serif text-[clamp(2.25rem,6.5vw,5rem)] font-normal leading-[1.05] tracking-tight text-[#0C0C0E] max-w-5xl">
            Accelerate your time <br className="hidden sm:block" />
            <span className="italic font-light text-[#EF4A2A]">to market.</span>
          </h1>

          {/* Body Copy */}
          <p className="font-sans text-[15px] sm:text-[17px] text-[#797872] max-w-[65ch] leading-[1.65] mt-6 sm:mt-8">
            We build premium websites, apps, and advanced digital systems for startups who value absolute execution. No hand-holding, no templates. Just clean code and rapid market dominance.
          </p>

          {/* CTA Row */}
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-4 items-center">
            {/* Primary CTA (BOOK A CALL ») */}
            <a
              href="#"
              className="group inline-flex items-center bg-[#EF4A2A] hover:bg-[#d63b1c] text-white rounded-full pl-6 pr-2 py-2.5 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] shadow-lg shadow-[#EF4A2A]/10"
            >
              <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-widest mr-4 relative overflow-hidden h-[18px]">
                <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1/2">
                  <span className="h-[18px] flex items-center">BOOK A CALL</span>
                  <span className="h-[18px] flex items-center">BOOK A CALL</span>
                </span>
              </span>
              <span className="w-8 h-8 sm:w-9 sm:h-9 bg-white text-[#EF4A2A] rounded-full flex items-center justify-center text-[12px] font-bold transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-45">
                »
              </span>
            </a>

            {/* Secondary CTA (SEE THE WORK) */}
            <a
              href="#"
              className="group inline-flex items-center border border-[#797872]/30 hover:border-[#0C0C0E] text-[#0C0C0E] rounded-full pl-6 pr-2 py-2.5 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
            >
              <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-widest mr-4 relative overflow-hidden h-[18px]">
                <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1/2">
                  <span className="h-[18px] flex items-center">SEE THE WORK</span>
                  <span className="h-[18px] flex items-center">SEE THE WORK</span>
                </span>
              </span>
              <span className="w-8 h-8 sm:w-9 sm:h-9 bg-[#0C0C0E] text-white rounded-full flex items-center justify-center text-[12px] font-bold transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-45">
                ›
              </span>
            </a>
          </div>

          {/* Minimalist Metrics Bar */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-[#797872]/15 w-full flex flex-wrap gap-x-12 gap-y-6">
            <div className="flex flex-col select-none">
              <span className="font-mono text-[10px] text-[#A09F9A] tracking-widest uppercase">ENGINEERED YTD</span>
              <span className="font-serif text-[17px] sm:text-[18px] font-bold text-[#0C0C0E] mt-1">14 elite products</span>
            </div>
            <div className="flex flex-col select-none">
              <span className="font-mono text-[10px] text-[#A09F9A] tracking-widest uppercase">VELOCITY STATE</span>
              <span className="font-serif text-[17px] sm:text-[18px] font-bold text-[#0C0C0E] mt-1">6 weeks average ship</span>
            </div>
            <div className="flex flex-col select-none">
              <span className="font-mono text-[10px] text-[#A09F9A] tracking-widest uppercase">FOUNDER RANGE</span>
              <span className="font-serif text-[17px] sm:text-[18px] font-bold text-[#0C0C0E] mt-1">Seed to Series B</span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 2: INTERACTIVE PROCESS (Light grey background) */}
      {/* ──────────────────────────────────────────────────────── */}
      <ProcessSection />
    </main>
  );
}
