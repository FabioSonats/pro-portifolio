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
      ? 'Desenvolvedor Flutter na Tecnofit (Agosto 2022 – Maio 2024)' 
      : 'Flutter Developer at Tecnofit (August 2022 – May 2024)',
    specialties: language === 'pt-BR'
      ? [
          'Manutenção e desenvolvimento de funcionalidades em aplicativos Flutter',
          'Implementação de aplicativos White Label para múltiplas plataformas (iOS e Android)',
          'Colaboração em equipes ágeis usando SCRUM',
          'Integração de APIs REST em projetos Flutter',
          'Aplicação de arquiteturas MVVM, BloC e Provider com Dart',
          'Controle de versão com Git',
          'Replicação e customização de modelos de aplicativos para diferentes academias'
        ]
      : [
          'Maintenance and development of features in Flutter applications',
          'Implementation of White Label applications for multiple platforms (iOS and Android)',
          'Collaboration in agile teams using SCRUM',
          'Integration of REST APIs in Flutter projects',
          'Application of MVVM, BloC and Provider architectures with Dart',
          'Version control with Git',
          'Replication and customization of application models for different gyms'
        ]
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