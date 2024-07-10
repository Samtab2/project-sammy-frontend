import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../header/header';
import Main from '../Main/Main';
import SigninModal from '../ModalWithForm/SigninModal';
import RegisterModal from '../ModalWithForm/RegisterModal';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import savedNews from '../SavedNews/SavedNews'; // for Stage 3 I will update it later
import Api from '../../utils/Api';
import { getSearchResults } from '../../utils/NewsApi';
import { useLocation } from 'react-router-dom'; //for Stage 3 I will update it later
import { keyWordContext } from '../../contexts/keyWordContext';
import { currentPageContext } from '../../contexts/currentPageContext';
import { searchResultContext } from '../../contexts/searchResultContext';
import { hasSearchedContext } from '../../contexts/hasSearchedContext';
function App() {
  const api = new Api({
    baseUrl: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const [activeModal, setActiveModal] = useState('');
  const [keyWord, setKeyWord] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
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

  // for Stage 3 I will update it later
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
    setIsLoading(true);
    api
      .getNewsItems()
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
          <keyWordContext.Provider value={{ keyWord, setKeyWord }}>
            <div className="page">
              <div className="page__content">
                <Header onLoginClick={handleSignInModalClick} />
                <Navigation onLoginClick={handleSignInModalClick} />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Main
                        handleSearch={handleSearch}
                        searchError={searchError}
                        isLoading={isLoading}
                      />
                    }
                  />
                  // Route SavedNews for Stage 3 I will update it later
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
        </searchResultContext.Provider>
      </hasSearchedContext.Provider>
    </currentPageContext.Provider>
  );
}

export default App;
