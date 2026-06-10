-- Blog: artigos completos derivados dos posts do LinkedIn
-- Cada post curto do LinkedIn vira um artigo detalhado aqui.

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,                 -- corpo do artigo em Markdown
  cover_image TEXT,                       -- URL da imagem de capa (opcional)
  tags TEXT[] DEFAULT '{}',
  category TEXT,                          -- ex: Seguranca, Code Review, Engenharia
  lang TEXT NOT NULL DEFAULT 'pt-BR',
  reading_minutes INTEGER DEFAULT 5,
  linkedin_url TEXT,                      -- link do post do LinkedIn que originou o artigo
  status TEXT NOT NULL DEFAULT 'draft',   -- 'draft' | 'published'
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT blog_posts_status_check CHECK (status IN ('draft', 'published'))
);

CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON blog_posts(status);
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts(published_at DESC);

-- Atualiza updated_at automaticamente
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

-- Seguranca: RLS habilitado
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Leitura publica APENAS de artigos publicados (anon e usuarios logados)
DROP POLICY IF EXISTS "Public can read published posts" ON blog_posts;
CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT
  USING (status = 'published');

-- Escrita (insert/update/delete) somente para usuarios autenticados (admin)
DROP POLICY IF EXISTS "Authenticated can manage posts" ON blog_posts;
CREATE POLICY "Authenticated can manage posts" ON blog_posts
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);
