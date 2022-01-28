import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

import { routesList } from "../../routes";

const NavMenu: React.FC = () => {
  return (
    <nav>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[routesList[0].path]}
      >
        {routesList.map(({ name, path }) => (
          <Menu.Item key={path}>
            <Link to={path}>{name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </nav>
  );
};

export default NavMenu;
