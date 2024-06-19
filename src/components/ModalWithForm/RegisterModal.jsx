import "./RegisterModal.css";
import ModalWithForm from "./ModalWithForm";
import { useState, useEffect } from "react";

function RegisterModal({ onClose, isOpen, onRegisterClick, onLoginClick }) {
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
    onRegisterClick({ email, password, username });
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
      buttonText={"Sign up"}
      buttonText2={"or Log in"}>
      <label htmlFor="email2" className="modal__label">
        <input
          className="modal__input"
          type="email"
          name="email"
          id="email2"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
          required
        />
      </label>
      <label htmlFor="password2" className="modal__label">
        <input
          className="modal__input"
          type="password"
          name="password"
          id="password2"
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
      <button type="submit" className="SignUp__button"></button>
      <button
        onClick={onLoginClick}
        type="button"
        className="Or-Login__button"></button>
    </ModalWithForm>
  );
}
export default RegisterModal;
