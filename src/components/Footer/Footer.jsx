import "./Footer.css";
import githubLogo from "../../assets/githubLogo.svg";
import facebookLogo from "../../assets/facebookLogo.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Supersite, Powered by News API
      </p>
      <div className="footer__links-wrapper">
        <div className="footer__links">
          <a href="#" className="footer__link-home">
            Home
          </a>
          <a href="https://tripleten.com/" className="footer__link-triplenTen">
            TriplenTen
          </a>
        </div>
        <div className="footer__social-links">
          <a href="https://github.com/Samtab2" className="footer__link-github">
            <img src={githubLogo} alt="GitHub Logo" className="footer__link-icon" />
          </a>
          <a
            href="https://www.facebook.com/sammy.tabally.7/"
            className="footer__link-facebook"
          >
            <img
              src={facebookLogo}
              alt="Facebook Logo"
              className="footer__link-icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
