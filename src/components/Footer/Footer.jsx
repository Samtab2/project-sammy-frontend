import "./Footer.css";
import githubLogo from "../../assets/githubLogo.svg";
import facebookLogo from "../../assets/facebookLogo.svg";

function Footer() {
  return (
    <footer class="footer">
      <p class="footer__copyright">
        &copy; {new Date().getFullYear()} Supersite, Powered by News API
      </p>
      <div class="footer__links-wrapper">
        <div class="footer__links">
          <a href="#" class="footer__link-home">
            Home
          </a>
          <a href="https://tripleten.com/" class="footer__link-triplenTen">
            TriplenTen
          </a>
        </div>
        <div class="footer__social-links">
          <a href="https://github.com/Samtab2" class="footer__link-github">
            <img src={githubLogo} alt="GitHub Logo" class="footer__link-icon" />
          </a>
          <a
            href="https://www.facebook.com/sammy.tabally.7/"
            class="footer__link-facebook"
          >
            <img
              src={facebookLogo}
              alt="Facebook Logo"
              class="footer__link-icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
