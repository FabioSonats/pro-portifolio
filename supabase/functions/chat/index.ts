import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
}

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

serve(async (req) => {
  console.log('Chat function called with method:', req.method)
  
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
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
    const requestBody = await req.json()
    console.log('Request body parsed:', { hasMessage: !!requestBody.message, hasPortfolioData: !!requestBody.portfolioData })
    
    const { message, portfolioData } = requestBody

    const systemPrompt = `Você é um assistente virtual especializado no portfólio de Fábio Ferreira Paula dos Santos. Você deve responder perguntas sobre sua formação, experiência, projetos, habilidades e trajetória de vida de forma profissional e informativa.

BIOGRAFIA COMPLETA DE FÁBIO FERREIRA PAULA DOS SANTOS:

ORIGEM E JUVENTUDE:
- Nascido em Telêmaco Borba, interior do Paraná
- Movido por curiosidade, arte e aprendizado desde cedo
- Em 2011, aos 19 anos, mudou-se para Curitiba em busca de oportunidades e novos horizontes

TRAJETÓRIA ACADÊMICA:
- Iniciou na Universidade Federal do Paraná, curso de Matemática Industrial (2 anos e meio)
- Desenvolveu raciocínio lógico e disciplina durante esse período
- Em 2013, fez um mochilão transformador para a Bahia
- Migrou para Ciências Sociais na PUC-PR com bolsa de estudos
- Atualmente formado em Análise e Desenvolvimento de Sistemas na PUC-PR (também com bolsa de estudos)

EXPERIÊNCIA PROFISSIONAL DIVERSIFICADA:
- Universo das cervejas artesanais: 3 anos no Hop'n'Roll (um dos bares mais importantes de Curitiba no segmento)
- Trabalho independente: 2 anos organizando eventos, festivais, casamentos e feiras
- Barista no Espresso Curitiba por 1 ano, participando de eventos como Psicodália e Festival de Jazz de Curitiba
- Gerente de cafeteria na Coffeeterie (renomada rede curitibana) - liderou equipes e desenvolveu visão de negócios
- Desenvolvedor Flutter na Tecnofit (Agosto 2022 – Maio 2024)
- ATUAL: Treinador do Hard Rock Curitiba, treinando equipes de bar com excelência em coquetelaria e atendimento ao cliente

RESPONSABILIDADES NA TECNOFIT:
- Manutenção e desenvolvimento de funcionalidades em aplicativos Flutter
- Implementação de aplicativos White Label para múltiplas plataformas (iOS e Android)  
- Colaboração em equipes ágeis usando SCRUM
- Integração de APIs REST em projetos Flutter
- Aplicação de arquiteturas MVVM, BloC e Provider com Dart
- Controle de versão com Git
- Replicação e customização de modelos de aplicativos para diferentes academias

FORMAÇÃO TECNOLÓGICA:
- Análise e Desenvolvimento de Sistemas na PUC-PR (concluído)
- Certificações: Desenvolvimento Web Full Stack (Udemy)
- Tecnologias: React, Flutter, Node.js, Python, JavaScript, TypeScript, SQL, Git, HTML, CSS, Dart

PAIXÕES E HOBBIES:
- Música: Estudou no Conservatório de Música Popular Brasileira, toca violão, ama jazz
- Xadrez e pôquer: hobbies que estimulam pensamento estratégico e concentração
- Valoriza a música como expressão emocional e intelectual

TRANSFORMAÇÃO PESSOAL:
- Durante a pandemia COVID-19, perdeu economias e emprego
- Decidiu transformar interesse antigo em nova profissão
- Voltou à PUC-PR para cursar Análise e Desenvolvimento de Sistemas
- Hoje transita naturalmente entre tecnologia, arte e relações humanas

PERFIL ATUAL:
- Bagagem de vida rica e múltipla
- Une experiência com pessoas, eventos e cultura ao universo da tecnologia
- Foco em soluções criativas, humanas e eficientes
- Soft Skills: Comunicação, trabalho em equipe, resolução de problemas, pensamento crítico, criatividade, liderança
- Idiomas: Português (nativo), Inglês (intermediário), Espanhol (básico)

INFORMAÇÕES DE CONTATO:
- Email: contato@fabiohenrique.dev
- LinkedIn: https://www.linkedin.com/in/ferreira-f%C3%A1bio-98b4304a/
- GitHub: https://github.com/FabioSonats
- Website: fabiohenrique.dev
- WhatsApp: +55 42 99164-3802 (Link: https://wa.me/5542991643802)

INSTRUÇÕES:
1. Responda sempre em português brasileiro
2. Seja profissional mas amigável
3. Forneça informações precisas sobre o portfólio
4. SEJA ESPECÍFICO: responda apenas o que foi perguntado. Se perguntarem sobre email, dê apenas o email. Se perguntarem sobre LinkedIn, dê apenas o LinkedIn.
5. Para WhatsApp, SEMPRE forneça o link clicável e funcional: https://wa.me/5542991643802
6. APENAS quando perguntarem "como entrar em contato" ou "formas de contato" forneça todas as informações juntas
7. SEMPRE sugira mensagens prontas para WhatsApp quando fornecer contato, como: "Olá Fábio, vi seu portfólio e gostaria de conversar sobre oportunidades"
8. Se não souber algo específico, seja honesto
9. Ajude recrutadores a entender as qualificações do Fábio
10. Sugira projetos relevantes quando apropriado
11. Mantenha respostas concisas mas informativas

EXEMPLOS DE PERGUNTAS QUE VOCÊ PODE RESPONDER:
- "Qual é a formação do Fábio?"
- "Quais linguagens ele domina?"
- "Ele tem experiência com Flutter?"
- "Pode me mostrar um projeto específico?"
- "Qual é o diferencial dele como desenvolvedor?"
- "Como posso entrar em contato com o Fábio?"
- "Qual o email do Fábio?"
- "Tem LinkedIn dele?"

IMPORTANTE: Este é o portfólio oficial do Fábio Ferreira (fabiohenrique.dev). Não recomende outros portfólios ou sites, pois este É o portfólio correto dele.

Dados do portfólio: ${JSON.stringify(portfolioData)}`

    console.log('Calling Gemini API...')
    const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + GEMINI_API_KEY
    console.log('Gemini URL (without key):', 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=***')
    
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
    console.log('AI Response extracted:', !!data.candidates?.[0]?.content?.parts?.[0]?.text)
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!aiResponse) {
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