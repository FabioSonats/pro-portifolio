import { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

  const portfolioData = {
    name: "Fábio",
    role: language === 'en' ? "Flutter Developer" : "Desenvolvedor Flutter",
    experience: language === 'en' ? "Flutter Developer at Tecnofit (Aug 2022 – May 2024)" : "Desenvolvedor Flutter na Tecnofit (Agosto 2022 – Maio 2024)",
    education: language === 'en' ? "Systems Analysis and Development at PUC-PR" : "Análise e Desenvolvimento de Sistemas na PUC-PR",
    languages: language === 'en' ? "Portuguese (Native), English (Intermediate)" : "Português (Nativo), Inglês (Intermediário)",
    skills: language === 'en' 
      ? "Flutter, ReactJS, Firebase, SQLite, MVVM, BloC, Provider, Git, REST APIs, Cross-platform development, UI/UX Design, Clean Code"
      : "Flutter, ReactJS, Firebase, SQLite, MVVM, BloC, Provider, Git, APIs REST, Desenvolvimento cross-platform, UI/UX Design, Código Limpo",
    projects: [
      {
        name: language === 'en' ? "Lead Manager (Flutter Web)" : "Gerenciador de Leads (Flutter Web)",
        description: language === 'en' 
          ? "Lead management system for marketing company developed with Flutter Web"
          : "Sistema de gerenciamento de leads para empresa de marketing desenvolvido com Flutter Web",
        tech: "Flutter Web"
      },
      {
        name: language === 'en' ? "Recipe Creator (ReactJS)" : "Criador de Receitas (ReactJS)",
        description: language === 'en'
          ? "Web platform for creating and managing recipes"
          : "Plataforma web para criação e gerenciamento de receitas",
        tech: "ReactJS"
      }
    ]
  };

  const systemPrompt = language === 'en' 
    ? `You are an AI assistant for Fábio's portfolio. You have detailed information about him:
    
    Profile: ${portfolioData.name} - ${portfolioData.role}
    Experience: ${portfolioData.experience}
    Education: ${portfolioData.education}
    Languages: ${portfolioData.languages}
    Skills: ${portfolioData.skills}
    
    Projects:
    ${portfolioData.projects.map(p => `- ${p.name}: ${p.description} (${p.tech})`).join('\n')}
    
    Key responsibilities at Tecnofit:
    - Flutter app maintenance and feature development
    - White Label app implementation for iOS and Android
    - Agile team collaboration using SCRUM
    - REST API integration
    - MVVM, BloC and Provider architectures
    - Over 90 white label applications published
    
    Answer questions about Fábio's portfolio professionally and helpfully. If asked about specific projects, you can suggest the user view them. Keep responses concise and focused on his professional capabilities.`
    : `Você é um assistente de IA para o portfólio do Fábio. Você tem informações detalhadas sobre ele:
    
    Perfil: ${portfolioData.name} - ${portfolioData.role}
    Experiência: ${portfolioData.experience}
    Educação: ${portfolioData.education}
    Idiomas: ${portfolioData.languages}
    Habilidades: ${portfolioData.skills}
    
    Projetos:
    ${portfolioData.projects.map(p => `- ${p.name}: ${p.description} (${p.tech})`).join('\n')}
    
    Principais responsabilidades na Tecnofit:
    - Manutenção e desenvolvimento de funcionalidades em aplicativos Flutter
    - Implementação de aplicativos White Label para iOS e Android
    - Colaboração em equipes ágeis usando SCRUM
    - Integração de APIs REST
    - Arquiteturas MVVM, BloC e Provider
    - Mais de 90 aplicativos white label publicados
    
    Responda perguntas sobre o portfólio do Fábio de forma profissional e útil. Se perguntado sobre projetos específicos, você pode sugerir que o usuário os visualize. Mantenha as respostas concisas e focadas em suas capacidades profissionais.`;

  const sendMessage = async () => {
    if (!inputValue.trim() || !apiKey.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${systemPrompt}\n\nUsuário pergunta: ${inputValue}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const aiMessage: Message = {
          id: Date.now().toString() + "_ai",
          text: data.candidates[0].content.parts[0].text,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Invalid response from Gemini API');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString() + "_error",
        text: language === 'en' 
          ? "Sorry, I couldn't process your request. Please check your API key and try again."
          : "Desculpe, não consegui processar sua solicitação. Verifique sua chave API e tente novamente.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-96 h-[500px] bg-slate-800 border-green-500 shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Bot className="h-5 w-5" />
            {language === 'en' ? 'Portfolio Assistant' : 'Assistente do Portfólio'}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col h-[420px] p-4">
        {showApiKeyInput && (
          <div className="mb-4 p-3 bg-slate-700 rounded-lg">
            <p className="text-sm text-gray-300 mb-2">
              {language === 'en' ? 'Enter your Gemini API key:' : 'Digite sua chave API do Gemini:'}
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="bg-slate-600 border-slate-500 text-white"
              />
              <Button
                onClick={() => setShowApiKeyInput(false)}
                disabled={!apiKey.trim()}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                OK
              </Button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 mt-8">
              <Bot className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <p className="text-sm">
                {language === 'en' 
                  ? 'Ask me anything about Fábio\'s portfolio!'
                  : 'Pergunte-me qualquer coisa sobre o portfólio do Fábio!'}
              </p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.isUser
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-700 text-gray-100'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-700 text-gray-100 p-3 rounded-lg text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={language === 'en' ? "Ask about skills, projects..." : "Pergunte sobre habilidades, projetos..."}
            className="bg-slate-700 border-slate-600 text-white"
            disabled={!apiKey.trim()}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading || !apiKey.trim()}
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;