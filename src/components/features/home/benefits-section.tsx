'use client';

import { motion } from 'framer-motion';
import { Sprout, Package, ShieldCheck, Lock } from 'lucide-react';

const benefits = [
  {
    icon: Sprout,
    title: 'Healthy Plants',
    description: 'Carefully nurtured',
  },
  {
    icon: Package,
    title: 'Safe Delivery',
    description: 'Packed with care',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Products',
    description: 'Made for your plants',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    description: 'Shop with confidence',
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

export function BenefitsSection() {
  return (
    <section className="py-8 bg-background border-b border-border reveal">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center space-x-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <benefit.icon className="w-6 h-6 text-forest" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
