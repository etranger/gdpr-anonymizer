import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { useTranslate } from "react-polyglot";

import { routesList } from "../../routes";

const NavMenu: React.FC = () => {
  const t = useTranslate();

  return (
    <nav>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[routesList[0].path]}
      >
        {routesList.map(({ name, path }) => (
          <Menu.Item key={path}>
            <Link to={path}>{t(name)}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </nav>
  );
};

export default NavMenu;
