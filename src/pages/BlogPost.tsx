import { Children, isValidElement, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUp, Clock, Calendar, Linkedin } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogReactions from '@/components/BlogReactions';
import BlogReferences from '@/components/BlogReferences';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogPost } from '@/hooks/useBlogPosts';
import { useLanguage } from '@/contexts/LanguageContext';
import { useVisitTracker } from '@/hooks/useVisitTracker';

// Gera um id "ancoravel" a partir do texto do heading (sem acento, minusculo).
const slugify = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const toText = (children: ReactNode): string =>
  Children.toArray(children)
    .map((c) =>
      typeof c === 'string' || typeof c === 'number'
        ? String(c)
        : isValidElement(c)
          ? toText((c.props as { children?: ReactNode }).children)
          : ''
    )
    .join('');

// Extrai os titulos de nivel 2 (## ) do markdown para montar o indice lateral.
const extractToc = (markdown: string) => {
  const items: { id: string; text: string }[] = [];
  let inCode = false;
  for (const line of markdown.split('\n')) {
    if (line.trim().startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const match = /^##(?!#)\s+(.+?)\s*$/.exec(line);
    if (match) {
      const text = match[1].trim();
      items.push({ text, id: slugify(text) });
    }
  }
  return items;
};

// Separa a secao "## Referencias" do corpo do artigo, para renderiza-la
// num bloco proprio recolhivel (mostrar mais / mostrar menos).
const splitReferences = (content: string) => {
  const lines = content.split('\n');
  const idx = lines.findIndex((l) => /^##\s+Referências\s*$/.test(l.trim()));
  if (idx === -1) return { bodyContent: content, references: [] as string[] };

  const bodyContent = lines.slice(0, idx).join('\n').trimEnd();
  const references = lines
    .slice(idx + 1)
    .map((l) => l.trim())
    .filter((l) => l.startsWith('- '))
    .map((l) => l.replace(/^-\s+/, ''));

  return { bodyContent, references };
};

// Headings com id automatico + offset para o header fixo nao cobrir o titulo.
const mdComponents = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 id={slugify(toText(children))} className="scroll-mt-28">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 id={slugify(toText(children))} className="scroll-mt-28">
      {children}
    </h3>
  ),
};

const BlogPost = () => {
  useVisitTracker();
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const { data: post, isLoading, isError } = useBlogPost(slug);
  const dateLocale = language === 'pt-BR' ? ptBR : enUS;

  const toc = useMemo(() => (post ? extractToc(post.content) : []), [post]);
  const { bodyContent, references } = useMemo(
    () => splitReferences(post?.content ?? ''),
    [post]
  );
  const [activeId, setActiveId] = useState<string>('');

  // Scroll spy: destaca no indice a secao visivel.
  useEffect(() => {
    if (!post || toc.length === 0) return;
    const els = toc
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [post, toc]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container max-w-7xl mx-auto px-6 pt-28 pb-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToBlog')}
        </Link>

        {isLoading && (
          <div className="max-w-2xl mx-auto space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        )}

        {isError && (
          <p className="max-w-2xl mx-auto text-muted-foreground">{t('blogLoadError')}</p>
        )}

        {!isLoading && !isError && !post && (
          <p className="max-w-2xl mx-auto text-muted-foreground">{t('noPosts')}</p>
        )}

        {post && (
          <div className="lg:grid lg:gap-8 lg:grid-cols-[12rem_minmax(0,42rem)] xl:grid-cols-[1fr_42rem_1fr] xl:gap-10">
            <aside className="hidden lg:block xl:justify-self-start">
              {toc.length > 0 && (
                <nav className="sticky top-28 w-48">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    {t('onThisPage')}
                  </p>
                  <ul className="space-y-1 text-sm">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={() => setActiveId(item.id)}
                          className={`block border-l py-1 pl-3 leading-snug transition-colors ${
                            activeId === item.id
                              ? 'border-foreground text-foreground'
                              : 'border-border text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </aside>

            <article className="w-full min-w-0">
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
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                  {bodyContent}
                </ReactMarkdown>
              </div>

              <BlogReferences items={references} />

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

              <BlogReactions
                slug={post.slug}
                initialLikes={post.likes ?? 0}
                initialDislikes={post.dislikes ?? 0}
              />

              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center gap-1.5 border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <ArrowUp className="h-4 w-4" />
                  {t('backToTop')}
                </button>
              </div>
            </article>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
