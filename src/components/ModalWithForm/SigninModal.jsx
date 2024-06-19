import { useState, useEffect } from "react";
import "./SiginModal.css";
import ModalWithForm from "./ModalWithForm";

const SigninModal = ({
  isOpen,
  onClose,
  onRegisterClick,
  OnLogInClick,
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
    OnLogInClick({ email, password });
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
      title="Log in"
      buttonText="Sign in"
      secondButtonText="or Sign up"
     >
      <label htmlFor="email" className="modal__label">
        <input
          className="modal__input"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        <input
          className="modal__input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
          required
        />
      </label>
      <button
        type="submit"
        onClick={OnLogInClick}
        className="Login__button"></button>
      <button onClick={onRegisterClick} className="Or-Sign-Up__button"></button>
    </ModalWithForm>
  );
};

export default SigninModal;
