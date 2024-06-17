import { motion } from "framer-motion";
import Button from "./ui/Button";

interface FormProps {
  title?: string;
  onSubmit: (e?: any) => void;
  body: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Form: React.FC<FormProps> = ({
  title,
  onSubmit,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "-100px" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100px" }}
      transition={{ duration: 0.3 }}
      className=""
    >
      <form className="flex flex-col" action="">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold mt-4 ">{title}</h2>
          {body}
          <div className="mt-2 flex flex-col gap-4">
            <Button
              className="my-4"
              disabled={disabled}
              actionLabel={actionLabel}
              onClick={onSubmit}
            />
            {secondaryAction && secondaryActionLabel && (
              <Button
                disabled={disabled}
                actionLabel={secondaryActionLabel}
                onClick={secondaryAction}
              />
            )}
          </div>
          {footer}
        </div>
      </form>
    </motion.div>
  );
};

export default Form;
