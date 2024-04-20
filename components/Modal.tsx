"use client";
import { AiOutlineClose } from "react-icons/ai";
import Button from "@/components/Button";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const handleClose = () => {
    if (disabled) {
      return;
    }
    onClose();
  };

  const handleSubmit = () => {
    if (disabled) {
      return;
    }
    onSubmit();
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={handleBackgroundClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="
        justify-center
        items-center
        flex
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-black
        bg-opacity-70
        "
        >
          <div
            className="
          relative
          w-full
          lg:w-3/6
          my-6
          mx-auto
          lg:max-w-3xl
          h-full
          lg:h-auto
          "
          >
            {/* CONTENT */}

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              className="
              h-full
              lg:h-auto
              border-0
              rounded-lg
              shadow-lg
              relative
              flex
              flex-col
              w-full
              bg-slate-950
              outline-none
              focus:outline-none
              "
            >
              {/* HEADER */}
              <div className="flex items-center justify-between p-10 rounded-t">
                <motion.h3
                  initial={{ opacity: 0, x: "-100px" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-semibold text-white"
                >
                  {title}
                </motion.h3>
                <button
                  onClick={handleClose}
                  className="
                  p-1
                  ml-auto
                  border-0
                  text-white
                  hover:opacity-70
                  transition
                "
                >
                  <AiOutlineClose size={20} />
                </button>
              </div>
              {/* BODY */}
              <motion.div
                initial={{ opacity: 0, y: "-100px" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-100px" }}
                transition={{ duration: 0.5 }}
                className="relative p-10 flex-auto"
              >
                {body}
              </motion.div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-10">
                <div className="mx-auto">
                  <Button
                    disabled={disabled}
                    actionLabel={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
