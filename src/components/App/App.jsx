import { useState, useEffect } from "react";
import "./App.css";
import Header from "../header/header";
import Main from "../Main/Main";
import SigninModal from "../ModalWithForm/SigninModal";
import RegisterModal from "../ModalWithForm/RegisterModal";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import Navigation from "../Navigation/Navigation";
function App() {
  const [activeModal, setActiveModal] = useState("");

  const handleSignInModalClick = () => {
    setActiveModal("sign-in");
  };

  const handleRegisterModalClick = () => {
    setActiveModal("sign-up");
  };

  const onClose = () => {
    setActiveModal("");
  };

  const handleEscClose = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  return (
    <>
      <div className="page">
        <div className="page__content">
          <Navigation onLoginClick={handleSignInModalClick} />
          <Header onLoginClick={handleSignInModalClick} />
          <SearchForm />
          <Main />
          <Footer />
          <SigninModal
            isOpen={activeModal === "sign-in"}
            onClose={onClose}
            onRegisterClick={handleRegisterModalClick}
            OnLogInClick={handleSignInModalClick}
            activeModal={activeModal}
          />
          <RegisterModal
            isOpen={activeModal === "sign-up"}
            onClose={onClose}
            onLoginClick={handleSignInModalClick}
            onRegisterClick={handleRegisterModalClick}
            activeModal={activeModal}
          />
        </div>
      </div>
    </>
  );
}

export default App;
