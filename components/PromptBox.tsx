import { useMessageState, Message } from "@/context/message";
import ChatBox from "@/components/ChatBox";
import getAIResponse from "@/utils/fetchAIResponse";
import generateIcon from "@/assets/generate.svg";
import insertIcon from "@/assets/insert.svg";
import regenerateIcon from "@/assets/regenerate.svg";
import { flushSync } from "react-dom";

const LOADER_TEXT = "...";
interface PromptBoxProps {
  onClose: () => void;
}

const PromptBox = ({ onClose }: PromptBoxProps) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { textBoxRef, messages, setMessages } = useMessageState();

  async function handleGetAIResponse() {
    if (!input) {
      alert("Please enter some prompt!");
      return;
    }
    // This updates user input message in chat bot and using flushSync so that setMessage work synchronusly so that first user's message apears then ai's response
    flushSync(() => {
      setMessages((prev: Message[]) => [
        ...prev,
        { role: "user", text: input },
        // Setting LOADER_TEXT as a loader for system response
        { role: "system", text: LOADER_TEXT },
      ]);
      setInput("");
    });

    try {
      setLoading(true);
      const MSG = await getAIResponse(input);
      //Updates response from ai into messages
      setMessages((prev) => [
        // filtering LOADER_TEXT so that ai's response can be placed
        ...prev.filter((item) => item.text !== LOADER_TEXT),
        { role: "system", text: MSG },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  // function handleInserRespose() {
  //   const lastMessage = messages[messages.length - 1];
  //   console.log("amreaaaaaaaaa");
  //   if (lastMessage.role == "system" && textBoxRef.current) {
  //     textBoxRef.current.setAttribute("data-artdeco-is-focused", "true");
  //     console.log(
  //       "1111",
  //       textBoxRef.current.closest(".msg-form__msg-content-container")
  //     );
  //     textBoxRef.current
  //       .closest(".msg-form__msg-content-container")
  //       .classList.add("msg-form__msg-content-container--is-active");
  //     console.log("----------------");
  //     //  parentElement.getElementsByTagName("p");
  //     textBoxRef.current.querySelector("p").textContent = lastMessage.text;
  //     console.log(
  //       "11111",
  //       textBoxRef.current.closest(".msg-form__placeholder")
  //     );
  //     if (textBoxRef.current) {
  //       const closestContainer = textBoxRef.current.closest(
  //         ".msg-form__msg-content-container"
  //       );

  //       if (closestContainer) {
  //         const placeholderElement = closestContainer.querySelector(
  //           ".msg-form__placeholder"
  //         );

  //         // Remove class if element exists
  //         placeholderElement?.classList.remove("msg-form__placeholder");
  //       }
  //     }
  //     // class="msg-form__placeholder

  //     // If text message is inserted in target element to close the prompt box
  //     onClose();
  //   }
  // }
  function handleInsertResponse() {
    const lastMessage = messages[messages.length - 1];

    if (!lastMessage || lastMessage.role !== "system" || !textBoxRef.current)
      return;

    textBoxRef.current.setAttribute("data-artdeco-is-focused", "true");

    const closestContainer = textBoxRef.current.closest(
      ".msg-form__msg-content-container"
    );

    if (closestContainer) {
      closestContainer.classList.add(
        "msg-form__msg-content-container--is-active"
      );

      const paragraphElement = textBoxRef.current.querySelector("p");
      if (paragraphElement) {
        paragraphElement.textContent = lastMessage.text;
      }

      const placeholderElement = closestContainer.querySelector(
        ".msg-form__placeholder"
      );
      placeholderElement?.classList.remove("msg-form__placeholder");
    }
    // TODO Enable the send button
    onClose();
  }

  function handleRegenerateResponse() {
    alert("Feature comming soon😉");
  }

  return (
    <>
      <ChatBox
        {...{
          loading,
        }}
      />
      <input
        type="text"
        placeholder="Your Prompt"
        className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none w-full gap-2"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleGetAIResponse();
          }
        }}
        value={input}
      />
      {!messages?.length ? (
        <button
          onClick={handleGetAIResponse}
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
            onClick={handleInsertResponse}
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
