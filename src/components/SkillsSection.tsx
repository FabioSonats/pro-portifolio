
import { Code, Layers, Wrench, Star, GitBranch, Users, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Code,
      title: "Linguagens",
      skills: ["Dart", "TypeScript", "JavaScript", "Python", "HTML5", "CSS3"]
    },
    {
      icon: Layers,
      title: "Frameworks & Libraries",
      skills: ["Flutter", "ReactJs", "React Hooks", "React Router"]
    },
    {
      icon: Wrench,
      title: "Ferramentas",
      skills: ["Android Studio", "Xcode", "Code Magic", "VS Code", "GitHub Pages"]
    },
    {
      icon: Star,
      title: "Arquitetura",
      skills: ["MVVM", "BloC", "Provider (em Flutter)", "Component Architecture"]
    },
    {
      icon: GitBranch,
      title: "Controle de Versão",
      skills: ["Git", "GitHub"]
    },
    {
      icon: Users,
      title: "Metodologias Ágeis",
      skills: ["SCRUM", "Kanban"]
    }
  ];

  const backendSkills = [
    "Python", "Firebase", "Cloud Functions", "Scripts de automação", "GitHub Pages"
  ];

  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Code className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
            Competências Técnicas
          </h2>
          <div className="w-16 h-1 bg-green-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-slate-800/50 border-green-500/20 hover:border-green-400/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <category.icon className="h-6 w-6 text-green-400" />
                  <CardTitle className="text-lg text-green-400">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary" 
                      className="bg-green-400/10 text-green-400 border-green-400/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-slate-800/50 border-green-500/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-green-400" />
              <CardTitle className="text-lg text-green-400">Backend & Deploy</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {backendSkills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-green-400/10 text-green-400 border-green-400/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SkillsSection;
