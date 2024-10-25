import { useMessageState } from "@/context/message";

type UseTextBoxSelectorReturn = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];

export default function useTextBoxSelector(): UseTextBoxSelectorReturn {
  const [isFocused, setIsfocused] = useState(false);
  const { textBoxRef } = useMessageState();

  const handleFocus = () => setIsfocused(true);

  const handleBlur = (e: MouseEvent) => {
    if (textBoxRef?.current && !textBoxRef.current.contains(e.target as Node)) {
      setIsfocused(false);
    }
  };

  useEffect(() => {
    textBoxRef.current = document.querySelector(
      ".msg-form__contenteditable"
    ) as HTMLInputElement;

    // Incase input is already focused before mouting of current component
    if (document.activeElement == textBoxRef.current) handleFocus();
    textBoxRef.current?.addEventListener("focus", handleFocus);
    document.addEventListener("click", handleBlur);

    return () => {
      textBoxRef.current?.removeEventListener("focus", handleFocus);
      document.removeEventListener("click", handleBlur);
    };
  }, []);

  return [isFocused, setIsfocused];
}
