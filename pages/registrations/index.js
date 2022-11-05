import { Table, Breadcrumb, Anchor, notification } from 'antd';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';

const { Link } = Anchor;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, data) => (
      <Anchor>
        <Link href={`/registrations/${data.key}`} title={text} />
      </Anchor>
    ),
  },
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
  },
];

function Register() {
  const openNotification = (message, description) => {
    notification.open({
      message,
      description,
    });
  };
  const router = useRouter();
  const [cookies] = useCookies(['isLoggedIn']);

  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get('/api/register/registrations');
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
        <Breadcrumb.Item>
          <NextLink href="/">
            <a>Home</a>
          </NextLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>New Registration Requests /</Breadcrumb.Item>
      </Breadcrumb>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default dynamic(() => Promise.resolve(Register), {
  ssr: false,
});
