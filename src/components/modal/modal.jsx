import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const modalRoot = document.getElementById('react-modals');

const Modal = ({children, onClose, onEscClose, title}) => {
    React.useEffect(() => {
        setEventListeners();

        return () => removeEventListeners();
    }, [])

    
    const setEventListeners = () => {
        document.addEventListener('click', onClose);
        document.addEventListener('keydown', onEscClose);
    }

    const removeEventListeners = () => {
        document.removeEventListener('click', onClose);
        document.removeEventListener('keydown', onEscClose);
    }

    return ReactDOM.createPortal(
        (
            <ModalOverlay>
                <div className={modalStyles.modalContainer}>
                    {title && <h2 className={`text text_type_main-large ml-10 mt-10 pt-3`}>{title}</h2>}
                    <button className={modalStyles.closeButton} type="button" onClick={onClose}>
                        <CloseIcon type="primary" />
                    </button>
                    {children}
                </div>
            </ModalOverlay>
        ), 
        modalRoot
    );
}

export default Modal;