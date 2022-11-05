import { Table, Breadcrumb, notification } from 'antd';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';

const columns = [
  {
    title: 'Device Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: 'Due',
    dataIndex: 'due',
    key: 'due',
  },
];

function Home() {
  const openNotification = (message, description) => {
    notification.open({
      message,
      description,
    });
  };

  const [cookies] = useCookies(['isLoggedIn']);
  const router = useRouter();

  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get('/api/home');
      setData(response.data.message);
    } catch (error) {
      openNotification(error, '');
    }
  };

  useEffect(() => {
    !cookies.isLoggedIn ? router.push('/login') : getData();
  }, []);

  return (
    <div className="admin">
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>home /</Breadcrumb.Item>
      </Breadcrumb>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
