import React from "react";
import { Link } from "react-router-dom";

const NavMenu: React.FC = () => {
  return (
    <nav className="nav-menu">
      <Link to="/">Main</Link>
      <Link to="/upload-personal-data">Upload personal data</Link>
    </nav>
  );
};

export default NavMenu;
