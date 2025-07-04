
import { Code, Zap, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4 text-green-400">
            <Code className="h-8 w-8 animate-pulse" />
            <Zap className="h-8 w-8 animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 hero-title">
          <span className="text-white">{t('developer')}</span>
          <br />
          <span className="text-green-400">{t('flutter')}</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
          {t('specialized')} {" "}
          <span className="text-green-400">{t('crossPlatform')}</span>
          {t('solutions') && ` ${t('solutions')}`}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button 
            size="lg" 
            className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-3 text-lg shadow-lg shadow-green-500/20"
            asChild
          >
            <a href="https://comissao-flutter-web.web.app/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-5 w-5" />
              {t('viewFlutterProject')}
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-8 py-3 text-lg"
            asChild
          >
            <a href="https://chef-samurai-site.web.app/#/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-5 w-5" />
              {t('reactProject')}
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-8 py-3 text-lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('contact')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
