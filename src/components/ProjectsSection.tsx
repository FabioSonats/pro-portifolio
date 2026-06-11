
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProjects } from "@/data/projects";

const ProjectsSection = () => {
  const { t, language } = useLanguage();
  const projects = getProjects(language);

  const featured = projects.find((p) => p.highlight) ?? projects[0];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
            {t('projectsSection')}
          </h2>
          <div className="w-16 h-1 bg-foreground mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('projectsSubtitle')}
          </p>
        </div>

        {/* Highlight Card */}
        {featured?.highlight && (
          <div className="mb-12">
            <Card className="bg-muted border border-border">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">{t('highlight')}</h3>
                </div>
                <p className="text-muted-foreground text-lg">
                  {featured.highlight}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="space-y-8">
          {projects.map((project) => (
            <Card key={project.slug} className="bg-card border border-border hover:border-foreground/30 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between flex-col lg:flex-row gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary flex items-center justify-center">
                        <ArrowRight className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-2xl text-foreground">{project.title}</CardTitle>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{project.subtitle}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{project.status}</p>
                  </div>
                  <Button
                    asChild
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                  >
                    <Link to={`/projects/${project.slug}`}>
                      {t('viewDetails')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Link to={`/projects/${project.slug}`} className="block group">
                  <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground transition-colors">
                    {project.summary}
                  </p>
                </Link>
                <div className="flex flex-wrap items-center gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted text-muted-foreground text-sm border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {t('viewProject')}
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
