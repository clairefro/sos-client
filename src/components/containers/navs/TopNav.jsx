import { Link } from "react-router-dom";

import HamburgerNav from "./HamburgerNav";

function TopNav() {
  return (
    <nav id="top-nav" className="layout-container">
      <div id="top-nav-floating-content">
        <Link to="/">
          <img
            src="/logo.png"
            id="top-nav-logo"
            alt="StackOverflow Simulator"
          />
        </Link>
        <Link to="/">
          <img
            src="/sos-sm.png"
            id="top-nav-logo-sm"
            alt="StackOverflow Simulator"
            style={{ width: "32px" }}
          />
        </Link>
        <div className="top-nav-items">
          <div className="top-nav-items-left">
            <div className="top-nav-item">
              A functional parody of the{" "}
              <a
                href="https://stackoverflow.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                real StackOverflow
              </a>
            </div>
          </div>
          <HamburgerNav />
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
