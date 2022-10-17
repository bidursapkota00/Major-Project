import { TeamOutlined, HomeFilled } from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import React, { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.css';

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
  return (
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
          <img src="/logo2.png" alt="" className={styles.logo} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
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
  );
};
export default Container;
