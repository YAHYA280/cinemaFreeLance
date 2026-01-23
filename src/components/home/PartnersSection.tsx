'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, GraduationCap, Film, Landmark } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const partners = [
  {
    nameAr: 'وزارة الثقافة والشباب والتواصل',
    nameFr: 'Ministere de la Culture, de la Jeunesse et de la Communication',
    icon: Building2,
    color: 'var(--color-crimson)',
  },
  {
    nameAr: 'وزارة التربية الوطنية',
    nameFr: 'Ministere de l\'Education Nationale',
    icon: GraduationCap,
    color: 'var(--color-gold)',
  },
  {
    nameAr: 'المركز السينمائي المغربي',
    nameFr: 'Centre Cinematographique Marocain',
    icon: Film,
    color: 'var(--color-teal)',
  },
  {
    nameAr: 'السلطات المحلية',
    nameFr: 'Autorites Locales',
    icon: Landmark,
    color: 'var(--color-terracotta)',
  },
];

export default function PartnersSection() {
  const { t, isArabic } = useLanguage();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-20 bg-[var(--color-black-rich)]">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={cn('text-center mb-12', isArabic && 'font-arabic')}
        >
          <h2 className={cn(
            'text-2xl md:text-3xl font-bold mb-2',
            isArabic ? 'text-gradient-gold' : 'heading-display text-white'
          )}>
            {t.partners.title}
          </h2>
          <p className="text-[var(--color-silver)]">
            {t.partners.subtitle}
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.nameFr}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group p-6 rounded-lg glass border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/30 transition-all text-center"
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${partner.color}20` }}
              >
                <partner.icon className="w-8 h-8" style={{ color: partner.color }} />
              </div>
              <h3 className={cn(
                'text-sm font-medium text-[var(--color-silver)] group-hover:text-white transition-colors',
                isArabic && 'font-arabic'
              )}>
                {isArabic ? partner.nameAr : partner.nameFr}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent" />
    </section>
  );
}
