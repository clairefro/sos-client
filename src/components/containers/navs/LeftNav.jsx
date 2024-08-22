import { Link, useLocation } from "react-router-dom";
import SVG from "react-inlinesvg";
import { navlinks } from "./navlinks";

function LeftNavLink({ to, text, svgIconPath, isExternal }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Link
      to={to}
      className={`left-nav-link ${currentPath === to ? "selected" : ""} ${
        isExternal ? "ext-link" : ""
      }`}
      target={isExternal ? "_blank" : undefined}
    >
      <SVG src={svgIconPath} title={text}></SVG>
      {text}
    </Link>
  );
}

function LeftNav() {
  return (
    <div id="left-nav-container" className="layout-container">
      <div id="left-nav">
        <div id="left-nav-links-container">
          {navlinks.map((l, i) => (
            <LeftNavLink
              key={i}
              to={l.href}
              text={l.title}
              svgIconPath={l.iconPath}
              isExternal={l.isExternal}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeftNav;
