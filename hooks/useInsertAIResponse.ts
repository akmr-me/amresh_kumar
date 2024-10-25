import { Message } from "@/context/message";
import { useCallback } from "react";

interface UseInsertAIResponse {
  elementRef: React.MutableRefObject<HTMLElement | null>;
  messages: Message[];
  callback?: () => void;
}

export default function useInsertAIResponse({
  elementRef,
  messages,
  callback,
}: UseInsertAIResponse) {
  const handleInsertResponse = useCallback(
    function handleInsertResponse() {
      const lastMessage = messages[messages.length - 1];

      if (!lastMessage || lastMessage.role !== "system" || !elementRef.current)
        return;

      /*Linkedin message box is not a traditional input box it is a div with property editable. To start writing in message box some attribute needs to be set to some specific value
      1. "data-artdeco-is-focused", "true"
      2. div with classname <msg-form__msg-content-container> must have class <msg-form__msg-content-container--is-active>
      3. text should be written inside a p tage under editable div
      4. div with class name <msg-form__placeholder> acts as place holder it will make text inside p tag overlap over place holder tag so to make it work remove this class
      5. send button is still disabled so enable it
       */
      elementRef.current.setAttribute("data-artdeco-is-focused", "true");

      //
      const closestContainer = elementRef.current.closest(
        ".msg-form__msg-content-container"
      );

      if (closestContainer) {
        closestContainer.classList.add(
          "msg-form__msg-content-container--is-active"
        );

        const paragraphElement = elementRef.current.querySelector("p");
        if (paragraphElement) {
          paragraphElement.textContent = lastMessage.text;
        }

        const placeholderElement = closestContainer.querySelector(
          ".msg-form__placeholder"
        );
        placeholderElement?.classList.remove("msg-form__placeholder");

        const sendButton = document.querySelector(".msg-form__send-button");
        sendButton?.removeAttribute("disabled");
        elementRef.current.focus();
      }
      //   After inserting reponse if any callback needs to ran , this is optional
      callback?.();
    },
    [messages]
  );
  return handleInsertResponse;
}
