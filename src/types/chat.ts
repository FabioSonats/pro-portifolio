export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface PortfolioData {
  education: {
    degree: string;
    institution: string;
    completion: string;
    certifications: Array<{
      name: string;
      provider: string;
    }>;
  };
  skills: {
    technical: string[];
    soft: string[];
  };
  languages: Array<{
    name: string;
    level: string;
  }>;
  experience: {
    focus: string;
    specialties: string[];
  };
  projects: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
    website: string;
    whatsapp: string;
    whatsappLink: string;
  };
}