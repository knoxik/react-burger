import modalOverlayStyles from './modal-overlay.module.css'

const ModalOverlay = ({children}) => {
    return (
        <div className={modalOverlayStyles.overlay}>
            {children}
        </div>
    )
}

export default ModalOverlay;