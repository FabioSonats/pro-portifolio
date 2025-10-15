
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="about" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-sky-500 mb-4">
            {t('aboutMe')}
          </h2>
          <div className="w-16 h-1 bg-sky-500 mx-auto"></div>
        </div>

        <Card className="bg-white border-sky-200 border-2">
          <CardContent className="p-8">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                {t('aboutTitle')}
              </h3>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  {t('aboutText1')}
                </p>
                <p>
                  {t('aboutText2')}
                </p>
                <p>
                  {language === 'pt-BR'
                    ? 'Além da programação, sou apaixonado por música - desde rock clássico até jazz e MPB. O cinema é outra paixão que me fascina, especialmente filmes que contam histórias únicas e inspiradoras. Um dos meus maiores sonhos é viajar pelo mundo, conhecer diferentes culturas e vivenciar novas experiências que me inspirem tanto na vida pessoal quanto profissional.'
                    : 'Beyond programming, I am passionate about music - from classic rock to jazz and Brazilian popular music. Cinema is another passion that fascinates me, especially films that tell unique and inspiring stories. One of my biggest dreams is to travel the world, meet different cultures and experience new adventures that inspire me both personally and professionally.'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;
