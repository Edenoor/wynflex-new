import MenuContext from '../../Context/MenuContext';
import { motion, useCycle } from "framer-motion"

export default function MenuContainer({ children, ...otherProps }) {
    const [isOpen, toggleOpen] = useCycle(false, true);

    return (
        <MenuContext.Provider value={{ isOpen, toggleOpen }}>
            <motion.div
                initial={false}
                animate={isOpen ? 'opened' : 'closed'}
                {...otherProps}
            >
                {children}
            </motion.div>
        </MenuContext.Provider>
    );
}
