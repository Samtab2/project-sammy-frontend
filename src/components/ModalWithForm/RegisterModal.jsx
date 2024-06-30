import "./RegisterModal.css";
import ModalWithForm from "./ModalWithForm";
import { useState, useEffect } from "react";

function RegisterModal({
  onClose,
  isOpen,
  onRegisterClick,
  onLoginClick,
  IsLoading,
}) {
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
      buttonText={IsLoading ? "Loading..." : "Sign up"}
      buttonText2={"or Log in"}>
      <label htmlFor="email2" className="modal__label">
        Email
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
        Password
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
      <label htmlFor="username" className="modal__label">
        Username
        <input
          className="modal__input"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={handleUserName}
          required
        />
      </label>
      <button type="submit" className="SignUp__button">
        Sign up
      </button>
      <button onClick={onLoginClick} type="button" className="Or-Login__button">
        {" "}
        or Log in
      </button>
    </ModalWithForm>
  );
}
export default RegisterModal;
