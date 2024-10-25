import React, { useState } from "react";
import editIcon from "@/assets/edit.svg";
import PromptBox from "@/components/PromptBox";
import Modal from "@/components/common/Modal";

const AIButtonWrapper = ({ isFocused }: { isFocused: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {
        <button
          onClick={handleOpenModal}
          className={`absolute bottom-0 right-0 outline-none border-none bg-transparent w-8 cursor-pointer z-10 ${
            isFocused ? "visible" : "invisible"
          }`}
          title="open prompt"
        >
          <img src={editIcon} alt="SVG Icon" />
        </button>
      }
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        childClassName="absolute left-[35%]"
      >
        <PromptBox onClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default AIButtonWrapper;
