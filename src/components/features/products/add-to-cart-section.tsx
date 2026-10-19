'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Truck, Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { Product } from '@/types';

interface AddToCartSectionProps {
  product: Product;
}

export function AddToCartSection({ product }: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist, removeItem } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeItem(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - Number(product.price)) / Number(product.compareAtPrice)) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{product.name}</h1>
        <p className="text-muted-foreground">{product.shortDescription}</p>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-forest">₹{product.price}</span>
        {product.compareAtPrice && (
          <>
            <span className="text-xl text-muted-foreground line-through">
              ₹{product.compareAtPrice}
            </span>
            <Badge variant="destructive">{discount}% OFF</Badge>
          </>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(product.rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-300'
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {product.rating} ({product.reviewCount} reviews)
        </span>
      </div>

      <Separator />

      {/* Quantity */}
      <div>
        <label className="text-sm font-medium mb-2 block">Quantity</label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </Button>
          <span className="w-12 text-center font-semibold">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          size="lg"
          className="w-full bg-forest text-primary-foreground hover:bg-forest/90"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={handleWishlistToggle}
          >
            <Heart
              className={`mr-2 h-5 w-5 ${
                inWishlist ? 'fill-red-500 text-red-500' : ''
              }`}
            />
            {inWishlist ? 'Wishlisted' : 'Wishlist'}
          </Button>
          <Button variant="outline" size="lg" className="flex-1">
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </Button>
        </div>
      </div>

      <Separator />

      {/* Benefits */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Truck className="h-5 w-5 text-forest" />
          <span>Free shipping on orders above ₹999</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Shield className="h-5 w-5 text-forest" />
          <span>14-day healthy plant guarantee</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <RefreshCw className="h-5 w-5 text-forest" />
          <span>Easy returns & replacements</span>
        </div>
      </div>
    </div>
  );
}
