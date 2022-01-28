import React from "react";

import NavMenu from "../nav-menu";
import styles from "./AppHeader.module.scss";

const AppHeader: React.FC = () => {
  return (
    <header>
      <div className={styles.title}>GDPR-anonymizer!</div>
      <NavMenu />
    </header>
  );
};

export default AppHeader;
