import "./SuccessfulModal.css";

function SuccessfulModal({ isOpen, onClose, onLoginClick }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">Registration successfullly completed!</h2>
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <button
          className="modal__login-button"
          type="button"
          onClick={onLoginClick}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SuccessfulModal;
