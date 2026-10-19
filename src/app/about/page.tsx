'use client';

import { motion } from 'framer-motion';
import { Heart, Leaf, Sprout, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">About Plantro</h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner in bringing nature into your home
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="prose prose-sm md:prose-base lg:prose-lg max-w-none mb-12 md:mb-16"
        >
          <p className="text-base md:text-lg text-muted-foreground mb-6">
            Founded with a passion for greenery, Plantro is India's premium online plant nursery dedicated to helping you create beautiful, healthy living spaces. We believe that every home deserves the touch of nature, and we're here to make that journey simple and enjoyable.
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-6">
            Our carefully curated collection of indoor plants, outdoor plants, seeds, pots, and gardening essentials is handpicked by our team of plant experts. Each plant is nurtured with care before it reaches your doorstep, ensuring you receive only the healthiest, most vibrant greenery.
          </p>
          <p className="text-base md:text-lg text-muted-foreground">
            Whether you're a seasoned plant parent or just starting your green journey, Plantro is here to guide you every step of the way with expert advice, quality products, and exceptional service.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16"
        >
          <div className="bg-cream/30 p-6 md:p-8 rounded-xl">
            <Heart className="h-10 w-10 md:h-12 md:w-12 text-forest mb-4" />
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Our Mission</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              To bring the joy of gardening to every home by providing premium quality plants, seeds, and gardening supplies along with expert guidance that helps plants thrive.
            </p>
          </div>
          <div className="bg-cream/30 p-6 md:p-8 rounded-xl">
            <Leaf className="h-10 w-10 md:h-12 md:w-12 text-forest mb-4" />
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Our Vision</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              To create a greener, healthier world where every living space is enriched with the beauty and benefits of plants, making nature accessible to everyone.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center p-4 md:p-6">
              <Sprout className="h-8 w-8 md:h-10 md:w-10 text-forest mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-sm md:text-base">Quality First</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                We never compromise on quality. Every plant is carefully selected and nurtured.
              </p>
            </div>
            <div className="text-center p-4 md:p-6">
              <Heart className="h-8 w-8 md:h-10 md:w-10 text-forest mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-sm md:text-base">Customer Love</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Your satisfaction is our priority. We go above and beyond to ensure you're happy.
              </p>
            </div>
            <div className="text-center p-4 md:p-6">
              <ShieldCheck className="h-8 w-8 md:h-10 md:w-10 text-forest mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-sm md:text-base">Sustainability</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                We practice eco-friendly methods and support sustainable gardening practices.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-forest text-primary-foreground p-8 md:p-12 rounded-xl text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Green Community</h2>
          <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto">
            Be part of thousands of plant lovers who trust Plantro for their gardening needs. Let's grow together!
          </p>
          <div className="text-3xl md:text-4xl font-bold mb-2">10,000+</div>
          <div className="text-xs md:text-sm opacity-80">Happy Plant Parents</div>
        </motion.div>
      </div>
    </div>
  );
}
