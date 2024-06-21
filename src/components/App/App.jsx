import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "../header/header";
import Main from "../Main/Main";
import SigninModal from "../ModalWithForm/SigninModal";
import RegisterModal from "../ModalWithForm/RegisterModal";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import Navigation from "../Navigation/Navigation";
import Api from "../../../utils/Api";
import { useLocation } from "react-router-dom";
import { getSearchResults } from "../../../utils/NewsApi";
function App() {
  const api = new Api({
    baseUrl: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const [activeModal, setActiveModal] = useState("");
  const [newsItems, setNewsItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const location = useLocation();

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

  const handleSearch = (keyword) => {
    setKeyword(keyword);
    setIsSearching(true);
    getSearchResults(keyword)
      .then((res) => {
        setSearchResult(res.articles);
        setHasSearched(true);
        setIsSearching(false);
        setSearchError(false);
      })
      .catch((err) => {
        console.log(err);
        setSearchError(true);
        setIsSearching(false);
      });
  };

  const handleAddNews = (data) => {
    api
      .postNews(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    api
      .getNewsItems()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          <Header />
          <Navigation onLoginClick={handleSignInModalClick} />
          <SearchForm />
          <Main handleSearch={handleSearch} searchError={searchError} />
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
