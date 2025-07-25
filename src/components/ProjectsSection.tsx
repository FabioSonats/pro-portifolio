
import { ExternalLink, Code, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const ProjectsSection = () => {
  const { t } = useLanguage();
  
  const projects = [
    {
      title: t('flutterWebProject'),
      subtitle: t('leadManager'),
      status: t('activeProject'),
      description: t('flutterProjectDesc'),
      technologies: ["Flutter Web", "Dart", "Firebase", "Responsive Design"],
      link: "https://comissao-flutter-web.web.app/",
      highlight: t('whiteLabel')
    },
    {
      title: t('pizzaMenu'),
      subtitle: t('pizzaMenuSubtitle'),
      status: t('personalProject'),
      description: t('pizzaMenuDesc'),
      technologies: ["ReactJS", "JavaScript", "CSS3", "HTML5", "Responsive Design"],
      link: "https://fabiosonats.github.io/more_pizza/"
    },
    {
      title: t('recipeCreator'),
      subtitle: t('webRecipeApp'),
      status: t('personalProject'),
      description: t('recipeProjectDesc'),
      technologies: ["ReactJS", "JavaScript", "CSS3", "HTML5", "GitHub Pages"],
      link: "https://chef-samurai-site.web.app/#/"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Code className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-6">
            {t('projectsSection')}
          </h2>
          <div className="w-16 h-1 bg-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('projectsSubtitle')}
          </p>
        </div>

        {/* Highlight Card */}
        <div className="mb-12">
          <Card className="bg-green-500/10 border-green-400 border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Star className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-bold text-green-400">{t('highlight')}</h3>
              </div>
              <p className="text-gray-200 text-lg">
                {projects[0].highlight}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <Card key={index} className="bg-black/50 border-green-500/30 hover:border-green-400/60 transition-all hover:transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
              <CardHeader>
                <div className="flex items-start justify-between flex-col lg:flex-row gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                        <ExternalLink className="h-4 w-4 text-black" />
                      </div>
                      <CardTitle className="text-2xl text-green-400">{project.title}</CardTitle>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{project.subtitle}</h3>
                    <p className="text-sm text-gray-400 mb-4">{project.status}</p>
                  </div>
                  <Button 
                    asChild
                    className="bg-green-500 hover:bg-green-600 text-black font-bold shadow-lg shadow-green-500/20"
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t('viewProject')}
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30"
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
