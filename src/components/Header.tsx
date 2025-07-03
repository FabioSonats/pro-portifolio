
import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-green-500/30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-green-400">Fábio Ferreira</h1>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-300 hover:text-green-400 hover:bg-green-400/10"
            asChild
          >
            <a href="mailto:ferreirafabio51@gmail.com" target="_blank" rel="noopener noreferrer">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-300 hover:text-green-400 hover:bg-green-400/10"
            asChild
          >
            <a href="https://www.linkedin.com/in/ferreira-f%C3%A1bio-98b4304a/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-300 hover:text-green-400 hover:bg-green-400/10"
            asChild
          >
            <a href="https://github.com/FabioSonats" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-black font-bold">
            F
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
