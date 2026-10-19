'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';

export function FloatingButtons() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Contact Button */}
      <motion.a
        href="tel:+919876543210"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Call us"
      >
        <Phone className="h-6 w-6" />
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.a>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white flex items-center justify-center shadow-2xl hover:from-green-700 hover:to-emerald-700 transition-all"
        aria-label="Open contact options"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <MessageCircle className="h-8 w-8" />
        </motion.div>
      </motion.button>
    </div>
  );
}
