import { ReactElement } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement | ReactElement[];
  childClassName: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  childClassName = "",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed flex items-center justify-center bg-black bg-opacity-50 z-[1000] h-screen w-screen top-0 right-0"
      onClick={onClose}
    >
      <div
        className={`flex flex-col items-center bg-[#F9FAFB] p-5 shadow-md rounded-md min-w-[480px] gap-3 max-w-[480px]`}
        // here stopping bubbling of click event out side of this div so that when we click on this div and its child modal does not get closed.
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        {/* Since childrent accepts props that why using clone element to pass props */}
        {/* {isValidElement(children)
          ? cloneElement(children as ReactElement<any>, { onClose })
          : null} */}
      </div>
    </div>
  );
};

export default Modal;
