'use client';

import React from 'react';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';

export default function HeroShader() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden select-none">
      <Shader className="w-full h-full">
        <Swirl 
          colorA="#F4F3EF" // Planicle Ivory White (N-100)
          colorB="#EEEDE9" // Planicle Warm Silver (N-200) for a tactile, print-like paper swirl texture
          detail={1.7} 
        />
        <ChromaFlow
          baseColor="#F4F3EF" // Planicle Ivory base
          downColor="#EF4A2A" // Signature Planicle Orange (accent flow)
          leftColor="#EF4A2A"
          rightColor="#EF4A2A"
          upColor="#EF4A2A"
          momentum={12}
          radius={3.0}
        />
        <FlutedGlass
          aberration={0.55}
          angle={31}
          frequency={8}
          highlight={0.1}
          highlightSoftness={0.1}
          lightAngle={-90}
          refraction={3.8}
          shape="rounded"
          softness={1}
          speed={0.12}
        />
        <FilmGrain strength={0.06} /> {/* Tactile print grain */}
      </Shader>
    </div>
  );
}

