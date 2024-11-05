import { useState } from "react";
import { Link } from "react-router-dom";

import { navlinks } from "./navlinks";

const HamburgerNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="hamburger-nav">
      <button className="hamburger-icon" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`fullscreen-menu ${isOpen ? "open" : ""}`}>
        <button className="close-button" onClick={toggleMenu}>
          &times;
        </button>
        <nav>
          <ul>
            <li>
              {" "}
              <Link onClick={closeMenu} to="/">
                <img
                  src="/logo.webp"
                  id="hamburger-nav-logo"
                  alt="StackOverflow Simulator"
                />
              </Link>
            </li>
            {navlinks.map((l, i) => (
              <li key={i}>
                <Link
                  onClick={closeMenu}
                  to={l.href}
                  target={l.isExternal ? "_blank" : ""}
                  className={l.isExternal ? "ext-link" : ""}
                >
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HamburgerNav;
