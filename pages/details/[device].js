import {
  Col,
  Row,
  Breadcrumb,
  Typography,
  Button,
  notification,
  Divider,
} from 'antd';
import styles from '../../styles/User_reg.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import dynamic from 'next/dynamic';

const { Title } = Typography;

const title = [
  'Name',
  'Address',
  'Email',
  'Phone Number',
  'Citizenship Number',
  'Unit',
  'Due',
];
const keys = [
  'name',
  'address',
  'email',
  'number',
  'citizenship',
  'unit',
  'due',
];

function Detail() {
  const router = useRouter();
  const { device } = router.query;

  const openNotification = (message, description) => {
    notification.open({
      message,
      description,
    });
  };
  const [cookies] = useCookies(['isLoggedIn']);

  const [data, setData] = useState({});
  const getData = async () => {
    if (!device) return;
    try {
      const res = await axios.get(`/api/details/${device}`);
      setData(res.data.message);
    } catch (error) {
      openNotification(error, '');
    }
  };
  useEffect(() => {
    !cookies.isLoggedIn ? router.push('/login') : getData();
  }, [device]);

  const delet = async () => {
    try {
      const response = await axios.delete(`/api/details/${device}`);
      openNotification('Device and User Deleted', '');
      setTimeout(() => router.push('/'), 3000);
    } catch (error) {
      openNotification(error, '');
    }
  };

  return (
    <div className="admin">
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>
          <Link href="/">
            <a>Home</a>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>details&ensp;/&ensp;{data.id}</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col span={6}>
          {title.map((t, i) => (
            <Row key={i}>
              <Title level={5}>{t}</Title>
            </Row>
          ))}
        </Col>
        <Col span={18}>
          {keys.map((k, i) => (
            <Row key={i}>
              <Title level={5}>&emsp;:&emsp;&emsp;{data[k]}</Title>
            </Row>
          ))}
        </Col>
      </Row>
      <Divider />
      <Button danger onClick={delet}>
        Delete
      </Button>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Detail), {
  ssr: false,
});
