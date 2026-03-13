-- ============================================
-- RUN THIS IF PHOTOS/BLOGS/SECTIONS ARE NOT SHOWING
-- This drops and recreates all RLS policies
-- ============================================

-- Drop existing policies (ignore errors if they don't exist)
DROP POLICY IF EXISTS "Public can read photos" ON photos;
DROP POLICY IF EXISTS "Admin full access photos" ON photos;
DROP POLICY IF EXISTS "Public can read published blogs" ON blogs;
DROP POLICY IF EXISTS "Admin full access blogs" ON blogs;
DROP POLICY IF EXISTS "Public can read visible sections" ON sections;
DROP POLICY IF EXISTS "Admin full access sections" ON sections;

-- Ensure RLS is enabled
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

-- PHOTOS: anyone can read, authenticated can do everything
CREATE POLICY "photos_select" ON photos FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "photos_insert" ON photos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "photos_update" ON photos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "photos_delete" ON photos FOR DELETE TO authenticated USING (true);

-- BLOGS: anyone can read published, authenticated can do everything
CREATE POLICY "blogs_select_public" ON blogs FOR SELECT TO anon USING (published = true);
CREATE POLICY "blogs_select_admin" ON blogs FOR SELECT TO authenticated USING (true);
CREATE POLICY "blogs_insert" ON blogs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "blogs_update" ON blogs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "blogs_delete" ON blogs FOR DELETE TO authenticated USING (true);

-- SECTIONS: anyone can read visible, authenticated can do everything
CREATE POLICY "sections_select_public" ON sections FOR SELECT TO anon USING (visible = true);
CREATE POLICY "sections_select_admin" ON sections FOR SELECT TO authenticated USING (true);
CREATE POLICY "sections_insert" ON sections FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "sections_update" ON sections FOR UPDATE TO authenticated USING (true);
CREATE POLICY "sections_delete" ON sections FOR DELETE TO authenticated USING (true);

-- STORAGE: fix policies
DROP POLICY IF EXISTS "Public can view photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete photos" ON storage.objects;

CREATE POLICY "storage_photos_select" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'photos');
CREATE POLICY "storage_photos_insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'photos');
CREATE POLICY "storage_photos_update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'photos');
CREATE POLICY "storage_photos_delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'photos');
