'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TextRollButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;          // classes for the main button
  textClassName?: string;      // classes for the text itself
  circleClassName?: string;    // classes for the arrow circle (e.g. w-6 h-6 bg-white)
  arrowClassName?: string;     // classes for the ArrowRight icon (e.g. text-gray-900)
  iconSize?: number;
}

export default function TextRollButton({
  text,
  onClick,
  className = 'bg-gray-900 text-white pl-5 pr-2 py-2 rounded-full',
  textClassName = 'text-[13px] font-medium tracking-tight text-white',
  circleClassName = 'w-6 h-6 bg-white rounded-full flex items-center justify-center',
  arrowClassName = 'text-gray-900',
  iconSize = 14,
}: TextRollButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer select-none ${className}`}
    >
      {/* Text Roll Container */}
      <div className="overflow-hidden h-[20px] mr-3 relative">
        <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
          {/* Upper Text */}
          <span className={`h-[20px] flex items-center ${textClassName}`}>
            {text}
          </span>
          {/* Lower Text (rolled in on hover) */}
          <span className={`h-[20px] flex items-center ${textClassName}`}>
            {text}
          </span>
        </div>
      </div>

      {/* Arrow Circle */}
      <div
        className={`shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 ${circleClassName}`}
      >
        <ArrowRight size={iconSize} className={arrowClassName} />
      </div>
    </button>
  );
}
