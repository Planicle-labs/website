'use client';

import React, { useState, useEffect, useRef } from 'react';
import { animate, cubicBezier, eases } from 'animejs';

interface Phase {
  id: string;
  label: string;
  title: string;
  overline: string;
  copy: string;
}

const PHASES: Phase[] = [
  {
    id: 'plan',
    label: 'PLAN',
    overline: 'PHASE 01 — SCOPING & ARCHITECTURE',
    title: 'Build your idea',
    copy: 'We scope your project with precision — market insights, user flows, and a technical architecture built to scale. No vague timelines, no scope creep. You\'ll know exactly what you\'re getting before we write a single line of code.'
  },
  {
    id: 'design',
    label: 'DESIGN',
    overline: 'PHASE 02 — BESPOKE IDENTITY & SYSTEMS',
    title: 'Define the identity',
    copy: 'We reject generic SaaS templates and cartoon illustrations. Every pixel we lay down is bespoke, structured, and expensive — built to wow your investors, captivate your users, and establish elite authority in your category.'
  },
  {
    id: 'develop',
    label: 'DEVELOP',
    overline: 'PHASE 03 — PRODUCTION-GRADE ENGINEERING',
    title: 'Ship with precision',
    copy: 'Pixel-perfect frontend execution combined with clean, high-performance backend architecture. We build production-ready products with zero technical debt, designed to scale seamlessly as your user base explodes.'
  },
  {
    id: 'test',
    label: 'TEST',
    overline: 'PHASE 04 — RIGOROUS CRAFT VERIFICATION',
    title: 'Verify the craft',
    copy: 'Our engineering goes through rigorous QC passes: WCAG 2.1 AA contrast compliance, responsive fluidity across all breakpoints, and speed benchmarks. We don\'t ship until the code behaves flawlessly.'
  },
  {
    id: 'deploy',
    label: 'DEPLOY',
    overline: 'PHASE 05 — SECURE RELEASE & LIFTOFF',
    title: 'Scale without limits',
    copy: 'Smooth infrastructure setup, cloud deployments, and SEO optimizations. We put your product live on a stack designed for absolute reliability, lightning-fast loads, and total scalability from day one.'
  }
];

export default function ProcessSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);

  // Sync state with ref for scroll event listener
  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  // Set up Sticky Scroll logic (completely scroll-bound and bidirectional)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const totalHeight = rect.height;

      // Scrollable distance within the sticky container
      const scrollableRange = totalHeight - viewHeight;

      if (scrollableRange <= 0) return;

      // Calculate scroll progress (0 when sticky starts, 1 when sticky ends)
      const scrollStart = -rect.top;
      let progress = scrollStart / scrollableRange;
      progress = Math.max(0, Math.min(1, progress));

      // Calculate active phase index based on scroll progress
      const rawIndex = Math.floor(progress * PHASES.length);
      const targetIdx = Math.min(PHASES.length - 1, Math.max(0, rawIndex));

      // Only trigger updates and animations when the index actually changes
      if (targetIdx !== activeIdxRef.current) {
        setActiveIdx(targetIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // AnimeJS function to animate vertical spacing transitions on the 3D isometric stack
  const animateActiveLayer = (idx: number) => {
    layersRef.current.forEach((layerEl, i) => {
      if (!layerEl) return;

      const baseZ = 64 - i * 32;
      const isActive = i === idx;

      animate(layerEl, {
        translateZ: isActive ? baseZ + 16 : baseZ,
        translateY: isActive ? -10 : 0,
        translateX: isActive ? -6 : 0,
        opacity: isActive ? 1 : 0.25,
        filter: isActive ? 'blur(0px)' : 'blur(0.8px)',
        duration: 350,
        ease: cubicBezier(0.23, 1, 0.32, 1)
      });
    });
  };

  // AnimeJS function to morph right-side copywriting card
  const animateTextTransition = () => {
    const el = textRef.current;
    if (!el) return;

    animate(el, {
      opacity: 0,
      filter: 'blur(2px)',
      translateY: 8,
      duration: 150,
      ease: eases.inQuad,
      onComplete: () => {
        animate(el, {
          opacity: 1,
          filter: 'blur(0px)',
          translateY: 0,
          duration: 300,
          ease: cubicBezier(0.23, 1, 0.32, 1)
        });
      }
    });
  };

  // Trigger layer highlight and text morph animations when active index changes
  useEffect(() => {
    animateActiveLayer(activeIdx);
    animateTextTransition();
  }, [activeIdx]);

  const activePhase = PHASES[activeIdx];

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative w-full select-none"
      style={{ height: '350vh' }}
    >
      {/* STICKY CONTAINER LOCKS IN VIEWPORT DURING SCROLL RANGE */}
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden bg-[#F7F7F7]">

        {/* Subtle hairline grid — matching Inspiration 2.webp: barely perceptible cross-hatch */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />

        {/* Top border separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[#E4E3DD]" />

        <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-y-4 sm:gap-y-6 justify-between h-full pt-12 pb-4 sm:pt-16 sm:pb-6 lg:pt-16 lg:pb-6 z-10 relative">

          {/* ═══════════════════════════════════════════════════════ */}
          {/* HEADER BLOCK — Matches Inspiration 2.webp exactly     */}
          {/* Centered: TRUST THE PROCESS pill → Think big, make it */}
          {/* real headline → body copy underneath                   */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto shrink-0">
            {/* Main headline — serif, two lines, sentence case */}
            <h2 className="font-serif text-[clamp(2rem,5vw,3.25rem)] font-normal leading-[1.05] tracking-tight text-[#0C0C0E]">
              Think big,
              <br />
              <span className="italic font-light text-[#EF4A2A]">make it real</span>
            </h2>

            {/* Body copy — exact match from Inspiration 2.webp */}
            <p className="font-sans text-[14px] sm:text-[16px] text-[#797872] leading-[1.65] mt-4 sm:mt-5 max-w-xl">
              Got a vision? Let&apos;s bring it to life together. We don&apos;t just meet goals, we deliver exactly what you need to stand out and lead.
            </p>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* MAIN THREE-COLUMN INTERACTIVE INTERFACE                */}
          {/* Left: Phase labels   Center: Card stack   Right: Copy  */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[130px_1fr_320px] gap-6 lg:gap-20 items-center justify-center w-full mt-6 sm:mt-10 lg:mt-10 mb-4 sm:mb-6 lg:mb-6 pb-2 sm:pb-4 lg:pb-0 my-auto overflow-visible">

            {/* ─── COLUMN 1: PHASE LABELS (Desktop) ─── */}
            <div className="hidden lg:flex flex-col gap-2.5 justify-center items-start h-full">
              {PHASES.map((phase, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <div
                    key={phase.id}
                    className={`relative inline-flex items-center justify-center w-[110px] py-2 rounded-full border transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] font-mono text-[10px] font-bold tracking-[0.16em] ${isActive
                      ? 'bg-[#161618] border-[#161618] text-white shadow-sm translate-x-1'
                      : 'bg-transparent border-[#E4E3DD] text-[#A09F9A]'
                      }`}
                  >
                    {/* Connector line from active label to card stack */}
                    {isActive && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 w-[60px] lg:w-[80px] h-px bg-[#E4E3DD]">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#EF4A2A]" />
                      </div>
                    )}
                    {phase.label}
                  </div>
                );
              })}
            </div>

            {/* ─── Mobile horizontal phase progress indicators ─── */}
            <div className="flex lg:hidden justify-center items-center gap-2 flex-wrap shrink-0">
              {PHASES.map((phase, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <div
                    key={phase.id}
                    className={`px-3 py-1.5 rounded-full border text-[9px] font-bold font-mono tracking-wider transition-all duration-300 ${isActive
                      ? 'bg-[#161618] border-[#161618] text-white'
                      : 'bg-transparent border-[#E4E3DD] text-[#A09F9A]'
                      }`}
                  >
                    {phase.label}
                  </div>
                );
              })}
            </div>

            {/* ─── COLUMN 2: 3D ISOMETRIC CARD STACK (Center) ─── */}
            <div className="flex items-center justify-center py-2 lg:py-4 relative w-full h-[260px] sm:h-[300px] lg:h-full max-w-[370px] sm:max-w-[410px] lg:max-w-[420px] lg:-translate-x-8 lg:-translate-y-4 mx-auto overflow-visible shrink-0">
              <div
                className="w-full aspect-[4/3] relative overflow-visible"
                style={{ perspective: '1200px' }}
              >
                {/* 3D Slant Projection */}
                <div
                  className="w-full h-full relative"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(55deg) rotateZ(-35deg) skewX(-4deg) scale(0.88)'
                  }}
                >
                  {PHASES.map((phase, idx) => {
                    const isActive = idx === activeIdx;
                    return (
                      <div
                        key={phase.id}
                        ref={(el) => {
                          layersRef.current[idx] = el;
                        }}
                        style={{
                          zIndex: 10 - idx
                        }}
                        className={`absolute inset-0 rounded-xl border bg-white shadow-[0_4px_16px_rgba(0,0,0,0.03)] p-4 flex flex-col justify-between select-none transition-colors duration-300 ${isActive
                          ? 'border-[#EF4A2A] shadow-[0_12px_32px_rgba(239,74,42,0.12)]'
                          : 'border-[#E4E3DD]'
                          }`}
                      >
                        {/* Browser Shell Top Bar */}
                        <div className="flex items-center justify-between border-b border-[#EEEDE9] pb-2">
                          <div className="flex gap-1 items-center shrink-0">
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]' : 'bg-[#E4E3DD]'}`} />
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/60' : 'bg-[#E4E3DD]/60'}`} />
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/40' : 'bg-[#E4E3DD]/40'}`} />
                          </div>
                          <div className="flex gap-1 items-center">
                            <div className={`w-6 h-2 rounded-sm ${isActive ? 'bg-[#EF4A2A]/10 border border-[#EF4A2A]/30' : 'bg-[#EEEDE9] border border-[#E4E3DD]'}`} />
                            <div className="w-4 h-2 rounded-sm bg-[#EEEDE9] border border-[#E4E3DD]/50" />
                          </div>
                        </div>

                        {/* Dashboard Content — minimalist wireframe style */}
                        <div className="flex-1 py-3 flex gap-3 items-center justify-between overflow-hidden">
                          {/* Left sidebar mock */}
                          <div className="flex flex-col gap-1.5 w-1/3 shrink-0">
                            <div className={`h-3 w-[85%] rounded-full border ${isActive
                              ? 'bg-[#EF4A2A]/10 border-[#EF4A2A]/35'
                              : 'bg-[#EEEDE9] border-[#E4E3DD]'
                              }`} />
                            <div className="flex gap-1 mt-1 pl-1">
                              {[1, 2, 3, 4].map((dot) => (
                                <span
                                  key={dot}
                                  className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]' : 'bg-[#E4E3DD]'
                                    }`}
                                />
                              ))}
                            </div>
                            <div className={`h-2.5 w-[65%] rounded-sm ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#EEEDE9]'}`} />
                            <div className={`h-2.5 w-[50%] rounded-sm ${isActive ? 'bg-[#EF4A2A]/10' : 'bg-[#EEEDE9]/60'}`} />
                          </div>

                          {/* Right main content panel */}
                          <div className="flex-1 h-full flex flex-col justify-center pl-1">
                            <div className={`w-full h-[85%] rounded-lg border flex items-center justify-center p-1.5 ${isActive
                              ? 'bg-[#EF4A2A]/5 border-[#EF4A2A]/30'
                              : 'bg-[#F7F7F7] border-[#E4E3DD]/70'
                              }`}>
                              {/* Central geometric — clean rectangles matching the inspiration */}
                              <div className="w-full h-full flex flex-col gap-1 justify-center px-1">
                                <div className={`h-2.5 w-full rounded-sm ${isActive ? 'bg-[#EF4A2A]/25' : 'bg-[#E4E3DD]/40'}`} />
                                <div className={`h-2.5 w-3/4 rounded-sm ${isActive ? 'bg-[#EF4A2A]/15' : 'bg-[#E4E3DD]/25'}`} />
                                <div className="flex gap-1 mt-0.5">
                                  <div className={`h-4 flex-1 rounded-sm ${isActive ? 'bg-[#EF4A2A]/10 border border-[#EF4A2A]/20' : 'bg-[#EEEDE9]/60'}`} />
                                  <div className={`h-4 flex-1 rounded-sm ${isActive ? 'bg-[#EF4A2A]/10 border border-[#EF4A2A]/20' : 'bg-[#EEEDE9]/60'}`} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card Bottom status indicators */}
                        <div className="border-t border-[#EEEDE9] pt-2 flex items-center justify-between">
                          <div className="flex gap-0.5">
                            {[1, 2, 3].map((circle) => (
                              <div
                                key={circle}
                                className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/30' : 'bg-[#EEEDE9]'}`}
                              />
                            ))}
                          </div>
                          <span className={`font-mono text-[8px] font-bold uppercase tracking-wider ${isActive ? 'text-[#EF4A2A]' : 'text-[#797872]'}`}>
                            PHASE 0{idx + 1}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ─── COLUMN 3: TEXT DESCRIPTIONS (Right) ─── */}
            <div className="flex flex-col justify-center w-full mx-auto px-2 lg:px-0 shrink-0 text-center lg:text-left">
              <div ref={textRef} className="flex flex-col">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.16em] text-[#EF4A2A] uppercase select-none">
                  {activePhase.overline}
                </span>

                <h3 className="font-serif text-[clamp(1.4rem,2.8vw,2.1rem)] font-light italic text-[#0C0C0E] mt-3 leading-tight">
                  {activePhase.title}
                </h3>

                <p className="font-sans text-[13px] sm:text-[14px] text-[#797872] leading-[1.7] mt-3">
                  {activePhase.copy}
                </p>

                {/* Dynamic arrow link */}
                <div className="mt-5 sm:mt-6 flex items-center justify-center lg:justify-start">
                  <a
                    href="#connect"
                    className="group inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-[0.16em] text-[#161618] hover:text-[#EF4A2A] transition-colors duration-200 uppercase"
                  >
                    LET&apos;S BUILD TOGETHER
                    <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1">
                      »
                    </span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* SCROLL PROGRESS FOOTER */}
          <div className="flex justify-between items-center border-t border-[#E4E3DD] pt-4 mt-6 sm:mt-8 lg:mt-10 shrink-0 text-[10px] font-mono text-[#A09F9A] tracking-[0.14em] uppercase select-none">
            <span>EXECUTION PIPELINE</span>
            <span>PHASE 0{activeIdx + 1} / 05</span>
          </div>

        </div>
      </div>
    </section>
  );
}
