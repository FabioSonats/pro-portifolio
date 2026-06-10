import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type BlogPost = Tables<'blog_posts'>;

/** Resumo usado na listagem (sem o corpo completo do artigo). */
export type BlogPostSummary = Omit<BlogPost, 'content'>;

const LIST_COLUMNS =
  'id, slug, title, excerpt, cover_image, tags, category, lang, reading_minutes, linkedin_url, status, published_at, created_at, updated_at';

/** Lista os artigos publicados, mais recentes primeiro. */
export function useBlogPosts() {
  return useQuery({
    queryKey: ['blog_posts', 'published'],
    queryFn: async (): Promise<BlogPostSummary[]> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(LIST_COLUMNS)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;
      return (data ?? []) as BlogPostSummary[];
    },
  });
}

/** Busca um artigo publicado pelo slug. */
export function useBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: ['blog_posts', 'detail', slug],
    enabled: Boolean(slug),
    queryFn: async (): Promise<BlogPost | null> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug as string)
        .eq('status', 'published')
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });
}
