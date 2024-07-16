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

  const KeywordArray = userArticles.map((article) => article.Keyword);
  const capitalizedFirstLetter = KeywordArray.map((string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  });

  const getKeywordsString = (Keywords) => {
    if (Keywords.length === 0) {
      return '';
    }
    if (Keywords.length === 1) {
      const count = {};
      for (let Keyword of Keywords) {
        if (count[Keyword]) {
          count[Keyword]++;
        } else {
          count[Keyword] = 1;
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
  const KeywordString = getKeywordsString(KeywordArray);
  return (
    <nav className="saved__news">
      <h1 className="saved__news-container">
        <div className="saved__news-title">Saved Articles</div>
        <h2 className="saved__news-header">
          {currentUser.name}, you {userArticles.length} saved article{' '}
          {userArticles.length === 1 ? 's' : ''}{' '}
        </h2>
        <div className="saved__news-Keyword-container">
          <p className="saved__news-Keywords-title">By Keywords:</p>
          <p className="saved__news-Keywords">{KeywordString}</p>
        </div>
      </h1>
    </nav>
  );
}

export default SavedNewsHeader;
