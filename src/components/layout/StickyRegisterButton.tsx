'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import RegistrationModal from '@/components/forms/RegistrationModal';

export default function StickyRegisterButton() {
  const { t, isArabic } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className={cn(
              'fixed z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[var(--color-gold-dark)] via-[var(--color-gold)] to-[var(--color-gold-bright)] text-[var(--color-black-rich)] font-bold shadow-lg animate-pulse-glow',
              isArabic ? 'top-24 left-4 flex-row-reverse font-arabic' : 'top-24 right-4'
            )}
          >
            <Ticket className="w-5 h-5" />
            <span className="text-sm">{t.nav.joinClub}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
