'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function SeedsSection() {
  const seeds = [
    {
      name: 'CORIANDER SEEDS',
      description: 'Grow fresh coriander at home.',
      image: '/images/Coriander%20seeds.png',
    },
    {
      name: 'SPINACH SEEDS',
      description: 'Fresh greens, grown by you.',
      image: '/images/Spinach%20Seeds.png',
    },
  ];

  return (
    <section className="py-16 bg-cream/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sage/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-forest/10 rounded-full blur-2xl" />
      
      <ScrollReveal>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              From Tiny Seeds to Something Beautiful
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start growing your own fresh greens with carefully selected Plantro seeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {seeds.map((seed, index) => (
              <Link key={index} href="/shop/seeds" className="group">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] card-hover">
                  <img
                    src={seed.image}
                    alt={seed.name}
                    className="w-full h-full object-cover img-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-primary-foreground">
                    <h3 className="text-2xl font-bold mb-2">{seed.name}</h3>
                    <p className="text-sm text-primary-foreground/90 mb-4">{seed.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/shop/seeds">
              <Button
                size="lg"
                className="bg-forest hover:bg-forest-dark text-primary-foreground px-8 btn-hover-lift group"
              >
                EXPLORE ALL SEEDS
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
