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
    technical: ['Python', 'React', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'Node.js', 'Git', 'HTML', 'CSS', 'Flutter'],
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
      ? 'Desenvolvedor Full Stack - Python para IA e ReactJS (2022 – Presente)'
      : 'Full Stack Developer - Python for AI and ReactJS (2022 – Present)',
    specialties: language === 'pt-BR'
      ? [
        'Desenvolvimento de agentes de IA e automação com Python',
        'Criação de aplicações web modernas com ReactJS e Tailwind CSS',
        'Desenvolvimento de sites responsivos (Pizza, Receitas, Portfólio)',
        'Implementação de sistemas de IA para automação de processos',
        'Integração de APIs REST e serviços de terceiros',
        'Controle de versão com Git e metodologias ágeis',
        'Experiência anterior em Flutter para desenvolvimento mobile'
      ]
      : [
        'Development of AI agents and automation with Python',
        'Creation of modern web applications with ReactJS and Tailwind CSS',
        'Development of responsive websites (Pizza, Recipes, Portfolio)',
        'Implementation of AI systems for process automation',
        'Integration of REST APIs and third-party services',
        'Version control with Git and agile methodologies',
        'Previous experience in Flutter for mobile development'
      ]
  },
  projects: language === 'pt-BR'
    ? 'Aplicações Flutter, sistemas web responsivos, integração com APIs e desenvolvimento full-stack'
    : 'Flutter applications, responsive web systems, API integration and full-stack development',
  contact: {
    email: 'ferreirafabio51@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ferreira-f%C3%A1bio-98b4304a/',
    github: 'https://github.com/FabioSonats',
    website: 'fabiohenrique.dev',
    whatsapp: '+55 42 99164-3802',
    whatsappLink: 'https://wa.me/5542991643802'
  }
});