'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    // Random starting image on refresh
    if (images.length > 1) {
      return Math.floor(Math.random() * images.length);
    }
    return 0;
  });
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate images every 6 seconds
  useEffect(() => {
    if (images.length <= 1 || !isAutoplay) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [images.length, isAutoplay]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    // Reset timer on manual navigation
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 6000);
    }
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    // Reset timer on manual navigation
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 6000);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevImage();
    } else if (info.offset.x < -threshold) {
      nextImage();
    }
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
    // Reset timer on manual navigation
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 6000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        ref={containerRef}
        className="relative aspect-square overflow-hidden rounded-2xl bg-background w-full max-w-[600px] mx-auto"
        onMouseEnter={() => setIsAutoplay(false)}
        onMouseLeave={() => setIsAutoplay(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${productName} - Image ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            drag={images.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            style={{ x }}
            className={`w-full h-full object-contain cursor-zoom-in ${
              isZoomed ? 'scale-150' : 'scale-90'
            } transition-transform duration-300`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </AnimatePresence>

        {/* Premium Navigation Arrows */}
        {images.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-stone-50/95 backdrop-blur-md shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 border border-stone-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-forest" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-stone-50/95 backdrop-blur-md shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 border border-stone-200"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-forest" />
            </motion.button>
          </>
        )}

        {/* Zoom Indicator */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 bg-stone-50/95 backdrop-blur-md hover:bg-stone-100 shadow-md transition-all duration-300"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <ZoomIn className="h-5 w-5 text-forest" />
        </Button>

        {/* Premium Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Premium Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goToImage(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-sm ${
                index === currentIndex
                  ? 'border-forest shadow-md'
                  : 'border-stone-200 hover:border-forest/50'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
