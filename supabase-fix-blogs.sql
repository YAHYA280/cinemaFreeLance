-- ============================================
-- FIX: Blog articles not showing on public site
-- Run this in Supabase SQL Editor if blogs aren't visible
-- ============================================

-- Drop all existing blog policies
DROP POLICY IF EXISTS "Public can read published blogs" ON blogs;
DROP POLICY IF EXISTS "Admin full access blogs" ON blogs;
DROP POLICY IF EXISTS "blogs_select_public" ON blogs;
DROP POLICY IF EXISTS "blogs_select_admin" ON blogs;
DROP POLICY IF EXISTS "blogs_insert" ON blogs;
DROP POLICY IF EXISTS "blogs_update" ON blogs;
DROP POLICY IF EXISTS "blogs_delete" ON blogs;

-- Ensure RLS is enabled
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Recreate policies with explicit roles
-- IMPORTANT: anon role needs SELECT on published blogs
CREATE POLICY "blogs_public_read" ON blogs
  FOR SELECT TO anon
  USING (published = true);

CREATE POLICY "blogs_admin_read" ON blogs
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "blogs_admin_insert" ON blogs
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "blogs_admin_update" ON blogs
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "blogs_admin_delete" ON blogs
  FOR DELETE TO authenticated
  USING (true);

-- Verify: this should show all blog policies
SELECT policyname, cmd, roles, qual
FROM pg_policies
WHERE tablename = 'blogs';
