
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const ExperienceSection = () => {
  const { t, language } = useLanguage();
  const pt = language === 'pt-BR';

  const experiences = [
    {
      company: 'Raizhe',
      role: pt ? 'Desenvolvedor Full Stack' : 'Full Stack Developer',
      period: pt ? 'Atual' : 'Current',
      link: 'https://www.linkedin.com/company/raizhe/posts/?feedView=all',
      linkLabel: 'LinkedIn',
      bullets: pt
        ? [
            'Produtos ponta a ponta: front web e mobile, backend, banco e integração com IA.',
            'React, Next.js e TypeScript no front; Node.js e Supabase Edge Functions no backend; PostgreSQL, Firebase e Redis.',
            'IA generativa em produtos reais: agentes e chatbots com Claude, Codex e Gemini, e transcrição com Whisper.',
            'Automação de operações com n8n, RD Station e APIs de Ads (Google, Meta e LinkedIn).',
            'Qualidade com testes (Vitest, Playwright) e CI; deploy com Docker e Vercel.',
          ]
        : [
            'End-to-end products: web and mobile front, backend, database and AI integration.',
            'React, Next.js and TypeScript on the front; Node.js and Supabase Edge Functions on the backend; PostgreSQL, Firebase and Redis.',
            'Generative AI in real products: agents and chatbots with Claude, Codex and Gemini, plus transcription with Whisper.',
            'Operations automation with n8n, RD Station and Ads APIs (Google, Meta and LinkedIn).',
            'Quality with tests (Vitest, Playwright) and CI; deploy with Docker and Vercel.',
          ],
    },
    {
      company: 'Debug',
      role: pt ? 'Desenvolvedor Python' : 'Python Developer',
      period: pt ? 'Atual' : 'Current',
      link: 'https://d-bug.io',
      linkLabel: 'd-bug.io',
      bullets: pt
        ? [
            'Desenvolvimento de backend em Python.',
            'Integração de serviços e APIs.',
          ]
        : [
            'Backend development in Python.',
            'Service and API integration.',
          ],
    },
    {
      company: 'Tecnofit',
      role: pt ? 'Desenvolvedor Flutter' : 'Flutter Developer',
      period: pt ? 'Ago 2022 – Mai 2024' : 'Aug 2022 – May 2024',
      link: undefined,
      linkLabel: undefined,
      bullets: pt
        ? [
            'Manutenção e desenvolvimento de funcionalidades em apps Flutter.',
            'Aplicativos White Label multiplataforma (iOS e Android).',
            'Arquiteturas MVVM, BloC e Provider; integração de APIs REST; SCRUM.',
          ]
        : [
            'Maintenance and feature development in Flutter apps.',
            'Cross-platform White Label applications (iOS and Android).',
            'MVVM, BloC and Provider architectures; REST API integration; SCRUM.',
          ],
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 bg-background">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            {t('professionalExperience')}
          </h2>
          <div className="w-16 h-1 bg-foreground mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {pt
              ? 'Do front mobile e web ao backend, banco e integração com IA.'
              : 'From mobile and web front to backend, database and AI integration.'}
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <Card
              key={exp.company}
              className="bg-card border border-border hover:border-foreground/30 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between flex-col lg:flex-row gap-4">
                  <div>
                    <CardTitle className="text-2xl text-foreground">{exp.company}</CardTitle>
                    <h3 className="text-lg font-semibold text-foreground mt-2">{exp.role}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{exp.period}</p>
                  </div>
                  {exp.link && (
                    <Button
                      asChild
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                    >
                      <a href={exp.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {exp.linkLabel}
                      </a>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {exp.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-foreground mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">{bullet}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
