import {
  Layout, Space,
} from 'antd';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { generalPaths, privatePaths, publicPaths } from './router/paths';
import styles from './App.module.css';
import LayoutHeader from './components/header/Header';
import RouteRuleAuthorized from './router/routes/rules/Authorized';
import RouteRuleNonAuthorized from './router/routes/rules/NonAuthorized';

function App() {
  return (
    <Layout className={styles.App}>
      <Space
        direction="vertical"
        size="large"
      >
        <LayoutHeader />

        <div className={styles.container}>
          <Routes>

            {publicPaths.map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={<RouteRuleNonAuthorized><item.component /></RouteRuleNonAuthorized>}
              />
            ))}

            {privatePaths.map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={<RouteRuleAuthorized><item.component /></RouteRuleAuthorized>}
              />
            ))}

            {generalPaths.map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={<item.component />}
              />
            ))}

          </Routes>
        </div>

      </Space>
    </Layout>
  );
}

export default App;
