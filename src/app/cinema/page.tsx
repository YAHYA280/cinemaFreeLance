'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Film, Calendar, Clock, MapPin, Users, Star, Play,
  ChevronLeft, ChevronRight, Filter, Video, GraduationCap, Award
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const screenings = [
  {
    id: 1,
    titleAr: 'فيلم بامو',
    titleFr: 'Film Bamo',
    directorAr: 'محمد مفتكر',
    directorFr: 'Mohamed Mouftakir',
    year: 2023,
    country: { ar: 'المغرب', fr: 'Maroc' },
    genre: { ar: 'دراما', fr: 'Drame' },
    duration: 95,
    date: '2024-02-15',
    time: '19:00',
    discussionWithAr: 'حمادي كيروم',
    discussionWithFr: 'Hamadi Kirom',
    synopsisAr: 'قصة مؤثرة عن الهوية والانتماء في المغرب المعاصر',
    synopsisFr: 'Une histoire touchante sur l\'identite et l\'appartenance dans le Maroc contemporain',
    isOpening: true,
    isPast: false,
  },
  {
    id: 2,
    titleAr: 'أيام الساورة',
    titleFr: 'Les Jours de la Saoura',
    directorAr: 'عبد الله فركوس',
    directorFr: 'Abdallah Ferkous',
    year: 2022,
    country: { ar: 'الجزائر', fr: 'Algerie' },
    genre: { ar: 'وثائقي', fr: 'Documentaire' },
    duration: 88,
    date: '2024-02-22',
    time: '19:00',
    discussionWithAr: 'ناقد سينمائي',
    discussionWithFr: 'Critique de cinema',
    synopsisAr: 'رحلة بصرية في أعماق الصحراء الجزائرية',
    synopsisFr: 'Un voyage visuel dans les profondeurs du Sahara algerien',
    isOpening: false,
    isPast: false,
  },
  {
    id: 3,
    titleAr: 'البحر الأحمر يغوص',
    titleFr: 'La Mer Rouge Plonge',
    directorAr: 'فوزي بنسعيدي',
    directorFr: 'Faouzi Bensaidi',
    year: 2023,
    country: { ar: 'المغرب', fr: 'Maroc' },
    genre: { ar: 'تجريبي', fr: 'Experimental' },
    duration: 102,
    date: '2024-03-01',
    time: '19:00',
    discussionWithAr: 'المخرج',
    discussionWithFr: 'Le realisateur',
    synopsisAr: 'فيلم تجريبي يستكشف حدود السرد السينمائي',
    synopsisFr: 'Un film experimental qui explore les limites du recit cinematographique',
    isOpening: false,
    isPast: false,
  },
  {
    id: 4,
    titleAr: 'وشم العار',
    titleFr: 'Le Tatouage de la Honte',
    directorAr: 'أحمد البوعناني',
    directorFr: 'Ahmed Bouanani',
    year: 1970,
    country: { ar: 'المغرب', fr: 'Maroc' },
    genre: { ar: 'تاريخي', fr: 'Historique' },
    duration: 90,
    date: '2024-03-08',
    time: '19:00',
    discussionWithAr: 'باحث في تاريخ السينما',
    discussionWithFr: 'Chercheur en histoire du cinema',
    synopsisAr: 'كلاسيكية من السينما المغربية عن المقاومة',
    synopsisFr: 'Un classique du cinema marocain sur la resistance',
    isOpening: false,
    isPast: false,
  },
];

const masterclasses = [
  {
    id: 1,
    titleAr: 'لقاء مع حمادي كيروم',
    titleFr: 'Rencontre avec Hamadi Kirom',
    guestAr: 'حمادي كيروم',
    guestFr: 'Hamadi Kirom',
    roleAr: 'ناقد سينمائي',
    roleFr: 'Critique de cinema',
    date: '2024-02-15',
    topicAr: 'قراءة نقدية للسينما المغربية المعاصرة',
    topicFr: 'Lecture critique du cinema marocain contemporain',
  },
  {
    id: 2,
    titleAr: 'ورشة كتابة السيناريو',
    titleFr: 'Atelier d\'ecriture de scenario',
    guestAr: 'سعيد الشرايبي',
    guestFr: 'Said Chraibi',
    roleAr: 'سيناريست ومخرج',
    roleFr: 'Scenariste et realisateur',
    date: '2024-02-29',
    topicAr: 'أساسيات كتابة السيناريو السينمائي',
    topicFr: 'Les bases de l\'ecriture de scenario cinematographique',
  },
];

const months = [
  { ar: 'فبراير 2024', fr: 'Fevrier 2024' },
  { ar: 'مارس 2024', fr: 'Mars 2024' },
  { ar: 'أبريل 2024', fr: 'Avril 2024' },
];

export default function CinemaPage() {
  const { t, isArabic } = useLanguage();
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [filter, setFilter] = useState<'all' | 'upcoming'>('all');

  const heroRef = React.useRef(null);
  const screeningsRef = React.useRef(null);
  const masterclassRef = React.useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isScreeningsInView = useInView(screeningsRef, { once: true, margin: '-100px' });
  const isMasterclassInView = useInView(masterclassRef, { once: true, margin: '-100px' });

  const filteredScreenings = screenings.filter((s) => {
    if (filter === 'upcoming') return !s.isPast;
    return true;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section - Cinema Club */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/Hero/cinema-hero.svg"
            alt="Cinema Hero"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[var(--color-black-rich)]" />
        </div>
        <div className="absolute inset-0 film-grain opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn('text-center', isArabic && 'font-arabic')}
          >
            {/* Opening badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isHeroInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--color-gold-dark)] to-[var(--color-gold)] text-[var(--color-black-rich)] font-bold mb-8"
            >
              <Star className="w-5 h-5" fill="currentColor" />
              <span>{t.cinema.clubSubtitle}</span>
              <Star className="w-5 h-5" fill="currentColor" />
            </motion.div>

            <h1 className={cn(
              'text-5xl md:text-6xl lg:text-7xl font-bold mb-6',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {t.cinema.clubTitle}
            </h1>

            <p className="text-xl md:text-2xl text-[var(--color-champagne)] max-w-3xl mx-auto mb-10">
              {t.cinema.clubDesc}
            </p>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'btn-gold text-lg px-10 py-4 inline-flex items-center gap-3',
                isArabic && 'flex-row-reverse'
              )}
            >
              <Play className="w-6 h-6" />
              {t.nav.joinClub}
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60L720 30L1440 60V60H0V60Z" fill="var(--color-black-soft)" />
          </svg>
        </div>
      </section>

      {/* Screenings Program Section */}
      <section ref={screeningsRef} className="py-20 bg-[var(--color-black-soft)]">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isScreeningsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn('text-center mb-12', isArabic && 'font-arabic')}
          >
            <h2 className={cn(
              'text-3xl md:text-4xl font-bold mb-4',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {t.cinema.program}
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
              <Film className="w-6 h-6 text-[var(--color-gold)]" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isScreeningsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn('flex flex-wrap items-center justify-center gap-4 mb-12', isArabic && 'flex-row-reverse')}
          >
            {/* Month Selector */}
            <div className={cn('flex items-center gap-2 glass px-4 py-2 rounded-lg', isArabic && 'flex-row-reverse')}>
              <button
                onClick={() => setSelectedMonth(Math.max(0, selectedMonth - 1))}
                className="p-1 hover:text-[var(--color-gold)] transition-colors"
              >
                {isArabic ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
              <span className={cn('text-[var(--color-gold)] font-medium min-w-[140px] text-center', isArabic && 'font-arabic')}>
                {isArabic ? months[selectedMonth].ar : months[selectedMonth].fr}
              </span>
              <button
                onClick={() => setSelectedMonth(Math.min(months.length - 1, selectedMonth + 1))}
                className="p-1 hover:text-[var(--color-gold)] transition-colors"
              >
                {isArabic ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
            </div>

            {/* Filter Buttons */}
            <div className={cn('flex items-center gap-2', isArabic && 'flex-row-reverse')}>
              <Filter className="w-5 h-5 text-[var(--color-gray-light)]" />
              {(['all', 'upcoming'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'px-4 py-2 rounded text-sm transition-all',
                    filter === f
                      ? 'bg-[var(--color-gold)] text-[var(--color-black-rich)]'
                      : 'glass text-[var(--color-silver)] hover:text-white',
                    isArabic && 'font-arabic'
                  )}
                >
                  {f === 'all' && (isArabic ? 'الكل' : 'Tous')}
                  {f === 'upcoming' && (isArabic ? 'القادمة' : 'A venir')}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Screenings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredScreenings.map((screening, index) => (
                <motion.div
                  key={screening.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group card-cinematic overflow-hidden"
                >
                  {/* Poster */}
                  <div className="relative h-64 bg-gradient-to-br from-[var(--color-crimson)] via-[var(--color-curtain)] to-[var(--color-black-pure)] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Film className="w-20 h-20 text-[var(--color-gold)]/20" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-pure)] via-transparent to-transparent" />

                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-[var(--color-gold)]/90 flex items-center justify-center">
                        <Play className="w-8 h-8 text-[var(--color-black-rich)] ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={cn('p-5', isArabic && 'text-right')}>
                    <h3 className={cn('text-xl font-bold text-white mb-1', isArabic && 'font-arabic')}>
                      {isArabic ? screening.titleAr : screening.titleFr}
                    </h3>
                    <p className={cn('text-sm text-[var(--color-gold)] mb-3', isArabic && 'font-arabic')}>
                      {isArabic ? screening.directorAr : screening.directorFr} ({screening.year})
                    </p>

                    <p className={cn('text-sm text-[var(--color-silver)] mb-4 line-clamp-2', isArabic && 'font-arabic')}>
                      {isArabic ? screening.synopsisAr : screening.synopsisFr}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className={cn('flex items-center gap-2 text-sm text-[var(--color-gray-light)]', isArabic && 'flex-row-reverse')}>
                        <Calendar className="w-4 h-4 text-[var(--color-crimson)]" />
                        <span>{new Date(screening.date).toLocaleDateString(isArabic ? 'ar-MA' : 'fr-FR')}</span>
                      </div>
                      <div className={cn('flex items-center gap-2 text-sm text-[var(--color-gray-light)]', isArabic && 'flex-row-reverse')}>
                        <Clock className="w-4 h-4 text-[var(--color-crimson)]" />
                        <span>{screening.time} ({screening.duration} min)</span>
                      </div>
                      <div className={cn('flex items-center gap-2 text-sm text-[var(--color-gray-light)]', isArabic && 'flex-row-reverse font-arabic')}>
                        <Users className="w-4 h-4 text-[var(--color-crimson)]" />
                        <span>{t.cinema.discussionWith}: {isArabic ? screening.discussionWithAr : screening.discussionWithFr}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn('w-full btn-primary', isArabic && 'font-arabic')}
                    >
                      {t.cinema.registerAttendance}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Masterclass Section */}
      <section ref={masterclassRef} className="py-20 bg-[var(--color-black-rich)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isMasterclassInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn('text-center mb-12', isArabic && 'font-arabic')}
          >
            <h2 className={cn(
              'text-3xl md:text-4xl font-bold mb-4',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {t.cinema.masterclass}
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
              <Video className="w-6 h-6 text-[var(--color-gold)]" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {masterclasses.map((mc, index) => (
              <motion.div
                key={mc.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isMasterclassInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  'group card-cinematic p-8 flex gap-6',
                  isArabic && 'flex-row-reverse text-right'
                )}
              >
                {/* Guest Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-gold-dark)] to-[var(--color-gold)] flex items-center justify-center">
                    <span className="text-2xl font-bold text-[var(--color-black-rich)]">
                      {(isArabic ? mc.guestAr : mc.guestFr).charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className={cn('text-xl font-bold text-white mb-2', isArabic && 'font-arabic')}>
                    {isArabic ? mc.titleAr : mc.titleFr}
                  </h3>
                  <p className={cn('text-[var(--color-gold)] font-medium', isArabic && 'font-arabic')}>
                    {isArabic ? mc.guestAr : mc.guestFr}
                  </p>
                  <p className={cn('text-sm text-[var(--color-gray-light)] mb-3', isArabic && 'font-arabic')}>
                    {isArabic ? mc.roleAr : mc.roleFr}
                  </p>
                  <p className={cn('text-[var(--color-silver)] mb-4', isArabic && 'font-arabic')}>
                    {isArabic ? mc.topicAr : mc.topicFr}
                  </p>
                  <div className={cn('flex items-center gap-2 text-sm text-[var(--color-gray-light)]', isArabic && 'flex-row-reverse')}>
                    <Calendar className="w-4 h-4 text-[var(--color-crimson)]" />
                    <span>{new Date(mc.date).toLocaleDateString(isArabic ? 'ar-MA' : 'fr-FR')}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Youth Training Section */}
      <section className="py-20 bg-[var(--color-black-soft)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={cn('text-center mb-12', isArabic && 'font-arabic')}
          >
            <h2 className={cn(
              'text-3xl md:text-4xl font-bold mb-2',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {t.cinema.youthTraining}
            </h2>
            <p className="text-xl text-[var(--color-gold)]">
              {t.cinema.youthTrainingSubtitle}
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
              <GraduationCap className="w-6 h-6 text-[var(--color-gold)]" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Training Programs Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={cn(
                'p-8 rounded-lg glass border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/30 text-center transition-all',
                isArabic && 'font-arabic'
              )}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-crimson)]/20 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-[var(--color-crimson)]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t.cinema.trainingPrograms}
              </h3>
              <p className="text-[var(--color-silver)]">
                {t.cinema.trainingProgramsDesc}
              </p>
            </motion.div>

            {/* Practical Workshops Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={cn(
                'p-8 rounded-lg glass border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/30 text-center transition-all',
                isArabic && 'font-arabic'
              )}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center">
                <Film className="w-8 h-8 text-[var(--color-gold)]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t.cinema.practicalWorkshops}
              </h3>
              <p className="text-[var(--color-silver)]">
                {t.cinema.practicalWorkshopsDesc}
              </p>
            </motion.div>

            {/* Student Projects Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={cn(
                'p-8 rounded-lg glass border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/30 text-center transition-all',
                isArabic && 'font-arabic'
              )}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-teal)]/20 flex items-center justify-center">
                <Award className="w-8 h-8 text-[var(--color-teal)]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t.cinema.studentProjects}
              </h3>
              <p className="text-[var(--color-silver)]">
                {t.cinema.studentProjectsDesc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Banner */}
      <section className="py-12 bg-[var(--color-charcoal)]">
        <div className="container mx-auto px-4">
          <div className={cn(
            'flex items-center justify-center gap-4 px-8 py-6 rounded-lg glass border border-[var(--color-gold)]/20',
            isArabic && 'flex-row-reverse font-arabic'
          )}>
            <MapPin className="w-8 h-8 text-[var(--color-crimson)]" />
            <div className={cn(isArabic && 'text-right')}>
              <p className="text-sm text-[var(--color-gray-light)]">{t.cinema.venue}</p>
              <p className="text-lg text-white">{t.contact.addressValue}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
