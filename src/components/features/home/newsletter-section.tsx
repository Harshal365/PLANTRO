'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function NewsletterSection() {
  return (
    <section className="py-16 bg-cream relative overflow-hidden">
      {/* Decorative leaf elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-sage/10 rounded-full blur-3xl leaf-sway" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-forest/10 rounded-full blur-2xl leaf-sway" style={{ animationDelay: '2s' }} />
      
      <ScrollReveal>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join the Plantro Community
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get plant-care tips, gardening inspiration, new arrivals and exclusive offers.
            </p>
            
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 h-12 px-6 bg-background border-border"
              />
              <Button
                size="lg"
                className="bg-forest hover:bg-forest-dark text-primary-foreground px-8 btn-hover-lift"
              >
                SUBSCRIBE
              </Button>
            </motion.form>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
