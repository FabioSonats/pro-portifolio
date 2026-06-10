
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const ProjectsSection = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: t('pizzaProject'),
      subtitle: t('pizzaProjectSubtitle'),
      status: t('completedProject'),
      description: t('pizzaProjectDesc'),
      technologies: ["ReactJS", "Tailwind CSS", "JavaScript", "Responsive Design", "Modern UI"],
      link: "https://fabiosonats.github.io/more_pizza/",
      highlight: t('pizzaProjectHighlight')
    },
    {
      title: t('flutterWebProject'),
      subtitle: t('leadManager'),
      status: t('activeProject'),
      description: t('flutterProjectDesc'),
      technologies: ["Flutter Web", "Dart", "Firebase", "Responsive Design"],
      link: "https://comissao-flutter-web.web.app/"
    },
    {
      title: t('recipeCreator'),
      subtitle: t('webRecipeApp'),
      status: t('personalProject'),
      description: t('recipeProjectDesc'),
      technologies: ["ReactJS", "JavaScript", "CSS3", "HTML5", "GitHub Pages"],
      link: "https://fabiosonats.github.io/chef_samurai/#/"
    }
  ];

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
        <div className="mb-12">
          <Card className="bg-muted border border-border">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{t('highlight')}</h3>
              </div>
              <p className="text-muted-foreground text-lg">
                {projects[0].highlight}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <Card key={index} className="bg-card border border-border hover:border-foreground/30 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between flex-col lg:flex-row gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary flex items-center justify-center">
                        <ExternalLink className="h-4 w-4 text-primary-foreground" />
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
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t('viewProject')}
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-muted text-muted-foreground text-sm border border-border"
                    >
                      {tech}
                    </span>
                  ))}
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
