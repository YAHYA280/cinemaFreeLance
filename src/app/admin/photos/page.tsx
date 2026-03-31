'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { adminTranslations } from '@/i18n/admin-translations';
import { Plus, Trash2, Edit3, X, Upload, Loader2 } from 'lucide-react';
import { getSupabaseErrorMessage } from '@/utils/supabase/error-handler';

interface Photo {
  id: string;
  title_ar: string;
  title_fr: string;
  description_ar: string;
  description_fr: string;
  image_url: string;
  category: string;
  display_order: number;
  created_at: string;
}

const CATEGORIES = ['general', 'cinema', 'theatre', 'events', 'training'] as const;

export default function AdminPhotosPage() {
  const { language } = useLanguage();
  const t = adminTranslations[language];
  const isAr = language === 'ar';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Form state
  const [form, setForm] = useState({
    title_ar: '',
    title_fr: '',
    description_ar: '',
    description_fr: '',
    category: 'general',
    image_url: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const supabase = createClient();

  const fetchPhotos = async () => {
    const { data } = await supabase
      .from('photos')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });
    setPhotos(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPhotos(); }, []);

  const resetForm = () => {
    setForm({ title_ar: '', title_fr: '', description_ar: '', description_fr: '', category: 'general', image_url: '' });
    setImageFile(null);
    setPreview('');
    setEditingPhoto(null);
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
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
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
        title_ar: form.title_ar,
        title_fr: form.title_fr,
        description_ar: form.description_ar,
        description_fr: form.description_fr,
        category: form.category,
        image_url: imageUrl,
      };

      if (editingPhoto) {
        const { error } = await supabase.from('photos').update(payload).eq('id', editingPhoto.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('photos').insert(payload);
        if (error) throw error;
      }

      setSaveMessage({ type: 'success', text: t.common.success });
      resetForm();
      fetchPhotos();
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setSaveMessage({ type: 'error', text: getSupabaseErrorMessage(err, language) });
      setTimeout(() => setSaveMessage(null), 5000);
    }
    setUploading(false);
  };

  const handleEdit = (photo: Photo) => {
    setEditingPhoto(photo);
    setForm({
      title_ar: photo.title_ar,
      title_fr: photo.title_fr,
      description_ar: photo.description_ar,
      description_fr: photo.description_fr,
      category: photo.category,
      image_url: photo.image_url,
    });
    setPreview(photo.image_url);
    setShowForm(true);
  };

  const handleDelete = async (photo: Photo) => {
    if (!confirm(t.photos.confirmDelete)) return;
    // Delete from storage if it's a supabase URL
    if (photo.image_url.includes('supabase')) {
      const path = photo.image_url.split('/photos/')[1];
      if (path) await supabase.storage.from('photos').remove([path]);
    }
    await supabase.from('photos').delete().eq('id', photo.id);
    fetchPhotos();
  };

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(p => p.category === selectedCategory);

  const categoryLabel = (cat: string) => {
    const cats = t.photos.categories as Record<string, string>;
    return cats[cat] || cat;
  };

  return (
    <div className="space-y-6">
      {/* Toast notification */}
      {saveMessage && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-lg shadow-lg font-arabic text-sm ${
          saveMessage.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {saveMessage.text}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-[var(--color-white-off)] font-arabic">
          {t.photos.title}
        </h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-gold)] text-black font-semibold rounded-lg hover:bg-[var(--color-gold-bright)] transition-all font-arabic"
        >
          <Plus className="w-5 h-5" />
          {t.photos.addNew}
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-full text-sm transition-all font-arabic ${
            selectedCategory === 'all'
              ? 'bg-[var(--color-gold)] text-black'
              : 'bg-[var(--color-charcoal)] text-[var(--color-gray-light)] hover:text-white'
          }`}
        >
          {isAr ? 'الكل' : 'Tout'}
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all font-arabic ${
              selectedCategory === cat
                ? 'bg-[var(--color-gold)] text-black'
                : 'bg-[var(--color-charcoal)] text-[var(--color-gray-light)] hover:text-white'
            }`}
          >
            {categoryLabel(cat)}
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
                {editingPhoto ? t.photos.edit : t.photos.addNew}
              </h2>
              <button onClick={resetForm} className="text-[var(--color-gray-light)] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image Upload */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[var(--color-gray-dark)] rounded-xl p-8 text-center cursor-pointer hover:border-[var(--color-gold-dark)] transition-all"
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-cover" />
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-10 h-10 mx-auto text-[var(--color-gray-medium)]" />
                    <p className="text-[var(--color-gray-light)] font-arabic">{t.photos.dragDrop}</p>
                    <p className="text-xs text-[var(--color-gray-medium)] font-arabic">{t.photos.maxSize}</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Title fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.photos.titleAr}</label>
                  <input
                    type="text"
                    value={form.title_ar}
                    onChange={e => setForm({ ...form, title_ar: e.target.value })}
                    className="input-cinematic font-arabic"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.photos.titleFr}</label>
                  <input
                    type="text"
                    value={form.title_fr}
                    onChange={e => setForm({ ...form, title_fr: e.target.value })}
                    className="input-cinematic"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Description fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.photos.descriptionAr}</label>
                  <textarea
                    value={form.description_ar}
                    onChange={e => setForm({ ...form, description_ar: e.target.value })}
                    className="input-cinematic font-arabic h-24 resize-none"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.photos.descriptionFr}</label>
                  <textarea
                    value={form.description_fr}
                    onChange={e => setForm({ ...form, description_fr: e.target.value })}
                    className="input-cinematic h-24 resize-none"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.photos.category}</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="input-cinematic font-arabic"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{categoryLabel(cat)}</option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={uploading || (!imageFile && !form.image_url)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--color-gold)] text-black font-semibold rounded-lg hover:bg-[var(--color-gold-bright)] disabled:opacity-50 transition-all font-arabic"
                >
                  {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  {uploading ? t.photos.uploading : t.photos.save}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-[var(--color-gray-dark)] text-[var(--color-gray-light)] rounded-lg hover:bg-[var(--color-black-soft)] transition-all font-arabic"
                >
                  {t.photos.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photos Grid */}
      {loading ? (
        <div className="text-center py-16">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[var(--color-gold)]" />
        </div>
      ) : filteredPhotos.length === 0 ? (
        <div className="text-center py-16 text-[var(--color-gray-medium)] font-arabic">
          {t.photos.noPhotos}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPhotos.map(photo => (
            <div
              key={photo.id}
              className="group bg-[var(--color-charcoal)] border border-[var(--color-gray-dark)] rounded-xl overflow-hidden hover:border-[var(--color-gold-dark)] transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={photo.image_url}
                  alt={isAr ? photo.title_ar : photo.title_fr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleEdit(photo)}
                    className="p-2 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition-all"
                  >
                    <Edit3 className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => handleDelete(photo)}
                    className="p-2 bg-red-500/20 backdrop-blur rounded-lg hover:bg-red-500/30 transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
                {/* Category badge */}
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur rounded text-xs text-[var(--color-gold)] font-arabic">
                  {categoryLabel(photo.category)}
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-white truncate font-arabic">
                  {isAr ? photo.title_ar : photo.title_fr}
                </h3>
                {(isAr ? photo.description_ar : photo.description_fr) && (
                  <p className="text-xs text-[var(--color-gray-light)] mt-1 line-clamp-2 font-arabic">
                    {isAr ? photo.description_ar : photo.description_fr}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
