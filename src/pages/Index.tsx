
import Header from "@/components/Header";
import StarField from "@/components/StarField";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import SoftSkillsSection from "@/components/SoftSkillsSection";
import LanguagesSection from "@/components/LanguagesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionNavigation from "@/components/SectionNavigation";
import ChatBot from "@/components/ChatBot";
import { useVisitTracker } from "@/hooks/useVisitTracker";

const Index = () => {
  // Track page visits
  useVisitTracker();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-x-hidden">
      <StarField />
      <Header />
      
      <main className="relative z-10">
        <HeroSection />
        <SectionNavigation nextSection="about" />
        
        <AboutSection />
        <SectionNavigation nextSection="education" prevSection="about" />
        
        <EducationSection />
        <SectionNavigation nextSection="experience" prevSection="education" />
        
        <ExperienceSection />
        <SectionNavigation nextSection="projects" prevSection="experience" />
        
        <ProjectsSection />
        <SectionNavigation nextSection="skills" prevSection="projects" />
        
        <SkillsSection />
        <SectionNavigation nextSection="soft-skills" prevSection="skills" />
        
        <SoftSkillsSection />
        <SectionNavigation nextSection="languages" prevSection="soft-skills" />
        
        <LanguagesSection />
        <SectionNavigation nextSection="contact" prevSection="languages" />
        
        <ContactSection />
        <SectionNavigation prevSection="contact" showBackToTop={true} />
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
