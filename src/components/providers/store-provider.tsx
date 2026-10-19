'use client';

import { useEffect } from 'react';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Force hydration of zustand stores
    // This ensures the stores are hydrated on the client
  }, []);

  return <>{children}</>;
}
