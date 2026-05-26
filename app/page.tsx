"use client";

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import ProcessSection from '@/components/ProcessSection';
import ServicesSection from '@/components/ServicesSection';
import { ArrowRight } from "lucide-react";
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
              className="group inline-flex items-center bg-brand-orange hover:bg-brand-orange/95 hover:scale-[1.02] text-white rounded-full pl-6 pr-2 py-2.5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] shadow-lg shadow-brand-orange/10 hover:shadow-brand-orange/20 cursor-pointer border-none outline-none"
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
              <span className="w-8 h-8 sm:w-9 sm:h-9 bg-white text-brand-orange rounded-full flex items-center justify-center text-[12px] font-bold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
                »
              </span>
            </button>

            {/* Secondary CTA (SEE THE WORK) */}
            <a
              href="#projects"
              className="group inline-flex items-center border border-n-500/30 hover:border-n-700 hover:scale-[1.02] text-n-700 rounded-full pl-6 pr-2 py-2.5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]"
            >
              <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-widest mr-4 relative overflow-hidden h-[18px]">
                <span className="flex flex-col transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                  <span className="h-[18px] flex items-center">
                    SEE THE WORK
                  </span>
                  <span className="h-[18px] flex items-center">
                    SEE THE WORK
                  </span>
                </span>
              </span>
              <span className="w-8 h-8 sm:w-9 sm:h-9 bg-n-700 text-white rounded-full flex items-center justify-center text-[12px] font-bold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
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
      {/* SECTION 4: CASE STUDIES (Light gray background) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section
        id="projects"
        className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 overflow-hidden relative"
      >
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Badge row */}
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            {/* Numbered circle */}
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">
              1
            </div>
            {/* Pill label */}
            <div className="text-[12px] sm:text-[13px] font-medium border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-gray-900">
              Featured client work
            </div>
          </div>

          {/* Heading h2 */}
          <h2 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-10 sm:mb-14 lg:mb-16 px-5 sm:px-8 lg:px-12">
            Our projects
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 px-5 sm:px-8 lg:px-12">
            {/* Card 1 (Narrativ) */}
            <div className="flex flex-col">
              {/* Video container */}
              <div className="w-full aspect-[329/246] rounded-2xl overflow-hidden bg-[#1a1d2e] group cursor-pointer relative shadow-sm">
                <video
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]"
                />

                {/* Absolute Button bottom-4 left-4 */}
                <div className="absolute bottom-4 left-4 h-9 bg-white text-gray-900 rounded-full flex items-center shadow-lg transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] w-9 group-hover:w-[148px] overflow-hidden">
                  <div className="flex items-center justify-between w-full">
                    {/* Learn more text (rolled out inside expanding pill) */}
                    <span className="text-[13px] font-semibold text-gray-900 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pl-3">
                      Learn more
                    </span>

                    {/* Link Icon (Rotates on hover) */}
                    <div className="w-9 h-9 flex items-center justify-center shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="-rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] text-gray-900"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col mt-4">
                <span className="text-[14px] sm:text-[15px] font-bold text-gray-900">
                  Narrativ
                </span>
                <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed mt-1">
                  Winner of Site of the Month 2025 - an interactive 3D showcase
                  driving record engagement
                </p>
              </div>
            </div>

            {/* Card 2 (Luminar) */}
            <div className="flex flex-col">
              {/* Video container */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#6b6b6b] group cursor-pointer relative shadow-sm">
                <video
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]"
                />

                {/* Absolute Button bottom-4 left-4 */}
                <div className="absolute bottom-4 left-4 h-9 bg-gray-900 text-white rounded-full flex items-center shadow-lg transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] w-9 group-hover:w-[168px] overflow-hidden">
                  <div className="flex items-center justify-between w-full">
                    {/* View case study text */}
                    <span className="text-[13px] font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pl-3">
                      View case study
                    </span>

                    {/* Arrow Right icon */}
                    <div className="w-9 h-9 flex items-center justify-center shrink-0">
                      <ArrowRight
                        size={14}
                        className="-rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col mt-4">
                <span className="text-[14px] sm:text-[15px] font-bold text-gray-900">
                  Luminar
                </span>
                <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed mt-1">
                  Transforming a dated platform into a conversion-focused brand
                  experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
