import "./Navigation.css";
import headerWhiteLogo from "../../assets/NewsExplorer.WhiteLogoHeader.svg";
import headerBlackLogo from "../../assets/NewsExplorer.BlackLogoHeader.svg";
import logOutBlack from "../../assets/logout-Black.svg";
import logOutWhite from "../../assets/logout-White.svg";
import { NavLink } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useContext } from "react";
import { currentPageContext } from "../../contexts/currentPageContext";
import { mobileContext } from "../../contexts/mobileContext";
import { currentUserContext } from "../../contexts/currentUserContext";

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
    <nav className={`nav ${mobileMenuOpen ? "nav__menu-open" : ""} `}>
      <nav>
        {currentPage === "/" ? (
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
          activeModal !== "" ? "nav__menu-button_hidden" : ""
        } ${mobileMenuOpen === true ? "nav__menu-button_open" : ""}`}
        onClick={handleMobileMenu}
      />

      {mobileMenuOpen && (
        <MobileMenu onLoginClick={onLoginClick} onLogout={onLogout} />
      )}

      {isLoggedIn && currentPage === "/" ? (
        <nav className="nav__user-container">
          <NavLink to="/" className="nav__button-home">
            Home
          </NavLink>
          <NavLink to="/saved-news" className="nav__button-saved-articles">
            Saved Articles
          </NavLink>
          <button
            className={`nav__button-loggedin ${
              currentPage === "/" ? "nav__button-loggedin-white" : ""
            }`}
            onClick={onLogout}
          >
            <p className="nav__username">{currentUser.name}</p>
            <img
              src={currentPage === "/" ? logOutWhite : logOutBlack}
              alt="logout"
              className="nav__logout-icon"
            />
          </button>
        </nav>
      ) : isLoggedIn && currentPage === "/saved-news" ? (
        <nav className="nav__user-container">
          <button
            className={`nav__saved-news-menu-button ${
              activeModal !== "" ? "nav__saved-news-menu-button_hidden" : ""
            } ${
              mobileMenuOpen === true ? "nav__saved-news-menu-button_open" : ""
            } `}
            onClick={handleMobileMenu}
          />

          {mobileMenuOpen && (
            <MobileMenu onLoginClick={onLoginClick} onLogout={onLogout} />
          )}
          <NavLink to="/" className="nav__saved__news-button-home" type="text">
            Home
          </NavLink>
          <NavLink to="/saved-news" className="nav__button-saved-articles-user">
            Saved Articles
          </NavLink>
          <button
            className={`nav__button-loggedin ${currentPage === "/"}`}
            onClick={onLogout}
          >
            <p className="nav__username">Sammy{currentUser.name}</p>
            <img
              src={currentPage === "/" ? logOutWhite : logOutBlack}
              alt="logout"
              className="nav__logout-icon"
            />
          </button>
        </nav>
      ) : (
        <div
          className={`nav__buttons ${mobileMenuOpen ? "nav__menu-open" : ""}`}
        >
          <NavLink to="/" className="nav__button-home">
            Home
          </NavLink>
          <button className="nav__button-signin" onClick={onLoginClick}>
            Sign in
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
