import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Linkedin } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogPost } from '@/hooks/useBlogPosts';
import { useLanguage } from '@/contexts/LanguageContext';
import { useVisitTracker } from '@/hooks/useVisitTracker';

const BlogPost = () => {
  useVisitTracker();
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const { data: post, isLoading, isError } = useBlogPost(slug);
  const dateLocale = language === 'pt-BR' ? ptBR : enUS;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container max-w-2xl mx-auto px-6 pt-28 pb-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToBlog')}
        </Link>

        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        )}

        {isError && <p className="text-muted-foreground">{t('blogLoadError')}</p>}

        {!isLoading && !isError && !post && (
          <p className="text-muted-foreground">{t('noPosts')}</p>
        )}

        {post && (
          <article>
            <header className="mb-10 pb-8 border-b border-border">
              {post.category && (
                <Badge
                  variant="outline"
                  className="border-border text-muted-foreground font-normal mb-4"
                >
                  {post.category}
                </Badge>
              )}
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                {post.published_at && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {t('publishedOn')}{' '}
                    {format(new Date(post.published_at), "dd 'de' MMMM 'de' yyyy", {
                      locale: dateLocale,
                    })}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.reading_minutes ?? 5} {t('readingTime')}
                </span>
              </div>
            </header>

            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full rounded-none border border-border mb-10"
              />
            )}

            <div
              className="prose prose-invert prose-neutral max-w-none
                prose-headings:font-semibold prose-headings:tracking-tight
                prose-a:text-foreground prose-a:underline prose-a:underline-offset-4
                prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded-none prose-code:before:content-[''] prose-code:after:content-['']
                prose-pre:bg-muted prose-pre:border prose-pre:border-border
                prose-blockquote:border-l-foreground/30 prose-blockquote:text-muted-foreground
                prose-strong:text-foreground prose-img:rounded-none prose-img:border prose-img:border-border"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-border text-muted-foreground font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {post.linkedin_url && (
              <a
                href={post.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                {t('viewOnLinkedin')}
              </a>
            )}
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
