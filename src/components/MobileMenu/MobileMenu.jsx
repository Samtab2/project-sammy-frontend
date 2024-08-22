import "./MobileMenu.css";
import logOutWhite from "../../assets/logout-White.svg";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { currentUserContext } from "../../contexts/currentUserContext";

const MobileMenu = ({ onLoginClick, onLogout, onCloseMenu }) => {
  const { isLoggedIn, currentUser } = useContext(currentUserContext);

  const handleCloseMenu = () => {
    onCloseMenu();
  };

  return (
    <nav className="mobile">
      <nav className="mobile__content">
        <nav className="mobile__links">
          <nav
            className="mobile__link-NewsExplorer"
            onClick={handleCloseMenu}
          >
            NewsExplorer
          </nav>
          <button
            className="mobile__link-NewsExplore-close"
            onClick={handleCloseMenu}
          ></button>

          <NavLink to="/" className="mobile__link" onClick={handleCloseMenu}>
            Home
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/saved-news"
              className="mobile__link"
              onClick={handleCloseMenu}
            >
              Saved articles
            </NavLink>
          )}
          {isLoggedIn ? (
            <button className="mobile__button-loggedin" onClick={onLogout}>
              <p className="mobile__user-loggedin">{currentUser.name}</p>
              <img
                src={logOutWhite}
                alt="logout"
                className="mobile__logout-icon"
              />
            </button>
          ) : (
            <button className="mobile__button" onClick={onLoginClick}>
              Sign in
            </button>
          )}
        </nav>
      </nav>
    </nav>
  );
};

export default MobileMenu;
