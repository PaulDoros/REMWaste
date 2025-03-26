import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GradientButtonDemo } from '../components/ui/gradient-button-demo';
import { GradientButton } from '../components/ui/gradient-button';
import ThemeToggle from '../components/ThemeToggle';
import SparklesHeader from '../components/SparklesHeader';

interface ComponentProps {
  params: {
    [key: string]: string;
  };
}

export default function Component({ params }: ComponentProps) {
  return (
    <div className="min-h-screen bg-background text-foreground relative" data-author="Paul Doros">
      {/* Subtle sparkles effect at the top */}
      <SparklesHeader
        particleColor="var(--blue-500)"
        height="h-[250px]"
        particleDensity={40}
        minSize={0.4}
        maxSize={1.2}
        speed={0.6}
      />

      <div className="container mx-auto py-16 px-4">
        <motion.header
          className="text-center mb-16 pt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-primary hover:underline mb-8 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Gradient Button Component</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our beautiful gradient button component with various styles, sizes, and states
          </p>
        </motion.header>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GradientButtonDemo />

          <div className="mt-16 space-y-12">
            <section className="bg-card p-8 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium mb-4">Form Submission</h3>
                  <div className="bg-background p-6 rounded-lg border border-border">
                    <div className="flex flex-col gap-4 max-w-md">
                      <label className="flex flex-col gap-2">
                        <span>Email</span>
                        <input
                          type="email"
                          className="px-4 py-2 rounded-md border border-border bg-background"
                          placeholder="you@example.com"
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span>Message</span>
                        <textarea
                          className="px-4 py-2 rounded-md border border-border bg-background min-h-[100px]"
                          placeholder="Your message..."
                        />
                      </label>
                      <div className="mt-2">
                        <GradientButton variant="proceed" type="submit">
                          Send Message
                        </GradientButton>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-4">Card Actions</h3>
                  <div className="bg-background p-6 rounded-lg border border-border">
                    <div className="flex flex-col max-w-md">
                      <h4 className="text-lg font-semibold mb-2">Premium Plan</h4>
                      <p className="text-muted-foreground mb-4">
                        Get access to all features and premium support
                      </p>
                      <div className="text-3xl font-bold mb-4">
                        $29<span className="text-lg font-normal text-muted-foreground">/month</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.3334 4L6.00008 11.3333L2.66675 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>Unlimited skips</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.3334 4L6.00008 11.3333L2.66675 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>Priority delivery</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.3334 4L6.00008 11.3333L2.66675 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>24/7 support</span>
                        </li>
                      </ul>
                      <GradientButton>Subscribe Now</GradientButton>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-card p-8 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold mb-6">Implementation Code</h2>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                {`// In your component
import { GradientButton } from "./ui/gradient-button";

// Basic usage
<GradientButton>Default</GradientButton>

// With variants
<GradientButton variant="variant">Variant</GradientButton>
<GradientButton variant="outline">Outline</GradientButton>
<GradientButton variant="proceed">Proceed</GradientButton>

// Different sizes
<GradientButton size="sm">Small</GradientButton>
<GradientButton size="default">Default</GradientButton>
<GradientButton size="lg">Large</GradientButton>

// Combined props
<GradientButton variant="proceed" size="lg">
  Proceed Large
</GradientButton>`}
              </pre>
            </section>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/moving-border-demo"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Explore Moving Border Demo →
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
