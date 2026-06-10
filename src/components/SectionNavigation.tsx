
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface SectionNavigationProps {
  nextSection?: string;
  prevSection?: string;
  showBackToTop?: boolean;
}

const SectionNavigation = ({ nextSection, prevSection, showBackToTop }: SectionNavigationProps) => {
  const { t } = useLanguage();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex justify-center items-center gap-4 py-8">
      {prevSection && (
        <Button
          variant="outline"
          size="icon"
          className="border border-border bg-transparent text-foreground hover:bg-muted"
          onClick={() => scrollToSection(prevSection)}
          aria-label="Seção anterior"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
      
      {showBackToTop && (
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6"
          onClick={scrollToTop}
        >
          <ChevronUp className="mr-2 h-4 w-4" />
          {t('backToTop')}
        </Button>
      )}
      
      {nextSection && (
        <Button
          variant="outline"
          size="icon"
          className="border border-border bg-transparent text-foreground hover:bg-muted"
          onClick={() => scrollToSection(nextSection)}
          aria-label="Próxima seção"
        >
          <ChevronDown className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default SectionNavigation;
