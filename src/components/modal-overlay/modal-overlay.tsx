import modalOverlayStyles from './modal-overlay.module.css';
import { FC } from 'react';

type Props = {
    onClose: () => void;
}

const ModalOverlay: FC<Props> = ({onClose}) => {
    return (
        <div className={modalOverlayStyles.overlay} onClick={onClose}></div>
    )
}

export default ModalOverlay;