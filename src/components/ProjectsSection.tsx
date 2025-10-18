
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
          <h2 className="text-4xl md:text-5xl font-bold text-sky-500 mb-6">
            {t('projectsSection')}
          </h2>
          <div className="w-16 h-1 bg-sky-500 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('projectsSubtitle')}
          </p>
        </div>

        {/* Highlight Card */}
        <div className="mb-12">
          <Card className="bg-sky-50 border-sky-400 border-2">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-sky-500">{t('highlight')}</h3>
              </div>
              <p className="text-slate-700 text-lg">
                {projects[0].highlight}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <Card key={index} className="bg-white border-sky-200 hover:border-sky-300 transition-all hover:transform hover:scale-105 hover:shadow-lg hover:shadow-sky-500/20">
              <CardHeader>
                <div className="flex items-start justify-between flex-col lg:flex-row gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-sky-500 flex items-center justify-center">
                        <ExternalLink className="h-4 w-4 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-sky-500">{project.title}</CardTitle>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{project.subtitle}</h3>
                    <p className="text-sm text-slate-500 mb-4">{project.status}</p>
                  </div>
                  <Button
                    asChild
                    className="bg-sky-500 hover:bg-sky-600 text-white font-bold shadow-lg shadow-sky-500/20"
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t('viewProject')}
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-sky-100 text-sky-600 text-sm border border-sky-200"
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
