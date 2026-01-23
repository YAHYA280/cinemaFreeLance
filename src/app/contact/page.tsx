'use client';

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Mail, Phone, MapPin, Send, Clock, CheckCircle,
  Facebook, Instagram, Youtube, Twitter, Film
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

const registrationSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters'),
  age: z.string().refine((val) => parseInt(val) >= 10 && parseInt(val) <= 100, 'Age must be between 10 and 100'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  motivation: z.string().min(20, 'Please write at least 20 characters'),
});

type ContactData = z.infer<typeof contactSchema>;
type RegistrationData = z.infer<typeof registrationSchema>;

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function ContactPage() {
  const { t, isArabic } = useLanguage();
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);

  const heroRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const registrationRef = React.useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isContentInView = useInView(contentRef, { once: true, margin: '-100px' });
  const isRegistrationInView = useInView(registrationRef, { once: true, margin: '-100px' });

  const contactForm = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  });

  const registrationForm = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
  });

  const onContactSubmit = async (data: ContactData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Contact data:', data);
    setContactSubmitted(true);
    contactForm.reset();
    setTimeout(() => setContactSubmitted(false), 3000);
  };

  const onRegistrationSubmit = async (data: RegistrationData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Registration data:', data);
    setRegistrationSubmitted(true);
    registrationForm.reset();
    setTimeout(() => setRegistrationSubmitted(false), 3000);
  };

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
              {t.contact.title}
            </h1>
            <p className="text-xl text-[var(--color-champagne)] max-w-2xl mx-auto">
              {isArabic
                ? 'نحن سعداء بالتواصل معكم'
                : 'Nous sommes heureux de vous entendre'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section ref={contentRef} className="py-20 bg-[var(--color-black-soft)]">
        <div className="container mx-auto px-4">
          <div className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-16',
            isArabic && 'lg:grid-flow-dense'
          )}>
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className={cn(isArabic && 'lg:col-start-2 text-right')}
            >
              <h2 className={cn(
                'text-2xl md:text-3xl font-bold text-[var(--color-gold)] mb-8',
                isArabic && 'font-arabic'
              )}>
                {isArabic ? 'معلومات الاتصال' : 'Informations de Contact'}
              </h2>

              <div className="space-y-6 mb-12">
                {/* Address */}
                <div className={cn('flex items-start gap-4', isArabic && 'flex-row-reverse')}>
                  <div className="w-12 h-12 rounded-full bg-[var(--color-crimson)]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[var(--color-crimson)]" />
                  </div>
                  <div>
                    <h3 className={cn('font-bold text-white mb-1', isArabic && 'font-arabic')}>
                      {t.contact.address}
                    </h3>
                    <p className={cn('text-[var(--color-silver)]', isArabic && 'font-arabic')}>
                      {t.contact.addressValue}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className={cn('flex items-start gap-4', isArabic && 'flex-row-reverse')}>
                  <div className="w-12 h-12 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <h3 className={cn('font-bold text-white mb-1', isArabic && 'font-arabic')}>
                      {t.contact.phone}
                    </h3>
                    <p className="text-[var(--color-silver)]" dir="ltr">
                      +212 6XX XXX XXX
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className={cn('flex items-start gap-4', isArabic && 'flex-row-reverse')}>
                  <div className="w-12 h-12 rounded-full bg-[var(--color-teal)]/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[var(--color-teal)]" />
                  </div>
                  <div>
                    <h3 className={cn('font-bold text-white mb-1', isArabic && 'font-arabic')}>
                      {t.contact.email}
                    </h3>
                    <p className="text-[var(--color-silver)]">
                      contact@alkarama.ma
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className={cn('flex items-start gap-4', isArabic && 'flex-row-reverse')}>
                  <div className="w-12 h-12 rounded-full bg-[var(--color-terracotta)]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[var(--color-terracotta)]" />
                  </div>
                  <div>
                    <h3 className={cn('font-bold text-white mb-1', isArabic && 'font-arabic')}>
                      {isArabic ? 'ساعات العمل' : 'Horaires'}
                    </h3>
                    <p className={cn('text-[var(--color-silver)]', isArabic && 'font-arabic')}>
                      {isArabic ? 'الإثنين - السبت: 09:00 - 18:00' : 'Lundi - Samedi: 09h00 - 18h00'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className={cn(isArabic && 'text-right')}>
                <h3 className={cn('font-bold text-white mb-4', isArabic && 'font-arabic')}>
                  {t.contact.followUs}
                </h3>
                <div className={cn('flex gap-3', isArabic && 'justify-end')}>
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full bg-[var(--color-charcoal)] border border-[var(--color-gold)]/20 flex items-center justify-center text-[var(--color-silver)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-12 rounded-lg overflow-hidden border border-[var(--color-gold)]/20">
                <div className="aspect-video bg-[var(--color-charcoal)] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-[var(--color-gold)]/30 mx-auto mb-2" />
                    <p className={cn('text-[var(--color-silver)] text-sm', isArabic && 'font-arabic')}>
                      {isArabic ? 'خريطة الموقع' : 'Carte du lieu'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: isArabic ? -50 : 50 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={cn(isArabic && 'lg:col-start-1 text-right')}
            >
              <div className="card-cinematic p-8">
                <h2 className={cn(
                  'text-2xl font-bold text-[var(--color-gold)] mb-6',
                  isArabic && 'font-arabic'
                )}>
                  {t.contact.sendMessage}
                </h2>

                {contactSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <p className={cn('text-lg text-[var(--color-gold)]', isArabic && 'font-arabic')}>
                      {t.common.success}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                    <div>
                      <label className={cn('block text-sm text-[var(--color-silver)] mb-2', isArabic && 'font-arabic')}>
                        {t.contact.name} *
                      </label>
                      <input
                        {...contactForm.register('name')}
                        type="text"
                        className={cn('input-cinematic', isArabic && 'text-right font-arabic')}
                        dir={isArabic ? 'rtl' : 'ltr'}
                      />
                      {contactForm.formState.errors.name && (
                        <p className={cn('text-red-400 text-xs mt-1', isArabic && 'text-right')}>
                          {contactForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={cn('block text-sm text-[var(--color-silver)] mb-2', isArabic && 'font-arabic')}>
                        {t.contact.yourEmail} *
                      </label>
                      <input
                        {...contactForm.register('email')}
                        type="email"
                        className="input-cinematic"
                        dir="ltr"
                      />
                      {contactForm.formState.errors.email && (
                        <p className={cn('text-red-400 text-xs mt-1', isArabic && 'text-right')}>
                          {contactForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={cn('block text-sm text-[var(--color-silver)] mb-2', isArabic && 'font-arabic')}>
                        {t.contact.message} *
                      </label>
                      <textarea
                        {...contactForm.register('message')}
                        rows={5}
                        className={cn('input-cinematic resize-none', isArabic && 'text-right font-arabic')}
                        dir={isArabic ? 'rtl' : 'ltr'}
                      />
                      {contactForm.formState.errors.message && (
                        <p className={cn('text-red-400 text-xs mt-1', isArabic && 'text-right')}>
                          {contactForm.formState.errors.message.message}
                        </p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={contactForm.formState.isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        'w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50',
                        isArabic && 'flex-row-reverse font-arabic'
                      )}
                    >
                      {contactForm.formState.isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full inline-block"
                          />
                          {t.common.loading}
                        </span>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          {t.contact.send}
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cinema Club Registration Section */}
      <section
        ref={registrationRef}
        id="register"
        className="py-20 bg-gradient-to-b from-[var(--color-crimson)]/10 via-[var(--color-black-rich)] to-[var(--color-black-rich)]"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isRegistrationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn('text-center mb-12', isArabic && 'font-arabic')}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-gold)]/20 border border-[var(--color-gold)]/50 mb-6">
              <Film className="w-5 h-5 text-[var(--color-gold)]" />
              <span className="text-[var(--color-gold)] font-medium">
                {isArabic ? 'نادي البرنوصي السينمائي' : 'Cine-Club Bernoussi'}
              </span>
            </div>

            <h2 className={cn(
              'text-3xl md:text-4xl font-bold mb-4',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {t.registration.title}
            </h2>
            <p className="text-[var(--color-silver)] max-w-xl mx-auto">
              {t.registration.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isRegistrationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="card-cinematic p-8 ring-2 ring-[var(--color-gold)] ring-offset-2 ring-offset-[var(--color-black-rich)]">
              {registrationSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <p className={cn('text-xl text-[var(--color-gold)]', isArabic && 'font-arabic')}>
                    {t.registration.success}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={registrationForm.handleSubmit(onRegistrationSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="md:col-span-2">
                      <label className={cn('block text-sm text-[var(--color-silver)] mb-2', isArabic && 'font-arabic text-right')}>
                        {t.registration.fullName} *
                      </label>
                      <input
                        {...registrationForm.register('fullName')}
                        type="text"
                        className={cn('input-cinematic', isArabic && 'text-right font-arabic')}
                        dir={isArabic ? 'rtl' : 'ltr'}
                      />
                      {registrationForm.formState.errors.fullName && (
                        <p className={cn('text-red-400 text-xs mt-1', isArabic && 'text-right')}>
                          {registrationForm.formState.errors.fullName.message}
                        </p>
                      )}
                    </div>

                    {/* Age */}
                    <div>
                      <label className={cn('block text-sm text-[var(--color-silver)] mb-2', isArabic && 'font-arabic text-right')}>
                        {t.registration.age} *
                      </label>
                      <input
                        {...registrationForm.register('age')}
                        type="number"
                        min="10"
                        max="100"
                        className="input-cinematic text-center"
                      />
                      {registrationForm.formState.errors.age && (
                        <p className={cn('text-red-400 text-xs mt-1', isArabic && 'text-right')}>
                          {registrationForm.formState.errors.age.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className={cn('block text-sm text-[var(--color-silver)] mb-2', isArabic && 'font-arabic text-right')}>
                        {t.registration.phone} *
                      </label>
                      <input
                        {...registrationForm.register('phone')}
                        type="tel"
                        className="input-cinematic"
                        dir="ltr"
                      />
                      {registrationForm.formState.errors.phone && (
                        <p className={cn('text-red-400 text-xs mt-1', isArabic && 'text-right')}>
                          {registrationForm.formState.errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2">
                      <label className={cn('block text-sm text-[var(--color-silver)] mb-2', isArabic && 'font-arabic text-right')}>
                        {t.registration.email} *
                      </label>
                      <input
                        {...registrationForm.register('email')}
                        type="email"
                        className="input-cinematic"
                        dir="ltr"
                      />
                      {registrationForm.formState.errors.email && (
                        <p className={cn('text-red-400 text-xs mt-1', isArabic && 'text-right')}>
                          {registrationForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Motivation */}
                    <div className="md:col-span-2">
                      <label className={cn('block text-sm text-[var(--color-silver)] mb-2', isArabic && 'font-arabic text-right')}>
                        {t.registration.motivation} *
                      </label>
                      <textarea
                        {...registrationForm.register('motivation')}
                        rows={4}
                        className={cn('input-cinematic resize-none', isArabic && 'text-right font-arabic')}
                        dir={isArabic ? 'rtl' : 'ltr'}
                      />
                      {registrationForm.formState.errors.motivation && (
                        <p className={cn('text-red-400 text-xs mt-1', isArabic && 'text-right')}>
                          {registrationForm.formState.errors.motivation.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={registrationForm.formState.isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'w-full btn-gold text-lg py-4 disabled:opacity-50',
                      isArabic && 'font-arabic'
                    )}
                  >
                    {registrationForm.formState.isSubmitting ? (
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
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
