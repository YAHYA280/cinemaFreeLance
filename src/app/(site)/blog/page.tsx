'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface Blog {
  id: string;
  title_ar: string;
  title_fr: string;
  content_ar: string;
  content_fr: string;
  excerpt_ar: string;
  excerpt_fr: string;
  cover_image: string;
  author_ar: string;
  author_fr: string;
  published: boolean;
  created_at: string;
}

export default function BlogPage() {
  const { t, isArabic } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const heroRef = React.useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    const fetchBlogs = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Blog fetch error:', error);
      }
      setBlogs(data || []);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(isArabic ? 'ar-MA' : 'fr-FR', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
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
              {t.blog.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--color-champagne)] max-w-2xl mx-auto">
              {t.blog.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-8 sm:py-12 md:py-16 bg-[var(--color-black-soft)]">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="card-cinematic animate-pulse">
                  <div className="h-40 sm:h-48 bg-[var(--color-charcoal)]" />
                  <div className="p-4 sm:p-6 space-y-3">
                    <div className="h-4 bg-[var(--color-charcoal)] rounded w-3/4" />
                    <div className="h-3 bg-[var(--color-charcoal)] rounded w-full" />
                    <div className="h-3 bg-[var(--color-charcoal)] rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className={cn('text-center py-12 sm:py-16 text-[var(--color-gray-medium)]', isArabic && 'font-arabic')}>
              {isArabic ? 'لا توجد مقالات بعد' : 'Aucun article pour le moment'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {blogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group card-cinematic"
                >
                  <Link href={`/blog/${blog.id}`} className="block">
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      {blog.cover_image ? (
                        <img
                          src={blog.cover_image}
                          alt={isArabic ? blog.title_ar : blog.title_fr}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--color-curtain)] to-[var(--color-black-pure)] flex items-center justify-center">
                          <span className="text-5xl sm:text-6xl opacity-20">📝</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className={cn('p-4 sm:p-6', isArabic && 'text-right')}>
                      <div className={cn('flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-xs sm:text-sm text-[var(--color-gray-light)]', isArabic && 'flex-row-reverse')}>
                        <span className={cn('flex items-center gap-1', isArabic && 'flex-row-reverse')}>
                          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          {formatDate(blog.created_at)}
                        </span>
                        {(blog.author_ar || blog.author_fr) && (
                          <span className={cn('flex items-center gap-1', isArabic && 'flex-row-reverse')}>
                            <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            {isArabic ? blog.author_ar : blog.author_fr}
                          </span>
                        )}
                      </div>
                      <h3 className={cn(
                        'text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[var(--color-gold)] transition-colors line-clamp-2',
                        isArabic && 'font-arabic'
                      )}>
                        {isArabic ? blog.title_ar : blog.title_fr}
                      </h3>
                      <p className={cn(
                        'text-[var(--color-silver)] text-xs sm:text-sm leading-relaxed line-clamp-3',
                        isArabic && 'font-arabic'
                      )}>
                        {isArabic
                          ? blog.excerpt_ar || blog.content_ar
                          : blog.excerpt_fr || blog.content_fr}
                      </p>
                      <div className={cn('mt-3 sm:mt-4 text-[var(--color-gold)] text-xs sm:text-sm font-medium', isArabic && 'font-arabic')}>
                        {t.blog.readMore} →
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
