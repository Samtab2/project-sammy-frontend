import './SavedNewsCardList.css';
import { useContext } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { savedArticlesContext } from '../../contexts/savedArticlesContext';
import { currentUserContext } from '../../contexts/currentUserContext';

function SavedNewsCardList({ handleRemoveArticle, handleSaveArticle }) {
  const { savedArticles } = useContext(savedArticlesContext);
  const { currentUser } = useContext(currentUserContext);
  return (
    <section className="saved__news-card">
      <div className="saved__news-cards-container">
        {savedArticles
          .filter((article) => article.owner === currentUser._id)
          .map((article) => (
            <NewsCard
              newsData={article}
              key={article._id}
              handleRemoveArticle={handleRemoveArticle}
              handleSaveArticle={handleSaveArticle}
            />
          ))}
      </div>
    </section>
  );
}

export default SavedNewsCardList;
