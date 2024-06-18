import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  onClose,
  isOpen,
  title,
  onSubmit,
  isLoading,
  buttonText,
  secondButtonText,
  onSecondButtonClick,
}) => {
  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__container">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}></button>
        <h2 className="modal__title">{title}</h2>

        <form onSubmit={onSubmit}>
          {children}
          <div className="modal__button-container">
            <button
              className="modal__button"
              type="submit"
              disabled={isLoading}>
              {buttonText}
            </button>
            <div className="modal__button-wrapper">
              <div className="modal__button-text">or</div>
              {secondButtonText && (
                <button
                  className="modal__button-switch"
                  type="button"
                  onClick={onSecondButtonClick}
                  disabled={isLoading}>
                  {secondButtonText}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ModalWithForm;
