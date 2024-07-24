import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SavedNewsCardList from '../SavedNewsCardList/SavedNewsCardList';
import Navigation from '../Navigation/Navigation';

const SavedNews = ({ handleRemoveArticle }) => {
  // TODO: implement handleRemoveArticle
  return (
    <>
      <Navigation />
      <section className="saved">
        <SavedNewsHeader />
        <SavedNewsCardList handleRemoveArticle={handleRemoveArticle} />
      </section>
    </>
  );
};

export default SavedNews;
