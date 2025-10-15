
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const EducationSection = () => {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-sky-500 mb-4">
            {t('educationSection')}
          </h2>
          <div className="w-16 h-1 bg-sky-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white border-sky-200 hover:border-sky-300 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-sky-500"></div>
                <CardTitle className="text-sky-500">{t('academicEducation')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {t('pucPr')}
              </h3>
              <p className="text-slate-600 mb-3">
                {t('systemsAnalysis')}
              </p>
              <p className="text-sm text-slate-500">
                {t('completionForecast')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-sky-200 hover:border-sky-300 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-sky-500"></div>
                <CardTitle className="text-sky-500">{t('certification')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{t('udemy')}</h3>
              <p className="text-slate-600 mb-3">
                {t('webDevelopment')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
