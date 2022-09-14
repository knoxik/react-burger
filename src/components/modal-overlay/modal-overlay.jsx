import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({onClose}) => {
    return (
        <div className={modalOverlayStyles.overlay} onClick={onClose}></div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;