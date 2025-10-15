
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const ExperienceSection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="experience" className="py-20 px-4 bg-white">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {t('professionalExperience')}
          </h2>
          <div className="w-16 h-1 bg-sky-500 mx-auto"></div>
        </div>

        <Card className="bg-white border-2 border-sky-100 hover:border-sky-200 transition-all duration-300 shadow-lg hover:shadow-xl">
          <CardHeader>
            <div className="flex items-start justify-between flex-col lg:flex-row gap-4">
              <div>
                <div className="mb-2">
                  <CardTitle className="text-2xl text-slate-800">
                    {language === 'pt-BR' ? 'Desenvolvedor Full Stack' : 'Full Stack Developer'}
                  </CardTitle>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <div>
                    <span>{language === 'pt-BR' ? 'Python para IA e ReactJS' : 'Python for AI and ReactJS'}</span>
                  </div>
                  <div>
                    <span>{language === 'pt-BR' ? '2022 – Presente' : '2022 – Present'}</span>
                  </div>
                  <div>
                    <span>{language === 'pt-BR' ? 'Remoto' : 'Remote'}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-sky-500 mt-2 flex-shrink-0"></div>
                <p className="text-slate-600">
                  {language === 'pt-BR' ? 'Desenvolvimento de agentes de IA e automação com Python' : 'Development of AI agents and automation with Python'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-sky-500 mt-2 flex-shrink-0"></div>
                <p className="text-slate-600">
                  {language === 'pt-BR' ? 'Criação de aplicações web modernas com ReactJS e Tailwind CSS' : 'Creation of modern web applications with ReactJS and Tailwind CSS'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-sky-500 mt-2 flex-shrink-0"></div>
                <p className="text-slate-600">
                  {language === 'pt-BR' ? 'Desenvolvimento de sites responsivos (Pizza, Receitas, Portfólio)' : 'Development of responsive websites (Pizza, Recipes, Portfolio)'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-sky-500 mt-2 flex-shrink-0"></div>
                <p className="text-slate-600">
                  {language === 'pt-BR' ? 'Implementação de sistemas de IA para automação de processos' : 'Implementation of AI systems for process automation'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-sky-500 mt-2 flex-shrink-0"></div>
                <p className="text-slate-600">
                  {language === 'pt-BR' ? 'Integração de APIs REST e serviços de terceiros' : 'Integration of REST APIs and third-party services'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-sky-500 mt-2 flex-shrink-0"></div>
                <p className="text-slate-600">
                  {language === 'pt-BR' ? 'Controle de versão com Git e metodologias ágeis' : 'Version control with Git and agile methodologies'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-sky-500 mt-2 flex-shrink-0"></div>
                <p className="text-slate-600">
                  {language === 'pt-BR' ? 'Experiência anterior em Flutter para desenvolvimento mobile' : 'Previous experience in Flutter for mobile development'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ExperienceSection;
