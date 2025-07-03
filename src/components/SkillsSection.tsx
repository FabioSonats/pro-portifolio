import { Code, Database, Smartphone, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SkillsSection = () => {
  const skills = [
    {
      icon: Code,
      title: "Desenvolvimento Frontend",
      description: "Experiência com ReactJS, Flutter e desenvolvimento de interfaces responsivas e acessíveis."
    },
    {
      icon: Database,
      title: "Banco de Dados",
      description: "Conhecimento em Firebase, SQLite e integração com APIs REST para gerenciamento de dados."
    },
    {
      icon: Smartphone,
      title: "Desenvolvimento Mobile",
      description: "Especializado em Flutter para criação de aplicativos cross-platform para iOS e Android."
    },
    {
      icon: Globe,
      title: "Web e Deploy",
      description: "Habilidades em deploy de aplicações web, hospedagem e otimização para performance."
    }
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Code className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
            Habilidades Técnicas
          </h2>
          <div className="w-16 h-1 bg-green-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <Card key={index} className="bg-slate-800/50 border-green-500/20 hover:border-green-400/40 transition-colors">
              <CardContent className="p-8 text-center">
                <skill.icon className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{skill.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
