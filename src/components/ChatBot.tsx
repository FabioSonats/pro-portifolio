import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useChatBot } from '@/hooks/useChatBot';
import { getPortfolioData } from '@/data/portfolioData';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatLoadingIndicator from './ChatLoadingIndicator';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const portfolioData = getPortfolioData(language);

  const {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    sendMessage,
    handleKeyPress,
    initializeWelcomeMessage
  } = useChatBot({ language, portfolioData });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeWelcomeMessage();
    }
  }, [isOpen, language, messages.length, initializeWelcomeMessage]);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-16 h-16 bg-sky-500 hover:bg-sky-600 text-white shadow-lg z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 sm:w-96 h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] z-50">
      <Card className="h-full bg-slate-900/95 border-sky-500/30 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-sky-400 flex items-center gap-2">
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

        <CardContent className="flex flex-col h-[calc(100%-4rem)] p-4">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isLoading && <ChatLoadingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            value={inputMessage}
            onChange={setInputMessage}
            onSend={sendMessage}
            onKeyPress={handleKeyPress}
            isLoading={isLoading}
            placeholder={language === 'pt-BR' ? 'Digite sua pergunta...' : 'Type your question...'}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;