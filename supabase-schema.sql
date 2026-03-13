-- ============================================
-- Al-Karama Association - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- 1. PHOTOS TABLE
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar TEXT NOT NULL DEFAULT '',
  title_fr TEXT NOT NULL DEFAULT '',
  description_ar TEXT DEFAULT '',
  description_fr TEXT DEFAULT '',
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BLOGS TABLE
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  content_ar TEXT NOT NULL DEFAULT '',
  content_fr TEXT NOT NULL DEFAULT '',
  excerpt_ar TEXT DEFAULT '',
  excerpt_fr TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  author_ar TEXT DEFAULT '',
  author_fr TEXT DEFAULT '',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SECTIONS TABLE (dynamic sections for any page)
CREATE TABLE IF NOT EXISTS sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL DEFAULT 'home',
  title_ar TEXT NOT NULL DEFAULT '',
  title_fr TEXT NOT NULL DEFAULT '',
  content_ar TEXT DEFAULT '',
  content_fr TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. STORAGE BUCKET FOR PHOTOS
INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

-- 5. STORAGE POLICIES (allow public read, admin upload)
CREATE POLICY "Public can view photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'photos');

CREATE POLICY "Authenticated users can upload photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update photos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete photos" ON storage.objects
  FOR DELETE USING (bucket_id = 'photos' AND auth.role() = 'authenticated');

-- 6. ROW LEVEL SECURITY
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read photos" ON photos FOR SELECT USING (true);
CREATE POLICY "Public can read published blogs" ON blogs FOR SELECT USING (published = true);
CREATE POLICY "Public can read visible sections" ON sections FOR SELECT USING (visible = true);

-- Admin full access (authenticated users)
CREATE POLICY "Admin full access photos" ON photos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access blogs" ON blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access sections" ON sections FOR ALL USING (auth.role() = 'authenticated');

-- 7. UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER photos_updated_at BEFORE UPDATE ON photos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER blogs_updated_at BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER sections_updated_at BEFORE UPDATE ON sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ADMIN USER SETUP
-- After running this schema, go to Supabase Dashboard > Authentication > Users
-- and create a new user with:
--   Email: adil@alkarama.ma
--   Password: AdilKarama2024!
-- ============================================
