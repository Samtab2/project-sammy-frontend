import "./RegisterModal.css";
import ModalWithForm from "./ModalWithForm";
import { useState, useEffect } from "react";



const RegisterModal = () => ({
    isOpen,
    onClose,
    onSubmitClick,
    isLoading,
    activeModal,
    onSecondButtonClick,
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");

    useEffect(() => {
        if (isOpen) {
            setEmail("");
            setPassword("");
            setUserName("");
        }
    }, [isOpen]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmitClick({ email, password, username });
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleUserName = (event) => {
        setUserName(event.target.value);
    };

    return (
        <ModalWithForm 
            isOpen={isOpen} 
            onSubmit={handleSubmit}
            onClose={onClose}
            title="Sign up"
            name="signup"
            buttonText={isLoading ? "Signing up..." : "Sign up"}
            secondButtonText={activeModal === "sign-in" ? "Sign up" : "Sign in"}
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
                    required   
                />
            </label>
            <label className="modal__label">
                <input
                    className="modal__input"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleUserName}
                    required
                />
            </label>
        </ModalWithForm>
    );

};  
export default RegisterModal;