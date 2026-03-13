'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ContentManager, { FieldConfig } from '@/components/admin/ContentManager';
import { Users, Handshake, Film, Theater, Calendar, Newspaper, MessageSquare, GraduationCap, Award } from 'lucide-react';

const TABS = [
  { id: 'partners', iconEl: Handshake, ar: 'الشركاء', fr: 'Partenaires' },
  { id: 'board', iconEl: Users, ar: 'المكتب المسير', fr: 'Bureau' },
  { id: 'timeline', iconEl: Calendar, ar: 'المسار', fr: 'Timeline' },
  { id: 'screenings', iconEl: Film, ar: 'العروض', fr: 'Projections' },
  { id: 'masterclasses', iconEl: GraduationCap, ar: 'ماستر كلاس', fr: 'Masterclass' },
  { id: 'productions', iconEl: Theater, ar: 'المسرحيات', fr: 'Productions' },
  { id: 'festivals', iconEl: Award, ar: 'المهرجانات', fr: 'Festivals' },
  { id: 'news', iconEl: Newspaper, ar: 'الأخبار', fr: 'Actualites' },
  { id: 'testimonials', iconEl: MessageSquare, ar: 'الشهادات', fr: 'Temoignages' },
];

// Field configs for each content type
const partnersFields: FieldConfig[] = [
  { key: 'name_ar', labelAr: 'الاسم بالعربية', labelFr: 'Nom en arabe', type: 'text', required: true },
  { key: 'name_fr', labelAr: 'الاسم بالفرنسية', labelFr: 'Nom en francais', type: 'text', required: true },
  { key: 'description_ar', labelAr: 'الوصف بالعربية', labelFr: 'Description en arabe', type: 'textarea' },
  { key: 'description_fr', labelAr: 'الوصف بالفرنسية', labelFr: 'Description en francais', type: 'textarea' },
  { key: 'logo_url', labelAr: 'الشعار', labelFr: 'Logo', type: 'image' },
  { key: 'tier', labelAr: 'المستوى', labelFr: 'Niveau', type: 'select', options: [
    { value: 'strategic', labelAr: 'استراتيجي', labelFr: 'Strategique' },
    { value: 'institutional', labelAr: 'مؤسساتي', labelFr: 'Institutionnel' },
  ]},
  { key: 'display_order', labelAr: 'الترتيب', labelFr: 'Ordre', type: 'number' },
];

const boardFields: FieldConfig[] = [
  { key: 'name_ar', labelAr: 'الاسم بالعربية', labelFr: 'Nom en arabe', type: 'text', required: true },
  { key: 'name_fr', labelAr: 'الاسم بالفرنسية', labelFr: 'Nom en francais', type: 'text', required: true },
  { key: 'role_ar', labelAr: 'المنصب بالعربية', labelFr: 'Poste en arabe', type: 'text', required: true },
  { key: 'role_fr', labelAr: 'المنصب بالفرنسية', labelFr: 'Poste en francais', type: 'text', required: true },
  { key: 'photo_url', labelAr: 'الصورة', labelFr: 'Photo', type: 'image' },
  { key: 'display_order', labelAr: 'الترتيب', labelFr: 'Ordre', type: 'number' },
];

const timelineFields: FieldConfig[] = [
  { key: 'year', labelAr: 'السنة', labelFr: 'Annee', type: 'text', required: true },
  { key: 'title_ar', labelAr: 'العنوان بالعربية', labelFr: 'Titre en arabe', type: 'text', required: true },
  { key: 'title_fr', labelAr: 'العنوان بالفرنسية', labelFr: 'Titre en francais', type: 'text', required: true },
  { key: 'description_ar', labelAr: 'الوصف بالعربية', labelFr: 'Description en arabe', type: 'textarea' },
  { key: 'description_fr', labelAr: 'الوصف بالفرنسية', labelFr: 'Description en francais', type: 'textarea' },
  { key: 'display_order', labelAr: 'الترتيب', labelFr: 'Ordre', type: 'number' },
];

const screeningsFields: FieldConfig[] = [
  { key: 'title_ar', labelAr: 'العنوان بالعربية', labelFr: 'Titre en arabe', type: 'text', required: true },
  { key: 'title_fr', labelAr: 'العنوان بالفرنسية', labelFr: 'Titre en francais', type: 'text', required: true },
  { key: 'director_ar', labelAr: 'المخرج بالعربية', labelFr: 'Realisateur en arabe', type: 'text' },
  { key: 'director_fr', labelAr: 'المخرج بالفرنسية', labelFr: 'Realisateur en francais', type: 'text' },
  { key: 'year', labelAr: 'سنة الإنتاج', labelFr: 'Annee de production', type: 'number', defaultValue: 2024 },
  { key: 'country_ar', labelAr: 'البلد بالعربية', labelFr: 'Pays en arabe', type: 'text' },
  { key: 'country_fr', labelAr: 'البلد بالفرنسية', labelFr: 'Pays en francais', type: 'text' },
  { key: 'genre_ar', labelAr: 'النوع بالعربية', labelFr: 'Genre en arabe', type: 'text' },
  { key: 'genre_fr', labelAr: 'النوع بالفرنسية', labelFr: 'Genre en francais', type: 'text' },
  { key: 'duration', labelAr: 'المدة (دقيقة)', labelFr: 'Duree (min)', type: 'number', defaultValue: 90 },
  { key: 'date', labelAr: 'تاريخ العرض', labelFr: 'Date de projection', type: 'text' },
  { key: 'time', labelAr: 'الوقت', labelFr: 'Heure', type: 'text' },
  { key: 'discussion_with_ar', labelAr: 'ضيف النقاش بالعربية', labelFr: 'Invite du debat en arabe', type: 'text' },
  { key: 'discussion_with_fr', labelAr: 'ضيف النقاش بالفرنسية', labelFr: 'Invite du debat en francais', type: 'text' },
  { key: 'synopsis_ar', labelAr: 'الملخص بالعربية', labelFr: 'Synopsis en arabe', type: 'textarea' },
  { key: 'synopsis_fr', labelAr: 'الملخص بالفرنسية', labelFr: 'Synopsis en francais', type: 'textarea' },
  { key: 'is_opening', labelAr: 'عرض افتتاحي', labelFr: 'Seance d\'ouverture', type: 'boolean' },
  { key: 'is_past', labelAr: 'عرض سابق', labelFr: 'Projection passee', type: 'boolean' },
  { key: 'display_order', labelAr: 'الترتيب', labelFr: 'Ordre', type: 'number' },
];

const masterclassFields: FieldConfig[] = [
  { key: 'title_ar', labelAr: 'العنوان بالعربية', labelFr: 'Titre en arabe', type: 'text', required: true },
  { key: 'title_fr', labelAr: 'العنوان بالفرنسية', labelFr: 'Titre en francais', type: 'text', required: true },
  { key: 'guest_ar', labelAr: 'الضيف بالعربية', labelFr: 'Invite en arabe', type: 'text' },
  { key: 'guest_fr', labelAr: 'الضيف بالفرنسية', labelFr: 'Invite en francais', type: 'text' },
  { key: 'role_ar', labelAr: 'صفة الضيف بالعربية', labelFr: 'Role de l\'invite en arabe', type: 'text' },
  { key: 'role_fr', labelAr: 'صفة الضيف بالفرنسية', labelFr: 'Role de l\'invite en francais', type: 'text' },
  { key: 'date', labelAr: 'التاريخ', labelFr: 'Date', type: 'text' },
  { key: 'topic_ar', labelAr: 'الموضوع بالعربية', labelFr: 'Sujet en arabe', type: 'textarea' },
  { key: 'topic_fr', labelAr: 'الموضوع بالفرنسية', labelFr: 'Sujet en francais', type: 'textarea' },
  { key: 'display_order', labelAr: 'الترتيب', labelFr: 'Ordre', type: 'number' },
];

const productionsFields: FieldConfig[] = [
  { key: 'title_ar', labelAr: 'العنوان بالعربية', labelFr: 'Titre en arabe', type: 'text', required: true },
  { key: 'title_fr', labelAr: 'العنوان بالفرنسية', labelFr: 'Titre en francais', type: 'text', required: true },
  { key: 'year', labelAr: 'السنة', labelFr: 'Annee', type: 'number', defaultValue: 2024 },
  { key: 'genre_ar', labelAr: 'النوع بالعربية', labelFr: 'Genre en arabe', type: 'text' },
  { key: 'genre_fr', labelAr: 'النوع بالفرنسية', labelFr: 'Genre en francais', type: 'text' },
  { key: 'synopsis_ar', labelAr: 'الملخص بالعربية', labelFr: 'Synopsis en arabe', type: 'textarea' },
  { key: 'synopsis_fr', labelAr: 'الملخص بالفرنسية', labelFr: 'Synopsis en francais', type: 'textarea' },
  { key: 'duration', labelAr: 'المدة (دقيقة)', labelFr: 'Duree (min)', type: 'number', defaultValue: 60 },
  { key: 'cast_count', labelAr: 'عدد الممثلين', labelFr: 'Nombre d\'acteurs', type: 'number' },
  { key: 'is_featured', labelAr: 'عرض مميز', labelFr: 'Production vedette', type: 'boolean' },
  { key: 'display_order', labelAr: 'الترتيب', labelFr: 'Ordre', type: 'number' },
];

const festivalsFields: FieldConfig[] = [
  { key: 'name_ar', labelAr: 'الاسم بالعربية', labelFr: 'Nom en arabe', type: 'text', required: true },
  { key: 'name_fr', labelAr: 'الاسم بالفرنسية', labelFr: 'Nom en francais', type: 'text', required: true },
  { key: 'year', labelAr: 'السنة', labelFr: 'Annee', type: 'number', defaultValue: 2024 },
  { key: 'award_ar', labelAr: 'الجائزة بالعربية', labelFr: 'Prix en arabe', type: 'text' },
  { key: 'award_fr', labelAr: 'الجائزة بالفرنسية', labelFr: 'Prix en francais', type: 'text' },
  { key: 'display_order', labelAr: 'الترتيب', labelFr: 'Ordre', type: 'number' },
];

const newsFields: FieldConfig[] = [
  { key: 'title_ar', labelAr: 'العنوان بالعربية', labelFr: 'Titre en arabe', type: 'text', required: true },
  { key: 'title_fr', labelAr: 'العنوان بالفرنسية', labelFr: 'Titre en francais', type: 'text', required: true },
  { key: 'excerpt_ar', labelAr: 'الملخص بالعربية', labelFr: 'Resume en arabe', type: 'textarea' },
  { key: 'excerpt_fr', labelAr: 'الملخص بالفرنسية', labelFr: 'Resume en francais', type: 'textarea' },
  { key: 'source', labelAr: 'المصدر', labelFr: 'Source', type: 'text' },
  { key: 'date', labelAr: 'التاريخ', labelFr: 'Date', type: 'text' },
  { key: 'category_ar', labelAr: 'التصنيف بالعربية', labelFr: 'Categorie en arabe', type: 'text' },
  { key: 'category_fr', labelAr: 'التصنيف بالفرنسية', labelFr: 'Categorie en francais', type: 'text' },
  { key: 'image_url', labelAr: 'الصورة', labelFr: 'Image', type: 'image' },
  { key: 'display_order', labelAr: 'الترتيب', labelFr: 'Ordre', type: 'number' },
];

const testimonialsFields: FieldConfig[] = [
  { key: 'quote_ar', labelAr: 'الاقتباس بالعربية', labelFr: 'Citation en arabe', type: 'textarea', required: true },
  { key: 'quote_fr', labelAr: 'الاقتباس بالفرنسية', labelFr: 'Citation en francais', type: 'textarea', required: true },
  { key: 'author_ar', labelAr: 'المؤلف بالعربية', labelFr: 'Auteur en arabe', type: 'text' },
  { key: 'author_fr', labelAr: 'المؤلف بالفرنسية', labelFr: 'Auteur en francais', type: 'text' },
  { key: 'display_order', labelAr: 'الترتيب', labelFr: 'Ordre', type: 'number' },
];

const TAB_CONFIG: Record<string, { table: string; titleAr: string; titleFr: string; fields: FieldConfig[]; displayField: string }> = {
  partners: { table: 'partners', titleAr: 'الشركاء', titleFr: 'Partenaires', fields: partnersFields, displayField: 'name_ar' },
  board: { table: 'board_members', titleAr: 'أعضاء المكتب', titleFr: 'Membres du Bureau', fields: boardFields, displayField: 'name_ar' },
  timeline: { table: 'timeline_events', titleAr: 'المسار الزمني', titleFr: 'Chronologie', fields: timelineFields, displayField: 'title_ar' },
  screenings: { table: 'screenings', titleAr: 'العروض السينمائية', titleFr: 'Projections', fields: screeningsFields, displayField: 'title_ar' },
  masterclasses: { table: 'masterclasses', titleAr: 'الماستر كلاس', titleFr: 'Masterclasses', fields: masterclassFields, displayField: 'title_ar' },
  productions: { table: 'productions', titleAr: 'الإنتاجات المسرحية', titleFr: 'Productions Theatrales', fields: productionsFields, displayField: 'title_ar' },
  festivals: { table: 'festivals', titleAr: 'المهرجانات', titleFr: 'Festivals', fields: festivalsFields, displayField: 'name_ar' },
  news: { table: 'news_articles', titleAr: 'الأخبار', titleFr: 'Actualites', fields: newsFields, displayField: 'title_ar' },
  testimonials: { table: 'testimonials', titleAr: 'الشهادات', titleFr: 'Temoignages', fields: testimonialsFields, displayField: 'quote_ar' },
};

export default function AdminContentPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState('partners');

  const config = TAB_CONFIG[activeTab];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--color-white-off)] font-arabic">
        {isAr ? 'إدارة المحتوى' : 'Gestion du Contenu'}
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-[var(--color-gray-dark)]">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all font-arabic ${
              activeTab === tab.id
                ? 'bg-[var(--color-gold)] text-black font-semibold'
                : 'text-[var(--color-gray-light)] hover:bg-[var(--color-charcoal)] hover:text-white'
            }`}
          >
            <tab.iconEl className="w-4 h-4" />
            {isAr ? tab.ar : tab.fr}
          </button>
        ))}
      </div>

      {/* Content Manager */}
      <ContentManager
        key={activeTab}
        table={config.table}
        titleAr={config.titleAr}
        titleFr={config.titleFr}
        fields={config.fields}
        displayField={config.displayField}
      />
    </div>
  );
}
