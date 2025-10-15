
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
        <Button variant="outline" size="sm" className="gap-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white">
          <Globe className="h-4 w-4" />
          {language === 'en' ? 'EN' : 'PT'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border-sky-200">
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className="text-slate-700 hover:bg-sky-50 hover:text-sky-600 cursor-pointer"
        >
          🇺🇸 English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('pt-BR')}
          className="text-slate-700 hover:bg-sky-50 hover:text-sky-600 cursor-pointer"
        >
          🇧🇷 Português
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
