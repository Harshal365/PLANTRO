'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { CartSlideOver } from '@/components/features/cart/cart-slide-over';
import { Logo } from '@/components/layout/logo';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems, toggleCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  const cartItems = getTotalItems();
  const wishlistCount = wishlistItems.length;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Plants', href: '/shop/plants' },
    { name: 'Pots & Planters', href: '/shop/pots' },
    { name: 'Seeds', href: '/shop/seeds' },
    { name: 'Gardening', href: '/shop/tools' },
    { name: 'Plant Care', href: '/shop/care' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/50">
      {/* Announcement Bar */}
      <div className="bg-cream text-forest py-1.5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center text-[10px] sm:text-xs font-medium tracking-wide flex-wrap gap-2 sm:gap-0">
            <span>Free Shipping on Orders Above ₹499</span>
            <span className="hidden sm:inline mx-3 opacity-50">•</span>
            <span className="sm:inline">Easy Returns</span>
            <span className="hidden sm:inline mx-3 opacity-50">•</span>
            <span className="sm:inline">Secure Payments</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground nav-link"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="transition-transform duration-300 hover:scale-110 h-9 w-9 md:h-10 md:w-10"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative h-9 w-9 md:h-10 md:w-10">
                <Heart className="h-4 w-4 md:h-5 md:w-5" />
                {mounted && wishlistCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 text-[10px] md:text-xs"
                  >
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative h-9 w-9 md:h-10 md:w-10"
              data-cart-icon
            >
              <ShoppingBag className="h-4 w-4 md:h-5 md:w-5" />
              {mounted && cartItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 text-[10px] md:text-xs"
                >
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* User */}
            <Link href="/account">
              <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10">
                <User className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden transition-transform duration-300 hover:scale-110 h-9 w-9"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-border bg-background"
          >
            <div className="container mx-auto px-4 py-3 md:py-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const searchInput = e.currentTarget.querySelector('input');
                  if (searchInput?.value) {
                    window.location.href = `/search?q=${encodeURIComponent(searchInput.value)}`;
                  }
                }}
                className="relative"
              >
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for plants, pots, seeds..."
                  className="pl-10 h-10 md:h-12 text-sm md:text-base"
                  autoFocus
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-border bg-background"
          >
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="block text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Slide Over */}
      <CartSlideOver />
    </header>
  );
}
