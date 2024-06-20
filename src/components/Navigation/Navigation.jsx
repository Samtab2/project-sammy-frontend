import "./Navigation.css";
import { NavLink } from "react-router-dom";
function Navigation ({ onLoginClick }) {
  
  return (
    <nav className="nav">
      <div className="nav__logo">NewsExplorer</div>
      <div className="nav__user-container">
        <NavLink className="nav__button-home" to="/" >Home</NavLink>
        <button
          className="nav__button-signin"
          type="text"
          onClick={onLoginClick}
          >
          Sign in {" "}
        </button>
      </div>
    </nav>
  );
};


export default Navigation;