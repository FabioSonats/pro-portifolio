
import { GraduationCap, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EducationSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <GraduationCap className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
            Formação
          </h2>
          <div className="w-16 h-1 bg-green-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800/50 border-green-500/20 hover:border-green-400/40 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <CardTitle className="text-green-400">Formação Acadêmica</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold text-white mb-2">
                Pontifícia Universidade Católica do Paraná (PUC-PR)
              </h3>
              <p className="text-gray-300 mb-3">
                Tecnólogo em Análise e Desenvolvimento de Sistemas
              </p>
              <p className="text-sm text-gray-400">
                Previsão de Conclusão: Formado
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-500/20 hover:border-green-400/40 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <CardTitle className="text-green-400">Certificação</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold text-white mb-2">Udemy</h3>
              <p className="text-gray-300 mb-3">
                Desenvolvimento Web com ReactJs
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
