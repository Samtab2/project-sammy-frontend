import './MobileMenu.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { currentPageContext } from '../../contexts/currentPageContext';
// import { currentUserContext } from '../../contexts/currentUserContext';

const MobileMenu = ({ onLoginClick }) => {
  const { currentPage } = useContext(currentPageContext);
  //const { currentUser } = useContext(currentUserContext);

  return currentPage === '/' ? (
    <div className="mobile">
      <div className="mobile__content">
        <nav className="mobile__links">
          <NavLink
            to="/"
            className="mobile__link">
            Home
          </NavLink>
        </nav>
      </div>
    </div>
  ) : (
    <div className="mobile">
      <div className="mobile__content">
        <nav className="mobile__links">
          <NavLink
            to="/"
            className="mobile__link"
            activeClassName="mobile__link_active">
            Home
          </NavLink>
        </nav>
        <button
          className="mobile__button"
          onClick={onLoginClick}></button>
      </div>
    </div>
  );
};

export default MobileMenu;
