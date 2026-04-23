import { useState } from 'react';
import ModalContext from '../../context/ModalContext';
import ModalContainer from './ModalContainer';

export default function ModalProvider({ children }) {
    const [modals, setModals] = useState([]);

    const openModal = (Component, componentProps) => {
        setModals(currentModals => [...currentModals, { Component, id: Date.now(), componentProps }]);
    };

    const closeModal = (id) => {
        setModals(currentModals => currentModals.filter(modal => modal.id !== id))
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, modals }}>
            {children}
            <ModalContainer />
        </ModalContext.Provider>
    );
}