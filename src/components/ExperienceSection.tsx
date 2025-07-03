import { Building, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExperienceSection = () => {
  const experiences = [
    "Manutenção e desenvolvimento de funcionalidades em aplicativos Flutter",
    "Implementação de aplicativos White Label utilizando Flutter para múltiplas plataformas (iOS e Android)",
    "Colaboração em equipes ágeis usando SCRUM",
    "Integração de APIs REST em projetos Flutter",
    "Aplicação de arquiteturas MVVM, BloC e Provider com Dart no desenvolvimento Flutter",
    "Controle de versão com Git",
    "Replicação e customização de modelos de aplicativos para diferentes academias",
    "Sistema de gerência de funil de vendas em desenvolvimento"
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Building className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
            Experiência Profissional
          </h2>
          <div className="w-16 h-1 bg-green-400 mx-auto"></div>
        </div>

        <Card className="bg-slate-800/50 border-green-500 border-2 hover:border-green-400 transition-colors">
          <CardHeader>
            <div className="flex items-start justify-between flex-col lg:flex-row gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <Building className="h-4 w-4 text-slate-900" />
                  </div>
                  <CardTitle className="text-2xl text-white">Desenvolvedor Flutter</CardTitle>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>Tecnofit, Curitiba</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Agosto 2022 – Maio 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Presencial/Híbrido</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {experiences.map((experience, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">{experience}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ExperienceSection;
