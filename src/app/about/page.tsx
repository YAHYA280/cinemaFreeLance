'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Calendar, MapPin, Users, FileText, Download,
  GraduationCap, BookOpen, MessageSquare, Star,
  ArrowLeft, ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const boardMembers = [
  {
    nameAr: 'محمد العربي',
    nameFr: 'Mohamed Larbi',
    roleAr: 'الرئيس',
    roleFr: 'President',
  },
  {
    nameAr: 'فاطمة الزهراء',
    nameFr: 'Fatima Zahra',
    roleAr: 'نائب الرئيس',
    roleFr: 'Vice-President',
  },
  {
    nameAr: 'أحمد بنعلي',
    nameFr: 'Ahmed Benali',
    roleAr: 'المدير الفني',
    roleFr: 'Directeur Artistique',
  },
  {
    nameAr: 'خديجة المنصوري',
    nameFr: 'Khadija Mansouri',
    roleAr: 'أمين المال',
    roleFr: 'Tresoriere',
  },
  {
    nameAr: 'يوسف الإدريسي',
    nameFr: 'Youssef Idrissi',
    roleAr: 'مسؤول العلاقات العامة',
    roleFr: 'Responsable Relations Publiques',
  },
  {
    nameAr: 'سعاد بركات',
    nameFr: 'Souad Barakat',
    roleAr: 'الكاتبة العامة',
    roleFr: 'Secretaire Generale',
  },
];

const timeline = [
  {
    year: '2017',
    titleAr: 'تأسيس الجمعية',
    titleFr: 'Fondation de l\'association',
    descAr: 'انطلاق جمعية الكرامة للمسرح والسينما بسيدي البرنوصي',
    descFr: 'Lancement de l\'association Al-Karama a Sidi Bernoussi',
  },
  {
    year: '2018',
    titleAr: 'أول إنتاج مسرحي',
    titleFr: 'Premiere production theatrale',
    descAr: 'عرض أول مسرحية من إنتاج فرقة الكرامة',
    descFr: 'Premiere piece de theatre produite par la troupe Al-Karama',
  },
  {
    year: '2020',
    titleAr: 'إطلاق برنامج التكوين',
    titleFr: 'Lancement du programme de formation',
    descAr: 'بداية ورشات التكوين في فنون المسرح والسينما',
    descFr: 'Debut des ateliers de formation aux arts du theatre et du cinema',
  },
  {
    year: '2023',
    titleAr: 'شراكة مع المركز السينمائي',
    titleFr: 'Partenariat avec le CCM',
    descAr: 'توقيع اتفاقية شراكة مع المركز السينمائي المغربي',
    descFr: 'Signature d\'un accord de partenariat avec le CCM',
  },
  {
    year: '2024',
    titleAr: 'افتتاح النادي السينمائي',
    titleFr: 'Inauguration du Cine-Club',
    descAr: 'افتتاح نادي البرنوصي السينمائي بعرض فيلم بامو',
    descFr: 'Inauguration du Cine-Club Bernoussi avec le film Bamo',
  },
];

const documents = [
  {
    titleAr: 'النظام الأساسي المعدل',
    titleFr: 'Statuts Amendés',
    type: 'PDF',
  },
  {
    titleAr: 'التقرير المالي 2023',
    titleFr: 'Rapport Financier 2023',
    type: 'PDF',
  },
  {
    titleAr: 'التقرير الأدبي 2023',
    titleFr: 'Rapport Moral 2023',
    type: 'PDF',
  },
];

export default function AboutPage() {
  const { t, isArabic } = useLanguage();
  const heroRef = React.useRef(null);
  const missionRef = React.useRef(null);
  const timelineRef = React.useRef(null);
  const boardRef = React.useRef(null);
  const docsRef = React.useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isMissionInView = useInView(missionRef, { once: true, margin: '-100px' });
  const isTimelineInView = useInView(timelineRef, { once: true, margin: '-100px' });
  const isBoardInView = useInView(boardRef, { once: true, margin: '-100px' });
  const isDocsInView = useInView(docsRef, { once: true, margin: '-100px' });

  const pillars = [
    { icon: GraduationCap, ...t.about.pillars.formation, color: 'var(--color-crimson)' },
    { icon: BookOpen, ...t.about.pillars.memory, color: 'var(--color-gold)' },
    { icon: MessageSquare, ...t.about.pillars.critique, color: 'var(--color-teal)' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-24 bg-curtain overflow-hidden">
        <div className="absolute inset-0 bg-spotlight" />
        <div className="absolute inset-0 film-grain" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn('text-center', isArabic && 'font-arabic')}
          >
            {/* Stars decoration */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <Star className="w-5 h-5 text-[var(--color-gold)]" fill="currentColor" />
              <Star className="w-4 h-4 text-[var(--color-gold)]" fill="currentColor" />
              <Star className="w-3 h-3 text-[var(--color-gold)]" fill="currentColor" />
            </div>

            <h1 className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-bold mb-6',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {t.about.title}
            </h1>

            <p className="text-xl text-[var(--color-champagne)] max-w-2xl mx-auto">
              {isArabic
                ? 'تعرف على قصتنا ورؤيتنا وفريقنا'
                : 'Decouvrez notre histoire, notre vision et notre equipe'}
            </p>
          </motion.div>
        </div>

        {/* Corner ornaments */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[var(--color-gold)]/30" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[var(--color-gold)]/30" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[var(--color-gold)]/30" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[var(--color-gold)]/30" />
      </section>

      {/* Identity Card Section */}
      <section ref={missionRef} className="py-20 bg-[var(--color-black-soft)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Identity Card */}
            <motion.div
              initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className={cn(isArabic && 'lg:order-2')}
            >
              <div className="card-cinematic p-8">
                <h2 className={cn(
                  'text-2xl font-bold text-[var(--color-gold)] mb-8',
                  isArabic && 'font-arabic text-right'
                )}>
                  {t.about.identity}
                </h2>

                <div className="space-y-6">
                  {/* Founded Year */}
                  <div className={cn('flex items-center gap-4', isArabic && 'flex-row-reverse')}>
                    <div className="w-12 h-12 rounded-full bg-[var(--color-crimson)]/20 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-[var(--color-crimson)]" />
                    </div>
                    <div className={cn(isArabic && 'text-right')}>
                      <p className={cn('text-sm text-[var(--color-gray-light)]', isArabic && 'font-arabic')}>
                        {t.about.foundedYear}
                      </p>
                      <p className="text-2xl font-bold text-white">2017</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className={cn('flex items-center gap-4', isArabic && 'flex-row-reverse')}>
                    <div className="w-12 h-12 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[var(--color-gold)]" />
                    </div>
                    <div className={cn(isArabic && 'text-right')}>
                      <p className={cn('text-sm text-[var(--color-gray-light)]', isArabic && 'font-arabic')}>
                        {t.about.location}
                      </p>
                      <p className={cn('text-lg text-white', isArabic && 'font-arabic')}>
                        {t.about.locationValue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, x: isArabic ? -50 : 50 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={cn(isArabic && 'lg:order-1 text-right')}
            >
              <h2 className={cn(
                'text-2xl font-bold text-[var(--color-gold)] mb-6',
                isArabic && 'font-arabic'
              )}>
                {t.about.mission}
              </h2>

              <p className={cn(
                'text-lg text-[var(--color-silver)] leading-relaxed mb-8',
                isArabic && 'font-arabic'
              )}>
                {t.about.missionText}
              </p>

              {/* Pillars */}
              <div className="space-y-4">
                {pillars.map((pillar, index) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-lg glass border border-[var(--color-gold)]/10',
                      isArabic && 'flex-row-reverse'
                    )}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${pillar.color}20` }}
                    >
                      <pillar.icon className="w-5 h-5" style={{ color: pillar.color }} />
                    </div>
                    <div className={cn(isArabic && 'text-right')}>
                      <h3 className={cn('font-bold text-white', isArabic && 'font-arabic')}>
                        {pillar.title}
                      </h3>
                      <p className={cn('text-sm text-[var(--color-silver)]', isArabic && 'font-arabic')}>
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 bg-[var(--color-black-rich)]">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn(
              'text-3xl md:text-4xl font-bold text-center mb-16',
              isArabic ? 'font-arabic text-gradient-gold' : 'heading-display text-white'
            )}
          >
            {isArabic ? 'مسيرتنا' : 'Notre Parcours'}
          </motion.h2>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color-gold)] to-transparent hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={cn(
                    'relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center',
                    index % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse'
                  )}
                >
                  {/* Content */}
                  <div className={cn(
                    'p-6 rounded-lg glass border border-[var(--color-gold)]/10',
                    index % 2 === 0 ? 'md:order-1' : 'md:order-2',
                    isArabic && 'text-right'
                  )}>
                    <span className="text-3xl font-bold text-[var(--color-gold)]">{item.year}</span>
                    <h3 className={cn('text-xl font-bold text-white mt-2', isArabic && 'font-arabic')}>
                      {isArabic ? item.titleAr : item.titleFr}
                    </h3>
                    <p className={cn('text-[var(--color-silver)] mt-2', isArabic && 'font-arabic')}>
                      {isArabic ? item.descAr : item.descFr}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className={cn(
                    'hidden md:flex items-center justify-center',
                    index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                  )}>
                    <div className="w-4 h-4 rounded-full bg-[var(--color-gold)] shadow-lg" style={{ boxShadow: '0 0 20px var(--color-gold)' }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section ref={boardRef} className="py-20 bg-[var(--color-charcoal)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isBoardInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn('text-center mb-16', isArabic && 'font-arabic')}
          >
            <h2 className={cn(
              'text-3xl md:text-4xl font-bold mb-4',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {t.about.board}
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
              <Users className="w-6 h-6 text-[var(--color-gold)]" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardMembers.map((member, index) => (
              <motion.div
                key={member.nameFr}
                initial={{ opacity: 0, y: 30 }}
                animate={isBoardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group card-cinematic p-6 text-center"
              >
                {/* Avatar placeholder */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-crimson)] to-[var(--color-curtain)] flex items-center justify-center">
                  <span className="text-3xl font-bold text-[var(--color-gold)]">
                    {(isArabic ? member.nameAr : member.nameFr).charAt(0)}
                  </span>
                </div>
                <h3 className={cn('text-lg font-bold text-white', isArabic && 'font-arabic')}>
                  {isArabic ? member.nameAr : member.nameFr}
                </h3>
                <p className={cn('text-[var(--color-gold)] text-sm', isArabic && 'font-arabic')}>
                  {isArabic ? member.roleAr : member.roleFr}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section ref={docsRef} className="py-20 bg-[var(--color-black-rich)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isDocsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn('text-center mb-12', isArabic && 'font-arabic')}
          >
            <h2 className={cn(
              'text-3xl md:text-4xl font-bold mb-4',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {t.about.documents}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.titleFr}
                initial={{ opacity: 0, y: 20 }}
                animate={isDocsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  'group flex items-center gap-4 p-6 rounded-lg glass border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/30 cursor-pointer transition-all',
                  isArabic && 'flex-row-reverse'
                )}
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--color-crimson)]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-crimson)]/30 transition-colors">
                  <FileText className="w-6 h-6 text-[var(--color-crimson)]" />
                </div>
                <div className={cn('flex-1', isArabic && 'text-right')}>
                  <h3 className={cn('font-medium text-white', isArabic && 'font-arabic')}>
                    {isArabic ? doc.titleAr : doc.titleFr}
                  </h3>
                  <p className="text-sm text-[var(--color-gray-light)]">{doc.type}</p>
                </div>
                <Download className="w-5 h-5 text-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
