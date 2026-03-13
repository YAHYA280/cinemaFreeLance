'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { adminTranslations } from '@/i18n/admin-translations';
import { Film } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const t = adminTranslations[language];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(t.login.error);
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-black-rich)] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,30,58,0.08)_0%,transparent_70%)]" />
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => setLanguage(language === 'ar' ? 'fr' : 'ar')}
          className="px-3 py-1.5 text-sm border border-[var(--color-gold-dark)] text-[var(--color-gold)] rounded hover:bg-[var(--color-gold)] hover:text-black transition-all"
        >
          {language === 'ar' ? 'FR' : 'عربي'}
        </button>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-curtain-dark)] border border-[var(--color-red-primary)] mb-4">
            <Film className="w-8 h-8 text-[var(--color-red-bright)]" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-white-off)] font-arabic">
            {t.login.title}
          </h1>
          <p className="text-[var(--color-gray-light)] mt-2 font-arabic">
            {t.login.subtitle}
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="bg-[var(--color-charcoal)] border border-[var(--color-gray-dark)] rounded-lg p-8 space-y-6"
        >
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-800 rounded text-red-300 text-sm text-center font-arabic">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-[var(--color-gray-light)] mb-2 font-arabic">
              {t.login.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-cinematic font-arabic"
              placeholder="adil@alkarama.org"
              required
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm text-[var(--color-gray-light)] mb-2 font-arabic">
              {t.login.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-cinematic"
              required
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--color-red-primary)] hover:bg-[var(--color-red-bright)] text-white font-semibold rounded transition-all disabled:opacity-50 font-arabic"
          >
            {loading ? t.login.loading : t.login.signIn}
          </button>
        </form>
      </div>
    </div>
  );
}
