'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Photo {
  id: string;
  title_ar: string;
  title_fr: string;
  description_ar: string;
  description_fr: string;
  image_url: string;
  category: string;
}

const CATEGORIES = [
  { id: 'all', ar: 'الكل', fr: 'Tout' },
  { id: 'general', ar: 'عام', fr: 'General' },
  { id: 'cinema', ar: 'سينما', fr: 'Cinema' },
  { id: 'theatre', ar: 'مسرح', fr: 'Theatre' },
  { id: 'events', ar: 'فعاليات', fr: 'Evenements' },
  { id: 'training', ar: 'تكوين', fr: 'Formation' },
];

export default function DynamicGallery() {
  const { isArabic } = useLanguage();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('display_order')
        .order('created_at', { ascending: false });
      if (error) console.error('Error fetching photos:', error);
      setPhotos(data || []);
      setLoading(false);
    };
    fetchPhotos();
  }, []);

  const filtered = filter === 'all' ? photos : photos.filter(p => p.category === filter);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="aspect-square bg-[var(--color-charcoal)] rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (photos.length === 0) return null;

  return (
    <>
      {/* Category Filters */}
      <div className={cn('flex flex-wrap gap-2 mb-8 justify-center', isArabic && 'flex-row-reverse')}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={cn(
              'px-4 py-2 rounded text-sm transition-all',
              filter === cat.id
                ? 'bg-[var(--color-gold)] text-[var(--color-black-rich)]'
                : 'glass text-[var(--color-silver)] hover:text-white',
              isArabic && 'font-arabic'
            )}
          >
            {isArabic ? cat.ar : cat.fr}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightbox(index)}
              className="group relative cursor-pointer overflow-hidden rounded-lg aspect-square"
            >
              <img
                src={photo.image_url}
                alt={isArabic ? photo.title_ar : photo.title_fr}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-end">
                <div className={cn(
                  'w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform',
                  isArabic && 'text-right font-arabic'
                )}>
                  <h4 className="text-white text-sm font-semibold truncate">
                    {isArabic ? photo.title_ar : photo.title_fr}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 p-2 text-white hover:text-[var(--color-gold)] z-10"
            >
              <X size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(Math.max(0, lightbox - 1)); }}
              className="absolute left-4 p-2 text-white hover:text-[var(--color-gold)] z-10"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(Math.min(filtered.length - 1, lightbox + 1)); }}
              className="absolute right-4 p-2 text-white hover:text-[var(--color-gold)] z-10"
            >
              <ChevronRight size={32} />
            </button>

            <div className="max-w-5xl max-h-[85vh] px-16" onClick={e => e.stopPropagation()}>
              <img
                src={filtered[lightbox]?.image_url}
                alt=""
                className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg"
              />
            </div>

            <div className={cn('absolute bottom-8 text-white text-center', isArabic && 'font-arabic')}>
              <p className="text-lg font-semibold">
                {isArabic ? filtered[lightbox]?.title_ar : filtered[lightbox]?.title_fr}
              </p>
              {(isArabic ? filtered[lightbox]?.description_ar : filtered[lightbox]?.description_fr) && (
                <p className="text-sm text-[var(--color-silver)] mt-1">
                  {isArabic ? filtered[lightbox]?.description_ar : filtered[lightbox]?.description_fr}
                </p>
              )}
              <p className="text-sm text-[var(--color-gray-light)] mt-2">
                {lightbox + 1} / {filtered.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
