import { TeamOutlined, HomeFilled } from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.css';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import dynamic from 'next/dynamic';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Home', '/', <HomeFilled />),
  getItem('Requests', '/registrations', <TeamOutlined />),
];

const Container = ({ children }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [cookies] = useCookies(['isLoggedIn']);

  const [menu, setMenu] = useState('');

  useEffect(() => {
    !cookies.isLoggedIn && router.push('/login');
    setMenu('/' + router.asPath.split('/').at(-1));
  }, [router.asPath]);

  return cookies.isLoggedIn ? (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className={styles.logo__cont}>
          <img
            src="/logo2.png"
            alt=""
            className={styles.logo}
            style={{ width: collapsed ? '80%' : '50%' }}
          />
        </div>
        {console.log(menu)}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[menu]}
          items={items}
          onClick={(e) => router.push(e.key)}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <Title level={2} className={styles.title}>
            Smart Water Flow Meter
          </Title>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <div>{children}</div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Copyright ©2022 Created by BEI075 Team
        </Footer>
      </Layout>
    </Layout>
  ) : (
    <></>
  );
};

export default dynamic(() => Promise.resolve(Container), {
  ssr: false,
});
