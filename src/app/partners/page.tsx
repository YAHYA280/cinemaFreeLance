'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Landmark, Handshake, Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const partners = [
  {
    id: 1,
    nameAr: 'المديرية الإقليمية لوزارة الثقافة - قطاع الشباب',
    nameFr: 'Direction Provinciale du Ministere de la Culture - Secteur Jeunesse',
    descAr: 'شريك استراتيجي في دعم الفعاليات الثقافية والمهرجانات',
    descFr: 'Partenaire strategique dans le soutien des evenements culturels et festivals',
    logo: '/Logo/ministry-culture-logo.png',
    color: 'var(--color-crimson)',
    tier: 'strategic',
  },
  {
    id: 2,
    nameAr: 'المديرية الإقليمية لوزارة التربية الوطنية',
    nameFr: 'Direction Provinciale du Ministere de l\'Education Nationale',
    descAr: 'شراكة في إطار برنامج الأندية المدرسية والتربية على الصورة',
    descFr: 'Partenariat dans le cadre du programme des clubs scolaires et d\'education a l\'image',
    logo: '/Logo/ministry-education-logo.png',
    color: 'var(--color-gold)',
    tier: 'strategic',
  },
  {
    id: 3,
    nameAr: 'المركز السينمائي المغربي',
    nameFr: 'Centre Cinematographique Marocain (CCM)',
    descAr: 'دعم تقني وفني للعروض السينمائية وبرامج التكوين',
    descFr: 'Soutien technique et artistique pour les projections et programmes de formation',
    logo: '/Logo/ccm-logo.png',
    color: 'var(--color-teal)',
    tier: 'strategic',
  },
  {
    id: 4,
    nameAr: 'عمالة سيدي البرنوصي',
    nameFr: 'Prefecture de Sidi Bernoussi',
    descAr: 'دعم لوجستي ومؤسساتي للأنشطة المحلية',
    descFr: 'Soutien logistique et institutionnel pour les activites locales',
    logo: null, // No logo provided
    icon: Landmark,
    color: 'var(--color-terracotta)',
    tier: 'institutional',
  },
  {
    id: 5,
    nameAr: 'دار الشباب سيدي البرنوصي',
    nameFr: 'Maison des Jeunes Sidi Bernoussi',
    descAr: 'مقر الجمعية وشريك في تنظيم الفعاليات',
    descFr: 'Siege de l\'association et partenaire dans l\'organisation des evenements',
    logo: '/Logo/dar-chabab-logo.jpg',
    color: 'var(--color-gold-dark)',
    tier: 'institutional',
  },
];

const testimonials = [
  {
    quoteAr: 'جمعية الكرامة شريك أساسي في نشر الثقافة السينمائية بالمنطقة. تجربتهم في إنشاء الأندية السينمائية نموذجية.',
    quoteFr: 'L\'association Al-Karama est un partenaire essentiel dans la diffusion de la culture cinematographique dans la region. Leur experience dans la creation de cine-clubs est exemplaire.',
    authorAr: 'مسؤول بالمركز السينمائي المغربي',
    authorFr: 'Responsable au CCM',
  },
  {
    quoteAr: 'برنامج تكوين المكونين أضاف قيمة حقيقية لأطرنا التربوية في مجال التربية على الصورة.',
    quoteFr: 'Le programme de formation des formateurs a apporte une vraie valeur ajoutee a nos cadres educatifs dans le domaine de l\'education a l\'image.',
    authorAr: 'مفتش تربوي',
    authorFr: 'Inspecteur educatif',
  },
];

export default function PartnersPage() {
  const { t, isArabic } = useLanguage();

  const heroRef = React.useRef(null);
  const partnersRef = React.useRef(null);
  const testimonialsRef = React.useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isPartnersInView = useInView(partnersRef, { once: true, margin: '-100px' });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });

  const strategicPartners = partners.filter(p => p.tier === 'strategic');
  const institutionalPartners = partners.filter(p => p.tier === 'institutional');

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
            <motion.div
              initial={{ scale: 0 }}
              animate={isHeroInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, type: 'spring' }}
              className="inline-block mb-8"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[var(--color-gold-dark)] to-[var(--color-gold)] flex items-center justify-center">
                <Handshake className="w-12 h-12 text-[var(--color-black-rich)]" />
              </div>
            </motion.div>

            <h1 className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-bold mb-6',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {t.partners.title}
            </h1>

            <p className="text-xl text-[var(--color-champagne)] max-w-2xl mx-auto">
              {t.partners.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section ref={partnersRef} className="py-20 bg-[var(--color-black-soft)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isPartnersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn('text-center mb-16', isArabic && 'font-arabic')}
          >
            <h2 className={cn(
              'text-2xl md:text-3xl font-bold mb-4 text-[var(--color-gold)]',
              isArabic && 'font-arabic'
            )}>
              {isArabic ? 'الشركاء الاستراتيجيون' : 'Partenaires Strategiques'}
            </h2>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {strategicPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isPartnersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={cn(
                  'group p-8 rounded-lg glass border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/30 transition-all text-center',
                  isArabic && 'font-arabic'
                )}
              >
                <div className="w-36 h-36 mx-auto mb-6 rounded-xl bg-white flex items-center justify-center p-4 shadow-lg shadow-black/20 transition-transform group-hover:scale-105">
                  {partner.logo && (
                    <Image
                      src={partner.logo}
                      alt={isArabic ? partner.nameAr : partner.nameFr}
                      width={120}
                      height={120}
                      className="object-contain w-full h-full"
                    />
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--color-gold)] transition-colors">
                  {isArabic ? partner.nameAr : partner.nameFr}
                </h3>

                <p className="text-[var(--color-silver)] text-sm">
                  {isArabic ? partner.descAr : partner.descFr}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Institutional Partners */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isPartnersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={cn('text-center mb-12', isArabic && 'font-arabic')}
          >
            <h2 className={cn(
              'text-2xl md:text-3xl font-bold mb-4 text-[var(--color-gold)]',
              isArabic && 'font-arabic'
            )}>
              {isArabic ? 'الشركاء المؤسساتيون' : 'Partenaires Institutionnels'}
            </h2>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {institutionalPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
                animate={isPartnersInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className={cn(
                  'group flex items-center gap-6 p-6 rounded-lg glass border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/30 transition-all',
                  isArabic && 'flex-row-reverse'
                )}
              >
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-lg bg-white/95 flex items-center justify-center p-2 transition-transform group-hover:scale-110 overflow-hidden"
                >
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={isArabic ? partner.nameAr : partner.nameFr}
                      width={56}
                      height={56}
                      className="object-contain w-full h-full"
                    />
                  ) : partner.icon ? (
                    <partner.icon className="w-8 h-8" style={{ color: partner.color }} />
                  ) : null}
                </div>

                <div className={cn(isArabic && 'text-right')}>
                  <h3 className={cn('text-lg font-bold text-white mb-1', isArabic && 'font-arabic')}>
                    {isArabic ? partner.nameAr : partner.nameFr}
                  </h3>
                  <p className={cn('text-[var(--color-silver)] text-sm', isArabic && 'font-arabic')}>
                    {isArabic ? partner.descAr : partner.descFr}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 bg-[var(--color-black-rich)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={cn('text-center mb-16', isArabic && 'font-arabic')}
          >
            <h2 className={cn(
              'text-2xl md:text-3xl font-bold mb-4',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {isArabic ? 'شهادات شركائنا' : 'Temoignages de nos partenaires'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={cn(
                  'relative p-8 rounded-lg glass border border-[var(--color-gold)]/10',
                  isArabic && 'text-right'
                )}
              >
                <Quote className="absolute top-4 left-4 w-8 h-8 text-[var(--color-gold)]/20" />

                <p className={cn(
                  'text-[var(--color-silver)] text-lg leading-relaxed mb-6 pt-6',
                  isArabic && 'font-arabic'
                )}>
                  "{isArabic ? testimonial.quoteAr : testimonial.quoteFr}"
                </p>

                <div className={cn('flex items-center gap-3', isArabic && 'flex-row-reverse')}>
                  <div className="w-10 h-10 rounded-full bg-[var(--color-crimson)]/20 flex items-center justify-center">
                    <span className="text-[var(--color-crimson)] font-bold">
                      {(isArabic ? testimonial.authorAr : testimonial.authorFr).charAt(0)}
                    </span>
                  </div>
                  <span className={cn('text-[var(--color-gold)] font-medium', isArabic && 'font-arabic')}>
                    {isArabic ? testimonial.authorAr : testimonial.authorFr}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--color-crimson)]/10 via-[var(--color-charcoal)] to-[var(--color-gold)]/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={cn(isArabic && 'font-arabic')}
          >
            <h2 className={cn(
              'text-2xl md:text-3xl font-bold mb-4',
              isArabic ? 'text-gradient-gold' : 'heading-display text-white'
            )}>
              {isArabic ? 'هل تريد أن تصبح شريكاً؟' : 'Vous souhaitez devenir partenaire ?'}
            </h2>
            <p className="text-[var(--color-silver)] mb-8 max-w-xl mx-auto">
              {isArabic
                ? 'انضم إلى شبكة شركائنا وساهم في نشر الثقافة السينمائية والمسرحية'
                : 'Rejoignez notre reseau de partenaires et contribuez a la diffusion de la culture cinematographique et theatrale'}
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gold text-lg px-10 py-4 inline-block"
            >
              {t.contact.title}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
