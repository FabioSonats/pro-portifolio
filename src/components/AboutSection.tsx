
import { User, Code, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <User className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
            {t('aboutMe')}
          </h2>
          <div className="w-16 h-1 bg-green-400 mx-auto"></div>
        </div>

        <Card className="bg-slate-800/50 border-green-500 border-2">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t('aboutTitle')}
                </h3>
                <p className="text-gray-300 mb-6">
                  {t('aboutText1')}
                </p>
                <p className="text-gray-300">
                  {t('aboutText2')}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t('mySkills')}
                </h3>
                <div className="flex items-center gap-4 text-green-400 mb-4">
                  <Code className="h-6 w-6" />
                  <p className="text-gray-300">{t('crossPlatformDev')}</p>
                </div>
                <div className="flex items-center gap-4 text-green-400 mb-4">
                  <Zap className="h-6 w-6" />
                  <p className="text-gray-300">{t('uiUxDesign')}</p>
                </div>
                <div className="flex items-center gap-4 text-green-400">
                  <Code className="h-6 w-6" />
                  <p className="text-gray-300">{t('cleanCode')}</p>
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
