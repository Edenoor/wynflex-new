import useMenuContext from "../../hooks/useMenuContext";
import { motion } from "framer-motion";

export default function MenuContent({ children, ...otherProps }) {
  const { toggleOpen } = useMenuContext();

  return (
    <motion.div
      onClick={() => {
        toggleOpen();
      }}
      {...otherProps}
    >
      {children}
    </motion.div>
  );
}