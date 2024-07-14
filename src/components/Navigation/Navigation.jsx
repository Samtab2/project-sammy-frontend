import './Navigation.css';
import headerBlackLogo from '../../assets/NewsExplorer.BlackLogoHeader.svg';
import { NavLink } from 'react-router-dom';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useContext } from 'react';
import { currentPageContext } from '../../contexts/currentPageContext';
// import { currentUserContext } from '../../contexts/currentUserContext';
import { mobileContext } from '../../contexts/mobileContext';

function Navigation({ onLoginClick, onRegisterClick }) {
  const { currentPage } = useContext(currentPageContext);
  // const { currentUser } = useContext(currentUserContext);
  const { mobileMenuOpen, openMobileMenu, closeMobileMenu } =
    useContext(mobileContext);

  const handleMobileMenu = () => {
    if (mobileMenuOpen === false) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  return (
    <nav className={`nav ${mobileMenuOpen === true ? 'nav__menu-open' : ''}`}>
      <NavLink to="/">
        <img
          src={headerBlackLogo}
          alt="NewsExplorer  Black Logo"
          className="nav__logo"
        />
      </NavLink>
      <button
        className={`nav__menu-button ${
          mobileMenuOpen === true ? 'nav__menu-button_open' : ''
        }`}
        onClick={handleMobileMenu}
      />

      {mobileMenuOpen && (
        <MobileMenu
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
          onClose={handleMobileMenu}
        />
      )}
      <div className="nav__user-container">
        {currentPage === '/' ? (
          <>
            <NavLink
              to="/"
              type="text"
              className="nav__button-home active">
              Home
            </NavLink>
            <NavLink
              to="/saved-news"
              className="nav__button-saved-articles">
              Saved Articles
            </NavLink>
            <button
              className="nav__button-signin"
              type="text"
              onClick={onLoginClick}>
              Sign in{' '}
            </button>
          </>
        ) : (
          <header>{/* Add your saved news header content here */}</header>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
