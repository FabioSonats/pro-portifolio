
import { Code, Zap, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4 text-green-400">
            <Code className="h-8 w-8" />
            <Zap className="h-8 w-8" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="text-white">Desenvolvedor</span>
          <br />
          <span className="text-green-400">Flutter</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Especializado em aplicações móveis e soluções inovadoras{" "}
          <span className="text-green-400">cross-platform</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            Ver Projeto Flutter Web
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-green-400 text-green-400 hover:bg-green-400 hover:text-slate-900 px-8 py-3 text-lg"
          >
            Contato
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-green-400 text-green-400 hover:bg-green-400 hover:text-slate-900 px-8 py-3 text-lg"
          >
            Sobre Mim
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
