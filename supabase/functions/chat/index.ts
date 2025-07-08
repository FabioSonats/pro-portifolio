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

    const systemPrompt = `Você é um assistente virtual especializado no portfólio de Fábio Henrique Nunes. Você deve responder perguntas sobre sua formação, experiência, projetos e habilidades de forma profissional e informativa.

INFORMAÇÕES DO PORTFÓLIO:
- Formação: Análise e Desenvolvimento de Sistemas na PUC-PR (previsão conclusão 2026)
- Certificações: Desenvolvimento Web Full Stack (Udemy)
- Tecnologias: React, Flutter, Node.js, Python, JavaScript, TypeScript, SQL
- Experiência: Desenvolvimento de aplicações web e mobile, UI/UX Design
- Projetos: Aplicações Flutter, sistemas web responsivos, integração com APIs
- Soft Skills: Comunicação, trabalho em equipe, resolução de problemas, pensamento crítico
- Idiomas: Português (nativo), Inglês (intermediário), Espanhol (básico)

INSTRUÇÕES:
1. Responda sempre em português brasileiro
2. Seja profissional mas amigável
3. Forneça informações precisas sobre o portfólio
4. Se não souber algo específico, seja honesto
5. Ajude recrutadores a entender as qualificações do Fábio
6. Sugira projetos relevantes quando apropriado
7. Mantenha respostas concisas mas informativas

EXEMPLOS DE PERGUNTAS QUE VOCÊ PODE RESPONDER:
- "Qual é a formação do Fábio?"
- "Quais linguagens ele domina?"
- "Ele tem experiência com Flutter?"
- "Pode me mostrar um projeto específico?"
- "Qual é o diferencial dele como desenvolvedor?"

Dados do portfólio: ${JSON.stringify(portfolioData)}`

    console.log('Calling Gemini API...')
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      }),
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