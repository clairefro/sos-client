import { Link, useLocation } from "react-router-dom";
import SVG from "react-inlinesvg";

import { navlinks } from "./navlinks";

function LeftNavLink({ to, text, svgIconPath, isExternal, sectionBreak }) {
  const location = useLocation();
  const currentPath = location.pathname;

  let classNames = `left-nav-link ${currentPath === to ? "selected" : ""} ${
    isExternal ? "ext-link" : ""
  }`;

  // add extra margin for section break links
  if (sectionBreak) {
    classNames += " left-nav-link-with-section-break";
  }

  return (
    <Link
      to={to}
      className={classNames}
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
              sectionBreak={l.sectionBreak}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeftNav;
