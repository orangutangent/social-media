import { MotionProps } from "framer-motion";

declare module "react" {
  interface HTMLAttributes<T> extends MotionProps {}
}
