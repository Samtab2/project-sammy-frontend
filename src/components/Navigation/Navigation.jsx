import './Navigation.css';
import headerBlackLogo from '../../assets/NewsExplorer.BlackLogoHeader.svg';
import { NavLink } from 'react-router-dom';

function Navigation({ onLoginClick }) {
  return (
    <nav className="nav">
      <NavLink to="/">
        <img
          src={headerBlackLogo}
          alt="NewsExplorer  Black Logo"
          className="nav__logo"
        />
      </NavLink>
      <div className="nav__user-container">
        <NavLink
          to="/"
          type="text"
          className="nav__button-home active">
          Home
        </NavLink>
       
       

        <button
          className="nav__button-signin"
          type="text"
          onClick={onLoginClick}>
          Sign in{' '}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
