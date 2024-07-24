import './header.css';
import Navigation from '../Navigation/Navigation';

function Header({ onLoginClick, onLogout, onRegisterClick }) {
  return (
    <>
      <header className="header">
        <Navigation
          onLoginClick={onLoginClick}
          onLogout={onLogout}
          onRegisterClick={onRegisterClick}
        />
      </header>
    </>
  );
}

export default Header;
