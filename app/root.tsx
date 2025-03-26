import { Outlet, Scripts, ScrollRestoration, Meta, Links } from 'react-router';
import { useEffect } from 'react';
import './app.css';
import { Banner } from './components/Banner';
import { SkipProvider } from './context/SkipContext';
import { ThemeProvider } from './context/ThemeContext';

export function links() {
  return [{ rel: 'stylesheet', href: '/app.css' }];
}

export function meta() {
  return [
    { title: 'Skip Selection Demo' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ];
}

export default function Component() {
  const expired = new Date() > new Date('2025-04-10');

  useEffect(() => {
    console.log('%cBuilt by Paul Doros – https://pauldoros.site', 'color: teal;');
  }, []);

  if (expired) {
    return (
      <div className="flex items-center justify-center h-screen">
        This demo has expired. Contact the author.
      </div>
    );
  }

  return (
    <html lang="en" data-author="Paul Doros">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <Banner />
        <ThemeProvider>
          <SkipProvider>
            <div className="flex flex-col min-h-screen pt-12">
              <main className="flex-1">
                <Outlet />
              </main>
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
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center p-6 bg-red-50 rounded-lg">
        <h1 className="text-2xl font-bold text-red-700 mb-2">Error</h1>
        <p className="text-red-600">Something went wrong. Please try again.</p>
      </div>
    </div>
  );
}
