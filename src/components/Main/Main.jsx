import "./Main.css";
import About from "../About/About";
import Header from "../header/header";
import NewsCardList from "../NewsCardList/NewsCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";
import { useContext } from "react";
import { searchResultContext } from "../../contexts/searchResultContext";
import { hasSearchedContext } from "../../contexts/hasSearchedContext";

function Main({
  searchError,
  handleSearch,
  isLoading,
  handleRemoveArticle,
  handleSaveArticle,
  onLoginClick,
  onLogout,
  onRegisterClick,
}) {
  const { searchResult } = useContext(searchResultContext);
  const { hasSearched } = useContext(hasSearchedContext);
  // TODO: implement onFoo handlers for header
  return (
    <>
      <Header
        onLoginClick={onLoginClick}
        onLogout={onLogout}
        onRegisterClick={onRegisterClick}
      />
      <main className="main">
        <SearchForm handleSearch={handleSearch} />
        <div>
          {hasSearched && searchResult.length > 0 ? (
            <NewsCardList
              onLoginClick={onLoginClick}
              handleSaveArticle={handleSaveArticle}
              handleRemoveArticle={handleRemoveArticle}
            />
          ) : hasSearched && searchResult.length === 0 ? (
            <NotFound />
          ) : isLoading ? (
            <Preloader />
          ) : searchError === true ? (
            <p>
              Sorry, something went wrong during the request. There may be a
              connection issue or the server may be down. Please try again
              later.
            </p>
          ) : (
            ""
          )}
        </div>
        <About />
      </main>
    </>
  );
}

export default Main;
