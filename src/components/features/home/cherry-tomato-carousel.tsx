'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function CherryTomatoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(() => {
    // Random starting image on refresh
    return Math.floor(Math.random() * 3);
  });
  const [isAutoplay, setIsAutoplay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const x = useMotionValue(0);
  
  const images = [
    {
      src: '/images/Cherry%20Tomato%20seeds.png',
      alt: 'Cherry Tomato Seeds',
      name: 'Cherry Tomato Seeds',
    },
    {
      src: '/images/cherry%20tomato%202.png',
      alt: 'Cherry Tomato 2',
      name: 'Cherry Tomato',
    },
    {
      src: '/images/cherry%20tomato%203.png',
      alt: 'Cherry Tomato 3',
      name: 'Cherry Tomato',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    // Reset timer on manual navigation
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4500);
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    // Reset timer on manual navigation
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4500);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    // Reset timer on manual navigation
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4500);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevSlide();
    } else if (info.offset.x < -threshold) {
      nextSlide();
    }
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isAutoplay]);

  return (
    <section className="py-16 bg-cream/30">
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm font-medium text-forest uppercase tracking-widest mb-3"
            >
              FEATURED PRODUCT
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
            >
              Cherry Tomato Seeds
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Grow fresh, juicy cherry tomatoes right in your home garden
            </motion.p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Carousel Container */}
            <div 
              className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-background shadow-xl"
              onMouseEnter={() => setIsAutoplay(false)}
              onMouseLeave={() => setIsAutoplay(true)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.05, x: -50 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={handleDragEnd}
                  style={{ x }}
                  className="absolute inset-0"
                >
                  <motion.img
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="w-full h-full object-contain p-8"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Premium Navigation Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevSlide}
                  className="pointer-events-auto w-12 h-12 rounded-full bg-stone-50/95 backdrop-blur-md shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 border border-stone-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5 text-forest" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSlide}
                  className="pointer-events-auto w-12 h-12 rounded-full bg-stone-50/95 backdrop-blur-md shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 border border-stone-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5 text-forest" />
                </motion.button>
              </motion.div>

              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Premium Dots Indicator */}
            <div className="flex justify-center gap-3 mt-6">
              {images.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-forest w-10 shadow-md'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:w-4'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
