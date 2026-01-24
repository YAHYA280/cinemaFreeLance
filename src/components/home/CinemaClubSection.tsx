'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Film, Calendar, Clock, MapPin, Users, ArrowRight, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const upcomingScreenings = [
  {
    id: 1,
    titleAr: 'فيلم بامو',
    titleFr: 'Film Bamo',
    directorAr: 'محمد مفتكر',
    directorFr: 'Mohamed Mouftakir',
    year: 2023,
    country: { ar: 'المغرب', fr: 'Maroc' },
    date: '2024-02-15',
    time: '19:00',
    discussionWithAr: 'حمادي كيروم',
    discussionWithFr: 'Hamadi Kirom',
    isOpening: true,
  },
  {
    id: 2,
    titleAr: 'أيام الساورة',
    titleFr: 'Les Jours de la Saoura',
    directorAr: 'عبد الله فركوس',
    directorFr: 'Abdallah Ferkous',
    year: 2022,
    country: { ar: 'الجزائر', fr: 'Algerie' },
    date: '2024-02-22',
    time: '19:00',
    discussionWithAr: 'ناقد سينمائي',
    discussionWithFr: 'Critique de cinema',
    isOpening: false,
  },
  {
    id: 3,
    titleAr: 'البحر الأحمر يغوص',
    titleFr: 'La Mer Rouge Plonge',
    directorAr: 'فوزي بنسعيدي',
    directorFr: 'Faouzi Bensaidi',
    year: 2023,
    country: { ar: 'المغرب', fr: 'Maroc' },
    date: '2024-03-01',
    time: '19:00',
    discussionWithAr: 'المخرج',
    discussionWithFr: 'Le realisateur',
    isOpening: false,
  },
];

export default function CinemaClubSection() {
  const { t, isArabic, language } = useLanguage();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  return (
    <section ref={ref} className="relative py-24 bg-[var(--color-black-soft)] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 moroccan-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--color-black-rich)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-black-rich)] to-transparent" />

      {/* Spotlight effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-crimson)]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={cn('text-center mb-16', isArabic && 'font-arabic')}
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-crimson)]/20 border border-[var(--color-crimson)]/50 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-red-bright)] animate-pulse" />
            <span className="text-[var(--color-red-light)] text-sm font-medium">
              {t.cinema.clubSubtitle}
            </span>
          </motion.div>

          <h2 className={cn(
            'text-4xl md:text-5xl lg:text-6xl font-bold mb-4',
            isArabic ? 'text-gradient-gold' : 'heading-display text-white'
          )}>
            {t.cinema.clubTitle}
          </h2>

          <p className="text-xl text-[var(--color-silver)] max-w-2xl mx-auto mb-6">
            {t.cinema.clubDesc}
          </p>

          {/* Club Address */}
          <div className={cn(
            'inline-flex items-start gap-3 px-6 py-4 rounded-lg bg-[var(--color-charcoal)]/50',
            isArabic ? 'flex-row-reverse border-r-4 border-[var(--color-crimson)]' : 'border-l-4 border-[var(--color-crimson)]'
          )}>
            <MapPin className="w-5 h-5 text-[var(--color-gray-light)] mt-1 flex-shrink-0" />
            <div className={cn('text-[var(--color-gray-light)] text-base', isArabic && 'text-right')}>
              <p>{t.clubAddress.line1}</p>
              <p>{t.clubAddress.line2}</p>
              <p>{t.clubAddress.line3}</p>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
            <Film className="w-6 h-6 text-[var(--color-gold)]" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
          </div>
        </motion.div>

        {/* Screenings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {upcomingScreenings.map((screening, index) => (
            <motion.div
              key={screening.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={cn(
                'group relative card-cinematic overflow-hidden',
                screening.isOpening && 'ring-2 ring-[var(--color-gold)] ring-offset-2 ring-offset-[var(--color-black-soft)]'
              )}
            >
              {/* Opening event badge */}
              {screening.isOpening && (
                <div className={cn(
                  'absolute top-4 z-20 px-3 py-1 bg-gradient-to-r from-[var(--color-gold-dark)] to-[var(--color-gold)] rounded text-xs font-bold text-[var(--color-black-rich)]',
                  isArabic ? 'right-4' : 'left-4'
                )}>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    <span>{t.cinema.openingEvent}</span>
                  </div>
                </div>
              )}

              {/* Film Poster Placeholder */}
              <div className="relative h-64 bg-gradient-to-br from-[var(--color-crimson)] via-[var(--color-curtain)] to-[var(--color-black-pure)] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Film className="w-20 h-20 text-[var(--color-gold)]/20" />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-pure)] via-transparent to-transparent opacity-80" />

                {/* Play button on hover */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--color-gold)]/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={cn('w-0 h-0 border-t-8 border-b-8 border-transparent', isArabic ? 'border-r-12 border-r-[var(--color-black-rich)]' : 'border-l-12 border-l-[var(--color-black-rich)]')} style={{ borderLeftWidth: '12px' }} />
                  </div>
                </motion.div>
              </div>

              {/* Card Content */}
              <div className={cn('p-5', isArabic && 'text-right')}>
                <h3 className={cn('text-xl font-bold text-white mb-2', isArabic && 'font-arabic')}>
                  {isArabic ? screening.titleAr : screening.titleFr}
                </h3>

                <p className={cn('text-sm text-[var(--color-silver)] mb-4', isArabic && 'font-arabic')}>
                  {t.cinema.director}: {isArabic ? screening.directorAr : screening.directorFr}
                  <span className="text-[var(--color-gold)]"> | </span>
                  {screening.year}
                  <span className="text-[var(--color-gold)]"> | </span>
                  {isArabic ? screening.country.ar : screening.country.fr}
                </p>

                {/* Screening details */}
                <div className="space-y-2 mb-4">
                  <div className={cn('flex items-center gap-2 text-sm text-[var(--color-gray-light)]', isArabic && 'flex-row-reverse')}>
                    <Calendar className="w-4 h-4 text-[var(--color-crimson)]" />
                    <span>{new Date(screening.date).toLocaleDateString(isArabic ? 'ar-MA' : 'fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className={cn('flex items-center gap-2 text-sm text-[var(--color-gray-light)]', isArabic && 'flex-row-reverse')}>
                    <Clock className="w-4 h-4 text-[var(--color-crimson)]" />
                    <span>{screening.time}</span>
                  </div>
                  <div className={cn('flex items-center gap-2 text-sm text-[var(--color-gray-light)]', isArabic && 'flex-row-reverse font-arabic')}>
                    <Users className="w-4 h-4 text-[var(--color-crimson)]" />
                    <span>{t.cinema.discussionWith}: {isArabic ? screening.discussionWithAr : screening.discussionWithFr}</span>
                  </div>
                </div>

                {/* Register button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'w-full btn-primary flex items-center justify-center gap-2',
                    isArabic && 'flex-row-reverse font-arabic'
                  )}
                >
                  {t.cinema.registerAttendance}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link href="/cinema">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'inline-flex items-center gap-3 text-[var(--color-gold)] hover:text-[var(--color-gold-bright)] transition-colors text-lg',
                isArabic && 'flex-row-reverse font-arabic'
              )}
            >
              {t.cinema.program}
              <Arrow className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>

        {/* Location Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className={cn(
            'flex items-center justify-center gap-4 px-8 py-4 rounded-lg glass border border-[var(--color-gold)]/20',
            isArabic && 'flex-row-reverse font-arabic'
          )}>
            <MapPin className="w-6 h-6 text-[var(--color-crimson)]" />
            <span className="text-[var(--color-silver)]">
              {t.cinema.venue}: {t.contact.addressValue}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
