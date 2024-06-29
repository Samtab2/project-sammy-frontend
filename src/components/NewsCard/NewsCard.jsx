import "./NewsCard.css";
import { useLocation } from "react-router-dom";
import { keyWordContext } from "../../contexts/keyWordContext";
import { currentPageContext } from "../../contexts/currentPageContext";
import { useContext, useEffect } from "react";

function NewsCard({ newsData }) {
  console.log("Rendering NewsCard", newsData);

  let formattedDate;

  if (newsData.publishedAt) {
    formattedDate = new Date(newsData.publishedAt).toLocaleDateString(
      "default",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  } else {
    formattedDate = "";
  }

  const location = useLocation();


  const { setCurrentPage } = useContext(currentPageContext);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname, setCurrentPage]);

  return (
    <div className="news-card">
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
