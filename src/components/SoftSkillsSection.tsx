
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const SoftSkillsSection = () => {
  const { t } = useLanguage();

  const softSkills = [
    {
      title: t('creativity')
    },
    {
      title: t('communication')
    },
    {
      title: t('learning')
    },
    {
      title: t('commitment')
    }
  ];

  return (
    <section id="soft-skills" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <Card className="bg-white border-sky-200 border-2">
          <CardContent className="p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-sky-500 mb-4">
                {t('interpersonalSkills')}
              </h2>
              <div className="w-16 h-1 bg-sky-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {softSkills.map((skill, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-sky-500 mt-2 flex-shrink-0"></div>
                  <p className="text-slate-600 text-lg">{skill.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SoftSkillsSection;
