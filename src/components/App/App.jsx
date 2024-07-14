import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../header/header';
import Main from '../Main/Main';
import SigninModal from '../ModalWithForm/SigninModal';
import RegisterModal from '../ModalWithForm/RegisterModal';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import SavedNews from '../SavedNews/SavedNews';
import {
  getSavedArticles,
  removeSavedArticle,
  addSavedArticle,
} from '../../utils/Api';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { getSearchResult } from '../../utils/NewsApi';
import { useLocation } from 'react-router-dom'; 
import { keyWordContext } from '../../contexts/keyWordContext';
import { currentPageContext } from '../../contexts/currentPageContext';
import { searchResultContext } from '../../contexts/searchResultContext';
import { hasSearchedContext } from '../../contexts/hasSearchedContext';
import { savedArticlesContext } from '../../contexts/savedArticlesContext';
import { mobileContext } from '../../contexts/mobileContext';
function App() {
  const [activeModal, setActiveModal] = useState('');
  const [keyWord, setKeyWord] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [openMobileMenu, setMobileMenuOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 

  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };




  const handleSignInModalClick = () => {
    if (setMobileMenuOpen) {
      closeMobileMenu();
    }
    setActiveModal('sign-in');
  };

  const handleRegisterModalClick = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
    setActiveModal('sign-up');
  };

  const onClose = () => {
    setActiveModal('');
  };




  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  useEffect(() => {
    const handleOverlayClick = (e) => {
      if (e.target.classList.contains('modal')) {
        onClose();
      }
    };
    document.addEventListener('click', handleOverlayClick);
    return () => {
      document.removeEventListener('click', handleOverlayClick);
    };
  }, []);

  const handleSearch = (keyWord) => {
    setKeyWord(keyWord);
    setIsSearching(true);
    setIsLoading(true);
    getSearchResult(keyWord)
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

  const handleSaveArticle = ({ newsData, keyWord }) => {
    if (!savedArticles.find((article) => article.link === newsData.url)) {
      addSavedArticle(newsData, keyWord)
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

          const newArticle = { ...newsData, _id: '' };
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
    <currentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      <hasSearchedContext.Provider value={{ hasSearched, setHasSearched }}>
        <searchResultContext.Provider value={{ searchResult, setSearchResult }}>
          <savedArticlesContext.Provider
            value={{ savedArticles, setSavedArticles }}>
            <keyWordContext.Provider value={{ keyWord, setKeyWord }}>
              <mobileContext.Provider value={{}}>
              <div className="page">
                <div className="page__content">
                  <Header />
                  <Navigation
                    onLoginClick={handleSignInModalClick}
                    onRegisterClick={handleRegisterModalClick}
                  />
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Main
                          onSignUp={handleRegisterModalClick}
                          handleSearch={handleSearch}
                          searchError={searchError}
                          isLoading={isLoading}
                          handleRemoveArticle={handleRemoveArticle}
                          handleSaveArticle={handleSaveArticle}
                        />
                      }
                    />

                    <Route
                      path="/saved-news"
                      element={
                        <ProtectedRoute>
                          <SavedNews
                            handleRemoveArticle={handleRemoveArticle}
                          />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                  <Footer />
                  <SigninModal
                    isOpen={activeModal === 'sign-in'}
                    onClose={onClose}
                    onRegisterClick={handleRegisterModalClick}
                    OnLogInClick={handleSignInModalClick}
                    activeModal={activeModal}
                    isLoading={isLoading}
                  />
                  <RegisterModal
                    isOpen={activeModal === 'sign-up'}
                    onClose={onClose}
                    onLoginClick={handleSignInModalClick}
                    onRegisterClick={handleRegisterModalClick}
                    activeModal={activeModal}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </keyWordContext.Provider>
          </savedArticlesContext.Provider>
        </searchResultContext.Provider>
      </hasSearchedContext.Provider>
    </currentPageContext.Provider>
  );
}

export default App;
