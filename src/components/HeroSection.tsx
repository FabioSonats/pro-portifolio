
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import FloatingTechBackground from "./FloatingTechBackground";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 bg-background relative overflow-hidden">
      {/* Floating Tech Background */}
      <FloatingTechBackground />

      <div className="text-center max-w-4xl mx-auto relative z-20">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 text-foreground">
          <span className="text-foreground">{t('developer')}</span>
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;

