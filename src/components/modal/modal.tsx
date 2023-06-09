import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import cn from 'classnames';


const modalRoot = document.getElementById('react-modals') as HTMLElement;

type Props = {
    title?: string;
    onClose: () => void;
    titleClass?: string;
    children: ReactNode;
}

const Modal:FC<Props> = ({children, onClose, title, titleClass}) => {
    React.useEffect(() => {
        document.addEventListener('keydown', handleEscModalClose);

        return () => document.removeEventListener('keydown', handleEscModalClose);;
    }, [])

    const handleEscModalClose = (e: KeyboardEvent) => {
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



export default Modal;