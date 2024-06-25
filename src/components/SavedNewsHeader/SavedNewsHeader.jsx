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

  const keywordArray = userArticles.map((article) => article.keyword);
  const capitalizedFirstLetter = keywordArray.map((string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  });

  const getKeywordsString = (keywords) => {
    if (keywords.length === 0) {
      return "";
    }
    if (keywords.length === 1) {
      const count = {};
      for (let keyword of keywords) {
        if (count[keyword]) {
          count[keyword]++;
        } else {
          count[keyword] = 1;
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
          .map((keyword) => capitalizedFirstLetter(keyword[0]))
          .join(", ");

        const moreCount = sortedKeywordsArrary.length - 2;
        return `${firstKeywords} and ${moreCount} more`;
      }
    } else {
      return null;
    }
  };
  const keywordString = getKeywordsString(keywordArray);
  return (
    <div className="saved__news">
      <div className="saved__news-container">
        <div className="saved__news-title">Saved Articles</div>
        <h1 className="saved__news-header">
          {currentUser.name}, you {userArticles.length} saved article{" "}
          {userArticles.length === 1 ? "s" : ""}{" "}
        </h1>
        <div className="saved__news-keyword-container">
          <p className="saved__news-keywords-title">By keywords:</p>
          <p className="saved__news-keywords">{keywordString}</p>
        </div>
      </div>
    </div>
  );
}

export default SavedNewsHeader;
