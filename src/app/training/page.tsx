'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap, Users, BookOpen, School, Camera,
  Edit3, Film, Award, ArrowRight, ArrowLeft, Calendar
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const programs = [
  {
    id: 'trainers',
    icon: GraduationCap,
    titleAr: 'تكوين المكونين',
    titleFr: 'Formation des Formateurs',
    descAr: 'برنامج متخصص لتأهيل الأطر التربوية في مجال التربية على الفنون السمعية البصرية',
    descFr: 'Programme specialise pour qualifier les cadres educatifs dans le domaine de l\'education aux arts audiovisuels',
    durationAr: '6 أشهر',
    durationFr: '6 mois',
    targetAr: 'المعلمين والمربين',
    targetFr: 'Enseignants et educateurs',
    modules: [
      { ar: 'مدخل إلى السينما', fr: 'Introduction au cinema' },
      { ar: 'تحليل الفيلم', fr: 'Analyse filmique' },
      { ar: 'منهجيات التعليم', fr: 'Methodologies d\'enseignement' },
      { ar: 'إنتاج المحتوى', fr: 'Production de contenu' },
    ],
    color: 'var(--color-crimson)',
  },
  {
    id: 'professions',
    icon: Camera,
    titleAr: 'مهن السينما',
    titleFr: 'Metiers du Cinema',
    descAr: 'ورشات تكوينية في كتابة السيناريو، المونتاج، والإخراج للشباب',
    descFr: 'Ateliers de formation en ecriture de scenario, montage et realisation pour les jeunes',
    durationAr: '4 أشهر',
    durationFr: '4 mois',
    targetAr: 'الشباب من 16 إلى 30 سنة',
    targetFr: 'Jeunes de 16 a 30 ans',
    modules: [
      { ar: 'كتابة السيناريو', fr: 'Ecriture de scenario' },
      { ar: 'التصوير السينمائي', fr: 'Prise de vue cinematographique' },
      { ar: 'المونتاج', fr: 'Montage' },
      { ar: 'الإخراج', fr: 'Realisation' },
    ],
    color: 'var(--color-gold)',
  },
  {
    id: 'clubs',
    icon: School,
    titleAr: 'الأندية المدرسية',
    titleFr: 'Clubs Scolaires',
    descAr: 'مرافقة المؤسسات التعليمية في إنشاء وتأطير الأندية السينمائية',
    descFr: 'Accompagnement des etablissements scolaires dans la creation et l\'encadrement de cine-clubs',
    durationAr: 'السنة الدراسية',
    durationFr: 'Annee scolaire',
    targetAr: 'المؤسسات التعليمية',
    targetFr: 'Etablissements scolaires',
    modules: [
      { ar: 'إنشاء النادي', fr: 'Creation du club' },
      { ar: 'برمجة العروض', fr: 'Programmation des projections' },
      { ar: 'تأطير النقاشات', fr: 'Animation des debats' },
      { ar: 'إنتاج الأفلام القصيرة', fr: 'Production de courts-metrages' },
    ],
    color: 'var(--color-teal)',
  },
];

const workshops = [
  {
    icon: Edit3,
    titleAr: 'كتابة السيناريو',
    titleFr: 'Ecriture de Scenario',
    descAr: 'من الفكرة إلى النص المكتمل',
    descFr: 'De l\'idee au texte finalise',
  },
  {
    icon: Camera,
    titleAr: 'التصوير',
    titleFr: 'Prise de Vue',
    descAr: 'تقنيات الكاميرا والإضاءة',
    descFr: 'Techniques de camera et d\'eclairage',
  },
  {
    icon: Film,
    titleAr: 'المونتاج',
    titleFr: 'Montage',
    descAr: 'برامج المونتاج الاحترافية',
    descFr: 'Logiciels de montage professionnels',
  },
];

const stats = [
  { value: '200+', labelAr: 'متدرب', labelFr: 'Stagiaires' },
  { value: '15', labelAr: 'نادي مدرسي', labelFr: 'Clubs scolaires' },
  { value: '50+', labelAr: 'مكون', labelFr: 'Formateurs' },
  { value: '30+', labelAr: 'ورشة', labelFr: 'Ateliers' },
];

export default function TrainingPage() {
  const { t, isArabic } = useLanguage();
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  const heroRef = React.useRef(null);
  const programsRef = React.useRef(null);
  const workshopsRef = React.useRef(null);
  const statsRef = React.useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isProgramsInView = useInView(programsRef, { once: true, margin: '-100px' });
  const isWorkshopsInView = useInView(workshopsRef, { once: true, margin: '-100px' });
  const isStatsInView = useInView(statsRef, { once: true, margin: '-100px' });

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
            <motion.div
              initial={{ scale: 0 }}
              animate={isHeroInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, type: 'spring' }}
              className="inline-block mb-8"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[var(--color-gold-dark)] to-[var(--color-gold)] flex items-center justify-center">
                <GraduationCap className="w-12 h-12 text-[var(--color-black-rich)]" />
              </div>
            </motion.div>

            <h1 className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-bold mb-6',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {t.training.title}
            </h1>

            <p className="text-xl text-[var(--color-champagne)] max-w-2xl mx-auto">
              {isArabic
                ? 'نبني جيلاً جديداً من الفنانين والمثقفين'
                : 'Nous formons une nouvelle generation d\'artistes et d\'intellectuels'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 bg-[var(--color-charcoal)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 20 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-[var(--color-gold)] mb-2">
                  {stat.value}
                </p>
                <p className={cn('text-[var(--color-silver)]', isArabic && 'font-arabic')}>
                  {isArabic ? stat.labelAr : stat.labelFr}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section ref={programsRef} className="py-20 bg-[var(--color-black-soft)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isProgramsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn('text-center mb-16', isArabic && 'font-arabic')}
          >
            <h2 className={cn(
              'text-3xl md:text-4xl font-bold mb-4',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {isArabic ? 'برامجنا التكوينية' : 'Nos Programmes'}
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
              <BookOpen className="w-6 h-6 text-[var(--color-gold)]" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
            </div>
          </motion.div>

          <div className="space-y-12">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isProgramsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={cn(
                  'card-cinematic overflow-hidden',
                  index % 2 === 1 && 'lg:flex-row-reverse'
                )}
              >
                <div className={cn(
                  'grid grid-cols-1 lg:grid-cols-3',
                  index % 2 === 1 && 'lg:grid-flow-dense'
                )}>
                  {/* Left: Info */}
                  <div className={cn(
                    'p-8 lg:col-span-2',
                    isArabic && 'text-right',
                    index % 2 === 1 && 'lg:col-start-2'
                  )}>
                    <div className={cn('flex items-center gap-4 mb-6', isArabic && 'flex-row-reverse')}>
                      <div
                        className="w-14 h-14 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${program.color}20` }}
                      >
                        <program.icon className="w-7 h-7" style={{ color: program.color }} />
                      </div>
                      <div>
                        <h3 className={cn('text-2xl font-bold text-white', isArabic && 'font-arabic')}>
                          {isArabic ? program.titleAr : program.titleFr}
                        </h3>
                        <p className={cn('text-sm text-[var(--color-gray-light)]', isArabic && 'font-arabic')}>
                          {isArabic ? program.targetAr : program.targetFr}
                        </p>
                      </div>
                    </div>

                    <p className={cn('text-[var(--color-silver)] mb-6 text-lg', isArabic && 'font-arabic')}>
                      {isArabic ? program.descAr : program.descFr}
                    </p>

                    {/* Duration */}
                    <div className={cn('flex items-center gap-2 mb-6 text-[var(--color-gold)]', isArabic && 'flex-row-reverse')}>
                      <Calendar className="w-5 h-5" />
                      <span className={cn('font-medium', isArabic && 'font-arabic')}>
                        {isArabic ? program.durationAr : program.durationFr}
                      </span>
                    </div>

                    {/* Modules */}
                    <div className={cn('grid grid-cols-2 gap-3 mb-8', isArabic && 'text-right')}>
                      {program.modules.map((module, i) => (
                        <div
                          key={i}
                          className={cn(
                            'flex items-center gap-2 text-sm text-[var(--color-silver)]',
                            isArabic && 'flex-row-reverse'
                          )}
                        >
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: program.color }} />
                          <span className={cn(isArabic && 'font-arabic')}>
                            {isArabic ? module.ar : module.fr}
                          </span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        'btn-outline inline-flex items-center gap-2',
                        isArabic && 'flex-row-reverse font-arabic'
                      )}
                    >
                      {t.training.apply}
                      <Arrow className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Right: Visual */}
                  <div
                    className={cn(
                      'relative h-64 lg:h-auto bg-gradient-to-br flex items-center justify-center',
                      index % 2 === 1 && 'lg:col-start-1'
                    )}
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${program.color}30 0%, var(--color-black-pure) 100%)`
                    }}
                  >
                    <program.icon className="w-32 h-32 opacity-20" style={{ color: program.color }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops Grid */}
      <section ref={workshopsRef} className="py-20 bg-[var(--color-black-rich)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isWorkshopsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn('text-center mb-12', isArabic && 'font-arabic')}
          >
            <h2 className={cn(
              'text-3xl md:text-4xl font-bold mb-4',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {isArabic ? 'ورشات متخصصة' : 'Ateliers Specialises'}
            </h2>
            <p className="text-[var(--color-silver)]">
              {t.training.ageRange}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {workshops.map((workshop, index) => (
              <motion.div
                key={workshop.titleFr}
                initial={{ opacity: 0, y: 20 }}
                animate={isWorkshopsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={cn(
                  'p-8 rounded-lg glass border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/30 text-center transition-all',
                  isArabic && 'font-arabic'
                )}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-crimson)]/20 flex items-center justify-center">
                  <workshop.icon className="w-8 h-8 text-[var(--color-crimson)]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {isArabic ? workshop.titleAr : workshop.titleFr}
                </h3>
                <p className="text-[var(--color-silver)]">
                  {isArabic ? workshop.descAr : workshop.descFr}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--color-crimson)]/20 via-[var(--color-charcoal)] to-[var(--color-gold)]/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={cn(isArabic && 'font-arabic')}
          >
            <Award className="w-16 h-16 mx-auto mb-6 text-[var(--color-gold)]" />
            <h2 className={cn(
              'text-3xl md:text-4xl font-bold mb-4',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {isArabic ? 'ابدأ رحلتك الفنية الآن' : 'Commencez votre parcours artistique'}
            </h2>
            <p className="text-[var(--color-silver)] mb-8 max-w-xl mx-auto">
              {isArabic
                ? 'انضم إلى مجتمع الكرامة وطور مهاراتك في فنون المسرح والسينما'
                : 'Rejoignez la communaute Al-Karama et developpez vos competences en arts du theatre et du cinema'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'btn-gold text-lg px-10 py-4 inline-flex items-center gap-3',
                isArabic && 'flex-row-reverse'
              )}
            >
              {t.training.apply}
              <Arrow className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
