import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useLanguage } from '@/contexts/LanguageContext';
import { useVisitTracker } from '@/hooks/useVisitTracker';

const Blog = () => {
  useVisitTracker();
  const { t, language } = useLanguage();
  const { data: posts, isLoading, isError } = useBlogPosts();
  const dateLocale = language === 'pt-BR' ? ptBR : enUS;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container max-w-3xl mx-auto px-6 pt-28 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToHome')}
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">{t('blogTitle')}</h1>
          <p className="text-muted-foreground leading-relaxed">{t('blogSubtitle')}</p>
        </header>

        {isLoading && (
          <div className="space-y-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        )}

        {isError && <p className="text-muted-foreground">{t('blogLoadError')}</p>}

        {!isLoading && !isError && (!posts || posts.length === 0) && (
          <p className="text-muted-foreground">{t('noPosts')}</p>
        )}

        {!isLoading && !isError && posts && posts.length > 0 && (
          <ul className="divide-y divide-border">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block py-8 transition-colors"
                >
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    {post.category && (
                      <Badge
                        variant="outline"
                        className="border-border text-muted-foreground font-normal"
                      >
                        {post.category}
                      </Badge>
                    )}
                    {post.published_at && (
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(post.published_at), 'dd MMM yyyy', { locale: dateLocale })}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.reading_minutes ?? 5} {t('readingTime')}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-medium tracking-tight group-hover:text-muted-foreground transition-colors">
                    {post.title}
                  </h2>

                  <p className="mt-2 text-muted-foreground line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <span className="mt-3 inline-block text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                    {t('readArticle')} &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-center pt-16">
          <LanguageSwitcher />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
