import './Navigation.css';
import headerWhiteLogo from '../../assets/NewsExplorer.WhiteLogoHeader.svg';
import headerBlackLogo from '../../assets/NewsExplorer.BlackLogoHeader.svg';
import logoutBlack from '../../assets/logout-Black.svg';
import logoutWhite from '../../assets/logout-White.svg';
import { NavLink } from 'react-router-dom';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useContext } from 'react';
import { currentPageContext } from '../../contexts/currentPageContext';
import { mobileContext } from '../../contexts/mobileContext';
import { currentUserContext } from '../../contexts/currentUserContext';

function Navigation({ onLoginClick, onRegisterClick, onLogout }) {
  const { currentPage, activeModal } = useContext(currentPageContext);
  const { currentUser, isLoggedIn } = useContext(currentUserContext);
  const { mobileMenuOpen, openMobileMenu, closeMobileMenu } =
    useContext(mobileContext);

  const handleMobileMenu = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  return isLoggedIn && currentPage === '/' ? (
    <header className={`nav ${mobileMenuOpen ? 'nav__menu-open' : ''}`}>
      <nav>
        <NavLink to="/">
          <img
            src={headerWhiteLogo}
            alt="NewsExplorer White Logo"
            className="nav__logo"
          />
        </NavLink>
      </nav>
      <button
        className={`nav__menu-button ${
          activeModal !== '' ? 'nav__menu-button_hidden' : ''
        } ${mobileMenuOpen === true ? 'nav__menu-button_open' : ''}`}
        onClick={handleMobileMenu}></button>

      {mobileMenuOpen && (
        <MobileMenu
          onLoginClick={onLoginClick}
          onLogout={onLogout}
        />
      )}

      <nav className="nav__user-container">
        <NavLink
          to="/"
          className="nav__button-home"
          activeClassName="nav__button-home.active">
          Home
        </NavLink>
        <NavLink
          to="/saved-news"
          className="nav__button-saved-articles">
          Saved Articles
        </NavLink>

        <button
          className="nav__saved__news-username"
          type="text"
          onClick={onLogout}></button>
        <p className="nav__username">{currentUser.name}</p>
        <img
          src={logoutWhite}
          alt="Logout White"
          className="nav__logout"
        />
      </nav>
    </header>
  ) : isLoggedIn && currentPage === 'saved news' ? (
    <header
      className={`nav nav_page_saved-news ${
        mobileMenuOpen ? 'nav__saved-news-open' : ''
      }`}>
      <nav>
        <NavLink to="/">
          <img
            src={headerBlackLogo}
            alt="NewsExplorer Black Logo"
            className="nav__logo"
          />
        </NavLink>
        <NavLink
          to="/"
          className="nav__saved__news-button-home"
          type="text">
          Home
        </NavLink>
      </nav>
      <button
        className="nav__saved__news-menu-button"
        onClick={handleMobileMenu}
      />

      {mobileMenuOpen && (
        <MobileMenu
          onLoginClick={onLoginClick}
          onLogout={onLogout}
        />
      )}

      <nav className="nav__user-container">
        <NavLink
          to="/"
          className="nav__saved__news-button-home"
          type="text">
          Home
        </NavLink>
        <NavLink
          to="/saved-news"
          className="nav__button-saved-articles">
          Saved Articles
        </NavLink>
        <button
          className="nav__saved__news-username"
          type="text"
          onClick={onLogout}></button>
        <p className="nav__username">{currentUser.name}</p>
        <img
          src={logoutBlack}
          alt="Logout Black"
          className="nav__logout"
        />
      </nav>
    </header>
  ) : (
    <nav className={`nav ${mobileMenuOpen ? 'nav__menu-open' : ''}`}>
      <button
        className={`nav__menu-button ${
          activeModal !== '' ? 'nav__menu-button_hidden' : ''
        } ${mobileMenuOpen === true ? 'nav__menu-button_open' : ''}`}
        onClick={handleMobileMenu}></button>

      <NavLink
        to="/"
        className="nav__button-home"
        activeClassName="nav__button-home.active">
        Home
      </NavLink>
      <button
        className="nav__button-signin"
        onClick={onLoginClick}>
        Sign in
      </button>
    </nav>
  );
}

export default Navigation;
