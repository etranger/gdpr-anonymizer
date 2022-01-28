import React from "react";
import { Link } from "react-router-dom";

import styles from "./NavMenu.module.scss";

const NavMenu: React.FC = () => {
  return (
    <nav className={styles["nav-menu"]}>
      <Link to="/">Main</Link>
      <Link to="/upload-personal-data">Upload personal data</Link>
    </nav>
  );
};

export default NavMenu;
