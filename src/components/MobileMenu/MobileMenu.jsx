import './MobileMenu.css';
import logOutBlack from '../../assets/logout-Black.svg';
import logOutWhite from '../../assets/logout-White.svg';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { currentPageContext } from '../../contexts/currentPageContext';
import { currentUserContext } from '../../contexts/currentUserContext';

const MobileMenu = ({ onLoginClick, onLogout, onCloseMenu }) => {
  const { currentPage } = useContext(currentPageContext);
  const { isLoggedIn, currentUser } = useContext(currentUserContext);

  const handleCloseMenu = () => {
    onCloseMenu();
  };

  return isLoggedIn && currentPage === '/' ? (
    <div className="mobile">
      <nav className="mobile__content">
        <nav className="mobile__links">
          <NavLink
            to="/"
            className="mobile__link"
            onClick={handleCloseMenu}>
            Home
          </NavLink>
          <NavLink
            to="/saved-news"
            className="mobile__link"
            onClick={handleCloseMenu}>
            Saved articles
          </NavLink>
        </nav>
        <p className="mobile__user-loggedin-white">sammy{currentUser.name}</p>
        <button
          className="mobile__button-loggedin-white"
          onClick={onLogout}></button>
        <img
          src={logOutWhite}
          alt="logout"
          className="mobile__logout-white"
        />
      </nav>
    </div>
  ) : isLoggedIn && currentPage === '/saved-news' ? (
    <div className="mobile">
      <nav className="mobile__content-saved-news">
        <nav className="mobile__links">
          <NavLink
            to="/"
            className="mobile__link"
            onClick={handleCloseMenu}>
            Home
          </NavLink>
          <NavLink
            to="/saved-news"
            className="mobile__link"
            onClick={handleCloseMenu}>
            Saved articles
          </NavLink>
        </nav>
        <p className="mobile__user-loggedin-white">sammy{currentUser.name}</p>
        <button
          className="mobile__button-loggedin-white"
          onClick={onLogout}></button>
        <img
          src={logOutWhite}
          alt="logout"
          className="mobile__logout-white"
        />
      </nav>
    </div>
  ) : (
    <div className="mobile">
      <nav className="mobile__content">
        <nav className="mobile__links">
          <NavLink
            to="/"
            className="mobile__link"
            onClick={handleCloseMenu}>
            Home
          </NavLink>
          <NavLink
            to="/saved-news"
            className="mobile__link"
            onClick={handleCloseMenu}>
            Saved articles
          </NavLink>
          <button
            className="mobile__button"
            onClick={onLoginClick}>
            Sign in
          </button>
        </nav>
      </nav>
    </div>
  );
};

export default MobileMenu;
