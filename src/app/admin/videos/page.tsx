'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { Plus, Trash2, Edit3, X, Eye, EyeOff, Upload, Loader2, Video, Link as LinkIcon } from 'lucide-react';

interface VideoItem {
  id: string;
  title_ar: string;
  title_fr: string;
  description_ar: string;
  description_fr: string;
  video_url: string;
  thumbnail_url: string;
  category_ar: string;
  category_fr: string;
  duration: string;
  published: boolean;
  display_order: number;
  created_at: string;
}

export default function AdminVideosPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState<'url' | 'upload'>('url');
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [form, setForm] = useState({
    title_ar: '', title_fr: '',
    description_ar: '', description_fr: '',
    video_url: '', thumbnail_url: '',
    category_ar: '', category_fr: '',
    duration: '', published: true, display_order: 0,
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  const supabase = createClient();

  const fetchVideos = async () => {
    const { data } = await supabase
      .from('videos')
      .select('*')
      .order('display_order', { ascending: true });
    setVideos(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchVideos(); }, []);

  const resetForm = () => {
    setForm({
      title_ar: '', title_fr: '',
      description_ar: '', description_fr: '',
      video_url: '', thumbnail_url: '',
      category_ar: '', category_fr: '',
      duration: '', published: true, display_order: 0,
    });
    setVideoFile(null);
    setThumbnailFile(null);
    setThumbnailPreview('');
    setEditingVideo(null);
    setShowForm(false);
    setSaveMessage(null);
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setVideoFile(file);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const uploadFile = async (file: File, prefix: string): Promise<string> => {
    const ext = file.name.split('.').pop();
    const fileName = `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('photos').upload(fileName, file);
    if (error) throw error;
    const { data } = supabase.storage.from('photos').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let videoUrl = form.video_url;
      let thumbnailUrl = form.thumbnail_url;

      if (videoFile) {
        videoUrl = await uploadFile(videoFile, 'video');
      }
      if (thumbnailFile) {
        thumbnailUrl = await uploadFile(thumbnailFile, 'thumb');
      }

      const payload = {
        title_ar: form.title_ar,
        title_fr: form.title_fr,
        description_ar: form.description_ar,
        description_fr: form.description_fr,
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl,
        category_ar: form.category_ar,
        category_fr: form.category_fr,
        duration: form.duration,
        published: form.published,
        display_order: form.display_order,
      };

      if (editingVideo) {
        const { error } = await supabase.from('videos').update(payload).eq('id', editingVideo.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('videos').insert(payload);
        if (error) throw error;
      }

      setSaveMessage({ type: 'success', text: isAr ? 'تم الحفظ بنجاح!' : 'Enregistre avec succes!' });
      resetForm();
      fetchVideos();
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setSaveMessage({ type: 'error', text: isAr ? 'حدث خطأ أثناء الحفظ' : 'Erreur lors de l\'enregistrement' });
      setTimeout(() => setSaveMessage(null), 5000);
    }
    setUploading(false);
  };

  const handleEdit = (video: VideoItem) => {
    setEditingVideo(video);
    setForm({
      title_ar: video.title_ar, title_fr: video.title_fr,
      description_ar: video.description_ar, description_fr: video.description_fr,
      video_url: video.video_url, thumbnail_url: video.thumbnail_url,
      category_ar: video.category_ar, category_fr: video.category_fr,
      duration: video.duration, published: video.published,
      display_order: video.display_order,
    });
    setThumbnailPreview(video.thumbnail_url);
    setUploadMode(video.video_url.includes('youtube') || video.video_url.includes('youtu.be') ? 'url' : 'upload');
    setShowForm(true);
  };

  const handleDelete = async (video: VideoItem) => {
    if (!confirm(isAr ? 'هل أنت متأكد من الحذف؟' : 'Confirmer la suppression?')) return;
    await supabase.from('videos').delete().eq('id', video.id);
    fetchVideos();
  };

  const togglePublish = async (video: VideoItem) => {
    await supabase.from('videos').update({ published: !video.published }).eq('id', video.id);
    fetchVideos();
  };

  // Extract YouTube thumbnail from URL
  const getYouTubeThumbnail = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
    return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
  };

  const getVideoThumbnail = (video: VideoItem) => {
    if (video.thumbnail_url) return video.thumbnail_url;
    return getYouTubeThumbnail(video.video_url);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
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
          {isAr ? 'إدارة الفيديوهات' : 'Gestion des Videos'}
        </h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-red-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-red-bright)] transition-all font-arabic"
        >
          <Plus className="w-5 h-5" />
          {isAr ? 'إضافة فيديو' : 'Ajouter une video'}
        </button>
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
                {editingVideo ? (isAr ? 'تعديل فيديو' : 'Modifier la video') : (isAr ? 'إضافة فيديو' : 'Ajouter une video')}
              </h2>
              <button onClick={resetForm} className="text-[var(--color-gray-light)] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Upload mode toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setUploadMode('url')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-arabic transition-all ${
                    uploadMode === 'url'
                      ? 'bg-[var(--color-gold)] text-[var(--color-black-rich)]'
                      : 'bg-[var(--color-black-soft)] text-[var(--color-gray-light)]'
                  }`}
                >
                  <LinkIcon className="w-4 h-4" />
                  {isAr ? 'رابط يوتيوب / خارجي' : 'Lien YouTube / externe'}
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('upload')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-arabic transition-all ${
                    uploadMode === 'upload'
                      ? 'bg-[var(--color-gold)] text-[var(--color-black-rich)]'
                      : 'bg-[var(--color-black-soft)] text-[var(--color-gray-light)]'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  {isAr ? 'رفع فيديو' : 'Uploader une video'}
                </button>
              </div>

              {/* Video source */}
              {uploadMode === 'url' ? (
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">
                    {isAr ? 'رابط الفيديو (يوتيوب أو رابط مباشر)' : 'URL de la video (YouTube ou lien direct)'}
                  </label>
                  <input
                    type="url"
                    value={form.video_url}
                    onChange={e => setForm({ ...form, video_url: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="input-cinematic"
                    dir="ltr"
                    required={!videoFile}
                  />
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[var(--color-gray-dark)] rounded-xl p-6 text-center cursor-pointer hover:border-[var(--color-gold-dark)] transition-all"
                >
                  {videoFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <Video className="w-8 h-8 text-[var(--color-gold)]" />
                      <span className="text-[var(--color-gray-light)]">{videoFile.name}</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-[var(--color-gray-medium)]" />
                      <p className="text-sm text-[var(--color-gray-light)] font-arabic">
                        {isAr ? 'اضغط لرفع فيديو (MP4, WebM)' : 'Cliquez pour uploader (MP4, WebM)'}
                      </p>
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" accept="video/*" onChange={handleVideoFileChange} className="hidden" />
                </div>
              )}

              {/* Thumbnail */}
              <div
                onClick={() => thumbnailInputRef.current?.click()}
                className="border-2 border-dashed border-[var(--color-gray-dark)] rounded-xl p-4 text-center cursor-pointer hover:border-[var(--color-gold-dark)] transition-all"
              >
                {thumbnailPreview || (form.video_url && getYouTubeThumbnail(form.video_url)) ? (
                  <img
                    src={thumbnailPreview || getYouTubeThumbnail(form.video_url) || ''}
                    alt="Thumbnail"
                    className="max-h-32 mx-auto rounded-lg object-cover"
                  />
                ) : (
                  <div className="space-y-1">
                    <Upload className="w-6 h-6 mx-auto text-[var(--color-gray-medium)]" />
                    <p className="text-xs text-[var(--color-gray-light)] font-arabic">
                      {isAr ? 'صورة مصغرة (اختياري - يتم استخراجها تلقائيا من يوتيوب)' : 'Miniature (optionnel - extraite auto de YouTube)'}
                    </p>
                  </div>
                )}
                <input ref={thumbnailInputRef} type="file" accept="image/*" onChange={handleThumbnailChange} className="hidden" />
              </div>

              {/* Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{isAr ? 'العنوان (عربي)' : 'Titre (Arabe)'}</label>
                  <input type="text" value={form.title_ar} onChange={e => setForm({ ...form, title_ar: e.target.value })} className="input-cinematic font-arabic" dir="rtl" required />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{isAr ? 'العنوان (فرنسي)' : 'Titre (Francais)'}</label>
                  <input type="text" value={form.title_fr} onChange={e => setForm({ ...form, title_fr: e.target.value })} className="input-cinematic" dir="ltr" required />
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{isAr ? 'الوصف (عربي)' : 'Description (Arabe)'}</label>
                  <textarea value={form.description_ar} onChange={e => setForm({ ...form, description_ar: e.target.value })} className="input-cinematic font-arabic h-20 resize-none" dir="rtl" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{isAr ? 'الوصف (فرنسي)' : 'Description (Francais)'}</label>
                  <textarea value={form.description_fr} onChange={e => setForm({ ...form, description_fr: e.target.value })} className="input-cinematic h-20 resize-none" dir="ltr" />
                </div>
              </div>

              {/* Category & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{isAr ? 'التصنيف (عربي)' : 'Categorie (Arabe)'}</label>
                  <input type="text" value={form.category_ar} onChange={e => setForm({ ...form, category_ar: e.target.value })} className="input-cinematic font-arabic" dir="rtl" placeholder={isAr ? 'مثال: فعاليات' : 'Ex: Evenements'} />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{isAr ? 'التصنيف (فرنسي)' : 'Categorie (Francais)'}</label>
                  <input type="text" value={form.category_fr} onChange={e => setForm({ ...form, category_fr: e.target.value })} className="input-cinematic" dir="ltr" placeholder="Ex: Evenements" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">{isAr ? 'المدة' : 'Duree'}</label>
                  <input type="text" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className="input-cinematic" dir="ltr" placeholder="15:30" />
                </div>
              </div>

              {/* Published toggle */}
              <div className="flex items-center gap-3">
                <label className="text-sm text-[var(--color-gray-light)] font-arabic">{isAr ? 'منشور' : 'Publie'}</label>
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
                  {uploading ? (isAr ? 'جاري الحفظ...' : 'Enregistrement...') : (isAr ? 'حفظ' : 'Enregistrer')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-[var(--color-gray-dark)] text-[var(--color-gray-light)] rounded-lg hover:bg-[var(--color-black-soft)] transition-all font-arabic"
                >
                  {isAr ? 'إلغاء' : 'Annuler'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Videos List */}
      {loading ? (
        <div className="text-center py-16">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[var(--color-gold)]" />
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-16 text-[var(--color-gray-medium)] font-arabic">
          {isAr ? 'لا توجد فيديوهات بعد' : 'Aucune video pour le moment'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => {
            const thumb = getVideoThumbnail(video);
            return (
              <div
                key={video.id}
                className="bg-[var(--color-charcoal)] border border-[var(--color-gray-dark)] rounded-xl overflow-hidden hover:border-[var(--color-gray-medium)] transition-all"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-[var(--color-black-soft)]">
                  {thumb ? (
                    <img src={thumb} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="w-12 h-12 text-[var(--color-gray-dark)]" />
                    </div>
                  )}
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-xs rounded">
                      {video.duration}
                    </div>
                  )}
                  <div className={`absolute top-2 ${isAr ? 'right-2' : 'left-2'}`}>
                    <span className={`px-2 py-0.5 rounded text-xs font-arabic ${
                      video.published
                        ? 'bg-green-900/30 text-green-400 border border-green-800'
                        : 'bg-yellow-900/30 text-yellow-400 border border-yellow-800'
                    }`}>
                      {video.published ? (isAr ? 'منشور' : 'Publie') : (isAr ? 'مسودة' : 'Brouillon')}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className={`p-4 ${isAr ? 'text-right' : ''}`}>
                  {(video.category_ar || video.category_fr) && (
                    <span className="text-xs text-[var(--color-gold)]">
                      {isAr ? video.category_ar : video.category_fr}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-white font-arabic mt-1">
                    {isAr ? video.title_ar : video.title_fr}
                  </h3>

                  {/* Actions */}
                  <div className="flex items-center gap-1 mt-3 pt-3 border-t border-[var(--color-gray-dark)]">
                    <button
                      onClick={() => togglePublish(video)}
                      className="p-2 text-[var(--color-gray-light)] hover:text-white hover:bg-[var(--color-black-soft)] rounded-lg transition-all"
                    >
                      {video.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEdit(video)}
                      className="p-2 text-[var(--color-gray-light)] hover:text-white hover:bg-[var(--color-black-soft)] rounded-lg transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(video)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
