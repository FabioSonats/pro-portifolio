import { useState, useEffect } from 'react';
import { Message, PortfolioData } from '@/types/chat';
import { supabase } from '@/integrations/supabase/client';

interface UseChatBotProps {
  language: string;
  portfolioData: PortfolioData;
}

export const useChatBot = ({ language, portfolioData }: UseChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const initializeWelcomeMessage = () => {
    const welcomeMessage: Message = {
      id: '1',
      text: language === 'pt-BR' 
        ? 'Olá! Sou o assistente virtual do portfólio do Fábio Ferreira Paula dos Santos. Posso responder perguntas sobre sua formação, experiência, projetos e habilidades. Como posso ajudá-lo?'
        : 'Hello! I am the virtual assistant for Fábio Ferreira Paula dos Santos\'s portfolio. I can answer questions about his education, experience, projects, and skills. How can I help you?',
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
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
      if (process.env.NODE_ENV === 'development') {
        console.error('Error calling chat function:', error);
      }
      
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

  return {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    sendMessage,
    handleKeyPress,
    initializeWelcomeMessage
  };
};