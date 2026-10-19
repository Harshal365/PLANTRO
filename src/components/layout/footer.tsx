'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Share2 } from 'lucide-react';
import { Logo } from './logo';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function Footer() {
  const footerLinks = {
    shop: [
      { name: 'Plants', href: '/shop/plants' },
      { name: 'Pots & Planters', href: '/shop/pots' },
      { name: 'Seeds', href: '/shop/seeds' },
      { name: 'Gardening Tools', href: '/shop/tools' },
      { name: 'Plant Care', href: '/shop/care' },
    ],
    about: [
      { name: 'Our Story', href: '/about' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Contact', href: '/contact' },
    ],
    customerCare: [
      { name: 'Track Order', href: '/track' },
      { name: 'Shipping & Delivery', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'FAQs', href: '/faq' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <Logo />
            </Link>
            <p className="text-sm font-medium text-forest mb-2">
              Seeds for Better Living
            </p>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Plants, planters, seeds and gardening essentials for greener living.
            </p>
            <div className="flex space-x-3">
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-forest hover:text-white transition-all social-icon"
                aria-label="Facebook"
              >
                <Share2 className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-forest hover:text-white transition-all social-icon"
                aria-label="Instagram"
              >
                <Share2 className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-forest hover:text-white transition-all social-icon"
                aria-label="Twitter"
              >
                <Share2 className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg text-foreground">SHOP</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-forest transition-colors nav-link"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg text-foreground">ABOUT</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-forest transition-colors nav-link"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg text-foreground">CUSTOMER CARE</h4>
            <ul className="space-y-3">
              {footerLinks.customerCare.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-forest transition-colors nav-link"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs md:text-sm text-muted-foreground text-center">
            © 2026 Plantro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
