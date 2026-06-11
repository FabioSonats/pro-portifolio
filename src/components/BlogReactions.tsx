import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const STORAGE_PREFIX = 'blog-reaction:';

interface BlogReactionsProps {
  slug: string;
  initialLikes: number;
  initialDislikes: number;
}

const BlogReactions = ({ slug, initialLikes, initialDislikes }: BlogReactionsProps) => {
  const { t } = useLanguage();
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [voted, setVoted] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_PREFIX + slug);
    } catch {
      return null;
    }
  });
  const [pending, setPending] = useState(false);

  const react = async (reaction: 'like' | 'dislike') => {
    if (voted || pending) return;
    setPending(true);

    // Atualizacao otimista
    if (reaction === 'like') setLikes((n) => n + 1);
    else setDislikes((n) => n + 1);
    setVoted(reaction);
    try {
      localStorage.setItem(STORAGE_PREFIX + slug, reaction);
    } catch {
      // localStorage indisponivel: segue sem travar
    }

    const { data, error } = await supabase.rpc('react_to_post', {
      p_slug: slug,
      p_reaction: reaction,
    });

    if (!error && data && data[0]) {
      setLikes(data[0].likes);
      setDislikes(data[0].dislikes);
    }
    setPending(false);
  };

  const base =
    'inline-flex items-center gap-2 border border-border px-4 py-2 text-sm transition-colors disabled:cursor-default';

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <p className="text-sm text-muted-foreground mb-4">{t('reactionsQuestion')}</p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => react('like')}
          disabled={!!voted}
          aria-label="like"
          className={`${base} ${
            voted === 'like'
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <ThumbsUp className="h-4 w-4" />
          {likes}
        </button>
        <button
          type="button"
          onClick={() => react('dislike')}
          disabled={!!voted}
          aria-label="dislike"
          className={`${base} ${
            voted === 'dislike'
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <ThumbsDown className="h-4 w-4" />
          {dislikes}
        </button>
      </div>
      {voted && <p className="text-xs text-muted-foreground mt-3">{t('reactionsThanks')}</p>}
    </div>
  );
};

export default BlogReactions;
