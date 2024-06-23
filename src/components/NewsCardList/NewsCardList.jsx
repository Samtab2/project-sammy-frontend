import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";
import { useState, useContext } from "react";
import { searchResultContext } from "../../contexts/searchResultContext";
import { hasSearchedContext } from "../../contexts/hasSearchedContext";
import { currentPageContext } from "../../contexts/currentPageContext";
import { keywordContext } from "../../contexts/keywordContext";
const NewsCardList = ({ }) => {
    const [cardsDisplayed, setCardsDisplayed] = useState(3);

    const { searchResults } = useContext(searchResultContext);

    const { hasSearched } = useContext(hasSearchedContext);

    const { currentPage } = useContext(currentPageContext);

    const { keyword } = useContext(keywordContext);


    const increaseVisibleCards = () => {
        setCardsDisplayed(cardsDisplayed + 3);
    }

   console.log(searchResults)

    return (
        <section className="news__card-section">
                 {hasSearched ? (
        <>
          <h2 className="news__cards-title">Search results</h2>
          <div className="news__cards-container">
            {searchResults.slice(0, cardsDisplayed).map((result) => {
              return (
                <NewsCard
                  newsData={result}
                  key={result.url}
                />
              );
            })}
          </div>
          <button
            className={`newscards__button ${
              cardsDisplayed >= searchResults.length
                ? "newscards__button_hidden"
                : ""
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