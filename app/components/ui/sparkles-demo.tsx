'use client';
import React from 'react';
import { SparklesCore } from './sparkles';
import { motion } from 'framer-motion';

export function SparklesPreview() {
  return (
    <div className="h-[40rem]  absolute top-0 left-0 w-full bg-background flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}

export function SparklesPreviewDark() {
  return (
    <div className="h-[40rem] relative w-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={1}
        />
      </div>
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        Skip Hire
      </h1>
    </div>
  );
}

export function SparklesPreviewColorful() {
  return (
    <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlescolorful"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#00ff00"
          speed={0.5}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 relative z-20">
        <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Skip Booking
        </h1>
        <p className="text-neutral-300 cursor-default text-center">
          Fast, Reliable, and Environmentally Responsible
        </p>
      </div>
    </div>
  );
}

export function SparklesPreviewThemed() {
  return (
    <div className="h-[30rem] relative w-full bg-gradient-to-b from-primary/20 to-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-full">
        <SparklesCore
          id="themedparticles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={70}
          className="w-full h-full"
          particleColor="var(--primary)"
          speed={0.8}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 relative z-20">
        <h1 className="md:text-5xl text-2xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary-foreground">
          Professional Waste Management
        </h1>
        <p className="text-white cursor-default text-center max-w-lg">
          Find the perfect skip for your project with our interactive selection tool
        </p>
        <div className="flex gap-4 mt-4">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Get Started
          </button>
          <button className="px-6 py-3 border border-primary/50 text-white rounded-md hover:bg-primary/10 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
