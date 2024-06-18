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
          <Navigation />
          <Header onLoginClick={handleSignInModalClick} />
          <SearchForm />
          <Main />
          <Footer />
          {activeModal === "sign-in" && (
            <SigninModal
              isOpen={true}
              onClose={onClose}
              onSecondButtonClick={handleRegisterModalClick}
              handleSignInModalClick={handleSignInModalClick}
              activeModal={activeModal}
            />
          )}
          {activeModal === "sign-up" && (
            <RegisterModal
              isOpen={true}
              onClose={onClose}
              onSecondButtonClick={handleSignInModalClick}
              handleRegisterModalClick={handleRegisterModalClick}
              activeModal={activeModal}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
