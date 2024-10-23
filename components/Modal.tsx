import React, { useState } from "react";
import editIcon from "../assets/edit.svg";
import "../entrypoints/index.css";
import PromptBox from "./PromptBox";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const Modal = ({ isOpen, onClose, inputRef }: ModalProps) => {
  console.log({ isOpen });
  if (!isOpen) return null;
  return (
    <div
      className="fixed flex items-center justify-center bg-black bg-opacity-50 z-10 h-screen w-screen top-0 right-0"
      onClick={onClose}
    >
      <PromptBox inputRef={inputRef} />
    </div>
  );
};

const ModalButton = ({ mount, inputRef }: { mount: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {mount && (
        <button
          onClick={openModal}
          className="absolute bottom-0 right-0 outline-none border-none bg-transparent w-12"
          title="open"
          style={{
            cursor: "pointer",
            zIndex: 10,
            visibility: mount ? "visible" : "hidden",
          }}
        >
          <img src={editIcon} alt="SVG Icon" />
        </button>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} inputRef={inputRef} />
    </>
  );
};

export default ModalButton;
