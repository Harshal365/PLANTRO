'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/features/products/product-card';
import { plantsData, potsData, seedsData, toolsData, careData, giftingData } from '@/constants/products';

// Get best sellers from all product categories
const allProducts = [...plantsData, ...potsData, ...seedsData, ...toolsData, ...careData, ...giftingData];
const bestSellers = allProducts.filter(p => p.isBestSeller).slice(0, 4);

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

export function BestSellersSection() {
  return (
    <section className="py-8 md:py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 gap-4">
          <div>
            <p className="text-xs md:text-sm font-medium text-forest uppercase tracking-widest mb-2 md:mb-3">
              BESTSELLERS
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2">
              Loved by Plant Parents
            </h2>
          </div>
          <Link href="/shop?sort=popular">
            <Button variant="outline" className="border-forest text-forest hover:bg-forest hover:text-primary-foreground hidden sm:flex text-sm md:text-base">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {bestSellers.length > 0 ? (
            bestSellers.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-4 text-center text-muted-foreground">No best sellers found</p>
          )}
        </motion.div>

        <div className="text-center mt-6 md:mt-8 sm:hidden">
          <Link href="/shop?sort=popular">
            <Button variant="outline" className="border-forest text-forest hover:bg-forest hover:text-primary-foreground btn-hover-lift text-sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
