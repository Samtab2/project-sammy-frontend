import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import SigninModal from "../ModalWithForm/SigninModal";
import RegisterModal from "../ModalWithForm/RegisterModal";
import SuccessfulModal from "../ModalWithForm/SuccessfulModal";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import MobileMenu from "../MobileMenu/MobileMenu";
import {
  getSavedArticles,
  removeSavedArticle,
  addSavedArticle,
} from "../../utils/Api";
import { checkToken, authorize, register } from "../../utils/Auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getSearchResult } from "../../utils/NewsApi";
import { useLocation } from "react-router-dom";
import { keywordContext } from "../../contexts/keyWordContext";
import { currentPageContext } from "../../contexts/currentPageContext";
import { searchResultContext } from "../../contexts/searchResultContext";
import { hasSearchedContext } from "../../contexts/hasSearchedContext";
import { savedArticlesContext } from "../../contexts/savedArticlesContext";
import { mobileContext } from "../../contexts/mobileContext";
import { currentUserContext } from "../../contexts/currentUserContext";
function App() {
  const [activeModal, setActiveModal] = useState("");
  const [keyword, setkeyword] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [currentUser, setCurrentUser] = useState({
    name: "",
    _id: "",
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSignInModalClick = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
    setActiveModal("sign-in");
  };

  const handleRegisterModalClick = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
    setActiveModal("sign-up");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const onClose = () => {
    setActiveModal("");
  };

  const openSuccessModal = () => {
    setIsSuccessful(true);
  };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  useEffect(() => {
    const handleOverlayClick = (e) => {
      if (e.target.classList.contains("modal")) {
        onClose();
      }
    };
    document.addEventListener("click", handleOverlayClick);
    return () => {
      document.removeEventListener("click", handleOverlayClick);
    };
  }, []);

  useEffect(() => {
    setIsLoggedInLoading(true);
    checkToken()
      .then((res) => {
        if (res) {
          setIsLoggedIn(false);
          setCurrentUser(res.data);
          getSavedArticles()
            .then((res) => {
              setSavedArticles(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoggedInLoading(false);
      });
  }, []);

  const handleSignUp = ({ name, email, password }) => {
    register({ name, email, password })
      .then((res) => {
        setCurrentUser({
          name: res.data.name,
          email: res.data.email,
          _id: res.data._id,
        });
        setIsLoggedIn(true);
        openSuccessModal(true);
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignIn = ({ email, password }) => {
    authorize({ email, password })
      .then((res) => {
        setCurrentUser({
          email: res.data.email,
          password: res.data.password,
          _id: res.data._id,
        });
        setIsLoggedIn(true);
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (keyword) => {
    setkeyword(keyword);
    setIsSearching(true);
    setIsLoading(true);
    getSearchResult(keyword)
      .then((res) => {
        setSearchResult(res.articles);
        setHasSearched(true);
        setIsSearching(false);
        setSearchError(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSearching(false);
        setSearchError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRemoveArticle = ({ newsData }) => {
    removeSavedArticle(newsData)
      .then(() => {
        const unsavedNewsArticles = savedArticles.filter(
          (article) => article._id !== newsData._id
        );
        setSavedArticles(unsavedNewsArticles);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveArticle = ({ newsData, keyword }) => {
    if (!savedArticles.find((article) => article.link === newsData.url)) {
      addSavedArticle(newsData, keyword)
        .then((res) => {
          setSavedArticles([res, ...savedArticles]);
          const savedArticlesId = res.data_id;
          const newArticle = { ...newsData, _id: savedArticlesId };
          const newSearchResult = searchResult.map((article) =>
            article.url === newsData.url ? newArticle : article
          );
          setSearchResult(newSearchResult);
        })
        .catch((err) => console.error(err));
    } else if (savedArticles.some((article) => article.link === newsData.url)) {
      removeSavedArticle(newsData)
        .then(() => {
          const unsaveNewsArticles = savedArticles.filter(
            (article) => article._id !== newsData._id
          );
          setSavedArticles(unsaveNewsArticles);

          const newArticle = { ...newsData, _id: "" };
          const newSearchResult = searchResult.map((article) =>
            article.url === newsData.url ? newArticle : article
          );
          setSearchResult(newSearchResult);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getSavedArticles()
      .then((res) => {
        setSearchResult(res);
        setHasSearched(true);
        setSearchError(false);
      })
      .catch((err) => {
        console.log(err);
        setSearchError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="page">
      <currentPageContext.Provider value={{ currentPage, setCurrentPage }}>
        <currentUserContext.Provider value={{ isLoggedIn, currentUser }}>
          <hasSearchedContext.Provider value={{ hasSearched, setHasSearched }}>
            <searchResultContext.Provider
              value={{ searchResult, setSearchResult }}
            >
              <savedArticlesContext.Provider
                value={{ savedArticles, setSavedArticles }}
              >
                <keywordContext.Provider value={{ keyword, setkeyword }}>
                  <mobileContext.Provider
                    value={{ mobileMenuOpen, openMobileMenu, closeMobileMenu }}
                  >
                    <div className="page__content">
                      <Routes>
                        <Route
                          path="/"
                          element={
                            <Main
                              handleSearch={handleSearch}
                              searchError={searchError}
                              isLoading={isLoading}
                              handleRemoveArticle={handleRemoveArticle}
                              handleSaveArticle={handleSaveArticle}
                              onLoginClick={handleSignInModalClick}
                              onLogout={handleLogout}
                              onRegisterClick={handleRegisterModalClick}
                            />
                          }
                        />

                        <Route
                          path="/saved-news"
                          element={
                            <ProtectedRoute
                              isLoggedIn={isLoggedIn}
                              isLoggedInLoading={isLoading}
                            >
                              <SavedNews
                                handleRemoveArticle={handleRemoveArticle}
                              />
                            </ProtectedRoute>
                          }
                        />
                      </Routes>
                      {mobileMenuOpen && (
                        <MobileMenu
                          onLoginClick={handleSignInModalClick}
                          onLogout={handleLogout}
                          onCloseMenu={closeMobileMenu}
                        />
                      )}

                      <SigninModal
                        isOpen={activeModal === "sign-in"}
                        onClose={onClose}
                        onRegisterClick={handleRegisterModalClick}
                        onLogInClick={handleSignInModalClick}
                        onLogIn={handleSignIn}
                        activeModal={activeModal}
                        isLoading={isLoading}
                      />
                      <RegisterModal
                        isOpen={activeModal === "sign-up"}
                        onClose={onClose}
                        onLoginClick={handleSignInModalClick}
                        onRegisterClick={handleRegisterModalClick}
                        onRegister={handleSignUp}
                        activeModal={activeModal}
                        isLoading={isLoading}
                      />
                      <SuccessfulModal
                        onClose={onClose}
                        isOpen={isSuccessful}
                        onLogInClick={handleSignInModalClick}
                      />
                    </div>

                    <Footer />
                  </mobileContext.Provider>
                </keywordContext.Provider>
              </savedArticlesContext.Provider>
            </searchResultContext.Provider>
          </hasSearchedContext.Provider>
        </currentUserContext.Provider>
      </currentPageContext.Provider>
    </div>
  );
}

export default App;
