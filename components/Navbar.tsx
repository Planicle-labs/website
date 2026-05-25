'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';
import LiveClock from './LiveClock';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll to dynamically adjust navbar visual weight
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* ──────────────────────────────────────────────────────── */}
      {/* DESKTOP & MOBILE NAVIGATION HEADER */}
      {/* ──────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1280px] z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? 'top-3 scale-[0.98]' : 'top-4 scale-100'
        }`}
      >
        <div className="bg-[#161618] rounded-full p-[6px] pl-3 pr-2 flex items-center justify-between border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.24)]">
          {/* LEFT: Symmetrical Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 pl-3 flex-1">
            {['WORK', 'STUDIO', 'CONNECT'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-mono text-[11px] font-bold tracking-widest text-[#A09F9A] hover:text-[#EF4A2A] transition-colors duration-200 ease-out select-none active:scale-95"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* CENTER: Planicle Symmetrical Logo Mark */}
          <a
            href="#"
            className="flex items-center gap-2 select-none group md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 active:scale-95 transition-transform duration-200"
          >
            <div className="relative w-6 h-6 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-[15deg]">
              <Image
                src="/logo.png"
                alt="Planicle Logo"
                fill
                priority
                sizes="24px"
                className="object-contain"
              />
            </div>
            <span className="font-sans font-extrabold text-[17px] tracking-tight text-white lowercase">
              planicle
            </span>
          </a>

          {/* RIGHT: Status, Time & Premium CTA Button (Desktop) */}
          <div className="flex items-center gap-4 lg:gap-6 flex-1 justify-end">
            <span className="text-[11px] font-mono text-[#797872] tracking-wider uppercase hidden lg:inline select-none">
              TAKING PROJECTS FOR Q3 2026
            </span>

            <LiveClock
              showIcon={true}
              timeZone="Asia/Kolkata"
              label="IST"
              className="text-[11px] font-mono text-[#797872] hidden sm:inline-flex select-none"
            />

            {/* Premium CTA Button */}
            <a
              href="#connect"
              className="group inline-flex items-center bg-white hover:bg-[#F7F7F7] text-[#161618] rounded-full pl-4 pr-1.5 py-1.5 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
            >
              <span className="font-mono text-[10px] font-bold tracking-widest mr-3 relative overflow-hidden h-[15px] select-none">
                <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1/2">
                  <span className="h-[15px] flex items-center">LET'S BUILD</span>
                  <span className="h-[15px] flex items-center">LET'S BUILD</span>
                </span>
              </span>
              <span className="w-6 h-6 bg-[#161618] text-white rounded-full flex items-center justify-center text-[9px] font-bold transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-45">
                »
              </span>
            </a>

            {/* Mobile Nav Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden bg-white text-[#161618] hover:bg-[#F7F7F7] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────── */}
      {/* MOBILE FULLSCREEN OVERLAY DRAWER */}
      {/* ──────────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-[#0C0C0E]/95 backdrop-blur-md flex flex-col justify-between p-6 pt-24 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Navigation links inside drawer */}
        <nav className="flex flex-col gap-6 pt-8">
          {['WORK', 'STUDIO', 'CONNECT'].map((link, idx) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: `${idx * 50}ms` }}
              className={`text-[44px] font-serif italic tracking-tight text-white hover:text-[#EF4A2A] transition-all duration-300 ${
                isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            >
              {link.toLowerCase()}
            </a>
          ))}
        </nav>

        {/* Footer info inside drawer */}
        <div className="flex flex-col gap-6 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono text-[#797872] tracking-widest uppercase">
              STUDIO CAPACITY
            </span>
            <span className="text-[13px] font-medium text-white">
              Taking on select projects for Q3 2026
            </span>
          </div>

          <div className="flex items-center justify-between">
            <LiveClock
              showIcon={true}
              timeZone="Asia/Kolkata"
              label="IST"
              className="text-[12px] font-mono text-[#A09F9A]"
            />
            
            <a
              href="#connect"
              onClick={() => setIsOpen(false)}
              className="group inline-flex items-center bg-[#EF4A2A] hover:bg-[#d63b1c] text-white rounded-full pl-5 pr-2 py-2.5 transition-all duration-200 active:scale-[0.97]"
            >
              <span className="font-mono text-[11px] font-bold tracking-widest mr-4 select-none">
                LET'S BUILD
              </span>
              <span className="w-7 h-7 bg-white text-[#EF4A2A] rounded-full flex items-center justify-center text-[11px] font-bold transition-transform duration-300 group-hover:rotate-45">
                »
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
