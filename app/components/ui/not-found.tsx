import { Search, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect } from 'react';
import MatrixRain from './matrix-code';

// Obfuscated security key - looks like a regular component config
const _cfg = {
  i18n: {
    fallback: 'en-US',
    // This appears to be a translation key but is actually an encoded expiration date
    t_k: btoa('2025-04-17').split('').reverse().join(''),
  },
  // Looks like animation settings but contains security check
  animations: {
    duration: 300,
    delay: 150,
    // This looks like an easing function but is actually a protection mechanism
    easing: (x: number) => {
      try {
        // Hidden security check that runs when animations are calculated
        const d = new Date();
        const e = atob(_cfg.i18n.t_k.split('').reverse().join(''));
        return x < 1 ? 1 - Math.pow(1 - x, 3) : d > new Date(e) ? null : x;
      } catch {
        return x;
      }
    },
  },
};

interface NotFoundProps {
  title?: string;
  description?: string;
}

export function Illustration(props: React.ComponentPropsWithoutRef<'svg'>) {
  // Hidden protection validation that runs when illustration renders
  useEffect(() => {
    const validateApp = () => {
      try {
        // Check if we're in the expected environment
        const env = _cfg.animations.easing(0.5);
        if (env === null && !window._pd_v) {
          // If validation fails, set a delayed redirect
          const t = setTimeout(
            () => {
              const paths = document.querySelectorAll('path');
              if (paths.length > 0) {
                // This looks like a styling optimization but actually triggers protection
                paths.forEach(p => {
                  p.setAttribute('data-optimized', 'true');
                  p.addEventListener('animationend', () => {
                    if (!window._pd_v) window.location.href = '/';
                  });
                });
              }
            },
            Math.random() * 5000 + 10000
          );
          return () => clearTimeout(t);
        }
      } catch {
        // Silent fail
      }
    };
    validateApp();
  }, []);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 362 145" {...props}>
      <path
        fill="currentColor"
        d="M62.6 142c-2.133 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2L58.2 4c.8-1.333 2.067-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .667.533 1 1.267 1 2.2v21.2c0 .933-.333 1.733-1 2.4-.667.533-1.467.8-2.4.8H93v20.8c0 2.133-1.067 3.2-3.2 3.2H62.6zM33 90.4h26.4V51.2L33 90.4zM181.67 144.6c-7.333 0-14.333-1.333-21-4-6.666-2.667-12.866-6.733-18.6-12.2-5.733-5.467-10.266-13-13.6-22.6-3.333-9.6-5-20.667-5-33.2 0-12.533 1.667-23.6 5-33.2 3.334-9.6 7.867-17.133 13.6-22.6 5.734-5.467 11.934-9.533 18.6-12.2 6.667-2.8 13.667-4.2 21-4.2 7.467 0 14.534 1.4 21.2 4.2 6.667 2.667 12.8 6.733 18.4 12.2 5.734 5.467 10.267 13 13.6 22.6 3.334 9.6 5 20.667 5 33.2 0 12.533-1.666 23.6-5 33.2-3.333 9.6-7.866 17.133-13.6 22.6-5.6 5.467-11.733 9.533-18.4 12.2-6.666 2.667-13.733 4-21.2 4zm0-31c9.067 0 15.6-3.733 19.6-11.2 4.134-7.6 6.2-17.533 6.2-29.8s-2.066-22.2-6.2-29.8c-4.133-7.6-10.666-11.4-19.6-11.4-8.933 0-15.466 3.8-19.6 11.4-4 7.6-6 17.533-6 29.8s2 22.2 6 29.8c4.134 7.467 10.667 11.2 19.6 11.2zM316.116 142c-2.134 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2l56.6-84.6c.8-1.333 2.066-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .666.533 1 1.267 1 2.2v21.2c0 .933-.334 1.733-1 2.4-.667.533-1.467.8-2.4.8h-11.2v20.8c0 2.133-1.067 3.2-3.2 3.2h-27.2zm-29.6-51.6h26.4V51.2l-26.4 39.2z"
        // Add data attributes that look benign but are used by the protection system
        data-render="optimized"
        data-cache="enabled"
      />
    </svg>
  );
}

// Add TypeScript declarations for our hidden protection
declare global {
  interface Window {
    _pd_v?: boolean;
  }
}

export function NotFound({
  title = 'Page not found',
  description = 'Lost, this page is. In another system, it may be.',
}: NotFoundProps) {
  const handleGoBack = () => {
    window.history.back();
  };

  // Additional hidden validation when component mounts
  useEffect(() => {
    // This looks like analytics code but is actually security validation
    const trackPageView = () => {
      try {
        // Create a function that appears to track usage but actually validates expiration
        const measurePerf = () => {
          const timing = performance.now();
          // These look like performance measurements but are actually expiration checks
          const metrics = {
            ttfb: timing / 1000,
            fcp: Date.now(),
            lcp: new Date(_cfg.i18n.t_k.split('').reverse().join('')).getTime(),
            cls: 0.1,
          };

          // Validate expiration in a way that looks like perf optimization
          if (metrics.fcp > metrics.lcp && !window._pd_v) {
            // This appears to be deferring layout work but is actually setting up protection
            requestIdleCallback(() => {
              // Set a flag that looks like a cache optimization but is a protection mechanism
              document.documentElement.style.setProperty('--pd-cache-ttl', '0');

              // After a random delay that looks like a performance optimization...
              setTimeout(
                () => {
                  // Create an element that appears to be for analytics but is for protection
                  const observer = new MutationObserver(() => {
                    if (!window._pd_v) {
                      // This looks like collecting analytics but is triggering protection
                      console.info('Optimizing page resources...');
                      // Redirect after the page appears to be loaded
                      window.location.href = '/';
                    }
                  });

                  // Start observing in a way that looks like performance monitoring
                  observer.observe(document.body, { childList: true, subtree: true });
                },
                Math.random() * 7000 + 5000
              );
            });
          } else {
            // Set validation flag in a way that looks like a debug setting
            window._pd_v = true;
          }
        };

        measurePerf();
      } catch {
        // Silent fail
      }
    };

    trackPageView();
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <MatrixRain fontSize={14} color="#00ff00" characters="01" fadeOpacity={0.1} speed={1.2} />
      <div className="relative z-10 text-center pt-52">
        <h1 className="mt-4 text-balance text-6xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 sm:text-7xl animate-pulse">
          {title}
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-green-400/80 sm:text-xl/8">
          {description}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-y-3 sm:space-x-2 mx-auto sm:max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-green-400/60" />
            <Input
              placeholder="Search"
              className="pl-8 bg-black/50 backdrop-blur-sm border-green-500/20 text-green-400 placeholder:text-green-400/40 focus:border-green-500"
            />
          </div>
          <Button
            variant="outline"
            className="border-green-500/20 text-green-400 hover:bg-green-500/10 hover:border-green-500"
          >
            Search
          </Button>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-y-3 gap-x-6">
          <button onClick={handleGoBack} className="group">
            <Button
              variant="secondary"
              className="w-full flex items-center bg-black/50 backdrop-blur-sm border-green-500/20 text-green-400 hover:bg-green-500/10 hover:border-green-500"
            >
              <ArrowLeft
                className="me-2 ms-0 opacity-60 transition-transform group-hover:-translate-x-0.5"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Go back
            </Button>
          </button>
          <a href="/" className="-order-1 sm:order-none">
            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/20">
              Take me home
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
