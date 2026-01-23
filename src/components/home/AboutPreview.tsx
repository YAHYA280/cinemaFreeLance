'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, BookOpen, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export default function AboutPreview() {
  const { t, isArabic } = useLanguage();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  const pillars = [
    {
      icon: GraduationCap,
      title: t.about.pillars.formation.title,
      description: t.about.pillars.formation.description,
      color: 'var(--color-crimson)',
    },
    {
      icon: BookOpen,
      title: t.about.pillars.memory.title,
      description: t.about.pillars.memory.description,
      color: 'var(--color-gold)',
    },
    {
      icon: MessageSquare,
      title: t.about.pillars.critique.title,
      description: t.about.pillars.critique.description,
      color: 'var(--color-teal)',
    },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-[var(--color-black-rich)]">
      {/* Background */}
      <div className="absolute inset-0 bg-spotlight opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={cn(
          'grid grid-cols-1 lg:grid-cols-2 gap-16 items-center',
          isArabic && 'lg:grid-flow-dense'
        )}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn(isArabic && 'lg:col-start-2 text-right')}
          >
            {/* Section Label */}
            <div className={cn('flex items-center gap-3 mb-4', isArabic && 'flex-row-reverse')}>
              <div className="w-12 h-0.5 bg-[var(--color-gold)]" />
              <span className={cn('text-[var(--color-gold)] text-sm tracking-widest uppercase', isArabic && 'font-arabic')}>
                {t.about.title}
              </span>
            </div>

            {/* Title */}
            <h2 className={cn(
              'text-3xl md:text-4xl lg:text-5xl font-bold mb-6',
              isArabic ? 'font-arabic text-gradient-gold' : 'heading-display text-white'
            )}>
              {isArabic ? 'من نحن' : 'Qui sommes-nous'}
            </h2>

            {/* Mission Text */}
            <p className={cn(
              'text-lg text-[var(--color-silver)] leading-relaxed mb-8',
              isArabic && 'font-arabic'
            )}>
              {t.about.missionText}
            </p>

            {/* Founded Info */}
            <div className={cn('flex items-center gap-8 mb-8', isArabic && 'flex-row-reverse')}>
              <div className={cn(isArabic && 'text-right')}>
                <p className={cn('text-sm text-[var(--color-gray-light)]', isArabic && 'font-arabic')}>
                  {t.about.foundedYear}
                </p>
                <p className="text-3xl font-bold text-[var(--color-gold)]">
                  {t.about.foundedValue}
                </p>
              </div>
              <div className="w-px h-12 bg-[var(--color-gold)]/30" />
              <div className={cn(isArabic && 'text-right')}>
                <p className={cn('text-sm text-[var(--color-gray-light)]', isArabic && 'font-arabic')}>
                  {t.about.location}
                </p>
                <p className={cn('text-lg text-white', isArabic && 'font-arabic')}>
                  {isArabic ? 'سيدي البرنوصي، الدار البيضاء' : 'Sidi Bernoussi, Casablanca'}
                </p>
              </div>
            </div>

            {/* Learn More Link */}
            <Link href="/about">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'inline-flex items-center gap-3 btn-outline',
                  isArabic && 'flex-row-reverse font-arabic'
                )}
              >
                {t.common.learnMore}
                <Arrow className="w-5 h-5" />
              </motion.span>
            </Link>
          </motion.div>

          {/* Pillars Cards */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={cn('space-y-6', isArabic && 'lg:col-start-1')}
          >
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: isArabic ? -10 : 10 }}
                className={cn(
                  'group flex items-start gap-6 p-6 rounded-lg glass border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/30 transition-all',
                  isArabic && 'flex-row-reverse'
                )}
              >
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${pillar.color}20` }}
                >
                  <pillar.icon className="w-8 h-8" style={{ color: pillar.color }} />
                </div>
                <div className={cn(isArabic && 'text-right')}>
                  <h3 className={cn(
                    'text-xl font-bold text-white mb-2',
                    isArabic && 'font-arabic'
                  )}>
                    {pillar.title}
                  </h3>
                  <p className={cn(
                    'text-[var(--color-silver)]',
                    isArabic && 'font-arabic'
                  )}>
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
