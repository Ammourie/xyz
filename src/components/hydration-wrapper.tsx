'use client';

import { useEffect, useState } from 'react';

interface HydrationWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  suppressHydrationWarning?: boolean;
}

export function HydrationWrapper({ 
  children, 
  fallback = null,
  suppressHydrationWarning = false 
}: HydrationWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // If we're on the server or haven't hydrated yet, show fallback
  if (!isClient) {
    return <>{fallback}</>;
  }

  // If suppressHydrationWarning is true, wrap children in a div with suppressHydrationWarning
  if (suppressHydrationWarning) {
    return (
      <div suppressHydrationWarning={true}>
        {children}
      </div>
    );
  }

  return <>{children}</>;
} 