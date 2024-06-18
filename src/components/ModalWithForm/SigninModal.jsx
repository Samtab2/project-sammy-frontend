import { useState, useEffect } from "react";
import "./SiginModal.css";
import ModalWithForm from "./ModalWithForm";

const SigninModal = () => ({
    isOpen,
    onClose,
    onSubmitClick,
    isLoading,
    activeModal,
    onSecondButtonClick,
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isOpen) {
            setEmail("");
            setPassword("");
        }
    }, [isOpen]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmitClick({ email, password });
    };  

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    return (
        <ModalWithForm
            isOpen={isOpen} 
            onSubmit={handleSubmit}
            onClose={onClose}
            title="Sign in"
            name="signin"
            buttonText={isLoading ? "Signing in..." : "Sign in"}
           secondButtonText={activeModal === "sign-up" ? "Sign in" : "Sign up"}
            onSecondButtonClick={onSecondButtonClick}
            activeModal={activeModal}
            onSubmitClick={onSubmitClick}
        >
            <label className="modal__label">
                <input
                    className="modal__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmail}
                    required
                />
            </label>
            <label className="modal__label">
                <input
                    className="modal__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePassword}
                    required />
            </label>
        </ModalWithForm>
    );
};
export default SigninModal;
