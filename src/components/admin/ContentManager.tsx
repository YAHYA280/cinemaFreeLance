'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { Plus, Trash2, Edit3, X, Upload, Loader2, GripVertical } from 'lucide-react';

export interface FieldConfig {
  key: string;
  labelAr: string;
  labelFr: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'boolean' | 'image';
  dir?: 'rtl' | 'ltr';
  options?: { value: string; labelAr: string; labelFr: string }[];
  required?: boolean;
  defaultValue?: string | number | boolean;
}

interface ContentManagerProps {
  table: string;
  titleAr: string;
  titleFr: string;
  fields: FieldConfig[];
  displayField: string; // which field to show as title in list
  orderField?: string;
}

export default function ContentManager({ table, titleAr, titleFr, fields, displayField, orderField = 'display_order' }: ContentManagerProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageFieldKey, setImageFieldKey] = useState('');

  const supabase = createClient();

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order(orderField, { ascending: true });
    if (error) console.error(`Error fetching ${table}:`, error);
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, [table]);

  const getDefaultForm = () => {
    const defaults: Record<string, unknown> = {};
    fields.forEach(f => {
      if (f.defaultValue !== undefined) defaults[f.key] = f.defaultValue;
      else if (f.type === 'number') defaults[f.key] = 0;
      else if (f.type === 'boolean') defaults[f.key] = false;
      else defaults[f.key] = '';
    });
    return defaults;
  };

  const resetForm = () => {
    setForm(getDefaultForm());
    setEditingItem(null);
    setShowForm(false);
    setImageFile(null);
    setImagePreview('');
    setImageFieldKey('');
  };

  const handleEdit = (item: Record<string, unknown>) => {
    setEditingItem(item);
    const formData: Record<string, unknown> = {};
    fields.forEach(f => { formData[f.key] = item[f.key] ?? ''; });
    setForm(formData);
    // Check for image fields
    const imgField = fields.find(f => f.type === 'image');
    if (imgField && item[imgField.key]) setImagePreview(item[imgField.key] as string);
    setShowForm(true);
  };

  const handleDelete = async (item: Record<string, unknown>) => {
    const msg = isAr ? 'هل أنت متأكد من الحذف؟' : 'Etes-vous sur de vouloir supprimer ?';
    if (!confirm(msg)) return;
    await supabase.from(table).delete().eq('id', item.id);
    fetchItems();
  };

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split('.').pop();
    const fileName = `${table}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('photos').upload(fileName, file);
    if (error) throw error;
    const { data } = supabase.storage.from('photos').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };

      // Handle image upload
      if (imageFile && imageFieldKey) {
        payload[imageFieldKey] = await uploadImage(imageFile);
      }

      if (editingItem) {
        await supabase.from(table).update(payload).eq('id', editingItem.id);
      } else {
        await supabase.from(table).insert(payload);
      }
      resetForm();
      fetchItems();
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const handleImageChange = (fieldKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageFieldKey(fieldKey);
    }
  };

  const getDisplayValue = (item: Record<string, unknown>) => {
    const arKey = displayField.replace('_fr', '_ar');
    const frKey = displayField.replace('_ar', '_fr');
    return (isAr ? item[arKey] || item[displayField] : item[frKey] || item[displayField]) as string;
  };

  const getSubDisplay = (item: Record<string, unknown>) => {
    // Show a secondary field if available
    if (item.role_ar || item.role_fr) return isAr ? item.role_ar : item.role_fr;
    if (item.tier) return item.tier;
    if (item.year) return item.year;
    if (item.source) return item.source;
    if (item.date) return item.date;
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--color-white-off)] font-arabic">
          {isAr ? titleAr : titleFr}
        </h2>
        <button
          onClick={() => { setForm(getDefaultForm()); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-gold)] text-black font-semibold rounded-lg hover:bg-[var(--color-gold-bright)] transition-all text-sm font-arabic"
        >
          <Plus className="w-4 h-4" />
          {isAr ? 'إضافة' : 'Ajouter'}
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={resetForm}>
          <div
            className="bg-[var(--color-charcoal)] border border-[var(--color-gray-dark)] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-[var(--color-gray-dark)]">
              <h3 className="text-lg font-bold text-white font-arabic">
                {editingItem ? (isAr ? 'تعديل' : 'Modifier') : (isAr ? 'إضافة جديد' : 'Ajouter nouveau')}
              </h3>
              <button onClick={resetForm} className="text-[var(--color-gray-light)] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {fields.map(field => (
                <div key={field.key}>
                  <label className="block text-sm text-[var(--color-gray-light)] mb-1 font-arabic">
                    {isAr ? field.labelAr : field.labelFr}
                  </label>

                  {field.type === 'text' && (
                    <input
                      type="text"
                      value={(form[field.key] as string) || ''}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      className="input-cinematic font-arabic text-sm"
                      dir={field.dir || (field.key.endsWith('_ar') ? 'rtl' : 'ltr')}
                      required={field.required}
                    />
                  )}

                  {field.type === 'textarea' && (
                    <textarea
                      value={(form[field.key] as string) || ''}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      className="input-cinematic font-arabic text-sm h-24 resize-none"
                      dir={field.dir || (field.key.endsWith('_ar') ? 'rtl' : 'ltr')}
                      required={field.required}
                    />
                  )}

                  {field.type === 'number' && (
                    <input
                      type="number"
                      value={(form[field.key] as number) || 0}
                      onChange={e => setForm({ ...form, [field.key]: parseInt(e.target.value) || 0 })}
                      className="input-cinematic text-sm"
                    />
                  )}

                  {field.type === 'select' && field.options && (
                    <select
                      value={(form[field.key] as string) || ''}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      className="input-cinematic font-arabic text-sm"
                    >
                      {field.options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {isAr ? opt.labelAr : opt.labelFr}
                        </option>
                      ))}
                    </select>
                  )}

                  {field.type === 'boolean' && (
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, [field.key]: !form[field.key] })}
                      className={`relative w-12 h-6 rounded-full transition-all ${
                        form[field.key] ? 'bg-green-600' : 'bg-[var(--color-gray-dark)]'
                      }`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                        form[field.key] ? (isAr ? 'left-0.5' : 'left-6') : (isAr ? 'left-6' : 'left-0.5')
                      }`} />
                    </button>
                  )}

                  {field.type === 'image' && (
                    <div
                      onClick={() => {
                        setImageFieldKey(field.key);
                        fileInputRef.current?.click();
                      }}
                      className="border-2 border-dashed border-[var(--color-gray-dark)] rounded-lg p-4 text-center cursor-pointer hover:border-[var(--color-gold-dark)] transition-all"
                    >
                      {(imagePreview && imageFieldKey === field.key) || (form[field.key] && !imageFile) ? (
                        <img
                          src={imageFieldKey === field.key && imagePreview ? imagePreview : form[field.key] as string}
                          alt=""
                          className="max-h-24 mx-auto rounded object-cover"
                        />
                      ) : (
                        <Upload className="w-6 h-6 mx-auto text-[var(--color-gray-medium)]" />
                      )}
                    </div>
                  )}
                </div>
              ))}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={e => imageFieldKey && handleImageChange(imageFieldKey, e)}
                className="hidden"
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[var(--color-gold)] text-black font-semibold rounded-lg hover:bg-[var(--color-gold-bright)] disabled:opacity-50 transition-all text-sm font-arabic"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isAr ? 'حفظ' : 'Enregistrer'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 border border-[var(--color-gray-dark)] text-[var(--color-gray-light)] rounded-lg hover:bg-[var(--color-black-soft)] transition-all text-sm font-arabic"
                >
                  {isAr ? 'إلغاء' : 'Annuler'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Items List */}
      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-[var(--color-gold)]" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-[var(--color-gray-medium)] text-sm font-arabic">
          {isAr ? 'لا توجد عناصر بعد' : 'Aucun element pour le moment'}
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div
              key={item.id as string}
              className="flex items-center gap-3 p-3 bg-[var(--color-charcoal)] border border-[var(--color-gray-dark)] rounded-lg hover:border-[var(--color-gray-medium)] transition-all group"
            >
              <span className="text-xs text-[var(--color-gray-medium)] w-6 text-center">{idx + 1}</span>

              {/* Thumbnail if image field exists */}
              {fields.some(f => f.type === 'image') && (() => {
                const imgField = fields.find(f => f.type === 'image');
                const imgUrl = imgField ? item[imgField.key] as string : '';
                return imgUrl ? (
                  <img src={imgUrl} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded bg-[var(--color-black-soft)] flex-shrink-0" />
                );
              })()}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate font-arabic">
                  {getDisplayValue(item)}
                </p>
                {getSubDisplay(item) ? (
                  <p className="text-xs text-[var(--color-gray-light)] truncate font-arabic">
                    {String(getSubDisplay(item))}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1.5 text-[var(--color-gray-light)] hover:text-white hover:bg-[var(--color-black-soft)] rounded transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
