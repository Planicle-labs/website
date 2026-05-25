"use client";

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import ProcessSection from '@/components/ProcessSection';
import TextRollButton from "@/components/TextRollButton";
import { ArrowRight } from "lucide-react";

// Dynamically load browser-only Shader overlay to prevent hydration issues
const HeroShader = dynamic(() => import("@/components/HeroShader"), {
  ssr: false,
});

export default function Home() {
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
            <a
              href="#connect"
              className="group inline-flex items-center bg-brand-orange hover:bg-brand-orange/95 hover:scale-[1.02] text-white rounded-full pl-6 pr-2 py-2.5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] shadow-lg shadow-brand-orange/10 hover:shadow-brand-orange/20"
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
            </a>

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
      {/* SECTION 2: INTERACTIVE PROCESS (Light grey background) */}
      {/* ──────────────────────────────────────────────────────── */}
      <ProcessSection />
      <section
        id="studio"
        className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden relative"
      >
        <div className="w-full max-w-[1440px] mx-auto relative">
          {/* Badge row */}
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            {/* Numbered circle */}
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">
              1
            </div>
            {/* Pill label */}
            <div className="text-[12px] sm:text-[13px] font-medium border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-gray-900">
              Introducing Planicle
            </div>
          </div>

          {/* Heading h2 */}
          <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 lg:mb-28 px-5 sm:px-8 lg:px-12 max-w-5xl">
            Strategy-led creatives, delivering{" "}
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            results in digital and beyond.
          </h2>

          {/* Content area: Mobile Viewport (lg:hidden) */}
          <div className="lg:hidden px-5 sm:px-8 flex flex-col gap-8">
            <div className="max-w-xl">
              <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-900 mb-6">
                Through research, creative thinking and iteration we help
                growing brands realize their digital full potential.
              </p>
              <TextRollButton
                text="About our studio"
                className="bg-[#F26522] hover:bg-[#e05a1a] text-white rounded-full pl-5 pr-2 py-2 cursor-pointer shadow-sm hover:shadow"
                textClassName="text-[13px] sm:text-[14px] font-semibold tracking-tight text-white"
                circleClassName="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center"
                arrowClassName="text-[#F26522]"
                iconSize={15}
              />
            </div>

            {/* Images in mobile/tablet */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-4">
              <div className="w-full sm:w-[45%] aspect-[438/346] relative rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85"
                  alt="Planicle studio detail"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="w-full sm:w-[55%] aspect-[900/600] relative rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85"
                  alt="Planicle design workshop showcase"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Content area: Desktop Viewport (hidden lg:grid) */}
          <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8 px-5 sm:px-8 lg:px-12">
            {/* Left column: Small Image */}
            <div className="self-end w-full aspect-[438/346] relative rounded-2xl overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85"
                alt="Planicle studio detail"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Center column: Paragraph + Button aligned right */}
            <div className="self-start flex flex-col justify-end items-end text-right h-full pb-2">
              <p className="text-[16px] xl:text-[18px] leading-[1.65] text-gray-900 font-medium whitespace-nowrap mb-6">
                Through research, creative thinking
                <br />
                and iteration we help growing brands
                <br />
                realize their digital full potential.
              </p>
              <TextRollButton
                text="About our studio"
                className="bg-[#F26522] hover:bg-[#e05a1a] text-white rounded-full pl-5 pr-2 py-2 cursor-pointer shadow-sm hover:shadow"
                textClassName="text-[13px] sm:text-[14px] font-semibold tracking-tight text-white"
                circleClassName="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center"
                arrowClassName="text-[#F26522]"
                iconSize={15}
              />
            </div>

            {/* Right column: Large Image */}
            <div className="self-end w-full aspect-[3/2] relative rounded-2xl overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85"
                alt="Axion design workshop showcase"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 3: CASE STUDIES (Light gray background) */}
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
              2
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
