'use client';
import React from 'react';
import { SparklesCore } from './ui/sparkles';

interface SparklesHeaderProps {
  className?: string;
  particleColor?: string;
  particleDensity?: number;
  height?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
}

export default function SparklesHeader({
  className = '',
  particleColor = 'var(--primary)',
  particleDensity = 30,
  height = 'h-[150px]',
  minSize = 0.3,
  maxSize = 0.8,
  speed = 0.4,
}: SparklesHeaderProps) {
  return (
    <div
      className={`absolute top-0 left-0 right-0 w-full ${height} overflow-hidden pointer-events-none z-10 ${className}`}
      data-author="Paul Doros"
    >
      <SparklesCore
        id="headerSparkles"
        background="transparent"
        minSize={minSize}
        maxSize={maxSize}
        particleDensity={particleDensity}
        className="w-full h-full"
        particleColor={particleColor}
        speed={speed}
      />
      {/* Fade out gradient */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-background"></div>
    </div>
  );
}
