import React from "react";

import NavMenu from "../nav-menu";

const AppHeader: React.FC = () => {
  return (
    <header className="app-header">
      <div className="app-header__title">GDPR-anonymizer!</div>
      <div className="app-header__nav-menu">
        <NavMenu />
      </div>
    </header>
  );
};

export default AppHeader;
