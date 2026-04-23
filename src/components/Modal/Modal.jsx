import { motion } from "framer-motion"

export default function Modal({ className, children, closeModal, ...otherProps }) {
    return (
        <motion.div
            key="modal"
            className='bg-black bg-opacity-30 fixed flex items-center justify-center w-screen h-screen z-30 top-0 left-0 pt-20'
            onClick={() => { closeModal() }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={(e) => { e.stopPropagation() }}
                className={`bg-white rounded-xl p-6 flex ${className || ''}`}
                {...otherProps}
            >
                {children}
            </motion.div>
        </motion.div>

    )
}