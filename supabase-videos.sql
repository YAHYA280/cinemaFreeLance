-- ============================================
-- VIDEOS TABLE
-- Run this in Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar TEXT NOT NULL DEFAULT '',
  title_fr TEXT NOT NULL DEFAULT '',
  description_ar TEXT DEFAULT '',
  description_fr TEXT DEFAULT '',
  video_url TEXT NOT NULL DEFAULT '',
  thumbnail_url TEXT DEFAULT '',
  category_ar TEXT DEFAULT '',
  category_fr TEXT DEFAULT '',
  duration TEXT DEFAULT '',
  published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "videos_select_public" ON videos FOR SELECT TO anon USING (published = true);
CREATE POLICY "videos_select_admin" ON videos FOR SELECT TO authenticated USING (true);
CREATE POLICY "videos_insert" ON videos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "videos_update" ON videos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "videos_delete" ON videos FOR DELETE TO authenticated USING (true);

-- Updated_at trigger
CREATE TRIGGER videos_updated_at BEFORE UPDATE ON videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
