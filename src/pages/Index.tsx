
import Header from "@/components/Header";
import StarField from "@/components/StarField";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import SoftSkillsSection from "@/components/SoftSkillsSection";
import LanguagesSection from "@/components/LanguagesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-x-hidden">
      <StarField />
      <Header />
      
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <SoftSkillsSection />
        <LanguagesSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
