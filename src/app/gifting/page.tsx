'use client';

import { motion } from 'framer-motion';
import { ProductCard } from '@/components/features/products/product-card';
import { giftingData } from '@/constants/products';
import { Gift } from 'lucide-react';

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function GiftingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-rose-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Gift className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-2">Gifting</h1>
              <p className="text-xl text-gray-600">Perfect plant gifts for every occasion</p>
            </div>
          </div>
          <div className="mt-6 flex gap-4 text-sm text-gray-500">
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">8 Products</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">Gift Wrapped</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">Personalized</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {giftingData.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
