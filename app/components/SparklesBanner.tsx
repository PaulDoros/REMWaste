'use client';
import React from 'react';
import { SparklesCore } from './ui/sparkles';
import { GradientButton } from './ui/gradient-button';
import { Link } from 'react-router';

interface SparklesBannerProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonVariant?: 'default' | 'variant' | 'outline' | 'proceed';
  particleColor?: string;
  background?: string;
  height?: string;
}

export default function SparklesBanner({
  title,
  subtitle,
  buttonText,
  buttonLink,
  buttonVariant = 'default',
  particleColor = 'var(--primary)',
  background = 'var(--primary)',
  height = 'h-[300px]',
}: SparklesBannerProps) {
  return (
    <div
      className={`relative w-full ${height} flex flex-col items-center justify-center overflow-hidden rounded-lg`}
      style={{ background: background }}
      data-author="Paul Doros"
    >
      {/* Particles layer */}
      <div className="w-full absolute inset-0 h-full">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={70}
          className="w-full h-full"
          particleColor={particleColor}
          speed={0.8}
        />
      </div>

      {/* Content layer */}
      <div className="flex flex-col items-center justify-center gap-4 relative z-20 px-4">
        <h1 className="md:text-4xl text-2xl lg:text-5xl font-bold text-center text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="text-white text-opacity-90 cursor-default text-center max-w-lg">
            {subtitle}
          </p>
        )}

        {buttonText && buttonLink && (
          <div className="mt-4">
            <Link
              to={buttonLink}
              className="inline-block px-6 py-3 bg-white text-primary rounded-md hover:bg-white/90 transition-colors font-medium"
            >
              {buttonText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
