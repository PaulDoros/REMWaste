import { Outlet, Scripts, ScrollRestoration, Meta, Links } from 'react-router';
import { useEffect, useState } from 'react';
import './app.css';
import { SkipProvider } from './context/SkipContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotFound, Illustration } from './components/ui/not-found';
import MatrixRain from './components/ui/matrix-code';

// Simple expiration check
const EXPIRATION_DATE = new Date('2025-04-17T00:00:00.000Z');

export function links() {
  return [];
}

export function meta() {
  return [
    { title: 'RemWaste Skip Hire' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'author', content: 'Paul Doros' },
    { name: 'description', content: 'Skip hire selection demo.' },
  ];
}

export default function Component() {
  const [expired, setExpired] = useState(false);
  const [year, setYear] = useState('');

  useEffect(() => {
    // Set current year
    setYear(new Date().getFullYear().toString());

    // Simple expiration check
    const checkExpiration = () => {
      setExpired(new Date() > EXPIRATION_DATE);
    };

    // Initial check
    checkExpiration();

    // Periodic checks
    const timer = setInterval(checkExpiration, 60000); // Check every minute

    return () => clearInterval(timer);
  }, []);

  if (expired) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="copyright" content={`© ${year} Paul Doros. All rights reserved.`} />
          <Meta />
          <Links />
        </head>
        <body>
          <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Demo Expired</h1>
              <p className="text-muted-foreground">
                This demo has expired. Please contact the developer for access.
              </p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="copyright" content={`© ${year} Paul Doros. All rights reserved.`} />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>
          <SkipProvider>
            <Outlet />
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
