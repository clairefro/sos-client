import { Link, useLocation } from "react-router-dom";
import SVG from "react-inlinesvg";

function LeftNavLink({ to, text, svgIconPath }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Link
      to={to}
      className={`left-nav-link ${currentPath === to ? "selected" : ""}`}
    >
      <SVG src={svgIconPath} height="auto" title={text}></SVG>
      {text}
    </Link>
  );
}

function LeftNav() {
  return (
    <div id="left-nav-container" className="layout-container">
      <div id="left-nav">
        <div id="left-nav-links-container">
          <LeftNavLink to="/" text="Home" svgIconPath="/icons/home.svg" />
          <LeftNavLink to="/about" text="About" svgIconPath="/icons/help.svg" />
        </div>
      </div>
    </div>
  );
}

export default LeftNav;
