import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { useState, useContext } from 'react';
import { searchResultContext } from '../../contexts/searchResultContext';
import { hasSearchedContext } from '../../contexts/hasSearchedContext';
const NewsCardList = ({ handleSaveArticle, handleRemoveArticle, onSignUp }) => {
  const [cardsDisplayed, setCardsDisplayed] = useState(3);

  const { searchResult } = useContext(searchResultContext);

  const { hasSearched } = useContext(hasSearchedContext);

  const increaseVisibleCards = () => {
    setCardsDisplayed(cardsDisplayed + 3);
  };

  console.log('search Results context', searchResult);
  console.log('has Searched context', hasSearched);

  return (
    <section className="news__card-section">
      {hasSearched ? (
        <>
          <h2 className="news__cards-header">Search results</h2>
          <div className="news__cards-container">
            {searchResult.slice(0, cardsDisplayed).map((result) => {
              return (
                <NewsCard
                  newsData={result}
                  key={result.url}
                  handleSaveArticle={handleSaveArticle}
                  handleRemoveArticle={handleRemoveArticle}
                  onSignUp={onSignUp}
                />
              );
            })}
          </div>
          <button
            className={`newscards__button ${
              cardsDisplayed >= searchResult.length
                ? 'newscards__button_hidden'
                : ''
            }`}
            onClick={increaseVisibleCards}>
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
