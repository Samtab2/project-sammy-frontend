import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({ searchError }) {
  return (
    <main className="main">
      <About />
      <div className="search__results">
        {searchError && (
          <p className="search__error">Error fetching search results</p>
        )}
        <NewsCardList />
      </div>
    </main>
  );
}

export default Main;
