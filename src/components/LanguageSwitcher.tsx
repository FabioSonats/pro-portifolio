
import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black">
          <Globe className="h-4 w-4" />
          {language === 'en' ? 'EN' : 'PT'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-800 border-green-500/30">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className="text-white hover:bg-green-500/20 hover:text-green-400 cursor-pointer"
        >
          🇺🇸 English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('pt-BR')}
          className="text-white hover:bg-green-500/20 hover:text-green-400 cursor-pointer"
        >
          🇧🇷 Português
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
