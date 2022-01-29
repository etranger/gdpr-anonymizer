import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { I18n } from "react-polyglot";

import AppHeader from "../app-header";
import { getDict, Locales } from "../../i18n";

import "antd/dist/antd.css";
import "../../static/styles/global.scss";
import styles from "./App.module.scss";

import { routesList } from "../../routes";

const App: React.FC = () => {
  const defaultLocale = Locales.en;

  const [locale, setLocale] = useState<Locales>(defaultLocale);
  const [dict, setDict] = useState(getDict(defaultLocale));

  useEffect(() => setDict(getDict(locale)), [locale]);

  return (
    <I18n locale={locale} messages={dict}>
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
    </I18n>
  );
};

export default App;
