import { motion } from "framer-motion";

const Path = props => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="#F7F0F0"
        strokeLinecap="round"
        {...props}
    />
);

export default Path