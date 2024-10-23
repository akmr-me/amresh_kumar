import { useState, useEffect, createContext } from "react";
import "./index.css";
import ModalButton from "@/components/Modal";

export const MessageContext = createContext(null);

function MessageProvider({ children }) {
  const [message, setMessage] = useState([]);
  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

const App = () => {
  const [mount, setMount] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleMount = () => setMount(true);
  const handleClickOutside = (e: MouseEvent) => {
    if (ref?.current && !ref.current.contains(e.target as Node)) {
      setMount(false);
    }
  };

  useEffect(() => {
    inputRef.current = document.querySelector(
      ".form__input--floating > input"
    ) as HTMLInputElement;
    ref.current = document.querySelector(
      ".form__input--floating"
    ) as HTMLInputElement;
    // input is already focused before mouting of current component
    if (document.activeElement == inputRef.current) handleMount();
    inputRef.current?.addEventListener("focus", handleMount);
    document.addEventListener("click", handleClickOutside);

    return () => {
      inputRef.current?.removeEventListener("focus", handleMount);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <MessageProvider>
      <ModalButton
        {...{ mount, setMount, isModalOpen, setIsModalOpen, inputRef }}
      />
    </MessageProvider>
  );
};

export default App;
