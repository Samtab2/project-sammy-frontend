import './SavedNewsHeader.css';
import { useContext } from 'react';
import { currentUserContext } from '../../contexts/currentUserContext';
import { savedArticlesContext } from '../../contexts/savedArticlesContext';
function SavedNewsHeader() {
  const { currentUser } = useContext(currentUserContext);
  const { savedArticles } = useContext(savedArticlesContext);

  const userArticles = savedArticles.filter(
    (article) => article.owner === currentUser._id
  );
  const keyWordArray = userArticles.map((article) => article.keyword);
  const capitalizedFirstLetter = keyWordArray.map((string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  });

  const getKeywordsString = (keyWords) => {
    if (keyWords.length === 0) {
      return '';
    }
    if (keyWords.length === 1) {
      const count = {};
      for (let keyWord of keyWords) {
        if (count[keyWord]) {
          count[keyWord]++;
        } else {
          count[keyWord] = 1;
        }
      }

      const sortedKeywordsArrary = [];
      for (const item in count) {
        sortedKeywordsArrary.push([item, count[item]]);
      }
      sortedKeywordsArrary.sort((a, b) => {
        return b[1] - a[1];
      });

      if (sortedKeywordsArrary.length === 1) {
        return `${capitalizedFirstLetter(sortedKeywordsArrary[0][0])}`;
      } else if (sortedKeywordsArrary.length === 2) {
        return `${capitalizedFirstLetter(
          sortedKeywordsArrary[0][0]
        )} and ${capitalizedFirstLetter(sortedKeywordsArrary[1][0])}`;
      } else {
        const firstKeywords = sortedKeywordsArrary
          .slice(0, 2)
          .map((Keyword) => capitalizedFirstLetter(Keyword[0]))
          .join(', ');

        const moreCount = sortedKeywordsArrary.length - 2;
        return `${firstKeywords} and ${moreCount} more`;
      }
    } else {
      return null;
    }
  };
  const keyWordString = getKeywordsString(keyWordArray);
  return (
    <nav className="saved__news">
      <h1 className="saved__news-title">Saved Articles</h1>
      <h2 className="saved__news-header">
        {currentUser.name}, you have {userArticles.length} saved articles
        {userArticles.length === 1 ? 's' : ''}
      </h2>
      <div className="saved__news-Keyword-container">
        <p className="saved__news-Keywords-title">By Keywords:</p>
        <p className="saved__news-Keywords">{keyWordArray}</p>
      </div>
    </nav>
  );
}

export default SavedNewsHeader;
