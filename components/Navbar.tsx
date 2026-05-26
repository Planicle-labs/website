"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LiveClock from "./LiveClock";
import { useBooking } from "./BookingProvider";

const COMPACT_RANGE = 250;
const EXPAND_ZONE = 600;

const navLinks = [
  { href: "#services", label: "SERVICES" },
  { href: "#connect", label: "CONNECT" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const prefersReduced = useReducedMotion();
  const { openBooking } = useBooking();

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement> | null,
    href: string,
  ) => {
    if (e) e.preventDefault();
    setIsOpen(false);

    const targetId = href.replace("#", "");
    if (targetId === "" || targetId === "/") {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
      return;
    }

    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    if (prefersReduced) return;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#")) {
        if (target.closest("header")) return;
        e.preventDefault();
        handleScroll(null, href);
      }
    };

    window.addEventListener("click", handleAnchorClick);
    return () => window.removeEventListener("click", handleAnchorClick);
  }, [prefersReduced]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const displayScrollY = useMotionValue(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const y = window.scrollY;
    lastScrollYRef.current = y;
    displayScrollY.set(Math.min((y / COMPACT_RANGE) * 100, 100));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastScrollYRef.current;
    lastScrollYRef.current = latest;

    if (latest <= 10) {
      displayScrollY.set(0);
    } else if (delta > 0) {
      displayScrollY.set(
        Math.min(displayScrollY.get() + (delta / COMPACT_RANGE) * 100, 100),
      );
    } else if (latest <= EXPAND_ZONE) {
      displayScrollY.set(
        Math.max(displayScrollY.get() + (delta / COMPACT_RANGE) * 100, 0),
      );
    }
  });

  const navMaxWidth = useTransform(displayScrollY, [0, 100], [1280, 720]);
  const navPaddingV = useTransform(displayScrollY, [0, 100], [14, 8]);
  const textOpacity = useTransform(displayScrollY, [0, 60], [1, 0]);
  const textWidth = useTransform(displayScrollY, [0, 60], [70, 0]);
  const clockOpacity = useTransform(displayScrollY, [0, 70], [1, 0]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.header
        initial={prefersReduced ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 inset-x-0 flex justify-center z-50"
      >
        <motion.div
          style={{ maxWidth: navMaxWidth, paddingBlock: navPaddingV }}
          className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] rounded-full px-3 sm:px-5 flex items-center justify-between border border-n-100/10 bg-n-700 shadow-[0_8px_32px_rgba(0,0,0,0.24)] backdrop-blur-xl backdrop-saturate-150 overflow-hidden"
        >
          <nav className="hidden md:flex items-center gap-10 pl-2 flex-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                whileTap={{ scale: 0.95 }}
                className="font-mono text-[11px] font-bold tracking-[0.15em] text-n-500 hover:text-brand-orange transition-colors duration-300 select-none"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          <motion.a
            href="#"
            onClick={(e) => handleScroll(e, "#")}
            className="flex items-center gap-1.5 select-none group md:absolute md:left-1/2 md:-translate-x-1/2"
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-11 h-11 shrink-0">
              <Image
                src="/logo.webp"
                alt="Planicle"
                fill
                priority
                sizes="44px"
                className="object-contain"
              />
            </div>
            <motion.span
              style={{ opacity: textOpacity, width: textWidth }}
              className="overflow-hidden whitespace-nowrap font-sans font-extrabold text-[16px] tracking-tight text-n-100 leading-none max-sm:hidden"
            >
              Planicle
            </motion.span>
          </motion.a>

          <div className="flex items-center gap-2 sm:gap-6 flex-1 justify-end">
            <motion.div
              style={{ opacity: clockOpacity }}
              className="hidden sm:inline-flex"
            >
              <LiveClock
                showIcon={true}
                timeZone="Asia/Kolkata"
                label="IST"
                className="text-[11px] font-mono text-n-500 select-none"
              />
            </motion.div>

            <motion.button
              onClick={openBooking}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center bg-n-100 hover:bg-n-200 text-n-700 rounded-full pl-2.5 sm:pl-4 pr-1.5 sm:pr-2 py-1 sm:py-1.5 transition-colors duration-300 cursor-pointer border-none outline-none"
            >
              <span className="font-mono text-[10px] font-bold tracking-widest mr-3 select-none">
                LET&apos;S BUILD
              </span>
              <span className="w-5 h-5 bg-n-700 text-n-100 rounded-full flex items-center justify-center text-[9px] font-bold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
                »
              </span>
            </motion.button>

            <motion.button
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
              className="md:hidden bg-n-100 text-n-700 hover:bg-n-200 rounded-full w-11 h-11 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={15} /> : <Menu size={15} />}
            </motion.button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-n-700 flex flex-col p-6 sm:p-8 md:hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />

            <nav className="flex-1 flex flex-col justify-center gap-8 mt-16 relative z-10">
              {navLinks.map((link, idx) => (
                <div key={link.href} className="overflow-hidden py-2">
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-20%", opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: idx * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="block text-[16vw] font-serif italic tracking-tight text-n-100 hover:text-brand-orange transition-colors duration-400 leading-none"
                  >
                    {link.label.toLowerCase()}
                  </motion.a>
                </div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                duration: 0.4,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 flex flex-col gap-6 border-t border-n-100/10 pt-6 pb-2"
            >
              <div className="flex items-center justify-center">
                <LiveClock
                  showIcon={true}
                  timeZone="Asia/Kolkata"
                  label="IST"
                  className="text-[12px] font-mono text-n-400"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
