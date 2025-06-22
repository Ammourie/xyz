'use client';

import { useEffect, useState } from 'react';

export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

export function useSuppressHydrationWarning() {
  const [suppressWarning, setSuppressWarning] = useState(false);

  useEffect(() => {
    // Suppress hydration warnings for browser extension modifications
    const originalError = console.error;
    console.error = (...args) => {
      const message = args[0];
      if (
        typeof message === 'string' &&
        (message.includes('Hydration failed') ||
         message.includes('Warning: Text content did not match') ||
         message.includes('Warning: Expected server HTML to contain'))
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    setSuppressWarning(true);

    return () => {
      console.error = originalError;
    };
  }, []);

  return suppressWarning;
} 