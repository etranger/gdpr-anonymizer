import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";

import AppHeader from "../app-header";

import "antd/dist/antd.css";
import "../../static/styles/global.scss";
import styles from "./App.module.scss";

import { routesList } from "../../routes";

const App: React.FC = () => {
  return (
    <div className="App">
      <Layout>
        <Layout.Header>
          <AppHeader />
        </Layout.Header>
        <Layout.Content className={styles.content}>
          <Routes>
            {routesList.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Layout.Content>
      </Layout>
    </div>
  );
};

export default App;
