import "./SavedNewsHeader.css";
import { useContext } from "react";
import { currentUserContext } from "../../contexts/currentUserContext";
import { savedArticlesContext } from "../../contexts/savedArticlesContext";

function SavedNewsHeader() {
  const { currentUser } = useContext(currentUserContext);
  const { savedArticles } = useContext(savedArticlesContext);

  const userArticles = savedArticles.filter(
    (article) => article.owner === currentUser._id
  );
  const keywordArray = userArticles.map((article) => article?.keyword);
  const capitalizedFirstLetter = keywordArray.map((string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  });

  const getKeywordString = (keyWord) => {
    const uniqueKeywords = [...new Set(keyWord)];
    if (uniqueKeywords.length <= 2) {
      return uniqueKeywords.join(", ");
    } else {
      return `${uniqueKeywords[0]}, ${uniqueKeywords[1]}, and ${uniqueKeywords.length - 2} other`;
    }
  };

  return (
    <nav className="saved__news">
      <h1 className="saved__news-title">Saved Articles</h1>
      <h2 className="saved__news-header">
        {currentUser.name}, you have {userArticles.length} saved articles
        {userArticles.length === 1 ? "s" : ""}
      </h2>
      <div className="saved__news-Keyword-container">
        <p className="saved__news-Keywords-title">By Keywords:</p>
        <p className="saved__news-Keywords">{getKeywordString(capitalizedFirstLetter)}</p>
      </div>
    </nav>
  );
}

export default SavedNewsHeader;
