import "./NewsCard.css";
import { useLocation } from "react-router-dom";
import { keyWordContext } from "../../contexts/keywordContext";
import { currentPageContext } from "../../contexts/currentPageContext";
import { useContext, useEffect } from "react";



function NewsCard ({ newsData }) {
    const formattedDate = new Date(newsData.publishedAt || newsData.date).toLocaleDateString("default", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const { keyword } = useContext(keyWordContext);

    const { currentPage, setCurrentPage } = useContext(currentPageContext);

    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location.pathname, setCurrentPage]);

    return (
        <div className="news-card">
            <a className="news-card__link" href={newsData.url} target="_blank" rel="noreferrer">
                <img
                    className="news-card__image"
                    src={newsData.image}
                    alt={newsData.title}
                />
                <div className="news-card__description">
                    <h3 className="news-card__title">{newsData.title}</h3>
                    <p className="news-card__date">{formattedDate}</p> 
                    <p className="news-card__keyword">{keyword}</p> 
                </div>  
            </a>
        </div>
    );
}

export default NewsCard;
