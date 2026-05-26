"use client";

import React from "react";
import { useBooking } from "./BookingProvider";

export default function Footer() {
  const { openBooking } = useBooking();

  return (
    <footer
      id="connect"
      className="w-full relative overflow-hidden select-none grainy-gradient-bg pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24"
    >
      {/* Seamless dissolve transition from solid black Manifesto Section above */}
      <div
        className="absolute top-0 left-0 right-0 h-[100px] sm:h-[140px] pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(to bottom, #0C0C0E 0%, transparent 100%)",
        }}
      />

      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* ──────────────────────────────────────────────────────── */}
        {/* ASYMMETRICAL 70-30 HIGH-CONVICTION CTA GRID             */}
        {/* ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] lg:grid-cols-[70%_30%] gap-10 items-start md:items-center py-4 text-left">
          {/* LEFT SIDE: Headline & Body Copy (70%) */}
          <div className="flex flex-col items-start max-w-3xl">
            {/* Core Provocative Headline (Sentence Case, Display Serif) */}
            <h2 className="font-serif text-[clamp(2.15rem,4.8vw,3.5rem)] font-normal leading-[1.08] tracking-tight text-white">
              Think your team&apos;s good?
              <br />
              <span className="italic font-light text-brand-orange">
                We&apos;ll make it legendary.
              </span>
            </h2>

            {/* Confidence-Building Body Copy (Active verbs, zero-fluff) */}
            <p className="font-sans text-[14px] sm:text-[16px] text-[#A09F9A] leading-[1.7] mt-6 max-w-[62ch]">
              We don&apos;t just ship code — we embed in your team, challenge
              your assumptions, and build exactly what your product needs to
              lead. With us, you&apos;re getting an unwavering technical
              partner.
            </p>
          </div>

          {/* RIGHT SIDE: Action Conversion CTA Button (30% with Right Spacing Gap) */}
          <div className="flex justify-start md:justify-end w-full shrink-0 md:pr-8 lg:pr-12">
            {/* Primary Call-to-Action (LET'S BUILD TOGETHER ») */}
            <button
              onClick={openBooking}
              className="group inline-flex items-center bg-brand-orange hover:bg-brand-orange/95 hover:scale-[1.02] text-white rounded-full pl-6 pr-2 py-3 sm:py-2.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] shadow-lg shadow-brand-orange/10 hover:shadow-brand-orange/20 cursor-pointer border-none outline-none"
            >
              <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-widest mr-4 relative overflow-hidden h-[18px]">
                <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1/2">
                  <span className="h-[18px] flex items-center">
                    LET&apos;S BUILD TOGETHER
                  </span>
                  <span className="h-[18px] flex items-center">
                    LET&apos;S BUILD TOGETHER
                  </span>
                </span>
              </span>
              <span className="w-9 h-9 sm:w-9 sm:h-9 bg-white text-brand-orange rounded-full flex items-center justify-center text-[13px] sm:text-[12px] font-bold transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-45">
                »
              </span>
            </button>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────── */}
        {/* PREMIUM TERMINAL BRAND TAGLINE STATEMENT                 */}
        {/* ──────────────────────────────────────────────────────── */}
        <div className="w-full border-t border-white/10 mt-12 sm:mt-16 pt-10 text-center overflow-hidden">
          <span className="font-sans font-black text-[clamp(1.2rem,5.2vw,4.2rem)] tracking-[0.06em] sm:tracking-[0.09em] md:tracking-[0.12em] lg:tracking-[0.15em] text-white/[0.05] uppercase select-none block w-full leading-none pl-[0.06em] sm:pl-[0.09em] md:pl-[0.12em] lg:pl-[0.15em] whitespace-nowrap">
            GOOD ISN&apos;T ENOUGH
          </span>
        </div>
      </div>
    </footer>
  );
}
