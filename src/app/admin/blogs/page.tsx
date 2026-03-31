'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { adminTranslations } from '@/i18n/admin-translations';
import { Plus, Trash2, Edit3, X, Eye, EyeOff, Upload, Loader2 } from 'lucide-react';

interface Blog {
  id: string;
  title_ar: string;
  title_fr: string;
  content_ar: string;
  content_fr: string;
  excerpt_ar: string;
  excerpt_fr: string;
  cover_image: string;
  author_ar: string;
  author_fr: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminBlogsPage() {
  const { language } = useLanguage();
  const t = adminTranslations[language];
  const isAr = language === 'ar';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [uploading, setUploading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  const [form, setForm] = useState({
    title_ar: '',
    title_fr: '',
    content_ar: '',
    content_fr: '',
    excerpt_ar: '',
    excerpt_fr: '',
    author_ar: '',
    author_fr: '',
    cover_image: '',
    published: true,
  });
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const supabase = createClient();

  const fetchBlogs = async () => {
    const { data } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    setBlogs(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchBlogs(); }, []);

  const resetForm = () => {
    setForm({
      title_ar: '', title_fr: '', content_ar: '', content_fr: '',
      excerpt_ar: '', excerpt_fr: '', author_ar: '', author_fr: '',
      cover_image: '', published: true,
    });
    setSaveMessage(null);
    setImageFile(null);
    setPreview('');
    setEditingBlog(null);
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
    const fileName = `blog-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('photos').upload(fileName, file);
    if (error) throw error;
    const { data } = supabase.storage.from('photos').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let coverImage = form.cover_image;
      if (imageFile) {
        coverImage = await uploadImage(imageFile);
      }

      const payload = {
        title_ar: form.title_ar,
        title_fr: form.title_fr,
        content_ar: form.content_ar,
        content_fr: form.content_fr,
        excerpt_ar: form.excerpt_ar,
        excerpt_fr: form.excerpt_fr,
        author_ar: form.author_ar,
        author_fr: form.author_fr,
        cover_image: coverImage,
        published: form.published,
      };

      if (editingBlog) {
        const { error } = await supabase.from('blogs').update(payload).eq('id', editingBlog.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blogs').insert(payload);
        if (error) throw error;
      }

      setSaveMessage({ type: 'success', text: isAr ? 'تم الحفظ بنجاح!' : 'Enregistre avec succes!' });
      resetForm();
      fetchBlogs();
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setSaveMessage({ type: 'error', text: isAr ? 'حدث خطأ أثناء الحفظ' : 'Erreur lors de l\'enregistrement' });
      setTimeout(() => setSaveMessage(null), 5000);
    }
    setUploading(false);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setForm({
      title_ar: blog.title_ar,
      title_fr: blog.title_fr,
      content_ar: blog.content_ar,
      content_fr: blog.content_fr,
      excerpt_ar: blog.excerpt_ar,
      excerpt_fr: blog.excerpt_fr,
      author_ar: blog.author_ar,
      author_fr: blog.author_fr,
      cover_image: blog.cover_image,
      published: blog.published,
    });
    setPreview(blog.cover_image);
    setShowForm(true);
  };

  const handleDelete = async (blog: Blog) => {
    if (!confirm(t.blogs.confirmDelete)) return;
    await supabase.from('blogs').delete().eq('id', blog.id);
    fetchBlogs();
  };

  const togglePublish = async (blog: Blog) => {
    await supabase.from('blogs').update({ published: !blog.published }).eq('id', blog.id);
    fetchBlogs();
  };

  const filteredBlogs = filterStatus === 'all'
    ? blogs
    : blogs.filter(b => filterStatus === 'published' ? b.published : !b.published);

  const formatDate = (date: string) => new Date(date).toLocaleDateString(isAr ? 'ar-MA' : 'fr-FR');

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
          {t.blogs.title}
        </h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-red-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-red-bright)] transition-all font-arabic"
        >
          <Plus className="w-5 h-5" />
          {t.blogs.addNew}
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(['all', 'published', 'draft'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all font-arabic ${
              filterStatus === status
                ? 'bg-[var(--color-red-primary)] text-white'
                : 'bg-[var(--color-charcoal)] text-[var(--color-gray-light)] hover:text-white'
            }`}
          >
            {status === 'all' ? (isAr ? 'الكل' : 'Tout') :
             status === 'published' ? t.blogs.published : t.blogs.draft}
          </button>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => resetForm()}>
          <div
            className="bg-[var(--color-charcoal)] border border-[var(--color-gray-dark)] rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-gray-dark)]">
              <h2 className="text-lg font-bold text-white font-arabic">
                {editingBlog ? t.blogs.edit : t.blogs.addNew}
              </h2>
              <button onClick={resetForm} className="text-[var(--color-gray-light)] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Cover Image */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[var(--color-gray-dark)] rounded-xl p-6 text-center cursor-pointer hover:border-[var(--color-gold-dark)] transition-all"
              >
                {preview ? (
                  <img src={preview} alt="Cover" className="max-h-40 mx-auto rounded-lg object-cover" />
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-[var(--color-gray-medium)]" />
                    <p className="text-sm text-[var(--color-gray-light)] font-arabic">{t.blogs.coverImage}</p>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </div>

              {/* Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.blogs.titleAr}</label>
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
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.blogs.titleFr}</label>
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

              {/* Excerpt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.blogs.excerptAr}</label>
                  <textarea
                    value={form.excerpt_ar}
                    onChange={e => setForm({ ...form, excerpt_ar: e.target.value })}
                    className="input-cinematic font-arabic h-20 resize-none"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.blogs.excerptFr}</label>
                  <textarea
                    value={form.excerpt_fr}
                    onChange={e => setForm({ ...form, excerpt_fr: e.target.value })}
                    className="input-cinematic h-20 resize-none"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.blogs.contentAr}</label>
                  <textarea
                    value={form.content_ar}
                    onChange={e => setForm({ ...form, content_ar: e.target.value })}
                    className="input-cinematic font-arabic h-40 resize-none"
                    dir="rtl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.blogs.contentFr}</label>
                  <textarea
                    value={form.content_fr}
                    onChange={e => setForm({ ...form, content_fr: e.target.value })}
                    className="input-cinematic h-40 resize-none"
                    dir="ltr"
                    required
                  />
                </div>
              </div>

              {/* Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.blogs.authorAr}</label>
                  <input
                    type="text"
                    value={form.author_ar}
                    onChange={e => setForm({ ...form, author_ar: e.target.value })}
                    className="input-cinematic font-arabic"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{t.blogs.authorFr}</label>
                  <input
                    type="text"
                    value={form.author_fr}
                    onChange={e => setForm({ ...form, author_fr: e.target.value })}
                    className="input-cinematic"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Published toggle */}
              <div className="flex items-center gap-3">
                <label className="text-sm text-[var(--color-gray-light)] font-arabic">{t.blogs.published}</label>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, published: !form.published })}
                  className={`relative w-12 h-6 rounded-full transition-all ${
                    form.published ? 'bg-green-600' : 'bg-[var(--color-gray-dark)]'
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                    form.published ? (isAr ? 'left-0.5' : 'left-6') : (isAr ? 'left-6' : 'left-0.5')
                  }`} />
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--color-red-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-red-bright)] disabled:opacity-50 transition-all font-arabic"
                >
                  {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  {uploading ? (isAr ? 'جاري الحفظ...' : 'Enregistrement...') : t.blogs.save}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-[var(--color-gray-dark)] text-[var(--color-gray-light)] rounded-lg hover:bg-[var(--color-black-soft)] transition-all font-arabic"
                >
                  {t.blogs.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blogs List */}
      {loading ? (
        <div className="text-center py-16">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[var(--color-gold)]" />
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-16 text-[var(--color-gray-medium)] font-arabic">
          {t.blogs.noBlogs}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBlogs.map(blog => (
            <div
              key={blog.id}
              className="bg-[var(--color-charcoal)] border border-[var(--color-gray-dark)] rounded-xl overflow-hidden hover:border-[var(--color-gray-medium)] transition-all"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Cover image */}
                {blog.cover_image && (
                  <div className="sm:w-48 h-32 sm:h-auto flex-shrink-0">
                    <img
                      src={blog.cover_image}
                      alt={isAr ? blog.title_ar : blog.title_fr}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-arabic ${
                          blog.published
                            ? 'bg-green-900/30 text-green-400 border border-green-800'
                            : 'bg-yellow-900/30 text-yellow-400 border border-yellow-800'
                        }`}>
                          {blog.published ? t.blogs.published : t.blogs.draft}
                        </span>
                        <span className="text-xs text-[var(--color-gray-medium)]">
                          {formatDate(blog.created_at)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white font-arabic">
                        {isAr ? blog.title_ar : blog.title_fr}
                      </h3>
                      <p className="text-sm text-[var(--color-gray-light)] mt-1 line-clamp-2 font-arabic">
                        {isAr ? blog.excerpt_ar || blog.content_ar : blog.excerpt_fr || blog.content_fr}
                      </p>
                      {(blog.author_ar || blog.author_fr) && (
                        <p className="text-xs text-[var(--color-gold)] mt-2 font-arabic">
                          {isAr ? blog.author_ar : blog.author_fr}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => togglePublish(blog)}
                        className="p-2 text-[var(--color-gray-light)] hover:text-white hover:bg-[var(--color-black-soft)] rounded-lg transition-all"
                        title={blog.published ? t.blogs.unpublish : t.blogs.publish}
                      >
                        {blog.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 text-[var(--color-gray-light)] hover:text-white hover:bg-[var(--color-black-soft)] rounded-lg transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog)}
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
