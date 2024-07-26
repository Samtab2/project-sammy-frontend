import './Navigation.css';
import headerWhiteLogo from '../../assets/NewsExplorer.WhiteLogoHeader.svg';
import headerBlackLogo from '../../assets/NewsExplorer.BlackLogoHeader.svg';
import logOutBlack from '../../assets/logout-Black.svg';
import logOutWhite from '../../assets/logout-White.svg';
import { NavLink } from 'react-router-dom';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useContext } from 'react';
import { currentPageContext } from '../../contexts/currentPageContext';
import { mobileContext } from '../../contexts/mobileContext';
import { currentUserContext } from '../../contexts/currentUserContext';

function Navigation({ onLoginClick, onLogout }) {
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

  // TODO: style buttons in /saved-news Navigation differently
  // use modifiers
  return (
    <nav className={`nav ${mobileMenuOpen ? 'nav__menu-open' : ''}`}>
      <nav>
        {currentPage === '/' ? (
          <NavLink to="/">
            <img
              src={headerWhiteLogo}
              alt="NewsExplorer White Logo"
              className="nav__logo-white"
            />
          </NavLink>
        ) : (
          <NavLink to="/">
            <img
              src={headerBlackLogo}
              alt="NewsExplorer Black Logo"
              className="nav__logo-black"
            />
          </NavLink>
        )}
      </nav>
      <button
        className={`nav__menu-button ${
          activeModal !== '' ? 'nav__menu-button_hidden' : ''
        } ${mobileMenuOpen === true ? 'nav__menu-button_open' : ''}`}
        onClick={handleMobileMenu}
      />

      {mobileMenuOpen && (
        <MobileMenu
          onLoginClick={onLoginClick}
          onLogout={onLogout}
        />
      )}

      {isLoggedIn && currentPage === '/' ? (
        <nav className="nav__user-container">
          <NavLink
            to="/"
            className="nav__button-home">
            Home
          </NavLink>
          <NavLink
            to="/saved-news"
            className="nav__button-saved-articles">
            Saved Articles
          </NavLink>

          {/* TODO: wrap logout button and username in a div and style the div like a lozenge */}
          <p className="nav__username-white">sammy{currentUser.name}</p>

          <button
            className="nav__button-logout-white"
            type="button"
            onClick={onLogout}
            button
          />

          <img
            src={logOutWhite}
            onClick={onLogout}
            alt="logout"
            className="nav__logout"
          />
        </nav>
      ) : isLoggedIn && currentPage === '/saved-news' ? (
        <nav
          className={`nav nav__menu-saved-news_open ${
            mobileMenuOpen ? '' : ''
              }`}>
            <button className='nav__menu-button-saved-news_hidden' onClick={handleMobileMenu}></button>
          <NavLink
            to="/"
            className="nav__saved__news-button-home"
            type="text">
            Home
          </NavLink>
          <NavLink
            to="/saved-news"
            className="nav__button-saved-articles-user">
            Saved Articles
          </NavLink>
          <p className="nav__username-black">sammy{currentUser.name}</p>
          <button
            className="nav__button-logout-black"
            type="button"
            onClick={onLogout}
            button
          />
          <img
            src={logOutBlack}
            alt="logout"
            className="nav__logout-black"
          />
        </nav>
      ) : (
        <div
          className={`nav__buttons ${mobileMenuOpen ? 'nav__menu-open' : ''}`}>
          <NavLink
            to="/"
            className="nav__button-home">
            Home
          </NavLink>
          <button
            className="nav__button-signin"
            onClick={onLoginClick}>
            Sign in
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
