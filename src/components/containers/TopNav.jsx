import { Link } from "react-router-dom";

function TopNav() {
  return (
    <nav id="top-nav" className="layout-container">
      <div>
        <Link to="/">
          <img
            src="/logo.png"
            id="top-nav-logo"
            alt="StackOverflow Simulator"
          />
        </Link>
      </div>
    </nav>
  );
}

export default TopNav;
