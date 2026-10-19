'use client';

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function CustomerReviews() {
  const reviews = [
    {
      name: 'Priya Sharma',
      rating: 5,
      review: 'The plants arrived in perfect condition! They were healthy and well-packaged. Will definitely order again.',
      avatar: 'PS',
    },
    {
      name: 'Rahul Verma',
      rating: 5,
      review: 'Amazing quality plants and beautiful planters. The Monstera I ordered is thriving in my living room.',
      avatar: 'RV',
    },
    {
      name: 'Anita Patel',
      rating: 5,
      review: 'Fast delivery and excellent customer service. The seeds I bought have already started sprouting!',
      avatar: 'AP',
    },
  ];

  return (
    <section className="py-16 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Loved in Real Homes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-cream/30 p-6 rounded-2xl shadow-sm card-hover"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center text-forest font-semibold">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{review.name}</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">{review.review}</p>
              <p className="text-xs text-forest mt-3 font-medium">Verified Buyer</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
