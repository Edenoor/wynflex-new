import Modal from './Modal';
import useModalContext from '../../hooks/useModalContext';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';


export default function ModalContainer({ children, className, ...otherProps }) {
    const { modals, closeModal } = useModalContext();

    const location = useLocation();

    useEffect(() => {
        modals.splice(0, modals.length);
    }, [location.pathname])

    return (
        <AnimatePresence>
            {modals.map(({ id, Component, componentProps }, idx) => {
                return (
                    <Modal closeModal={() => { closeModal(id) }} key={idx}>
                        <Component {...componentProps} closeModal={() => { closeModal(id) }} />
                    </Modal>
                )
            })}
        </AnimatePresence >
    )
}
