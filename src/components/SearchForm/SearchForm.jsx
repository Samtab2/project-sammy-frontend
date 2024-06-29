import "./SearchForm.css";
import { useContext } from "react";
import { keyWordContext } from "../../contexts/keyWordContext";

function SearchForm({ handleSearch }) {
  const { keyWord, setKeyWord } = useContext(keyWordContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(keyWord);
  };

  const handleKeyWord = (event) => {
    setKeyWord(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="search__form">
      <section className="search__form-container">
        <h1 className="search__form-header">What's going on in the world?</h1>
        <p className="search__form-subHeader">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <div className="search__form-bar">
          <input
            className="search__form-input"
            type="text"
            id="search"
            value={keyWord}
            placeholder="Enter Topic"
            onChange={handleKeyWord}
          />
        </div>
        <button type="submit" className="search__form-button">
          Search
        </button>
      </section>
    </form>
  );
}

export default SearchForm;
