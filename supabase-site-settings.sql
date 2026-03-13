-- =============================================
-- Site Settings Table (Key-Value Store)
-- =============================================

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read settings (public site needs them)
CREATE POLICY "Anyone can read site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can insert/update/delete
CREATE POLICY "Authenticated users can insert site settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete site settings"
  ON site_settings FOR DELETE
  TO authenticated
  USING (true);

-- Seed default values
INSERT INTO site_settings (key, value) VALUES
  ('phone', '+212 6XX XXX XXX'),
  ('email', 'contact@alkarama.ma'),
  ('address_ar', 'دار الشباب سيدي البرنوصي، الدار البيضاء، المغرب'),
  ('address_fr', 'Maison des Jeunes Sidi Bernoussi, Casablanca, Maroc'),
  ('hours_ar', 'الإثنين - السبت: 09:00 - 18:00'),
  ('hours_fr', 'Lundi - Samedi: 09h00 - 18h00'),
  ('facebook_url', '#'),
  ('instagram_url', '#'),
  ('youtube_url', '#'),
  ('twitter_url', '#'),
  ('map_url', '')
ON CONFLICT (key) DO NOTHING;
