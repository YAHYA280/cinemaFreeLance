'use client';

import HeroSection from '@/components/home/HeroSection';
import CinemaClubSection from '@/components/home/CinemaClubSection';
import AboutPreview from '@/components/home/AboutPreview';
import NewsSection from '@/components/home/NewsSection';
import PartnersSection from '@/components/home/PartnersSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CinemaClubSection />
      <AboutPreview />
      <NewsSection />
      <PartnersSection />
    </>
  );
}
