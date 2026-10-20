'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function PotsPlantersSection() {
  const pots = [
    {
      name: 'Mini Pots',
      description: 'Small spaces. Big charm.',
      image: '/images/set-of-3-mini-pots.png',
    },
    {
      name: 'Hanging Planter',
      description: 'Take your greenery higher.',
      image: '/images/Hanging-Planter.png',
    },
    {
      name: 'Decorative Planter',
      description: 'Style your plants beautifully.',
      image: '/images/Geometric-Gold-Planter.png',
    },
  ];

  return (
    <section className="py-16 bg-background">
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-forest uppercase tracking-widest mb-3">
              POTS & PLANTERS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Give Your Plants a Beautiful Home
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pots.map((pot, index) => (
              <Link key={index} href="/shop/pots" className="group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] card-hover">
                  <img
                    src={pot.image}
                    alt={pot.name}
                    className="w-full h-full object-cover img-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                    <h3 className="text-2xl font-bold mb-2">{pot.name}</h3>
                    <p className="text-sm text-primary-foreground/90 mb-4">{pot.description}</p>
                    <Button
                      variant="outline"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm btn-hover-lift group"
                    >
                      SHOP NOW
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
