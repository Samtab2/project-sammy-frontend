import './NewsCard.css';
import { useLocation } from 'react-router-dom';
import { keyWordContext } from '../../contexts/keyWordContext';
import { savedArticlesContext } from '../../contexts/savedArticlesContext';
import { currentPageContext } from '../../contexts/currentPageContext';
import { useContext, useEffect, useState } from 'react';

function NewsCard({ newsData, handleSaveArticle, handleRemoveArticle }) {
  console.log('Rendering NewsCard', newsData);

  let formattedDate;

  if (newsData.publishedAt) {
    formattedDate = new Date(newsData.publishedAt).toLocaleDateString(
      'default',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
    );
  } else {
    formattedDate = '';
  }

  const location = useLocation();

  const { currentPage, setCurrentPage } = useContext(currentPageContext);
  const { savedArticles } = useContext(savedArticlesContext);
  const { keyword } = useContext(keyWordContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleBookmarkClick = () => {
    handleSaveArticle({ newsData, keyword });
  };

  const handleRemoveClick = () => {
    handleRemoveArticle({ newsData });
  };

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname, setCurrentPage]);

  return (
    <div className="news-card">
      {currentPage === '/saved-news' && (
        <>
          <div className="card__keyword">{newsData.keyword}</div>

          <div
            className={`card__popup-text ${
              isHovered ? '' : 'card__popup-text_hidden'
            }`}>
            Remove from saved
          </div>
          <button
            className="card__button-delete"
            onClick={handleRemoveClick}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          />
        </>
      )}

      {currentPage === '/' ? (
        <button
          className={`card__button-bookmark ${
            savedArticles.some(
              (savedArticles) => savedArticles.link === newsData.url
            )
              ? 'card__button-bookmark_marked'
              : ''
          }`}
          onClick={handleBookmarkClick}
        />
      ) : null}

      <a
        className="news-card__link"
        href={newsData.url}
        target="_blank"
        rel="noreferrer">
        {newsData.urlToImage && (
          <img
            className="news-card__image"
            src={newsData.urlToImage}
            alt={newsData.url}
          />
        )}
        <div className="news-card__text">
          <p className="news-card__date">{formattedDate}</p>
          <h3 className="news-card__title">{newsData.title}</h3>
          <p className="news-card__description">
            {newsData.text || newsData.description}
          </p>
          {newsData.source && (
            <p className="news-card__source">
              {newsData.source.name || newsData.source}
            </p>
          )}
        </div>
      </a>
    </div>
  );
}

export default NewsCard;
