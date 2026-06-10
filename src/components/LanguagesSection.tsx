
import { Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguagesSection = () => {
  const { t } = useLanguage();
  
  const languages = [
    {
      language: t('portuguese'),
      level: t('native'),
      flag: "🇧🇷"
    },
    {
      language: t('english'),
      level: t('intermediate'),
      flag: "🇺🇸"
    }
  ];

  return (
    <section id="languages" className="py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Globe className="h-12 w-12 text-foreground mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            {t('languages')}
          </h2>
          <div className="w-16 h-1 bg-foreground mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {languages.map((lang, index) => (
            <Card key={index} className="bg-card border border-border hover:border-foreground/30 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">{lang.flag}</div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-2">{lang.language}</h3>
                <p className="text-muted-foreground text-lg font-medium">{lang.level}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;
