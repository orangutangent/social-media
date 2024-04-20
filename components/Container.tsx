import { motion, AnimatePresence } from "framer-motion";

interface Props {
  children?: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: "-100px" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "-100px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex justify-center mx-4 my-4 md:mx-auto"
      >
        <div className="text-center text-white w-full max-w-[600px] md:w-[600px]  border-2 border-slate-700 rounded-2xl  ">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Container;
