import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 transition hover:text-black"
        >
          <X size={28} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;