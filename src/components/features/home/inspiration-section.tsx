'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function InspirationSection() {
  const [currentInspiration, setCurrentInspiration] = useState(() => {
    // Random starting inspiration on refresh
    return Math.floor(Math.random() * 4);
  });
  const [isAutoplay, setIsAutoplay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const inspirations = [
    {
      title: 'Indoor Plant Ideas',
      image: '/images/Aglaonema%20Lipstick%20Plant%20.png',
      link: '/care-guide',
    },
    {
      title: 'Plant Care Tips',
      image: '/images/Snake%20Plant%20.png',
      link: '/care-guide',
    },
    {
      title: 'Balcony Gardening',
      image: '/images/Spider%20Plant%20.png',
      link: '/care-guide',
    },
    {
      title: "Beginner's Guide",
      image: '/images/Money%20Plant%20.png',
      link: '/care-guide',
    },
  ];

  // Auto-rotate inspiration every 6.5 seconds
  useEffect(() => {
    if (!isAutoplay) return;
    timerRef.current = setInterval(() => {
      setCurrentInspiration((prev) => (prev + 1) % inspirations.length);
    }, 6500);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isAutoplay]);

  const nextInspiration = () => {
    setCurrentInspiration((prev) => (prev + 1) % inspirations.length);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentInspiration((prev) => (prev + 1) % inspirations.length);
      }, 6500);
    }
  };

  const prevInspiration = () => {
    setCurrentInspiration((prev) => (prev - 1 + inspirations.length) % inspirations.length);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentInspiration((prev) => (prev + 1) % inspirations.length);
      }, 6500);
    }
  };

  return (
    <section className="py-16 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-forest uppercase tracking-widest mb-3">
            INSPIRE YOUR SPACE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Small Changes. Greener Spaces.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover simple ways to bring more plants into your home, choose the right planter and keep your plants thriving.
          </p>
        </div>

        {/* Featured Inspiration Card with Auto-Rotation */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-12">
          <div
            className="relative rounded-2xl overflow-hidden aspect-[16/9]"
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentInspiration}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <img
                  src={inspirations[currentInspiration].image}
                  alt={inspirations[currentInspiration].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-primary-foreground">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{inspirations[currentInspiration].title}</h3>
                  <Link href={inspirations[currentInspiration].link}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm btn-hover-lift group text-sm md:text-base"
                    >
                      READ MORE
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevInspiration}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-stone-50/95 backdrop-blur-md shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 border border-stone-200 z-20"
              aria-label="Previous inspiration"
            >
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-forest rotate-180" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextInspiration}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-stone-50/95 backdrop-blur-md shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 border border-stone-200 z-20"
              aria-label="Next inspiration"
            >
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-forest" />
            </motion.button>

            {/* Counter */}
            <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium shadow-lg z-20">
              {currentInspiration + 1} / {inspirations.length}
            </div>
          </div>
        </div>

        {/* Static Grid for All Inspirations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {inspirations.map((inspiration, index) => (
            <Link key={index} href={inspiration.link} className="group">
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] card-hover">
                <img
                  src={inspiration.image}
                  alt={inspiration.title}
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
                  <h3 className="font-semibold mb-2">{inspiration.title}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm btn-hover-lift group"
                  >
                    READ MORE
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
