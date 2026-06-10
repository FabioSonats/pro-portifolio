import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  placeholder: string;
}

const ChatInput = ({
  value,
  onChange,
  onSend,
  onKeyPress,
  isLoading,
  placeholder
}: ChatInputProps) => {
  return (
    <div className="flex gap-2 mt-auto">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        className="flex-1 bg-muted border-border text-foreground placeholder:text-muted-foreground"
        disabled={isLoading}
      />
      <Button
        onClick={onSend}
        disabled={isLoading || !value.trim()}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ChatInput;