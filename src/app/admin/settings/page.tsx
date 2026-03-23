'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { Save, Phone, Mail, MapPin, Clock, Globe, Loader2, Tag } from 'lucide-react';

interface SettingField {
  key: string;
  labelAr: string;
  labelFr: string;
  icon: React.ElementType;
  type?: 'text' | 'url' | 'email' | 'tel';
  placeholder?: string;
  section: 'branding' | 'contact' | 'social';
}

const settingFields: SettingField[] = [
  // Branding
  { key: 'club_name_ar', labelAr: 'اسم النادي السينمائي (عربي)', labelFr: 'Nom du Cine-Club (Arabe)', icon: Tag, section: 'branding', placeholder: 'نادي سينما السلام البرنوصي' },
  { key: 'club_name_fr', labelAr: 'اسم النادي السينمائي (فرنسي)', labelFr: 'Nom du Cine-Club (Francais)', icon: Tag, section: 'branding', placeholder: 'Cine-Club Bernoussi' },
  { key: 'association_name_ar', labelAr: 'اسم الجمعية (عربي)', labelFr: 'Nom de l\'Association (Arabe)', icon: Tag, section: 'branding', placeholder: 'جمعية الكرامة للمسرح والسينما' },
  { key: 'association_name_fr', labelAr: 'اسم الجمعية (فرنسي)', labelFr: 'Nom de l\'Association (Francais)', icon: Tag, section: 'branding', placeholder: 'Association Al-Karama' },
  { key: 'association_slogan_ar', labelAr: 'شعار الجمعية (عربي)', labelFr: 'Slogan (Arabe)', icon: Tag, section: 'branding', placeholder: 'للمسرح والسينما' },
  { key: 'association_slogan_fr', labelAr: 'شعار الجمعية (فرنسي)', labelFr: 'Slogan (Francais)', icon: Tag, section: 'branding', placeholder: 'Theatre & Cinema' },
  // Contact
  { key: 'phone', labelAr: 'رقم الهاتف', labelFr: 'Telephone', icon: Phone, type: 'tel', section: 'contact', placeholder: '+212 6XX XXX XXX' },
  { key: 'email', labelAr: 'البريد الإلكتروني', labelFr: 'Email', icon: Mail, type: 'email', section: 'contact', placeholder: 'contact@alkarama.ma' },
  { key: 'address_ar', labelAr: 'العنوان (عربي)', labelFr: 'Adresse (Arabe)', icon: MapPin, section: 'contact' },
  { key: 'address_fr', labelAr: 'العنوان (فرنسي)', labelFr: 'Adresse (Francais)', icon: MapPin, section: 'contact' },
  { key: 'hours_ar', labelAr: 'ساعات العمل (عربي)', labelFr: 'Horaires (Arabe)', icon: Clock, section: 'contact' },
  { key: 'hours_fr', labelAr: 'ساعات العمل (فرنسي)', labelFr: 'Horaires (Francais)', icon: Clock, section: 'contact' },
  // Social
  { key: 'facebook_url', labelAr: 'رابط فيسبوك', labelFr: 'Lien Facebook', icon: Globe, type: 'url', section: 'social', placeholder: 'https://facebook.com/...' },
  { key: 'instagram_url', labelAr: 'رابط إنستغرام', labelFr: 'Lien Instagram', icon: Globe, type: 'url', section: 'social', placeholder: 'https://instagram.com/...' },
  { key: 'youtube_url', labelAr: 'رابط يوتيوب', labelFr: 'Lien YouTube', icon: Globe, type: 'url', section: 'social', placeholder: 'https://youtube.com/...' },
  { key: 'twitter_url', labelAr: 'رابط تويتر', labelFr: 'Lien Twitter', icon: Globe, type: 'url', section: 'social', placeholder: 'https://twitter.com/...' },
  { key: 'map_url', labelAr: 'رابط خرائط جوجل', labelFr: 'Lien Google Maps', icon: MapPin, type: 'url', section: 'social', placeholder: 'https://maps.google.com/...' },
];

export default function SettingsPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) {
        console.error('Error fetching settings:', error);
        setLoading(false);
        return;
      }

      const vals: Record<string, string> = {};
      if (data) {
        for (const row of data) {
          vals[row.key] = row.value;
        }
      }
      setValues(vals);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();

    for (const field of settingFields) {
      const value = values[field.key] || '';
      const { error } = await supabase
        .from('site_settings')
        .upsert(
          { key: field.key, value },
          { onConflict: 'key' }
        );
      if (error) {
        console.error(`Error saving ${field.key}:`, error);
      }
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-gold)]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white font-arabic">
          {isAr ? 'إعدادات الموقع' : 'Parametres du site'}
        </h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--color-gold)] text-black rounded-lg hover:bg-[var(--color-gold-dark)] transition-colors disabled:opacity-50 font-arabic"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {saved ? (isAr ? 'تم الحفظ!' : 'Enregistre!') : (isAr ? 'حفظ' : 'Enregistrer')}
        </button>
      </div>

      {/* Branding Section */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-[var(--color-gold)] mb-4 font-arabic flex items-center gap-2">
          <Tag className="w-5 h-5" />
          {isAr ? 'الهوية والتسمية' : 'Identite et Noms'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingFields.filter(f => f.section === 'branding').map((field) => (
            <div key={field.key} className="p-4 rounded-lg bg-[var(--color-charcoal)] border border-[var(--color-gold)]/30">
              <label className="flex items-center gap-2 text-sm text-[var(--color-gray-light)] mb-2 font-arabic">
                <field.icon className="w-4 h-4 text-[var(--color-gold)]" />
                {isAr ? field.labelAr : field.labelFr}
              </label>
              <input
                type="text"
                value={values[field.key] || ''}
                onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 bg-[var(--color-black-soft)] border border-[var(--color-gray-dark)] rounded-lg text-white placeholder-[var(--color-gray-medium)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                dir={field.key.endsWith('_ar') ? 'rtl' : 'ltr'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-[var(--color-gold)] mb-4 font-arabic flex items-center gap-2">
          <Phone className="w-5 h-5" />
          {isAr ? 'معلومات الاتصال' : 'Informations de Contact'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingFields.filter(f => f.section === 'contact').map((field) => (
            <div key={field.key} className="p-4 rounded-lg bg-[var(--color-charcoal)] border border-[var(--color-gray-dark)]">
              <label className="flex items-center gap-2 text-sm text-[var(--color-gray-light)] mb-2 font-arabic">
                <field.icon className="w-4 h-4 text-[var(--color-gold)]" />
                {isAr ? field.labelAr : field.labelFr}
              </label>
              <input
                type={field.type || 'text'}
                value={values[field.key] || ''}
                onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 bg-[var(--color-black-soft)] border border-[var(--color-gray-dark)] rounded-lg text-white placeholder-[var(--color-gray-medium)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                dir={field.key.endsWith('_ar') ? 'rtl' : 'ltr'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Social Section */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-[var(--color-gold)] mb-4 font-arabic flex items-center gap-2">
          <Globe className="w-5 h-5" />
          {isAr ? 'الروابط الاجتماعية' : 'Liens Sociaux'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingFields.filter(f => f.section === 'social').map((field) => (
            <div key={field.key} className="p-4 rounded-lg bg-[var(--color-charcoal)] border border-[var(--color-gray-dark)]">
              <label className="flex items-center gap-2 text-sm text-[var(--color-gray-light)] mb-2 font-arabic">
                <field.icon className="w-4 h-4 text-[var(--color-gold)]" />
                {isAr ? field.labelAr : field.labelFr}
              </label>
              <input
                type={field.type || 'text'}
                value={values[field.key] || ''}
                onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 bg-[var(--color-black-soft)] border border-[var(--color-gray-dark)] rounded-lg text-white placeholder-[var(--color-gray-medium)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                dir="ltr"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 rounded-lg bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20">
        <p className="text-sm text-[var(--color-gold)] font-arabic">
          {isAr
            ? 'هذه الإعدادات تظهر في جميع صفحات الموقع. بعد الحفظ، قم بتحديث الصفحة لرؤية التغييرات.'
            : 'Ces parametres apparaissent sur toutes les pages du site. Apres l\'enregistrement, actualisez la page pour voir les changements.'}
        </p>
      </div>
    </div>
  );
}
