/**
 * Parses Supabase errors and returns user-friendly messages
 */
export function getSupabaseErrorMessage(
  error: unknown,
  lang: 'ar' | 'fr'
): string {
  const err = error as { message?: string; statusCode?: string; status?: number; code?: string };
  const msg = err?.message || '';
  const code = err?.code || '';
  const status = err?.status || 0;

  // Storage full / quota exceeded
  if (
    msg.includes('storage') && (msg.includes('full') || msg.includes('quota')) ||
    msg.includes('exceeded') ||
    msg.includes('Payload too large') ||
    status === 413
  ) {
    return lang === 'ar'
      ? 'المساحة التخزينية ممتلئة. يرجى حذف بعض الملفات أو ترقية خطة Supabase.'
      : 'Stockage plein. Veuillez supprimer des fichiers ou mettre a niveau votre plan Supabase.';
  }

  // File too large
  if (msg.includes('file size') || msg.includes('too large') || msg.includes('limit')) {
    return lang === 'ar'
      ? 'حجم الملف كبير جداً. الحد الأقصى 50 ميغابايت.'
      : 'Fichier trop volumineux. Taille max 50 Mo.';
  }

  // Database full / row limit
  if (
    msg.includes('insufficient_resources') ||
    msg.includes('disk') ||
    msg.includes('row limit') ||
    code === '53100' || // disk_full in postgres
    code === '53000'    // insufficient_resources
  ) {
    return lang === 'ar'
      ? 'قاعدة البيانات ممتلئة. يرجى حذف بعض المحتوى أو ترقية خطة Supabase.'
      : 'Base de donnees pleine. Veuillez supprimer du contenu ou mettre a niveau votre plan Supabase.';
  }

  // RLS / permission errors
  if (
    msg.includes('row-level security') ||
    msg.includes('permission denied') ||
    msg.includes('new row violates') ||
    code === '42501'
  ) {
    return lang === 'ar'
      ? 'ليس لديك صلاحية لهذا الإجراء. يرجى تسجيل الدخول مرة أخرى.'
      : 'Permission refusee. Veuillez vous reconnecter.';
  }

  // Network errors
  if (msg.includes('fetch') || msg.includes('network') || msg.includes('Failed to fetch')) {
    return lang === 'ar'
      ? 'خطأ في الاتصال. تحقق من الإنترنت وحاول مرة أخرى.'
      : 'Erreur de connexion. Verifiez votre internet et reessayez.';
  }

  // Generic fallback
  return lang === 'ar'
    ? 'حدث خطأ أثناء العملية. حاول مرة أخرى.'
    : 'Une erreur s\'est produite. Veuillez reessayer.';
}
