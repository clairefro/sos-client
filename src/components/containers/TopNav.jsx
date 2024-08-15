import { Link } from "react-router-dom";

function TopNav() {
  return (
    <nav id="top-nav" className="layout-container">
      <Link to="/">
        <img src="/logo.png" id="top-nav-logo" alt="StackOverflow Simulator" />
      </Link>
      <div className="top-nav-items">
        <span className="top-nav-item">
          A functional parody of{" "}
          <a
            href="https://stackoverflow.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            the real StackOverflow
          </a>
        </span>
      </div>
    </nav>
  );
}

export default TopNav;
