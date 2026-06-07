'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

// Axioms data
const AXIOMS = [
  "Speed without direction compounds mistakes.",
  "Direction compounds results.",
  "We architect clarity. You move with purpose."
];

// Crosshair Icon component
const Crosshair = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <line x1="12" y1="4" x2="12" y2="20" />
    <line x1="4" y1="12" x2="20" y2="12" />
  </svg>
);

export default function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1] as [number, number, number, number], // Strong ease-out
      }
    }
  };

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative isolate w-full bg-[#0C0C0E] text-[#EEEDE9] py-fluid-section-y px-fluid-x"
      aria-labelledby="manifesto-heading"
    >
      {/* Delicate Technical Grid Pattern Overlay */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(244, 243, 239, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(244, 243, 239, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 80%)'
        }}
      />

      {/* Outer Technical Frame */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="w-full max-w-360 mx-auto border-y border-white/10 flex flex-col relative overflow-hidden"
      >
        {/* Top Header Row */}
        <div className="w-full flex items-center justify-between px-6 py-5 border-b border-white/10 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#EEEDE9]/60 select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#FF4500]" />
            <span className="font-bold">PLANICLE LABS</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">28.6139° N, 77.2090° E</span>
            <span className="text-[#FF4500] font-bold text-xs">+</span>
          </div>
        </div>

        {/* Main Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_300px_180px] w-full relative">
          
          {/* Column 1: Left Vertical Philosophy Bar (Rotated on Desktop, Stacked on Mobile) */}
          <div className="border-b lg:border-b-0 border-white/10 flex lg:flex-col items-center justify-between p-4 lg:py-10 lg:px-0 relative select-none">
            {/* Desktop rotated text */}
            <div className="hidden lg:block lg:rotate-90 lg:whitespace-nowrap font-mono text-[9px] tracking-[0.35em] text-[#EEEDE9]/40 uppercase origin-center my-auto">
              PHILOSOPHY
            </div>
            {/* Mobile text */}
            <span className="lg:hidden font-mono text-[9px] tracking-[0.3em] text-[#EEEDE9]/50 uppercase">
              PHILOSOPHY
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#FF4500] font-bold mt-auto">
              001
            </span>
          </div>

          {/* Column 2: Main Hero Text (Left-Center Column) */}
          <div className="p-fluid-card-p border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center min-w-0">
            {/* HUD Callout marker */}
            <div className="flex items-center gap-2 mb-6 sm:mb-8 text-[#EEEDE9]/30 font-mono text-[8px] tracking-[0.2em] select-none">
              <Crosshair className="w-3 h-3 text-[#FF4500]/70" />
              <span>TYPOGRAPHIC ORIENTATION MODEL V1.0</span>
            </div>

            {/* Interlocking Typography */}
            <h2
              id="manifesto-heading"
              className="text-[#EEEDE9] font-normal leading-[0.84] tracking-tight select-none"
              style={{ fontSize: 'clamp(2.25rem, 5.6vw, 6.25rem)' }}
            >
              <motion.div variants={itemVariants} className="block sm:whitespace-nowrap">
                <span className="font-cormorant lowercase italic font-light text-[1.05em] pr-3 tracking-normal">your</span>
                <span className="font-antonio uppercase font-bold tracking-tighter text-[1.12em]">DIRECTION</span>
              </motion.div>
              <motion.div variants={itemVariants} className="mt-[-0.02em] ml-[0.35em] block sm:whitespace-nowrap">
                <span className="font-antonio uppercase font-bold tracking-tighter text-[1.12em] pr-3">IS</span>
                <span className="font-cormorant lowercase italic font-light text-[1.05em] tracking-normal">more</span>
              </motion.div>
              <motion.div variants={itemVariants} className="mt-[-0.04em] block sm:whitespace-nowrap">
                <span className="font-antonio uppercase font-bold tracking-tighter text-[1.12em]">IMPORTANT</span>
              </motion.div>
              <motion.div variants={itemVariants} className="mt-[-0.04em] block sm:whitespace-nowrap">
                <span className="font-cormorant lowercase italic font-light text-[1.05em] pr-3 tracking-normal">than</span>
                <span className="font-antonio uppercase font-bold tracking-tighter text-[1.12em]">YOUR</span>
              </motion.div>
              <motion.div variants={itemVariants} className="mt-[-0.04em] block sm:whitespace-nowrap">
                <span className="font-cormorant lowercase italic font-light text-[1.28em] tracking-normal animate-pulse-slow">
                  speed
                  <span className="inline-block w-[0.1em] h-[0.1em] rounded-full bg-[#FF4500] ml-1.5 align-baseline" />
                </span>
              </motion.div>
            </h2>

            {/* Technical reference annotation */}
            <div className="mt-fluid-gap-md flex items-center gap-fluid-gap-sm select-none opacity-30">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#EEEDE9]/60">REF: P.01</span>
            </div>
          </div>

          {/* Column 3: Right Sidebar Axioms (Center Column on Desktop) */}
          <aside className="p-fluid-card-p border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between gap-fluid-gap-lg">
            <div className="flex flex-col gap-1 select-none">
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#FF4500] font-bold">SYS / 01</span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#EEEDE9] font-bold uppercase">ORIENTATION LAYER</span>
            </div>

            <div className="flex flex-col gap-6 font-sans text-[13px] leading-relaxed text-[#EEEDE9]/80 my-auto">
              {AXIOMS.map((axiom, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <div className="flex items-center gap-2 select-none opacity-30 py-1">
                      <span className="h-px w-6 bg-white/30" />
                      <span className="text-[8px] font-mono tracking-widest">—</span>
                      <span className="h-px w-6 bg-white/30" />
                    </div>
                  )}
                  <motion.p
                    variants={itemVariants}
                    className="max-w-70 font-light hover:text-[#EEEDE9] transition-colors duration-200"
                  >
                    &ldquo;{axiom}&rdquo;
                  </motion.p>
                </React.Fragment>
              ))}
            </div>

            {/* Bottom accent for column */}
            <div className="hidden lg:flex items-center gap-2 select-none opacity-30 font-mono text-[8px] tracking-widest mt-auto">
              <span>STATUS: STABLE</span>
            </div>
          </aside>

          {/* Column 4: Far Right Abstract Graphic Column */}
          <div className="p-fluid-gap-md flex flex-col items-center justify-center relative overflow-hidden group min-h-55 sm:min-h-75 lg:min-h-0">
            {/* Subtle wireframe overlay on the image container */}
            <div className="relative w-full h-full min-h-62.5 border border-white/15 p-1.5 flex items-center justify-center bg-black/40 overflow-hidden">
              {/* Corner crosshairs for technical HUD style */}
              <div className="absolute top-1.5 left-1.5 text-white/30 pointer-events-none select-none font-bold text-[8px]">+</div>
              <div className="absolute top-1.5 right-1.5 text-white/30 pointer-events-none select-none font-bold text-[8px]">+</div>
              <div className="absolute bottom-1.5 left-1.5 text-white/30 pointer-events-none select-none font-bold text-[8px]">+</div>
              <div className="absolute bottom-1.5 right-1.5 text-white/30 pointer-events-none select-none font-bold text-[8px]">+</div>

              {/* The Concrete Image */}
              <Image
                src="/brutalist_concrete.webp"
                alt="Brutalist concrete architectural fragment with sharp angles and shadows"
                fill
                sizes="(max-width: 1024px) 100vw, 180px"
                className="object-cover grayscale opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
              />

              {/* Technical label overlay */}
              <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-[2px] border border-white/10 px-2 py-1 font-mono text-[8px] sm:text-[7px] tracking-widest text-[#EEEDE9]/60 select-none">
                IMG_REF // BRUTALIST_01
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Footer Row */}
        <div className="w-full border-t border-white/10 grid grid-cols-1 md:grid-cols-2 p-fluid-gap-md gap-fluid-gap-md font-mono text-[9px] tracking-[0.2em] text-[#EEEDE9]/50 select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#FF4500] animate-pulse" />
            <span>WE BUILD SYSTEMS THAT CREATE LEVERAGE.</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 md:text-right">
            <div>
              <span>PLANICLE LABS</span>
              <span className="mx-2 text-white/20">|</span>
              <span>© 2026</span>
            </div>
            
            {/* Bottom Right Status Block */}
            <div className="flex flex-col gap-0.5 text-left md:text-right border-l md:border-l-0 md:border-r-0 md:pl-0 border-white/10 pl-3">
              <div className="flex items-center gap-1.5 md:justify-end">
                <span className="text-[#EEEDE9]/30">LAYER:</span>
                <span className="text-[#EEEDE9]/80 font-bold">01 - ORIENTATION</span>
              </div>
              <div className="flex items-center gap-1.5 md:justify-end">
                <span className="text-[#EEEDE9]/30">STATUS:</span>
                <span className="text-[#FF4500] font-bold">ACTIVE</span>
              </div>
              <div className="flex items-center gap-1.5 md:justify-end">
                <span className="text-[#EEEDE9]/30">FOCUS:</span>
                <span className="text-[#EEEDE9]/80 font-bold">CLARITY</span>
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
