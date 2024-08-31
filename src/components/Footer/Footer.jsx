import "./Footer.css";
import githubLogo from "../../assets/githubLogo.svg";
import facebookLogo from "../../assets/facebookLogo.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Supersite, Powered by News API
      </p>
      <nav className="footer__links-wrapper">
        <ul className="footer__links">
          <li>
            <a href="#" className="footer__link-home">
              Home
            </a>
          </li>
          <li>
            <a
              href="https://tripleten.com/"
              className="footer__link-triplenTen"
            >
              TriplenTen
            </a>
          </li>
        </ul>
        <ul className="footer__social-links">
          <li>
            <a
              href="https://github.com/Samtab2"
              className="footer__link-github"
            >
              <img
                src={githubLogo}
                alt="GitHub Logo"
                className="footer__link-icon"
              />
            </a>
          </li>
          <li>
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
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
