'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const categories = [
  {
    id: 1,
    name: 'Indoor Plants',
    image: '/images/Aglaonema%20Lipstick%20Plant%20.png',
    slug: 'plants',
  },
  {
    id: 2,
    name: 'Flowering Plants',
    image: '/images/Rose%20Plant%20.png',
    slug: 'plants',
  },
  {
    id: 3,
    name: 'Easy-Care Plants',
    image: '/images/Snake%20Plant%20.png',
    slug: 'plants',
  },
  {
    id: 4,
    name: 'Pots & Planters',
    image: '/images/Ceramic%20Plantro.png',
    slug: 'pots',
  },
  {
    id: 5,
    name: 'Hanging Planters',
    image: '/images/Hanging%20Planter.png',
    slug: 'pots',
  },
  {
    id: 6,
    name: 'Seeds',
    image: '/images/Coriander%20seeds.png',
    slug: 'seeds',
  },
  {
    id: 7,
    name: 'Gardening Tools',
    image: '/images/Moisture%20meter.png',
    slug: 'tools',
  },
  {
    id: 8,
    name: 'Plant Care',
    image: '/images/Spider%20Plant%20.png',
    slug: 'care',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function CategoriesSection() {
  return (
    <section className="py-4 md:py-6 pb-2 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-8 md:mb-12">
          <p className="text-xs md:text-sm font-medium tracking-widest uppercase text-forest mb-2">
            SHOP BY CATEGORY
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
            Find Something Green for Every Space
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12"
        >
          {categories.map((category, index) => (
            <motion.div key={category.id} variants={itemVariants} custom={index}>
              <Link href={`/shop/${category.slug}`}>
                <div className="group cursor-pointer">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-3 md:border-4 border-border group-hover:border-forest group-hover:shadow-lg transition-all duration-300 mb-3 md:mb-4 mx-auto img-zoom-container">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover img-zoom"
                    />
                  </div>
                  <h3 className="text-center text-xs sm:text-sm md:text-base font-semibold text-foreground group-hover:text-forest transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mb-0">
          <Link href="/shop">
            <Button variant="outline" className="border-forest text-forest hover:bg-forest hover:text-primary-foreground btn-hover-lift group text-sm md:text-base">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
