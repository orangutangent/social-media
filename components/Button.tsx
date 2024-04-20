"use client";
import { motion } from "framer-motion";

type ButtonProps = {
  actionLabel: string;
  disabled?: boolean;
  onClick?: (e?: any) => void;
  className?: string;
  secondary?: boolean;
  isSmall?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  actionLabel,
  disabled,
  onClick,
  className,
  secondary = false,
  isSmall = false,
}) => {
  return (
    <div className={className}>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.3 }}
        disabled={disabled}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
        ${
          secondary
            ? "bg-white text-black border-black"
            : "bg-black text-white border-white"
        }
        rounded-full border-2 py-2 font-medium disabled:cursor-not-allowed disabled:bg-gray-200
        ${disabled ? "cursor-not-allowed text-gray-400 " : "cursor-pointer"}
        ${isSmall ? "text-sm px-4" : "text-lg px-8"}
        ${className}
        `}
      >
        {actionLabel}
      </motion.button>
    </div>
  );
};

export default Button;
