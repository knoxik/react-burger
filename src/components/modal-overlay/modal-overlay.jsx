import modalOverlayStyles from './modal-overlay.module.css';
import propTypes from 'prop-types';

const ModalOverlay = ({onClose}) => {
    return (
        <div className={modalOverlayStyles.overlay} onClick={onClose}></div>
    )
}

ModalOverlay.propTypes = {
    onClose: propTypes.func.isRequired
}

export default ModalOverlay;