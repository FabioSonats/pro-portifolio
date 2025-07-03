import { Heart, MessageCircle, Target, Users as UsersIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SoftSkillsSection = () => {
  const softSkills = [
    {
      icon: Heart,
      title: "Criatividade na construção de soluções"
    },
    {
      icon: MessageCircle,
      title: "Comunicação clara e direta"
    },
    {
      icon: UsersIcon,
      title: "Facilidade para aprender e compartilhar conhecimento"
    },
    {
      icon: Target,
      title: "Compromisso com entregas colaborativas de alta qualidade"
    }
  ];

  return (
    <section id="soft-skills" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <Card className="bg-slate-800/50 border-green-500 border-2">
          <CardContent className="p-8">
            <div className="text-center mb-12">
              <UsersIcon className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">
                Habilidades Interpessoais
              </h2>
              <div className="w-16 h-1 bg-green-400 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {softSkills.map((skill, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex items-center gap-3">
                    <skill.icon className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <p className="text-gray-300 text-lg">{skill.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SoftSkillsSection;
