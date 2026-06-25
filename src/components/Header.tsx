import { useState, useEffect } from "react";
import { Mail, Linkedin, Github, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const githubLinks = [
  { label: "GitHub pessoal", href: "https://github.com/FabioSonats" },
  { label: "GitHub Raizhe", href: "https://github.com/Fabio-raizhe" },
  { label: "GitHub Debug", href: "https://github.com/debug-systems" },
];

const GithubMenu = ({ padding }: { padding: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      className={`text-muted-foreground hover:text-foreground transition-colors focus:outline-none ${padding}`}
      aria-label="GitHub"
    >
      <Github className="h-4 w-4" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="min-w-[11rem]">
      {githubLinks.map((g) => (
        <DropdownMenuItem key={g.label} asChild className="cursor-pointer">
          <a href={g.href} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            {g.label}
          </a>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Links simples (o GitHub é tratado à parte, como dropdown).
  const linksBefore = [
    { icon: Mail, href: "mailto:ferreirafabio51@gmail.com", label: "Email" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ferreira-f%C3%A1bio-98b4304a/", label: "LinkedIn" },
  ];
  const linksAfter = [
    { icon: Phone, href: "https://wa.me/5542991643802", label: "Phone" },
  ];

  const renderLink = (link: { icon: typeof Mail; href: string; label: string }, padding: string) => {
    const Icon = link.icon;
    return (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-muted-foreground hover:text-foreground transition-colors ${padding}`}
        aria-label={link.label}
      >
        <Icon className="h-4 w-4" />
      </a>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-lg font-medium text-foreground hover:text-muted-foreground transition-colors font-mono"
          >
            {"<Fábio />"}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('blog')}
            </Link>

            <div className="flex items-center gap-3 pl-6 border-l border-border">
              {linksBefore.map((link) => renderLink(link, "p-2"))}
              <GithubMenu padding="p-2" />
              {linksAfter.map((link) => renderLink(link, "p-2"))}
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              to="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('blog')}
            </Link>
            {linksBefore.map((link) => renderLink(link, "p-1.5"))}
            <GithubMenu padding="p-1.5" />
            {linksAfter.map((link) => renderLink(link, "p-1.5"))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
