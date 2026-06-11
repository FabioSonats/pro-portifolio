
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const SkillsSection = () => {
  const { t, language } = useLanguage();

  const skills = [
    {
      title: language === 'pt-BR' ? 'Python para IA' : 'Python for AI',
      description: language === 'pt-BR' ? 'Agentes de IA, automação e integração de modelos' : 'AI agents, automation and model integration'
    },
    {
      title: 'React & Next.js',
      description: language === 'pt-BR' ? 'Aplicações web modernas, App Router e SSR' : 'Modern web apps, App Router and SSR'
    },
    {
      title: 'TypeScript & Tailwind',
      description: language === 'pt-BR' ? 'Tipagem segura e interfaces responsivas com shadcn/ui' : 'Type-safe code and responsive UI with shadcn/ui'
    },
    {
      title: 'Supabase & Postgres',
      description: language === 'pt-BR' ? 'Auth, RLS, Edge Functions e Realtime' : 'Auth, RLS, Edge Functions and Realtime'
    },
    {
      title: language === 'pt-BR' ? 'Integração de IA' : 'AI Integration',
      description: language === 'pt-BR' ? 'Anthropic e Gemini SDK, chat com streaming e RAG' : 'Anthropic and Gemini SDK, streaming chat and RAG'
    },
    {
      title: language === 'pt-BR' ? 'APIs & Automação' : 'APIs & Automation',
      description: language === 'pt-BR' ? 'REST, webhooks e fluxos no n8n e Zapier' : 'REST, webhooks and n8n / Zapier flows'
    },
    {
      title: language === 'pt-BR' ? 'Testes Automatizados' : 'Automated Testing',
      description: language === 'pt-BR' ? 'Vitest, Jest e Playwright (e2e)' : 'Vitest, Jest and Playwright (e2e)'
    },
    {
      title: 'Docker & Deploy',
      description: language === 'pt-BR' ? 'Containerização, CI/CD e deploy em produção' : 'Containerization, CI/CD and production deployment'
    },
    {
      title: 'Flutter & Mobile',
      description: language === 'pt-BR' ? 'Apps cross-platform iOS e Android (experiência Tecnofit)' : 'Cross-platform iOS and Android apps (Tecnofit experience)'
    }
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            {t('technicalSkills')}
          </h2>
          <div className="w-16 h-1 bg-foreground mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <Card key={index} className="bg-card border border-border hover:border-foreground/30 transition-colors">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold tracking-tight text-foreground mb-3">{skill.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
