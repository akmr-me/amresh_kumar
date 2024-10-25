import "@/entrypoints/content/style.css";
import AIButtonWrapper from "@/components/AIButtonWrapper";

const App = () => {
  const [isFocused] = useTextBoxSelector();

  return <AIButtonWrapper isFocused={isFocused} />;
};

export default App;
