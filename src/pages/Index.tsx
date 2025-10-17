
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import SoftSkillsSection from "@/components/SoftSkillsSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import CookieConsent from "@/components/CookieConsent";
import { useVisitTracker } from "@/hooks/useVisitTracker";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const Index = () => {
  // Track page visits
  useVisitTracker();
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 text-slate-800 relative overflow-x-hidden">
      <Header />

      <main className="relative z-10">
        <HeroSection />

        {/* Experience Section - Always visible */}
        <ExperienceSection />

        {/* Expandable sections */}
        <div className="bg-white/80 backdrop-blur-sm border-t border-slate-200">
          <div className="container max-w-6xl mx-auto py-8">
            <div className="text-center mb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={() => setIsExpanded(!isExpanded)}
                  variant="outline"
                  className="bg-white hover:bg-sky-50 border-sky-300 text-sky-700 hover:text-sky-900 px-8 py-3 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="mr-2 h-5 w-5" />
                      {t('showLessInfo')}
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 h-5 w-5" />
                      {t('showMoreInfo')}
                    </>
                  )}
                </Button>

                <Button
                  onClick={() => {
                    setIsExpanded(true);
                    setTimeout(() => {
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t('viewProjects')}
                </Button>
              </div>
            </div>

            {isExpanded && (
              <div className="space-y-16 animate-slide-up">
                <SkillsSection />
                <EducationSection />
                <ProjectsSection />
                <SoftSkillsSection />
                <AboutSection />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <ChatBot />
      <CookieConsent />
    </div>
  );
};

export default Index;
