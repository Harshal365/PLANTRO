'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function InstagramGallery() {
  const galleryImages = [
    '/images/Peace%20Lilly.png',
    '/images/Monstera%20Plant%20.png',
    '/images/Snake%20Plant%20.png',
    '/images/Aglaonema%20pink%20beauty%20.png',
    '/images/Money%20Plant%20.png',
    '/images/Lucky%20Bamboo%20.png',
  ];

  return (
    <section className="py-10 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Camera className="h-6 w-6 text-forest" />
            <p className="text-sm font-medium text-forest uppercase tracking-widest">
              FOLLOW US
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real Plants. Real Homes.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our community of plant lovers and get daily inspiration
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl card-hover img-zoom-container"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Camera className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="border-forest text-forest hover:bg-forest hover:text-primary-foreground px-8 btn-hover-lift group"
            >
              FOLLOW PLANTRO
              <Camera className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
