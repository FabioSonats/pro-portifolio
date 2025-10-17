
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import FloatingTechBackground from "./FloatingTechBackground";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Floating Tech Background */}
      <FloatingTechBackground />

      <div className="text-center max-w-4xl mx-auto relative z-20">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-800">
          <span className="text-sky-500">{t('developer')}</span>
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;

