-- ============================================================
-- SETUP do projeto Supabase novo (pfyhjjuuqjrdcimvbxec)
-- Cole TODO este arquivo no SQL Editor e clique em Run.
-- Depois rode, em uma nova query, o arquivo:
--   supabase/migrations/20260610190100_seed_blog_posts.sql
-- ============================================================

-- ----------------------------------------------------------------
-- 1) Tabela de visitas (analytics / tracking do portfolio)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS visits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  page_url TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  screen_resolution TEXT,
  language TEXT,
  session_id TEXT,
  duration INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS visits_created_at_idx ON visits(created_at);
CREATE INDEX IF NOT EXISTS visits_page_url_idx ON visits(page_url);
CREATE INDEX IF NOT EXISTS visits_session_id_idx ON visits(session_id);

ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

-- Qualquer visitante (anonimo) pode registrar uma visita
DROP POLICY IF EXISTS "Allow anonymous visits insert" ON visits;
CREATE POLICY "Allow anonymous visits insert" ON visits
  FOR INSERT
  WITH CHECK (true);

-- Leitura das visitas liberada (dashboard)
DROP POLICY IF EXISTS "Allow visits read" ON visits;
CREATE POLICY "Allow visits read" ON visits
  FOR SELECT
  USING (true);

-- ----------------------------------------------------------------
-- 2) Tabela do blog (artigos derivados dos posts do LinkedIn)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  lang TEXT NOT NULL DEFAULT 'pt-BR',
  reading_minutes INTEGER DEFAULT 5,
  linkedin_url TEXT,
  likes INTEGER NOT NULL DEFAULT 0,
  dislikes INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT blog_posts_status_check CHECK (status IN ('draft', 'published'))
);

CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON blog_posts(status);
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts(published_at DESC);

CREATE OR REPLACE FUNCTION set_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION set_blog_posts_updated_at();

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Leitura publica APENAS de artigos publicados
DROP POLICY IF EXISTS "Public can read published posts" ON blog_posts;
CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT
  USING (status = 'published');

-- Escrita somente para usuarios autenticados (admin)
DROP POLICY IF EXISTS "Authenticated can manage posts" ON blog_posts;
CREATE POLICY "Authenticated can manage posts" ON blog_posts
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- ----------------------------------------------------------------
-- 3) Reacoes (gostei / nao gostei) do visitante anonimo
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION react_to_post(p_slug text, p_reaction text)
RETURNS TABLE(likes integer, dislikes integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_reaction = 'like' THEN
    UPDATE blog_posts SET likes = blog_posts.likes + 1
      WHERE slug = p_slug AND status = 'published';
  ELSIF p_reaction = 'dislike' THEN
    UPDATE blog_posts SET dislikes = blog_posts.dislikes + 1
      WHERE slug = p_slug AND status = 'published';
  END IF;

  RETURN QUERY
    SELECT b.likes, b.dislikes FROM blog_posts b WHERE b.slug = p_slug;
END;
$$;

GRANT EXECUTE ON FUNCTION react_to_post(text, text) TO anon, authenticated;
