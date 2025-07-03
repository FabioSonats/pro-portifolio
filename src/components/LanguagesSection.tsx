import { Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const LanguagesSection = () => {
  const languages = [
    {
      language: "Português",
      level: "Nativo",
      flag: "🇧🇷"
    },
    {
      language: "Inglês",
      level: "Intermediário",
      flag: "🇺🇸"
    }
  ];

  return (
    <section id="languages" className="py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Globe className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
            Idiomas
          </h2>
          <div className="w-16 h-1 bg-green-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {languages.map((lang, index) => (
            <Card key={index} className="bg-slate-800/50 border-green-500/20 hover:border-green-400/40 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">{lang.flag}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{lang.language}</h3>
                <p className="text-green-400 text-lg font-semibold">{lang.level}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;
