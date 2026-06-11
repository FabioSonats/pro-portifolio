-- Reacoes do blog: contadores de gostei / nao gostei por artigo.
-- Re-executavel (ADD COLUMN IF NOT EXISTS / CREATE OR REPLACE).

ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS likes INTEGER NOT NULL DEFAULT 0;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS dislikes INTEGER NOT NULL DEFAULT 0;

-- Funcao para o visitante anonimo registrar uma reacao de forma atomica.
-- SECURITY DEFINER: roda com privilegio do dono, ignorando o RLS para o UPDATE,
-- mas so incrementa contador (nao expoe nem altera outro dado).
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
