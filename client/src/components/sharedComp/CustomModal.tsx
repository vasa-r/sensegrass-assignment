import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import Close from "../../assets/close.svg";

interface ModalProps {
  showModal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const CustomModal = ({ showModal, setModal, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModal(false);
      }
    };

    if (showModal) {
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal, setModal]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] overflow-y-auto">
      <div
        ref={modalRef}
        className={`w-96 max-h-fit py-5 px-5 rounded-[4px] bg-[#181818] font-semibold flex flex-col justify-between items-center relative  `}
      >
        <img
          className="absolute w-6 cursor-pointer top-4 right-4"
          src={Close}
          alt="close modal"
          onClick={() => setModal(false)}
        />
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
