'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { adminTranslations } from '@/i18n/admin-translations';
import { Image, FileText, Layers, Plus, Camera, PenLine, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { language } = useLanguage();
  const t = adminTranslations[language];
  const isAr = language === 'ar';

  const [stats, setStats] = useState({ photos: 0, blogs: 0, sections: 0, publishedBlogs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient();
      const [photosRes, blogsRes, sectionsRes, publishedRes] = await Promise.all([
        supabase.from('photos').select('id', { count: 'exact', head: true }),
        supabase.from('blogs').select('id', { count: 'exact', head: true }),
        supabase.from('sections').select('id', { count: 'exact', head: true }),
        supabase.from('blogs').select('id', { count: 'exact', head: true }).eq('published', true),
      ]);
      setStats({
        photos: photosRes.count || 0,
        blogs: blogsRes.count || 0,
        sections: sectionsRes.count || 0,
        publishedBlogs: publishedRes.count || 0,
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: t.dashboard.totalPhotos, value: stats.photos, icon: Image, color: 'var(--color-gold)' },
    { label: t.dashboard.totalBlogs, value: stats.blogs, icon: FileText, color: 'var(--color-red-primary)' },
    { label: t.dashboard.publishedBlogs, value: stats.publishedBlogs, icon: FileText, color: 'var(--color-teal)' },
    { label: t.dashboard.totalSections, value: stats.sections, icon: Layers, color: 'var(--color-terracotta)' },
  ];

  const quickActions = [
    { label: t.dashboard.addPhoto, href: '/admin/photos', icon: Camera, color: 'bg-amber-900/30 hover:bg-amber-900/50 border-amber-800' },
    { label: t.dashboard.addBlog, href: '/admin/blogs', icon: PenLine, color: 'bg-red-900/30 hover:bg-red-900/50 border-red-800' },
    { label: t.dashboard.addSection, href: '/admin/sections', icon: LayoutGrid, color: 'bg-teal-900/30 hover:bg-teal-900/50 border-teal-800' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl lg:text-3xl font-bold text-[var(--color-white-off)] font-arabic">
        {t.dashboard.welcome}
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className="bg-[var(--color-charcoal)] border border-[var(--color-gray-dark)] rounded-xl p-6 hover:border-[var(--color-gray-medium)] transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
              <span className="text-3xl font-bold text-[var(--color-white-off)]">
                {loading ? '—' : stat.value}
              </span>
            </div>
            <p className="text-sm text-[var(--color-gray-light)] font-arabic">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--color-white-off)] mb-4 font-arabic">
          {t.dashboard.quickActions}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className={`flex items-center gap-3 p-5 rounded-xl border ${action.color} transition-all font-arabic`}
            >
              <div className="w-10 h-10 rounded-lg bg-black/30 flex items-center justify-center">
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-white font-medium">{action.label}</span>
                <Plus className="w-4 h-4 text-white/50 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
