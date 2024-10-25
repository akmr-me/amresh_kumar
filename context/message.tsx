import { createContext, ReactNode } from "react";

interface MessageProviderProps {
  children: ReactNode;
}

export interface Message {
  text: string;
  role: string;
}

interface MessageContextType {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  textBoxRef: React.MutableRefObject<HTMLInputElement | null>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export default function MessageProvider({ children }: MessageProviderProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const textBoxRef = useRef<HTMLInputElement | null>(null);
  return (
    <MessageContext.Provider value={{ messages, setMessages, textBoxRef }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessageState() {
  const context = useContext(MessageContext);

  if (context === undefined) {
    throw new Error("useMessageState must be used within a MessageProvider");
  }

  return context;
}
