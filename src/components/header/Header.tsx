import { Button, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { privatePaths, publicPaths } from '../../router/paths';
import { useAppSelector } from '../../store';
import useActions from '../../store/actions';
import styles from './styles.module.css';

function LayoutHeader() {
  const location = useLocation();
  const auth = useAppSelector((state) => state.auth);
  const actions = useActions();

  return (
    <Header className={styles.header}>
      <div className={styles.wrapper}>
        <Menu
          mode="horizontal"
          theme="dark"
          activeKey={location.pathname}
          className={styles.menu}
        >

          {(auth.isLogged ? privatePaths : publicPaths).map((data) => (
            <Menu.Item key={data.path}>
              <Link to={data.path}>
                {data.name}
              </Link>
            </Menu.Item>
          ))}
        </Menu>

        {auth.isLogged && (
          <Button
            type="primary"
            onClick={() => {
              actions.logOut();
            }}
          >
            Log out
          </Button>
        )}
      </div>
    </Header>
  );
}
export default LayoutHeader;
