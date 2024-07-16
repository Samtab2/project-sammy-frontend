// MobileMenu.js
import './MobileMenu.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { currentPageContext } from '../../contexts/currentPageContext';

const MobileMenu = ({ onLoginClick }) => {
  const { currentPage } = useContext(currentPageContext);

  return (
    <div className="mobile">
      <nav className="mobile__content">
        <nav className="mobile__links">
          <NavLink to="/" className="mobile__link">
            Home
          </NavLink>
          {currentPage === '/' && (
            <button className="mobile__button" onClick={onLoginClick}>
              Sign in
            </button>
          )}
        </nav>
      </nav>
    </div>
  );
};

export default MobileMenu;