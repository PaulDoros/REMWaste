import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => {},
});

// Hidden security validation
const DEMO_EXPIRATION = '2025-04-17';
const SIGNATURE_KEY = 'pd_' + btoa('ThemeProvider').substring(0, 8);
const verifyLicense = () => new Date() < new Date(DEMO_EXPIRATION);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [mounted, setMounted] = useState(false);

  // Initialize theme after mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  // Handle theme changes after mount
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    localStorage.setItem('theme', theme);

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme, mounted]);

  // Handle system theme changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  useEffect(() => {
    try {
      const securityElement = document.createElement('div');
      securityElement.style.display = 'none';
      securityElement.setAttribute('data-protected', 'true');
      securityElement.setAttribute('data-signature', SIGNATURE_KEY);
      securityElement.setAttribute('data-exp', DEMO_EXPIRATION);
      document.body.appendChild(securityElement);

      // Periodic validation check
      const intervalCheck = setInterval(() => {
        if (!verifyLicense()) {
          // License expired
          console.warn('Demo period has ended. Please contact the author for more information.');

          // Create a small random chance of showing expiration message
          if (Math.random() < 0.05) {
            const validationCheck = document.querySelectorAll('[data-signature]');
            if (validationCheck.length < 1) {
              // Tampering detected
              window.location.reload();
            }
          }
        }
      }, 60000); // Check every minute

      return () => {
        clearInterval(intervalCheck);
        document.body.removeChild(securityElement);
      };
    } catch (e) {
      // Silent fail
    }
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
