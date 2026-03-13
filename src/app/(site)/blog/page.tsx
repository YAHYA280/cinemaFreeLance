'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const heroRef = React.useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    const fetchBlogs = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      setBlogs(data || []);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(isArabic ? 'ar-MA' : 'fr-FR', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  // Blog detail view
  if (selectedBlog) {
    return (
      <div className="min-h-screen pt-20">
        {/* Cover */}
        {selectedBlog.cover_image && (
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img src={selectedBlog.cover_image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-rich)] via-transparent to-transparent" />
          </div>
        )}

        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <button
            onClick={() => setSelectedBlog(null)}
            className={cn(
              'flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-gold-bright)] mb-8 transition-colors',
              isArabic && 'flex-row-reverse font-arabic'
            )}
          >
            {isArabic ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
            {isArabic ? 'العودة للمقالات' : 'Retour aux articles'}
          </button>

          <h1 className={cn(
            'text-3xl md:text-4xl font-bold mb-4',
            isArabic ? 'text-gradient-gold font-arabic' : 'heading-display text-white'
          )}>
            {isArabic ? selectedBlog.title_ar : selectedBlog.title_fr}
          </h1>

          <div className={cn('flex items-center gap-4 mb-8 text-sm text-[var(--color-gray-light)]', isArabic && 'flex-row-reverse font-arabic')}>
            {(selectedBlog.author_ar || selectedBlog.author_fr) && (
              <span className={cn('flex items-center gap-1', isArabic && 'flex-row-reverse')}>
                <User className="w-4 h-4" />
                {isArabic ? selectedBlog.author_ar : selectedBlog.author_fr}
              </span>
            )}
            <span className={cn('flex items-center gap-1', isArabic && 'flex-row-reverse')}>
              <Calendar className="w-4 h-4" />
              {formatDate(selectedBlog.created_at)}
            </span>
          </div>

          <div className={cn(
            'prose prose-invert prose-lg max-w-none',
            isArabic && 'font-arabic text-right'
          )}>
            <div className="text-[var(--color-silver)] leading-relaxed whitespace-pre-wrap">
              {isArabic ? selectedBlog.content_ar : selectedBlog.content_fr}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
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
              {t.blog.title}
            </h1>
            <p className="text-xl text-[var(--color-champagne)] max-w-2xl mx-auto">
              {t.blog.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-[var(--color-black-soft)]">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="card-cinematic animate-pulse">
                  <div className="h-48 bg-[var(--color-charcoal)]" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-[var(--color-charcoal)] rounded w-3/4" />
                    <div className="h-3 bg-[var(--color-charcoal)] rounded w-full" />
                    <div className="h-3 bg-[var(--color-charcoal)] rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className={cn('text-center py-16 text-[var(--color-gray-medium)]', isArabic && 'font-arabic')}>
              {isArabic ? 'لا توجد مقالات بعد' : 'Aucun article pour le moment'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedBlog(blog)}
                  className="group card-cinematic cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    {blog.cover_image ? (
                      <img
                        src={blog.cover_image}
                        alt={isArabic ? blog.title_ar : blog.title_fr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--color-curtain)] to-[var(--color-black-pure)] flex items-center justify-center">
                        <span className="text-6xl opacity-20">📝</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className={cn('p-6', isArabic && 'text-right')}>
                    <div className={cn('flex items-center gap-3 mb-3 text-sm text-[var(--color-gray-light)]', isArabic && 'flex-row-reverse')}>
                      <span className={cn('flex items-center gap-1', isArabic && 'flex-row-reverse')}>
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(blog.created_at)}
                      </span>
                      {(blog.author_ar || blog.author_fr) && (
                        <span className={cn('flex items-center gap-1', isArabic && 'flex-row-reverse')}>
                          <User className="w-3.5 h-3.5" />
                          {isArabic ? blog.author_ar : blog.author_fr}
                        </span>
                      )}
                    </div>
                    <h3 className={cn(
                      'text-xl font-bold text-white mb-3 group-hover:text-[var(--color-gold)] transition-colors line-clamp-2',
                      isArabic && 'font-arabic'
                    )}>
                      {isArabic ? blog.title_ar : blog.title_fr}
                    </h3>
                    <p className={cn(
                      'text-[var(--color-silver)] text-sm leading-relaxed line-clamp-3',
                      isArabic && 'font-arabic'
                    )}>
                      {isArabic
                        ? blog.excerpt_ar || blog.content_ar
                        : blog.excerpt_fr || blog.content_fr}
                    </p>
                    <div className={cn('mt-4 text-[var(--color-gold)] text-sm font-medium', isArabic && 'font-arabic')}>
                      {t.blog.readMore} →
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
