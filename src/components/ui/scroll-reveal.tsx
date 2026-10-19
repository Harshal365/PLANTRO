'use client';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  triggerOnce = true,
}: ScrollRevealProps) {
  const { elementRef, isVisible } = useScrollReveal({ threshold, triggerOnce });

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
