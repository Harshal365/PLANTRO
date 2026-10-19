'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function PlantCareEssential() {
  const features = [
    { title: '3-IN-1 FUNCTION', description: 'Measure soil moisture, pH and light.' },
    { title: 'EASY TO USE', description: 'Simple readings for everyday plant care.' },
    { title: 'FOR EVERY PLANT', description: 'Ideal for indoor and outdoor plants.' },
  ];

  return (
    <section className="py-16 bg-cream">
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square rounded-3xl overflow-hidden bg-cream/50">
                <img
                  src="/images/Moisture%20meter.png"
                  alt="Plantro Soil Moisture, pH & Light Meter"
                  className="w-full h-full object-contain p-8"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-forest/10 rounded-full blur-3xl leaf-sway" />
            </div>

            {/* Content Side */}
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <p className="text-sm font-medium text-forest uppercase tracking-widest mb-3">
                  PLANT CARE ESSENTIAL
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Know Your Soil. Nurture Your Plants.
                </h2>
                <p className="text-lg text-muted-foreground max-w-lg">
                  Give your plants the care they deserve with Plantro's 3-in-1 Soil Moisture, pH & Light Meter.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-forest flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link href="/shop/tools">
                <Button
                  size="lg"
                  className="bg-forest hover:bg-forest-dark text-primary-foreground px-8 btn-hover-lift group"
                >
                  SHOP GARDENING TOOLS
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
