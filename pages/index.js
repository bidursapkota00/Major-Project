import {
  Table,
  Breadcrumb,
  notification,
  Anchor,
  Select,
  Space,
  Input,
} from 'antd';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';

const { Link } = Anchor;

const columns = [
  {
    title: 'Device Id',
    dataIndex: 'id',
    key: 'id',
    render: (text, data) => (
      <Anchor>
        <Link href={`/details/${data.key}`} title={text} />
      </Anchor>
    ),
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
  const [location, setLocation] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');
  const [search, setSearch] = useState('');
  const [pressEnter, setPressEnter] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  const getData = async () => {
    if (firstTime) {
      try {
        const response = await axios.get('/api/home');
        setData(response.data.message);
        setLocation(response.data.address);
        setFirstTime(false);
      } catch (error) {
        openNotification(error, '');
      }
    } else {
      try {
        const response = await axios.post('/api/filter', {
          address: currentLocation,
          search,
        });
        setData(response.data.message);
      } catch (error) {
        openNotification(error, '');
      }
    }
  };

  useEffect(() => {
    !cookies.isLoggedIn ? router.push('/login') : getData();
  }, [currentLocation, pressEnter]);

  return (
    <div className="admin">
      <Space
        style={{
          width: '100%',
          paddingTop: 10,
          justifyContent: 'end',
          alignItems: 'end',
        }}
      >
        <Select
          placeholder="Select a Location"
          bordered={false}
          allowClear
          style={{
            width: 200,
            borderBottom: '1px solid #d9d9d9',
          }}
          onChange={(value) => setCurrentLocation(value)}
          options={location.map((address) => {
            return {
              value: address,
              label: address.toUpperCase(),
            };
          })}
        />

        <Input
          placeholder="Search"
          bordered={false}
          onChange={(e) => setSearch(e.target.value)}
          onPressEnter={() => setPressEnter(!pressEnter)}
          style={{
            width: '300',
            borderBottom: '1px solid #d9d9d9',
            background: '#fff',
            borderRadius: 5,
          }}
          suffix={
            <SearchOutlined
              style={{ fontSize: '1.3em', color: 'rgba(0,0,0,0.25)' }}
            />
          }
        />
      </Space>
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
