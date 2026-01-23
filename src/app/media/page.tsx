'use client';

import React, { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Newspaper, Image as ImageIcon, Video, ExternalLink, Calendar,
  Play, Grid, List, X, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const newsArticles = [
  {
    id: 1,
    titleAr: 'افتتاح نادي البرنوصي السينمائي بعرض فيلم "بامو"',
    titleFr: 'Inauguration du Cine-Club Bernoussi avec le film "Bamo"',
    excerptAr: 'احتضنت دار الشباب سيدي البرنوصي حفل افتتاح النادي السينمائي الجديد بحضور نخبة من الفنانين والمثقفين، حيث عرض فيلم "بامو" للمخرج محمد مفتكر تلاه نقاش ثري مع الناقد حمادي كيروم.',
    excerptFr: 'La Maison des Jeunes de Sidi Bernoussi a accueilli la ceremonie d\'inauguration du nouveau cine-club en presence d\'artistes et d\'intellectuels. Le film "Bamo" du realisateur Mohamed Mouftakir a ete projete, suivi d\'un riche debat avec le critique Hamadi Kirom.',
    source: 'Medi1 TV',
    date: '2024-02-10',
    category: { ar: 'أخبار', fr: 'Actualites' },
  },
  {
    id: 2,
    titleAr: 'جمعية الكرامة تطلق برنامج تكوين مهن السينما',
    titleFr: 'Al-Karama lance un programme de formation aux metiers du cinema',
    excerptAr: 'أعلنت جمعية الكرامة للمسرح والسينما عن إطلاق برنامج تكويني شامل يستهدف الشباب الراغبين في دخول عالم السينما، ويشمل ورشات في كتابة السيناريو والمونتاج والإخراج.',
    excerptFr: 'L\'association Al-Karama pour le Theatre et le Cinema a annonce le lancement d\'un programme de formation complet destine aux jeunes desireux d\'entrer dans le monde du cinema, comprenant des ateliers de scenario, de montage et de realisation.',
    source: 'MAP',
    date: '2024-02-05',
    category: { ar: 'تكوين', fr: 'Formation' },
  },
  {
    id: 3,
    titleAr: 'لقاء مع الناقد السينمائي حمادي كيروم',
    titleFr: 'Rencontre avec le critique de cinema Hamadi Kirom',
    excerptAr: 'في إطار فعاليات الماستر كلاس، استضافت الجمعية الناقد السينمائي المغربي الشهير حمادي كيروم الذي قدم قراءة نقدية معمقة للسينما المغربية المعاصرة.',
    excerptFr: 'Dans le cadre des activites Master Class, l\'association a accueilli le celebre critique de cinema marocain Hamadi Kirom qui a presente une lecture critique approfondie du cinema marocain contemporain.',
    source: 'Al Aoual',
    date: '2024-01-28',
    category: { ar: 'ماستر كلاس', fr: 'Masterclass' },
  },
  {
    id: 4,
    titleAr: 'شراكة جديدة مع المركز السينمائي المغربي',
    titleFr: 'Nouveau partenariat avec le Centre Cinematographique Marocain',
    excerptAr: 'وقعت جمعية الكرامة اتفاقية شراكة استراتيجية مع المركز السينمائي المغربي لدعم الأنشطة الثقافية والتكوينية.',
    excerptFr: 'L\'association Al-Karama a signe un accord de partenariat strategique avec le Centre Cinematographique Marocain pour soutenir les activites culturelles et formatrices.',
    source: 'Hespress',
    date: '2024-01-15',
    category: { ar: 'شراكات', fr: 'Partenariats' },
  },
];

const galleryImages = [
  { id: 1, category: 'cinema', event: { ar: 'افتتاح النادي السينمائي', fr: 'Inauguration Cine-Club' } },
  { id: 2, category: 'cinema', event: { ar: 'عرض فيلم بامو', fr: 'Projection Bamo' } },
  { id: 3, category: 'theatre', event: { ar: 'مسرحية صمت الكلام', fr: 'Piece Le Silence des Mots' } },
  { id: 4, category: 'training', event: { ar: 'ورشة كتابة السيناريو', fr: 'Atelier Scenario' } },
  { id: 5, category: 'cinema', event: { ar: 'ماستر كلاس', fr: 'Masterclass' } },
  { id: 6, category: 'theatre', event: { ar: 'بروفات مسرحية', fr: 'Repetitions' } },
  { id: 7, category: 'training', event: { ar: 'تكوين المكونين', fr: 'Formation Formateurs' } },
  { id: 8, category: 'cinema', event: { ar: 'نقاش سينمائي', fr: 'Debat Cinematographique' } },
];

const videos = [
  {
    id: 1,
    titleAr: 'حفل افتتاح النادي السينمائي',
    titleFr: 'Ceremonie d\'inauguration du Cine-Club',
    duration: '15:30',
    category: { ar: 'فعاليات', fr: 'Evenements' },
  },
  {
    id: 2,
    titleAr: 'لقاء مع حمادي كيروم',
    titleFr: 'Rencontre avec Hamadi Kirom',
    duration: '45:00',
    category: { ar: 'ماستر كلاس', fr: 'Masterclass' },
  },
  {
    id: 3,
    titleAr: 'كواليس مسرحية صمت الكلام',
    titleFr: 'Coulisses de Le Silence des Mots',
    duration: '08:45',
    category: { ar: 'مسرح', fr: 'Theatre' },
  },
];

type TabType = 'news' | 'gallery' | 'videos';
type GalleryFilter = 'all' | 'cinema' | 'theatre' | 'training';

export default function MediaPage() {
  const { t, isArabic } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('news');
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilter>('all');
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const heroRef = React.useRef(null);
  const contentRef = React.useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isContentInView = useInView(contentRef, { once: true, margin: '-100px' });

  const filteredImages = galleryImages.filter(
    img => galleryFilter === 'all' || img.category === galleryFilter
  );

  const tabs = [
    { id: 'news' as const, icon: Newspaper, labelAr: 'أخبار', labelFr: 'Actualites' },
    { id: 'gallery' as const, icon: ImageIcon, labelAr: 'معرض الصور', labelFr: 'Galerie Photos' },
    { id: 'videos' as const, icon: Video, labelAr: 'فيديو', labelFr: 'Videos' },
  ];

  const galleryFilters = [
    { id: 'all' as const, labelAr: 'الكل', labelFr: 'Tous' },
    { id: 'cinema' as const, labelAr: 'سينما', labelFr: 'Cinema' },
    { id: 'theatre' as const, labelAr: 'مسرح', labelFr: 'Theatre' },
    { id: 'training' as const, labelAr: 'تكوين', labelFr: 'Formation' },
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
            <h1 className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-bold mb-6',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {t.media.title}
            </h1>
            <p className="text-xl text-[var(--color-champagne)] max-w-2xl mx-auto">
              {isArabic
                ? 'تابع آخر أخبارنا وفعالياتنا'
                : 'Suivez nos dernieres actualites et evenements'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="sticky top-20 z-30 bg-[var(--color-charcoal)] border-b border-[var(--color-gold)]/10">
        <div className="container mx-auto px-4">
          <div className={cn('flex items-center justify-center gap-4 py-4', isArabic && 'flex-row-reverse')}>
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all',
                  activeTab === tab.id
                    ? 'bg-[var(--color-gold)] text-[var(--color-black-rich)]'
                    : 'glass text-[var(--color-silver)] hover:text-white',
                  isArabic && 'flex-row-reverse font-arabic'
                )}
              >
                <tab.icon className="w-5 h-5" />
                <span>{isArabic ? tab.labelAr : tab.labelFr}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-16 bg-[var(--color-black-soft)]">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {/* News Tab */}
            {activeTab === 'news' && (
              <motion.div
                key="news"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {newsArticles.map((article, index) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group card-cinematic overflow-hidden"
                    >
                      {/* Image placeholder */}
                      <div className="relative h-48 bg-gradient-to-br from-[var(--color-curtain)] to-[var(--color-black-pure)]">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Newspaper className="w-16 h-16 text-[var(--color-gold)]/20" />
                        </div>
                        <div className={cn(
                          'absolute top-4 px-3 py-1 bg-[var(--color-gold)] text-[var(--color-black-rich)] text-xs font-bold rounded',
                          isArabic ? 'right-4' : 'left-4'
                        )}>
                          {article.source}
                        </div>
                      </div>

                      <div className={cn('p-6', isArabic && 'text-right')}>
                        <div className={cn('flex items-center gap-3 mb-3', isArabic && 'flex-row-reverse')}>
                          <span className="px-2 py-1 text-xs rounded bg-[var(--color-crimson)]/20 text-[var(--color-crimson)]">
                            {isArabic ? article.category.ar : article.category.fr}
                          </span>
                          <div className={cn('flex items-center gap-2 text-sm text-[var(--color-gray-light)]', isArabic && 'flex-row-reverse')}>
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(article.date).toLocaleDateString(isArabic ? 'ar-MA' : 'fr-FR')}</span>
                          </div>
                        </div>

                        <h3 className={cn(
                          'text-xl font-bold text-white mb-3 group-hover:text-[var(--color-gold)] transition-colors',
                          isArabic && 'font-arabic'
                        )}>
                          {isArabic ? article.titleAr : article.titleFr}
                        </h3>

                        <p className={cn('text-[var(--color-silver)] text-sm leading-relaxed mb-4 line-clamp-3', isArabic && 'font-arabic')}>
                          {isArabic ? article.excerptAr : article.excerptFr}
                        </p>

                        <button className={cn(
                          'inline-flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-gold-bright)] text-sm',
                          isArabic && 'flex-row-reverse font-arabic'
                        )}>
                          {t.blog.readMore}
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gallery controls */}
                <div className={cn('flex flex-wrap items-center justify-between gap-4 mb-8', isArabic && 'flex-row-reverse')}>
                  {/* Filters */}
                  <div className={cn('flex items-center gap-2', isArabic && 'flex-row-reverse')}>
                    {galleryFilters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setGalleryFilter(filter.id)}
                        className={cn(
                          'px-4 py-2 rounded text-sm transition-all',
                          galleryFilter === filter.id
                            ? 'bg-[var(--color-gold)] text-[var(--color-black-rich)]'
                            : 'glass text-[var(--color-silver)] hover:text-white',
                          isArabic && 'font-arabic'
                        )}
                      >
                        {isArabic ? filter.labelAr : filter.labelFr}
                      </button>
                    ))}
                  </div>

                  {/* View mode */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={cn(
                        'p-2 rounded transition-colors',
                        viewMode === 'grid' ? 'text-[var(--color-gold)]' : 'text-[var(--color-gray-light)]'
                      )}
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={cn(
                        'p-2 rounded transition-colors',
                        viewMode === 'list' ? 'text-[var(--color-gold)]' : 'text-[var(--color-gray-light)]'
                      )}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>

                {/* Gallery grid */}
                <div className={cn(
                  'grid gap-4',
                  viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'
                )}>
                  <AnimatePresence mode="popLayout">
                    {filteredImages.map((image, index) => (
                      <motion.div
                        key={image.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setLightboxImage(index)}
                        className={cn(
                          'group relative cursor-pointer overflow-hidden rounded-lg',
                          viewMode === 'grid' ? 'aspect-square' : 'aspect-video'
                        )}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-curtain)] to-[var(--color-black-pure)]">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-[var(--color-gold)]/20" />
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className={cn('text-white text-sm', isArabic && 'font-arabic')}>
                            {isArabic ? image.event.ar : image.event.fr}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Videos Tab */}
            {activeTab === 'videos' && (
              <motion.div
                key="videos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group card-cinematic overflow-hidden"
                    >
                      {/* Video thumbnail */}
                      <div className="relative aspect-video bg-gradient-to-br from-[var(--color-crimson)] to-[var(--color-black-pure)]">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Video className="w-16 h-16 text-[var(--color-gold)]/20" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-16 h-16 rounded-full bg-[var(--color-gold)] flex items-center justify-center">
                            <Play className="w-8 h-8 text-[var(--color-black-rich)]" />
                          </div>
                        </div>
                        <div className={cn(
                          'absolute bottom-4 px-2 py-1 bg-black/80 text-white text-xs rounded',
                          isArabic ? 'left-4' : 'right-4'
                        )}>
                          {video.duration}
                        </div>
                      </div>

                      <div className={cn('p-4', isArabic && 'text-right')}>
                        <span className="text-xs text-[var(--color-crimson)]">
                          {isArabic ? video.category.ar : video.category.fr}
                        </span>
                        <h3 className={cn('text-lg font-bold text-white mt-1', isArabic && 'font-arabic')}>
                          {isArabic ? video.titleAr : video.titleFr}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 text-white hover:text-[var(--color-gold)]"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(Math.max(0, lightboxImage - 1));
              }}
              className="absolute left-4 p-2 text-white hover:text-[var(--color-gold)]"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(Math.min(filteredImages.length - 1, lightboxImage + 1));
              }}
              className="absolute right-4 p-2 text-white hover:text-[var(--color-gold)]"
            >
              <ChevronRight size={32} />
            </button>

            <div className="max-w-4xl max-h-[80vh] aspect-video bg-gradient-to-br from-[var(--color-curtain)] to-[var(--color-black-pure)] rounded-lg flex items-center justify-center">
              <ImageIcon className="w-32 h-32 text-[var(--color-gold)]/20" />
            </div>

            <div className={cn('absolute bottom-8 text-white text-center', isArabic && 'font-arabic')}>
              <p className="text-lg">{isArabic ? filteredImages[lightboxImage]?.event.ar : filteredImages[lightboxImage]?.event.fr}</p>
              <p className="text-sm text-[var(--color-gray-light)]">{lightboxImage + 1} / {filteredImages.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
