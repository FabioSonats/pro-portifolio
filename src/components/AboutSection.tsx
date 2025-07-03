import { User, Code, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <User className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
            Sobre Mim
          </h2>
          <div className="w-16 h-1 bg-green-400 mx-auto"></div>
        </div>

        <Card className="bg-slate-800/50 border-green-500 border-2">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Um pouco mais sobre mim
                </h3>
                <p className="text-gray-300 mb-6">
                  Sou um desenvolvedor Flutter apaixonado por criar soluções
                  inovadoras e eficientes. Com experiência em desenvolvimento
                  de aplicativos móveis e interfaces de usuário, busco
                  constantemente aprimorar minhas habilidades e entregar
                  resultados de alta qualidade.
                </p>
                <p className="text-gray-300">
                  Minha paixão por tecnologia me impulsiona a explorar novas
                  ferramentas e abordagens, sempre em busca de soluções
                  criativas e eficientes para os desafios que encontro.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Minhas Habilidades
                </h3>
                <div className="flex items-center gap-4 text-green-400 mb-4">
                  <Code className="h-6 w-6" />
                  <p className="text-gray-300">Desenvolvimento Cross-Platform</p>
                </div>
                <div className="flex items-center gap-4 text-green-400 mb-4">
                  <Zap className="h-6 w-6" />
                  <p className="text-gray-300">UI/UX Design</p>
                </div>
                <div className="flex items-center gap-4 text-green-400">
                  <Code className="h-6 w-6" />
                  <p className="text-gray-300">Clean Code</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;
