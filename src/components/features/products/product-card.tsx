'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCardSkeleton } from '@/components/ui/skeleton';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist, removeItem } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    addItem(product);
    
    // Trigger cart bounce animation
    const cartIcon = document.querySelector('[data-cart-icon]');
    if (cartIcon) {
      cartIcon.classList.add('cart-bounce');
      setTimeout(() => cartIcon.classList.remove('cart-bounce'), 400);
    }
    
    setTimeout(() => setIsAdding(false), 700);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    const heartIcon = e.currentTarget.querySelector('svg');
    
    if (inWishlist) {
      removeItem(product.id);
    } else {
      addToWishlist(product);
      // Add pulse animation
      if (heartIcon) {
        heartIcon.classList.add('heart-pulse');
        setTimeout(() => heartIcon.classList.remove('heart-pulse'), 300);
      }
    }
  };

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - Number(product.price)) / Number(product.compareAtPrice)) * 100)
    : 0;

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-sm hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-500 ease-out hover:-translate-y-1 py-0">
        <CardContent className="p-0">
          <div className="relative h-72 overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=600&fit=crop';
              }}
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-forest/90 backdrop-blur-sm text-white border-0 shadow-md px-3 py-1 text-xs font-medium tracking-wide">New</Badge>
              )}
              {product.isBestSeller && (
                <Badge className="bg-amber-600/90 backdrop-blur-sm text-white border-0 shadow-md px-3 py-1 text-xs font-medium tracking-wide">Best Seller</Badge>
              )}
              {discount > 0 && (
                <Badge className="bg-rose-500/90 backdrop-blur-sm text-white border-0 shadow-md px-3 py-1 text-xs font-medium tracking-wide">{discount}% OFF</Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-300 shadow-sm border border-stone-100"
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={`h-5 w-5 transition-all duration-300 ${
                  inWishlist ? 'fill-rose-500 text-rose-500 scale-110' : 'text-stone-600 hover:text-rose-500'
                }`}
              />
            </button>

            {/* Quick Add to Cart */}
            <motion.button
              onClick={handleAddToCart}
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isAdding}
              className="absolute bottom-4 right-4 bg-forest/95 backdrop-blur-sm text-white p-3.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-forest hover:shadow-xl border border-forest/20"
              aria-label="Add to cart"
            >
              {isAdding ? (
                <span className="text-sm font-semibold">✓</span>
              ) : (
                <ShoppingCart className="h-5 w-5" />
              )}
            </motion.button>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-1.5 mb-2.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-stone-500 font-medium">
                ({product.reviewCount})
              </span>
            </div>

            <h3 className="font-semibold text-base mb-2.5 line-clamp-1 text-stone-800 group-hover:text-forest transition-colors duration-300">
              {product.name}
            </h3>

            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-forest">
                ₹{product.price}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-stone-400 line-through font-medium">
                  ₹{product.compareAtPrice}
                </span>
              )}
            </div>

            {!product.inStock && (
              <Badge variant="outline" className="mt-3 w-fit border-stone-200 text-stone-500 bg-stone-50">
                Out of Stock
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
