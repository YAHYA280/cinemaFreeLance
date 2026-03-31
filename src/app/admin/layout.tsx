'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { adminTranslations } from '@/i18n/admin-translations';
import { createClient } from '@/utils/supabase/client';
import {
  LayoutDashboard,
  Image,
  FileText,
  Layers,
  Database,
  Settings,
  Video,
  ArrowLeft,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const t = adminTranslations[language];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const isAr = language === 'ar';
  const navItems = [
    { href: '/admin', label: t.sidebar.dashboard, icon: LayoutDashboard },
    { href: '/admin/content', label: isAr ? 'إدارة المحتوى' : 'Contenu', icon: Database },
    { href: '/admin/photos', label: t.sidebar.photos, icon: Image },
    { href: '/admin/blogs', label: t.sidebar.blogs, icon: FileText },
    { href: '/admin/videos', label: isAr ? 'الفيديوهات' : 'Videos', icon: Video },
    { href: '/admin/sections', label: t.sidebar.sections, icon: Layers },
    { href: '/admin/settings', label: isAr ? 'الإعدادات' : 'Parametres', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} h-full w-64 bg-[var(--color-charcoal)] border-${language === 'ar' ? 'l' : 'r'} border-[var(--color-gray-dark)] z-50 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[var(--color-gray-dark)]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[var(--color-gold)] font-arabic">
              {t.sidebar.dashboard}
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-[var(--color-gray-light)] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'ar' ? 'fr' : 'ar')}
            className="mt-3 px-3 py-1 text-xs border border-[var(--color-gold-dark)] text-[var(--color-gold)] rounded hover:bg-[var(--color-gold)] hover:text-black transition-all"
          >
            {language === 'ar' ? 'Français' : 'العربية'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-arabic transition-all ${
                isActive(item.href)
                  ? 'bg-[var(--color-red-primary)] text-white'
                  : 'text-[var(--color-gray-light)] hover:bg-[var(--color-black-soft)] hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--color-gray-dark)] space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-[var(--color-gray-light)] hover:bg-[var(--color-black-soft)] hover:text-white transition-all font-arabic"
          >
            <ArrowLeft className="w-5 h-5 flex-shrink-0" />
            {t.sidebar.backToSite}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-900/20 w-full transition-all font-arabic"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {t.sidebar.logout}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${language === 'ar' ? 'mr-0 lg:mr-64' : 'ml-0 lg:ml-64'}`}>
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-[var(--color-charcoal)] border-b border-[var(--color-gray-dark)] px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[var(--color-gray-light)] hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-[var(--color-gold)] font-bold font-arabic">{t.sidebar.dashboard}</h1>
          <div className="w-6" />
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
