'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Theater, Calendar, Award, Users, Play, Sparkles,
  ArrowRight, ArrowLeft, ChevronDown
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const productions = [
  {
    id: 1,
    titleAr: 'صمت الكلام',
    titleFr: 'Le Silence des Mots',
    year: 2023,
    genreAr: 'دراما',
    genreFr: 'Drame',
    synopsisAr: 'مسرحية تتناول قضايا الصمت والتعبير في المجتمع المعاصر',
    synopsisFr: 'Une piece qui traite les questions du silence et de l\'expression dans la societe contemporaine',
    duration: 90,
    cast: 8,
  },
  {
    id: 2,
    titleAr: 'ذاكرة الأجداد',
    titleFr: 'Memoire des Ancetres',
    year: 2022,
    genreAr: 'تراثي',
    genreFr: 'Patrimoine',
    synopsisAr: 'رحلة في ذاكرة المغرب عبر حكايات الأجداد',
    synopsisFr: 'Un voyage dans la memoire du Maroc a travers les recits des ancetres',
    duration: 75,
    cast: 6,
  },
  {
    id: 3,
    titleAr: 'ضحكات مرة',
    titleFr: 'Rires Amers',
    year: 2021,
    genreAr: 'كوميديا سوداء',
    genreFr: 'Comedie noire',
    synopsisAr: 'كوميديا ساخرة تعالج قضايا اجتماعية بأسلوب فكاهي',
    synopsisFr: 'Une comedie satirique traitant des questions sociales avec humour',
    duration: 80,
    cast: 5,
  },
];

const festivals = [
  {
    nameAr: 'المهرجان الوطني للمسرح بمكناس',
    nameFr: 'Festival National du Theatre de Meknes',
    year: 2023,
    awardAr: 'جائزة أفضل عرض متكامل',
    awardFr: 'Prix du meilleur spectacle integre',
  },
  {
    nameAr: 'مهرجان الدار البيضاء للمسرح',
    nameFr: 'Festival de Theatre de Casablanca',
    year: 2022,
    awardAr: 'جائزة أفضل ممثل',
    awardFr: 'Prix du meilleur acteur',
  },
  {
    nameAr: 'ملتقى المسرح المغاربي',
    nameFr: 'Rencontre du Theatre Maghrebin',
    year: 2022,
    awardAr: 'شهادة تقديرية',
    awardFr: 'Certificat d\'appreciation',
  },
];

const workshops = [
  {
    titleAr: 'ورشة التمثيل',
    titleFr: 'Atelier d\'interpretation',
    descAr: 'تعلم أساسيات التمثيل المسرحي والتعبير الجسدي',
    descFr: 'Apprenez les bases du jeu theatral et de l\'expression corporelle',
    durationAr: '3 أشهر',
    durationFr: '3 mois',
    level: { ar: 'مبتدئ', fr: 'Debutant' },
  },
  {
    titleAr: 'ورشة الارتجال',
    titleFr: 'Atelier d\'improvisation',
    descAr: 'تطوير مهارات الارتجال والإبداع اللحظي',
    descFr: 'Developpez vos competences en improvisation et creativite spontanee',
    durationAr: '6 أسابيع',
    durationFr: '6 semaines',
    level: { ar: 'متوسط', fr: 'Intermediaire' },
  },
  {
    titleAr: 'ورشة الإخراج المسرحي',
    titleFr: 'Atelier de mise en scene',
    descAr: 'أساسيات الإخراج المسرحي وإدارة الفريق الفني',
    descFr: 'Les bases de la mise en scene et la gestion de l\'equipe artistique',
    durationAr: '4 أشهر',
    durationFr: '4 mois',
    level: { ar: 'متقدم', fr: 'Avance' },
  },
];

export default function TheatrePage() {
  const { t, isArabic } = useLanguage();
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  const heroRef = React.useRef(null);
  const productionsRef = React.useRef(null);
  const schoolRef = React.useRef(null);
  const festivalsRef = React.useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isProductionsInView = useInView(productionsRef, { once: true, margin: '-100px' });
  const isSchoolInView = useInView(schoolRef, { once: true, margin: '-100px' });
  const isFestivalsInView = useInView(festivalsRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-32 bg-curtain overflow-hidden">
        <div className="absolute inset-0 bg-spotlight" />
        <div className="absolute inset-0 film-grain" />

        {/* Stage curtain effect */}
        <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[var(--color-curtain-dark)] to-transparent" />
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[var(--color-curtain-dark)] to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn('text-center', isArabic && 'font-arabic')}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isHeroInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, type: 'spring' }}
              className="inline-block mb-8"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[var(--color-crimson)] to-[var(--color-red-primary)] flex items-center justify-center">
                <Theater className="w-12 h-12 text-[var(--color-gold)]" />
              </div>
            </motion.div>

            <h1 className={cn(
              'text-5xl md:text-6xl lg:text-7xl font-bold mb-6',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {t.theatre.title}
            </h1>

            <p className="text-xl md:text-2xl text-[var(--color-champagne)] max-w-2xl mx-auto mb-4">
              {t.theatre.troupe}
            </p>
            <p className="text-lg text-[var(--color-silver)] max-w-xl mx-auto">
              {t.theatre.troupeDesc}
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-[var(--color-gold)]" />
        </motion.div>
      </section>

      {/* Productions Section */}
      <section ref={productionsRef} className="py-20 bg-[var(--color-black-soft)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isProductionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn('text-center mb-16', isArabic && 'font-arabic')}
          >
            <h2 className={cn(
              'text-3xl md:text-4xl font-bold mb-4',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {t.theatre.productions}
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
              <Play className="w-6 h-6 text-[var(--color-gold)]" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productions.map((prod, index) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isProductionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group card-cinematic overflow-hidden"
              >
                {/* Poster placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-[var(--color-curtain)] via-[var(--color-crimson)]/50 to-[var(--color-black-pure)] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Theater className="w-20 h-20 text-[var(--color-gold)]/20" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-pure)] to-transparent" />

                  {/* Year badge */}
                  <div className={cn(
                    'absolute top-4 px-3 py-1 bg-[var(--color-gold)] text-[var(--color-black-rich)] text-sm font-bold rounded',
                    isArabic ? 'right-4' : 'left-4'
                  )}>
                    {prod.year}
                  </div>

                  {/* Hover play button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-[var(--color-gold)]/90 flex items-center justify-center">
                      <Play className="w-8 h-8 text-[var(--color-black-rich)]" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={cn('p-6', isArabic && 'text-right')}>
                  <div className={cn('flex items-center gap-2 mb-2', isArabic && 'flex-row-reverse')}>
                    <span className="px-2 py-1 text-xs rounded bg-[var(--color-crimson)]/20 text-[var(--color-crimson)]">
                      {isArabic ? prod.genreAr : prod.genreFr}
                    </span>
                    <span className="text-sm text-[var(--color-gray-light)]">
                      {prod.duration} min
                    </span>
                  </div>

                  <h3 className={cn('text-xl font-bold text-white mb-2', isArabic && 'font-arabic')}>
                    {isArabic ? prod.titleAr : prod.titleFr}
                  </h3>

                  <p className={cn('text-[var(--color-silver)] text-sm mb-4 line-clamp-2', isArabic && 'font-arabic')}>
                    {isArabic ? prod.synopsisAr : prod.synopsisFr}
                  </p>

                  <div className={cn('flex items-center gap-2 text-sm text-[var(--color-gray-light)]', isArabic && 'flex-row-reverse')}>
                    <Users className="w-4 h-4" />
                    <span>{prod.cast} {isArabic ? 'ممثلين' : 'acteurs'}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Theatre School Section */}
      <section ref={schoolRef} className="py-20 bg-[var(--color-black-rich)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isSchoolInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn('text-center mb-16', isArabic && 'font-arabic')}
          >
            <h2 className={cn(
              'text-3xl md:text-4xl font-bold mb-4',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {t.theatre.school}
            </h2>
            <p className="text-[var(--color-silver)] max-w-2xl mx-auto">
              {t.theatre.workshops}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workshops.map((workshop, index) => (
              <motion.div
                key={workshop.titleFr}
                initial={{ opacity: 0, y: 30 }}
                animate={isSchoolInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={cn(
                  'p-8 rounded-lg glass border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/30 transition-all',
                  isArabic && 'text-right'
                )}
              >
                <div className={cn('flex items-center justify-between mb-4', isArabic && 'flex-row-reverse')}>
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-crimson)]/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[var(--color-crimson)]" />
                  </div>
                  <span className="px-3 py-1 text-xs rounded bg-[var(--color-gold)]/20 text-[var(--color-gold)]">
                    {isArabic ? workshop.level.ar : workshop.level.fr}
                  </span>
                </div>

                <h3 className={cn('text-xl font-bold text-white mb-2', isArabic && 'font-arabic')}>
                  {isArabic ? workshop.titleAr : workshop.titleFr}
                </h3>

                <p className={cn('text-[var(--color-silver)] mb-4', isArabic && 'font-arabic')}>
                  {isArabic ? workshop.descAr : workshop.descFr}
                </p>

                <div className={cn('flex items-center gap-2 text-sm text-[var(--color-gray-light)] mb-6', isArabic && 'flex-row-reverse')}>
                  <Calendar className="w-4 h-4" />
                  <span>{isArabic ? workshop.durationAr : workshop.durationFr}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'w-full btn-outline flex items-center justify-center gap-2',
                    isArabic && 'flex-row-reverse font-arabic'
                  )}
                >
                  {t.theatre.register}
                  <Arrow className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Festivals Section */}
      <section ref={festivalsRef} className="py-20 bg-[var(--color-charcoal)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFestivalsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn('text-center mb-16', isArabic && 'font-arabic')}
          >
            <h2 className={cn(
              'text-3xl md:text-4xl font-bold mb-4',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {t.theatre.festivals}
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
              <Award className="w-6 h-6 text-[var(--color-gold)]" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
            </div>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {festivals.map((festival, index) => (
              <motion.div
                key={festival.nameFr}
                initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
                animate={isFestivalsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  'flex items-center gap-6 p-6 rounded-lg glass border border-[var(--color-gold)]/10',
                  isArabic && 'flex-row-reverse'
                )}
              >
                {/* Year */}
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-gold-dark)] to-[var(--color-gold)] flex items-center justify-center">
                  <span className="text-xl font-bold text-[var(--color-black-rich)]">{festival.year}</span>
                </div>

                {/* Details */}
                <div className={cn('flex-1', isArabic && 'text-right')}>
                  <h3 className={cn('text-lg font-bold text-white mb-1', isArabic && 'font-arabic')}>
                    {isArabic ? festival.nameAr : festival.nameFr}
                  </h3>
                  <div className={cn('flex items-center gap-2 text-[var(--color-gold)]', isArabic && 'flex-row-reverse')}>
                    <Award className="w-4 h-4" />
                    <span className={cn(isArabic && 'font-arabic')}>
                      {isArabic ? festival.awardAr : festival.awardFr}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
