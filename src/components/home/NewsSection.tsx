'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Newspaper, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const newsItems = [
  {
    id: 1,
    titleAr: 'افتتاح نادي البرنوصي السينمائي بعرض فيلم "بامو"',
    titleFr: 'Inauguration du Cine-Club Bernoussi avec le film "Bamo"',
    excerptAr: 'احتضنت دار الشباب سيدي البرنوصي حفل افتتاح النادي السينمائي الجديد بحضور نخبة من الفنانين والمثقفين...',
    excerptFr: 'La Maison des Jeunes de Sidi Bernoussi a accueilli la ceremonie d\'inauguration du nouveau cine-club en presence d\'artistes et d\'intellectuels...',
    source: 'Medi1 TV',
    date: '2024-02-10',
    imageUrl: '/news/opening.jpg',
  },
  {
    id: 2,
    titleAr: 'جمعية الكرامة تطلق برنامج تكوين مهن السينما',
    titleFr: 'Al-Karama lance un programme de formation aux metiers du cinema',
    excerptAr: 'أعلنت جمعية الكرامة للمسرح والسينما عن إطلاق برنامج تكويني شامل يستهدف الشباب الراغبين في دخول عالم السينما...',
    excerptFr: 'L\'association Al-Karama pour le Theatre et le Cinema a annonce le lancement d\'un programme de formation complet destine aux jeunes...',
    source: 'MAP',
    date: '2024-02-05',
    imageUrl: '/news/training.jpg',
  },
  {
    id: 3,
    titleAr: 'لقاء مع الناقد السينمائي حمادي كيروم',
    titleFr: 'Rencontre avec le critique de cinema Hamadi Kirom',
    excerptAr: 'في إطار فعاليات الماستر كلاس، استضافت الجمعية الناقد السينمائي المغربي الشهير حمادي كيروم...',
    excerptFr: 'Dans le cadre des activites Master Class, l\'association a accueilli le celebre critique de cinema marocain Hamadi Kirom...',
    source: 'Al Aoual',
    date: '2024-01-28',
    imageUrl: '/news/masterclass.jpg',
  },
];

export default function NewsSection() {
  const { t, isArabic } = useLanguage();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  return (
    <section ref={ref} className="relative py-24 bg-[var(--color-charcoal)]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a418' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={cn('text-center mb-16', isArabic && 'font-arabic')}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--color-gold)]" />
            <Newspaper className="w-6 h-6 text-[var(--color-gold)]" />
            <div className="w-8 h-px bg-[var(--color-gold)]" />
          </div>
          <h2 className={cn(
            'text-3xl md:text-4xl lg:text-5xl font-bold mb-4',
            isArabic ? 'text-gradient-gold' : 'heading-display text-white'
          )}>
            {t.media.pressCoverage}
          </h2>
          <p className="text-[var(--color-silver)] max-w-2xl mx-auto">
            {isArabic
              ? 'آخر أخبار جمعية الكرامة في وسائل الإعلام'
              : 'Les dernieres actualites d\'Al-Karama dans les medias'}
          </p>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsItems.map((news, index) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group card-cinematic"
            >
              {/* Image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-[var(--color-curtain)] to-[var(--color-black-pure)] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Newspaper className="w-16 h-16 text-[var(--color-gold)]/20" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-pure)] to-transparent opacity-60" />

                {/* Source badge */}
                <div className={cn(
                  'absolute top-4 px-3 py-1 bg-[var(--color-gold)] text-[var(--color-black-rich)] text-xs font-bold rounded',
                  isArabic ? 'right-4' : 'left-4'
                )}>
                  {news.source}
                </div>
              </div>

              {/* Content */}
              <div className={cn('p-6', isArabic && 'text-right')}>
                {/* Date */}
                <time className="text-sm text-[var(--color-gray-light)] mb-3 block">
                  {new Date(news.date).toLocaleDateString(isArabic ? 'ar-MA' : 'fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>

                {/* Title */}
                <h3 className={cn(
                  'text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[var(--color-gold)] transition-colors',
                  isArabic && 'font-arabic'
                )}>
                  {isArabic ? news.titleAr : news.titleFr}
                </h3>

                {/* Excerpt */}
                <p className={cn(
                  'text-[var(--color-silver)] text-sm leading-relaxed line-clamp-3 mb-4',
                  isArabic && 'font-arabic'
                )}>
                  {isArabic ? news.excerptAr : news.excerptFr}
                </p>

                {/* Read more */}
                <Link
                  href={`/media/news/${news.id}`}
                  className={cn(
                    'inline-flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-gold-bright)] transition-colors text-sm',
                    isArabic && 'flex-row-reverse font-arabic'
                  )}
                >
                  {t.blog.readMore}
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link href="/media">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'inline-flex items-center gap-3 btn-outline',
                isArabic && 'flex-row-reverse font-arabic'
              )}
            >
              {t.media.viewAll}
              <Arrow className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
