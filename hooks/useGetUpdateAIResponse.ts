import { useCallback } from "react";
import { flushSync } from "react-dom";
import { Message, useMessageState } from "@/context/message";
import getAIResponse from "@/utils/fetchAIResponse";

interface UseGetUpdateAIResponseType {
  userInput: string;
  clearUserInput?: () => void;
}

const LOADER_TEXT = "...";

export default function useGetUpdateAIResponse({
  userInput,
  clearUserInput,
}: UseGetUpdateAIResponseType) {
  const [loading, setLoading] = useState(false);
  const { setMessages } = useMessageState();

  const handleUpdateAIResponse = useCallback(
    async function () {
      if (!userInput) {
        alert("Please enter some prompt!");
        return;
      }
      // This updates user input message in chat bot and using flushSync so that setMessage work synchronusly so that first user's message apears then ai's response
      flushSync(() => {
        setMessages((prev: Message[]) => [
          ...prev,
          { role: "user", text: userInput },
          // Setting LOADER_TEXT as a loader for system response
          { role: "system", text: LOADER_TEXT },
        ]);
        clearUserInput?.();
      });

      try {
        setLoading(true);
        const MSG = await getAIResponse(userInput);
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
    },
    [userInput]
  );

  const handleRegenerateResponse = useCallback(function () {
    alert("Feature comming soon😉");
  }, []);

  return { handleUpdateAIResponse, handleRegenerateResponse, loading };
}
