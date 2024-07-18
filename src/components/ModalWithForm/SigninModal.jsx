import { useEffect, useContext } from 'react';
import './SiginModal.css';
import ModalWithForm from './ModalWithForm';
import { useForm } from '../../Hooks/useForm';
import { currentUserContext } from '../../contexts/currentUserContext';
const SigninModal = ({
  isOpen,
  onClose,
  onRegisterClick,
  OnLogInClick,
  IsLoading,
  onLogIn,
}) => {
  const currentUser = useContext(currentUserContext);
  const inputValues = {
    email: '',
    password: '',
  };

  const { values, handleChange, errors, isValid, resetForm } = useForm(
    inputValues,
    currentUser
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onLogIn(values);
    }
  };

  useEffect(() => {
    resetForm(inputValues);
  }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Sign in"
      buttonText={IsLoading ? 'Loading...' : 'Sign in'}
      ButtonText2="or Sign up">
      <label
        htmlFor="email"
        className="modal__label">
        Email
        <input
          className={`modal__input ${errors.email ? 'modal__input-error' : ''}`}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label
        htmlFor="password"
        className="modal__label">
        Password
        <input
          className={`modal__input ${
            errors.password ? 'modal__input-error' : ''
          }`}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <button
        type="submit"
        onClick={OnLogInClick}
        className="Login__button">
        Sign in
      </button>
      <button
        onClick={onRegisterClick}
        className="Or-Sign-Up__button">
        {' '}
        or Sign up
      </button>
    </ModalWithForm>
  );
};

export default SigninModal;
