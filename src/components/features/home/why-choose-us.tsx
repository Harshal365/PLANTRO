'use client';

import { motion } from 'framer-motion';
import { Leaf, Package, BookOpen, Heart } from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      icon: Leaf,
      title: 'Healthy & Quality Plants',
      description: 'Carefully selected plants that thrive in your space',
    },
    {
      icon: Package,
      title: 'Safe & Secure Packaging',
      description: 'Expertly packed to ensure safe delivery',
    },
    {
      icon: BookOpen,
      title: 'Expert Plant Guidance',
      description: 'Simple care instructions for every plant',
    },
    {
      icon: Heart,
      title: 'Made for Plant Lovers',
      description: 'Curated by plant enthusiasts, for plant enthusiasts',
    },
  ];

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Grow Green
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to helping you create your perfect green space with quality plants and expert support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-forest/10 flex items-center justify-center">
                <feature.icon className="h-8 w-8 text-forest" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
