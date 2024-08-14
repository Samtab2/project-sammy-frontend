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
            <li className="footer__link-triplenTen">
              <a href="https://tripleten.com/" target="_blank" rel="noreferrer">
                TriplenTen
              </a>
            </li>
          </div>
          <ul className="footer__social-links">
            <li className="footer__link-github">
              <a
                href="https://github.com/Samtab2"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={githubLogo}
                  alt="GitHub Logo"
                  className="footer__link-icon"
                />
              </a>
            </li>
            <li className="footer__link-facebook">
              <a
                href="https://www.facebook.com/sammy.tabally.7/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={facebookLogo}
                  alt="Facebook Logo"
                  className="footer__link-icon"
                />
              </a>
            </li>
          </ul>
        </ul>
      </ul>
    </footer>
  );
}

export default Footer;
