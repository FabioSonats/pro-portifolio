
import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pt-BR';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    about: "About",
    education: "Education",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    
    // Hero Section
    developer: "Developer",
    flutter: "Flutter",
    specialized: "Specialized in mobile applications and innovative",
    crossPlatform: "cross-platform",
    solutions: "solutions",
    viewFlutterProject: "View Flutter Web Project",
    reactProject: "ReactJS Project",
    
    // About Section
    aboutMe: "About Me",
    aboutTitle: "A little more about me",
    aboutText1: "I am a Flutter developer passionate about creating innovative and efficient solutions. With experience in mobile app development and user interfaces, I constantly seek to improve my skills and deliver high-quality results.",
    aboutText2: "My passion for technology drives me to explore new tools and approaches, always looking for creative and efficient solutions to the challenges I encounter.",
    mySkills: "My Skills",
    crossPlatformDev: "Cross-Platform Development",
    uiUxDesign: "UI/UX Design",
    cleanCode: "Clean Code",
    
    // Education Section
    educationSection: "Education",
    academicEducation: "Academic Education",
    certification: "Certification",
    pucPr: "Pontifical Catholic University of Paraná (PUC-PR)",
    systemsAnalysis: "Systems Analysis and Development Technology",
    completionForecast: "Completion Forecast: Graduated",
    udemy: "Udemy",
    webDevelopment: "Web Development with ReactJs",
    
    // Experience Section
    professionalExperience: "Professional Experience",
    flutterDeveloper: "Flutter Developer",
    tecnofit: "Tecnofit, Curitiba",
    period: "August 2022 – May 2024",
    presentialHybrid: "On-site/Hybrid",
    flutterMaintenance: "Maintenance and development of features in Flutter applications",
    whiteLabelImplementation: "Implementation of White Label applications using Flutter for multiple platforms (iOS and Android)",
    agileCollaboration: "Collaboration in agile teams using SCRUM",
    restApiIntegration: "Integration of REST APIs in Flutter projects",
    architectureApplication: "Application of MVVM, BloC and Provider architectures with Dart in Flutter development",
    versionControl: "Version control with Git",
    appReplication: "Replication and customization of application models for different gyms",
    
    // Skills Section
    technicalSkills: "Technical Skills",
    frontendDevelopment: "Frontend Development",
    frontendDesc: "Experience with ReactJS, Flutter and development of responsive and accessible interfaces.",
    database: "Database",
    databaseDesc: "Knowledge in Firebase, SQLite and integration with REST APIs for data management.",
    mobileDevelopment: "Mobile Development",
    mobileDesc: "Specialized in Flutter for creating cross-platform applications for iOS and Android.",
    webDeploy: "Web and Deploy",
    webDeployDesc: "Skills in web application deployment, hosting and performance optimization.",
    
    // Soft Skills Section
    interpersonalSkills: "Interpersonal Skills",
    creativity: "Creativity in building solutions",
    communication: "Clear and direct communication",
    learning: "Ease of learning and sharing knowledge",
    commitment: "Commitment to high-quality collaborative deliveries",
    
    // Languages Section
    languages: "Languages",
    portuguese: "Portuguese",
    english: "English",
    native: "Native",
    intermediate: "Intermediate",
    
    // Projects Section
    projectsSection: "Projects",
    projectsSubtitle: "Some of the projects I've developed, demonstrating my skills in Flutter and ReactJS",
    highlight: "Highlight",
    flutterWebProject: "Flutter Web Project",
    leadManager: "Lead Manager",
    activeProject: "Project in active development",
    flutterProjectDesc: "Lead management system for marketing company developed with Flutter Web. Project under construction that demonstrates skills in cross-platform development and creating business solutions using Flutter for web.",
    recipeCreator: "Recipe Creator",
    webRecipeApp: "Web Application for Recipe Creation",
    personalProject: "Personal project developed with ReactJS",
    recipeProjectDesc: "Web platform where users can create and manage recipes for any type of meal. Developed with ReactJS, it demonstrates skills in modern frontend development and creating intuitive interfaces for content management.",
    viewProject: "View Project",
    whiteLabel: "More than 90 white label applications published - replicable models customized for different gyms",
    
    // Contact Section
    workTogether: "Let's Work Together?",
    contactSubtitle: "I'm always interested in new projects and opportunities. Get in touch to discuss how I can contribute to your project.",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    connect: "Connect",
    sendEmail: "Send Email",
    access: "Access",
    
    // Navigation
    backToTop: "Back to Top"
  },
  'pt-BR': {
    // Navigation
    about: "Sobre",
    education: "Formação",
    experience: "Experiência",
    projects: "Projetos",
    skills: "Habilidades",
    contact: "Contato",
    
    // Hero Section
    developer: "Desenvolvedor",
    flutter: "Flutter",
    specialized: "Especializado em aplicações móveis e soluções inovadoras",
    crossPlatform: "cross-platform",
    solutions: "",
    viewFlutterProject: "Ver Projeto Flutter Web",
    reactProject: "Projeto ReactJS",
    
    // About Section
    aboutMe: "Sobre Mim",
    aboutTitle: "Um pouco mais sobre mim",
    aboutText1: "Sou um desenvolvedor Flutter apaixonado por criar soluções inovadoras e eficientes. Com experiência em desenvolvimento de aplicativos móveis e interfaces de usuário, busco constantemente aprimorar minhas habilidades e entregar resultados de alta qualidade.",
    aboutText2: "Minha paixão por tecnologia me impulsiona a explorar novas ferramentas e abordagens, sempre em busca de soluções criativas e eficientes para os desafios que encontro.",
    mySkills: "Minhas Habilidades",
    crossPlatformDev: "Desenvolvimento Cross-Platform",
    uiUxDesign: "UI/UX Design",
    cleanCode: "Clean Code",
    
    // Education Section
    educationSection: "Formação",
    academicEducation: "Formação Acadêmica",
    certification: "Certificação",
    pucPr: "Pontifícia Universidade Católica do Paraná (PUC-PR)",
    systemsAnalysis: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    completionForecast: "Previsão de Conclusão: Formado",
    udemy: "Udemy",
    webDevelopment: "Desenvolvimento Web com ReactJs",
    
    // Experience Section
    professionalExperience: "Experiência Profissional",
    flutterDeveloper: "Desenvolvedor Flutter",
    tecnofit: "Tecnofit, Curitiba",
    period: "Agosto 2022 – Maio 2024",
    presentialHybrid: "Presencial/Híbrido",
    flutterMaintenance: "Manutenção e desenvolvimento de funcionalidades em aplicativos Flutter",
    whiteLabelImplementation: "Implementação de aplicativos White Label utilizando Flutter para múltiplas plataformas (iOS e Android)",
    agileCollaboration: "Colaboração em equipes ágeis usando SCRUM",
    restApiIntegration: "Integração de APIs REST em projetos Flutter",
    architectureApplication: "Aplicação de arquiteturas MVVM, BloC e Provider com Dart no desenvolvimento Flutter",
    versionControl: "Controle de versão com Git",
    appReplication: "Replicação e customização de modelos de aplicativos para diferentes academias",
    
    // Skills Section
    technicalSkills: "Habilidades Técnicas",
    frontendDevelopment: "Desenvolvimento Frontend",
    frontendDesc: "Experiência com ReactJS, Flutter e desenvolvimento de interfaces responsivas e acessíveis.",
    database: "Banco de Dados",
    databaseDesc: "Conhecimento em Firebase, SQLite e integração com APIs REST para gerenciamento de dados.",
    mobileDevelopment: "Desenvolvimento Mobile",
    mobileDesc: "Especializado em Flutter para criação de aplicativos cross-platform para iOS e Android.",
    webDeploy: "Web e Deploy",
    webDeployDesc: "Habilidades em deploy de aplicações web, hospedagem e otimização para performance.",
    
    // Soft Skills Section
    interpersonalSkills: "Habilidades Interpessoais",
    creativity: "Criatividade na construção de soluções",
    communication: "Comunicação clara e direta",
    learning: "Facilidade para aprender e compartilhar conhecimento",
    commitment: "Compromisso com entregas colaborativas de alta qualidade",
    
    // Languages Section
    languages: "Idiomas",
    portuguese: "Português",
    english: "Inglês",
    native: "Nativo",
    intermediate: "Intermediário",
    
    // Projects Section
    projectsSection: "Projetos",
    projectsSubtitle: "Alguns dos projetos que desenvolvi, demonstrando minhas habilidades em Flutter e ReactJS",
    highlight: "Destaque",
    flutterWebProject: "Projeto Flutter Web",
    leadManager: "Gerenciador de Leads",
    activeProject: "Projeto em desenvolvimento ativo",
    flutterProjectDesc: "Sistema de gerenciamento de leads para empresa de marketing desenvolvido com Flutter Web. Projeto em construção que demonstra habilidades em desenvolvimento cross-platform e criação de soluções de negócio utilizando Flutter para web.",
    recipeCreator: "Criador de Receitas",
    webRecipeApp: "Aplicação Web para Criação de Receitas",
    personalProject: "Projeto pessoal desenvolvido com ReactJS",
    recipeProjectDesc: "Plataforma web onde os usuários podem criar e gerenciar receitas de qualquer tipo de refeição. Desenvolvida com ReactJS, demonstra habilidades em desenvolvimento frontend moderno e criação de interfaces intuitivas para gestão de conteúdo.",
    viewProject: "Ver Projeto",
    whiteLabel: "Mais de 90 aplicativos white label publicados - modelos replicáveis customizados para diferentes academias",
    
    // Contact Section
    workTogether: "Vamos Trabalhar Juntos?",
    contactSubtitle: "Estou sempre interessado em novos projetos e oportunidades. Entre em contato para discutirmos como posso contribuir com seu projeto.",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    connect: "Conecte-se",
    sendEmail: "Enviar Email",
    access: "Acessar",
    
    // Navigation
    backToTop: "Voltar ao Topo"
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
