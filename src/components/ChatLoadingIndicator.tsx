import { Bot } from 'lucide-react';

const ChatLoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-muted text-foreground rounded-lg px-3 py-2 text-sm">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-muted-foreground" />
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground animate-bounce"></div>
            <div className="w-2 h-2 bg-muted-foreground animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLoadingIndicator;