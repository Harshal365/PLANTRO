'use client';

import { useWishlistStore } from '@/store/wishlist-store';
import { ProductCard } from '@/components/features/products/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">My Wishlist</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          {items.length > 0 && (
            <Button
              variant="outline"
              onClick={clearWishlist}
              className="text-destructive hover:text-destructive text-sm md:text-base"
            >
              Clear Wishlist
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 md:py-20">
            <Heart className="h-16 w-16 md:h-20 md:w-20 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6">
              Save your favorite plants to keep track of them
            </p>
            <Link href="/shop">
              <Button className="bg-forest text-primary-foreground text-sm md:text-base">
                Browse Plants
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
