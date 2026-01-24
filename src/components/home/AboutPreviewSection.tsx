'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Info, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export default function AboutPreviewSection() {
  const { t, isArabic } = useLanguage();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  return (
    <section ref={ref} className="py-16 bg-[var(--color-black-soft)] relative overflow-hidden">
      {/* Subtle spotlight effect */}
      <div className="absolute inset-0 bg-spotlight opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className={cn(
            'card-cinematic p-8 md:p-12 text-center',
            isArabic && 'font-arabic'
          )}>
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center">
              <Info className="w-8 h-8 text-[var(--color-gold)]" />
            </div>

            {/* Title */}
            <h2 className={cn(
              'text-2xl md:text-3xl font-bold mb-4',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {t.aboutPreview.title}
            </h2>

            {/* Content */}
            <p className="text-[var(--color-silver)] text-lg leading-relaxed mb-8">
              {t.aboutPreview.content}
            </p>

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/about"
                className={cn(
                  'btn-outline inline-flex items-center gap-2',
                  isArabic && 'flex-row-reverse'
                )}
              >
                {t.aboutPreview.learnMore}
                <Arrow className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
