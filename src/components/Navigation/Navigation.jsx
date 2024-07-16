import './Navigation.css';
import headerBlackLogo from '../../assets/NewsExplorer.BlackLogoHeader.svg';
import { NavLink } from 'react-router-dom';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useContext } from 'react';
import { currentPageContext } from '../../contexts/currentPageContext';
import { mobileContext } from '../../contexts/mobileContext';

function Navigation({ onLoginClick, onRegisterClick }) {
  const { currentPage, activeModal } = useContext(currentPageContext);
  const { mobileMenuOpen, openMobileMenu, closeMobileMenu } =
    useContext(mobileContext);

  const handleMobileMenu = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  return (
    <header className={`nav ${mobileMenuOpen ? 'nav__menu-open' : ''}`}>
      <nav>
        <NavLink to="/">
          <img
            src={headerBlackLogo}
            alt="NewsExplorer Black Logo"
            className="nav__logo"
          />
        </NavLink>
      </nav>
      <button
        className={`nav__menu-button ${
          activeModal !== '' ? 'nav__menu-button_hidden' : ''
        } ${mobileMenuOpen === true ? 'nav__menu-button_open' : ''}`}
        onClick={handleMobileMenu}>
      </button>

      {mobileMenuOpen && (
        <MobileMenu
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
        />
      )}

      <nav className="nav__user-container">
        {currentPage === '/' ? (
          <>
            <NavLink
              to="/"
              className="nav__button-home active">
              Home
            </NavLink>
            <button
              className="nav__button-signin"
              onClick={onLoginClick}>
              Sign in
            </button>
          </>
        ) : (
          <header>{/* Add your saved news header content here */}</header>
        )}
      </nav>
    </header>
  );
}

export default Navigation;
