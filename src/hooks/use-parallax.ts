'use client';

import { useEffect, useRef, useState } from 'react';

interface UseParallaxOptions {
  speed?: number;
  disabled?: boolean;
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { speed = 0.5, disabled = false } = options;
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (disabled) return;

    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const elementTop = rect.top + scrollPosition;
      const windowHeight = window.innerHeight;

      // Only animate when element is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const relativeScroll = scrollPosition - elementTop + windowHeight;
        const calculatedOffset = relativeScroll * speed;
        setOffset(calculatedOffset);
      }
    };

    const checkReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (checkReducedMotion) {
      return;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, disabled]);

  return { elementRef, offset };
}
