import { useMessageState } from "@/context/message";
import DialogBox from "@/components/DialogBox";
import generateIcon from "@/assets/generate.svg";
import insertIcon from "@/assets/insert.svg";
import regenerateIcon from "@/assets/regenerate.svg";
import useInsertAIResponse from "@/hooks/useInsertAIResponse";
import useGetUpdateAIResponse from "@/hooks/useGetUpdateAIResponse";

interface PromptBoxProps {
  onClose: () => void;
}

const PromptBox = ({ onClose }: PromptBoxProps) => {
  const [input, setInput] = useState("");
  const { textBoxRef, messages } = useMessageState();

  const handleInsertAIResponse = useInsertAIResponse({
    elementRef: textBoxRef,
    messages,
    callback: onClose,
  });

  const { handleRegenerateResponse, handleUpdateAIResponse, loading } =
    useGetUpdateAIResponse({
      userInput: input,
      clearUserInput: clearUserInput,
    });

  function clearUserInput() {
    setInput("");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      // getting response only when there is no response
      if (!messages.length) handleUpdateAIResponse();
    }
  }

  return (
    <>
      <DialogBox loading={loading} />
      <input
        type="text"
        placeholder="Your Prompt"
        className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none w-full gap-2"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={input}
      />

      {/* conditionaly rendring button */}
      {!messages?.length ? (
        <button
          onClick={handleUpdateAIResponse}
          className="ml-auto px-4 py-2 flex items-center bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
        >
          <span className="mr-2">
            <img
              src={generateIcon}
              alt="generateIcon Icon"
              className="w-6 h-auto"
            />
          </span>{" "}
          Generate
        </button>
      ) : (
        <div className="flex justify-end w-full gap-4">
          <button
            onClick={handleInsertAIResponse}
            className="px-4 py-2 flex items-center bg-[#F9FAFB] text-gray-500 font-semibold rounded-md hover:text-gray-500 focus:outline-none border-2 border-[#666D80]"
          >
            <span className="mr-2">
              <img
                src={insertIcon}
                alt="insertIcon Icon"
                className="w-4 h-auto"
              />
            </span>{" "}
            Insert
          </button>
          <button
            onClick={handleRegenerateResponse}
            className="px-4 py-2 flex items-center bg-blue-500 text-white font-semibold rounded-md disabled:bg-blue-300 hover:bg-blue-600 focus:outline-none"
          >
            <span className="mr-2">
              <img
                src={regenerateIcon}
                alt="regenerateIcon Icon"
                className="w-4 h-auto"
              />
            </span>{" "}
            Regenerate
          </button>
        </div>
      )}
    </>
  );
};

export default PromptBox;
