import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: language === 'pt-BR' 
          ? 'Olá! Sou o assistente virtual do portfólio do Fábio. Posso responder perguntas sobre sua formação, experiência, projetos e habilidades. Como posso ajudá-lo?'
          : 'Hello! I am the virtual assistant for Fábio\'s portfolio. I can answer questions about his education, experience, projects, and skills. How can I help you?',
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, language]);

  const portfolioData = {
    education: {
      degree: language === 'pt-BR' ? 'Análise e Desenvolvimento de Sistemas' : 'Systems Analysis and Development',
      institution: 'PUC-PR',
      completion: '2026',
      certifications: [
        {
          name: language === 'pt-BR' ? 'Desenvolvimento Web Full Stack' : 'Full Stack Web Development',
          provider: 'Udemy'
        }
      ]
    },
    skills: {
      technical: ['React', 'Flutter', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Git', 'HTML', 'CSS'],
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
        ? 'Desenvolvimento de aplicações web e mobile' 
        : 'Web and mobile application development',
      specialties: language === 'pt-BR'
        ? ['UI/UX Design', 'Desenvolvimento Frontend', 'Desenvolvimento Backend', 'Integração de APIs']
        : ['UI/UX Design', 'Frontend Development', 'Backend Development', 'API Integration']
    },
    projects: language === 'pt-BR' 
      ? 'Aplicações Flutter, sistemas web responsivos, integração com APIs e desenvolvimento full-stack'
      : 'Flutter applications, responsive web systems, API integration and full-stack development'
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          message: inputMessage,
          portfolioData: portfolioData
        }
      });

      if (error) {
        throw error;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling chat function:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'pt-BR' 
          ? 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde.'
          : 'Sorry, an error occurred while processing your message. Please try again later.',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 sm:w-96 h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] z-50">
      <Card className="h-full bg-slate-900/95 border-green-500/30 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Bot className="w-5 h-5" />
            {language === 'pt-BR' ? 'Assistente do Portfólio' : 'Portfolio Assistant'}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex flex-col h-full pb-4">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    message.isUser
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-700 text-gray-100'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {!message.isUser && <Bot className="w-4 h-4 mt-0.5 text-green-400" />}
                    <div className="flex-1">
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {message.isUser && <User className="w-4 h-4 mt-0.5" />}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-gray-100 rounded-lg px-3 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-green-400" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={language === 'pt-BR' ? 'Digite sua pergunta...' : 'Type your question...'}
              className="flex-1 bg-slate-800 border-slate-600 text-white placeholder-gray-400"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;