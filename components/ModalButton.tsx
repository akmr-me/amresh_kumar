import React, { useState } from "react";
import editIcon from "@/assets/edit.svg";
import PromptBox from "@/components/PromptBox";
import Modal from "@/components/common/Modal";

const AIButton = ({ isFocused }: { isFocused: boolean }) => {
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
      {isFocused && (
        <button
          onClick={openModal}
          className="absolute bottom-0 right-0 outline-none border-none bg-transparent w-12"
          title="open"
          style={{
            cursor: "pointer",
            zIndex: 10,
            visibility: isFocused ? "visible" : "hidden",
          }}
        >
          <img src={editIcon} alt="SVG Icon" />
        </button>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <PromptBox />
      </Modal>
    </>
  );
};

export default AIButton;
