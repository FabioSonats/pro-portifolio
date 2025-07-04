
import { GraduationCap, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const EducationSection = () => {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <GraduationCap className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
            {t('education')}
          </h2>
          <div className="w-16 h-1 bg-green-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800/50 border-green-500/20 hover:border-green-400/40 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <CardTitle className="text-green-400">{t('academicEducation')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold text-white mb-2">
                {t('pucPr')}
              </h3>
              <p className="text-gray-300 mb-3">
                {t('systemsAnalysis')}
              </p>
              <p className="text-sm text-gray-400">
                {t('completionForecast')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-500/20 hover:border-green-400/40 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <CardTitle className="text-green-400">{t('certification')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold text-white mb-2">{t('udemy')}</h3>
              <p className="text-gray-300 mb-3">
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
