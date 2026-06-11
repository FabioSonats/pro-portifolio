import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProject } from '@/data/projects';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const project = slug ? getProject(slug, language) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container max-w-3xl mx-auto px-4 py-32 text-center">
          <p className="text-xl text-muted-foreground mb-8">{t('projectNotFound')}</p>
          <Button asChild>
            <Link to="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backToProjects')}
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container max-w-3xl mx-auto px-4 py-16">
        <Link
          to="/#projects"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToProjects')}
        </Link>

        {/* Header */}
        <header className="mb-12">
          <p className="text-sm text-muted-foreground mb-3">{project.status}</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground">{project.subtitle}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-muted text-muted-foreground text-sm border border-border"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.link && (
            <Button asChild className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                {t('accessProject')}
              </a>
            </Button>
          )}
        </header>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">{t('projectOverview')}</h2>
          <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
        </section>

        {/* Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">{t('projectProcess')}</h2>
          <ul className="space-y-3">
            {project.process.map((step, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">{t('projectStack')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.stack.map((group) => (
              <div key={group.area} className="border border-border rounded-md p-4">
                <h3 className="text-sm font-semibold text-foreground mb-3">{group.area}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="px-2.5 py-1 bg-muted text-muted-foreground text-xs border border-border">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">{t('projectChallenges')}</h2>
          <ul className="space-y-3">
            {project.challenges.map((item, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
