'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function PlantCareEducation() {
  const benefits = [
    { title: 'Healthy & Carefully Selected' },
    { title: 'Thoughtfully Designed' },
    { title: 'Made for Everyday Growing' },
    { title: 'Greener Living' },
  ];

  return (
    <section className="py-16 bg-cream/30">
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="/images/Peace%20Lilly.png"
                  alt="Plantro Brand Story"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sage/20 rounded-full blur-3xl leaf-sway" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-forest/10 rounded-full blur-2xl leaf-sway" />
            </div>

            {/* Content Side */}
            <div className="space-y-8">
              <div>
                <p className="text-sm font-medium text-forest uppercase tracking-widest mb-3">
                  A GREENER WAY TO LIVE
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Make Every Space a Little Greener.
                </h2>
                <p className="text-lg text-muted-foreground max-w-lg">
                  At Plantro, we believe that growing plants should be simple, beautiful and rewarding. From healthy plants and stylish planters to quality seeds and gardening essentials, we're here to help you nurture, grow and flourish.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-forest flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{benefit.title}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link href="/about">
                <Button
                  size="lg"
                  className="bg-forest hover:bg-forest-dark text-primary-foreground px-8 btn-hover-lift group"
                >
                  DISCOVER PLANTRO
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
