import { PortfolioData } from '@/types/chat';

export const getPortfolioData = (language: string): PortfolioData => ({
  education: {
    degree: language === 'pt-BR' ? 'Análise e Desenvolvimento de Sistemas' : 'Systems Analysis and Development',
    institution: 'PUC-PR',
    completion: language === 'pt-BR' ? 'Concluído' : 'Completed',
    certifications: [
      {
        name: language === 'pt-BR' ? 'Desenvolvimento Web Full Stack' : 'Full Stack Web Development',
        provider: 'Udemy'
      }
    ]
  },
  skills: {
    technical: ['React', 'Flutter', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Git', 'HTML', 'CSS'],
    soft: language === 'pt-BR' 
      ? ['Comunicação', 'Trabalho em equipe', 'Resolução de problemas', 'Pensamento crítico', 'Criatividade']
      : ['Communication', 'Teamwork', 'Problem solving', 'Critical thinking', 'Creativity']
  },
  languages: [
    { name: 'Português', level: language === 'pt-BR' ? 'Nativo' : 'Native' },
    { name: language === 'pt-BR' ? 'Inglês' : 'English', level: language === 'pt-BR' ? 'Intermediário' : 'Intermediate' },
    { name: language === 'pt-BR' ? 'Espanhol' : 'Spanish', level: language === 'pt-BR' ? 'Básico' : 'Basic' }
  ],
  experience: {
    focus: language === 'pt-BR' 
      ? 'Desenvolvimento de aplicações web e mobile' 
      : 'Web and mobile application development',
    specialties: language === 'pt-BR'
      ? ['UI/UX Design', 'Desenvolvimento Frontend', 'Desenvolvimento Backend', 'Integração de APIs']
      : ['UI/UX Design', 'Frontend Development', 'Backend Development', 'API Integration']
  },
  projects: language === 'pt-BR' 
    ? 'Aplicações Flutter, sistemas web responsivos, integração com APIs e desenvolvimento full-stack'
    : 'Flutter applications, responsive web systems, API integration and full-stack development',
  contact: {
    email: 'contato@fabiohenrique.dev',
    linkedin: 'https://www.linkedin.com/in/ferreira-f%C3%A1bio-98b4304a/',
    github: 'https://github.com/FabioSonats',
    website: 'fabiohenrique.dev',
    whatsapp: '+55 42 99164-3802',
    whatsappLink: 'https://wa.me/5542991643802'
  }
});