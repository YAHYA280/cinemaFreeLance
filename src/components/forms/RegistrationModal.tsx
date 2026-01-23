'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Film, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const registrationSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters'),
  age: z.string().refine((val) => parseInt(val) >= 10 && parseInt(val) <= 100, 'Age must be between 10 and 100'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  motivation: z.string().min(20, 'Please write at least 20 characters'),
});

type RegistrationData = z.infer<typeof registrationSchema>;

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const { t, isArabic } = useLanguage();
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Registration data:', data);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-gradient-to-b from-[var(--color-charcoal)] to-[var(--color-black-soft)] border border-[var(--color-gold)]/20 rounded-lg overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-r from-[var(--color-crimson)]/20 to-transparent border-b border-[var(--color-gold)]/10">
              <button
                onClick={onClose}
                className={cn(
                  'absolute top-4 text-[var(--color-silver)] hover:text-white transition-colors',
                  isArabic ? 'left-4' : 'right-4'
                )}
              >
                <X size={24} />
              </button>
              <div className={cn('flex items-center gap-4', isArabic && 'flex-row-reverse')}>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-gold-dark)] to-[var(--color-gold)] flex items-center justify-center">
                  <Film className="w-7 h-7 text-[var(--color-black-rich)]" />
                </div>
                <div className={cn(isArabic && 'text-right')}>
                  <h2 className={cn('text-xl font-bold text-[var(--color-gold)]', isArabic && 'font-arabic')}>
                    {t.registration.title}
                  </h2>
                  <p className={cn('text-sm text-[var(--color-silver)]', isArabic && 'font-arabic')}>
                    {t.registration.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                      className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"
                    >
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <p className={cn('text-lg text-[var(--color-gold)]', isArabic && 'font-arabic')}>
                      {t.registration.success}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {/* Full Name */}
                    <div>
                      <label className={cn('block text-sm text-[var(--color-silver)] mb-2', isArabic && 'font-arabic text-right')}>
                        {t.registration.fullName} *
                      </label>
                      <input
                        {...register('fullName')}
                        type="text"
                        className={cn('input-cinematic', isArabic && 'text-right font-arabic')}
                        dir={isArabic ? 'rtl' : 'ltr'}
                      />
                      {errors.fullName && (
                        <p className={cn('text-red-400 text-xs mt-1', isArabic && 'text-right')}>
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    {/* Age & Phone Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={cn('block text-sm text-[var(--color-silver)] mb-2', isArabic && 'font-arabic text-right')}>
                          {t.registration.age} *
                        </label>
                        <input
                          {...register('age')}
                          type="number"
                          min="10"
                          max="100"
                          className="input-cinematic text-center"
                        />
                        {errors.age && (
                          <p className={cn('text-red-400 text-xs mt-1', isArabic && 'text-right')}>
                            {errors.age.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className={cn('block text-sm text-[var(--color-silver)] mb-2', isArabic && 'font-arabic text-right')}>
                          {t.registration.phone} *
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          className="input-cinematic"
                          dir="ltr"
                        />
                        {errors.phone && (
                          <p className={cn('text-red-400 text-xs mt-1', isArabic && 'text-right')}>
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className={cn('block text-sm text-[var(--color-silver)] mb-2', isArabic && 'font-arabic text-right')}>
                        {t.registration.email} *
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        className="input-cinematic"
                        dir="ltr"
                      />
                      {errors.email && (
                        <p className={cn('text-red-400 text-xs mt-1', isArabic && 'text-right')}>
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Motivation */}
                    <div>
                      <label className={cn('block text-sm text-[var(--color-silver)] mb-2', isArabic && 'font-arabic text-right')}>
                        {t.registration.motivation} *
                      </label>
                      <textarea
                        {...register('motivation')}
                        rows={3}
                        className={cn('input-cinematic resize-none', isArabic && 'text-right font-arabic')}
                        dir={isArabic ? 'rtl' : 'ltr'}
                      />
                      {errors.motivation && (
                        <p className={cn('text-red-400 text-xs mt-1', isArabic && 'text-right')}>
                          {errors.motivation.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        'btn-gold w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed',
                        isArabic && 'font-arabic'
                      )}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-[var(--color-black-rich)] border-t-transparent rounded-full inline-block"
                          />
                          {t.common.loading}
                        </span>
                      ) : (
                        t.registration.submit
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
