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
        className="flex-1 bg-slate-800 border-slate-600 text-white placeholder-gray-400"
        disabled={isLoading}
      />
      <Button
        onClick={onSend}
        disabled={isLoading || !value.trim()}
        className="bg-sky-500 hover:bg-sky-600 text-white"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ChatInput;