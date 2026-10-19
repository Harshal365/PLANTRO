'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 50]);
  const y2 = useTransform(scrollY, [0, 500], [0, -30]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.05]);
  
  const [currentHeroImage, setCurrentHeroImage] = useState(() => {
    // Random starting image on refresh
    const heroImages = [
      '/images/Aglaonema%20Lipstick%20Plant%20.png',
      '/images/Syngonium%20Plant%20.png',
      '/images/Rose%20Plant%20.png',
      '/images/Monstera%20Plant%20.png',
    ];
    return Math.floor(Math.random() * heroImages.length);
  });
  
  const [isAutoplay, setIsAutoplay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const heroImages = [
    '/images/Aglaonema%20Lipstick%20Plant%20.png',
    '/images/Syngonium%20Plant%20.png',
    '/images/Rose%20Plant%20.png',
    '/images/Monstera%20Plant%20.png',
  ];

  // Auto-rotate hero images every 7.5 seconds
  useEffect(() => {
    if (!isAutoplay) return;
    timerRef.current = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 7500);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isAutoplay]);

  const nextHeroImage = () => {
    setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
      }, 7500);
    }
  };

  const prevHeroImage = () => {
    setCurrentHeroImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
      }, 7500);
    }
  };

  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] overflow-hidden bg-cream">
      {/* Hero Content - Split Layout */}
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="z-10 order-2 lg:order-1"
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xs md:text-sm font-medium tracking-widest uppercase text-forest mb-3 md:mb-4"
            >
              BRING NATURE HOME
            </motion.p>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-foreground mb-4 md:mb-6 leading-tight"
            >
              Grow Something Beautiful.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm md:text-base lg:text-lg text-muted-foreground mb-4 md:mb-6 max-w-lg lg:max-w-xl"
            >
              Discover beautiful plants, stylish planters, quality seeds and gardening essentials for greener spaces.
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-sm md:text-base lg:text-lg text-forest font-medium italic mb-6 md:mb-8"
            >
              "You don't buy plants, you adopt them."
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-12"
            >
              <Link href="/shop/plants">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    size="lg"
                    className="bg-forest text-primary-foreground hover:bg-forest-dark px-6 md:px-8 py-5 md:py-6 text-sm md:text-base font-semibold btn-hover-lift group"
                  >
                    SHOP PLANTS
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/shop/tools">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-forest text-forest hover:bg-forest hover:text-primary-foreground px-6 md:px-8 py-5 md:py-6 text-sm md:text-base font-semibold btn-hover-lift group"
                  >
                    EXPLORE GARDENING
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-6 md:gap-8 lg:gap-12"
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-forest">100+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Plant Varieties</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-forest">5K+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Happy Plant Parents</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-forest">100%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Made for Better Living</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Enhanced Editorial Image Composition with Auto-Rotation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative order-1 lg:order-2 h-[350px] md:h-[500px] lg:h-[600px] xl:h-[700px]"
            style={{ scale }}
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
          >
            {/* Main hero image with enhanced parallax and auto-rotation */}
            <motion.div
              style={{ y: y1 }}
              className="absolute inset-0"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentHeroImage}
                  src={heroImages[currentHeroImage]}
                  alt="Beautiful plant in modern home"
                  className="w-full h-full object-cover object-center rounded-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                />
              </AnimatePresence>
            </motion.div>
            
            {/* Premium Navigation Arrows */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevHeroImage}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-stone-50/95 backdrop-blur-md shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 border border-stone-200 z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-forest" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextHeroImage}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-stone-50/95 backdrop-blur-md shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 border border-stone-200 z-20"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-forest" />
            </motion.button>

            {/* Image Counter */}
            <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium shadow-lg z-20">
              {currentHeroImage + 1} / {heroImages.length}
            </div>
            
            {/* Enhanced decorative floating elements with parallax */}
            <motion.div
              style={{ y: y2 }}
              className="absolute top-10 right-10 w-20 h-20 bg-sage/20 rounded-full blur-3xl float-animation z-10"
            />
            <motion.div
              style={{ y: y1, animationDelay: '1.5s' }}
              className="absolute bottom-20 left-10 w-16 h-16 bg-forest/10 rounded-full blur-2xl float-animation z-10"
            />

            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none rounded-2xl z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
