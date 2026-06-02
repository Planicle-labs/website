"use client";

import dynamic from 'next/dynamic';
import Navbar from './Navbar';
import { useBooking } from './BookingProvider';

const HeroShader = dynamic(() => import('./HeroShader'), {
  ssr: false,
});

export default function HeroSection() {
  const { openBooking } = useBooking();

  return (
    <section className="relative w-full min-h-dvh md:min-h-screen h-dvh md:h-screen flex flex-col justify-between bg-n-100 overflow-hidden">
      <HeroShader />
      <Navbar />

      <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left w-full max-w-[1280px] mx-auto px-fluid-x pb-12 md:pb-0 z-20 relative pointer-events-auto">
        <h1 className="font-serif text-[clamp(2.5rem,10vw,5rem)] md:text-[clamp(2.25rem,6.5vw,5rem)] font-normal leading-[1.08] md:leading-[1.05] tracking-[-0.03em] text-n-700 max-w-5xl">
          Accelerate your time <br />
          <span className="italic font-light text-brand-orange">to market.</span>
        </h1>

        <p className="font-sans text-[14px] sm:text-[15px] md:text-[17px] text-n-450 max-w-[52ch] md:max-w-[65ch] leading-[1.7] md:leading-[1.65] mt-fluid-gap-md">
          We build premium websites, apps, and advanced digital systems for
          startups who value absolute execution. No hand-holding, no
          templates. Just clean code and rapid market dominance.
        </p>

        <div className="mt-fluid-gap-lg flex flex-col md:flex-row flex-wrap gap-fluid-gap-sm items-stretch md:items-center w-full md:w-auto">
          <button
            onClick={openBooking}
            className="group inline-flex items-center justify-center md:justify-start bg-brand-orange hover:bg-brand-orange/95 hover:scale-[1.02] text-white rounded-full pl-6 pr-2 py-3 sm:py-2.5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] shadow-lg shadow-brand-orange/10 hover:shadow-brand-orange/20 cursor-pointer border-none outline-none"
          >
            <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-widest mr-4 relative overflow-hidden h-[18px]">
              <span className="flex flex-col transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                <span className="h-[18px] flex items-center">BOOK A CALL</span>
                <span className="h-[18px] flex items-center">BOOK A CALL</span>
              </span>
            </span>
            <span className="w-9 h-9 sm:w-9 sm:h-9 bg-white text-brand-orange rounded-full flex items-center justify-center text-[13px] sm:text-[12px] font-bold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
              »
            </span>
          </button>

          <a
            href="#services"
            className="group inline-flex items-center justify-center md:justify-start border border-n-500/30 hover:border-n-700 hover:scale-[1.02] text-n-700 rounded-full pl-6 pr-2 py-3 sm:py-2.5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]"
          >
            <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-widest mr-4 relative overflow-hidden h-[18px]">
              <span className="flex flex-col transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                <span className="h-[18px] flex items-center">OUR SERVICES</span>
                <span className="h-[18px] flex items-center">OUR SERVICES</span>
              </span>
            </span>
            <span className="w-9 h-9 sm:w-9 sm:h-9 bg-n-700 text-white rounded-full flex items-center justify-center text-[13px] sm:text-[12px] font-bold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
              ›
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
