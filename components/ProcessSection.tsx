'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { animate, cubicBezier, eases } from 'animejs';
import { useBooking } from './BookingProvider';

interface Phase {
  id: string;
  label: string;
  title: string;
  overline: string;
  copy: string;
}

interface LayerMotion {
  depth: number;
  offsetX: number;
  offsetY: number;
  opacity: number;
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

const getLayerMotion = (layerIdx: number, activeIdx: number): LayerMotion => {
  const baseDepth = 80 - layerIdx * 40;
  const isActive = layerIdx === activeIdx;
  const isPast = layerIdx < activeIdx;

  let opacity = 0.35;
  if (isActive) opacity = 1;
  if (isPast) opacity = 0;

  return {
    depth: isActive ? baseDepth + 24 : baseDepth,
    offsetX: isActive ? -8 : 0,
    offsetY: isActive ? -12 : 0,
    opacity,
  };
};

const getLayerTransform = (
  motion: LayerMotion,
) => {
  return `translateX(${motion.offsetX}px) translateY(${motion.offsetY}px) translateZ(${motion.depth}px)`;
};

export default function ProcessSection() {
  const { openBooking } = useBooking();
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);
  const layerMotionRef = useRef<LayerMotion[]>(PHASES.map((_, idx) => getLayerMotion(idx, 0)));

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const applyLayerMotion = useCallback((layerIdx: number, activeLayerIdx = activeIdxRef.current) => {
    const layerEl = layersRef.current[layerIdx];
    const motion = layerMotionRef.current[layerIdx];
    if (!layerEl || !motion) return;

    layerEl.style.transform = getLayerTransform(motion);
    layerEl.style.opacity = String(motion.opacity);
  }, []);

  // Trigger layer highlight and text morph animations when active index changes
  const animateActiveLayer = useCallback((idx: number) => {
    layersRef.current.forEach((layerEl, i) => {
      if (!layerEl) return;

      const motion = layerMotionRef.current[i] ?? getLayerMotion(i, activeIdxRef.current);
      layerMotionRef.current[i] = motion;
      const targetMotion = getLayerMotion(i, idx);

      animate(motion, {
        depth: targetMotion.depth,
        offsetY: targetMotion.offsetY,
        offsetX: targetMotion.offsetX,
        opacity: targetMotion.opacity,
        duration: 350,
        ease: cubicBezier(0.23, 1, 0.32, 1),
        onRender: () => applyLayerMotion(i, idx),
        onComplete: () => applyLayerMotion(i, idx),
      });
    });
  }, [applyLayerMotion]);

  const animateTextTransition = useCallback(() => {
    const el = textRef.current;
    if (!el) return;

    animate(el, {
      opacity: 0,
      translateY: 8,
      duration: 150,
      ease: eases.inQuad,
      onComplete: () => {
        if (!isMountedRef.current || !textRef.current) return;
        animate(textRef.current, {
          opacity: 1,
          translateY: 0,
          duration: 300,
          ease: cubicBezier(0.23, 1, 0.32, 1)
        });
      }
    });
  }, []);

  // Set up Sticky Scroll logic (completely scroll-bound and bidirectional)
  useEffect(() => {
    const handleScroll = () => {
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);

      animFrameRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) {
          animFrameRef.current = null;
          return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        const totalHeight = rect.height;

        // Scrollable distance within the sticky container
        const scrollableRange = totalHeight - viewHeight;

        if (scrollableRange <= 0) {
          animFrameRef.current = null;
          return;
        }

        // Calculate scroll progress (0 when sticky starts, 1 when sticky ends)
        const scrollStart = -rect.top;
        let progress = scrollStart / scrollableRange;
        progress = Math.max(0, Math.min(1, progress));

        // Calculate active phase index based on scroll progress
        const rawIndex = Math.floor(progress * PHASES.length);
        const targetIdx = Math.min(PHASES.length - 1, Math.max(0, rawIndex));

        // Only trigger updates and animations when the index actually changes
        if (targetIdx !== activeIdxRef.current) {
          activeIdxRef.current = targetIdx;
          setActiveIdx(targetIdx);
        }

        animFrameRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animFrameRef.current = requestAnimationFrame(handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Trigger layer highlight and text morph animations when active index changes
  useEffect(() => {
    animateActiveLayer(activeIdx);
    animateTextTransition();
  }, [activeIdx, animateActiveLayer, animateTextTransition]);

  // Smooth scroll logic to navigate to specific phases on click
  const scrollToPhase = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const containerTop = rect.top + scrollTop;
    const totalHeight = rect.height;
    const viewHeight = window.innerHeight;
    const scrollableRange = totalHeight - viewHeight;

    if (scrollableRange <= 0) {
      activeIdxRef.current = idx;
      setActiveIdx(idx);
      return;
    }

    // Place the scroll position at the mid-point of the phase's scroll range
    const targetProgress = (idx + 0.5) / PHASES.length;
    const targetScrollY = containerTop + (targetProgress * scrollableRange);

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  const activePhase = PHASES[activeIdx];

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative w-full select-none"
      style={{ height: '350vh' }}
    >
      {/* STICKY CONTAINER LOCKS IN VIEWPORT DURING SCROLL RANGE */}
      <div
        className="sticky top-0 w-full flex flex-col bg-[#F7F7F7]"
        style={{ height: '100dvh', overflow: 'clip' }}
      >

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

        <div className="w-full max-w-7xl mx-auto px-fluid-x flex flex-col gap-y-fluid-gap-md justify-start lg:justify-between h-full pt-28 pb-3 sm:pt-16 sm:pb-6 lg:pt-16 lg:pb-6 z-10 relative">

          {/* ═══════════════════════════════════════════════════════ */}
          {/* HEADER BLOCK — Matches Inspiration 2.webp exactly     */}
          {/* Centered: TRUST THE PROCESS pill → Think big, make it */}
          {/* real headline → body copy underneath                   */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto shrink-0">
            {/* Main headline — serif, two lines, sentence case */}
            <h2 className="font-serif text-[clamp(1.75rem,5vw,3.25rem)] font-normal leading-[1.05] tracking-tight text-[#0C0C0E]">
              Think big,
              <br />
              <span className="italic font-light text-[#EF4A2A]">make it real</span>
            </h2>

            {/* Body copy — exact match from Inspiration 2.webp */}
            <p className="font-sans text-[13px] sm:text-[16px] text-[#5C5B56] leading-[1.65] mt-3 sm:mt-5 max-w-xl">
              Got a vision? Let&apos;s bring it to life together. We don&apos;t just meet goals, we deliver exactly what you need to stand out and lead.
            </p>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* DESKTOP THREE-COLUMN INTERACTIVE INTERFACE (lg:flex)   */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="hidden lg:grid lg:grid-cols-[130px_1fr_320px] gap-20 items-center justify-center w-full mt-10 mb-6 pb-0 my-auto overflow-visible flex-1">

            {/* ─── COLUMN 1: PHASE LABELS (Desktop) ─── */}
            <div
              className="hidden lg:flex flex-col gap-2.5 justify-center items-start h-full"
              role="tablist"
              aria-label="Project phases"
            >
              {PHASES.map((phase, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={phase.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="process-phase-content"
                    aria-label={`Phase ${idx + 1}: ${phase.label}`}
                    onClick={() => scrollToPhase(idx)}
                    className={`relative inline-flex items-center justify-center w-27.5 py-2 rounded-full border transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] font-mono text-[10px] font-bold tracking-[0.16em] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#EF4A2A] focus-visible:ring-offset-2 ${isActive
                      ? 'bg-[#161618] border-[#161618] text-white shadow-sm translate-x-1'
                      : 'bg-transparent border-[#E4E3DD] text-[#6B6A65] hover:border-[#161618] hover:text-[#161618]'
                      }`}
                  >
                    {/* Connector line from active label to card stack */}
                    {isActive && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 w-15 lg:w-20 h-px bg-[#E4E3DD]">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#EF4A2A]" />
                      </div>
                    )}
                    {phase.label}
                  </button>
                );
              })}
            </div>

            {/* ─── COLUMN 2: 3D ISOMETRIC CARD STACK (Center) ─── */}
            <div className="flex items-center justify-center py-1 lg:py-4 relative w-full h-45 sm:h-60 lg:h-full max-w-70 sm:max-w-90 lg:max-w-105 lg:-translate-x-8 lg:-translate-y-4 mx-auto overflow-visible shrink-0 max-sm:max-w-[85vw]">
              <div
                className="w-full aspect-4/3 relative overflow-visible"
              >
                {/* Isometric Slant Projection — perspective() in transform chain ensures cross-browser parity */}
                <div
                  className='w-full h-full relative transform-[perspective(1200px)_rotateX(55deg)_rotateZ(-35deg)_skewX(-4deg)_scale(0.68)] sm:transform-[perspective(1200px)_rotateX(55deg)_rotateZ(-35deg)_skewX(-4deg)_scale(0.8)] lg:transform-[perspective(1200px)_rotateX(55deg)_rotateZ(-35deg)_skewX(-4deg)_scale(0.88)]'
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {PHASES.map((phase, idx) => {
                    const isActive = idx === activeIdx;
                    const initialMotion = getLayerMotion(idx, activeIdx);
                    return (
                      <div
                        key={phase.id}
                        ref={(el) => {
                          layersRef.current[idx] = el;
                        }}
                        style={{
                          zIndex: isActive ? 10 : 5 - idx,
                          transform: getLayerTransform(initialMotion),
                          opacity: initialMotion.opacity,
                          willChange: 'transform, opacity',
                          transformStyle: 'preserve-3d',
                          backfaceVisibility: 'hidden',
                        }}
                        className={`absolute inset-0 rounded-xl border flex flex-col justify-between ${
                          isActive
                            ? idx === 4
                              ? 'border-[#EF4A2A] bg-[#FFF5F2]'
                              : 'border-[#EF4A2A] bg-white'
                            : idx === 0
                              ? 'border-[#E4E3DD] bg-[#FAF9F5]'
                              : 'border-[#E4E3DD] bg-white'
                        }`}
                      >
                        <div
                          className={`absolute inset-0 rounded-xl pointer-events-none transition-shadow duration-300 ${
                            isActive
                              ? 'shadow-[0_12px_32px_rgba(239,74,42,0.12)]'
                              : 'shadow-[0_4px_16px_rgba(0,0,0,0.03)]'
                          }`}
                        />
                        {/* PHASE 01 — PLAN: Thick Baseboard / Hardware Slab */}
                        {idx === 0 && (
                          <div className="flex-1 w-full h-full relative p-4 flex flex-col justify-between select-none">
                            {/* Inner panel bevel border */}
                            <div className={`absolute inset-1.5 rounded-lg border ${isActive ? 'border-[#EF4A2A]/40' : 'border-[#EEEDE9]'} pointer-events-none`} />

                            {/* Corner mechanical screw holes */}
                            <div className="absolute top-3 left-3 w-3 h-3 rounded-full border border-[#D0CFC9] bg-[#EBEAE4] flex items-center justify-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
                              <div className="w-1 h-1 rounded-full bg-[#A09F9A]" />
                            </div>
                            <div className="absolute top-3 right-3 w-3 h-3 rounded-full border border-[#D0CFC9] bg-[#EBEAE4] flex items-center justify-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
                              <div className="w-1 h-1 rounded-full bg-[#A09F9A]" />
                            </div>
                            <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full border border-[#D0CFC9] bg-[#EBEAE4] flex items-center justify-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
                              <div className="w-1 h-1 rounded-full bg-[#A09F9A]" />
                            </div>
                            <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full border border-[#D0CFC9] bg-[#EBEAE4] flex items-center justify-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
                              <div className="w-1 h-1 rounded-full bg-[#A09F9A]" />
                            </div>

                            {/* Header details */}
                            <div className="w-full flex justify-between items-center px-8 pt-1 shrink-0">
                              <span className={`font-mono text-[7px] font-bold tracking-[0.2em] ${isActive ? 'text-[#EF4A2A]/60' : 'text-[#A09F9A]'}`}>PLANNING UNIT</span>
                              <div className="flex gap-1">
                                <div className={`w-3 h-1 rounded-full ${isActive ? 'bg-[#EF4A2A]/40' : 'bg-[#E4E3DD]'}`} />
                                <div className={`w-1.5 h-1 rounded-full ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#E4E3DD]/50'}`} />
                              </div>
                            </div>

                            {/* Circuit nodes & horizontal slot */}
                            <div className="flex-1 flex flex-col items-center justify-center px-6 gap-3">
                              <div className={`w-[72%] h-4 rounded-full border ${isActive ? 'border-[#EF4A2A]/30 bg-[#EF4A2A]/5' : 'border-[#E4E3DD] bg-[#F7F7F7]'} flex items-center justify-center shrink-0`}>
                                <span className={`font-mono text-[8px] tracking-[0.15em] font-medium ${isActive ? 'text-[#EF4A2A]/70' : 'text-[#797872]'}`}>BASEPLATE SYSTEM</span>
                              </div>

                              <div className="w-full max-w-45 flex justify-between items-center relative mt-1 shrink-0">
                                <div className={`absolute left-0 right-0 h-px ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#E4E3DD]'}`} />
                                <div className={`relative w-4 h-4 rounded-full border bg-white flex items-center justify-center z-10 ${isActive ? 'border-[#EF4A2A]' : 'border-[#E4E3DD]'}`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]' : 'bg-[#E4E3DD]'}`} />
                                </div>
                                <div className={`px-2 py-0.5 rounded border text-[7px] font-mono font-bold bg-white z-10 ${isActive ? 'border-[#EF4A2A]/40 text-[#EF4A2A]' : 'border-[#E4E3DD] text-[#797872]'}`}>
                                  DB_INIT
                                </div>
                                <div className={`relative w-4 h-4 rounded-full border bg-white flex items-center justify-center z-10 ${isActive ? 'border-[#EF4A2A]' : 'border-[#E4E3DD]'}`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]' : 'bg-[#E4E3DD]'}`} />
                                </div>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-[#EEEDE9] pt-2 px-2 flex justify-between items-center text-[7px] font-mono text-[#A09F9A] uppercase tracking-widest shrink-0">
                              <span>SECURE BASE HARDWARE</span>
                              <span className={isActive ? 'text-[#EF4A2A]' : ''}>PH-01</span>
                            </div>
                          </div>
                        )}

                        {/* PHASE 02 — DESIGN: Blueprints & Grid Guides */}
                        {idx === 1 && (
                          <div className="flex-1 w-full h-full p-4 flex flex-col justify-between select-none">
                            {/* Top browser bar */}
                            <div className="flex items-center justify-between border-b border-[#EEEDE9] pb-2 shrink-0">
                              <div className="flex gap-1 items-center shrink-0">
                                <span className={`w-1.5 h-1.5 rounded-full border ${isActive ? 'border-[#EF4A2A] bg-transparent' : 'border-[#E4E3DD]'}`} />
                                <span className={`w-1.5 h-1.5 rounded-full border ${isActive ? 'border-[#EF4A2A]/60 bg-transparent' : 'border-[#E4E3DD]/60'}`} />
                                <span className={`w-1.5 h-1.5 rounded-full border ${isActive ? 'border-[#EF4A2A]/40 bg-transparent' : 'border-[#E4E3DD]/40'}`} />
                              </div>
                              <div className={`w-20 h-2 rounded-full border ${isActive ? 'border-[#EF4A2A]/20 bg-transparent' : 'border-[#E4E3DD]/30 bg-transparent'}`} />
                            </div>

                            {/* Wireframe grids */}
                            <div className="flex-1 py-3 flex gap-3 items-center justify-between overflow-hidden">
                              <div className={`w-[30%] h-[85%] border border-dashed rounded-md p-1.5 flex flex-col gap-1.5 shrink-0 ${isActive ? 'border-[#EF4A2A]/30' : 'border-[#E4E3DD]'}`}>
                                <div className={`h-2 w-full rounded border ${isActive ? 'border-[#EF4A2A]/40' : 'border-[#E4E3DD]'}`} />
                                <div className={`h-1.5 w-3/4 rounded border border-dashed ${isActive ? 'border-[#EF4A2A]/30' : 'border-[#E4E3DD]/70'}`} />
                                <div className={`h-1.5 w-1/2 rounded border border-dashed ${isActive ? 'border-[#EF4A2A]/30' : 'border-[#E4E3DD]/70'}`} />
                              </div>

                              <div className={`flex-1 h-[85%] border border-dashed rounded-md p-2 flex flex-col gap-2 relative justify-center ${isActive ? 'border-[#EF4A2A]/40' : 'border-[#E4E3DD]'}`}>
                                <div className="flex gap-2 flex-1 items-center">
                                  <div className={`flex-1 h-[80%] rounded border flex flex-col items-center justify-center border-dashed ${isActive ? 'border-[#EF4A2A]/40' : 'border-[#E4E3DD]/70'}`}>
                                    <div className={`w-2 h-2 rounded-full border ${isActive ? 'border-[#EF4A2A]' : 'border-[#E4E3DD]'}`} />
                                  </div>
                                  <div className={`flex-1 h-[80%] rounded border flex flex-col items-center justify-center border-dashed ${isActive ? 'border-[#EF4A2A]/40' : 'border-[#E4E3DD]/70'}`}>
                                    <div className={`w-2 h-2 rounded-full border ${isActive ? 'border-[#EF4A2A]' : 'border-[#E4E3DD]'}`} />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-[#EEEDE9] pt-2 flex justify-between items-center text-[7px] font-mono text-[#A09F9A] uppercase tracking-widest shrink-0">
                              <span>BLUEPRINT SYSTEMS</span>
                              <span className={isActive ? 'text-[#EF4A2A]' : ''}>PH-02</span>
                            </div>
                          </div>
                        )}

                        {/* PHASE 03 — DEVELOP: Modular Grid Blocks */}
                        {idx === 2 && (
                          <div className="flex-1 w-full h-full p-4 flex flex-col justify-between select-none">
                            <div className="flex items-center justify-between border-b border-[#EEEDE9] pb-2 shrink-0">
                              <div className="flex gap-1 items-center shrink-0">
                                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/60' : 'bg-[#E4E3DD]'}`} />
                                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/40' : 'bg-[#E4E3DD]'}`} />
                                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#E4E3DD]'}`} />
                              </div>
                              <div className="flex gap-1">
                                <div className={`w-5 h-2 rounded-sm ${isActive ? 'bg-[#EF4A2A]/10 border border-[#EF4A2A]/20' : 'bg-[#EEEDE9] border border-[#E4E3DD]'}`} />
                                <div className="w-3 h-2 rounded-sm bg-[#EEEDE9]" />
                              </div>
                            </div>

                            <div className="flex-1 py-3 flex gap-3 items-center justify-between overflow-hidden">
                              <div className="flex-1 h-[85%] flex flex-col gap-1.5 justify-center">
                                <div className={`h-4 rounded border flex items-center px-1.5 justify-between ${isActive ? 'border-[#EF4A2A]/30 bg-[#EF4A2A]/5' : 'border-[#E4E3DD] bg-[#F7F7F7]'}`}>
                                  <div className={`w-2.5 h-2.5 rounded ${isActive ? 'bg-[#EF4A2A]/30' : 'bg-[#E4E3DD]'}`} />
                                  <div className={`w-[60%] h-1.5 rounded ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#E4E3DD]/60'}`} />
                                </div>
                                <div className={`h-4 rounded border flex items-center px-1.5 justify-between ${isActive ? 'border-[#EF4A2A]/30 bg-[#EF4A2A]/5' : 'border-[#E4E3DD] bg-[#F7F7F7]'}`}>
                                  <div className={`w-2.5 h-2.5 rounded ${isActive ? 'bg-[#EF4A2A]/30' : 'bg-[#E4E3DD]'}`} />
                                  <div className={`w-[45%] h-1.5 rounded ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#E4E3DD]/60'}`} />
                                </div>
                              </div>

                              <div className={`w-[52%] h-[85%] rounded-lg border p-2 flex flex-col gap-2 justify-between shrink-0 ${isActive ? 'border-[#EF4A2A]/30 bg-white shadow-sm' : 'border-[#E4E3DD] bg-[#FAF9F6]'}`}>
                                <div className="flex justify-between items-center">
                                  <div className={`w-8 h-1.5 rounded ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#E4E3DD]'}`} />
                                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]' : 'bg-[#E4E3DD]'}`} />
                                </div>
                                <div className={`flex-1 rounded border p-1 flex gap-1 ${isActive ? 'border-[#EF4A2A]/10 bg-[#EF4A2A]/5' : 'border-[#EEEDE9] bg-[#F2F1ED]'}`}>
                                  <div className={`flex-1 rounded bg-white border ${isActive ? 'border-[#EF4A2A]/20' : 'border-[#E4E3DD]/40'}`} />
                                  <div className={`flex-1 rounded bg-white border ${isActive ? 'border-[#EF4A2A]/20' : 'border-[#E4E3DD]/40'}`} />
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-[#EEEDE9] pt-2 flex justify-between items-center text-[7px] font-mono text-[#A09F9A] uppercase tracking-widest shrink-0">
                              <span>MODULAR SYSTEM</span>
                              <span className={isActive ? 'text-[#EF4A2A]' : ''}>PH-03</span>
                            </div>
                          </div>
                        )}

                        {/* PHASE 04 — TEST: Checklists & Verification Dials */}
                        {idx === 3 && (
                          <div className="flex-1 w-full h-full p-4 flex flex-col justify-between select-none">
                            <div className="flex items-center justify-between border-b border-[#EEEDE9] pb-2 shrink-0">
                              <div className="flex gap-1 items-center shrink-0">
                                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/70' : 'bg-[#E4E3DD]'}`} />
                                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/50' : 'bg-[#E4E3DD]'}`} />
                                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/30' : 'bg-[#E4E3DD]'}`} />
                              </div>
                              <span className={`font-mono text-[7px] tracking-wider px-1.5 py-0.5 border rounded-sm ${isActive ? 'text-[#EF4A2A] border-[#EF4A2A]/30 bg-[#EF4A2A]/5' : 'text-[#797872] border-[#E4E3DD]'}`}>VERIFY.TEST</span>
                            </div>

                            <div className="flex-1 py-3 flex gap-3 items-center justify-between overflow-hidden">
                              <div className={`w-[36%] h-[85%] rounded-lg border flex flex-col items-center justify-center p-1 relative shrink-0 ${isActive ? 'border-[#EF4A2A]/20 bg-white shadow-sm' : 'border-[#E4E3DD] bg-[#FAF9F6]'}`}>
                                <svg className={`w-10 h-10 -rotate-90 ${isActive ? 'text-[#EF4A2A]' : 'text-[#A09F9A]'}`} viewBox="0 0 36 36" aria-hidden="true">
                                  <path
                                    className="text-gray-100"
                                    strokeWidth="3.5"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  />
                                  <path
                                    strokeWidth="3.5"
                                    strokeDasharray="75, 100"
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    opacity={isActive ? 1 : 0.4}
                                  />
                                </svg>
                                <span className={`font-mono text-[7px] font-bold mt-1 ${isActive ? 'text-[#EF4A2A]' : 'text-[#797872]'}`}>75% AA</span>
                              </div>

                              <div className="flex-1 h-[85%] flex flex-col gap-1.5 justify-center">
                                <div className="flex items-center gap-1.5">
                                  <div className={`w-2.5 h-2.5 rounded-sm border flex items-center justify-center shrink-0 ${isActive ? 'border-[#EF4A2A] bg-[#EF4A2A]/10 text-[#EF4A2A]' : 'border-[#E4E3DD] bg-white'}`}>
                                    <span className="text-[7px] leading-none font-bold" aria-hidden="true">✓</span>
                                  </div>
                                  <div className={`h-1.5 w-[75%] rounded ${isActive ? 'bg-[#EF4A2A]/30' : 'bg-[#E4E3DD]'}`} />
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <div className={`w-2.5 h-2.5 rounded-sm border flex items-center justify-center shrink-0 ${isActive ? 'border-[#EF4A2A] bg-[#EF4A2A]/10 text-[#EF4A2A]' : 'border-[#E4E3DD] bg-white'}`}>
                                    <span className="text-[7px] leading-none font-bold" aria-hidden="true">✓</span>
                                  </div>
                                  <div className={`h-1.5 w-[55%] rounded ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#E4E3DD]'}`} />
                                </div>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-[#EEEDE9] pt-2 flex justify-between items-center text-[7px] font-mono text-[#A09F9A] uppercase tracking-widest shrink-0">
                              <span>CRAFT CHECKLIST</span>
                              <span className={isActive ? 'text-[#EF4A2A]' : ''}>PH-04</span>
                            </div>
                          </div>
                        )}

                        {/* PHASE 05 — DEPLOY: Elite Coral UI & Product Preview */}
                        {idx === 4 && (
                          <div className={`flex-1 w-full h-full p-4 flex flex-col justify-between select-none rounded-xl transition-colors duration-300 ${isActive ? 'bg-[#FFF5F2]' : 'bg-white'}`}>
                            {/* Browser Bar */}
                            <div className="flex items-center justify-between border-b border-[#EEEDE9] pb-2 shrink-0">
                              <div className="flex gap-1 items-center shrink-0">
                                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]' : 'bg-[#E4E3DD]'}`} />
                                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/60' : 'bg-[#E4E3DD]/60'}`} />
                                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/40' : 'bg-[#E4E3DD]/40'}`} />
                              </div>

                              <div className={`w-28 h-2.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/8 border border-[#EF4A2A]/10' : 'bg-[#F2F1ED]'} flex items-center justify-center`} />

                              <div className="flex gap-1 items-center">
                                <div className={`w-6 h-2 rounded-sm ${isActive ? 'bg-[#EF4A2A]/10 border border-[#EF4A2A]/30' : 'bg-[#EEEDE9] border border-[#E4E3DD]'}`} />
                                <div className="w-4 h-2 rounded-sm bg-[#EEEDE9] border border-[#E4E3DD]/50" />
                              </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 py-3 flex gap-4 items-center justify-between overflow-hidden relative" aria-hidden="true">

                              {/* Left Column (UI controls) */}
                              <div className="flex flex-col gap-2 w-[48%] shrink-0 h-full justify-center">
                                {/* $179.99 tag */}
                                <span className={`font-sans text-[18px] sm:text-[20px] font-medium tracking-tight leading-none ${isActive ? 'text-[#EF4A2A]' : 'text-[#797872]'}`}>
                                  $179.99
                                </span>

                                {/* 4 dots (first filled) */}
                                <div className="flex gap-1.5 my-0.5 items-center">
                                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]' : 'bg-[#797872]'}`} />
                                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/30 border border-[#EF4A2A]/60' : 'bg-[#E4E3DD]'}`} />
                                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/30 border border-[#EF4A2A]/60' : 'bg-[#E4E3DD]'}`} />
                                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/30 border border-[#EF4A2A]/60' : 'bg-[#E4E3DD]'}`} />
                                </div>

                                {/* Switch toggles & button pills */}
                                <div className="flex gap-2 items-center">
                                  <div className={`w-9 h-3.5 rounded-full ${isActive ? 'bg-[#EF4A2A] shadow-sm shadow-[#EF4A2A]/20' : 'bg-[#797872]/40'} shrink-0`} />

                                  <div className={`w-10 h-3.5 rounded-full border shrink-0 flex items-center p-0.5 relative ${isActive ? 'border-[#EF4A2A] text-[#EF4A2A]' : 'border-[#E4E3DD] text-[#797872]'}`}>
                                    <span className="w-2.5 h-2.5 rounded-full bg-current absolute right-0.5" />
                                  </div>
                                </div>

                                {/* Text lines */}
                                <div className="flex flex-col gap-1 mt-1">
                                  <div className={`h-1.5 w-full rounded-sm ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#EEEDE9]'}`} />
                                  <div className={`h-1.5 w-3/4 rounded-sm ${isActive ? 'bg-[#EF4A2A]/15' : 'bg-[#EEEDE9]/60'}`} />
                                </div>
                              </div>

                              {/* Right Column: ELEGANT ELEVATED PRODUCT PREVIEW CARD */}
                              <div className={`absolute bottom-2.5 right-0.5 w-[46%] h-[82%] rounded-lg bg-white border flex flex-col justify-center items-center p-1.5 transition-[box-shadow,transform] duration-300 ${
                                isActive
                                  ? 'border-[#EF4A2A]/20 shadow-[0_16px_28px_rgba(239,74,42,0.16)] -translate-y-1'
                                  : 'border-[#E4E3DD]/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)]'
                              }`}>
                                <div className={`w-full h-full rounded-md border transition-colors ${
                                  isActive
                                    ? 'bg-[#EF4A2A]/6 border-[#EF4A2A]/20'
                                    : 'bg-[#FAF9F5] border-[#E4E3DD]'
                                }`} />
                              </div>

                              {/* Pointing/annotation line matching the diagram (exactly like the image!) */}
                              {isActive && (
                                <div className="absolute -left-5.5 top-12 pointer-events-none z-30 flex items-center">
                                  <svg width="45" height="15" viewBox="0 0 45 15" fill="none" aria-hidden="true">
                                    <path d="M1 7.5H35" stroke="#161618" strokeWidth="1" />
                                    <circle cx="35" cy="7.5" r="1.5" fill="#161618" />
                                  </svg>
                                </div>
                              )}
                            </div>

                            {/* Footer */}
                            <div className="border-t border-[#EEEDE9] pt-2 flex justify-between items-center text-[7px] font-mono text-[#A09F9A] uppercase tracking-widest shrink-0 font-bold">
                              <span>PRODUCTION PLATFORM</span>
                              <span className={isActive ? 'text-[#EF4A2A]' : ''}>PH-05</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ─── COLUMN 3: TEXT DESCRIPTIONS (Right) ─── */}
            <div
              id="process-phase-content"
              role="tabpanel"
              aria-live="polite"
              aria-atomic="true"
              className="flex flex-col justify-center w-full mx-auto px-2 lg:px-0 shrink-0 text-center lg:text-left"
            >
              <div ref={textRef} className="flex flex-col">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.16em] text-[#EF4A2A] uppercase select-none">
                  {activePhase.overline}
                </span>

                <h3 className="font-serif text-[clamp(1.3rem,2.8vw,2.1rem)] font-light italic text-[#0C0C0E] mt-2 sm:mt-3 leading-tight">
                  {activePhase.title}
                </h3>

                <p className="font-sans text-[13px] sm:text-[14px] text-[#5C5B56] leading-[1.65] mt-2 sm:mt-3">
                  {activePhase.copy}
                </p>

                {/* Dynamic arrow link */}
                <div className="mt-3.5 sm:mt-6 flex items-center justify-center lg:justify-start">
                  <button
                    type="button"
                    onClick={openBooking}
                    className="group inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-[0.16em] text-[#161618] hover:text-[#EF4A2A] transition-colors duration-200 uppercase cursor-pointer border-none bg-transparent outline-none p-0 focus-visible:ring-2 focus-visible:ring-[#EF4A2A] focus-visible:ring-offset-2"
                  >
                    LET&apos;S BUILD TOGETHER
                    <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                      »
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* MOBILE / TABLET INTERFACE (lg:hidden)                 */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="flex lg:hidden flex-col flex-none items-center justify-start w-full pt-3 pb-2 gap-y-4 overflow-visible">

            {/* Mobile horizontal phase progress indicators */}
            <div
              className="flex justify-center items-center gap-1.5 flex-wrap shrink-0"
              role="tablist"
              aria-label="Project phases"
            >
              {PHASES.map((phase, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={phase.id + '-mob-tab'}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="process-phase-content-mobile"
                    aria-label={`Phase ${idx + 1}: ${phase.label}`}
                    onClick={() => scrollToPhase(idx)}
                    className={`px-3 py-1.5 rounded-full border text-[9px] sm:text-[10px] font-bold font-mono tracking-wider cursor-pointer outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#EF4A2A] focus-visible:ring-offset-2 ${
                      isActive
                        ? 'bg-[#161618] border-[#161618] text-white shadow-sm'
                        : 'bg-transparent border-[#E4E3DD] text-[#6B6A65] hover:border-[#161618] hover:text-[#161618]'
                    }`}
                  >
                    {phase.label}
                  </button>
                );
              })}
            </div>

            {/* 2D Flat Layered Card Deck for Mobile */}
            <div className="w-full max-w-62.5 xs:max-w-[270px] aspect-[1.38] relative mx-auto shrink-0 my-4 overflow-visible">
              {/* Decorative Background Card for layered stack effect */}
              <div className="absolute inset-0 rounded-xl border border-[#E4E3DD] bg-[#FAF9F5]/80 translate-x-2 translate-y-2 opacity-60 -z-10" />
              
              {PHASES.map((phase, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <div
                    key={phase.id + '-mobile-card'}
                    className={`absolute inset-0 rounded-xl border shadow-[0_6px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      isActive
                        ? 'opacity-100 translate-y-0 scale-100 z-10 pointer-events-auto'
                        : 'opacity-0 translate-y-4 scale-95 z-0 pointer-events-none'
                    } ${
                      idx === 4
                        ? 'border-[#EF4A2A] bg-[#FFF5F2]'
                        : idx === 0
                          ? 'border-[#E4E3DD] bg-[#FAF9F5]'
                          : 'border-[#E4E3DD] bg-white'
                    }`}
                  >
                    {/* PHASE 01 — PLAN: Thick Baseboard / Hardware Slab */}
                    {idx === 0 && (
                      <div className="flex-1 w-full h-full relative p-3.5 flex flex-col justify-between select-none">
                        <div className={`absolute inset-1.5 rounded-lg border ${isActive ? 'border-[#EF4A2A]/40' : 'border-[#EEEDE9]'} pointer-events-none`} />

                        {/* Corner mechanical screw holes */}
                        <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full border border-[#D0CFC9] bg-[#EBEAE4] flex items-center justify-center">
                          <div className="w-0.5 h-0.5 rounded-full bg-[#A09F9A]" />
                        </div>
                        <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full border border-[#D0CFC9] bg-[#EBEAE4] flex items-center justify-center">
                          <div className="w-0.5 h-0.5 rounded-full bg-[#A09F9A]" />
                        </div>
                        <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full border border-[#D0CFC9] bg-[#EBEAE4] flex items-center justify-center">
                          <div className="w-0.5 h-0.5 rounded-full bg-[#A09F9A]" />
                        </div>
                        <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full border border-[#D0CFC9] bg-[#EBEAE4] flex items-center justify-center">
                          <div className="w-0.5 h-0.5 rounded-full bg-[#A09F9A]" />
                        </div>

                        {/* Header details */}
                        <div className="w-full flex justify-between items-center px-6 pt-0.5 shrink-0">
                          <span className={`font-mono text-[6px] font-bold tracking-[0.2em] ${isActive ? 'text-[#EF4A2A]/60' : 'text-[#A09F9A]'}`}>PLANNING UNIT</span>
                          <div className="flex gap-0.5">
                            <div className={`w-2 h-0.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/40' : 'bg-[#E4E3DD]'}`} />
                            <div className={`w-1 h-0.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#E4E3DD]/50'}`} />
                          </div>
                        </div>

                        {/* Circuit nodes & horizontal slot */}
                        <div className="flex-1 flex flex-col items-center justify-center px-4 gap-2">
                          <div className={`w-[75%] h-3.5 rounded-full border ${isActive ? 'border-[#EF4A2A]/30 bg-[#EF4A2A]/5' : 'border-[#E4E3DD] bg-[#F7F7F7]'} flex items-center justify-center shrink-0`}>
                            <span className={`font-mono text-[7px] tracking-[0.15em] font-medium ${isActive ? 'text-[#EF4A2A]/70' : 'text-[#797872]'}`}>BASEPLATE SYSTEM</span>
                          </div>

                          <div className="w-full max-w-37.5 flex justify-between items-center relative mt-0.5 shrink-0">
                            <div className={`absolute left-0 right-0 h-px ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#E4E3DD]'}`} />
                            <div className={`relative w-3.5 h-3.5 rounded-full border bg-white flex items-center justify-center z-10 ${isActive ? 'border-[#EF4A2A]' : 'border-[#E4E3DD]'}`}>
                              <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#EF4A2A]' : 'bg-[#E4E3DD]'}`} />
                            </div>
                            <div className={`px-1.5 py-0.5 rounded border text-[6px] font-mono font-bold bg-white z-10 ${isActive ? 'border-[#EF4A2A]/40 text-[#EF4A2A]' : 'border-[#E4E3DD] text-[#797872]'}`}>
                              DB_INIT
                            </div>
                            <div className={`relative w-3.5 h-3.5 rounded-full border bg-white flex items-center justify-center z-10 ${isActive ? 'border-[#EF4A2A]' : 'border-[#E4E3DD]'}`}>
                              <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#EF4A2A]' : 'bg-[#E4E3DD]'}`} />
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-[#EEEDE9] pt-1.5 px-1.5 flex justify-between items-center text-[6px] font-mono text-[#A09F9A] uppercase tracking-widest shrink-0">
                          <span>SECURE BASE HARDWARE</span>
                          <span className={isActive ? 'text-[#EF4A2A]' : ''}>PH-01</span>
                        </div>
                      </div>
                    )}

                    {/* PHASE 02 — DESIGN: Blueprints & Grid Guides */}
                    {idx === 1 && (
                      <div className="flex-1 w-full h-full p-3.5 flex flex-col justify-between select-none">
                        {/* Top browser bar */}
                        <div className="flex items-center justify-between border-b border-[#EEEDE9] pb-1.5 shrink-0">
                          <div className="flex gap-0.5 items-center shrink-0">
                            <span className={`w-1.5 h-1.5 rounded-full border ${isActive ? 'border-[#EF4A2A] bg-transparent' : 'border-[#E4E3DD]'}`} />
                            <span className={`w-1.5 h-1.5 rounded-full border ${isActive ? 'border-[#EF4A2A]/60 bg-transparent' : 'border-[#E4E3DD]/60'}`} />
                            <span className={`w-1.5 h-1.5 rounded-full border ${isActive ? 'border-[#EF4A2A]/40 bg-transparent' : 'border-[#E4E3DD]/40'}`} />
                          </div>
                          <div className={`w-16 h-1.5 rounded-full border ${isActive ? 'border-[#EF4A2A]/20 bg-transparent' : 'border-[#E4E3DD]/30 bg-transparent'}`} />
                        </div>

                        {/* Wireframe grids */}
                        <div className="flex-1 py-2 flex gap-2 items-center justify-between overflow-hidden">
                          <div className={`w-[30%] h-[90%] border border-dashed rounded p-1 flex flex-col gap-1 shrink-0 ${isActive ? 'border-[#EF4A2A]/30' : 'border-[#E4E3DD]'}`}>
                            <div className={`h-1.5 w-full rounded border ${isActive ? 'border-[#EF4A2A]/40' : 'border-[#E4E3DD]'}`} />
                            <div className={`h-1 w-3/4 rounded border border-dashed ${isActive ? 'border-[#EF4A2A]/30' : 'border-[#E4E3DD]/70'}`} />
                            <div className={`h-1 w-1/2 rounded border border-dashed ${isActive ? 'border-[#EF4A2A]/30' : 'border-[#E4E3DD]/70'}`} />
                          </div>

                          <div className={`flex-1 h-[90%] border border-dashed rounded p-1.5 flex flex-col gap-1.5 relative justify-center ${isActive ? 'border-[#EF4A2A]/40' : 'border-[#E4E3DD]'}`}>
                            <div className="flex gap-1.5 flex-1 items-center">
                              <div className={`flex-1 h-[80%] rounded border flex flex-col items-center justify-center border-dashed ${isActive ? 'border-[#EF4A2A]/40' : 'border-[#E4E3DD]/70'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full border ${isActive ? 'border-[#EF4A2A]' : 'border-[#E4E3DD]'}`} />
                              </div>
                              <div className={`flex-1 h-[80%] rounded border flex flex-col items-center justify-center border-dashed ${isActive ? 'border-[#EF4A2A]/40' : 'border-[#E4E3DD]/70'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full border ${isActive ? 'border-[#EF4A2A]' : 'border-[#E4E3DD]'}`} />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-[#EEEDE9] pt-1.5 flex justify-between items-center text-[6px] font-mono text-[#A09F9A] uppercase tracking-widest shrink-0">
                          <span>BLUEPRINT SYSTEMS</span>
                          <span className={isActive ? 'text-[#EF4A2A]' : ''}>PH-02</span>
                        </div>
                      </div>
                    )}

                    {/* PHASE 03 — DEVELOP: Modular Grid Blocks */}
                    {idx === 2 && (
                      <div className="flex-1 w-full h-full p-3.5 flex flex-col justify-between select-none">
                        <div className="flex items-center justify-between border-b border-[#EEEDE9] pb-1.5 shrink-0">
                          <div className="flex gap-0.5 items-center shrink-0">
                            <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#EF4A2A]/60' : 'bg-[#E4E3DD]'}`} />
                            <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#EF4A2A]/40' : 'bg-[#E4E3DD]'}`} />
                            <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#E4E3DD]'}`} />
                          </div>
                          <div className="flex gap-0.5">
                            <div className={`w-4 h-1.5 rounded-sm ${isActive ? 'bg-[#EF4A2A]/10 border border-[#EF4A2A]/20' : 'bg-[#EEEDE9] border border-[#E4E3DD]'}`} />
                            <div className="w-2 h-1.5 rounded-sm bg-[#EEEDE9]" />
                          </div>
                        </div>

                        <div className="flex-1 py-2 flex gap-2 items-center justify-between overflow-hidden">
                          <div className="flex-1 h-[90%] flex flex-col gap-1 justify-center">
                            <div className={`h-3 rounded border flex items-center px-1 justify-between ${isActive ? 'border-[#EF4A2A]/30 bg-[#EF4A2A]/5' : 'border-[#E4E3DD] bg-[#F7F7F7]'}`}>
                              <div className={`w-2 h-2 rounded ${isActive ? 'bg-[#EF4A2A]/30' : 'bg-[#E4E3DD]'}`} />
                              <div className={`w-[55%] h-1 rounded ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#E4E3DD]/60'}`} />
                            </div>
                            <div className={`h-3 rounded border flex items-center px-1 justify-between ${isActive ? 'border-[#EF4A2A]/30 bg-[#EF4A2A]/5' : 'border-[#E4E3DD] bg-[#F7F7F7]'}`}>
                              <div className={`w-2 h-2 rounded ${isActive ? 'bg-[#EF4A2A]/30' : 'bg-[#E4E3DD]'}`} />
                              <div className={`w-[40%] h-1 rounded ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#E4E3DD]/60'}`} />
                            </div>
                          </div>

                          <div className={`w-[52%] h-[90%] rounded border p-1.5 flex flex-col gap-1.5 justify-between shrink-0 ${isActive ? 'border-[#EF4A2A]/30 bg-white shadow-sm' : 'border-[#E4E3DD] bg-[#FAF9F6]'}`}>
                            <div className="flex justify-between items-center">
                              <div className={`w-6 h-1 rounded ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#E4E3DD]'}`} />
                              <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#EF4A2A]' : 'bg-[#E4E3DD]'}`} />
                            </div>
                            <div className={`flex-1 rounded border p-0.5 flex gap-0.5 ${isActive ? 'border-[#EF4A2A]/10 bg-[#EF4A2A]/5' : 'border-[#EEEDE9] bg-[#F2F1ED]'}`}>
                              <div className={`flex-1 rounded bg-white border ${isActive ? 'border-[#EF4A2A]/20' : 'border-[#E4E3DD]/40'}`} />
                              <div className={`flex-1 rounded bg-white border ${isActive ? 'border-[#EF4A2A]/20' : 'border-[#E4E3DD]/40'}`} />
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-[#EEEDE9] pt-1.5 flex justify-between items-center text-[6px] font-mono text-[#A09F9A] uppercase tracking-widest shrink-0">
                          <span>MODULAR SYSTEM</span>
                          <span className={isActive ? 'text-[#EF4A2A]' : ''}>PH-03</span>
                        </div>
                      </div>
                    )}

                    {/* PHASE 04 — TEST: Checklists & Verification Dials */}
                    {idx === 3 && (
                      <div className="flex-1 w-full h-full p-3.5 flex flex-col justify-between select-none">
                        <div className="flex items-center justify-between border-b border-[#EEEDE9] pb-1.5 shrink-0">
                          <div className="flex gap-0.5 items-center shrink-0">
                            <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#EF4A2A]/70' : 'bg-[#E4E3DD]'}`} />
                            <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#EF4A2A]/50' : 'bg-[#E4E3DD]'}`} />
                            <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#EF4A2A]/30' : 'bg-[#E4E3DD]'}`} />
                          </div>
                          <span className={`font-mono text-[5.5px] tracking-wider px-1 py-0.5 border rounded-sm ${isActive ? 'text-[#EF4A2A] border-[#EF4A2A]/30 bg-[#EF4A2A]/5' : 'text-[#797872] border-[#E4E3DD]'}`}>VERIFY.TEST</span>
                        </div>

                        <div className="flex-1 py-2 flex gap-2 items-center justify-between overflow-hidden">
                          <div className={`w-[36%] h-[90%] rounded border flex flex-col items-center justify-center p-0.5 relative shrink-0 ${isActive ? 'border-[#EF4A2A]/20 bg-white shadow-sm' : 'border-[#E4E3DD] bg-[#FAF9F6]'}`}>
                            <svg className={`w-7 h-7 -rotate-90 ${isActive ? 'text-[#EF4A2A]' : 'text-[#A09F9A]'}`} viewBox="0 0 36 36" aria-hidden="true">
                              <path
                                className="text-gray-100"
                                strokeWidth="3.5"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                strokeWidth="3.5"
                                strokeDasharray="75, 100"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                opacity={isActive ? 1 : 0.4}
                              />
                            </svg>
                            <span className={`font-mono text-[5.5px] font-bold mt-0.5 ${isActive ? 'text-[#EF4A2A]' : 'text-[#797872]'}`}>75% AA</span>
                          </div>

                          <div className="flex-1 h-[90%] flex flex-col gap-1 justify-center">
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-sm border flex items-center justify-center shrink-0 ${isActive ? 'border-[#EF4A2A] bg-[#EF4A2A]/10 text-[#EF4A2A]' : 'border-[#E4E3DD] bg-white'}`}>
                                <span className="text-[5px] leading-none font-bold" aria-hidden="true">✓</span>
                              </div>
                              <div className={`h-1 w-[75%] rounded ${isActive ? 'bg-[#EF4A2A]/30' : 'bg-[#E4E3DD]'}`} />
                            </div>
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-sm border flex items-center justify-center shrink-0 ${isActive ? 'border-[#EF4A2A] bg-[#EF4A2A]/10 text-[#EF4A2A]' : 'border-[#E4E3DD] bg-white'}`}>
                                <span className="text-[5px] leading-none font-bold" aria-hidden="true">✓</span>
                              </div>
                              <div className={`h-1 w-[55%] rounded ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#E4E3DD]'}`} />
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-[#EEEDE9] pt-1.5 flex justify-between items-center text-[6px] font-mono text-[#A09F9A] uppercase tracking-widest shrink-0">
                          <span>CRAFT CHECKLIST</span>
                          <span className={isActive ? 'text-[#EF4A2A]' : ''}>PH-04</span>
                        </div>
                      </div>
                    )}

                    {/* PHASE 05 — DEPLOY: Elite Coral UI & Product Preview */}
                    {idx === 4 && (
                      <div className={`flex-1 w-full h-full p-3.5 flex flex-col justify-between select-none rounded-xl transition-colors duration-300 ${isActive ? 'bg-[#FFF5F2]' : 'bg-white'}`}>
                        {/* Browser Bar */}
                        <div className="flex items-center justify-between border-b border-[#EEEDE9] pb-1.5 shrink-0">
                          <div className="flex gap-0.5 items-center shrink-0">
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]' : 'bg-[#E4E3DD]'}`} />
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/60' : 'bg-[#E4E3DD]/60'}`} />
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EF4A2A]/40' : 'bg-[#E4E3DD]/40'}`} />
                          </div>

                          <div className={`w-20 h-2 rounded-full ${isActive ? 'bg-[#EF4A2A]/8 border border-[#EF4A2A]/10' : 'bg-[#F2F1ED]'} flex items-center justify-center`} />

                          <div className="flex gap-0.5 items-center">
                            <div className={`w-4 h-1.5 rounded-sm ${isActive ? 'bg-[#EF4A2A]/10 border border-[#EF4A2A]/30' : 'bg-[#EEEDE9] border border-[#E4E3DD]'}`} />
                            <div className="w-2.5 h-1.5 rounded-sm bg-[#EEEDE9] border border-[#E4E3DD]/50" />
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 py-2 flex gap-2 items-center justify-between overflow-hidden relative" aria-hidden="true">
                          {/* Left Column (UI controls) */}
                          <div className="flex flex-col gap-1 w-[48%] shrink-0 h-full justify-center">
                            {/* $179.99 tag */}
                            <span className={`font-sans text-[13px] sm:text-[14px] font-medium tracking-tight leading-none ${isActive ? 'text-[#EF4A2A]' : 'text-[#797872]'}`}>
                              $179.99
                            </span>

                            {/* 4 dots */}
                            <div className="flex gap-1 my-0.5 items-center">
                              <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#EF4A2A]' : 'bg-[#797872]'}`} />
                              <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#EF4A2A]/30 border border-[#EF4A2A]/60' : 'bg-[#E4E3DD]'}`} />
                              <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#EF4A2A]/30 border border-[#EF4A2A]/60' : 'bg-[#E4E3DD]'}`} />
                              <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#EF4A2A]/30 border border-[#EF4A2A]/60' : 'bg-[#E4E3DD]'}`} />
                            </div>

                            {/* Switch toggles & button pills */}
                            <div className="flex gap-1 items-center">
                              <div className={`w-6 h-2.5 rounded-full ${isActive ? 'bg-[#EF4A2A] shadow-sm shadow-[#EF4A2A]/20' : 'bg-[#797872]/40'} shrink-0`} />

                              <div className={`w-7 h-2.5 rounded-full border shrink-0 flex items-center p-0.5 relative ${isActive ? 'border-[#EF4A2A] text-[#EF4A2A]' : 'border-[#E4E3DD] text-[#797872]'}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current absolute right-0.5" />
                              </div>
                            </div>

                            {/* Text lines */}
                            <div className="flex flex-col gap-0.5 mt-0.5">
                              <div className={`h-1 w-full rounded-sm ${isActive ? 'bg-[#EF4A2A]/20' : 'bg-[#EEEDE9]'}`} />
                              <div className={`h-1 w-3/4 rounded-sm ${isActive ? 'bg-[#EF4A2A]/15' : 'bg-[#EEEDE9]/60'}`} />
                            </div>
                          </div>

                          {/* Right Column: ELEVATED PRODUCT PREVIEW CARD */}
                          <div className={`absolute bottom-1 right-0.5 w-[46%] h-[82%] rounded bg-white border flex flex-col justify-center items-center p-1 transition-[box-shadow,transform] duration-300 ${
                            isActive
                              ? 'border-[#EF4A2A]/20 shadow-[0_12px_20px_rgba(239,74,42,0.12)] -translate-y-0.5'
                              : 'border-[#E4E3DD]/80 shadow-[0_3px_8px_rgba(0,0,0,0.03)]'
                          }`}>
                            <div className={`w-full h-full rounded-sm border transition-colors ${
                              isActive
                                ? 'bg-[#EF4A2A]/6 border-[#EF4A2A]/20'
                                : 'bg-[#FAF9F5] border-[#E4E3DD]'
                            }`} />
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-[#EEEDE9] pt-1.5 flex justify-between items-center text-[6px] font-mono text-[#A09F9A] uppercase tracking-widest shrink-0 font-bold">
                          <span>PRODUCTION PLATFORM</span>
                          <span className={isActive ? 'text-[#EF4A2A]' : ''}>PH-05</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Text Descriptions */}
            <div
              id="process-phase-content-mobile"
              role="tabpanel"
              aria-live="polite"
              aria-atomic="true"
              className="flex flex-col items-center text-center w-full px-fluid-x shrink-0 mt-fluid-gap-lg"
            >
              <span className="font-mono text-[10px] font-bold tracking-[0.14em] text-[#EF4A2A] uppercase">
                {activePhase.overline}
              </span>

              <h3 className="font-serif text-[21px] xs:text-[23px] font-light italic text-[#0C0C0E] mt-5 leading-tight">
                {activePhase.title}
              </h3>

              <p className="font-sans text-[13px] xs:text-[14px] sm:text-[14.5px] text-[#797872] leading-[1.6] mt-1.5 max-w-[42ch]">
                {activePhase.copy}
              </p>

              {/* Dynamic arrow link */}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={openBooking}
                  className="group inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-[0.14em] text-[#161618] hover:text-[#EF4A2A] transition-colors duration-200 uppercase cursor-pointer border-none bg-transparent outline-none p-0 focus-visible:ring-2 focus-visible:ring-[#EF4A2A] focus-visible:ring-offset-2"
                >
                  LET&apos;S BUILD TOGETHER
                  <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                    »
                  </span>
                </button>
              </div>
            </div>

          </div>

          {/* SCROLL PROGRESS FOOTER */}
          <div className="flex justify-between items-center border-t border-[#E4E3DD] pt-fluid-gap-sm mt-auto sm:mt-fluid-gap-md lg:mt-fluid-gap-lg shrink-0 text-[10px] font-mono text-[#A09F9A] tracking-[0.14em] uppercase select-none">
            <span>EXECUTION PIPELINE</span>
            <span>PHASE 0{activeIdx + 1} / 05</span>
          </div>

        </div>
      </div>
    </section>
  );
}
