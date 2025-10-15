
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const SkillsSection = () => {
  const { t, language } = useLanguage();

  const skills = [
    {
      title: language === 'pt-BR' ? 'Python para IA' : 'Python for AI',
      description: language === 'pt-BR' ? 'Desenvolvimento de agentes de IA, automação e machine learning' : 'AI agents development, automation and machine learning'
    },
    {
      title: 'ReactJS & Tailwind CSS',
      description: language === 'pt-BR' ? 'Desenvolvimento de aplicações web modernas e responsivas' : 'Modern and responsive web applications development'
    },
    {
      title: 'Git Avançado',
      description: language === 'pt-BR' ? 'Controle de versão avançado, branching strategies e CI/CD' : 'Advanced version control, branching strategies and CI/CD'
    },
    {
      title: 'SQL & Bancos de Dados',
      description: language === 'pt-BR' ? 'Consultas complexas, otimização e design de banco de dados' : 'Complex queries, optimization and database design'
    },
    {
      title: 'Testes Automatizados',
      description: language === 'pt-BR' ? 'Jest, Cypress, testes unitários e de integração' : 'Jest, Cypress, unit and integration testing'
    },
    {
      title: 'Docker & Deploy',
      description: language === 'pt-BR' ? 'Containerização e deploy em produção' : 'Containerization and production deployment'
    },
    {
      title: 'Scrum & Kanban',
      description: language === 'pt-BR' ? 'Metodologias ágeis e gestão de projetos' : 'Agile methodologies and project management'
    },
    {
      title: 'Flutter & Mobile',
      description: language === 'pt-BR' ? 'Desenvolvimento mobile cross-platform' : 'Cross-platform mobile development'
    }
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-sky-500 mb-4">
            {t('technicalSkills')}
          </h2>
          <div className="w-16 h-1 bg-sky-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <Card key={index} className="bg-white border-sky-200 hover:border-sky-300 transition-colors hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-3">{skill.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
