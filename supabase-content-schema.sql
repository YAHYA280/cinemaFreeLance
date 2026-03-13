-- ============================================
-- Al-Karama - Content Tables + Seed Data
-- Run this AFTER the main schema
-- ============================================

-- ===== PARTNERS =====
CREATE TABLE IF NOT EXISTS partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  description_ar TEXT DEFAULT '',
  description_fr TEXT DEFAULT '',
  logo_url TEXT DEFAULT '',
  tier TEXT DEFAULT 'institutional',
  display_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== BOARD MEMBERS =====
CREATE TABLE IF NOT EXISTS board_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  role_ar TEXT NOT NULL,
  role_fr TEXT NOT NULL,
  photo_url TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== TIMELINE =====
CREATE TABLE IF NOT EXISTS timeline_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  description_ar TEXT DEFAULT '',
  description_fr TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== SCREENINGS =====
CREATE TABLE IF NOT EXISTS screenings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  director_ar TEXT DEFAULT '',
  director_fr TEXT DEFAULT '',
  year INTEGER DEFAULT 2024,
  country_ar TEXT DEFAULT '',
  country_fr TEXT DEFAULT '',
  genre_ar TEXT DEFAULT '',
  genre_fr TEXT DEFAULT '',
  duration INTEGER DEFAULT 90,
  date TEXT DEFAULT '',
  time TEXT DEFAULT '',
  discussion_with_ar TEXT DEFAULT '',
  discussion_with_fr TEXT DEFAULT '',
  synopsis_ar TEXT DEFAULT '',
  synopsis_fr TEXT DEFAULT '',
  is_opening BOOLEAN DEFAULT false,
  is_past BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== MASTERCLASSES =====
CREATE TABLE IF NOT EXISTS masterclasses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  guest_ar TEXT DEFAULT '',
  guest_fr TEXT DEFAULT '',
  role_ar TEXT DEFAULT '',
  role_fr TEXT DEFAULT '',
  date TEXT DEFAULT '',
  topic_ar TEXT DEFAULT '',
  topic_fr TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== PRODUCTIONS (Theatre) =====
CREATE TABLE IF NOT EXISTS productions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  year INTEGER DEFAULT 2024,
  genre_ar TEXT DEFAULT '',
  genre_fr TEXT DEFAULT '',
  synopsis_ar TEXT DEFAULT '',
  synopsis_fr TEXT DEFAULT '',
  duration INTEGER DEFAULT 60,
  cast_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  images TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== FESTIVALS =====
CREATE TABLE IF NOT EXISTS festivals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  year INTEGER DEFAULT 2024,
  award_ar TEXT DEFAULT '',
  award_fr TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== NEWS ARTICLES =====
CREATE TABLE IF NOT EXISTS news_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  excerpt_ar TEXT DEFAULT '',
  excerpt_fr TEXT DEFAULT '',
  source TEXT DEFAULT '',
  date TEXT DEFAULT '',
  category_ar TEXT DEFAULT '',
  category_fr TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== TESTIMONIALS =====
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_ar TEXT NOT NULL,
  quote_fr TEXT NOT NULL,
  author_ar TEXT DEFAULT '',
  author_fr TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== RLS FOR ALL NEW TABLES =====
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE board_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE screenings ENABLE ROW LEVEL SECURITY;
ALTER TABLE masterclasses ENABLE ROW LEVEL SECURITY;
ALTER TABLE productions ENABLE ROW LEVEL SECURITY;
ALTER TABLE festivals ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "public_read" ON partners FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_read" ON board_members FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_read" ON timeline_events FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_read" ON screenings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_read" ON masterclasses FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_read" ON productions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_read" ON festivals FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_read" ON news_articles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_read" ON testimonials FOR SELECT TO anon, authenticated USING (true);

-- Admin write
CREATE POLICY "admin_insert" ON partners FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "admin_update" ON partners FOR UPDATE TO authenticated USING (true);
CREATE POLICY "admin_delete" ON partners FOR DELETE TO authenticated USING (true);

CREATE POLICY "admin_insert" ON board_members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "admin_update" ON board_members FOR UPDATE TO authenticated USING (true);
CREATE POLICY "admin_delete" ON board_members FOR DELETE TO authenticated USING (true);

CREATE POLICY "admin_insert" ON timeline_events FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "admin_update" ON timeline_events FOR UPDATE TO authenticated USING (true);
CREATE POLICY "admin_delete" ON timeline_events FOR DELETE TO authenticated USING (true);

CREATE POLICY "admin_insert" ON screenings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "admin_update" ON screenings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "admin_delete" ON screenings FOR DELETE TO authenticated USING (true);

CREATE POLICY "admin_insert" ON masterclasses FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "admin_update" ON masterclasses FOR UPDATE TO authenticated USING (true);
CREATE POLICY "admin_delete" ON masterclasses FOR DELETE TO authenticated USING (true);

CREATE POLICY "admin_insert" ON productions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "admin_update" ON productions FOR UPDATE TO authenticated USING (true);
CREATE POLICY "admin_delete" ON productions FOR DELETE TO authenticated USING (true);

CREATE POLICY "admin_insert" ON festivals FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "admin_update" ON festivals FOR UPDATE TO authenticated USING (true);
CREATE POLICY "admin_delete" ON festivals FOR DELETE TO authenticated USING (true);

CREATE POLICY "admin_insert" ON news_articles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "admin_update" ON news_articles FOR UPDATE TO authenticated USING (true);
CREATE POLICY "admin_delete" ON news_articles FOR DELETE TO authenticated USING (true);

CREATE POLICY "admin_insert" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "admin_update" ON testimonials FOR UPDATE TO authenticated USING (true);
CREATE POLICY "admin_delete" ON testimonials FOR DELETE TO authenticated USING (true);

-- ===== SEED DATA =====

-- Partners
INSERT INTO partners (name_ar, name_fr, description_ar, description_fr, tier, display_order) VALUES
('المديرية الإقليمية لوزارة الثقافة - قطاع الشباب', 'Direction Provinciale du Ministere de la Culture - Secteur Jeunesse', 'شريك استراتيجي في دعم الأنشطة الثقافية والفنية', 'Partenaire strategique dans le soutien des activites culturelles et artistiques', 'strategic', 1),
('المديرية الإقليمية لوزارة التربية الوطنية', 'Direction Provinciale du Ministere de l''Education Nationale', 'شراكة لإدماج الفنون السمعية البصرية في المؤسسات التعليمية', 'Partenariat pour l''integration des arts audiovisuels dans les etablissements scolaires', 'strategic', 2),
('المركز السينمائي المغربي', 'Centre Cinematographique Marocain (CCM)', 'دعم تقني ولوجستيكي لأنشطة النادي السينمائي', 'Soutien technique et logistique pour les activites du cine-club', 'strategic', 3),
('عمالة مقاطعات سيدي البرنوصي', 'Prefecture des Arrondissements de Sidi Bernoussi', 'دعم مؤسساتي للمبادرات الثقافية المحلية', 'Soutien institutionnel aux initiatives culturelles locales', 'institutional', 4),
('دار الشباب سيدي البرنوصي', 'Maison des Jeunes Sidi Bernoussi', 'المقر الرسمي للجمعية وفضاء الأنشطة', 'Siege officiel de l''association et espace d''activites', 'institutional', 5);

-- Board Members
INSERT INTO board_members (name_ar, name_fr, role_ar, role_fr, display_order) VALUES
('محمد العربي', 'Mohamed Larbi', 'الرئيس', 'President', 1),
('عبد الله بن سعيد', 'Abdellah Bensaid', 'نائب الرئيس', 'Vice-President', 2),
('يوسف الإدريسي', 'Youssef El Idrissi', 'المدير التقني', 'Directeur Technique', 3),
('فاطمة الزهراء', 'Fatima Zahra', 'أمينة المال', 'Tresoriere', 4),
('أحمد المنصوري', 'Ahmed Mansouri', 'مسؤول التواصل', 'Responsable Communication', 5),
('سعاد بنعلي', 'Souad Benali', 'الكاتبة العامة', 'Secretaire Generale', 6);

-- Timeline
INSERT INTO timeline_events (year, title_ar, title_fr, description_ar, description_fr, display_order) VALUES
('2017', 'تأسيس الجمعية', 'Fondation de l''association', 'تأسيس جمعية الكرامة للمسرح والسينما بسيدي البرنوصي', 'Creation de l''Association Al-Karama pour le Theatre et le Cinema a Sidi Bernoussi', 1),
('2018', 'أول إنتاج مسرحي', 'Premiere production theatrale', 'تقديم أول عمل مسرحي للفرقة', 'Presentation de la premiere oeuvre theatrale de la troupe', 2),
('2020', 'إطلاق برامج التكوين', 'Lancement des programmes de formation', 'بدء البرامج التكوينية في مهن السينما', 'Debut des programmes de formation aux metiers du cinema', 3),
('2023', 'شراكات استراتيجية', 'Partenariats strategiques', 'توقيع اتفاقيات شراكة مع المركز السينمائي المغربي ووزارة الثقافة', 'Signature d''accords de partenariat avec le CCM et le Ministere de la Culture', 4),
('2024', 'افتتاح النادي السينمائي', 'Inauguration du Cine-Club', 'افتتاح نادي البرنوصي السينمائي بحضور نخبة من الفنانين والمثقفين', 'Inauguration du Cine-Club Bernoussi en presence d''artistes et d''intellectuels', 5);

-- Screenings
INSERT INTO screenings (title_ar, title_fr, director_ar, director_fr, year, country_ar, country_fr, genre_ar, genre_fr, duration, date, time, discussion_with_ar, discussion_with_fr, synopsis_ar, synopsis_fr, is_opening, is_past, display_order) VALUES
('فيلم بامو', 'Film Bamo', 'محمد مفتكر', 'Mohamed Mouftakir', 2023, 'المغرب', 'Maroc', 'دراما', 'Drame', 120, '2024-02-10', '15:00', 'حمادي كيروم - ناقد سينمائي', 'Hamadi Kirom - Critique de cinema', 'فيلم يروي قصة إنسانية عميقة في قالب درامي مؤثر', 'Un film qui raconte une histoire humaine profonde dans un cadre dramatique emouvant', true, true, 1),
('أيام الساورة', 'Les Jours de la Saoura', 'كمال البور', 'Kamal El Bour', 2022, 'المغرب', 'Maroc', 'وثائقي', 'Documentaire', 95, '2024-03-09', '15:00', 'المخرج كمال البور', 'Le realisateur Kamal El Bour', 'وثائقي يستكشف الحياة اليومية في منطقة الساورة', 'Un documentaire explorant la vie quotidienne dans la region de la Saoura', false, true, 2),
('البحر الأحمر يغطس', 'La Mer Rouge Plonge', 'سعيد خلاف', 'Said Khallaf', 2023, 'المغرب', 'Maroc', 'دراما اجتماعية', 'Drame social', 105, '2024-04-06', '15:00', 'الباحث في السينما عبد الكريم الحجام', 'Le chercheur en cinema Abdelkarim El Hajam', 'قصة حب ونضال في مدينة ساحلية مغربية', 'Une histoire d''amour et de lutte dans une ville cotiere marocaine', false, false, 3),
('وشم العار', 'Le Tatouage de la Honte', 'حكيم بلعباس', 'Hakim Belabbes', 2022, 'المغرب', 'Maroc', 'دراما', 'Drame', 110, '2024-05-04', '15:00', 'الناقد السينمائي محمد بنعزيز', 'Le critique de cinema Mohamed Benaziz', 'فيلم يتناول موضوع الوصم الاجتماعي في المجتمع المغربي', 'Un film traitant du stigmate social dans la societe marocaine', false, false, 4);

-- Masterclasses
INSERT INTO masterclasses (title_ar, title_fr, guest_ar, guest_fr, role_ar, role_fr, date, topic_ar, topic_fr, display_order) VALUES
('لقاء مع حمادي كيروم', 'Rencontre avec Hamadi Kirom', 'حمادي كيروم', 'Hamadi Kirom', 'ناقد سينمائي', 'Critique de cinema', '2024-02-10', 'قراءة نقدية في السينما المغربية المعاصرة', 'Lecture critique du cinema marocain contemporain', 1),
('ورشة كتابة السيناريو', 'Atelier d''ecriture de scenario', 'محمد الشريف الطريبق', 'Mohamed Cherif Tribak', 'كاتب سيناريو ومخرج', 'Scenariste et realisateur', '2024-03-15', 'أساسيات بناء القصة السينمائية', 'Les fondamentaux de la construction narrative cinematographique', 2);

-- News Articles
INSERT INTO news_articles (title_ar, title_fr, excerpt_ar, excerpt_fr, source, date, category_ar, category_fr, display_order) VALUES
('افتتاح نادي البرنوصي السينمائي بعرض فيلم "بامو"', 'Inauguration du Cine-Club Bernoussi avec le film "Bamo"', 'احتضنت دار الشباب سيدي البرنوصي حفل افتتاح النادي السينمائي الجديد بحضور نخبة من الفنانين والمثقفين', 'La Maison des Jeunes de Sidi Bernoussi a accueilli la ceremonie d''inauguration du nouveau cine-club', 'Medi1 TV', '2024-02-10', 'أخبار', 'Actualites', 1),
('جمعية الكرامة تطلق برنامج تكوين مهن السينما', 'Al-Karama lance un programme de formation aux metiers du cinema', 'أعلنت جمعية الكرامة عن إطلاق برنامج تكويني شامل يستهدف الشباب الراغبين في دخول عالم السينما', 'L''association Al-Karama a annonce le lancement d''un programme de formation complet', 'MAP', '2024-02-05', 'تكوين', 'Formation', 2),
('لقاء مع الناقد السينمائي حمادي كيروم', 'Rencontre avec le critique de cinema Hamadi Kirom', 'في إطار فعاليات الماستر كلاس، استضافت الجمعية الناقد السينمائي المغربي الشهير حمادي كيروم', 'L''association a accueilli le celebre critique de cinema marocain Hamadi Kirom', 'Al Aoual', '2024-01-28', 'ماستر كلاس', 'Masterclass', 3),
('شراكة جديدة مع المركز السينمائي المغربي', 'Nouveau partenariat avec le Centre Cinematographique Marocain', 'وقعت جمعية الكرامة اتفاقية شراكة استراتيجية مع المركز السينمائي المغربي', 'L''association Al-Karama a signe un accord de partenariat strategique avec le CCM', 'Hespress', '2024-01-15', 'شراكات', 'Partenariats', 4);

-- Testimonials
INSERT INTO testimonials (quote_ar, quote_fr, author_ar, author_fr, display_order) VALUES
('جمعية الكرامة نموذج يحتذى في العمل الثقافي الجمعوي، ونحن فخورون بهذه الشراكة', 'L''association Al-Karama est un modele exemplaire de travail culturel associatif, et nous sommes fiers de ce partenariat', 'مسؤول بالمركز السينمائي المغربي', 'Responsable au Centre Cinematographique Marocain', 1),
('نثمن الجهود الكبيرة التي تبذلها الجمعية في إدماج الفن السابع داخل المؤسسات التعليمية', 'Nous apprecions les efforts considerables deployes par l''association pour integrer le 7eme art dans les etablissements scolaires', 'مفتش تربوي إقليمي', 'Inspecteur pedagogique provincial', 2);

-- Productions
INSERT INTO productions (title_ar, title_fr, year, genre_ar, genre_fr, synopsis_ar, synopsis_fr, duration, cast_count, is_featured, display_order) VALUES
('الحُفرة', 'La Fosse', 2024, 'دراما', 'Drame', 'مسرحية تغوص في أعماق النفس البشرية وتكشف عن صراعات داخلية', 'Une piece qui plonge dans les profondeurs de l''ame humaine et revele des conflits interieurs', 60, 2, true, 1),
('صمت الكلام', 'Le Silence des Mots', 2023, 'دراما اجتماعية', 'Drame social', 'عمل مسرحي يتناول قضايا التواصل والصمت في المجتمع المعاصر', 'Une oeuvre theatrale abordant les questions de communication et de silence dans la societe contemporaine', 75, 5, false, 2),
('ذاكرة الأجداد', 'Memoire des Ancetres', 2022, 'تراثي', 'Patrimonial', 'رحلة في ذاكرة الأجداد واستكشاف التراث الثقافي المغربي', 'Un voyage dans la memoire des ancetres et l''exploration du patrimoine culturel marocain', 90, 8, false, 3),
('ضحكات مرة', 'Rires Amers', 2021, 'كوميديا سوداء', 'Comedie noire', 'كوميديا سوداء تسلط الضوء على مفارقات الحياة اليومية', 'Une comedie noire mettant en lumiere les paradoxes de la vie quotidienne', 65, 6, false, 4);

-- Festivals
INSERT INTO festivals (name_ar, name_fr, year, award_ar, award_fr, display_order) VALUES
('المهرجان الوطني للمسرح - مكناس', 'Festival National du Theatre - Meknes', 2023, 'جائزة أحسن عمل متكامل', 'Prix de la meilleure oeuvre integrale', 1),
('مهرجان الدار البيضاء للمسرح', 'Festival de Casablanca du Theatre', 2022, 'جائزة أحسن إخراج', 'Prix de la meilleure mise en scene', 2),
('الملتقى المغاربي للمسرح', 'Rencontres Maghrebines du Theatre', 2022, 'المشاركة والتمثيل', 'Participation et representation', 3);
