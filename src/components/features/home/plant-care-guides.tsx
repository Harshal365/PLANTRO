'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { motion } from 'framer-motion';

export function PlantCareGuides() {
  const guides = [
    {
      category: 'PLANT CARE',
      title: 'How Often Should You Water Your Plants?',
      description: 'Learn the signs your plants need water and establish the perfect watering routine.',
      image: '/images/Lucky%20Bamboo%20.png',
    },
    {
      category: 'BEGINNER GUIDES',
      title: 'Best Indoor Plants for Beginners',
      description: 'Discover low-maintenance plants that are perfect for new plant parents.',
      image: '/images/Snake%20Plant%20.png',
    },
    {
      category: 'GROWING',
      title: 'How to Grow Plants From Seeds',
      description: 'Step-by-step guide to starting your plants from seeds successfully.',
      image: '/images/Basil%20seeds.png',
    },
  ];

  return (
    <section className="py-10 bg-background">
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-forest uppercase tracking-widest mb-3">
              PLANT CARE GUIDES
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Learn. Grow. Thrive.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert guidance to help you become a confident plant parent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {guides.map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href="/blog" className="group">
                  <div className="bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 card-hover">
                    <div className="aspect-[16/10] overflow-hidden img-zoom-container">
                      <img
                        src={guide.image}
                        alt={guide.title}
                        className="w-full h-full object-cover img-zoom"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-medium text-forest uppercase tracking-widest mb-2">
                        {guide.category}
                      </p>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-forest transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {guide.description}
                      </p>
                      <span className="text-sm font-medium text-forest inline-flex items-center group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/blog">
              <Button
                variant="outline"
                className="border-forest text-forest hover:bg-forest hover:text-primary-foreground px-8 btn-hover-lift group"
              >
                VIEW ALL GUIDES
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
