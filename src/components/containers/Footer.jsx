import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div id="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/sos-sm.webp" />
        </div>
        <div className="footer-right">
          <nav className="footer-links-grid">
            <div className="footer-col">
              <h4>SOS</h4>
              <Link to="/">Ask a question</Link>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/clairefro/sos-client?tab=readme-ov-file#devlopment-and-running-locally"
              >
                Run app locally
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/clairefro/sos-client/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=%5BBUG%5D+%3CEnter+a+title%3E"
              >
                Report a bug
              </a>
            </div>
            <div className="footer-col">
              <h4>Info</h4>
              <Link to="/about">About</Link>
              <Link to="/privacy">Privacy Policy</Link>

              <Link to="/contact">Contact</Link>
            </div>
            <div className="footer-col">
              <h4>Contribute</h4>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/clairefro/sos-client"
              >
                Github
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://buymeacoffee.com/clairefro"
              >
                Support this site
              </a>
            </div>
          </nav>
          <p id="disclaimer">
            Not to be confused with the{" "}
            <a
              href="https://stackoverflow.com/"
              target="_blank"
              rel="noopener noreferrerer"
              style={{ color: "var(--color-orange-300)" }}
            >
              real Stack Overflow
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
