'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export default function Footer() {
  const { t, isArabic } = useLanguage();

  const quickLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/cinema', label: t.nav.cinema },
    { href: '/theatre', label: t.nav.theatre },
    { href: '/contact', label: t.nav.contact },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="relative bg-[var(--color-black-pure)] border-t border-[var(--color-gold)]/10">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-50" />

      {/* Film Strip Decoration */}
      <div className="film-strip-border bg-[var(--color-charcoal)]/50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo & About */}
            <div className={cn('space-y-6', isArabic && 'text-right')}>
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="relative w-16 h-16">
                  <Image
                    src="/Logo/al-karama-logo.svg"
                    alt="Al-Karama Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className={cn(isArabic && 'font-arabic')}>
                  <h3 className="text-xl font-bold text-[var(--color-gold)]">
                    {isArabic ? 'جمعية الكرامة' : 'Al-Karama'}
                  </h3>
                  <p className="text-sm text-[var(--color-silver)]">
                    {isArabic ? 'للمسرح والسينما' : 'Theatre & Cinema'}
                  </p>
                </div>
              </Link>
              <p className={cn('text-[var(--color-gray-light)] text-sm leading-relaxed', isArabic && 'font-arabic')}>
                {t.footer.slogan}
              </p>
              {/* Social Links */}
              <div className={cn('flex gap-3', isArabic && 'justify-end')}>
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-[var(--color-charcoal)] border border-[var(--color-gold)]/20 flex items-center justify-center text-[var(--color-silver)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className={cn(isArabic && 'text-right')}>
              <h4 className={cn('text-[var(--color-gold)] font-bold mb-6 text-lg', isArabic && 'font-arabic')}>
                {t.footer.quickLinks}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-[var(--color-silver)] hover:text-[var(--color-gold)] transition-colors text-sm inline-flex items-center gap-2',
                        isArabic && 'font-arabic flex-row-reverse'
                      )}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-crimson)]" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className={cn(isArabic && 'text-right')}>
              <h4 className={cn('text-[var(--color-gold)] font-bold mb-6 text-lg', isArabic && 'font-arabic')}>
                {t.footer.contactInfo}
              </h4>
              <ul className="space-y-4">
                <li className={cn('flex items-start gap-3 text-sm', isArabic && 'flex-row-reverse')}>
                  <MapPin className="w-5 h-5 text-[var(--color-crimson)] flex-shrink-0 mt-0.5" />
                  <span className={cn('text-[var(--color-silver)]', isArabic && 'font-arabic')}>
                    {t.contact.addressValue}
                  </span>
                </li>
                <li className={cn('flex items-center gap-3 text-sm', isArabic && 'flex-row-reverse')}>
                  <Phone className="w-5 h-5 text-[var(--color-crimson)] flex-shrink-0" />
                  <span className="text-[var(--color-silver)]" dir="ltr">
                    +212 6XX XXX XXX
                  </span>
                </li>
                <li className={cn('flex items-center gap-3 text-sm', isArabic && 'flex-row-reverse')}>
                  <Mail className="w-5 h-5 text-[var(--color-crimson)] flex-shrink-0" />
                  <span className="text-[var(--color-silver)]">
                    contact@alkarama.ma
                  </span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className={cn(isArabic && 'text-right')}>
              <h4 className={cn('text-[var(--color-gold)] font-bold mb-6 text-lg', isArabic && 'font-arabic')}>
                {t.footer.newsletter}
              </h4>
              <p className={cn('text-[var(--color-silver)] text-sm mb-4', isArabic && 'font-arabic')}>
                {t.footer.subscribeDesc}
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder={t.footer.emailPlaceholder}
                  className={cn('input-cinematic text-sm', isArabic && 'font-arabic text-right')}
                  dir={isArabic ? 'rtl' : 'ltr'}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={cn('btn-primary w-full text-sm', isArabic && 'font-arabic')}
                >
                  {t.footer.subscribe}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--color-gold)]/10 py-6">
        <div className="container mx-auto px-4">
          <div className={cn('flex flex-col md:flex-row items-center justify-between gap-4', isArabic && 'md:flex-row-reverse')}>
            <p className={cn('text-[var(--color-gray-medium)] text-sm', isArabic && 'font-arabic')}>
              {new Date().getFullYear()} {isArabic ? 'جمعية الكرامة للمسرح والسينما' : 'Association Al-Karama'} - {t.footer.rights}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-gold)] text-2xl">★</span>
              <span className="text-[var(--color-gold)] text-lg">★</span>
              <span className="text-[var(--color-gold)] text-2xl">★</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
