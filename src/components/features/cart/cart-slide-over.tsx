'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCartStore } from '@/store/cart-store';
import Link from 'next/link';
import Image from 'next/image';

export function CartSlideOver() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();
  const shipping = totalPrice >= 999 ? 0 : 99;
  const total = totalPrice + shipping;

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Shopping Cart ({items.length})
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={toggleCart}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground text-center mb-4">
              Add some plants to get started
            </p>
            <Link href="/shop" onClick={toggleCart}>
              <Button className="bg-forest text-primary-foreground">
                Browse Plants
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.product.slug}`}
                        onClick={toggleCart}
                        className="font-medium hover:text-forest transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">
                        ₹{item.product.price}
                      </p>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t p-6 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-forest">
                    Add ₹{999 - totalPrice} more for free shipping
                  </p>
                )}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <Link href="/checkout" onClick={toggleCart} className="block">
                <Button
                  size="lg"
                  className="w-full bg-forest text-primary-foreground hover:bg-forest/90"
                >
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/shop" onClick={toggleCart}>
                <Button variant="ghost" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
