'use client';

import { motion } from 'framer-motion';
import { ProductCard } from '@/components/features/products/product-card';
import { potsData } from '@/constants/products';
import { Flower2 } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

export default function PotsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-cream via-stone-50 to-white border-b border-stone-200/50">
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 lg:gap-8 mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-forest/10 to-sage/20 rounded-2xl flex items-center justify-center shadow-lg shadow-forest/5 border border-forest/10 flex-shrink-0">
              <Flower2 className="h-8 w-8 md:h-10 md:w-10 text-forest" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-stone-900 mb-2 md:mb-3">Pots & Planters</h1>
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-stone-600 font-light">Stylish homes for your beloved plants</p>
            </div>
          </div>
          <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm text-stone-600 justify-center md:justify-start">
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-sm border border-stone-200 font-medium">12 Products</span>
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-sm border border-stone-200 font-medium">Various Styles</span>
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-sm border border-stone-200 font-medium">Premium Quality</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
        >
          {potsData.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
