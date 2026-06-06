'use client';

import React from 'react';
import { useBooking } from '@/components/BookingProvider';

export default function HeroCTA() {
  const { openBooking } = useBooking();

  return (
    <button
      onClick={openBooking}
      className="group inline-flex items-center justify-center md:justify-start bg-brand-orange hover:bg-brand-orange/95 hover:scale-[1.02] text-white rounded-full pl-6 pr-2 py-3 sm:py-2.5 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] shadow-lg shadow-brand-orange/10 hover:shadow-brand-orange/20 cursor-pointer border-none outline-none"
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
      <span className="w-9 h-9 sm:w-9 sm:h-9 bg-white text-brand-orange rounded-full flex items-center justify-center text-[13px] sm:text-[12px] font-bold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
        »
      </span>
    </button>
  );
}
