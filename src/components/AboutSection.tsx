
import { User, MapPin, Calendar, Mail, Code, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <User className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
            Sobre Mim
          </h2>
          <div className="w-16 h-1 bg-green-400 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Code className="h-6 w-6 text-green-400" />
              <h3 className="text-2xl font-bold text-white">
                Desenvolvedor Flutter Apaixonado por Tecnologia
              </h3>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Com experiência sólida em desenvolvimento Flutter, especializo-me na 
              criação de aplicações móveis robustas e escaláveis. Minha jornada inclui o 
              desenvolvimento de mais de <span className="text-green-400 font-semibold">90 aplicativos white label</span> publicados nas 
              principais lojas de aplicativos.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Formado em Análise e Desenvolvimento de Sistemas pela <span className="text-green-400 font-semibold">PUC-PR</span> e com 
              certificação em Desenvolvimento Web com ReactJs, estou sempre em 
              busca de novas tecnologias e melhores práticas de desenvolvimento.
            </p>
            
            <div className="flex items-center gap-2 text-green-400 text-lg font-semibold">
              <Zap className="h-5 w-5" />
              3+ anos transformando ideias em aplicativos
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-semibold">Email</span>
                </div>
                <p className="text-white">p.sonats@gmail.com</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-semibold">Localização</span>
                </div>
                <p className="text-white">Curitiba, PR</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-semibold">Experiência</span>
                </div>
                <p className="text-white">3+ anos em Flutter Development</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
