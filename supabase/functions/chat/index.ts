


import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
}

interface GlobalWithGemini {
  GEMINI_API_KEY?: string;
}

const GEMINI_API_KEY = typeof globalThis.Deno !== "undefined" && globalThis.Deno.env && globalThis.Deno.env.get
  ? globalThis.Deno.env.get('GEMINI_API_KEY')
  : ((globalThis as GlobalWithGemini).GEMINI_API_KEY ?? "");

serve(async (req) => {
  console.log('Chat function called with method:', req.method)

  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Handle GET requests (health check)
  if (req.method === 'GET') {
    return new Response(
      JSON.stringify({ status: 'ok', message: 'Chat function is running' }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }

  // Only handle POST requests for chat
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }

  try {
    console.log('Checking GEMINI_API_KEY:', GEMINI_API_KEY ? 'Present' : 'Missing')

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not configured')
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Parsing request body...')
    let requestBody;
    try {
      requestBody = await req.json()
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError)
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Request body parsed:', { hasMessage: !!requestBody.message, hasPortfolioData: !!requestBody.portfolioData })

    const { message, portfolioData } = requestBody

    const systemPrompt = `Você é um assistente virtual especializado no portfólio de Fábio Ferreira. Você deve responder perguntas sobre sua formação, experiência, projetos, habilidades e trajetória profissional de forma concisa e técnica.

PERFIL PROFISSIONAL DE FÁBIO FERREIRA:

FORMAÇÃO ACADÊMICA:
- Análise e Desenvolvimento de Sistemas na PUC-PR (concluído)
- Certificações: Desenvolvimento Web Full Stack (Udemy)
- Background acadêmico inicial: Matemática Industrial (UFPR) e Ciências Sociais (PUC-PR)

EXPERIÊNCIA TÉCNICA PRINCIPAL:
- Desenvolvedor Full Stack (2022 – Presente)
- Especializado em Python para IA e ReactJS com Tailwind CSS
- Desenvolvimento de agentes de IA e automação com Python
- Criação de aplicações web modernas (Pizza, Receitas, Portfólio) com ReactJS
- Experiência anterior em Flutter na Tecnofit (Agosto 2022 – Maio 2024)
- Implementação de aplicativos White Label multiplataforma
- Integração de APIs REST e desenvolvimento com arquiteturas MVVM, BloC e Provider
- Experiência com metodologias ágeis (SCRUM) e controle de versão (Git)

STACK TECNOLÓGICO ATUAL:
- IA: Python para agentes de IA, automação e machine learning
- Frontend: ReactJS, Tailwind CSS, JavaScript, TypeScript
- Mobile: Flutter, Dart (experiência anterior)
- Backend: Node.js, Python
- Banco de dados: SQL, consultas complexas e otimização
- DevOps: Docker, Deploy em produção, Git avançado
- Testes: Testes automatizados (Jest, Cypress)
- Metodologias: Scrum, Kanban

PROJETOS DESTACADOS:
- Site de Pizza desenvolvido com ReactJS
- Site de Receitas com ReactJS
- Este portfólio desenvolvido com ReactJS e Tailwind CSS
- Agentes de IA desenvolvidos com Python
- Aplicativos Flutter White Label (experiência anterior)

SOFT SKILLS (desenvolvidas através de experiência diversificada):
- Comunicação e trabalho em equipe (experiência em atendimento e liderança)
- Resolução de problemas e pensamento crítico
- Criatividade e adaptabilidade
- Liderança (experiência como gerente e treinador)

IDIOMAS:
- Português (nativo)
- Inglês (intermediário)
- Espanhol (básico)

INFORMAÇÕES DE CONTATO:
- Email: ferreirafabio51@gmail.com
- LinkedIn: https://www.linkedin.com/in/ferreira-f%C3%A1bio-98b4304a/
- WhatsApp: +55 42 99164-3802 (Link: https://wa.me/5542991643802)

INSTRUÇÕES:
1. Responda sempre em português brasileiro de forma concisa e técnica
2. Foque nas competências técnicas e experiência em desenvolvimento
3. Seja específico: responda apenas o que foi perguntado
4. Para contatos: Email: ferreirafabio51@gmail.com | LinkedIn: https://www.linkedin.com/in/ferreira-f%C3%A1bio-98b4304a/ | WhatsApp: https://wa.me/5542991643802
5. SEMPRE sugira mensagens prontas para WhatsApp: "Olá Fábio, vi seu portfólio e gostaria de conversar sobre oportunidades"
6. Mencione experiência em bares/atendimento apenas como soft skills de trabalho em equipe e liderança
7. Priorize sempre as competências técnicas e projetos de desenvolvimento
8. Mantenha respostas objetivas e profissionais

EXEMPLOS DE PERGUNTAS:
- "Qual é a stack tecnológica do Fábio?"
- "Ele tem experiência com Flutter?"
- "Quais arquiteturas ele conhece?"
- "Qual foi sua experiência na Tecnofit?"
- "Como posso entrar em contato?"

IMPORTANTE: Este é o portfólio oficial do Fábio Ferreira (https://pro-portifolio.lovable.app/).

Dados do portfólio: ${JSON.stringify(portfolioData)}`

    console.log('Calling Gemini API...')
    const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY
    console.log('Gemini URL (without key):', 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=***')

    const geminiRequestBody = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemPrompt}\n\nUsuário: ${message}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    }

    console.log('Request body structure:', JSON.stringify(geminiRequestBody, null, 2))

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geminiRequestBody),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Gemini API error:', errorData)
      throw new Error(`Gemini API error: ${response.status}`)
    }

    console.log('Gemini API response OK, parsing JSON...')
    const data = await response.json()
    console.log('Full Gemini response:', JSON.stringify(data, null, 2))
    console.log('AI Response extracted:', !!data.candidates?.[0]?.content?.parts?.[0]?.text)
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!aiResponse) {
      console.error('No AI response found in data:', data)
      throw new Error('No response from AI')
    }

    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error in chat function:', error)
    return new Response(
      JSON.stringify({
        error: 'Erro interno do servidor. Tente novamente mais tarde.',
        details: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

