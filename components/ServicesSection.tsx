'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ManifestoSection from './ManifestoSection';

/* ─── Service Data ─── */
interface Service {
  id: string;
  num: string;
  tag1: string;
  tag2: string;
  tag3: string;
  title: string;
  description: string;
  pills: string[];
}

const SERVICES: Service[] = [
  {
    id: 'product-systems',
    num: '01',
    tag1: 'SYS / 01',
    tag2: 'PRODUCT LAYER',
    tag3: 'INVESTOR READY',
    title: 'Product Systems',
    description: 'Bespoke web applications, high-performance APIs, and custom database architecture built with zero tech debt.',
    pills: ['NEXT.JS', 'REACT', 'TYPESCRIPT', 'POSTGRESQL', 'SUPABASE']
  },
  {
    id: 'ai-workflows',
    num: '02',
    tag1: 'SYS / 02',
    tag2: 'AI LAYER',
    tag3: 'AUTONOMOUS PIPELINES',
    title: 'AI Workflow Engineering',
    description: 'Custom LLM integrations, semantic search pipelines, and autonomous agent systems that automate operational drag.',
    pills: ['OPENAI', 'VECTOR SEARCH', 'RAG PIPELINES', 'AGENTIC WORKFLOWS', 'LLMS']
  },
  {
    id: 'growth-infrastructure',
    num: '03',
    tag1: 'SYS / 03',
    tag2: 'GROWTH LAYER',
    tag3: 'ACQUISITION ENGINES',
    title: 'Growth Infrastructure',
    description: 'High-conversion landing pages, custom analytics pipelines, and speed-optimized onboarding flows engineered to convert.',
    pills: ['TECHNICAL SEO', 'CUSTOM ANALYTICS', 'A/B TESTING', 'SPEED OPTIMIZATION', 'FUNNEL METRICS']
  }
];

/* ─── Custom Icons ─── */
const CrosshairIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="3" strokeWidth="0.8" />
  </svg>
);

/* ─── Card Animation Variants ─── */
const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

/* ─── Service Card Component with Cursor-Tracking Border ─── */
function ServiceCard({ 
  service, 
  i, 
  isInView 
}: { 
  service: Service; 
  i: number; 
  isInView: boolean;
}) {
  return (
    <motion.div
      custom={i}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="service-card group relative rounded-[16px] lg:rounded-[24px] border border-n-500/10 bg-[#161618] p-6 sm:p-8 lg:p-6 xl:p-8 flex flex-col gap-5 lg:grid lg:grid-cols-[140px_1fr_250px_40px] xl:grid-cols-[170px_1fr_290px_50px] lg:items-center transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.004] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] overflow-hidden focus-within:ring-1 focus-within:ring-brand-orange/40"
    >
      {/* Dynamic Glow Border Layer */}
      <div 
        className="glow-border-overlay transition-opacity duration-300"
        style={{
          background: `radial-gradient(250px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(239, 74, 42, 0.45) 0%, rgba(239, 74, 42, 0.08) 50%, transparent 100%) border-box`,
          opacity: 'var(--glow-opacity, 0)',
          zIndex: 20
        }}
      />

      {/* Ambient Glow that follows cursor inside card */}
      <div
        className="absolute pointer-events-none rounded-full blur-[80px] bg-brand-orange/[0.03] transition-opacity duration-300 z-0"
        style={{
          width: '250px',
          height: '250px',
          left: 'calc(var(--mouse-x, 0px) - 125px)',
          top: 'calc(var(--mouse-y, 0px) - 125px)',
          opacity: 'var(--glow-opacity, 0)'
        }}
      />

      {/* Glow Sphere Accent specifically for Card 01 for brand anchor */}
      {service.num === '01' && (
        <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-brand-orange/[0.06] blur-2xl pointer-events-none z-0" />
      )}

      {/* Column 1: ID and Technical Labels */}
      <div className="flex items-start justify-between lg:pr-5 lg:border-r lg:border-n-500/10 h-full select-none relative z-10">
        <div className="flex flex-col gap-3">
          <span className="font-serif text-[36px] lg:text-[28px] xl:text-[34px] font-normal leading-none text-brand-orange">
            {service.num}
          </span>
          <div className="flex flex-col gap-0.5 font-mono text-[8px] xl:text-[9px] text-n-400/70 tracking-wider">
            <span>{service.tag1}</span>
            <span>{service.tag2}</span>
            <span>{service.tag3}</span>
          </div>
          <CrosshairIcon className="w-4 h-4 text-n-500/40 mt-0.5" />
        </div>
      </div>

      {/* Column 2: Title & Description */}
      <div className="flex flex-col lg:px-6 relative z-10">
        <h3 className="font-serif text-[24px] lg:text-[20px] xl:text-[24px] font-normal text-white leading-tight">
          {service.title}
        </h3>
        <p className="font-sans text-[13px] xl:text-[14px] text-n-400 leading-relaxed mt-2 max-w-xl">
          {service.description}
        </p>
      </div>

      {/* Column 3: Tech Pills */}
      <div className="flex items-center lg:justify-end lg:px-2 relative z-10">
        <div className="flex flex-wrap gap-1.5 lg:gap-2 max-w-[250px] xl:max-w-[290px] lg:justify-end">
          {service.pills.map((pill) => (
            <span
              key={pill}
              className="font-mono text-[8px] xl:text-[9px] text-n-400/80 border border-n-500/15 rounded px-2.5 py-1 tracking-wider bg-n-700/35 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-n-500/25 group-hover:text-white"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* Column 4: Arrow Link */}
      <div className="flex items-center justify-end lg:pr-1 relative z-10">
        <a
          href="#connect"
          aria-label={`Inquire about ${service.title}`}
          className="w-8 h-8 rounded-full flex items-center justify-center text-n-400/60 group-hover:text-brand-orange group-hover:translate-x-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-orange transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.getElementsByClassName('service-card');
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  const handleMouseEnter = () => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.getElementsByClassName('service-card');
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      card.style.setProperty('--glow-opacity', '1');
    }
  };

  const handleMouseLeave = () => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.getElementsByClassName('service-card');
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      card.style.setProperty('--glow-opacity', '0');
    }
  };

  return (
    <section
      id="services"
      className="relative w-full flex flex-col bg-[#0C0C0E]"
      aria-labelledby="services-heading"
      style={{
        background: `linear-gradient(to bottom, 
          #F4F3EF 0px,
          #F4F3EF 180px,
          rgba(244, 243, 239, 0.98) 240px,
          rgba(244, 243, 239, 0.93) 300px,
          rgba(244, 243, 239, 0.84) 360px,
          rgba(244, 243, 239, 0.65) 420px,
          rgba(244, 243, 239, 0.40) 480px,
          rgba(244, 243, 239, 0.15) 540px,
          transparent 600px
        ), #0C0C0E`
      }}
    >
      {/* ─── 1. Header Wrapper ─── */}
      <div className="w-full pt-20 pb-4 sm:pt-24 sm:pb-6 z-10 shrink-0 bg-transparent">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col">
          {/* Kicker Tag */}
          <div className="inline-flex self-start items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-n-700/15 bg-n-700/5 font-mono text-[9px] sm:text-[10px] text-brand-orange tracking-[0.16em] uppercase mb-6 sm:mb-8 select-none">
            NO HAND-HOLDING REQUIRED
          </div>

          {/* Header Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <h2 id="services-heading" className="font-serif text-[clamp(2.25rem,4vw,3.5rem)] font-normal leading-[1.06] tracking-[-0.02em] text-n-700">
                Built for teams
                <br />
                <span className="italic font-light text-brand-orange">moving faster</span>
                <br />
                than their tooling<span className="text-brand-orange">.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col items-start gap-4 lg:pl-6">
              <p className="font-sans text-[14px] sm:text-[15px] text-n-500 leading-[1.6] max-w-md">
                We don&apos;t build templates. We engineer high-performance systems that eliminate execution drag so you can ship in weeks, not quarters.
              </p>
              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.16em] text-n-700 hover:text-brand-orange focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-orange rounded-sm transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] uppercase relative pb-1"
              >
                <span>EXPLORE OUR WORK</span>
                <span className="inline-block transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 text-brand-orange font-sans">
                  →
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-orange scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2. Cards & CTA Wrapper (On Black Bg with Grid Background) ─── */}
      <div className="w-full bg-transparent pt-4 pb-10 sm:pt-6 sm:pb-14 lg:pb-16 relative overflow-hidden z-10">
        
        {/* Subtle Grid Background Pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-45"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(121, 120, 114, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(121, 120, 114, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1), black 80px)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1), black 80px)'
          }}
        />

        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 z-10 relative flex flex-col">
          {/* Card Stack Area */}
          <div 
            className="relative w-full py-4 lg:py-6" 
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Cards Stack */}
            <div className="flex flex-col gap-4 sm:gap-6 w-full">
              {SERVICES.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  i={i}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>

          {/* Bottom CTA Block */}
          <div className="mt-8 sm:mt-12 lg:mt-16 relative rounded-[16px] lg:rounded-[20px] bg-n-600/40 border border-n-500/10 p-6 sm:p-10 lg:p-8 xl:p-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden group/cta-section">
            {/* Corner tick marks */}
            <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-brand-orange/60 pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-brand-orange/60 pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-brand-orange/60 pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-brand-orange/60 pointer-events-none" />

            {/* Left Text */}
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="hidden md:block text-brand-orange/80 shrink-0">
                <CrosshairIcon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-[18px] sm:text-[22px] lg:text-[20px] xl:text-[24px] font-normal leading-snug text-white">
                Most startups do not fail from lack of ideas.
                <br />
                They fail from <span className="italic font-light text-brand-orange">execution drag</span>.
              </h3>
            </div>

            {/* Right Button */}
            <div className="flex items-center gap-4 lg:gap-5 shrink-0 w-full md:w-auto justify-end">
              <a
                href="#connect"
                className="inline-flex items-center justify-center bg-brand-orange hover:bg-[#f15e41] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange text-white font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.16em] px-6 py-3 lg:px-6 lg:py-3 xl:px-8 xl:py-4 rounded-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] w-full md:w-auto shadow-[0_4px_15px_rgba(239,74,42,0.12)] hover:shadow-[0_8px_25px_rgba(239,74,42,0.3)]"
              >
                BOOK A CALL
              </a>
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white/60 shrink-0 hidden sm:block transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta-section:translate-x-1 group-hover/cta-section:-translate-y-1 group-hover/cta-section:text-brand-orange"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </div>

          {/* ─── Architectural Divider ─── */}
          <div className="flex items-center gap-3 mt-10 sm:mt-12 lg:mt-14 mb-0 select-none">
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-white/10 uppercase whitespace-nowrap">
              SYS / 03
            </span>
            <div className="flex-1 h-px bg-white/5 relative">
              <div className="absolute left-1/4 top-0 w-px h-2 bg-white/8 -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 w-px h-2.5 bg-white/10 -translate-y-1/2" />
              <div className="absolute left-3/4 top-0 w-px h-2 bg-white/8 -translate-y-1/2" />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange/40 shrink-0" />
          </div>
        </div>
      </div>

      {/* ─── Bridge to Manifesto ─── */}
      <div className="relative h-8 sm:h-10 lg:h-12 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(12,12,14,0.42) 48%, #0C0C0E 100%)'
        }}
      />

      <ManifestoSection />
    </section>
  );
}
