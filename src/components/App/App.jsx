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
import NewsCardList from '../NewsCardList/NewsCardList';
import {
  getSavedArticles,
  removeSavedArticle,
  addSavedArticle,
} from '../../utils/Api';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { getSearchResults } from '../../utils/NewsApi';
import { useLocation } from 'react-router-dom'; //for Stage 3 I will update it later
import { keyWordContext } from '../../contexts/keyWordContext';
import { currentPageContext } from '../../contexts/currentPageContext';
import { searchResultContext } from '../../contexts/searchResultContext';
import { hasSearchedContext } from '../../contexts/hasSearchedContext';
import { savedArticlesContext } from '../../contexts/savedArticlesContext';
function App() {

  const [activeModal, setActiveModal] = useState('');
  const [keyWord, setKeyWord] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const location = useLocation();

  const handleSignInModalClick = () => {
    setActiveModal('sign-in');
  };

  const handleRegisterModalClick = () => {
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
    getSearchResults(keyWord)
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
        .then((data) => {
          setSavedArticles([data.data, ...savedArticles]);
          const savedArticlesId = data.data_id;
          const newArticle = { ...newsData, _id: savedArticlesId };
          const newSearchResult = searchResult.map((article) =>
            article.url === newsData.url ? newArticle : article
          );
          setSearchResult(newSearchResult);
        })
        .catch((err) => console.error(err));
    } else if (savedArticles.some((article) => article.link === newsData.url)) {
      api
        .removeArticle(newsData)
        .then(() => {
          const unsaveNewsArticles = savedArticles.filter(
            (article) => article._id !== newsData._id
          );
          setSavedArticles(unsaveNewsArticles);

          const newArticle = { ...newsData, _id: '' };
          const newSearchResults = searchResult.map((article) =>
            article.url === newsData.url ? newArticle : article
          );
          setSearchResults(newSearchResults);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getSavedArticles()
      .then((res) => {
        setSearchResult(res.articles);
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
              <div className="page">
                <div className="page__content">
                  <Header />
                  <Navigation onLoginClick={handleSignInModalClick} />
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
                        />
                      }
                    />
                    <Route
                      path="/news"
                      element={
                        <NewsCardList
                          handleSaveArticle={handleSaveArticle}
                          handleRemoveArticle={handleRemoveArticle}
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
