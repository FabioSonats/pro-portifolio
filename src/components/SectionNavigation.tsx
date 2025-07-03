
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionNavigationProps {
  nextSection?: string;
  prevSection?: string;
  showBackToTop?: boolean;
}

const SectionNavigation = ({ nextSection, prevSection, showBackToTop }: SectionNavigationProps) => {
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
          className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
          onClick={() => scrollToSection(prevSection)}
          aria-label="Seção anterior"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
      
      {showBackToTop && (
        <Button
          className="bg-green-500 hover:bg-green-600 text-black font-bold px-6"
          onClick={scrollToTop}
        >
          <ChevronUp className="mr-2 h-4 w-4" />
          Voltar ao Início
        </Button>
      )}
      
      {nextSection && (
        <Button
          variant="outline"
          size="icon"
          className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
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
