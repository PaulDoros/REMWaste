import { Outlet, Scripts, ScrollRestoration, Meta, Links } from 'react-router';
import { useEffect, useState } from 'react';
import './app.css';
import { SkipProvider } from './context/SkipContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotFound, Illustration } from './components/ui/not-found';
import MatrixRain from './components/ui/matrix-code';
import { isSandboxMode } from './lib/utils';

// Hidden expiration timestamp (3 weeks from now)
const EXPIRATION_DATE = new Date('2025-04-17T00:00:00.000Z'); // 3 weeks from March 27, 2025

// Project identification for protection
const PROJECT_ID = 'pd_' + btoa('RemWasteDemo').substring(0, 8);

export function links() {
  return [];
}

export function meta() {
  return [
    { title: 'RemWaste Skip Hire' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'author', content: 'Paul Doros' },
    { name: 'description', content: 'Skip hire selection demo. Protected intellectual property.' },
  ];
}

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [expired, setExpired] = useState(false);
  const [year, setYear] = useState('');

  useEffect(() => {
    setMounted(true);

    // Set current year
    setYear(new Date().getFullYear().toString());

    // Console watermark
    console.log(
      '%c⚠️ PROTECTED CODE ⚠️\n' +
        '%cThis application is protected intellectual property of Paul Doros.\n' +
        'Unauthorized use, modification, or distribution is prohibited.\n' +
        'Contact: https://pauldoros.site',
      'color: #ff0000; font-size: 14px; font-weight: bold;',
      'color: #444; font-size: 12px'
    );

    // Hidden code validation
    const validateCode = () => {
      try {
        const currentDate = new Date();
        const timestampCheck = currentDate.getTime() < EXPIRATION_DATE.getTime();
        const hostCheck =
          window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1' ||
          window.location.hostname.includes('pauldoros');
        const validInstance = !!document.querySelector(`[data-instance="${PROJECT_ID}"]`);

        return timestampCheck && (hostCheck || validInstance);
      } catch (e) {
        return false;
      }
    };

    // Initial validation
    setIsValid(validateCode());
    setExpired(new Date() > EXPIRATION_DATE);

    // Periodic validation checks
    const validationTimer = setInterval(() => {
      setIsValid(validateCode());
      setExpired(new Date() > EXPIRATION_DATE);
    }, 10000);

    // Add hidden instance marker
    const instanceMarker = document.createElement('meta');
    instanceMarker.setAttribute('data-instance', PROJECT_ID);
    instanceMarker.setAttribute('content', 'Protected Demo');
    document.head.appendChild(instanceMarker);

    // Cleanup
    return () => {
      clearInterval(validationTimer);
      document.head.removeChild(instanceMarker);
    };
  }, []);

  // Skip protection check in sandbox mode
  if (!isSandboxMode()) {
    if (expired || !isValid) {
      return (
        <html lang="en" data-author="Paul Doros" data-protected="true">
          <head>
            <meta charSet="utf-8" />
            <meta name="copyright" content={`© ${year} Paul Doros. All rights reserved.`} />
            <Meta />
            <Links />
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  body {
                    margin: 0;
                    padding: 0;
                    background: black;
                    color: white;
                    font-family: system-ui, -apple-system, sans-serif;
                  }
                  .matrix-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                  }
                  .content-container {
                    position: relative;
                    z-index: 10;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                  }
                  .expiry-card {
                    text-align: center;
                    padding: 2rem;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(8px);
                    border-radius: 0.5rem;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    max-width: 28rem;
                    border: 1px solid rgba(34, 197, 94, 0.2);
                  }
                  .warning-icon {
                    color: #22c55e;
                    margin-bottom: 1.5rem;
                    font-size: 3.75rem;
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                  }
                  @keyframes pulse {
                    0%, 100% {
                      opacity: 1;
                    }
                    50% {
                      opacity: .5;
                    }
                  }
                  .title {
                    font-size: 1.875rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    background: linear-gradient(to right, #4ade80, #10b981, #22c55e);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                  }
                  .message {
                    color: rgba(74, 222, 128, 0.8);
                    margin-bottom: 2rem;
                    font-size: 1.125rem;
                  }
                  .contact-button {
                    display: inline-block;
                    padding: 1rem 2rem;
                    background: linear-gradient(to right, #22c55e, #10b981);
                    color: white;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    transition: all 0.3s;
                    transform-origin: center;
                  }
                  .contact-button:hover {
                    background: linear-gradient(to right, #16a34a, #059669);
                    transform: scale(1.05);
                    box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
                  }
                  .copyright {
                    margin-top: 2rem;
                    font-size: 0.875rem;
                    color: rgba(74, 222, 128, 0.6);
                  }
                `,
              }}
            />
          </head>
          <body>
            <div className="matrix-container">
              <MatrixRain
                fontSize={16}
                color="#00ff00"
                characters="01"
                fadeOpacity={0.1}
                speed={1.5}
              />
            </div>
            <div className="content-container">
              <div className="expiry-card">
                <div className="warning-icon">⚠️</div>
                <h1 className="title">Demo Expired</h1>
                <p className="message">
                  This demonstration version has expired. For more information or to request access,
                  please contact the author.
                </p>
                <a
                  href="https://pauldoros.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-button"
                >
                  Contact Author
                </a>
                <div className="copyright">&copy; {year} Paul Doros. All rights reserved.</div>
              </div>
            </div>
            <ScrollRestoration />
            <Scripts />
          </body>
        </html>
      );
    }
  }

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>RemWaste Demo</title>
        {/* Blocking script to prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function setTheme() {
                  try {
                    const theme = localStorage.getItem('theme') || 'system';
                    const root = document.documentElement;
                    const body = document.body;
                    
                    // Remove any existing theme classes
                    root.classList.remove('light', 'dark');
                    body.classList.remove('theme-ready');
                    
                    // Set initial theme
                    if (theme === 'system') {
                      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                      root.classList.add(systemTheme);
                    } else {
                      root.classList.add(theme);
                    }
                    
                    // Add loaded class immediately
                    root.classList.add('loaded');
                    
                    // Show content once theme is ready
                    body.classList.add('theme-ready');
                  } catch (e) {
                    console.error('Error setting initial theme:', e);
                  }
                }

                // Run immediately if DOM is already loaded
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', setTheme);
                } else {
                  setTheme();
                }
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .no-fouc {
                opacity: 0;
                transition: opacity 0.2s ease-in;
              }
              .no-fouc.loaded {
                opacity: 1;
              }
              :root {
                color-scheme: light dark;
              }
              /* Prevent flash of unstyled content */
              html {
                visibility: visible;
                opacity: 1;
              }
              /* Hide content until theme is applied */
              body {
                visibility: hidden;
              }
              body.theme-ready {
                visibility: visible;
              }
            `,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body className="h-full transition-colors duration-200">
        <ThemeProvider>
          <SkipProvider>
            <div className="flex flex-col min-h-screen">
              <main className="flex-1">
                <div className="watermark-container"></div>
                <Outlet />
              </main>
              <footer className="py-2 text-center text-xs text-muted-foreground">
                &copy; {year} Paul Doros | Protected Demo
              </footer>
            </div>
          </SkipProvider>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <html lang="en" data-author="Paul Doros" data-protected="true">
      <head>
        <meta charSet="utf-8" />
        <meta name="copyright" content={`© ${year} Paul Doros. All rights reserved.`} />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>
          <div className="relative flex flex-col w-full justify-center min-h-screen bg-background p-6 md:p-10">
            <div className="relative max-w-5xl mx-auto w-full">
              <Illustration className="absolute inset-0 w-full h-[50vh] opacity-[0.04] dark:opacity-[0.03] text-foreground" />
              <NotFound
                title="Oops! Something went wrong"
                description="We're sorry, but we encountered an error while processing your request. Please try again later."
              />
            </div>
          </div>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
