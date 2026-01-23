'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Languages } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export default function Header() {
  const { t, language, setLanguage, isArabic } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/theatre', label: t.nav.theatre },
    { href: '/cinema', label: t.nav.cinema },
    { href: '/training', label: t.nav.training },
    { href: '/media', label: t.nav.media },
    { href: '/partners', label: t.nav.partners },
    { href: '/contact', label: t.nav.contact },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'fr' : 'ar');
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'glass border-b border-[var(--color-gold)]/10'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative w-14 h-14 sm:w-16 sm:h-16"
              >
                <Image
                  src="/Logo/al-karama-logo.svg"
                  alt="Al-Karama Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
              <div className={cn('hidden sm:block', isArabic && 'font-arabic')}>
                <h1 className="text-lg font-bold text-[var(--color-gold)]">
                  {isArabic ? 'جمعية الكرامة' : 'Al-Karama'}
                </h1>
                <p className="text-xs text-[var(--color-silver)]">
                  {isArabic ? 'للمسرح والسينما' : 'Theatre & Cinema'}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium text-[var(--color-silver)] hover:text-[var(--color-gold)] transition-colors relative group',
                    isArabic && 'font-arabic'
                  )}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--color-gold)] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-2 rounded border border-[var(--color-gold)]/30 hover:border-[var(--color-gold)] transition-colors"
                aria-label="Toggle language"
              >
                <Languages className="w-4 h-4 text-[var(--color-gold)]" />
                <span className="text-sm font-medium text-[var(--color-gold)]">
                  {language === 'ar' ? 'FR' : 'AR'}
                </span>
              </motion.button>

              {/* Join Club Button - Desktop */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden md:block"
              >
                <Link
                  href="/contact#register"
                  className={cn(
                    'btn-gold inline-flex items-center gap-2 text-sm',
                    isArabic && 'font-arabic'
                  )}
                >
                  {t.nav.joinClub}
                </Link>
              </motion.div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[var(--color-gold)]"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: isArabic ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isArabic ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cn(
                'absolute top-0 bottom-0 w-80 bg-[var(--color-charcoal)] border-[var(--color-gold)]/20',
                isArabic ? 'right-0 border-l' : 'left-0 border-r'
              )}
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">
                <div className="flex-1 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'block py-3 px-4 text-lg text-[var(--color-silver)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/5 rounded transition-colors',
                          isArabic && 'font-arabic text-right'
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-6 border-t border-[var(--color-gold)]/20">
                  <Link
                    href="/contact#register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'btn-gold w-full text-center block',
                      isArabic && 'font-arabic'
                    )}
                  >
                    {t.nav.joinClub}
                  </Link>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
