import useMenuContext from "../../hooks/useMenuContext";
import { motion } from "framer-motion";
import Path from "./MenuPath";

export default function MenuTrigger({ children, ...otherProps }) {
  const { toggleOpen } = useMenuContext();

  if (children) {
    return (
      <button
        type="button"
        onClick={() => {
          toggleOpen();
        }}
        {...otherProps}
      >
        {children}
      </button>
    );
  }

  return (
    <>
      <motion.svg
        width="30"
        height="30"
        viewBox="0 0 22 18.5"
        onClick={() => {
          toggleOpen();
        }}
        {...otherProps}
      >
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            opened: { d: "M 3 16.5 L 17 2.5" }
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            opened: { opacity: 0 }
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            opened: { d: "M 3 2.5 L 17 16.346" }
          }}
        />
      </motion.svg>
    </>
  );
}