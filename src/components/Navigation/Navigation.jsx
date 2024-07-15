import './Navigation.css';
import headerBlackLogo from '../../assets/NewsExplorer.BlackLogoHeader.svg';
import { NavLink } from 'react-router-dom';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useContext } from 'react';
import { currentPageContext } from '../../contexts/currentPageContext';
import { mobileContext } from '../../contexts/mobileContext';

function Navigation({ onLoginClick, onRegisterClick }) {
  const { currentPage } = useContext(currentPageContext);
  const { mobileMenuOpen, openMobileMenu, closeMobileMenu } = useContext(mobileContext);

  const handleMobileMenu = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  return (
    <nav className={`nav ${mobileMenuOpen ? 'nav__menu-open' : ''}`}>
      <div>
      <NavLink to="/">
        <img src={headerBlackLogo} alt="NewsExplorer Black Logo" className="nav__logo" />
        </NavLink>
      </div>
      <button
        className={`nav__menu-button ${mobileMenuOpen ? 'nav__menu-button_open' : ''}`}
        onClick={handleMobileMenu}
      >
        <span className="nav__menu-icon"></span>
      </button>

      {mobileMenuOpen && <MobileMenu onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />}
      
      <div className="nav__user-container">
        {currentPage === '/' ? (
          <>
            <NavLink to="/" className="nav__button-home active">
              Home
            </NavLink>
            <button className="nav__button-signin" onClick={onLoginClick}>
              Sign in
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