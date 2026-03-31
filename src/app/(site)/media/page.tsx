'use client';

import React, { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Newspaper, Video, ExternalLink, Calendar,
  Play, Globe, Tv
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import DynamicGallery from '@/components/dynamic/DynamicGallery';
import DynamicSections from '@/components/dynamic/DynamicSections';
import { useSupabaseData } from '@/hooks/useSupabaseData';

interface NewsArticle {
  id: string;
  title_ar: string;
  title_fr: string;
  excerpt_ar: string;
  excerpt_fr: string;
  source: string;
  date: string;
  category_ar: string;
  category_fr: string;
  display_order: number;
}

interface VideoItem {
  id: string;
  title_ar: string;
  title_fr: string;
  description_ar: string;
  description_fr: string;
  video_url: string;
  thumbnail_url: string;
  category_ar: string;
  category_fr: string;
  duration: string;
  published: boolean;
  display_order: number;
}

const fallbackNewsArticles: NewsArticle[] = [
  { id: '1', title_ar: 'افتتاح نادي سينما السلام البرنوصي بعرض فيلم "بامو"', title_fr: 'Inauguration du Cine-Club Bernoussi avec le film "Bamo"', excerpt_ar: 'احتضنت دار الشباب سيدي البرنوصي حفل افتتاح النادي السينمائي الجديد بحضور نخبة من الفنانين والمثقفين، حيث عرض فيلم "بامو" للمخرج محمد مفتكر تلاه نقاش ثري مع الناقد حمادي كيروم.', excerpt_fr: 'La Maison des Jeunes de Sidi Bernoussi a accueilli la ceremonie d\'inauguration du nouveau cine-club en presence d\'artistes et d\'intellectuels.', source: 'Medi1 TV', date: '2024-02-10', category_ar: 'أخبار', category_fr: 'Actualites', display_order: 1 },
  { id: '2', title_ar: 'جمعية الكرامة تطلق برنامج تكوين مهن السينما', title_fr: 'Al-Karama lance un programme de formation aux metiers du cinema', excerpt_ar: 'أعلنت جمعية الكرامة للمسرح والسينما عن إطلاق برنامج تكويني شامل يستهدف الشباب الراغبين في دخول عالم السينما.', excerpt_fr: 'L\'association Al-Karama pour le Theatre et le Cinema a annonce le lancement d\'un programme de formation complet.', source: 'MAP', date: '2024-02-05', category_ar: 'تكوين', category_fr: 'Formation', display_order: 2 },
  { id: '3', title_ar: 'لقاء مع الناقد السينمائي حمادي كيروم', title_fr: 'Rencontre avec le critique de cinema Hamadi Kirom', excerpt_ar: 'في إطار فعاليات الماستر كلاس، استضافت الجمعية الناقد السينمائي المغربي الشهير حمادي كيروم.', excerpt_fr: 'Dans le cadre des activites Master Class, l\'association a accueilli le celebre critique de cinema marocain Hamadi Kirom.', source: 'Al Aoual', date: '2024-01-28', category_ar: 'ماستر كلاس', category_fr: 'Masterclass', display_order: 3 },
  { id: '4', title_ar: 'شراكة جديدة مع المركز السينمائي المغربي', title_fr: 'Nouveau partenariat avec le Centre Cinematographique Marocain', excerpt_ar: 'وقعت جمعية الكرامة اتفاقية شراكة استراتيجية مع المركز السينمائي المغربي.', excerpt_fr: 'L\'association Al-Karama a signe un accord de partenariat strategique avec le Centre Cinematographique Marocain.', source: 'Hespress', date: '2024-01-15', category_ar: 'شراكات', category_fr: 'Partenariats', display_order: 4 },
];


const fallbackVideos: VideoItem[] = [
  {
    id: '1', title_ar: 'حفل افتتاح النادي السينمائي', title_fr: 'Ceremonie d\'inauguration du Cine-Club',
    description_ar: '', description_fr: '', video_url: '', thumbnail_url: '',
    duration: '15:30', category_ar: 'فعاليات', category_fr: 'Evenements',
    published: true, display_order: 1,
  },
  {
    id: '2', title_ar: 'لقاء مع حمادي كيروم', title_fr: 'Rencontre avec Hamadi Kirom',
    description_ar: '', description_fr: '', video_url: '', thumbnail_url: '',
    duration: '45:00', category_ar: 'ماستر كلاس', category_fr: 'Masterclass',
    published: true, display_order: 2,
  },
  {
    id: '3', title_ar: 'كواليس مسرحية صمت الكلام', title_fr: 'Coulisses de Le Silence des Mots',
    description_ar: '', description_fr: '', video_url: '', thumbnail_url: '',
    duration: '08:45', category_ar: 'مسرح', category_fr: 'Theatre',
    published: true, display_order: 3,
  },
];

type TabType = 'print' | 'online' | 'tv';

export default function MediaPage() {
  const { t, isArabic } = useLanguage();
  const { data: dbNews } = useSupabaseData<NewsArticle>('news_articles');
  const { data: dbVideos } = useSupabaseData<VideoItem>('videos');
  const newsArticles = dbNews.length > 0 ? dbNews : fallbackNewsArticles;
  const videos = dbVideos.length > 0 ? dbVideos : fallbackVideos;

  const [activeTab, setActiveTab] = useState<TabType>('print');

  const heroRef = React.useRef(null);
  const contentRef = React.useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isContentInView = useInView(contentRef, { once: true, margin: '-100px' });

  const tabs = [
    { id: 'print' as const, icon: Newspaper, labelAr: t.media.printPress, labelFr: 'Presse ecrite' },
    { id: 'online' as const, icon: Globe, labelAr: t.media.onlinePress, labelFr: 'Presse en ligne' },
    { id: 'tv' as const, icon: Tv, labelAr: t.media.tvChannels, labelFr: 'Chaines TV' },
  ];


  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-12 sm:py-16 md:py-24 bg-curtain overflow-hidden">
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
              'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6',
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
          <div className={cn('flex flex-wrap items-center justify-center gap-2 sm:gap-4 py-3 sm:py-4', isArabic && 'flex-row-reverse')}>
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all',
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
      <section ref={contentRef} className="py-8 sm:py-12 md:py-16 bg-[var(--color-black-soft)]">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {/* Print Press Tab */}
            {activeTab === 'print' && (
              <motion.div
                key="print"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className={cn('text-center text-[var(--color-silver)] mb-8', isArabic && 'font-arabic')}>
                  {isArabic ? t.media.printPressDesc : 'Couvertures de presse imprimee'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {newsArticles.filter(a => a.source !== 'Hespress').map((article, index) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group card-cinematic overflow-hidden"
                    >
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
                          <div className={cn('flex items-center gap-2 text-sm text-[var(--color-gray-light)]', isArabic && 'flex-row-reverse')}>
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(article.date).toLocaleDateString(isArabic ? 'ar-MA' : 'fr-FR')}</span>
                          </div>
                        </div>
                        <h3 className={cn('text-xl font-bold text-white mb-3 group-hover:text-[var(--color-gold)] transition-colors', isArabic && 'font-arabic')}>
                          {isArabic ? article.title_ar : article.title_fr}
                        </h3>
                        <p className={cn('text-[var(--color-silver)] text-sm leading-relaxed mb-4 line-clamp-3', isArabic && 'font-arabic')}>
                          {isArabic ? article.excerpt_ar : article.excerpt_fr}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Online Press Tab */}
            {activeTab === 'online' && (
              <motion.div
                key="online"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className={cn('text-center text-[var(--color-silver)] mb-8', isArabic && 'font-arabic')}>
                  {isArabic ? t.media.onlinePressDesc : 'Articles et actualites numeriques'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {newsArticles.map((article, index) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group card-cinematic overflow-hidden"
                    >
                      <div className="relative h-48 bg-gradient-to-br from-[var(--color-curtain)] to-[var(--color-black-pure)]">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Globe className="w-16 h-16 text-[var(--color-gold)]/20" />
                        </div>
                        <div className={cn(
                          'absolute top-4 px-3 py-1 bg-[var(--color-teal)] text-white text-xs font-bold rounded',
                          isArabic ? 'right-4' : 'left-4'
                        )}>
                          {article.source}
                        </div>
                      </div>
                      <div className={cn('p-6', isArabic && 'text-right')}>
                        <h3 className={cn('text-xl font-bold text-white mb-3 group-hover:text-[var(--color-gold)] transition-colors', isArabic && 'font-arabic')}>
                          {isArabic ? article.title_ar : article.title_fr}
                        </h3>
                        <p className={cn('text-[var(--color-silver)] text-sm leading-relaxed mb-4 line-clamp-3', isArabic && 'font-arabic')}>
                          {isArabic ? article.excerpt_ar : article.excerpt_fr}
                        </p>
                        <button className={cn('inline-flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-gold-bright)] text-sm', isArabic && 'flex-row-reverse font-arabic')}>
                          {t.blog.readMore}
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TV Channels Tab */}
            {activeTab === 'tv' && (
              <motion.div
                key="tv"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className={cn('text-center text-[var(--color-silver)] mb-8', isArabic && 'font-arabic')}>
                  {isArabic ? t.media.tvChannelsDesc : 'Reportages et interviews televisees'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videos.map((video, index) => {
                    const isYouTube = video.video_url && (video.video_url.includes('youtube') || video.video_url.includes('youtu.be'));
                    const ytMatch = video.video_url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
                    const thumb = video.thumbnail_url || (ytMatch ? `https://img.youtube.com/vi/${ytMatch[1]}/mqdefault.jpg` : null);

                    return (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group card-cinematic overflow-hidden cursor-pointer"
                      onClick={() => {
                        if (isYouTube && ytMatch) {
                          window.open(`https://www.youtube.com/watch?v=${ytMatch[1]}`, '_blank');
                        } else if (video.video_url) {
                          window.open(video.video_url, '_blank');
                        }
                      }}
                    >
                      <div className="relative aspect-video bg-gradient-to-br from-[var(--color-crimson)] to-[var(--color-black-pure)]">
                        {thumb ? (
                          <img src={thumb} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Tv className="w-16 h-16 text-[var(--color-gold)]/20" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-16 h-16 rounded-full bg-[var(--color-gold)] flex items-center justify-center">
                            <Play className="w-8 h-8 text-[var(--color-black-rich)]" />
                          </div>
                        </div>
                        {video.duration && (
                          <div className={cn('absolute bottom-4 px-2 py-1 bg-black/80 text-white text-xs rounded', isArabic ? 'left-4' : 'right-4')}>
                            {video.duration}
                          </div>
                        )}
                      </div>
                      <div className={cn('p-4', isArabic && 'text-right')}>
                        <span className="text-xs text-[var(--color-crimson)]">
                          {isArabic ? video.category_ar : video.category_fr}
                        </span>
                        <h3 className={cn('text-lg font-bold text-white mt-1', isArabic && 'font-arabic')}>
                          {isArabic ? video.title_ar : video.title_fr}
                        </h3>
                      </div>
                    </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Dynamic Photo Gallery Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-[var(--color-black-rich)]">
        <div className="container mx-auto px-4">
          <h2 className={cn('text-2xl md:text-3xl font-bold text-center mb-8', isArabic ? 'text-gradient-gold font-arabic' : 'heading-display text-white')}>
            {t.media.gallery}
          </h2>
          <DynamicGallery />
        </div>
      </section>

      {/* Dynamic Sections */}
      <DynamicSections page="media" />
    </div>
  );
}
