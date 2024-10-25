import { useState, useEffect, createContext } from "react";
import "@/entrypoints/content/style.css";
import ModalButton from "@/components/ModalButton";

const App = () => {
  const [mount, setMount] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFocused] = useTextBoxSelector();

  console.log("mount", mount);
  return <ModalButton {...{ isFocused }} />;
};

export default App;
