'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const { t, isArabic } = useLanguage();
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--color-black-rich)] z-10" />

        {/* Cinematic curtain background */}
        <div className="absolute inset-0 bg-curtain" />

        {/* Spotlight effect */}
        <div className="absolute inset-0 bg-spotlight z-10" />

        {/* Film grain overlay */}
        <div className="absolute inset-0 film-grain z-20" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-vignette z-20" />

        {/* Animated film strips on sides */}
        <div className="absolute top-0 bottom-0 left-0 w-12 bg-[var(--color-black-pure)] opacity-80 z-10">
          <div className="h-full flex flex-col justify-around py-8">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                className="w-8 h-4 mx-auto bg-[var(--color-charcoal)] rounded-sm"
              />
            ))}
          </div>
        </div>
        <div className="absolute top-0 bottom-0 right-0 w-12 bg-[var(--color-black-pure)] opacity-80 z-10">
          <div className="h-full flex flex-col justify-around py-8">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                className="w-8 h-4 mx-auto bg-[var(--color-charcoal)] rounded-sm"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-30 container mx-auto px-4 text-center"
      >
        {/* Decorative stars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="text-[var(--color-gold)] text-3xl">★</span>
          <span className="text-[var(--color-gold)] text-2xl">★</span>
          <span className="text-[var(--color-gold)] text-xl">★</span>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
          <span className="text-[var(--color-gold)] text-xl">★</span>
          <span className="text-[var(--color-gold)] text-2xl">★</span>
          <span className="text-[var(--color-gold)] text-3xl">★</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={cn(
            'text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight',
            isArabic ? 'font-arabic text-gradient-gold' : 'heading-display text-white'
          )}
        >
          {isArabic ? (
            <>
              جمعية الكرامة
              <br />
              <span className="text-[var(--color-gold)]">للمسرح والسينما</span>
            </>
          ) : (
            <>
              Association Al-Karama
              <br />
              <span className="text-[var(--color-gold)]">Theatre & Cinema</span>
            </>
          )}
        </motion.h1>

        {/* Subtitle/Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={cn(
            'text-xl md:text-2xl lg:text-3xl text-[var(--color-champagne)] mb-12 max-w-3xl mx-auto',
            isArabic ? 'font-arabic leading-relaxed' : 'heading-display italic'
          )}
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className={cn(
            'flex flex-col sm:flex-row items-center justify-center gap-4',
            isArabic && 'sm:flex-row-reverse'
          )}
        >
          <Link href="/contact#register">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'btn-gold inline-flex items-center gap-3 text-lg px-8 py-4',
                isArabic && 'flex-row-reverse font-arabic'
              )}
            >
              <Play className="w-5 h-5" />
              {t.hero.cta1}
            </motion.span>
          </Link>
          <Link href="/cinema">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'btn-outline inline-flex items-center gap-3 text-lg px-8 py-4',
                isArabic && 'flex-row-reverse font-arabic'
              )}
            >
              {t.hero.cta2}
            </motion.span>
          </Link>
        </motion.div>

        {/* Cinema Club Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-[var(--color-gold)]/30">
            <span className="w-3 h-3 rounded-full bg-[var(--color-red-bright)] animate-pulse" />
            <span className={cn('text-[var(--color-gold)]', isArabic && 'font-arabic')}>
              {isArabic ? 'افتتاح نادي البرنوصي السينمائي' : 'Cine-Club Bernoussi Now Open'}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-[var(--color-gold)]"
        >
          <span className={cn('text-sm', isArabic && 'font-arabic')}>{t.hero.scrollDown}</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>

      {/* Decorative corner ornaments */}
      <div className="absolute top-20 left-4 w-20 h-20 border-l-2 border-t-2 border-[var(--color-gold)]/30 z-30" />
      <div className="absolute top-20 right-4 w-20 h-20 border-r-2 border-t-2 border-[var(--color-gold)]/30 z-30" />
      <div className="absolute bottom-20 left-4 w-20 h-20 border-l-2 border-b-2 border-[var(--color-gold)]/30 z-30" />
      <div className="absolute bottom-20 right-4 w-20 h-20 border-r-2 border-b-2 border-[var(--color-gold)]/30 z-30" />
    </section>
  );
}
