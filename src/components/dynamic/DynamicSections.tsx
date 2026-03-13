'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

interface Section {
  id: string;
  page: string;
  title_ar: string;
  title_fr: string;
  content_ar: string;
  content_fr: string;
  image_url: string;
  display_order: number;
  visible: boolean;
}

interface DynamicSectionsProps {
  page: string;
}

export default function DynamicSections({ page }: DynamicSectionsProps) {
  const { isArabic } = useLanguage();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('sections')
        .select('*')
        .eq('page', page)
        .eq('visible', true)
        .order('display_order', { ascending: true });
      setSections(data || []);
      setLoading(false);
    };
    fetchSections();
  }, [page]);

  if (loading || sections.length === 0) return null;

  return (
    <>
      {sections.map((section, index) => (
        <SectionBlock key={section.id} section={section} index={index} isArabic={isArabic} />
      ))}
    </>
  );
}

function SectionBlock({ section, index, isArabic }: { section: Section; index: number; isArabic: boolean }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="py-16 bg-[var(--color-black-soft)]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={cn(
            'grid grid-cols-1 gap-8 items-center',
            section.image_url ? 'lg:grid-cols-2' : 'max-w-3xl mx-auto text-center'
          )}
        >
          {/* Text */}
          <div className={cn(
            isEven ? '' : 'lg:order-2',
            isArabic && 'text-right font-arabic'
          )}>
            <h2 className={cn(
              'text-3xl md:text-4xl font-bold mb-6',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {isArabic ? section.title_ar : section.title_fr}
            </h2>
            <div className="text-[var(--color-silver)] text-lg leading-relaxed whitespace-pre-wrap">
              {isArabic ? section.content_ar : section.content_fr}
            </div>
          </div>

          {/* Image */}
          {section.image_url && (
            <div className={cn(isEven ? '' : 'lg:order-1')}>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={section.image_url}
                  alt={isArabic ? section.title_ar : section.title_fr}
                  className="w-full h-auto object-cover rounded-xl"
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
