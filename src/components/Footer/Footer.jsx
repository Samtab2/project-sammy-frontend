import "./Footer.css";
import githubLogo from "../../assets/githubLogo.svg";
import facebookLogo from "../../assets/facebookLogo.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {new Date().getFullYear()} Supersite, Powered by News API
      </p>
      <ul className="footer__content">
        <ul className="footer__links">
          <div className="footer__links-wrapper">
          <li className="footer__link-home">Home</li>
          <li className="footer__link-triplenTen">TriplenTen</li>
          </div>
          <ul className="footer__social-links">
          <li className="footer__link-github">
            <img
              src={githubLogo}
              alt="GitHub Logo"
              className="footer__link-icon"
            />
          </li>
          <li className="footer__link-facebook">
            <img
              src={facebookLogo}
              alt="Facebook Logo"
              className="footer__link-icon"
            />
          </li>
          </ul>
        </ul>
      </ul>
    </footer>
  );
}

export default Footer;
