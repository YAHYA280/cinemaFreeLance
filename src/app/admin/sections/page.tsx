'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { adminTranslations } from '@/i18n/admin-translations';
import { Plus, Trash2, Edit3, X, Eye, EyeOff, Upload, Loader2, GripVertical } from 'lucide-react';

interface Section {
  id: string;
  page: string;
  title_ar: string;
  title_fr: string;
  content_ar: string;
  content_fr: string;
  image_url: string;
  display_order: number;
  visible: boolean;
  created_at: string;
}

const PAGES = ['home', 'about', 'cinema', 'theatre', 'media'] as const;

export default function AdminSectionsPage() {
  const { language } = useLanguage();
  const t = adminTranslations[language];
  const isAr = language === 'ar';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [uploading, setUploading] = useState(false);
  const [filterPage, setFilterPage] = useState<string>('all');

  const [form, setForm] = useState({
    page: 'home' as string,
    title_ar: '',
    title_fr: '',
    content_ar: '',
    content_fr: '',
    image_url: '',
    display_order: 0,
    visible: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const supabase = createClient();

  const fetchSections = async () => {
    const { data } = await supabase
      .from('sections')
      .select('*')
      .order('page')
      .order('display_order', { ascending: true });
    setSections(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchSections(); }, []);

  const resetForm = () => {
    setForm({ page: 'home', title_ar: '', title_fr: '', content_ar: '', content_fr: '', image_url: '', display_order: 0, visible: true });
    setImageFile(null);
    setPreview('');
    setEditingSection(null);
    setShowForm(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split('.').pop();
    const fileName = `section-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('photos').upload(fileName, file);
    if (error) throw error;
    const { data } = supabase.storage.from('photos').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = form.image_url;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const payload = {
        page: form.page,
        title_ar: form.title_ar,
        title_fr: form.title_fr,
        content_ar: form.content_ar,
        content_fr: form.content_fr,
        image_url: imageUrl,
        display_order: form.display_order,
        visible: form.visible,
      };

      if (editingSection) {
        await supabase.from('sections').update(payload).eq('id', editingSection.id);
      } else {
        await supabase.from('sections').insert(payload);
      }

      resetForm();
      fetchSections();
    } catch (err) {
      console.error(err);
    }
    setUploading(false);
  };

  const handleEdit = (section: Section) => {
    setEditingSection(section);
    setForm({
      page: section.page,
      title_ar: section.title_ar,
      title_fr: section.title_fr,
      content_ar: section.content_ar,
      content_fr: section.content_fr,
      image_url: section.image_url,
      display_order: section.display_order,
      visible: section.visible,
    });
    setPreview(section.image_url);
    setShowForm(true);
  };

  const handleDelete = async (section: Section) => {
    if (!confirm(t.sections.confirmDelete)) return;
    await supabase.from('sections').delete().eq('id', section.id);
    fetchSections();
  };

  const toggleVisibility = async (section: Section) => {
    await supabase.from('sections').update({ visible: !section.visible }).eq('id', section.id);
    fetchSections();
  };

  const filteredSections = filterPage === 'all'
    ? sections
    : sections.filter(s => s.page === filterPage);

  const pageLabel = (page: string) => {
    const pages = t.sections.pages as Record<string, string>;
    return pages[page] || page;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-[var(--color-white-off)] font-arabic">
          {t.sections.title}
        </h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-terracotta)] text-white font-semibold rounded-lg hover:opacity-90 transition-all font-arabic"
        >
          <Plus className="w-5 h-5" />
          {t.sections.addNew}
        </button>
      </div>

      {/* Page Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterPage('all')}
          className={`px-3 py-1.5 rounded-full text-sm transition-all font-arabic ${
            filterPage === 'all'
              ? 'bg-[var(--color-terracotta)] text-white'
              : 'bg-[var(--color-charcoal)] text-[var(--color-gray-light)] hover:text-white'
          }`}
        >
          {isAr ? 'الكل' : 'Tout'}
        </button>
        {PAGES.map(page => (
          <button
            key={page}
            onClick={() => setFilterPage(page)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all font-arabic ${
              filterPage === page
                ? 'bg-[var(--color-terracotta)] text-white'
                : 'bg-[var(--color-charcoal)] text-[var(--color-gray-light)] hover:text-white'
            }`}
          >
            {pageLabel(page)}
          </button>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => resetForm()}>
          <div
            className="bg-[var(--color-charcoal)] border border-[var(--color-gray-dark)] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-gray-dark)]">
              <h2 className="text-lg font-bold text-white font-arabic">
                {editingSection ? t.sections.edit : t.sections.addNew}
              </h2>
              <button onClick={resetForm} className="text-[var(--color-gray-light)] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Page & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.sections.page}</label>
                  <select
                    value={form.page}
                    onChange={e => setForm({ ...form, page: e.target.value })}
                    className="input-cinematic font-arabic"
                  >
                    {PAGES.map(page => (
                      <option key={page} value={page}>{pageLabel(page)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.sections.order}</label>
                  <input
                    type="number"
                    value={form.display_order}
                    onChange={e => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                    className="input-cinematic"
                    min="0"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[var(--color-gray-dark)] rounded-xl p-6 text-center cursor-pointer hover:border-[var(--color-gold-dark)] transition-all"
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="max-h-32 mx-auto rounded-lg object-cover" />
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-[var(--color-gray-medium)]" />
                    <p className="text-sm text-[var(--color-gray-light)] font-arabic">{t.sections.image}</p>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </div>

              {/* Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.sections.titleAr}</label>
                  <input
                    type="text"
                    value={form.title_ar}
                    onChange={e => setForm({ ...form, title_ar: e.target.value })}
                    className="input-cinematic font-arabic"
                    dir="rtl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.sections.titleFr}</label>
                  <input
                    type="text"
                    value={form.title_fr}
                    onChange={e => setForm({ ...form, title_fr: e.target.value })}
                    className="input-cinematic"
                    dir="ltr"
                    required
                  />
                </div>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.sections.contentAr}</label>
                  <textarea
                    value={form.content_ar}
                    onChange={e => setForm({ ...form, content_ar: e.target.value })}
                    className="input-cinematic font-arabic h-32 resize-none"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.sections.contentFr}</label>
                  <textarea
                    value={form.content_fr}
                    onChange={e => setForm({ ...form, content_fr: e.target.value })}
                    className="input-cinematic h-32 resize-none"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Visibility toggle */}
              <div className="flex items-center gap-3">
                <label className="text-sm text-[var(--color-gray-light)] font-arabic">{t.sections.visible}</label>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, visible: !form.visible })}
                  className={`relative w-12 h-6 rounded-full transition-all ${
                    form.visible ? 'bg-green-600' : 'bg-[var(--color-gray-dark)]'
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                    form.visible ? (isAr ? 'left-0.5' : 'left-6') : (isAr ? 'left-6' : 'left-0.5')
                  }`} />
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--color-terracotta)] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-all font-arabic"
                >
                  {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  {uploading ? (isAr ? 'جاري الحفظ...' : 'Enregistrement...') : t.sections.save}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-[var(--color-gray-dark)] text-[var(--color-gray-light)] rounded-lg hover:bg-[var(--color-black-soft)] transition-all font-arabic"
                >
                  {t.sections.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sections List */}
      {loading ? (
        <div className="text-center py-16">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[var(--color-gold)]" />
        </div>
      ) : filteredSections.length === 0 ? (
        <div className="text-center py-16 text-[var(--color-gray-medium)] font-arabic">
          {t.sections.noSections}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSections.map(section => (
            <div
              key={section.id}
              className={`bg-[var(--color-charcoal)] border rounded-xl overflow-hidden transition-all ${
                section.visible
                  ? 'border-[var(--color-gray-dark)] hover:border-[var(--color-gray-medium)]'
                  : 'border-[var(--color-gray-dark)] opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-stretch">
                {/* Image */}
                {section.image_url && (
                  <div className="sm:w-40 h-28 sm:h-auto flex-shrink-0">
                    <img src={section.image_url} alt="" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-xs bg-[var(--color-black-soft)] text-[var(--color-terracotta)] border border-[var(--color-terracotta)]/30 font-arabic">
                          {pageLabel(section.page)}
                        </span>
                        <span className="text-xs text-[var(--color-gray-medium)] font-arabic">
                          #{section.display_order}
                        </span>
                        {!section.visible && (
                          <span className="px-2 py-0.5 rounded text-xs bg-yellow-900/30 text-yellow-400 border border-yellow-800 font-arabic">
                            {t.sections.hidden}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-white font-arabic">
                        {isAr ? section.title_ar : section.title_fr}
                      </h3>
                      <p className="text-sm text-[var(--color-gray-light)] mt-1 line-clamp-2 font-arabic">
                        {isAr ? section.content_ar : section.content_fr}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleVisibility(section)}
                        className="p-2 text-[var(--color-gray-light)] hover:text-white hover:bg-[var(--color-black-soft)] rounded-lg transition-all"
                      >
                        {section.visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEdit(section)}
                        className="p-2 text-[var(--color-gray-light)] hover:text-white hover:bg-[var(--color-black-soft)] rounded-lg transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(section)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
