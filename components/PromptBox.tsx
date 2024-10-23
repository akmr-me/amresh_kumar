import ChatBox from "./ChatBox";
import { MessageContext } from "@/entrypoints/App";
import getAIResponse from "@/utils/fetchAIResponse";

const PromptBox = ({ inputRef }) => {
  const context = useContext(MessageContext);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  console.log({ context, inputRef });
  //   useEffect(() => {
  //     if (inputRef.current) {
  //       inputRef.current.value = "thest";
  //     }
  //   }, []);
  async function handleGetAIResponse() {
    const { setMessage, message } = context;
    setMessage((prev) => [...prev, { role: "user", text: input }]);
    try {
      setLoading(true);
      const MSG = await getAIResponse();
      console.log({ MSG });
      setMessage((prev) => [...prev, { role: "system", text: MSG }]);
      setInput("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  //   console.log(message);
  function handleInserRespose() {
    const { setMessage, message } = context;

    const lastMessage = message[message.length - 1];
    if (lastMessage.role == "system") {
      inputRef.current.value = lastMessage.text;
    }
  }
  if (!context) return;
  return (
    <div
      className="flex flex-col items-center bg-white p-4 shadow-md rounded-md w-[35%] gap-3"
      onClick={(e) => e.stopPropagation()}
    >
      <ChatBox
        {...{
          message: context.message,
          setMessage: context.setMessage,
          loading,
        }}
      />
      <input
        type="text"
        placeholder="Your prompt"
        className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none w-full gap-2"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      {!context.message?.length ? (
        <button
          onClick={handleGetAIResponse}
          className="ml-auto px-4 py-2 flex items-center bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
        >
          <span className="mr-2">🡪</span> Generate
        </button>
      ) : (
        <div className="flex justify-end w-full">
          <button
            onClick={handleInserRespose}
            className="px-4 py-2 flex items-center bg-[#F9FAFB] text-gray-500 font-semibold rounded-md hover:text-gray-500 focus:outline-none"
          >
            <span className="mr-2">🡪</span> Insert
          </button>
          <button
            onClick={handleGetAIResponse}
            className="px-4 py-2 flex items-center bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
          >
            <span className="mr-2">🡪</span> Generate
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptBox;
