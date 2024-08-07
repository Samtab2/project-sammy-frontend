import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";
import { useState, useContext } from "react";
import { searchResultContext } from "../../contexts/searchResultContext";
import { hasSearchedContext } from "../../contexts/hasSearchedContext";
const NewsCardList = ({
  handleSaveArticle,
  handleRemoveArticle,
  onLoginClick,
}) => {
  const [cardsDisplayed, setCardsDisplayed] = useState(3);

  const { searchResult } = useContext(searchResultContext);

  const { hasSearched } = useContext(hasSearchedContext);

  const increaseVisibleCards = () => {
    setCardsDisplayed(cardsDisplayed + 3);
  };

  console.log("search Results context", searchResult);
  console.log("has Searched context", hasSearched);

  return (
    <section className="news__card-section">
      {hasSearched ? (
        <>
          <h2 className="news__cards-header">Search results</h2>
          <ul className="news__cards-container">
            {searchResult.slice(0, cardsDisplayed).map((result) => (
              <article key={result.url} className="news__card-list">
                <NewsCard
                  newsData={result}
                  handleSaveArticle={handleSaveArticle}
                  handleRemoveArticle={handleRemoveArticle}
                  onClick={onLoginClick}
                />
              </article>
            ))}
          </ul>
          <button
            className={`news__cards-button ${
              cardsDisplayed >= searchResult.length
            }`}
            onClick={increaseVisibleCards}
          >
            Show more
          </button>
        </>
      ) : (
        ""
      )}
    </section>
  );
};

export default NewsCardList;
