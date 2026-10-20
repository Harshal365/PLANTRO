'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FeaturedCollections() {
  return (
    <section className="py-8 md:py-10 bg-cream/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Collection 1 - Bring Your Space to Life */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/shop/plants" className="group relative overflow-hidden rounded-2xl aspect-[16/9] card-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-forest/30 to-forest/10 z-10" />
              <img
                src="/images/Aglaonema-Lipstick-Plant.png"
                alt="Bring Your Space to Life"
                className="w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-4 md:p-6 lg:p-8 text-primary-foreground">
                <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 md:mb-3">Bring Your Space to Life</h3>
                <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-6 max-w-md text-primary-foreground/90">
                  Beautiful indoor plants for homes, offices and balconies.
                </p>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm btn-hover-lift group text-sm md:text-base"
                >
                  SHOP PLANTS
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </Link>
          </motion.div>

          {/* Collection 2 - Grow From the Very Beginning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/shop/seeds" className="group relative overflow-hidden rounded-2xl aspect-[16/9] card-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-sage/30 to-sage/10 z-10" />
              <img
                src="/images/Coriander-seeds.png"
                alt="Grow From the Very Beginning"
                className="w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-4 md:p-6 lg:p-8 text-primary-foreground">
                <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 md:mb-3">Grow From the Very Beginning</h3>
                <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-6 max-w-md text-primary-foreground/90">
                  Quality seeds to help you grow fresh and healthy plants at home.
                </p>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm btn-hover-lift group text-sm md:text-base"
                >
                  SHOP SEEDS
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
