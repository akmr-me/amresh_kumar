import { useMessageState } from "@/context/message";

interface ChatBotType {
  loading: boolean;
}

const ChatBox = ({ loading }: ChatBotType) => {
  const { messages } = useMessageState();
  if (!messages.length) return;
  const getAninamationBlinkClass = (index: number) =>
    messages.length - 1 == index && loading ? "animate-blink" : "";
  return (
    <div className="p-4 pl-0 pr-0 space-y-4 w-full max-h-[250px] overflow-auto">
      {/* First Message (Button-like) */}
      {messages.map((message, index) => {
        return (
          <div
            key={index}
            className={`w-full flex ${
              message.role == "user" ? "justify-end" : ""
            }`}
          >
            <div
              className={
                (message.role == "user"
                  ? "bg-gray-200 text-gray-600 px-4 text-right"
                  : `bg-blue-100 text-blue-800 px-4`) +
                " py-2 rounded-lg inline-block max-w-[85%]"
              }
            >
              <p className={`p-0 ${getAninamationBlinkClass(index)}`}>
                {message.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBox;
