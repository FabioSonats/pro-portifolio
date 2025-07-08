import { Bot, User } from 'lucide-react';
import { Message } from '@/types/chat';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const formatMessageWithLinks = (text: string) => {
    // Regex para detectar URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
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
            <p className="whitespace-pre-wrap">
              {formatMessageWithLinks(message.text)}
            </p>
            <p className="text-xs opacity-70 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </p>
          </div>
          {message.isUser && <User className="w-4 h-4 mt-0.5" />}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;