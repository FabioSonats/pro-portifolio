// Fonte única dos projetos do portfólio.
// Conteúdo bilíngue resolvido por getProjects(language).
// Projetos da Raizhe são apresentados como case study (sem link externo
// nem dado sensível de cliente); projetos públicos mantêm o link.

type L = { en: string; ptBR: string };
type LList = { en: string[]; ptBR: string[] };

interface StackGroup {
  area: L;
  items: string[];
}

interface RawProject {
  slug: string;
  title: string;
  status: L;
  subtitle: L;
  summary: L;
  highlight?: L;
  technologies: string[];
  link?: string;
  overview: L;
  process: LList;
  stack: StackGroup[];
  challenges: LList;
}

export interface Project {
  slug: string;
  title: string;
  status: string;
  subtitle: string;
  summary: string;
  highlight?: string;
  technologies: string[];
  link?: string;
  overview: string;
  process: string[];
  stack: { area: string; items: string[] }[];
  challenges: string[];
}

const pick = (value: L, language: string): string =>
  language === 'pt-BR' ? value.ptBR : value.en;

const pickList = (value: LList, language: string): string[] =>
  language === 'pt-BR' ? value.ptBR : value.en;

// Ordem do array = ordem de relevância exibida.
const rawProjects: RawProject[] = [
  {
    slug: 'atlas-crm',
    title: 'Atlas CRM',
    status: {
      ptBR: 'Produto interno da Raizhe · em desenvolvimento ativo',
      en: 'Raizhe internal product · in active development',
    },
    subtitle: {
      ptBR: 'CRM com governança de IA e transcrição de calls',
      en: 'CRM with AI governance and call transcription',
    },
    summary: {
      ptBR: 'CRM construído do zero para o time comercial da Raizhe. Captura e transcreve calls, calcula o score de ICP de cada lead e governa as decisões da IA com regras de engenharia rígidas.',
      en: 'CRM built from scratch for Raizhe\'s sales team. It captures and transcribes calls, scores each lead\'s ICP and governs the AI decisions with strict engineering rules.',
    },
    highlight: {
      ptBR: 'Projeto carro-chefe: CRM com pipeline de IA governado, transcrição de calls e design system próprio, entregue em sprints com squad dividido entre frontend e backend.',
      en: 'Flagship project: a CRM with a governed AI pipeline, call transcription and its own design system, delivered in sprints with a squad split between frontend and backend.',
    },
    technologies: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS', 'shadcn/ui', 'Design System'],
    overview: {
      ptBR: 'O Atlas é o CRM interno da Raizhe. Mais do que registrar contatos, ele captura as calls comerciais, transcreve o áudio, extrai sinais de qualificação e calcula o quanto cada lead se aproxima do perfil de cliente ideal (ICP). Toda decisão tomada por IA passa por regras de governança para que nada vá para produção sem rastreio e sem critério.',
      en: 'Atlas is Raizhe\'s internal CRM. More than logging contacts, it captures sales calls, transcribes the audio, extracts qualification signals and scores how close each lead is to the ideal customer profile (ICP). Every AI-driven decision goes through governance rules so nothing reaches production without traceability and criteria.',
    },
    process: {
      ptBR: [
        'Trabalho dividido em sprints, com squad separado entre frontend e backend e handoffs documentados entre os dois lados.',
        'Fundação de backend no Supabase: migrations versionadas, autenticação e RLS desde o início.',
        'Pipeline de captura e transcrição de calls para alimentar o scoring de ICP.',
        'Redesign de frontend v3 com design system próprio: tokens semânticos para score, hard-gate, status e rollback.',
        'Governança de IA aplicada a cada mudança, com quality gates antes de qualquer merge.',
      ],
      en: [
        'Work split into sprints, with separate frontend and backend squads and documented handoffs between the two sides.',
        'Backend foundation on Supabase: versioned migrations, authentication and RLS from day one.',
        'Call capture and transcription pipeline feeding the ICP scoring.',
        'Frontend v3 redesign with its own design system: semantic tokens for score, hard-gate, status and rollback.',
        'AI governance applied to every change, with quality gates before any merge.',
      ],
    },
    stack: [
      { area: { ptBR: 'Frontend', en: 'Frontend' }, items: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'MVVM'] },
      { area: { ptBR: 'Backend', en: 'Backend' }, items: ['Supabase', 'PostgreSQL', 'Row Level Security', 'Edge Functions'] },
      { area: { ptBR: 'IA', en: 'AI' }, items: ['Transcrição de calls', 'Scoring de ICP', 'Governança de IA'] },
    ],
    challenges: {
      ptBR: [
        'Garantir que decisões automatizadas por IA fossem auditáveis e nunca chegassem a produção sem critério.',
        'Modelar RLS em várias camadas sem travar o uso real do time comercial.',
        'Construir um design system do zero, com tokens semânticos que traduzem regras de negócio (score, hard-gate, rollback) em UI.',
        'Coordenar entregas entre frontend e backend operados por pessoas diferentes, sem perder contrato de API.',
      ],
      en: [
        'Make sure AI-automated decisions were auditable and never reached production without criteria.',
        'Model RLS across several layers without blocking the sales team\'s real usage.',
        'Build a design system from scratch, with semantic tokens that translate business rules (score, hard-gate, rollback) into UI.',
        'Coordinate deliveries between frontend and backend run by different people, without losing the API contract.',
      ],
    },
  },
  {
    slug: 'sdr-ia-whatsapp',
    title: 'SDR IA no WhatsApp',
    status: {
      ptBR: 'Produto interno da Raizhe · em produção',
      en: 'Raizhe internal product · in production',
    },
    subtitle: {
      ptBR: 'Agente de pré-vendas que atende no WhatsApp e agenda reuniões com o closer',
      en: 'Pre-sales agent that handles WhatsApp and books meetings with the closer',
    },
    summary: {
      ptBR: 'Agente de IA que conversa com o lead no WhatsApp, qualifica, faz o pitch e marca a reunião com o closer direto no Google Calendar, com link do Meet. Quando um humano assume a conversa, a IA pausa sozinha.',
      en: 'AI agent that talks to the lead on WhatsApp, qualifies, pitches and books the meeting with the closer straight into Google Calendar, with a Meet link. When a human takes over the conversation, the AI pauses on its own.',
    },
    technologies: ['n8n', 'Google Gemini', 'Redis', 'WhatsApp', 'Google Calendar', 'RD Station CRM', 'Slack'],
    overview: {
      ptBR: 'É a porta de entrada comercial da Raizhe pelo WhatsApp. O agente recebe a mensagem do lead, mantém a memória da conversa e a cadência de follow-up no Redis, e usa o Google Gemini para conduzir o papo com uma persona própria. Ele qualifica o lead, envia um pitch personalizado e, quando o lead aceita, agenda a reunião no Google Calendar do closer com link do Meet. Tudo isso convivendo com o time: se um humano entra na conversa, a IA detecta e se cala até liberarem de novo.',
      en: 'It is Raizhe\'s commercial front door on WhatsApp. The agent receives the lead\'s message, keeps the conversation memory and the follow-up cadence in Redis, and uses Google Gemini to drive the chat with its own persona. It qualifies the lead, sends a personalized pitch and, once the lead agrees, books the meeting in the closer\'s Google Calendar with a Meet link. All of this living alongside the team: if a human joins the conversation, the AI detects it and stays quiet until released again.',
    },
    process: {
      ptBR: [
        'Orquestração completa em n8n, do recebimento da mensagem até o agendamento.',
        'Memória de conversa, cadência e nome do lead persistidos no Redis.',
        'Raciocínio com Google Gemini, com persona e regras de qualificação definidas em prompt.',
        'Qualificação do lead antes de qualquer oferta: só agenda quem passou no critério.',
        'Agendamento no Google Calendar do closer certo, com criação de evento e link do Meet.',
        'Handoff humano: uma flag pausa a IA quando alguém do time assume a conversa.',
        'Integração com RD Station CRM e avisos no Slack ao longo do fluxo.',
      ],
      en: [
        'Full orchestration in n8n, from receiving the message to booking.',
        'Conversation memory, cadence and lead name persisted in Redis.',
        'Reasoning with Google Gemini, with persona and qualification rules defined in the prompt.',
        'Lead qualification before any offer: it only books those who pass the criteria.',
        'Booking in the right closer\'s Google Calendar, creating the event and a Meet link.',
        'Human handoff: a flag pauses the AI when someone from the team takes over.',
        'Integration with RD Station CRM and Slack notifications along the flow.',
      ],
    },
    stack: [
      { area: { ptBR: 'Orquestração', en: 'Orchestration' }, items: ['n8n', 'Webhooks'] },
      { area: { ptBR: 'IA e memória', en: 'AI & memory' }, items: ['Google Gemini', 'Redis'] },
      { area: { ptBR: 'Canais', en: 'Channels' }, items: ['WhatsApp', 'Google Calendar', 'Google Meet', 'Slack'] },
      { area: { ptBR: 'CRM', en: 'CRM' }, items: ['RD Station CRM'] },
    ],
    challenges: {
      ptBR: [
        'Fazer a IA pausar sozinha quando um humano assume a conversa, sem atropelar o time.',
        'Manter cadência de follow-up sem virar spam, controlando estado no Redis.',
        'Agendar no calendário do closer certo uma única vez, sem duplicar evento.',
        'Qualificar o lead antes de oferecer reunião, evitando agendar com quem não tem perfil.',
        'Ignorar as próprias mensagens para não entrar em loop de resposta.',
      ],
      en: [
        'Make the AI pause on its own when a human takes over, without running over the team.',
        'Keep a follow-up cadence without becoming spam, controlling state in Redis.',
        'Book the right closer\'s calendar exactly once, without duplicating the event.',
        'Qualify the lead before offering a meeting, avoiding booking with the wrong profile.',
        'Ignore its own messages to avoid getting into a reply loop.',
      ],
    },
  },
  {
    slug: 'raizhe-rh',
    title: 'Raizhe RH',
    status: {
      ptBR: 'Produto em produção · rh.raizhe.com',
      en: 'Product in production · rh.raizhe.com',
    },
    subtitle: {
      ptBR: 'Plataforma de gestão de pessoas e RH',
      en: 'People management and HR platform',
    },
    summary: {
      ptBR: 'Plataforma completa de RH da Raizhe, em produção. Lida com dados sensíveis de pessoas, então segurança e separação de ambientes foram tratadas como requisito, não como detalhe.',
      en: 'Raizhe\'s complete HR platform, in production. It handles sensitive people data, so security and environment separation were treated as a requirement, not a detail.',
    },
    technologies: ['React 18', 'TypeScript', 'Vite', 'Supabase', 'React Query', 'Zod', 'Tailwind CSS'],
    overview: {
      ptBR: 'O Raizhe RH centraliza a gestão de pessoas da empresa. Por lidar com informações sensíveis de colaboradores, o projeto nasceu com um conjunto de regras de segurança e arquitetura documentadas e um ambiente de staging isolado, separado da produção, para testar qualquer mudança sem risco aos dados reais.',
      en: 'Raizhe RH centralizes the company\'s people management. Because it handles sensitive employee information, the project was born with a documented set of security and architecture rules and an isolated staging environment, separate from production, to test any change without risk to real data.',
    },
    process: {
      ptBR: [
        'Base em React 18 + TypeScript + Vite, com Tailwind e shadcn/ui na interface.',
        'Backend no Supabase usando auth, banco, storage, Edge Functions e Realtime.',
        'Formulários com React Hook Form + Zod para validação ponta a ponta.',
        'Ambiente de staging local-only, isolado e sem dados, para validar mudanças antes de tocar em produção.',
        'Conjunto de 34 regras de segurança e arquitetura documentadas, lidas antes de cada contribuição.',
      ],
      en: [
        'Built on React 18 + TypeScript + Vite, with Tailwind and shadcn/ui on the interface.',
        'Backend on Supabase using auth, database, storage, Edge Functions and Realtime.',
        'Forms with React Hook Form + Zod for end-to-end validation.',
        'Local-only staging environment, isolated and dataless, to validate changes before touching production.',
        'A set of 34 documented security and architecture rules, read before each contribution.',
      ],
    },
    stack: [
      { area: { ptBR: 'Frontend', en: 'Frontend' }, items: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui'] },
      { area: { ptBR: 'Estado e formulários', en: 'State & forms' }, items: ['React Query', 'React Hook Form', 'Zod'] },
      { area: { ptBR: 'Backend', en: 'Backend' }, items: ['Supabase', 'Auth', 'Storage', 'Edge Functions', 'Realtime'] },
    ],
    challenges: {
      ptBR: [
        'Proteger dados sensíveis de RH com RLS e regras de acesso bem definidas.',
        'Manter staging e produção realmente isolados, evitando que testes tocassem dados reais.',
        'Padronizar segurança e arquitetura em 34 regras claras para que qualquer pessoa (ou IA) contribuísse sem abrir brecha.',
      ],
      en: [
        'Protect sensitive HR data with RLS and well-defined access rules.',
        'Keep staging and production truly isolated, preventing tests from touching real data.',
        'Standardize security and architecture into 34 clear rules so anyone (or any AI) could contribute without opening a gap.',
      ],
    },
  },
  {
    slug: 'sdr-ia-multitenant',
    title: 'SDR IA Multitenant',
    status: {
      ptBR: 'Produto interno da Raizhe · em desenvolvimento',
      en: 'Raizhe internal product · in development',
    },
    subtitle: {
      ptBR: 'SDR com IA para múltiplos clientes em uma só base',
      en: 'AI-powered SDR for multiple clients on a single base',
    },
    summary: {
      ptBR: 'Um SDR (pré-vendas) movido a IA, construído como multitenant: vários clientes atendidos pela mesma aplicação, cada um com seus dados isolados.',
      en: 'An AI-driven SDR (pre-sales) built as multitenant: several clients served by the same application, each with isolated data.',
    },
    technologies: ['Next.js 15', 'TypeScript', 'Middleware', 'IA', 'Multitenancy'],
    overview: {
      ptBR: 'O SDR IA automatiza o primeiro contato com leads. O ponto técnico central é a arquitetura multitenant: uma única aplicação atende vários clientes ao mesmo tempo, com os dados de cada um totalmente separados. O middleware resolve o tenant a cada requisição e garante que nada vaze de um cliente para outro.',
      en: 'The AI SDR automates first contact with leads. The core technical point is the multitenant architecture: a single application serves several clients at once, with each one\'s data fully separated. The middleware resolves the tenant on every request and ensures nothing leaks from one client to another.',
    },
    process: {
      ptBR: [
        'Aplicação em Next.js 15 com App Router e TypeScript.',
        'Middleware para resolver o tenant em cada requisição e isolar contexto.',
        'Camada de IA para qualificar e responder leads automaticamente.',
        'Modelagem de dados pensada para isolamento por cliente desde o início.',
      ],
      en: [
        'Application in Next.js 15 with App Router and TypeScript.',
        'Middleware to resolve the tenant on each request and isolate context.',
        'AI layer to qualify and respond to leads automatically.',
        'Data modeling designed for per-client isolation from the start.',
      ],
    },
    stack: [
      { area: { ptBR: 'Aplicação', en: 'Application' }, items: ['Next.js 15', 'TypeScript', 'App Router', 'Middleware'] },
      { area: { ptBR: 'IA', en: 'AI' }, items: ['Qualificação de leads', 'Respostas automáticas'] },
      { area: { ptBR: 'Arquitetura', en: 'Architecture' }, items: ['Multitenancy', 'Isolamento por tenant'] },
    ],
    challenges: {
      ptBR: [
        'Isolar dados de cada cliente sem duplicar a aplicação para cada um.',
        'Resolver o tenant de forma confiável a cada requisição, sem vazamento de contexto.',
        'Equilibrar respostas de IA úteis com custo e previsibilidade.',
      ],
      en: [
        'Isolate each client\'s data without duplicating the application per client.',
        'Resolve the tenant reliably on every request, without context leakage.',
        'Balance useful AI responses with cost and predictability.',
      ],
    },
  },
  {
    slug: 'leadchat',
    title: 'LeadChat',
    status: {
      ptBR: 'Produto interno da Raizhe · em desenvolvimento',
      en: 'Raizhe internal product · in development',
    },
    subtitle: {
      ptBR: 'Chat de IA para captação de leads, integrado ao CRM',
      en: 'AI chat for lead capture, integrated with the CRM',
    },
    summary: {
      ptBR: 'Chat de IA que conversa com o visitante, qualifica o lead e manda direto para o CRM Atlas. Roda com streaming de resposta e pode ser embutido até em sites WordPress.',
      en: 'An AI chat that talks to the visitor, qualifies the lead and sends it straight to the Atlas CRM. It runs with response streaming and can even be embedded into WordPress sites.',
    },
    technologies: ['Next.js 15', 'React 19', 'Prisma', 'Anthropic SDK', 'JWT', 'Webhooks'],
    overview: {
      ptBR: 'O LeadChat é a porta de entrada de leads via conversa. Ele usa o SDK da Anthropic para responder em streaming, autentica sessões com JWT, persiste tudo via Prisma e dispara webhooks para o CRM Atlas assim que um lead é qualificado. Há ainda um plugin de WordPress para embutir o chat em sites que não são feitos em Next.',
      en: 'LeadChat is the entry point for leads through conversation. It uses the Anthropic SDK to answer with streaming, authenticates sessions with JWT, persists everything via Prisma and fires webhooks to the Atlas CRM as soon as a lead is qualified. There is also a WordPress plugin to embed the chat into sites not built in Next.',
    },
    process: {
      ptBR: [
        'Aplicação em Next.js 15 + React 19 com a Vercel AI SDK e o provider da Anthropic.',
        'Persistência com Prisma sobre PostgreSQL.',
        'Autenticação de sessões com JWT (jose) e senhas com bcrypt.',
        'Webhooks de integração com o CRM Atlas, cobertos por testes.',
        'Plugin de WordPress para embutir o chat fora do ecossistema Next.',
      ],
      en: [
        'Application in Next.js 15 + React 19 with the Vercel AI SDK and the Anthropic provider.',
        'Persistence with Prisma over PostgreSQL.',
        'Session authentication with JWT (jose) and passwords with bcrypt.',
        'Integration webhooks with the Atlas CRM, covered by tests.',
        'WordPress plugin to embed the chat outside the Next ecosystem.',
      ],
    },
    stack: [
      { area: { ptBR: 'Aplicação', en: 'Application' }, items: ['Next.js 15', 'React 19', 'TypeScript'] },
      { area: { ptBR: 'IA', en: 'AI' }, items: ['Anthropic SDK', 'Vercel AI SDK', 'Streaming'] },
      { area: { ptBR: 'Dados e auth', en: 'Data & auth' }, items: ['Prisma', 'PostgreSQL', 'JWT (jose)', 'bcrypt'] },
      { area: { ptBR: 'Integração', en: 'Integration' }, items: ['Webhooks (Atlas)', 'Plugin WordPress'] },
    ],
    challenges: {
      ptBR: [
        'Entregar respostas de IA em streaming mantendo a sessão segura.',
        'Integrar o chat ao CRM Atlas via webhooks de forma confiável e testada.',
        'Fazer o mesmo chat funcionar embutido em WordPress, fora do Next.',
      ],
      en: [
        'Deliver AI responses in streaming while keeping the session secure.',
        'Integrate the chat with the Atlas CRM via webhooks reliably and with tests.',
        'Make the same chat work embedded in WordPress, outside Next.',
      ],
    },
  },
  {
    slug: 'pizza-system',
    title: 'Sistema de Pizzaria',
    status: {
      ptBR: 'Projeto concluído',
      en: 'Completed project',
    },
    subtitle: {
      ptBR: 'Plataforma completa de delivery de pizza',
      en: 'Complete pizza delivery platform',
    },
    summary: {
      ptBR: 'Sistema de delivery com catálogo, carrinho e fluxo de pedido, feito em ReactJS e Tailwind. Projeto de portfólio focado em frontend moderno e e-commerce.',
      en: 'A delivery system with catalog, cart and order flow, built in ReactJS and Tailwind. A portfolio project focused on modern frontend and e-commerce.',
    },
    technologies: ['ReactJS', 'Tailwind CSS', 'JavaScript', 'Responsive Design'],
    link: 'https://fabiosonats.github.io/more_pizza/',
    overview: {
      ptBR: 'Sistema completo de delivery de pizza com catálogo de produtos, carrinho de compras, sistema de pedidos e interface responsiva. Foi um dos projetos onde exercitei desenvolvimento frontend moderno e a construção de um fluxo de e-commerce de ponta a ponta.',
      en: 'A complete pizza delivery system with product catalog, shopping cart, order system and responsive interface. It was one of the projects where I practiced modern frontend development and building an end-to-end e-commerce flow.',
    },
    process: {
      ptBR: [
        'Interface construída em ReactJS com Tailwind CSS.',
        'Catálogo de produtos com carrinho e fluxo de pedido.',
        'Layout responsivo pensado para mobile.',
      ],
      en: [
        'Interface built in ReactJS with Tailwind CSS.',
        'Product catalog with cart and order flow.',
        'Responsive layout designed for mobile.',
      ],
    },
    stack: [
      { area: { ptBR: 'Frontend', en: 'Frontend' }, items: ['ReactJS', 'Tailwind CSS', 'JavaScript'] },
    ],
    challenges: {
      ptBR: [
        'Montar um fluxo de e-commerce completo (catálogo, carrinho, pedido) mantendo a interface simples.',
        'Garantir boa experiência em telas pequenas.',
      ],
      en: [
        'Build a complete e-commerce flow (catalog, cart, order) while keeping the interface simple.',
        'Ensure a good experience on small screens.',
      ],
    },
  },
  {
    slug: 'recipe-creator',
    title: 'Criador de Receitas',
    status: {
      ptBR: 'Projeto pessoal',
      en: 'Personal project',
    },
    subtitle: {
      ptBR: 'Aplicação web para criar e gerenciar receitas',
      en: 'Web app to create and manage recipes',
    },
    summary: {
      ptBR: 'Plataforma onde o usuário cria e organiza receitas de qualquer refeição. Projeto pessoal em ReactJS, com foco em interface intuitiva e gestão de conteúdo.',
      en: 'A platform where the user creates and organizes recipes for any meal. A personal ReactJS project focused on an intuitive interface and content management.',
    },
    technologies: ['ReactJS', 'JavaScript', 'CSS3', 'HTML5'],
    link: 'https://fabiosonats.github.io/chef_samurai/#/',
    overview: {
      ptBR: 'Plataforma web onde os usuários criam e gerenciam receitas de qualquer tipo de refeição. Desenvolvida em ReactJS, foi um exercício de interface intuitiva e gestão de conteúdo no frontend.',
      en: 'A web platform where users create and manage recipes for any kind of meal. Built in ReactJS, it was an exercise in intuitive interfaces and frontend content management.',
    },
    process: {
      ptBR: [
        'Interface em ReactJS com criação e gestão de receitas.',
        'Foco em usabilidade e organização de conteúdo.',
      ],
      en: [
        'ReactJS interface with recipe creation and management.',
        'Focus on usability and content organization.',
      ],
    },
    stack: [
      { area: { ptBR: 'Frontend', en: 'Frontend' }, items: ['ReactJS', 'JavaScript', 'CSS3', 'HTML5'] },
    ],
    challenges: {
      ptBR: [
        'Tornar a criação e edição de receitas simples para o usuário.',
        'Organizar o conteúdo de forma clara sem backend dedicado.',
      ],
      en: [
        'Make creating and editing recipes simple for the user.',
        'Organize content clearly without a dedicated backend.',
      ],
    },
  },
];

export const getProjects = (language: string): Project[] =>
  rawProjects.map((p) => ({
    slug: p.slug,
    title: p.title,
    status: pick(p.status, language),
    subtitle: pick(p.subtitle, language),
    summary: pick(p.summary, language),
    highlight: p.highlight ? pick(p.highlight, language) : undefined,
    technologies: p.technologies,
    link: p.link,
    overview: pick(p.overview, language),
    process: pickList(p.process, language),
    stack: p.stack.map((s) => ({ area: pick(s.area, language), items: s.items })),
    challenges: pickList(p.challenges, language),
  }));

export const getProject = (slug: string, language: string): Project | undefined =>
  getProjects(language).find((p) => p.slug === slug);
