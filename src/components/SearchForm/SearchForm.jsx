import './SearchForm.css';
import { useContext } from 'react';
import { keywordContext } from '../../contexts/keyWordContext';

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
    <form
      onSubmit={handleSubmit}
      className="search__form">
      <section className="search__form-container">
        <h1 className="search__form-header">What's going on in the world?</h1>
        <p className="search__form-subHeader">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <header className="search__form-bar">
          <input
            className="search__form-input"
            type="text"
            id="search"
            value={keyword}
            placeholder="Enter Topic"
            onChange={handleKeyWord}
          />
        </header>
        <button
          type="submit"
          className="search__form-button">
          Search
        </button>
      </section>
    </form>
  );
}

export default SearchForm;
