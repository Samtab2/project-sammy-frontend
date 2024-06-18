import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">
          © {new Date().getFullYear()} Supersite, Powered by News API
        </p>
        <ul className="footer__links">
          <li className="footer__link-home">Home</li>
          <li className="footer__link-triplenTen">TriplenTen</li>
          <li className="footer__link-github">
            <img
              src="{gitHubLogo}"
              alt="GitHub Logo"
              className="footer__link-icon"
            />
          </li>
          <li className="footer__link-facebook">
            <img
              src="{facebookLogo}"
              alt="Facebook Logo"
              className="footer__link-icon"
            />
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
