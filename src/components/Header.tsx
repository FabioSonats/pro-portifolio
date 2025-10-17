
import { useState, useEffect } from "react";
import { Mail, Linkedin, Github, Phone } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: t('experience'), id: 'experience' }
  ];

  const contactLinks = [
    { icon: Mail, href: "mailto:ferreirafabio51@gmail.com", label: "Email" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ferreira-f%C3%A1bio-98b4304a/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/FabioSonats", label: "GitHub" },
    { icon: Phone, href: "https://wa.me/5542991643802", label: "Phone" }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
      ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
      : 'bg-transparent'
      }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="text-2xl font-bold text-slate-700 cursor-pointer hover:text-slate-900 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {"<Fábio />"}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-slate-600 hover:text-slate-900 transition-colors duration-300 font-medium"
              >
                {item.label}
              </button>
            ))}

            {/* Contact Icons */}
            <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-slate-300">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900 transition-colors duration-300 p-2 rounded-full hover:bg-slate-100"
                    aria-label={link.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            <LanguageSwitcher />
          </nav>

          {/* Mobile Navigation - Always visible contact icons */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Contact Icons - Always visible */}
            <div className="flex items-center space-x-2">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900 transition-colors duration-300 p-1.5 rounded-full hover:bg-slate-100"
                    aria-label={link.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>

            <LanguageSwitcher />
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
