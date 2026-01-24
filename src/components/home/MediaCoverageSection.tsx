'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Newspaper, ArrowRight, ArrowLeft, Film } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export default function MediaCoverageSection() {
  const { t, isArabic } = useLanguage();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  const newsItems = [
    {
      title: t.mediaCoverage.news1Title,
      content: t.mediaCoverage.news1Content,
    },
    {
      title: t.mediaCoverage.news2Title,
      content: t.mediaCoverage.news2Content,
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-[var(--color-black-rich)]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={cn('text-center mb-12', isArabic && 'font-arabic')}
        >
          <h2 className={cn(
            'text-3xl md:text-4xl font-bold mb-4',
            isArabic ? 'text-gradient-gold' : 'heading-display text-white'
          )}>
            {t.mediaCoverage.title}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
            <Newspaper className="w-6 h-6 text-[var(--color-gold)]" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
          </div>
        </motion.div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={cn(
                'group relative overflow-hidden rounded-lg',
                isArabic && 'font-arabic'
              )}
            >
              {/* Card with red left/right border */}
              <div className={cn(
                'bg-[#1a1a1a] p-6 h-full border-2 border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-crimson)]/10',
                isArabic ? 'border-r-[var(--color-crimson)]' : 'border-l-[var(--color-crimson)]'
              )}>
                {/* Placeholder Image */}
                <div className="relative h-40 mb-4 rounded bg-gradient-to-br from-[var(--color-curtain)] to-[var(--color-black-pure)] flex items-center justify-center overflow-hidden">
                  <Film className="w-16 h-16 text-[var(--color-gold)]/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
                </div>

                {/* Title */}
                <h3 className={cn(
                  'text-xl font-bold text-white mb-3 group-hover:text-[var(--color-gold)] transition-colors',
                  isArabic && 'text-right'
                )}>
                  {item.title}
                </h3>

                {/* Content */}
                <p className={cn(
                  'text-[var(--color-gray-light)] text-base leading-relaxed mb-4',
                  isArabic && 'text-right'
                )}>
                  {item.content}
                </p>

                {/* Read More Link */}
                <Link
                  href="/media"
                  className={cn(
                    'inline-flex items-center gap-2 text-[var(--color-crimson)] hover:text-[var(--color-gold)] transition-colors text-sm font-medium',
                    isArabic && 'flex-row-reverse'
                  )}
                >
                  {t.mediaCoverage.readMore}
                  <Arrow className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/media"
            className={cn(
              'btn-outline inline-flex items-center gap-2',
              isArabic && 'flex-row-reverse font-arabic'
            )}
          >
            {t.media.viewAll}
            <Arrow className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
