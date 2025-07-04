
import { Code, Database, Smartphone, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const SkillsSection = () => {
  const { t } = useLanguage();
  
  const skills = [
    {
      icon: Code,
      title: t('frontendDevelopment'),
      description: t('frontendDesc')
    },
    {
      icon: Database,
      title: t('database'),
      description: t('databaseDesc')
    },
    {
      icon: Smartphone,
      title: t('mobileDevelopment'),
      description: t('mobileDesc')
    },
    {
      icon: Globe,
      title: t('webDeploy'),
      description: t('webDeployDesc')
    }
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Code className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
            {t('technicalSkills')}
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
