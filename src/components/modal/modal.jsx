import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import cn from 'classnames';


const modalRoot = document.getElementById('react-modals');

const Modal = ({children, onClose, title, titleClass}) => {
    React.useEffect(() => {
        document.addEventListener('keydown', handleEscModalClose);

        return () => document.removeEventListener('keydown', handleEscModalClose);;
    }, [])

    const handleEscModalClose = (e) => {
        if (e.key === 'Escape'){
            onClose();
        }
    }

    return ReactDOM.createPortal(
        (
            <div className={modalStyles.modal}>
                <ModalOverlay onClose={onClose}/>
                <div className={modalStyles.modalContainer}>
                    {title && <h2 className={cn('text text_type_main-large ml-10 mt-10 pt-3', titleClass)}>{title}</h2>}
                    <button className={modalStyles.closeButton} type="button" onClick={onClose}>
                        <CloseIcon type="primary" />
                    </button>
                    {children}
                </div>
            </div>
        ), 
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string
}

export default Modal;