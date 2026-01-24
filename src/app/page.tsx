'use client';

import HeroSection from '@/components/home/HeroSection';
import AboutPreviewSection from '@/components/home/AboutPreviewSection';
import CinemaClubSection from '@/components/home/CinemaClubSection';
import MediaCoverageSection from '@/components/home/MediaCoverageSection';
import AboutPreview from '@/components/home/AboutPreview';
import NewsSection from '@/components/home/NewsSection';
import PartnersSection from '@/components/home/PartnersSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreviewSection />
      <CinemaClubSection />
      <MediaCoverageSection />
      <AboutPreview />
      <NewsSection />
      <PartnersSection />
    </>
  );
}
