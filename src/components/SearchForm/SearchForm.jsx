import "./SearchForm.css";
import { useContext } from "react";
import { keywordContext } from "../../contexts/keyWordContext";

function SearchForm({ handleSearch }) {
  const { keyword, setkeyword } = useContext(keywordContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(keyword);
  };

  const handleKeyWord = (event) => {
    setkeyword(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <section className="search-form__container">
        <h1 className="search-form__header">What's going on in the world?</h1>
        <p className="search-form__subHeader">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <header className="search-form__bar">
          <input
            className="search-form__input"
            type="text"
            id="search"
            value={keyword}
            placeholder="Enter Topic"
            onChange={handleKeyWord}
          />
        </header>
        <button type="submit" className="search-form__button">
          Search
        </button>
      </section>
    </form>
  );
}

export default SearchForm;
