'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Theater, Calendar, Award, Users, Play, Sparkles,
  ArrowRight, ArrowLeft, ChevronDown, X, ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon, ImageIcon, Star
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

// Film Strip Manual Scroll Component with Arrow Navigation
const FilmStripCarousel = ({
  images,
  isArabic,
  titleAr,
  titleFr,
  onImageClick
}: {
  images: string[];
  isArabic: boolean;
  titleAr: string;
  titleFr: string;
  onImageClick: (index: number) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Container is always LTR, so scrollLeft goes from 0 to (scrollWidth - clientWidth)
      setCanScrollPrev(scrollLeft > 10);
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      return () => scrollContainer.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction: 'prev' | 'next') => {
    if (scrollRef.current) {
      const scrollAmount = 340; // Slightly more than one frame width
      // Container is always LTR: prev = go left (negative), next = go right (positive)
      const delta = direction === 'prev' ? -scrollAmount : scrollAmount;
      const startPos = scrollRef.current.scrollLeft;
      const targetPos = startPos + delta;

      // Custom smooth scroll with easing
      const duration = 500; // ms
      const startTime = performance.now();

      const easeOutCubic = (t: number): number => {
        return 1 - Math.pow(1 - t, 3);
      };

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);

        if (scrollRef.current) {
          scrollRef.current.scrollLeft = startPos + (targetPos - startPos) * easedProgress;

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  return (
    <div className="relative group">
      {/* Previous Arrow (Left in LTR, Right in RTL) */}
      <button
        onClick={() => scroll('prev')}
        className={cn(
          'absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[var(--color-gold)] flex items-center justify-center transition-all duration-300 shadow-lg',
          isArabic ? 'right-2' : 'left-2',
          canScrollPrev
            ? 'opacity-90 hover:opacity-100 hover:scale-110 cursor-pointer'
            : 'opacity-30 cursor-not-allowed'
        )}
        disabled={!canScrollPrev}
        aria-label={isArabic ? 'السابق' : 'Previous'}
      >
        {isArabic ? (
          <ChevronRightIcon className="w-6 h-6 text-[var(--color-black-rich)]" />
        ) : (
          <ChevronLeftIcon className="w-6 h-6 text-[var(--color-black-rich)]" />
        )}
      </button>

      {/* Next Arrow (Right in LTR, Left in RTL) */}
      <button
        onClick={() => scroll('next')}
        className={cn(
          'absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[var(--color-gold)] flex items-center justify-center transition-all duration-300 shadow-lg',
          isArabic ? 'left-2' : 'right-2',
          canScrollNext
            ? 'opacity-90 hover:opacity-100 hover:scale-110 cursor-pointer'
            : 'opacity-30 cursor-not-allowed'
        )}
        disabled={!canScrollNext}
        aria-label={isArabic ? 'التالي' : 'Next'}
      >
        {isArabic ? (
          <ChevronLeftIcon className="w-6 h-6 text-[var(--color-black-rich)]" />
        ) : (
          <ChevronRightIcon className="w-6 h-6 text-[var(--color-black-rich)]" />
        )}
      </button>

      {/* Scrollable Container - Always LTR for consistent scroll behavior */}
      <div
        ref={scrollRef}
        dir="ltr"
        className="flex gap-4 overflow-x-auto scrollbar-hide px-8 py-2 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((image, index) => (
          <div
            key={`frame-${index}`}
            className="relative flex-shrink-0 group/frame"
          >
            <div
              className="relative w-[280px] md:w-[320px] bg-[#0d0d0d] p-2 rounded cursor-pointer transition-transform duration-300 hover:scale-105 hover:-translate-y-2"
              onClick={() => onImageClick(index)}
            >
              <div className="absolute inset-0 rounded border-2 border-[#333] pointer-events-none" />

              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={image}
                  alt={`${isArabic ? titleAr : titleFr} - ${index + 1}`}
                  fill
                  className="object-cover transition-all duration-500 group-hover/frame:scale-105 group-hover/frame:brightness-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-60 group-hover/frame:opacity-30 transition-opacity" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/frame:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-[var(--color-gold)]/90 flex items-center justify-center backdrop-blur-sm shadow-lg">
                    <ImageIcon className="w-7 h-7 text-[var(--color-black-rich)]" />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#1a1a1a] border border-[#333] rounded-sm">
                <span className="text-[var(--color-gold)] text-xs font-mono font-bold">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Featured Production - الحُفرة
const featuredProduction = {
  id: 0,
  titleAr: 'الحُفرة',
  titleFr: 'La Fosse',
  year: 2024,
  genreAr: 'دراما',
  genreFr: 'Drame',
  synopsisAr: 'في مكان واحدٍ، خلال يوم واحٍد، حدث أَمْرٌ واحد: أَمَرَ «الرايس» تابِعَه «عبو» أن يحفِر حُفرةً شبيهةً بالتي حفرَها له في حياتِه قصد دفنِه فيها…',
  synopsisFr: 'En un seul lieu, en un seul jour, un seul evenement s\'est produit: "Le Rais" a ordonne a son serviteur "Abbou" de creuser une fosse similaire a celle qu\'il avait creusee pour lui dans sa vie, afin de l\'y enterrer...',
  duration: 60,
  cast: 2,
  images: [
    '/theatre-hofra/photo-1.jpeg',
    '/theatre-hofra/photo-2.jpeg',
    '/theatre-hofra/photo-3.jpeg',
    '/theatre-hofra/photo-4.jpeg',
    '/theatre-hofra/photo-5.jpeg',
    '/theatre-hofra/photo-6.jpeg',
    '/theatre-hofra/photo-7.jpeg',
    '/theatre-hofra/photo-8.jpeg',
    '/theatre-hofra/photo-9.jpeg',
    '/theatre-hofra/photo-10.jpeg',
    '/theatre-hofra/photo-11.jpeg',
    '/theatre-hofra/photo-12.jpeg',
    '/theatre-hofra/photo-13.jpeg',
  ],
};

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const productionsRef = useRef(null);
  const schoolRef = useRef(null);
  const festivalsRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isFeaturedInView = useInView(featuredRef, { once: true, margin: '-100px' });
  const isProductionsInView = useInView(productionsRef, { once: true, margin: '-100px' });
  const isSchoolInView = useInView(schoolRef, { once: true, margin: '-100px' });
  const isFestivalsInView = useInView(festivalsRef, { once: true, margin: '-100px' });

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % featuredProduction.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + featuredProduction.images.length) % featuredProduction.images.length);
  };

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

      {/* Featured Production - الحُفرة */}
      <section ref={featuredRef} className="py-20 bg-gradient-to-b from-[var(--color-crimson)]/10 via-[var(--color-black-soft)] to-[var(--color-black-soft)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn('text-center mb-12', isArabic && 'font-arabic')}
          >
            {/* Featured badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isFeaturedInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--color-gold-dark)] to-[var(--color-gold)] text-[var(--color-black-rich)] font-bold mb-8"
            >
              <Star className="w-5 h-5" fill="currentColor" />
              <span>{isArabic ? 'العرض المميز' : 'Production Vedette'}</span>
              <Star className="w-5 h-5" fill="currentColor" />
            </motion.div>

            <h2 className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-bold mb-4',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {isArabic ? featuredProduction.titleAr : featuredProduction.titleFr}
            </h2>

            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="px-3 py-1 rounded bg-[var(--color-crimson)]/20 text-[var(--color-crimson)] text-sm">
                {isArabic ? featuredProduction.genreAr : featuredProduction.genreFr}
              </span>
              <span className="text-[var(--color-gold)]">{featuredProduction.year}</span>
              <span className="text-[var(--color-silver)]">{featuredProduction.duration} min</span>
            </div>
          </motion.div>

          {/* Featured Content Grid */}
          <div className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-12 items-start',
            isArabic && 'lg:grid-flow-dense'
          )}>
            {/* Synopsis & Info */}
            <motion.div
              initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
              animate={isFeaturedInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={cn(isArabic && 'lg:col-start-2')}
            >
              <div className="card-cinematic p-8">
                <h3 className={cn(
                  'text-2xl font-bold text-[var(--color-gold)] mb-6',
                  isArabic && 'font-arabic text-right'
                )}>
                  {isArabic ? 'عن المسرحية' : 'A propos de la piece'}
                </h3>

                <p className={cn(
                  'text-lg text-[var(--color-silver)] leading-relaxed mb-8',
                  isArabic && 'font-arabic text-right'
                )}>
                  {isArabic ? featuredProduction.synopsisAr : featuredProduction.synopsisFr}
                </p>

                <div className={cn('flex items-center gap-6', isArabic && 'flex-row-reverse justify-end')}>
                  <div className={cn('flex items-center gap-2', isArabic && 'flex-row-reverse')}>
                    <Users className="w-5 h-5 text-[var(--color-crimson)]" />
                    <span className={cn('text-[var(--color-silver)]', isArabic && 'font-arabic')}>
                      {featuredProduction.cast} {isArabic ? 'ممثلين' : 'acteurs'}
                    </span>
                  </div>
                  <div className={cn('flex items-center gap-2', isArabic && 'flex-row-reverse')}>
                    <Calendar className="w-5 h-5 text-[var(--color-gold)]" />
                    <span className="text-[var(--color-silver)]">{featuredProduction.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Featured Image */}
            <motion.div
              initial={{ opacity: 0, x: isArabic ? -50 : 50 }}
              animate={isFeaturedInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={cn(isArabic && 'lg:col-start-1')}
            >
              <div
                className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(0)}
              >
                <Image
                  src={featuredProduction.images[0]}
                  alt={isArabic ? featuredProduction.titleAr : featuredProduction.titleFr}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-20 h-20 rounded-full bg-[var(--color-gold)]/90 flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-[var(--color-black-rich)]" />
                  </div>
                </div>
                <div className={cn(
                  'absolute bottom-4 text-white text-sm bg-black/50 px-3 py-1 rounded',
                  isArabic ? 'right-4 font-arabic' : 'left-4'
                )}>
                  {isArabic ? 'انقر لعرض المعرض' : 'Cliquez pour voir la galerie'}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Photo Gallery - Film Strip Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            {/* Section Header */}
            <div className="flex items-center justify-center gap-6 mb-10">
              <div className="hidden md:flex items-center gap-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-2 h-3 bg-[var(--color-gold)]/40 rounded-sm" />
                ))}
              </div>
              <h3 className={cn(
                'text-2xl md:text-3xl font-bold text-[var(--color-gold)] text-center',
                isArabic && 'font-arabic'
              )}>
                {isArabic ? 'معرض الصور' : 'Galerie Photos'}
              </h3>
              <div className="hidden md:flex items-center gap-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-2 h-3 bg-[var(--color-gold)]/40 rounded-sm" />
                ))}
              </div>
            </div>

            {/* Film Strip Container */}
            <div className="relative">
              {/* Top Sprocket Holes - Fixed */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-[#1a1a1a] z-10 flex items-center">
                <div className="flex justify-between w-full px-2">
                  {[...Array(40)].map((_, i) => (
                    <div key={`top-${i}`} className="w-3 h-3 rounded-sm bg-[#0a0a0a] border border-[#333]" />
                  ))}
                </div>
              </div>

              {/* Bottom Sprocket Holes - Fixed */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#1a1a1a] z-10 flex items-center">
                <div className="flex justify-between w-full px-2">
                  {[...Array(40)].map((_, i) => (
                    <div key={`bottom-${i}`} className="w-3 h-3 rounded-sm bg-[#0a0a0a] border border-[#333]" />
                  ))}
                </div>
              </div>

              {/* Film Strip Background with Infinite Carousel */}
              <div className="bg-gradient-to-b from-[#1a1a1a] via-[#252525] to-[#1a1a1a] py-8">
                <FilmStripCarousel
                  images={featuredProduction.images}
                  isArabic={isArabic}
                  titleAr={featuredProduction.titleAr}
                  titleFr={featuredProduction.titleFr}
                  onImageClick={openLightbox}
                />
              </div>
            </div>

            {/* Instructions & Counter */}
            <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-black-pure)]/50 rounded-full border border-[var(--color-gold)]/20">
                <ChevronLeftIcon className="w-4 h-4 text-[var(--color-gold)]" />
                <span className={cn('text-[var(--color-silver)] text-sm', isArabic && 'font-arabic')}>
                  {isArabic ? 'استخدم الأسهم للتصفح' : 'Use arrows to browse'}
                </span>
                <ChevronRightIcon className="w-4 h-4 text-[var(--color-gold)]" />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-black-pure)]/50 rounded-full border border-[var(--color-gold)]/20">
                <ImageIcon className="w-4 h-4 text-[var(--color-gold)]" />
                <span className={cn('text-[var(--color-silver)] text-sm', isArabic && 'font-arabic')}>
                  {isArabic
                    ? `${featuredProduction.images.length} صورة`
                    : `${featuredProduction.images.length} photos`}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white hover:text-[var(--color-gold)] transition-colors z-50"
            >
              <X size={32} />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 p-3 text-white hover:text-[var(--color-gold)] transition-colors bg-black/50 rounded-full"
            >
              <ChevronLeftIcon size={32} />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 p-3 text-white hover:text-[var(--color-gold)] transition-colors bg-black/50 rounded-full"
            >
              <ChevronRightIcon size={32} />
            </button>

            {/* Image */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={featuredProduction.images[currentImageIndex]}
                alt={`${isArabic ? featuredProduction.titleAr : featuredProduction.titleFr} - ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Caption */}
            <div className={cn(
              'absolute bottom-8 text-white text-center',
              isArabic && 'font-arabic'
            )}>
              <p className="text-xl font-bold text-[var(--color-gold)]">
                {isArabic ? featuredProduction.titleAr : featuredProduction.titleFr}
              </p>
              <p className="text-sm text-[var(--color-gray-light)] mt-2">
                {currentImageIndex + 1} / {featuredProduction.images.length}
              </p>
            </div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-black/70 rounded-lg max-w-full overflow-x-auto">
              {featuredProduction.images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={cn(
                    'relative w-12 h-12 rounded overflow-hidden flex-shrink-0 transition-all',
                    currentImageIndex === index
                      ? 'ring-2 ring-[var(--color-gold)] scale-110'
                      : 'opacity-60 hover:opacity-100'
                  )}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Other Productions Section */}
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
              {isArabic ? 'إنتاجات أخرى' : 'Autres Productions'}
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
