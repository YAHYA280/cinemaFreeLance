'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
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

export default function BlogPostPage() {
  const { id } = useParams();
  const { t, isArabic } = useLanguage();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) console.error('Blog fetch error:', error);
      setBlog(data);
      setLoading(false);
    };
    if (id) fetchBlog();
  }, [id]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(isArabic ? 'ar-MA' : 'fr-FR', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[var(--color-gold)]" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4">
        <p className={cn('text-xl text-[var(--color-silver)]', isArabic && 'font-arabic')}>
          {isArabic ? 'المقال غير موجود' : 'Article introuvable'}
        </p>
        <Link
          href="/blog"
          className={cn(
            'flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-gold-bright)] transition-colors',
            isArabic && 'flex-row-reverse font-arabic'
          )}
        >
          {isArabic ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          {isArabic ? 'العودة للمقالات' : 'Retour aux articles'}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Cover Image */}
      {blog.cover_image && (
        <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
          <img src={blog.cover_image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-rich)] via-black/30 to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-3xl">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/blog"
            className={cn(
              'inline-flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-gold-bright)] mb-6 sm:mb-8 transition-colors text-sm sm:text-base',
              isArabic && 'flex-row-reverse font-arabic'
            )}
          >
            {isArabic ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
            {isArabic ? 'العودة للمقالات' : 'Retour aux articles'}
          </Link>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            'text-2xl sm:text-3xl md:text-4xl font-bold mb-4',
            isArabic ? 'text-gradient-gold font-arabic' : 'heading-display text-white'
          )}
        >
          {isArabic ? blog.title_ar : blog.title_fr}
        </motion.h1>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            'flex flex-wrap items-center gap-3 sm:gap-4 mb-8 text-xs sm:text-sm text-[var(--color-gray-light)]',
            isArabic && 'flex-row-reverse font-arabic'
          )}
        >
          {(blog.author_ar || blog.author_fr) && (
            <span className={cn('flex items-center gap-1', isArabic && 'flex-row-reverse')}>
              <User className="w-4 h-4" />
              {isArabic ? blog.author_ar : blog.author_fr}
            </span>
          )}
          <span className={cn('flex items-center gap-1', isArabic && 'flex-row-reverse')}>
            <Calendar className="w-4 h-4" />
            {formatDate(blog.created_at)}
          </span>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn(
            'prose prose-invert prose-lg max-w-none',
            isArabic && 'font-arabic text-right'
          )}
        >
          <div className="text-[var(--color-silver)] leading-relaxed whitespace-pre-wrap text-sm sm:text-base md:text-lg">
            {isArabic ? blog.content_ar : blog.content_fr}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
